import React, { useState } from 'react';
import { CalendarDays, CheckCircle2, Clock, Sparkles, Filter, ChevronRight, Layers } from 'lucide-react';
import { GPR_TASKS } from '../data/gprData';

export const TimelineView: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<string>('all');

  const phases = [
    {
      id: 'faza1',
      years: '2025–2027',
      title: 'I Etap: Przygotowanie i Pilne Inwestycje Infrastrukturalne',
      description: 'Przebudowa Placu 3 Maja, start projektowania Woonerfu Wileńska, wyburzenie i budowa nowej siedziby OPS, uruchomienie Programu Mikrograntów.',
      status: 'w_przygotowaniu',
      color: 'bg-indigo-600 text-white',
    },
    {
      id: 'faza2',
      years: '2028–2030',
      title: 'II Etap: Rozwój Tkanki Mieszkaniowej i Woonerfów',
      description: 'Termomodernizacja komunalna (PP1), budowa Centrum Wiktoryn (PP2), rozbudowa CAW przy Daszyńskiego, Zakątek Kultura.',
      status: 'zaplanowane',
      color: 'bg-emerald-600 text-white',
    },
    {
      id: 'faza3',
      years: '2031–2035',
      title: 'III Etap: Trwałość Efektów i Dopełnienie Przestrzenne',
      description: 'Realizacja zadań uzupełniających (PU1-PU5), ewaluacja wskaźników deprywacji $K_s$, rozbudowa zintegrowanej sieci ścieżek rowerowych.',
      status: 'perspektywiczne',
      color: 'bg-amber-600 text-white',
    },
  ];

  const filteredTasks = GPR_TASKS.filter((task) => {
    if (selectedPhase === 'faza1') return task.timeline.includes('2025') || task.timeline.includes('2026') || task.timeline.includes('2027');
    if (selectedPhase === 'faza2') return task.timeline.includes('2028') || task.timeline.includes('2029') || task.timeline.includes('2030');
    if (selectedPhase === 'faza3') return task.timeline.includes('2031') || task.timeline.includes('2032') || task.timeline.includes('2035');
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-indigo-400/30">
            <CalendarDays className="w-3.5 h-3.5" />
            Rozdział 5: Harmonogram Wdrożenia GPR Wołomina
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Ewolucja i Kamienie Milowe (2025–2035)</h2>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Trzygwiazdkowy plan realizacji z podziałem na etapy realizacyjne, zadania priorytetowe oraz horyzont długoterminowy.
          </p>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 text-right shrink-0">
          <span className="text-xs text-slate-400 uppercase font-semibold block tracking-wider">Horyzont Czasowy</span>
          <span className="text-2xl font-extrabold text-indigo-400 font-mono">10 Lat (2025-2035)</span>
        </div>
      </div>

      {/* Phase Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {phases.map((phase) => {
          const isSelected = selectedPhase === phase.id;
          return (
            <div
              key={phase.id}
              onClick={() => setSelectedPhase(isSelected ? 'all' : phase.id)}
              className={`p-5 rounded-xl border transition-all cursor-pointer relative ${
                isSelected
                  ? 'bg-white border-indigo-600 shadow-md ring-2 ring-indigo-600/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold font-mono ${phase.color}`}>
                  {phase.years}
                </span>
                {isSelected && (
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                    Aktywny Filtr
                  </span>
                )}
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm mb-2">{phase.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{phase.description}</p>
            </div>
          );
        })}
      </div>

      {/* Filtered Task Timeline Table */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-600" />
            Zadania Przypisane do Harmonogramu ({filteredTasks.length})
          </h3>
          {selectedPhase !== 'all' && (
            <button
              onClick={() => setSelectedPhase('all')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline cursor-pointer"
            >
              Pokaż cały okres (2025–2035)
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white uppercase text-[10px] tracking-wider">
                <th className="p-3 rounded-tl-lg">ID</th>
                <th className="p-3">Nazwa Inwestycji / Działania</th>
                <th className="p-3">Lokalizacja</th>
                <th className="p-3 text-right">Budżet (PLN)</th>
                <th className="p-3 text-center">Okres Realizacji</th>
                <th className="p-3 rounded-tr-lg">Podmiot Odpowiedzialny</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-mono font-bold text-indigo-600 bg-indigo-50/50">
                    {task.id}
                  </td>
                  <td className="p-3 font-bold text-slate-900 max-w-md">{task.title}</td>
                  <td className="p-3 text-slate-600">{task.location}</td>
                  <td className="p-3 text-right font-mono font-bold text-slate-900">
                    {task.budgetPln.toLocaleString('pl-PL')} zł
                  </td>
                  <td className="p-3 text-center font-mono font-semibold text-slate-700 bg-slate-50">
                    {task.timeline}
                  </td>
                  <td className="p-3 text-slate-600">{task.responsible}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
