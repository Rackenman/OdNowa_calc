import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area 
} from 'recharts';
import { INDICATOR_DATA, PERCEPTION_SAFETY, SAFETY_FEELING_CHART } from '../data/gprData';
import { 
  BarChart3, 
  Users, 
  Briefcase, 
  ShieldAlert, 
  TreePine, 
  GraduationCap, 
  TrendingDown, 
  TrendingUp, 
  Info,
  CheckCircle2
} from 'lucide-react';

export const DiagnosisDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'all' | 'demografia' | 'bezpieczenstwo' | 'srodowisko' | 'edukacja'>('all');

  // Chart Data Preparation
  const populationData = [
    { year: '2015', populacja: 6500, label: 'Stan wyjściowy (2015)' },
    { year: '2022', populacja: 4230, label: 'Diagnoza aktualizacyjna (2022)' },
    { year: '2035 (Cel)', populacja: 5000, label: 'Cel GPR (2035)' },
  ];

  const unemploymentData = [
    { name: 'Bezrobotni ogółem (na 1000 mieszk.)', '2015': 59.38, '2022': 40.43, '2035 Cel': 35.0 },
    { name: 'Niskie wykształcenie', '2015': 23.8, '2022': 20.8, '2035 Cel': 19.0 },
    { name: 'Długotrwale bezrobotni', '2015': 34.0, '2022': 23.64, '2035 Cel': 20.0 },
  ];

  const envData = [
    { stage: '2015 (Wyjściowy)', kopciuchy: 190, zielenM2: 0 },
    { stage: '2022 (Diagnoza)', kopciuchy: 46, zielenM2: 14316 },
    { stage: '2035 (Cel GPR)', kopciuchy: 30, zielenM2: 15500 },
  ];

  const examData = [
    { szkoła: 'SP Nr 4 (Integracyjna)', 'J. polski': 51.73, 'Matematyka': 44.57, 'J. angielski': 60.74 },
    { szkoła: 'SP Nr 5 (Sportowa)', 'J. polski': 53.82, 'Matematyka': 47.28, 'J. angielski': 64.52 },
    { szkoła: 'Średnia Miasta Wołomin', 'J. polski': 62.57, 'Matematyka': 55.23, 'J. angielski': 69.24 },
  ];

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-indigo-400/30">
            <BarChart3 className="w-3.5 h-3.5" />
            Rozdział 2: Część Diagnostyczna GPR Wołomina
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Pojemna Diagnoza i Wskaźniki Wpływu</h2>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Porównanie stanu z 2015 roku, aktualizacji z 2022 roku oraz docelowych celów wskaźnikowych do roku 2035.
          </p>
        </div>

        {/* Section Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-800 p-2 rounded-xl border border-slate-700">
          {[
            { id: 'all', label: 'Wszystkie Sfery' },
            { id: 'demografia', label: 'Demografia & Praca' },
            { id: 'bezpieczenstwo', label: 'Bezpieczeństwo' },
            { id: 'srodowisko', label: 'Środowisko' },
            { id: 'edukacja', label: 'Edukacja' },
          ].map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeSection === sec.id
                  ? 'bg-indigo-600 text-white font-bold shadow-sm shadow-indigo-200'
                  : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Indicators Table Grid */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-md">
        <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-emerald-600" />
          Kluczowe Wskaźniki Diagnozy Rewitalizacyjnej (Tabela 26 GPR)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white uppercase text-[10px] tracking-wider">
                <th className="p-3 rounded-tl-xl">Wskaźnik Diagnozy</th>
                <th className="p-3">Kategoria</th>
                <th className="p-3 text-right">Stan 2015</th>
                <th className="p-3 text-right">Stan 2022</th>
                <th className="p-3 text-right text-emerald-400">Cel 2035</th>
                <th className="p-3 text-center">Zmiana 15-22</th>
                <th className="p-3 rounded-tr-xl">Komentarz Diagnozy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {INDICATOR_DATA.map((ind, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-bold text-slate-900">{ind.metric}</td>
                  <td className="p-3">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold text-[10px]">
                      {ind.category}
                    </span>
                  </td>
                  <td className="p-3 text-right font-mono font-medium text-slate-600">
                    {ind.val2015} {ind.unit}
                  </td>
                  <td className="p-3 text-right font-mono font-bold text-slate-900">
                    {ind.val2022} {ind.unit}
                  </td>
                  <td className="p-3 text-right font-mono font-bold text-emerald-700 bg-emerald-50/50">
                    {ind.target2035} {ind.unit}
                  </td>
                  <td className="p-3 text-center font-bold">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] ${
                        ind.changePercent?.startsWith('-')
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {ind.changePercent}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600 max-w-xs leading-relaxed text-[11px]">{ind.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grid of Interactive Visual Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Demographics & Population */}
        {(activeSection === 'all' || activeSection === 'demografia') && (
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Demografia
                </span>
                <h4 className="font-bold text-slate-900 text-sm mt-0.5">
                  Liczba Ludności Obszaru Rewitalizacji (2015-2035)
                </h4>
              </div>
              <Users className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-xs text-slate-600">
              Spadek ludności o -34.9% na obszarze rewitalizacji (z 6500 do 4230 osób) z powodu suburbanizacji i wyłączania zużytych kamienic.
            </p>
            <div className="h-60 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={populationData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="year" tick={{ fontSize: 11, fontWeight: 'bold' }} />
                  <YAxis domain={[0, 8000]} tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', border: 'none' }}
                  />
                  <Bar dataKey="populacja" name="Liczba mieszkańców" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Chart 2: Unemployment Structure */}
        {(activeSection === 'all' || activeSection === 'demografia') && (
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  Rynek Pracy
                </span>
                <h4 className="font-bold text-slate-900 text-sm mt-0.5">
                  Struktura Bezrobocia (na 1000 mieszkańców)
                </h4>
              </div>
              <Briefcase className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-xs text-slate-600">
              Systematyczny spadek wskaźników bezrobocia, w tym długotrwałego i osób z wykształceniem gimnazjalnym/podstawowym.
            </p>
            <div className="h-60 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={unemploymentData} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 9 }} interval={0} />
                  <YAxis domain={[0, 70]} tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', border: 'none' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="2015" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="2022" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="2035 Cel" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Chart 3: Safety Perception Ratings */}
        {(activeSection === 'all' || activeSection === 'bezpieczenstwo') && (
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-md space-y-3 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  Ocena Mieszkańców
                </span>
                <h4 className="font-bold text-slate-900 text-sm mt-0.5">
                  Subiektywna Ocena Bezpieczeństwa Przestrzeni (Skala Szkolna 1–6)
                </h4>
              </div>
              <ShieldAlert className="w-5 h-5 text-indigo-600" />
            </div>
            <p className="text-xs text-slate-600">
              Wyniki badań ankietowych z 2016 r. vs 2023 r. Najwyżej oceniane są nowo utworzone strefy (park kieszonkowy z tężnią 3.89/6, Centrum Senioralne 3.81/6). Najniżej – podwórka kamienic (1.86/6).
            </p>
            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={PERCEPTION_SAFETY} layout="vertical" margin={{ top: 5, right: 30, left: 140, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis type="number" domain={[0, 6]} tick={{ fontSize: 11 }} />
                  <YAxis dataKey="location" type="category" tick={{ fontSize: 10, fontWeight: 'bold' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', border: 'none' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="score2016" name="Średnia ocena 2016" fill="#94a3b8" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="score2023" name="Średnia ocena 2023" fill="#6366f1" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Chart 4: Environmental Stoves & Green Spaces */}
        {(activeSection === 'all' || activeSection === 'srodowisko') && (
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-md space-y-3 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Środowisko & Klimat
                </span>
                <h4 className="font-bold text-slate-900 text-sm mt-0.5">
                  Eliminacja Kopciuchów vs Wzrost Terenów Zielonych (m²)
                </h4>
              </div>
              <TreePine className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-xs text-slate-600">
              Spadek budynków ogrzewanych piecami na paliwo stałe ze 190 w 2015 do 46 w 2022 oraz skok powierzchni terenów rekreacyjnych w centrum z 0 do 14 316 m².
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                <span className="text-xs font-bold text-slate-500 uppercase block">Kopciuchy Gminne</span>
                <div className="flex items-center justify-center gap-3 mt-2">
                  <span className="text-2xl font-black text-rose-600">190</span>
                  <span className="text-xs text-slate-400">➔</span>
                  <span className="text-2xl font-black text-amber-600">46</span>
                  <span className="text-xs text-slate-400">➔</span>
                  <span className="text-2xl font-black text-emerald-600">30 (2035)</span>
                </div>
                <span className="text-[11px] text-emerald-700 font-semibold block mt-1">Spadek o -75.8%</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                <span className="text-xs font-bold text-slate-500 uppercase block">Powierzchnia Zieleni Rekreacyjnej</span>
                <div className="flex items-center justify-center gap-3 mt-2">
                  <span className="text-2xl font-black text-slate-400">0 m²</span>
                  <span className="text-xs text-slate-400">➔</span>
                  <span className="text-2xl font-black text-emerald-600">14 316 m²</span>
                  <span className="text-xs text-slate-400">➔</span>
                  <span className="text-2xl font-black text-teal-600">15 500 m²</span>
                </div>
                <span className="text-[11px] text-emerald-700 font-semibold block mt-1">+14,316 m² nowej zieleni w centrum</span>
              </div>
            </div>
          </div>
        )}

        {/* Chart 5: Education Exam Scores */}
        {(activeSection === 'all' || activeSection === 'edukacja') && (
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-md space-y-3 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                  Edukacja
                </span>
                <h4 className="font-bold text-slate-900 text-sm mt-0.5">
                  Wyniki Egzaminu Ósmoklasisty 2022 w Szkołach Rejonowych (%)
                </h4>
              </div>
              <GraduationCap className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-xs text-slate-600">
              Szkoły rejonu rewitalizacji (SP4 Integracyjna i SP5 Sportowa) uzyskały niższe średnie wyniki niż reszta gminy Wołomin. Wskazuje to na potrzebę programu wyrównywania szans i kół zainteresowań.
            </p>
            <div className="h-60 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={examData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="szkoła" tick={{ fontSize: 11, fontWeight: 'bold' }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', border: 'none' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="J. polski" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Matematyka" fill="#ec4899" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="J. angielski" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
