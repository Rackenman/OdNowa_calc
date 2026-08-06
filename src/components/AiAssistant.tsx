import React, { useState } from 'react';
import { Bot, Send, Sparkles, MessageSquare, CornerDownLeft, ShieldCheck, HelpCircle } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'assistant';
  text: string;
}

export const AiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'assistant',
      text: 'Witaj! Jestem Inteligentnym Asystentem Gminnego Programu Rewitalizacji Wołomina (GPR 2025–2035). Odpowiadam na pytania dotyczące budżetu, zadań inwestycyjnych, wskaźnika deprywacji $K_s$ oraz uchwał Specjalnej Strefy Rewitalizacji. W czym mogę Ci dzisiaj pomóc?',
    },
  ]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const samplePrompts = [
    'Jaki jest budżet na Woonerf Wileńska (Zadanie 2.3)?',
    'Jak obliczany jest wskaźnik deprywacji Ks w Wołominie?',
    'Co obejmuje inwestycja w Centrum Wiktoryn (PP2)?',
    'Jakie ulice wchodzą w obszar Specjalnej Strefy Rewitalizacji?',
  ];

  const handleSend = (queryText?: string) => {
    const q = queryText || input;
    if (!q.trim()) return;

    const userMsg: ChatMessage = { sender: 'user', text: q };
    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput('');
    setLoading(true);

    setTimeout(() => {
      let reply = 'Przepraszam, nie znalazłem bezpośredniej odpowiedzi w sekcjach GPR. Skontaktuj się z Zespołem Rewitalizacji Urzędu Miejskiego.';
      const lower = q.toLowerCase();

      if (lower.includes('woonerf') || lower.includes('wileńska') || lower.includes('2.3')) {
        reply = 'Zadanie 2.3 obejmuje kompleksowe zagospodarowanie ulicy Wileńskiej jako Woonerf (podwórko miejskie) z priorytetem dla pieszych i rowerzystów. Szacowany budżet wynosi **8 500 000 zł** (w tym 50% ze środków unijnych EFRR). Planowane lata realizacji to 2026–2028.';
      } else if (lower.includes('ks') || lower.includes('deprywacji') || lower.includes('wskaźnik')) {
        reply = 'Wskaźnik Syntetycznej Deprywacji ($K_s$) w Wołominie wyliczany jest według wzoru: **K_s = 0,44·U + 0,44·B + 0,12·(P + E + W)**, gdzie U to wskaźnik ubóstwa, B to bezrobocie, P – przestępczość, E – wyniki edukacyjne, a W – wycofanie społeczne. Dla obszaru Centrum Wołomina $K_s$ wynosił wyjściowo **4,12** (przekraczając próg degradacji 2,17).';
      } else if (lower.includes('wiktoryn') || lower.includes('pp2')) {
        reply = 'Przedsięwzięcie PP2: "Nowe Centrum Urbanistyczne - Wiktoryn" to największy projekt GPR o wartości **61,9 mln zł**. Zakłada zagospodarowanie terenu przy ul. Wileńskiej (po byłym obiekcie Globi) na funkcje mieszkalno-usługowe, podziemny parking Park & Ride oraz przestrzeń rekreacyjną w formule Partnerstwa Publiczno-Prywatnego (PPP).';
      } else if (lower.includes('strefa') || lower.includes('uchwała') || lower.includes('ulice')) {
        reply = 'Specjalna Strefa Rewitalizacji została ustanowiona Uchwałą Rady Miejskiej na okres 10 lat. Obejmuje obszar Centrum Wołomina (58,4 ha) oraz m.in. ulice: Wileńska, Żelazna, Daszyńskiego, Mariańska, Kościelna i Plac 3 Maja. Przyznaje gminie prawo pierwokupu nieruchomości oraz zwolnienia podatkowe dla inwestorów komunalnych.';
      }

      setMessages((prev) => [...prev, { sender: 'assistant', text: reply }]);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-indigo-400/30">
            <Bot className="w-3.5 h-3.5" />
            System Rekomendacji i Analizy Treści GPR
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Interaktywny Asystent AI GPR</h2>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Zadawaj pytania językiem naturalnym na temat uchwał, zapisów finansowych, mapy oraz harmonogramu rewitalizacji Wołomina.
          </p>
        </div>
      </div>

      {/* Suggested Quick Questions */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Szybkie zapytania testowe:</span>
        <div className="flex flex-wrap gap-2">
          {samplePrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSend(p)}
              className="px-3 py-1.5 bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 text-xs font-semibold rounded-lg border border-slate-200 transition-colors text-left cursor-pointer"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Panel */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[480px]">
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                  m.sender === 'user'
                    ? 'bg-slate-900 text-white'
                    : 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                }`}
              >
                {m.sender === 'user' ? 'Ty' : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`p-4 rounded-2xl max-w-xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-indigo-600 text-white font-medium rounded-tr-none'
                    : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-none'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
              <Sparkles className="w-4 h-4 animate-spin text-indigo-600" />
              <span>Asystent analizuje zapisy GPR Wołomina...</span>
            </div>
          )}
        </div>

        {/* Input bar */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 rounded-b-xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Zapytaj asystenta AI o dowolne zadanie lub wyliczenie z GPR..."
              className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-sm shadow-indigo-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Wyślij</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
