'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { VEHICLES, Vehicle, ChargingCurvePoint } from '@/data/evModels';
import { synthesizeChargingCurve } from '@/lib/curveSynthesizer';

interface VehicleContextType {
  allVehicles: Vehicle[];
  vehiclesMap: Record<string, Vehicle>;
  customVehicles: Vehicle[];
  getVehicleById: (id: string) => Vehicle;
  addCustomVehicle: (vehicle: Omit<Vehicle, 'id' | 'isCustom'> & { id?: string }) => Vehicle;
  updateCustomVehicle: (id: string, vehicle: Partial<Vehicle>) => boolean;
  deleteCustomVehicle: (id: string) => void;
  duplicateVehicle: (sourceId: string) => void;
  isCustomVehicle: (id: string) => boolean;
  isStudioOpen: boolean;
  openStudio: (initialDataOrPresetId?: string | Partial<Vehicle>) => void;
  closeStudio: () => void;
  editingVehicleData: Partial<Vehicle> | null;
  exportCustomVehicles: () => string;
  importCustomVehicles: (jsonString: string) => { success: boolean; count: number; error?: string };
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

const STORAGE_KEY = 'evchargecurve_custom_vehicles_v1';

export function VehicleProvider({ children }: { children: React.ReactNode }) {
  const [customVehicles, setCustomVehicles] = useState<Vehicle[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [editingVehicleData, setEditingVehicleData] = useState<Partial<Vehicle> | null>(null);

  // Load custom vehicles from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCustomVehicles(parsed.map(v => ({ ...v, isCustom: true })));
        }
      }
    } catch (e) {
      console.error('Failed to load custom vehicles from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save custom vehicles to localStorage on change
  const persistCustomVehicles = useCallback((vehicles: Vehicle[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
    } catch (e) {
      console.error('Failed to persist custom vehicles', e);
    }
  }, []);

  // Combined dictionary
  const vehiclesMap = useMemo<Record<string, Vehicle>>(() => {
    const map: Record<string, Vehicle> = { ...VEHICLES };
    for (const v of customVehicles) {
      map[v.id] = v;
    }
    return map;
  }, [customVehicles]);

  // Combined array (custom vehicles placed in a logical priority order)
  const allVehicles = useMemo<Vehicle[]>(() => {
    const customList = customVehicles.map(v => ({ ...v, isCustom: true }));
    const builtInList = Object.values(VEHICLES);
    return [...customList, ...builtInList];
  }, [customVehicles]);

  const getVehicleById = useCallback((id: string): Vehicle => {
    if (vehiclesMap[id]) return vehiclesMap[id];
    return VEHICLES['tesla-model-y-lr'] || Object.values(VEHICLES)[0];
  }, [vehiclesMap]);

  const isCustomVehicle = useCallback((id: string): boolean => {
    return customVehicles.some(v => v.id === id);
  }, [customVehicles]);

  const addCustomVehicle = useCallback((vehicleData: Omit<Vehicle, 'id' | 'isCustom'> & { id?: string }): Vehicle => {
    const id = vehicleData.id || `custom-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    
    // Ensure curve exists or synthesize it
    let curve = vehicleData.curve;
    if (!curve || curve.length < 2) {
      curve = synthesizeChargingCurve({
        usablePackKwh: vehicleData.usablePackKwh || vehicleData.batteryCapacity || 75,
        maxChargeKw: vehicleData.maxChargeKw || 150,
        architecture: vehicleData.architecture || '400V',
        chemistry: vehicleData.chemistry || 'NMC',
        archetype: vehicleData.archetype as any
      });
    }

    const newVehicle: Vehicle = {
      ...vehicleData,
      id,
      isCustom: true,
      curve,
      curvePoints: curve,
      batteryCapacity: vehicleData.batteryCapacity || vehicleData.usablePackKwh || 75,
      usablePackKwh: vehicleData.usablePackKwh || vehicleData.batteryCapacity || 75,
      topCompetitorIds: vehicleData.topCompetitorIds || ['tesla-model-y-lr', 'hyundai-ioniq-5']
    };

    setCustomVehicles(prev => {
      const updated = [newVehicle, ...prev.filter(v => v.id !== id)];
      persistCustomVehicles(updated);
      return updated;
    });

    return newVehicle;
  }, [persistCustomVehicles]);

  const updateCustomVehicle = useCallback((id: string, updates: Partial<Vehicle>): boolean => {
    let success = false;
    setCustomVehicles(prev => {
      const exists = prev.some(v => v.id === id);
      if (!exists) return prev;
      
      success = true;
      const updated = prev.map(v => {
        if (v.id !== id) return v;
        const merged = { ...v, ...updates, isCustom: true };
        if (updates.curve) {
          merged.curvePoints = updates.curve;
        }
        return merged;
      });
      persistCustomVehicles(updated);
      return updated;
    });
    return success;
  }, [persistCustomVehicles]);

  const deleteCustomVehicle = useCallback((id: string) => {
    setCustomVehicles(prev => {
      const updated = prev.filter(v => v.id !== id);
      persistCustomVehicles(updated);
      return updated;
    });
  }, [persistCustomVehicles]);

  const openStudio = useCallback((initialDataOrPresetId?: string | Partial<Vehicle>) => {
    if (typeof initialDataOrPresetId === 'string') {
      const found = vehiclesMap[initialDataOrPresetId];
      if (found) {
        setEditingVehicleData(found);
      } else {
        setEditingVehicleData(null);
      }
    } else if (initialDataOrPresetId) {
      setEditingVehicleData(initialDataOrPresetId);
    } else {
      setEditingVehicleData(null);
    }
    setIsStudioOpen(true);
  }, [vehiclesMap]);

  const duplicateVehicle = useCallback((sourceId: string) => {
    const source = vehiclesMap[sourceId];
    if (!source) return;

    const copyData: Partial<Vehicle> = {
      name: `${source.name} (Custom Copy)`,
      brand: source.brand,
      model: `${source.model} Custom`,
      year: source.year,
      batteryCapacity: source.batteryCapacity,
      usablePackKwh: source.usablePackKwh,
      epaRangeMiles: source.epaRangeMiles,
      wltpRangeKm: source.wltpRangeKm,
      maxChargeKw: source.maxChargeKw,
      architecture: source.architecture,
      chemistry: source.chemistry,
      curve: [...(source.curve || [])],
      notes: `Cloned from ${source.name}`
    };

    openStudio(copyData);
  }, [vehiclesMap, openStudio]);

  const closeStudio = useCallback(() => {
    setIsStudioOpen(false);
    setEditingVehicleData(null);
  }, []);

  const exportCustomVehicles = useCallback((): string => {
    return JSON.stringify(customVehicles, null, 2);
  }, [customVehicles]);

  const importCustomVehicles = useCallback((jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      const list = Array.isArray(parsed) ? parsed : [parsed];
      let validCount = 0;

      const newItems: Vehicle[] = [];
      for (const item of list) {
        if (item && item.name && (item.batteryCapacity || item.usablePackKwh)) {
          const pack = Number(item.batteryCapacity || item.usablePackKwh);
          const maxKw = Number(item.maxChargeKw || 150);
          const arch = item.architecture || '400V';
          const chem = item.chemistry || 'NMC';
          
          let curve = item.curve;
          if (!curve || !Array.isArray(curve) || curve.length < 2) {
            curve = synthesizeChargingCurve({
              usablePackKwh: pack,
              maxChargeKw: maxKw,
              architecture: arch,
              chemistry: chem
            });
          }

          newItems.push({
            id: item.id && item.id.startsWith('custom-') ? item.id : `custom-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            name: item.name,
            brand: item.brand || 'Custom',
            model: item.model || 'Model',
            year: item.year || new Date().getFullYear().toString(),
            batteryCapacity: pack,
            usablePackKwh: pack,
            epaRangeMiles: Number(item.epaRangeMiles || 280),
            wltpRangeKm: item.wltpRangeKm ? Number(item.wltpRangeKm) : undefined,
            maxChargeKw: maxKw,
            architecture: arch,
            chemistry: chem,
            topCompetitorIds: item.topCompetitorIds || ['tesla-model-y-lr', 'hyundai-ioniq-5'],
            curve,
            curvePoints: curve,
            isCustom: true,
            notes: item.notes || 'Imported configuration'
          });
          validCount++;
        }
      }

      if (validCount > 0) {
        setCustomVehicles(prev => {
          // Merge by ID
          const existingIds = new Set(newItems.map(n => n.id));
          const merged = [...newItems, ...prev.filter(p => !existingIds.has(p.id))];
          persistCustomVehicles(merged);
          return merged;
        });
        return { success: true, count: validCount };
      }
      return { success: false, count: 0, error: 'No valid vehicle records found in JSON.' };
    } catch (e: any) {
      return { success: false, count: 0, error: e?.message || 'Invalid JSON format' };
    }
  }, [persistCustomVehicles]);

  return (
    <VehicleContext.Provider
      value={{
        allVehicles,
        vehiclesMap,
        customVehicles,
        getVehicleById,
        addCustomVehicle,
        updateCustomVehicle,
        deleteCustomVehicle,
        duplicateVehicle,
        isCustomVehicle,
        isStudioOpen,
        openStudio,
        closeStudio,
        editingVehicleData,
        exportCustomVehicles,
        importCustomVehicles
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
}

export function useVehicles() {
  const context = useContext(VehicleContext);
  if (!context) {
    throw new Error('useVehicles must be used within a VehicleProvider');
  }
  return context;
}
