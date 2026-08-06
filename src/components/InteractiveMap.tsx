import React, { useState } from 'react';
import { MAP_POINTS, GPR_TASKS } from '../data/gprData';
import { MapPoint, GprTask } from '../types';
import { 
  MapPin, 
  Layers, 
  Eye, 
  Info, 
  Sparkles, 
  ArrowRight, 
  X, 
  Building2, 
  TreePine, 
  Bus, 
  Compass,
  CheckCircle2,
  Calendar
} from 'lucide-react';

interface InteractiveMapProps {
  onSelectTask?: (task: GprTask) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onSelectTask }) => {
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(MAP_POINTS[2]); // Default to Centrum Wiktoryn
  const [filterType, setFilterType] = useState<string>('all');
  const [showSpecialZone, setShowSpecialZone] = useState<boolean>(true);
  const [showWoonerfOverlay, setShowWoonerfOverlay] = useState<boolean>(true);
  const [simulationMode, setSimulationMode] = useState<'present' | 'future'>('future');

  const filteredPoints = MAP_POINTS.filter((p) => {
    if (filterType === 'all') return true;
    return p.type === filterType;
  });

  const getRelatedTask = (taskId?: string): GprTask | undefined => {
    if (!taskId) return undefined;
    return GPR_TASKS.find((t) => t.id === taskId);
  };

  return (
    <div className="space-y-6">
      {/* Banner Intro */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-indigo-400/30">
              <Compass className="w-3.5 h-3.5" />
              Załącznik Nr 1 do GPR Wołomina (Skala 1:5000)
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Podstawowe Kierunki Zmian Funkcjonalno-Przestrzennych
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-3xl">
              Interaktywny plan przestrzenny obszaru rewitalizacji Centrum Wołomina (58,4 ha). Kliknij punkty strategiczne 1–9, aby zobaczyć szczegóły inwestycji, koncepcje urbanistyczne oraz powiązane zadania.
            </p>
          </div>

          {/* Map Controls */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-950/80 p-2 rounded-xl border border-slate-800">
            <button
              onClick={() => setShowSpecialZone(!showSpecialZone)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                showSpecialZone 
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' 
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Specjalna Strefa Rewitalizacji</span>
            </button>
            <button
              onClick={() => setShowWoonerfOverlay(!showWoonerfOverlay)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                showWoonerfOverlay 
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' 
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              <TreePine className="w-3.5 h-3.5" />
              <span>Woonerfy</span>
            </button>
            <button
              onClick={() => setSimulationMode(simulationMode === 'present' ? 'future' : 'present')}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 shadow-sm shadow-indigo-200 transition-all cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Wizja 2035: {simulationMode === 'future' ? 'Planowana' : 'Stan Obecny (2022)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Filtruj punkty:</span>
          <div className="flex items-center gap-1.5">
            {[
              { id: 'all', label: 'Wszystkie (9)' },
              { id: 'inwestycja', label: 'Inwestycje Kubaturowe' },
              { id: 'kultura', label: 'Kultura & Młodzież' },
              { id: 'woonerf', label: 'Woonerfy & Zieleń' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  filterType === f.id
                    ? 'bg-indigo-600 text-white font-bold shadow-sm shadow-indigo-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div className="text-xs text-slate-500 font-medium flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span> Strefa SSR (Uchwała 2024)
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Planowane Woonerfy
        </div>
      </div>

      {/* Grid Layout: Map Canvas + Sidebar Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SVG Map Container */}
        <div className="lg:col-span-8 bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-2xl relative min-h-[500px] flex flex-col justify-between overflow-hidden">
          
          {/* Legend Overlay */}
          <div className="absolute top-4 left-4 z-20 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-700/80 text-xs text-white shadow-lg space-y-1">
            <div className="font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Wołomin Centrum - Plan Zagospodarowania
            </div>
            <div className="text-[11px] text-slate-300">
              Ulica Wileńska, Warszawska, Kościelna, Mickiewicza, Plac 3 Maja
            </div>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative w-full h-[480px] bg-slate-900/90 rounded-xl overflow-hidden border border-slate-800 my-auto">
            <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                </pattern>
                <linearGradient id="railGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="100%" stopColor="#334155" />
                </linearGradient>
              </defs>

              {/* Background Grid */}
              <rect width="1000" height="600" fill="url(#grid)" />

              {/* Special Revitalization Zone (SSR Boundary Polygon) */}
              {showSpecialZone && (
                <g>
                  <polygon
                    points="320,80 880,180 850,520 380,480"
                    fill="rgba(244, 63, 94, 0.12)"
                    stroke="#f43f5e"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                  />
                  <text x="600" y="320" fill="rgba(244, 63, 94, 0.4)" fontSize="22" fontWeight="bold" textAnchor="middle">
                    SPECJALNA STREFA REWITALIZACJI (SSR)
                  </text>
                </g>
              )}

              {/* Miejscowy Plan Strip */}
              <polygon
                points="340,380 620,240 680,280 400,420"
                fill="rgba(16, 185, 129, 0.15)"
                stroke="#10b981"
                strokeWidth="1.5"
              />

              {/* Railway Track PKP R6/R60 */}
              <path
                d="M 100,50 L 900,450"
                stroke="url(#railGradient)"
                strokeWidth="14"
                fill="none"
              />
              <path
                d="M 100,50 L 900,450"
                stroke="#94a3b8"
                strokeWidth="2"
                strokeDasharray="12 8"
                fill="none"
              />
              <text x="220" y="100" fill="#94a3b8" fontSize="11" fontWeight="bold" transform="rotate(26, 220, 100)">
                LINIA KOLEJOWA PKP R6 / R60 (Warszawa - Czyżew)
              </text>

              {/* Main Streets Network */}
              {/* ul. Wileńska */}
              <path d="M 300,500 L 850,220" stroke="#64748b" strokeWidth="8" fill="none" />
              <text x="500" y="390" fill="#cbd5e1" fontSize="10" fontWeight="bold" transform="rotate(-26, 500, 390)">
                ul. Wileńska
              </text>

              {/* ul. Warszawska */}
              <path d="M 320,410 L 820,160" stroke="#64748b" strokeWidth="7" fill="none" />
              <text x="480" y="310" fill="#cbd5e1" fontSize="10" fontWeight="bold" transform="rotate(-26, 480, 310)">
                ul. Warszawska
              </text>

              {/* ul. Kościelna (Cross street) */}
              <path d="M 450,180 L 620,520" stroke="#64748b" strokeWidth="7" fill="none" />
              <text x="510" y="330" fill="#cbd5e1" fontSize="10" fontWeight="bold" transform="rotate(62, 510, 330)">
                ul. Kościelna
              </text>

              {/* ul. Mickiewicza */}
              <path d="M 600,150 L 780,480" stroke="#64748b" strokeWidth="6" fill="none" />
              <text x="680" y="310" fill="#cbd5e1" fontSize="10" fontWeight="bold" transform="rotate(62, 680, 310)">
                ul. Mickiewicza
              </text>

              {/* ul. Mariańska */}
              <path d="M 750,120 L 920,420" stroke="#64748b" strokeWidth="6" fill="none" />
              <text x="820" y="240" fill="#cbd5e1" fontSize="10" fontWeight="bold" transform="rotate(62, 820, 240)">
                ul. Mariańska
              </text>

              {/* Woonerfs Overlay Lines (Green highlights) */}
              {showWoonerfOverlay && (
                <g>
                  {/* Woonerf Kościelna */}
                  <path d="M 520,320 L 590,460" stroke="#10b981" strokeWidth="6" strokeDasharray="4 2" fill="none" />
                  {/* Woonerf Mickiewicza */}
                  <path d="M 650,250 L 710,380" stroke="#10b981" strokeWidth="6" strokeDasharray="4 2" fill="none" />
                  {/* Woonerf Warszawska */}
                  <path d="M 480,330 L 680,230" stroke="#10b981" strokeWidth="6" strokeDasharray="4 2" fill="none" />
                </g>
              )}

              {/* Plac 3 Maja Green/Square Area */}
              <rect
                x="740"
                y="350"
                width="80"
                height="60"
                rx="6"
                fill={simulationMode === 'future' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(148, 163, 184, 0.3)'}
                stroke={simulationMode === 'future' ? '#10b981' : '#64748b'}
                strokeWidth="2"
              />
              <text x="780" y="385" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                Plac 3 Maja
              </text>

              {/* Render Map Points (Pins 1 to 9) */}
              {filteredPoints.map((pt) => {
                // Map percentages x(0..100), y(0..100) to SVG coords (1000x600)
                const cx = (pt.x / 100) * 1000;
                const cy = (pt.y / 100) * 600;
                const isSelected = selectedPoint?.id === pt.id;

                return (
                  <g
                    key={pt.id}
                    onClick={() => setSelectedPoint(pt)}
                    className="cursor-pointer group"
                  >
                    {/* Pulsing ring for selected pin */}
                    {isSelected && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r="26"
                        className="animate-ping"
                        fill="rgba(52, 211, 153, 0.3)"
                      />
                    )}

                    {/* Pin Background Circle */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected ? '20' : '16'}
                      fill={
                        isSelected
                          ? '#10b981'
                          : pt.type === 'inwestycja'
                          ? '#3b82f6'
                          : pt.type === 'woonerf'
                          ? '#10b981'
                          : '#a855f7'
                      }
                      stroke="#ffffff"
                      strokeWidth="3"
                      className="transition-all transform group-hover:scale-110 shadow-lg"
                    />

                    {/* Pin Number Text */}
                    <text
                      x={cx}
                      y={cy + 5}
                      fill="#ffffff"
                      fontSize={isSelected ? '14' : '12'}
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {pt.id}
                    </text>

                    {/* Label Tooltip on hover */}
                    <g className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <rect
                        x={cx - 70}
                        y={cy - 45}
                        width="140"
                        height="26"
                        rx="6"
                        fill="#0f172a"
                        stroke="#334155"
                        strokeWidth="1"
                      />
                      <text
                        x={cx}
                        y={cy - 28}
                        fill="#f8fafc"
                        fontSize="10"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {pt.title}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Map Legend Footer */}
          <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span> Inwestycje Kubaturowe
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span> Woonerfy & Zieleń
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span> Kultura & Młodzież
              </span>
            </div>
            <div className="text-[11px] text-slate-500">
              *Kliknij dowolny punkt 1-9 na mapie, aby otworzyć kartę inwestycyjną
            </div>
          </div>
        </div>

        {/* Sidebar Point Detail Card */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xl flex flex-col justify-between">
          {selectedPoint ? (
            <div className="space-y-4">
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-black text-lg flex items-center justify-center shadow-md">
                    {selectedPoint.id}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {selectedPoint.category}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base leading-snug mt-0.5">
                      {selectedPoint.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Location Badge */}
              <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">{selectedPoint.address}</span>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Opis zamierzenia urbanistycznego:
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                  {selectedPoint.description}
                </p>
              </div>

              {/* Related GPR Task Details */}
              {(() => {
                const task = getRelatedTask(selectedPoint.relatedTaskId);
                if (!task) return null;

                return (
                  <div className="bg-emerald-50/80 border border-emerald-200 p-3.5 rounded-xl space-y-2">
                    <div className="flex items-center justify-between text-xs text-emerald-900 font-bold">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Powiązane Zadanie: Zadanie {task.id}
                      </span>
                      <span className="text-emerald-700 font-mono bg-emerald-100 px-2 py-0.5 rounded">
                        {(task.budgetPln / 1000000).toFixed(2)} mln zł
                      </span>
                    </div>

                    <p className="text-xs text-slate-800 font-semibold">{task.title}</p>

                    <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 border-t border-emerald-200/60">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" /> Okres: {task.timeline}
                      </span>
                      <span>Wykonawca: {task.responsible.split('/')[0]}</span>
                    </div>

                    {onSelectTask && (
                      <button
                        onClick={() => onSelectTask(task)}
                        className="w-full mt-2 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                      >
                        <span>Otwórz Pełną Kartę Zadania {task.id}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })()}

              {/* Simulation Comparison Mode */}
              <div className="border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Wizualny Efekt Rewitalizacji:
                  </span>
                  <span className="text-[11px] text-emerald-600 font-bold">Wizja 2035</span>
                </div>
                <div className="bg-slate-900 text-white p-3 rounded-xl text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-slate-300 border-b border-slate-800 pb-1">
                    <span>Oczekiwanie mieszkańców:</span>
                    <strong className="text-emerald-400">Wyższa estetyka & zieleń</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Efekt klimatyczny:</span>
                    <strong className="text-cyan-400">Redukcja wyspy ciepła</strong>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-8 text-slate-400 h-full">
              <MapPin className="w-12 h-12 mb-2 text-slate-300" />
              <p className="text-sm font-semibold">Wybierz punkt z mapy 1–9, aby wyświetlić opis i budżet</p>
            </div>
          )}

          {/* List of All 9 Strategic Points Quick Selection */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Szybki wybór punktu strategicznego (1-9):
            </span>
            <div className="grid grid-cols-5 gap-1.5">
              {MAP_POINTS.map((pt) => (
                <button
                  key={pt.id}
                  onClick={() => setSelectedPoint(pt)}
                  className={`py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    selectedPoint?.id === pt.id
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-md'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  #{pt.id}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
