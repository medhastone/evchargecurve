'use client';

import React, { useState } from 'react';
import { Download, Table, Search, ChevronDown, ChevronUp, Check, Database } from 'lucide-react';

interface DatasetTableProps {
  name: string;
  description: string;
  columns: string[];
  rows: (string | number)[][];
  slug: string;
}

export default function ResearchDatasetTable({
  name,
  description,
  columns,
  rows,
  slug,
}: DatasetTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCol, setSortCol] = useState<number | null>(null);
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [downloaded, setDownloaded] = useState<boolean>(false);

  // Filter rows
  const filteredRows = rows.filter((row) =>
    row.some((cell) =>
      String(cell).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sort rows
  const sortedRows = [...filteredRows].sort((a, b) => {
    if (sortCol === null) return 0;
    const valA = a[sortCol];
    const valB = b[sortCol];

    const numA = typeof valA === 'number' ? valA : parseFloat(String(valA).replace(/[^0-9.-]/g, ''));
    const numB = typeof valB === 'number' ? valB : parseFloat(String(valB).replace(/[^0-9.-]/g, ''));

    if (!isNaN(numA) && !isNaN(numB)) {
      return sortAsc ? numA - numB : numB - numA;
    }

    return sortAsc
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  const handleSort = (colIdx: number) => {
    if (sortCol === colIdx) {
      setSortAsc(!sortAsc);
    } else {
      setSortCol(colIdx);
      setSortAsc(true);
    }
  };

  const handleDownloadCsv = () => {
    const csvHeader = columns.map((c) => `"${c.replace(/"/g, '""')}"`).join(',');
    const csvRows = rows.map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')
    );
    const csvContent = [csvHeader, ...csvRows].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `evcc_${slug}_dataset.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative overflow-hidden backdrop-blur-md">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-1">
            <Database className="w-4 h-4" />
            <span>Open Telemetry Benchmark Dataset</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">{name}</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">{description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Filter vehicles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 w-48"
            />
          </div>

          <button
            onClick={handleDownloadCsv}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 rounded-xl text-xs font-semibold border border-emerald-500/30 transition-all active:scale-95 shadow-sm"
            title="Download CSV for academic or journalistic analysis"
          >
            {downloaded ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5" />}
            <span>{downloaded ? 'Dataset Exported' : 'Export CSV Dataset'}</span>
          </button>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-medium">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  onClick={() => handleSort(idx)}
                  className="py-3 px-3.5 font-semibold text-slate-300 cursor-pointer hover:text-white transition-colors select-none whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col}</span>
                    {sortCol === idx ? (
                      sortAsc ? (
                        <ChevronUp className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-emerald-400" />
                      )
                    ) : (
                      <ChevronDown className="w-3 h-3 text-slate-600 opacity-50" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {sortedRows.map((row, rIdx) => (
              <tr
                key={rIdx}
                className="hover:bg-slate-800/40 transition-colors"
              >
                {row.map((cell, cIdx) => {
                  const isFirstCol = cIdx === 0;
                  const isArchCol = String(cell).includes('800V') || String(cell).includes('400V') || String(cell).includes('900V');
                  return (
                    <td
                      key={cIdx}
                      className={`py-3 px-3.5 whitespace-nowrap ${
                        isFirstCol ? 'font-sans font-medium text-white' : ''
                      }`}
                    >
                      {isArchCol ? (
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[11px] font-mono font-semibold ${
                            String(cell).includes('800V') || String(cell).includes('900V')
                              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                              : 'bg-slate-800 text-slate-300 border border-slate-700'
                          }`}
                        >
                          {cell}
                        </span>
                      ) : (
                        cell
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5">
          <Table className="w-3.5 h-3.5" />
          <span>Showing {sortedRows.length} of {rows.length} verified empirical records</span>
        </span>
        <span>Standardized RFC-4180 CSV Export Available</span>
      </div>
    </div>
  );
}
