import React, { useState } from 'react';
import { GPR_TASKS } from '../data/gprData';
import { GprTask, SphereType, ProjectCategory } from '../types';
import { 
  Search, 
  Filter, 
  FolderKanban, 
  Coins, 
  Calendar, 
  Building2, 
  Users, 
  CheckCircle2, 
  X, 
  Sparkles, 
  ShieldAlert, 
  Accessibility,
  ArrowUpDown,
  ExternalLink
} from 'lucide-react';

interface ProjectsCatalogProps {
  initialTask?: GprTask | null;
  onClearInitialTask?: () => void;
}

export const ProjectsCatalog: React.FC<ProjectsCatalogProps> = ({
  initialTask,
  onClearInitialTask,
}) => {
  const [selectedTask, setSelectedTask] = useState<GprTask | null>(initialTask || null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<ProjectCategory | 'all'>('all');
  const [sphereFilter, setSphereFilter] = useState<SphereType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'id' | 'budgetDesc' | 'budgetAsc'>('id');

  // Sync if initialTask changes
  React.useEffect(() => {
    if (initialTask) {
      setSelectedTask(initialTask);
    }
  }, [initialTask]);

  const closeTaskModal = () => {
    setSelectedTask(null);
    if (onClearInitialTask) onClearInitialTask();
  };

  const sphereLabels: Record<SphereType, { label: string; color: string }> = {
    spoleczna: { label: 'Społeczna', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    gospodarcza: { label: 'Gospodarcza', color: 'bg-amber-100 text-amber-800 border-amber-200' },
    srodowiskowa: { label: 'Środowiskowa', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    przestrzenna: { label: 'Przestrzenna', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    techniczna: { label: 'Techniczna', color: 'bg-slate-100 text-slate-800 border-slate-300' },
  };

  const filteredTasks = GPR_TASKS.filter((task) => {
    // Search match
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      task.id.toLowerCase().includes(query) ||
      task.title.toLowerCase().includes(query) ||
      task.location.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query) ||
      task.responsible.toLowerCase().includes(query);

    // Category match
    const matchesCategory = categoryFilter === 'all' || task.category === categoryFilter;

    // Sphere match
    const matchesSphere = sphereFilter === 'all' || task.spheres.includes(sphereFilter);

    return matchesSearch && matchesCategory && matchesSphere;
  }).sort((a, b) => {
    if (sortBy === 'budgetDesc') return b.budgetPln - a.budgetPln;
    if (sortBy === 'budgetAsc') return a.budgetPln - b.budgetPln;
    return a.id.localeCompare(b.id, undefined, { numeric: true });
  });

  const formatPln = (amount: number) => {
    if (amount >= 1000000) {
      return (amount / 1000000).toFixed(2) + ' mln zł';
    }
    return (amount / 1000).toFixed(0) + ' tys. zł';
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-indigo-400/30">
            <FolderKanban className="w-3.5 h-3.5" />
            Baza Przedsięwzięć Rewitalizacyjnych GPR 2.0
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Katalog Zadań i Inwestycji</h2>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Kompletna lista 38 zadań podstawowych i uzupełniających obejmująca wszystkie sfery rewitalizacji Wołomina.
          </p>
        </div>
        <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700 text-xs flex items-center gap-4">
          <div>
            <span className="text-slate-400 block font-medium">Liczba zadań w bazie:</span>
            <span className="text-indigo-400 font-extrabold text-lg">{GPR_TASKS.length} zadań</span>
          </div>
          <div className="border-l border-slate-700 pl-4">
            <span className="text-slate-400 block font-medium">Suma budżetu:</span>
            <span className="text-emerald-400 font-extrabold text-lg">118,16 mln zł</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Search Field */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Szukaj zadania (np. Plac 3 Maja, Woonerf, senior, OPS)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
              >
                ×
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="md:col-span-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as any)}
              className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 cursor-pointer"
            >
              <option value="all">Wszystkie kategorie (Podstawowe + Uzupełniające)</option>
              <option value="podstawowe">Przedsięwzięcia Podstawowe (PP1-PP5)</option>
              <option value="uzupelniajace">Przedsięwzięcia Uzupełniające (PU1-PU5)</option>
            </select>
          </div>

          {/* Sphere Filter */}
          <div className="md:col-span-2">
            <select
              value={sphereFilter}
              onChange={(e) => setSphereFilter(e.target.value as any)}
              className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 cursor-pointer"
            >
              <option value="all">Wszystkie sfery problemowe</option>
              <option value="spoleczna">Społeczna</option>
              <option value="gospodarcza">Gospodarcza</option>
              <option value="srodowiskowa">Środowiskowa</option>
              <option value="przestrzenna">Przestrzenna</option>
              <option value="techniczna">Techniczna</option>
            </select>
          </div>

          {/* Sort Filter */}
          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 cursor-pointer"
            >
              <option value="id">Sortuj po Numerze Zadania</option>
              <option value="budgetDesc">Budżet: Najwyższy najpierw</option>
              <option value="budgetAsc">Budżet: Najniższy najpierw</option>
            </select>
          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>
            Znaleziono <strong className="text-slate-900">{filteredTasks.length}</strong> z {GPR_TASKS.length} zadań
          </span>
          {(searchQuery || categoryFilter !== 'all' || sphereFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
                setSphereFilter('all');
              }}
              className="text-indigo-600 hover:text-indigo-800 font-bold underline cursor-pointer"
            >
              Wyczyszczenie filtrów
            </button>
          )}
        </div>
      </div>

      {/* Task Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            onClick={() => setSelectedTask(task)}
            className="bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-400/80 p-5 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between cursor-pointer group relative overflow-hidden"
          >
            {/* Top Accent Strip */}
            <div
              className={`absolute top-0 left-0 right-0 h-1.5 ${
                task.category === 'podstawowe' ? 'bg-emerald-500' : 'bg-blue-500'
              }`}
            />

            <div className="space-y-3">
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono font-black text-xs bg-slate-900 text-emerald-400 px-2.5 py-1 rounded-lg shadow-sm">
                  Zadanie {task.id}
                </span>
                <span
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                    task.category === 'podstawowe'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {task.category === 'podstawowe' ? 'Podstawowe' : 'Uzupełniające'}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                {task.title}
              </h3>

              {/* Location */}
              <p className="text-xs text-slate-500 line-clamp-1 flex items-center gap-1">
                <span className="font-semibold text-slate-700">Lokalizacja:</span> {task.location}
              </p>

              {/* Spheres Badges */}
              <div className="flex flex-wrap gap-1 pt-1">
                {task.spheres.map((sph) => {
                  const info = sphereLabels[sph];
                  return (
                    <span
                      key={sph}
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${info.color}`}
                    >
                      {info.label}
                    </span>
                  );
                })}
              </div>

              {/* Short snippet */}
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-1">
                {task.description}
              </p>
            </div>

            {/* Footer Budget & Action */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-slate-900 font-bold">
                <Coins className="w-4 h-4 text-amber-500" />
                <span>{formatPln(task.budgetPln)}</span>
              </div>
              <span className="text-emerald-700 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Szczegóły <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
          <FolderKanban className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">Nie znaleziono zadań spełniających kryteria</h3>
          <p className="text-xs text-slate-500">Spróbuj zmienić słowo kluczowe w wyszukiwarce lub zresetować filtry.</p>
        </div>
      )}

      {/* Task Modal / Drawer */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-6 relative">
              <button
                onClick={closeTaskModal}
                className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 p-2 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="bg-emerald-500 text-slate-950 font-black text-xs px-2.5 py-1 rounded-md uppercase tracking-wider">
                  Zadanie {selectedTask.id}
                </span>
                <span className="text-xs text-slate-300 font-medium">
                  {selectedTask.parentTitle}
                </span>
              </div>

              <h2 className="text-xl font-black text-white leading-tight">
                {selectedTask.title}
              </h2>

              <div className="flex flex-wrap items-center gap-3 mt-4 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
                  <Coins className="w-4 h-4 text-amber-400" />
                  Budżet: <strong className="text-white">{formatPln(selectedTask.budgetPln)}</strong>
                </span>
                <span className="flex items-center gap-1.5 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  Okres: <strong className="text-white">{selectedTask.timeline}</strong>
                </span>
              </div>
            </div>

            {/* Modal Content Scrollable */}
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              
              {/* Location & Responsible */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 uppercase font-bold text-[10px] block mb-0.5">Lokalizacja Inwestycji:</span>
                  <span className="font-semibold text-slate-900">{selectedTask.location}</span>
                </div>
                <div>
                  <span className="text-slate-400 uppercase font-bold text-[10px] block mb-0.5">Podmiot Realizujący:</span>
                  <span className="font-semibold text-slate-900">{selectedTask.responsible}</span>
                </div>
              </div>

              {/* Problems Addressed */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-500" />
                  Główne Adresowane Problemy Diagnozy:
                </h4>
                <ul className="space-y-1.5 bg-rose-50/60 border border-rose-200 p-3.5 rounded-xl text-xs text-rose-950">
                  {selectedTask.problemsAddressed.map((prob, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{prob}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Zakres Realizowanych Zadań:
                </h4>
                <p className="text-sm text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {selectedTask.description}
                </p>
              </div>

              {/* Expected Results */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Prognozowane Rezultaty:
                </h4>
                <ul className="space-y-1.5 bg-emerald-50/60 border border-emerald-200 p-3.5 rounded-xl text-xs text-emerald-950">
                  {selectedTask.expectedResults.map((res, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Accessibility Features */}
              {selectedTask.accessibilityFeatures && selectedTask.accessibilityFeatures.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Accessibility className="w-4 h-4 text-indigo-600" />
                    Działania Zapewniające Dostępność (Ustawa o Dostępności 2019):
                  </h4>
                  <ul className="space-y-1 bg-indigo-50/60 border border-indigo-200 p-3.5 rounded-xl text-xs text-indigo-950">
                    {selectedTask.accessibilityFeatures.map((acc, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span>{acc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Key Indicator Target */}
              {selectedTask.keyIndicator && (
                <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl flex items-center justify-between text-xs text-amber-950">
                  <div>
                    <span className="font-bold block">{selectedTask.keyIndicator.name}</span>
                    <span className="text-[11px] text-amber-800">Wskaźnik rezultatu docelowego</span>
                  </div>
                  <span className="font-black text-amber-900 bg-amber-200/80 px-3 py-1 rounded-lg text-sm">
                    {selectedTask.keyIndicator.targetValue}
                  </span>
                </div>
              )}

              {/* Partners */}
              {selectedTask.partners && selectedTask.partners.length > 0 && (
                <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span className="font-bold text-slate-700">Potencjalne Partnerstwa:</span>{' '}
                  {selectedTask.partners.join(', ')}
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="bg-slate-100 p-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={closeTaskModal}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
              >
                Zamknij Karta Zadania
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
