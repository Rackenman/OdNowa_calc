import React, { useState } from 'react';
import { Users, ThumbsUp, PlusCircle, CheckCircle2, MessageSquare, Sparkles, Filter, ShieldCheck } from 'lucide-react';
import { CitizenIdea } from '../types';

export const CivicOdnowa: React.FC = () => {
  const [ideas, setIdeas] = useState<CitizenIdea[]>([
    {
      id: 'M1',
      title: 'Ogród Deszczowy i Ławki Solarne na Placu 3 Maja',
      author: 'Marta Kowalska (Mieszkanka Śródmieścia)',
      location: 'Plac 3 Maja / ul. Wileńska',
      category: 'podworko',
      votes: 142,
      status: 'zaakceptowany',
      createdAt: '2025-02-10',
      description: 'Montaż 2 ławek solarnych z portami USB oraz nasadzenie odpornych na suszę roślin retencyjnych gromadzących wodę opadową.',
    },
    {
      id: 'M2',
      title: 'Młodzieżowy Klub Dyskusyjny w CAW Stara Elektrownia',
      author: 'Piotr Nowak (Młodzieżowa Rada Miejska)',
      location: 'ul. Daszyńskiego 3',
      category: 'młodziez',
      votes: 98,
      status: 'w_weryfikacji',
      createdAt: '2025-02-14',
      description: 'Zakup sprzętu nagłośnieniowego i projektora do cotygodniowych debat i seansów filmowych organizowanych przez młodzież.',
    },
    {
      id: 'M3',
      title: 'Zielone Podwórko przy ul. Wileńskiej 12/14',
      author: 'Spółdzielnia Mieszkaniowa Wileńska',
      location: 'ul. Wileńska 12/14',
      category: 'podworko',
      votes: 84,
      status: 'zgłoszony',
      createdAt: '2025-02-18',
      description: 'Rewitalizacja wewnętrznego dziedzińca: nowa nawierzchnia przepuszczalna, pnącza na ściany i domki dla owadów pożytecznych.',
    },
  ]);

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newAuthor, setNewAuthor] = useState<string>('');
  const [newLocation, setNewLocation] = useState<string>('');
  const [newCategory, setNewCategory] = useState<'podworko' | 'zieleniec' | 'kultura' | 'młodziez'>('podworko');
  const [newDescription, setNewDescription] = useState<string>('');

  const handleVote = (id: string) => {
    setIdeas((prev) =>
      prev.map((idea) => (idea.id === id ? { ...idea, votes: idea.votes + 1 } : idea))
    );
  };

  const handleAddIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    const newIdea: CitizenIdea = {
      id: `M${ideas.length + 1}`,
      title: newTitle,
      author: newAuthor || 'Mieszkaniec Wołomina',
      location: newLocation || 'Centrum Wołomina',
      category: newCategory,
      votes: 1,
      status: 'zgłoszony',
      createdAt: new Date().toISOString().split('T')[0],
      description: newDescription,
    };

    setIdeas([newIdea, ...ideas]);
    setShowModal(false);
    setNewTitle('');
    setNewAuthor('');
    setNewLocation('');
    setNewDescription('');
  };

  const filteredIdeas = ideas.filter(
    (i) => filterCategory === 'all' || i.category === filterCategory
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-indigo-400/30">
            <Users className="w-3.5 h-3.5" />
            Rozdział 6: Partycypacja Społeczna i Inicjatywy Dzielnicowe
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Wołomin ODNOWA — Program Mikrograntów</h2>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Pulę 200 000 zł rocznie przeznaczono na bezpośrednie projekty sąsiedzkie składane przez mieszkańców obszaru rewitalizacji (do 15 000 zł na inicjatywę).
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-sm shadow-indigo-200 flex items-center gap-2 transition-all cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Zgłoś Własny Pomysł</span>
        </button>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kategorie inicjatyw:</span>
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'Wszystkie pomysły' },
              { id: 'podworko', label: 'Zielone Podwórka' },
              { id: 'kultura', label: 'Kultura & Dni Sąsiada' },
              { id: 'młodziez', label: 'Inicjatywy Młodzieżowe' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  filterCategory === cat.id
                    ? 'bg-indigo-600 text-white font-bold shadow-sm shadow-indigo-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredIdeas.map((idea) => (
          <div
            key={idea.id}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-bold border border-indigo-100 uppercase tracking-wider">
                  {idea.category}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">{idea.createdAt}</span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-base leading-snug">{idea.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{idea.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-3">
              <div className="text-[11px] text-slate-500 space-y-0.5">
                <div>Lokalizacja: <strong className="text-slate-800">{idea.location}</strong></div>
                <div>Autor: <strong className="text-slate-800">{idea.author}</strong></div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => handleVote(idea.id)}
                  className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-lg border border-indigo-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Głosuj ({idea.votes})</span>
                </button>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                    idea.status === 'zaakceptowany'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {idea.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submission Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900">Zgłoś Własną Inicjatywę Sąsiedzką</h3>
            <p className="text-xs text-slate-600">
              Wypełnij krótki formularz zgłoszeniowy do Programu Mikrograntów Wołomin ODNOWA.
            </p>
            <form onSubmit={handleAddIdea} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tytuł Pomysłu</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="np. Kwitnąca Wileńska - pnącza i donice"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Autor / Grupa</label>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="np. Jan Kowalski"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kategoria</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  >
                    <option value="podworko">Zielone Podwórka</option>
                    <option value="kultura">Kultura & Dni Sąsiada</option>
                    <option value="młodziez">Inicjatywa Młodzieżowa</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Lokalizacja</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="np. ul. Wileńska 15"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Opis Inicjatywy</label>
                <textarea
                  rows={3}
                  required
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Opisz krótko na co przeznaczone zostaną środki i jakie przyniesie to korzyści sąsiadom..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-200"
                >
                  Zapisz Zgłoszenie
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
