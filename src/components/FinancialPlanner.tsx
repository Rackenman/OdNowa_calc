import React, { useState } from 'react';
import { BUDGET_SOURCES, GPR_TASKS } from '../data/gprData';
import { Coins, PieChart as PieIcon, BarChart3, ShieldCheck, Download, Search } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export const FinancialPlanner: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const formatPln = (amount: number) => {
    return amount.toLocaleString('pl-PL') + ' zł';
  };

  const projectTotals = [
    { name: 'PP1: Tkanka Mieszkaniowa', totalPln: 26640000, public: 12270000, eu: 13320000, private: 1050000 },
    { name: 'PP2: Nowe Centrum Urbanistyczne', totalPln: 61900000, public: 2950000, eu: 30950000, private: 28000000 },
    { name: 'PP3: Wołomin Ogrodem (Klimat)', totalPln: 4360000, public: 1930000, eu: 2180000, private: 250000 },
    { name: 'PP4: Wołomin Obywatelski', totalPln: 23680000, public: 11790000, eu: 11840000, private: 50000 },
    { name: 'PP5: Wsparcie Biznesu', totalPln: 400000, public: 150000, eu: 200000, private: 50000 },
    { name: 'PU1-PU5: Zadań Uzupełniające', totalPln: 1185000, public: 592500, eu: 592500, private: 0 },
  ];

  const filteredTasks = GPR_TASKS.filter((task) => {
    const q = searchQuery.toLowerCase();
    return (
      task.id.toLowerCase().includes(q) ||
      task.title.toLowerCase().includes(q) ||
      task.parentTitle.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-indigo-400/30">
            <Coins className="w-3.5 h-3.5" />
            Rozdział 4 GPR: Szacunkowe Ramy Finansowe
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Finansowanie Programu Rewitalizacji</h2>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Łączna szacunkowa wartość planowanych przedsięwzięć rewitalizacyjnych wynosi <strong>118 165 000 zł</strong>. 
          </p>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 text-right">
          <span className="text-xs text-slate-400 uppercase font-semibold block tracking-wider">Suma Wydatków Kwalifikowanych</span>
          <span className="text-2xl font-extrabold text-indigo-400 font-mono">118 165 000 zł</span>
        </div>
      </div>

      {/* Grid: Pie Chart Funding Split + Bar Chart by Project */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Pie Chart: Sources */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-md space-y-3">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <PieIcon className="w-4 h-4 text-emerald-600" />
            Struktura Źródeł Finansowania GPR Wołomin
          </h3>
          <p className="text-xs text-slate-600">
            Dla Regionu Warszawskiego Stołecznego dofinansowanie ze środków UE (EFRR, EFS+) wynosi maksymalnie 50%.
          </p>
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={BUDGET_SOURCES}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="amountPln"
                  nameKey="source"
                  label={({ percentage }) => `${percentage}%`}
                >
                  {BUDGET_SOURCES.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => formatPln(Number(value))}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', border: 'none' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Project Breakdown */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-md space-y-3">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-600" />
            Podział Budżetu wg Przedsięwzięć Głównych (w mln zł)
          </h3>
          <p className="text-xs text-slate-600">
            Największym projektem jest PP2 (Nowe Centrum - 61,9 mln zł, w tym wkład prywatny w formule Partnerstwa Publiczno-Prywatnego).
          </p>
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectTotals} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 9 }} interval={0} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(value: any) => formatPln(Number(value))}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', border: 'none' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="eu" name="Środki UE (50%)" fill="#2563eb" stackId="a" />
                <Bar dataKey="public" name="Środki Publiczne Gminne" fill="#059669" stackId="a" />
                <Bar dataKey="private" name="Środki Prywatne / Partnerzy" fill="#d97706" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Detailed Cost Table for All Tasks */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-900 text-base">
            Szczegółowy Kosztorys Wystąpień Inwestycyjnych (Tabela 14–23 GPR)
          </h3>
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filtruj listę finansową..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white uppercase text-[10px] tracking-wider">
                <th className="p-3 rounded-tl-xl">ID</th>
                <th className="p-3">Nazwa Zadania / Inwestycji</th>
                <th className="p-3">Kategoria</th>
                <th className="p-3 text-right">Szacowany Budżet</th>
                <th className="p-3 text-right">Środki UE (50%)</th>
                <th className="p-3 text-right">Gmina / Krajowe</th>
                <th className="p-3 rounded-tr-xl text-center">Okres Realizacji</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTasks.map((task) => {
                const euShare = task.budgetPln * 0.5;
                const publicShare = task.budgetPln * 0.5;

                return (
                  <tr key={task.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-mono font-bold text-emerald-700 bg-emerald-50/50">
                      Zadanie {task.id}
                    </td>
                    <td className="p-3 font-bold text-slate-900 max-w-sm">{task.title}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          task.category === 'podstawowe'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {task.category === 'podstawowe' ? 'Podstawowe' : 'Uzupełniające'}
                      </span>
                    </td>
                    <td className="p-3 text-right font-mono font-black text-slate-900">
                      {formatPln(task.budgetPln)}
                    </td>
                    <td className="p-3 text-right font-mono text-blue-700 font-bold bg-blue-50/30">
                      {formatPln(euShare)}
                    </td>
                    <td className="p-3 text-right font-mono text-emerald-700 font-bold bg-emerald-50/30">
                      {formatPln(publicShare)}
                    </td>
                    <td className="p-3 text-center text-slate-600 font-mono font-semibold">
                      {task.timeline}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
