'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useVehicles } from '@/components/providers/VehicleContext';
import { 
  synthesizeChargingCurve, 
  computeQuickBenchmarks, 
  parseTelemetryOrText, 
  CurveArchetype 
} from '@/lib/curveSynthesizer';
import { ChargingCurvePoint, Vehicle } from '@/data/evModels';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine 
} from 'recharts';
import { 
  Zap, Sliders, Battery, FileText, CheckCircle2, RotateCcw, 
  Trash2, Copy, Download, Upload, Sparkles, X, ChevronRight, AlertCircle, Info, ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSettings } from '@/components/providers/SettingsProvider';

const SOC_STEPS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

export default function CustomVehicleStudioModal() {
  const { 
    isStudioOpen, 
    closeStudio, 
    editingVehicleData, 
    addCustomVehicle, 
    updateCustomVehicle, 
    deleteCustomVehicle,
    isCustomVehicle,
    allVehicles
  } = useVehicles();

  const { unit, distanceLabel } = useSettings();

  const [activeTab, setActiveTab] = useState<'specs' | 'curve' | 'telemetry'>('specs');

  // Form State
  const [name, setName] = useState('Custom EV');
  const [brand, setBrand] = useState('Custom');
  const [model, setModel] = useState('Model');
  const [year, setYear] = useState('2024');
  const [usablePackKwh, setUsablePackKwh] = useState<number>(75);
  const [maxChargeKw, setMaxChargeKw] = useState<number>(200);
  const [epaRangeMiles, setEpaRangeMiles] = useState<number>(300);
  const [architecture, setArchitecture] = useState<'400V' | '800V' | '900V'>('400V');
  const [chemistry, setChemistry] = useState<'NMC' | 'LFP' | 'NCA'>('NMC');
  const [archetype, setArchetype] = useState<CurveArchetype>('auto');
  const [notes, setNotes] = useState('');

  // Curve Points State
  const [curvePoints, setCurvePoints] = useState<ChargingCurvePoint[]>([]);
  
  // Telemetry Input
  const [telemetryInput, setTelemetryInput] = useState('');
  const [telemetryError, setTelemetryError] = useState('');
  const [telemetrySuccess, setTelemetrySuccess] = useState('');

  // Notification / Toast
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Initialize or reset when modal opens or editing vehicle changes
  useEffect(() => {
    if (!isStudioOpen) return;

    if (editingVehicleData) {
      setName(editingVehicleData.name || 'Custom EV');
      setBrand(editingVehicleData.brand || 'Custom');
      setModel(editingVehicleData.model || 'Model');
      setYear(String(editingVehicleData.year || '2024'));
      setUsablePackKwh(Number(editingVehicleData.usablePackKwh || editingVehicleData.batteryCapacity || 75));
      setMaxChargeKw(Number(editingVehicleData.maxChargeKw || 200));
      setEpaRangeMiles(Number(editingVehicleData.epaRangeMiles || 300));
      setArchitecture((editingVehicleData.architecture as any) || '400V');
      setChemistry((editingVehicleData.chemistry as any) || 'NMC');
      setNotes(editingVehicleData.notes || '');

      if (editingVehicleData.curve && editingVehicleData.curve.length >= 2) {
        // Map to 11 standard steps or use custom points
        setCurvePoints(editingVehicleData.curve);
      } else {
        const synth = synthesizeChargingCurve({
          usablePackKwh: Number(editingVehicleData.usablePackKwh || 75),
          maxChargeKw: Number(editingVehicleData.maxChargeKw || 200),
          architecture: editingVehicleData.architecture || '400V',
          chemistry: editingVehicleData.chemistry || 'NMC',
          archetype: 'auto'
        });
        setCurvePoints(synth);
      }
    } else {
      // Default new template
      setName('My Custom EV');
      setBrand('Custom');
      setModel('Performance EV');
      setYear('2024');
      setUsablePackKwh(75);
      setMaxChargeKw(200);
      setEpaRangeMiles(300);
      setArchitecture('400V');
      setChemistry('NMC');
      setArchetype('auto');
      setNotes('Custom vehicle configuration');

      const synth = synthesizeChargingCurve({
        usablePackKwh: 75,
        maxChargeKw: 200,
        architecture: '400V',
        chemistry: 'NMC',
        archetype: 'auto'
      });
      setCurvePoints(synth);
    }
    setActiveTab('specs');
    setSavedSuccess(false);
    setTelemetryError('');
    setTelemetrySuccess('');
  }, [isStudioOpen, editingVehicleData]);

  // Handle Preset Selection
  const handleSelectPreset = (presetId: string) => {
    const found = allVehicles.find(v => v.id === presetId);
    if (!found) return;

    setName(`${found.brand} ${found.model} (Custom)`);
    setBrand(found.brand);
    setModel(`${found.model} Mod`);
    setYear(String(found.year || '2024'));
    setUsablePackKwh(found.usablePackKwh || found.batteryCapacity || 75);
    setMaxChargeKw(found.maxChargeKw || 200);
    setEpaRangeMiles(found.epaRangeMiles || 300);
    setArchitecture((found.architecture as any) || '400V');
    setChemistry((found.chemistry as any) || 'NMC');
    setCurvePoints(found.curve ? [...found.curve] : []);
  };

  // Regenerate curve from specs
  const handleRegenerateCurve = () => {
    const synth = synthesizeChargingCurve({
      usablePackKwh,
      maxChargeKw,
      architecture,
      chemistry,
      archetype
    });
    setCurvePoints(synth);
  };

  // Update a single SOC point
  const handlePointChange = (soc: number, kwVal: number) => {
    const clampedKw = Math.max(0, Math.min(500, Math.round(kwVal)));
    setCurvePoints(prev => {
      const existing = prev.find(p => p.soc === soc);
      if (existing) {
        return prev.map(p => p.soc === soc ? { ...p, kw: clampedKw } : p);
      } else {
        return [...prev, { soc, kw: clampedKw }].sort((a, b) => a.soc - b.soc);
      }
    });
  };

  // Telemetry parse
  const handleApplyTelemetry = () => {
    setTelemetryError('');
    setTelemetrySuccess('');

    const parsed = parseTelemetryOrText(telemetryInput);
    if (!parsed) {
      setTelemetryError('Unable to parse data points. Please check format (e.g. "10: 250, 20: 240" or JSON).');
      return;
    }

    setCurvePoints(parsed);
    // Update peak kw if higher
    const highestKw = Math.max(...parsed.map(p => p.kw));
    if (highestKw > maxChargeKw) {
      setMaxChargeKw(highestKw);
    }
    setTelemetrySuccess(`Successfully imported ${parsed.length} curve points!`);
  };

  // Compute live physics benchmarks
  const benchmarks = useMemo(() => {
    return computeQuickBenchmarks({
      usablePackKwh,
      batteryCapacity: usablePackKwh,
      epaRangeMiles,
      curve: curvePoints
    });
  }, [usablePackKwh, epaRangeMiles, curvePoints]);

  // Save handler
  const handleSave = () => {
    const isEdit = editingVehicleData?.id && isCustomVehicle(editingVehicleData.id);

    const vehiclePayload = {
      name: name.trim() || 'Custom EV',
      brand: brand.trim() || 'Custom',
      model: model.trim() || 'Model',
      year: year || '2024',
      batteryCapacity: usablePackKwh,
      usablePackKwh,
      epaRangeMiles,
      maxChargeKw,
      architecture,
      chemistry,
      archetype,
      topCompetitorIds: [],
      curve: curvePoints.length >= 2 ? curvePoints : synthesizeChargingCurve({
        usablePackKwh,
        maxChargeKw,
        architecture,
        chemistry
      }),
      notes: notes.trim()
    };

    if (isEdit && editingVehicleData?.id) {
      updateCustomVehicle(editingVehicleData.id, vehiclePayload);
    } else {
      addCustomVehicle(vehiclePayload);
    }

    setSavedSuccess(true);
    setTimeout(() => {
      closeStudio();
    }, 600);
  };

  // Delete handler
  const handleDelete = () => {
    if (editingVehicleData?.id && isCustomVehicle(editingVehicleData.id)) {
      deleteCustomVehicle(editingVehicleData.id);
      closeStudio();
    }
  };

  if (!isStudioOpen) return null;

  const isEditingExistingCustom = editingVehicleData?.id && isCustomVehicle(editingVehicleData.id);

  // Map curve points for chart
  const chartData = SOC_STEPS.map(soc => {
    const exact = curvePoints.find(p => p.soc === soc);
    if (exact) return { soc, kw: exact.kw };
    // Interpolate
    const lower = [...curvePoints].reverse().find(p => p.soc < soc);
    const upper = curvePoints.find(p => p.soc > soc);
    if (!lower && upper) return { soc, kw: upper.kw };
    if (!upper && lower) return { soc, kw: lower.kw };
    if (lower && upper) {
      const ratio = (soc - lower.soc) / (upper.soc - lower.soc);
      return { soc, kw: Math.round(lower.kw + ratio * (upper.kw - lower.kw)) };
    }
    return { soc, kw: 0 };
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-[#0F1523] border border-slate-700/80 rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 bg-[#131B2E] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-sm">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white tracking-tight">
                  {isEditingExistingCustom ? 'Edit Custom EV Profile' : 'Custom EV Studio & Curve Architect'}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/30">
                  PRO ARCHITECT
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Configure any global electric vehicle with custom battery capacity, architecture, and piecewise BMS charging tapers.
              </p>
            </div>
          </div>
          <button 
            onClick={closeStudio}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Preset Quick Fill Bar */}
          <div className="bg-[#161F33] border border-slate-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Quick Template Clone:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button 
                type="button"
                onClick={() => handleSelectPreset('tesla-model-y-lr')}
                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800 text-slate-300 hover:text-emerald-400 hover:bg-slate-700 transition-colors border border-slate-700"
              >
                Tesla 400V Taper
              </button>
              <button 
                type="button"
                onClick={() => handleSelectPreset('hyundai-ioniq-5')}
                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-400 hover:bg-slate-700 transition-colors border border-slate-700"
              >
                Hyundai 800V Sustained
              </button>
              <button 
                type="button"
                onClick={() => handleSelectPreset('porsche-taycan')}
                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800 text-slate-300 hover:text-amber-400 hover:bg-slate-700 transition-colors border border-slate-700"
              >
                Porsche 800V Ultra (320kW)
              </button>
              <button 
                type="button"
                onClick={() => handleSelectPreset('byd-seal-awd')}
                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800 text-slate-300 hover:text-emerald-400 hover:bg-slate-700 transition-colors border border-slate-700"
              >
                BYD LFP Blade
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-800 gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('specs')}
              className={cn(
                "pb-3 px-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors",
                activeTab === 'specs' 
                  ? "text-emerald-400 border-emerald-400" 
                  : "text-slate-400 border-transparent hover:text-slate-200"
              )}
            >
              <Sliders className="w-4 h-4" />
              1. Vehicle Specifications
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('curve')}
              className={cn(
                "pb-3 px-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors",
                activeTab === 'curve' 
                  ? "text-emerald-400 border-emerald-400" 
                  : "text-slate-400 border-transparent hover:text-slate-200"
              )}
            >
              <Zap className="w-4 h-4" />
              2. Interactive Curve Editor
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('telemetry')}
              className={cn(
                "pb-3 px-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors",
                activeTab === 'telemetry' 
                  ? "text-emerald-400 border-emerald-400" 
                  : "text-slate-400 border-transparent hover:text-slate-200"
              )}
            >
              <FileText className="w-4 h-4" />
              3. Telemetry &amp; OBD2 Import
            </button>
          </div>

          {/* TAB 1: SPECS & SMART SYNTHESIZER */}
          {activeTab === 'specs' && (
            <div className="space-y-6 animate-in fade-in-50 duration-150">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Vehicle Display Name
                  </label>
                  <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Lucid Gravity Grand Touring"
                    className="w-full bg-[#131B2E] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Brand / Manufacturer
                  </label>
                  <input 
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="e.g. Lucid, Zeekr, Xiaomi, Nio"
                    className="w-full bg-[#131B2E] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Model &amp; Trim / Year
                  </label>
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      placeholder="Model"
                      className="flex-1 bg-[#131B2E] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                    <input 
                      type="text"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="Year"
                      className="w-20 bg-[#131B2E] border border-slate-700 rounded-xl px-2.5 py-2.5 text-sm text-white text-center focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Core Battery & Electrical Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#131B2E] p-4 rounded-2xl border border-slate-800">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span>Usable Capacity</span>
                    <span className="text-emerald-400 font-bold">{usablePackKwh} kWh</span>
                  </label>
                  <input 
                    type="number"
                    min="15"
                    max="250"
                    step="0.5"
                    value={usablePackKwh}
                    onChange={(e) => setUsablePackKwh(Number(e.target.value))}
                    className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono mb-2"
                  />
                  <input 
                    type="range"
                    min="30"
                    max="150"
                    step="1"
                    value={usablePackKwh}
                    onChange={(e) => setUsablePackKwh(Number(e.target.value))}
                    className="w-full accent-emerald-400"
                  />
                </div>

                <div className="bg-[#131B2E] p-4 rounded-2xl border border-slate-800">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span>Peak Fast Charge</span>
                    <span className="text-cyan-400 font-bold">{maxChargeKw} kW</span>
                  </label>
                  <input 
                    type="number"
                    min="30"
                    max="500"
                    step="5"
                    value={maxChargeKw}
                    onChange={(e) => setMaxChargeKw(Number(e.target.value))}
                    className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono mb-2"
                  />
                  <input 
                    type="range"
                    min="50"
                    max="350"
                    step="5"
                    value={maxChargeKw}
                    onChange={(e) => setMaxChargeKw(Number(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                </div>

                <div className="bg-[#131B2E] p-4 rounded-2xl border border-slate-800">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span>Rated Range</span>
                    <span className="text-amber-400 font-bold">{epaRangeMiles} {distanceLabel}</span>
                  </label>
                  <input 
                    type="number"
                    min="80"
                    max="650"
                    step="5"
                    value={epaRangeMiles}
                    onChange={(e) => setEpaRangeMiles(Number(e.target.value))}
                    className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono mb-2"
                  />
                  <input 
                    type="range"
                    min="120"
                    max="500"
                    step="5"
                    value={epaRangeMiles}
                    onChange={(e) => setEpaRangeMiles(Number(e.target.value))}
                    className="w-full accent-amber-400"
                  />
                </div>

                <div className="bg-[#131B2E] p-4 rounded-2xl border border-slate-800">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Pack Architecture
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 pt-1">
                    {(['400V', '800V', '900V'] as const).map(v => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setArchitecture(v)}
                        className={cn(
                          "py-2 text-xs font-bold rounded-lg transition-all border",
                          architecture === v 
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" 
                            : "bg-[#0B0F17] text-slate-400 border-slate-700 hover:text-white"
                        )}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Chemistry:</span>
                    <div className="flex gap-1">
                      {(['NMC', 'LFP', 'NCA'] as const).map(c => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setChemistry(c)}
                          className={cn(
                            "px-2 py-0.5 text-[10px] font-bold rounded transition-all border",
                            chemistry === c 
                              ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40" 
                              : "bg-[#0B0F17] text-slate-400 border-slate-700 hover:text-white"
                          )}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Taper Profile Selector */}
              <div className="bg-[#131B2E] p-5 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    Physics Taper Archetype
                  </label>
                  <button 
                    type="button"
                    onClick={handleRegenerateCurve}
                    className="text-xs font-medium text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Re-Synthesize Curve from Specs
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { id: '800v_sustained', name: '800V Sustained Plateau', desc: 'Maintains peak kW up to ~55-60% SOC (Hyundai E-GMP, Taycan)' },
                    { id: '400v_steep', name: '400V Steep Exponential', desc: 'Aggressive early peak (10-25%), then steep thermal taper (Tesla Supercharging)' },
                    { id: 'conservative_step', name: 'Step-Down Plateau', desc: 'Conservative stepped power limits for maximum cycle life (Ford, VW MEB)' },
                    { id: 'lfp_flat', name: 'LFP Blade Chemistry', desc: 'Wide uniform voltage plateau with rapid balancing tail after 90% (BYD)' }
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setArchetype(item.id as CurveArchetype);
                        const synth = synthesizeChargingCurve({
                          usablePackKwh,
                          maxChargeKw,
                          architecture,
                          chemistry,
                          archetype: item.id as CurveArchetype
                        });
                        setCurvePoints(synth);
                      }}
                      className={cn(
                        "p-3 rounded-xl text-left border transition-all",
                        archetype === item.id 
                          ? "bg-emerald-500/10 border-emerald-500/50 text-white shadow-sm" 
                          : "bg-[#0B0F17] border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                      )}
                    >
                      <p className="text-xs font-bold text-white mb-1">{item.name}</p>
                      <p className="text-[11px] text-slate-400 leading-snug">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIVE CURVE EDITOR */}
          {activeTab === 'curve' && (
            <div className="space-y-6 animate-in fade-in-50 duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Interactive Point-by-Point Curve Modeler</h3>
                  <p className="text-xs text-slate-400">
                    Adjust the charging power (kW) at each 10% State of Charge interval to replicate real test runs or OBD2 dyno logs.
                  </p>
                </div>
                <button 
                  type="button"
                  onClick={handleRegenerateCurve}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                  Reset to Theoretical Curve
                </button>
              </div>

              {/* Interactive Point Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-11 gap-2">
                {SOC_STEPS.map(soc => {
                  const pt = curvePoints.find(p => p.soc === soc) || { soc, kw: 0 };
                  return (
                    <div key={soc} className="bg-[#131B2E] border border-slate-800 rounded-xl p-2.5 text-center">
                      <span className="text-[11px] font-bold text-slate-400 block mb-1">{soc}% SoC</span>
                      <input 
                        type="number"
                        min="0"
                        max="500"
                        step="5"
                        value={pt.kw}
                        onChange={(e) => handlePointChange(soc, Number(e.target.value))}
                        className="w-full bg-[#0B0F17] border border-slate-700 rounded-lg py-1 px-1 text-center font-mono text-xs font-bold text-emerald-400 focus:outline-none focus:border-emerald-500"
                      />
                      <span className="text-[10px] text-slate-500 mt-1 block">kW</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: TELEMETRY & OBD2 IMPORT */}
          {activeTab === 'telemetry' && (
            <div className="space-y-6 animate-in fade-in-50 duration-150">
              <div className="bg-[#131B2E] border border-slate-800 p-5 rounded-2xl">
                <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  Paste Real Charging Data / OBD2 CAN-Bus Logs
                </h3>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  Paste raw data from Fastned benchmarks, YouTube reviews, or OBD2 Bluetooth telemetry apps. The intelligent parser supports JSON, CSV, key-value pairs (e.g. <code>10: 250, 20: 245, 50: 180, 80: 75</code>), or tabular logs.
                </p>

                <textarea
                  rows={4}
                  value={telemetryInput}
                  onChange={(e) => setTelemetryInput(e.target.value)}
                  placeholder={`Example Formats:
10% = 235 kW, 20% = 230 kW, 50% = 190 kW, 80% = 110 kW
OR
10, 235
20, 230
50, 190
80, 110`}
                  className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl p-3 text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500 mb-3"
                />

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleApplyTelemetry}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
                  >
                    <Upload className="w-4 h-4" />
                    Parse &amp; Apply Telemetry Curve
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const jsonStr = JSON.stringify(curvePoints, null, 2);
                        navigator.clipboard.writeText(jsonStr);
                        setTelemetrySuccess('Copied curve JSON to clipboard!');
                      }}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      Copy JSON
                    </button>
                  </div>
                </div>

                {telemetryError && (
                  <div className="mt-3 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-400 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{telemetryError}</span>
                  </div>
                )}
                {telemetrySuccess && (
                  <div className="mt-3 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{telemetrySuccess}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* LIVE CHARGING CURVE PREVIEW & BENCHMARK PANEL */}
          <div className="bg-[#131B2E] border border-slate-800 rounded-2xl p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Live Taper Simulation Preview: {name}
                </h4>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-3">
                <span>Peak: <strong className="text-white">{Math.max(...curvePoints.map(p => p.kw), 0)} kW</strong></span>
                <span>Pack: <strong className="text-white">{usablePackKwh} kWh</strong></span>
                <span>Arch: <strong className="text-white">{architecture}</strong></span>
              </div>
            </div>

            {/* Recharts Curve Preview */}
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="customCurveGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis dataKey="soc" stroke="#64748B" tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748B" domain={[0, Math.max(250, maxChargeKw + 20)]} tick={{ fontSize: 11 }} />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-slate-900 border border-slate-700 p-2 rounded-lg text-xs shadow-lg">
                            <p className="text-slate-400 font-medium">SoC: <strong className="text-white">{label}%</strong></p>
                            <p className="text-emerald-400 font-bold">{payload[0].value} kW</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <ReferenceLine x={80} stroke="#EF4444" strokeDasharray="3 3" label={{ value: '80% Taper', fill: '#EF4444', fontSize: 10, position: 'top' }} />
                  <Area type="monotone" dataKey="kw" stroke="#10B981" strokeWidth={2.5} fillOpacity={1} fill="url(#customCurveGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-800 text-center">
              <div className="bg-[#0B0F17] p-2.5 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-0.5">10% &rarr; 80% Dwell Time</span>
                <span className="text-base font-extrabold text-emerald-400">
                  {benchmarks.time10to80Minutes} mins
                </span>
              </div>

              <div className="bg-[#0B0F17] p-2.5 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-0.5">Avg Power (10-80%)</span>
                <span className="text-base font-extrabold text-cyan-400">
                  {benchmarks.avgKw10to80} kW
                </span>
              </div>

              <div className="bg-[#0B0F17] p-2.5 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-0.5">15-Min Range Added</span>
                <span className="text-base font-extrabold text-amber-400">
                  +{benchmarks.milesAdded15Min} {distanceLabel}
                </span>
              </div>

              <div className="bg-[#0B0F17] p-2.5 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-0.5">Peak C-Rate</span>
                <span className="text-base font-extrabold text-indigo-400">
                  {benchmarks.peakCRate} C
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#131B2E] border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div>
            {isEditingExistingCustom ? (
              <button
                type="button"
                onClick={handleDelete}
                className="px-3.5 py-2 text-xs font-bold text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-500/30 border border-rose-500/20 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete Profile
              </button>
            ) : (
              <span className="text-xs text-slate-500">
                Custom vehicles are persisted securely in your browser.
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={closeStudio}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)] flex items-center gap-1.5"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-slate-950" />
                  Saved!
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-slate-950" />
                  Save &amp; Use Vehicle
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
