import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Info, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle,
  X, 
  ExternalLink, 
  FileText
} from 'lucide-react';
import { 
  calculationModels, 
  cityModels, 
  educationalExampleValues, 
  CalculationModel,
  CityModel 
} from '../data/examplePresets';
import { calculateSyntheticScore } from '../data/calculateSyntheticScore.js';
import { CircularScoreGauge, MiniCircularRing } from './CircularGauge';

export const DeprivationCalculator: React.FC = () => {
  // 1. App State
  const [selectedModelId, setSelectedModelId] = useState<'model-a' | 'model-b' | 'model-c'>('model-a');

  // Sliders for sub-indices (0.0 to 10.0)
  const [ubostwoU, setUbostwoU] = useState<number>(educationalExampleValues.poverty);
  const [bezrobocieB, setBezrobocieB] = useState<number>(educationalExampleValues.unemployment);
  const [przestepczoscP, setPrzestepczoscP] = useState<number>(educationalExampleValues.safety);
  const [edukacjaE, setEdukacjaE] = useState<number>(educationalExampleValues.education);
  const [wycofanieW, setWycofanieW] = useState<number>(educationalExampleValues.participation);

  // Modal for source document methodology
  const [activeDetailCityId, setActiveDetailCityId] = useState<string | null>(null);

  // Active Tooltip popover
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Collapsible Methodology
  const [isMethodologyOpen, setIsMethodologyOpen] = useState<boolean>(false);

  // Collapsible FAQ Section
  const [isFaqSectionOpen, setIsFaqSectionOpen] = useState<boolean>(false);

  // Accordion FAQ states
  const [openFaqWhatIs, setOpenFaqWhatIs] = useState<boolean>(false);
  const [openFaqHowToUse, setOpenFaqHowToUse] = useState<boolean>(false);
  const [openFaqWhyIndicators, setOpenFaqWhyIndicators] = useState<boolean>(false);
  const [openFaqWhatNotMeans, setOpenFaqWhatNotMeans] = useState<boolean>(false);
  const [openFaqWhyDifferentWeights, setOpenFaqWhyDifferentWeights] = useState<boolean>(false);

  // Derived Model Data
  const activeModel: CalculationModel = calculationModels[selectedModelId] || calculationModels['model-a'];
  const activeWeights = activeModel.weights;

  // Key event handlers for closing modal/tooltips on Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveTooltip(null);
        setActiveDetailCityId(null);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Score Calculations
  const uContrib = ubostwoU * activeWeights.u;
  const bContrib = bezrobocieB * activeWeights.b;
  const pContrib = przestepczoscP * activeWeights.p;
  const eContrib = edukacjaE * activeWeights.e;
  const wContrib = wycofanieW * activeWeights.w;

  const baseKs = useMemo(() => {
    return calculateSyntheticScore({
      u: ubostwoU,
      b: bezrobocieB,
      p: przestepczoscP,
      e: edukacjaE,
      w: wycofanieW,
    }, activeWeights);
  }, [ubostwoU, bezrobocieB, przestepczoscP, edukacjaE, wycofanieW, activeWeights]);

  // Top 3 Contributors to Score
  const topContributors = useMemo(() => {
    const items = [
      { id: 'u', name: 'Ubóstwo i pomoc społeczna (U)', shortName: 'Ubóstwo', val: uContrib, color: '#F4D03F' },
      { id: 'b', name: 'Bezrobocie (B)', shortName: 'Bezrobocie', val: bContrib, color: '#4A6B82' },
      { id: 'p', name: 'Bezpieczeństwo (P)', shortName: 'Bezpieczeństwo', val: pContrib, color: '#6E947A' },
      { id: 'e', name: 'Edukacja (E)', shortName: 'Edukacja', val: eContrib, color: '#354E60' },
      { id: 'w', name: 'Niska aktywność społeczna (W)', shortName: 'Niska aktywność społeczna', val: wContrib, color: '#D4B020' },
    ];
    return items.sort((a, b) => b.val - a.val).slice(0, 3);
  }, [uContrib, bContrib, pContrib, eContrib, wContrib]);

  // Action Handlers
  const handleSelectModel = (modelId: 'model-a' | 'model-b' | 'model-c') => {
    setSelectedModelId(modelId);
  };

  const handleResetToDefaultValues = () => {
    setUbostwoU(educationalExampleValues.poverty);
    setBezrobocieB(educationalExampleValues.unemployment);
    setPrzestepczoscP(educationalExampleValues.safety);
    setEdukacjaE(educationalExampleValues.education);
    setWycofanieW(educationalExampleValues.participation);
  };

  const handleSliderChange = (setter: React.Dispatch<React.SetStateAction<number>>, value: number) => {
    setter(value);
  };

  const toggleTooltip = (id: string) => {
    setActiveTooltip(prev => prev === id ? null : id);
  };

  const formatW = (num: number) => num.toFixed(2).replace('.', ',');
  const formatVal = (num: number) => num.toFixed(2).replace('.', ',');

  const detailCity: CityModel | null = activeDetailCityId ? cityModels[activeDetailCityId] : null;

  useEffect(() => {
    if (!detailCity) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const previouslyFocusedElement = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const getFocusableElements = (): HTMLElement[] => Array.from(dialog.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )) as HTMLElement[];
    const focusableElements = getFocusableElements();
    focusableElements[0]?.focus();

    const handleTabKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const elements = getFocusableElements();
      const firstElement = elements[0];
      const lastElement = elements[elements.length - 1];

      if (!firstElement || !lastElement) {
        event.preventDefault();
        dialog.focus();
      } else if (event.shiftKey && (document.activeElement === firstElement || !dialog.contains(document.activeElement))) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && (document.activeElement === lastElement || !dialog.contains(document.activeElement))) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleTabKeyDown);
    return () => {
      document.removeEventListener('keydown', handleTabKeyDown);
      if (previouslyFocusedElement?.isConnected) previouslyFocusedElement.focus();
    };
  }, [detailCity]);

  return (
    <div className="space-y-8">
      {/* 1. HERO WELCOME CARD */}
      <section id="simulator" className="space-y-6">
        <div className="bg-[#1E2A34] text-white p-6 md:p-8 rounded-none border-l-4 border-[#F4D03F] border-t border-r border-b border-[#354E60] shadow-md space-y-6 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#4A6B82]/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              Symulator koncentracji problemów społecznych
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Narzędzie pokazuje, jak pięć rodzajów problemów społecznych można połączyć w jeden syntetyczny wynik. Użytkownik wybiera sposób liczenia, ustawia natężenie problemów, a aplikacja oblicza wynik w skali od 0 do 10.
            </p>

            {/* Three Short Explanatory Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className="bg-[#2C3E50]/80 p-3.5 border border-[#354E60] rounded-none space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#F4D03F] block">
                  CO TO JEST
                </span>
                <p className="text-xs text-slate-200 font-medium leading-snug">
                  Kalkulator pięciu grup problemów społecznych.
                </p>
              </div>

              <div className="bg-[#2C3E50]/80 p-3.5 border border-[#354E60] rounded-none space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#A3C1AD] block">
                  JAK DZIAŁA
                </span>
                <p className="text-xs text-slate-200 font-medium leading-snug">
                  Każdy problem otrzymuje wartość od 0 do 10 i określoną wagę.
                </p>
              </div>

              <div className="bg-[#2C3E50]/80 p-3.5 border border-[#354E60] rounded-none space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#F4D03F] block">
                  PO CO
                </span>
                <p className="text-xs text-slate-200 font-medium leading-snug">
                  Pozwala porównywać metody stosowane w dokumentach rewitalizacyjnych.
                </p>
              </div>
            </div>

            {/* Disclaimer Box */}
            <div className="p-3 bg-[#2C3E50] border-l-2 border-[#A3C1AD] rounded-none text-xs text-slate-200 flex items-start gap-3 mt-2">
              <Info className="w-4 h-4 text-[#A3C1AD] shrink-0 mt-0.5 stroke-[2.2]" fill="currentColor" fillOpacity={0.2} />
              <p className="leading-snug">
                Symulator ma charakter edukacyjny. Nie zastępuje diagnozy obszaru zdegradowanego, konsultacji społecznych ani uchwały rady gminy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE-STEP INSTRUCTIONS SECTION */}
      <section className="bg-white p-6 rounded-none border-2 border-[#4A6B82]/20 shadow-xs space-y-4">
        <h3 className="text-base font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-3">
          Jak korzystać z symulatora?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 border-l-4 border-[#4A6B82] border-t border-r border-b border-slate-200 rounded-none space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-none bg-[#4A6B82] text-white font-mono font-black text-xs flex items-center justify-center shrink-0">
                1
              </span>
              <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                Wybierz model liczenia
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Model określa, jak duży wpływ ma każdy z pięciu problemów.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border-l-4 border-[#F4D03F] border-t border-r border-b border-slate-200 rounded-none space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-none bg-[#D4B020] text-white font-mono font-black text-xs flex items-center justify-center shrink-0">
                2
              </span>
              <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                Ustaw dane wejściowe
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Możesz samodzielnie ustawić wartości albo użyć przykładu edukacyjnego.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border-l-4 border-[#6E947A] border-t border-r border-b border-slate-200 rounded-none space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-none bg-[#6E947A] text-white font-mono font-black text-xs flex items-center justify-center shrink-0">
                3
              </span>
              <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                Odczytaj wynik
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Wynik pokazuje łączną koncentrację ustawionych problemów w skali od 0 do 10.
            </p>
          </div>
        </div>
      </section>

      {/* 3. CHOOSE CALCULATION MODEL */}
      <section className="bg-white p-6 rounded-none border-2 border-[#4A6B82]/20 shadow-xs space-y-5">
        <div>
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            Wybierz model liczenia
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Model określa strukturę wag stosowaną do połączenia pięciu problemów społecznych. Wybór modelu nie zmienia wartości suwaków.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.values(calculationModels).map((m) => {
            const isActive = selectedModelId === m.id;
            return (
              <div
                key={m.id}
                className={`p-4 rounded-none border-2 transition-all flex flex-col justify-between space-y-4 ${
                  isActive
                    ? 'bg-[#1E2A34] text-white border-[#F4D03F] shadow-md'
                    : 'bg-slate-50 text-slate-900 border-slate-200 hover:border-[#4A6B82]'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-mono font-black px-2 py-0.5 rounded-none uppercase border ${
                      isActive ? 'bg-[#2C3E50] text-[#F4D03F] border-[#4A6B82]' : 'bg-slate-200 text-slate-700 border-slate-300'
                    }`}>
                      {m.code}
                    </span>
                    {isActive && (
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#A3C1AD] bg-[#2C3E50] px-2 py-0.5 border border-[#4A6B82]">
                        Aktywny model
                      </span>
                    )}
                  </div>

                  <h4 className="font-extrabold text-sm leading-snug">
                    {m.title}
                  </h4>

                  <div className={`p-2 font-mono text-[11px] rounded-none border ${
                    isActive ? 'bg-[#2C3E50] border-[#354E60] text-[#A3C1AD]' : 'bg-white border-slate-200 text-slate-700'
                  }`}>
                    Wagi: U {(m.weights.u * 100).toFixed(0)}% · B {(m.weights.b * 100).toFixed(0)}% · P {(m.weights.p * 100).toFixed(0)}% · E {(m.weights.e * 100).toFixed(0)}% · W {(m.weights.w * 100).toFixed(0)}%
                  </div>

                  <div className={`text-xs space-y-1 leading-relaxed ${isActive ? 'text-slate-300' : 'text-slate-600'}`}>
                    <div><strong>Źródło metody:</strong> {m.sourceCities}</div>
                    <p className="text-[11px] italic">{m.info}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectModel(m.id)}
                  disabled={isActive}
                  className={`w-full py-2.5 px-3 rounded-none text-xs font-black transition-all cursor-pointer border-b-2 ${
                    isActive
                      ? 'bg-[#2C3E50] text-slate-300 border-slate-500 cursor-default opacity-80'
                      : 'bg-[#4A6B82] hover:bg-[#385163] text-white border-[#F4D03F]'
                  }`}
                >
                  {isActive ? 'Aktywny model' : 'Zastosuj ten model'}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* FORMULA & SLIDERS INTERFACE */}
      <section className="bg-white p-6 rounded-none border-2 border-[#4A6B82]/20 shadow-xs space-y-6">
        {/* Sliders Header ("Co ustawiasz?") */}
        <div className="border-b border-slate-200 pb-4 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#4A6B82] block">
                Co ustawiasz?
              </span>
              <h3 className="font-black text-slate-900 text-lg flex items-center gap-2 mt-0.5">
                Natężenie poszczególnych problemów (0 do 10)
              </h3>
            </div>

            <button
              type="button"
              onClick={handleResetToDefaultValues}
              className="text-xs font-bold text-[#4A6B82] hover:text-[#2C3E50] transition-colors bg-[#EBF1F5] px-3 py-1.5 border border-[#4A6B82]/30 cursor-pointer"
            >
              Przywróć wartości domyślne
            </button>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            Każdy suwak opisuje natężenie jednego rodzaju problemu na analizowanym obszarze. Wartość 0 oznacza bardzo małe natężenie, a wartość 10 bardzo duże natężenie.
          </p>
          <p className="text-xs text-slate-500 italic">
            Suwaki nie przedstawiają liczby osób. Pokazują wartości przeliczone do wspólnej skali od 0 do 10.
          </p>
        </div>

        {/* Grid: 6 Left Cards (Formula + 5 Sliders) vs Right Result Window */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left 7 cols: 6 Cards total (1 Formula Box + 5 Sliders) */}
          <div className="lg:col-span-7 space-y-3 flex flex-col justify-between">
            
            {/* Formula Display Box ("Tak liczony jest wynik") */}
            <div className="bg-[#1E2A34] text-white p-4 rounded-none border-l-4 border-[#F4D03F] border-t border-r border-b border-[#354E60] space-y-2.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#F4D03F] block">
                Tak liczony jest wynik
              </span>

              <div className="font-extrabold text-xs text-white">
                Aktywny model: {activeModel.title}
              </div>

              <div className="font-mono text-xs md:text-sm font-bold text-[#A3C1AD] bg-[#2C3E50] p-2.5 border border-[#354E60]">
                K_s = {formatW(activeWeights.u)} × U + {formatW(activeWeights.b)} × B + {formatW(activeWeights.p)} × P + {formatW(activeWeights.e)} × E + {formatW(activeWeights.w)} × W
              </div>

              <div className="text-[11px] text-slate-300 space-y-0.5 font-sans border-t border-[#354E60] pt-2">
                <div><strong>Źródło metody:</strong> {activeModel.sourceCities}</div>
                <div><strong>Sposób zastosowania w aplikacji:</strong> {activeModel.applicationMethod}</div>
              </div>
            </div>

            {/* Card 1: U - Ubóstwo */}
            <div className="bg-slate-50 p-3.5 rounded-none border-l-4 border-[#F4D03F] border-t border-r border-b border-slate-200 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <MiniCircularRing score={ubostwoU} color="#F4D03F" label="U" size={38} />
                  <div>
                    <label htmlFor="slider-u" className="text-xs font-extrabold text-slate-900 block">
                      Ubóstwo i korzystanie z pomocy społecznej
                    </label>
                    <span className="text-[10px] text-slate-500 font-semibold">Waga: {(activeWeights.u * 100).toFixed(0)}%</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleTooltip('u')}
                    aria-expanded={activeTooltip === 'u'}
                    aria-controls={activeTooltip === 'u' ? 'tooltip-u' : undefined}
                    aria-describedby={activeTooltip === 'u' ? 'tooltip-u' : undefined}
                    aria-label="Więcej informacji o wskaźniku U"
                    className="text-slate-400 hover:text-[#4A6B82] transition-colors p-0.5 cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="font-mono font-black text-slate-900 bg-[#FFFDF0] px-2.5 py-1 rounded-none text-xs border border-[#F4D03F] shrink-0">
                  {ubostwoU.toFixed(1)} / 10
                </span>
              </div>

              {activeTooltip === 'u' && (
                <div id="tooltip-u" role="tooltip" className="p-2 bg-[#FFFDF0] border border-[#F4D03F] rounded-none text-xs text-slate-800 leading-relaxed">
                  Pokazuje, jak często mieszkańcy danego obszaru korzystają między innymi z pomocy społecznej lub dofinansowania posiłków.
                </div>
              )}

              <input
                id="slider-u"
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={ubostwoU}
                onChange={(e) => handleSliderChange(setUbostwoU, parseFloat(e.target.value))}
                aria-label="Ubóstwo i korzystanie z pomocy społecznej"
                aria-valuemin={0}
                aria-valuemax={10}
                aria-valuenow={ubostwoU}
                className="w-full accent-brand-yellow cursor-pointer h-2 bg-slate-200 rounded-none"
              />

              <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                <span>Mało osób potrzebujących pomocy</span>
                <span className="font-bold text-[#4A6B82]">Wkład w Ks: {uContrib.toFixed(2)} pkt</span>
                <span>Bardzo dużo osób potrzebujących</span>
              </div>
            </div>

            {/* Card 2: B - Bezrobocie */}
            <div className="bg-slate-50 p-3.5 rounded-none border-l-4 border-[#4A6B82] border-t border-r border-b border-slate-200 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <MiniCircularRing score={bezrobocieB} color="#4A6B82" label="B" size={38} />
                  <div>
                    <label htmlFor="slider-b" className="text-xs font-extrabold text-slate-900 block">
                      Bezrobocie i długotrwały brak pracy
                    </label>
                    <span className="text-[10px] text-slate-500 font-semibold">Waga: {(activeWeights.b * 100).toFixed(0)}%</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleTooltip('b')}
                    aria-expanded={activeTooltip === 'b'}
                    aria-controls={activeTooltip === 'b' ? 'tooltip-b' : undefined}
                    aria-describedby={activeTooltip === 'b' ? 'tooltip-b' : undefined}
                    aria-label="Więcej informacji o wskaźniku B"
                    className="text-slate-400 hover:text-[#4A6B82] transition-colors p-0.5 cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="font-mono font-black text-slate-900 bg-[#EBF1F5] px-2.5 py-1 rounded-none text-xs border border-[#4A6B82] shrink-0">
                  {bezrobocieB.toFixed(1)} / 10
                </span>
              </div>

              {activeTooltip === 'b' && (
                <div id="tooltip-b" role="tooltip" className="p-2 bg-[#EBF1F5] border border-[#4A6B82] rounded-none text-xs text-slate-900 leading-relaxed">
                  Pokazuje, jak wiele osób nie ma pracy, szczególnie przez długi czas.
                </div>
              )}

              <input
                id="slider-b"
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={bezrobocieB}
                onChange={(e) => handleSliderChange(setBezrobocieB, parseFloat(e.target.value))}
                aria-label="Bezrobocie i długotrwały brak pracy"
                aria-valuemin={0}
                aria-valuemax={10}
                aria-valuenow={bezrobocieB}
                className="w-full accent-brand-blue cursor-pointer h-2 bg-slate-200 rounded-none"
              />

              <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                <span>Niskie bezrobocie</span>
                <span className="font-bold text-[#4A6B82]">Wkład w Ks: {bContrib.toFixed(2)} pkt</span>
                <span>Bardzo wysokie bezrobocie</span>
              </div>
            </div>

            {/* Card 3: P - Bezpieczeństwo */}
            <div className="bg-slate-50 p-3.5 rounded-none border-l-4 border-[#6E947A] border-t border-r border-b border-slate-200 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <MiniCircularRing score={przestepczoscP} color="#6E947A" label="P" size={38} />
                  <div>
                    <label htmlFor="slider-p" className="text-xs font-extrabold text-slate-900 block">
                      Problemy związane z bezpieczeństwem
                    </label>
                    <span className="text-[10px] text-slate-500 font-semibold">Waga: {(activeWeights.p * 100).toFixed(0)}%</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleTooltip('p')}
                    aria-expanded={activeTooltip === 'p'}
                    aria-controls={activeTooltip === 'p' ? 'tooltip-p' : undefined}
                    aria-describedby={activeTooltip === 'p' ? 'tooltip-p' : undefined}
                    aria-label="Więcej informacji o wskaźniku P"
                    className="text-slate-400 hover:text-[#4A6B82] transition-colors p-0.5 cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="font-mono font-black text-slate-900 bg-[#F0F6F2] px-2.5 py-1 rounded-none text-xs border border-[#A3C1AD] shrink-0">
                  {przestepczoscP.toFixed(1)} / 10
                </span>
              </div>

              {activeTooltip === 'p' && (
                <div id="tooltip-p" role="tooltip" className="p-2 bg-[#F0F6F2] border border-[#A3C1AD] rounded-none text-xs text-slate-900 leading-relaxed">
                  Może uwzględniać między innymi wykroczenia, interwencje służb oraz Niebieskie Karty.
                </div>
              )}

              <input
                id="slider-p"
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={przestepczoscP}
                onChange={(e) => handleSliderChange(setPrzestepczoscP, parseFloat(e.target.value))}
                aria-label="Problemy związane z bezpieczeństwem"
                aria-valuemin={0}
                aria-valuemax={10}
                aria-valuenow={przestepczoscP}
                className="w-full accent-brand-mint cursor-pointer h-2 bg-slate-200 rounded-none"
              />

              <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                <span>Mało zgłoszeń i interwencji</span>
                <span className="font-bold text-[#4A6B82]">Wkład w Ks: {pContrib.toFixed(2)} pkt</span>
                <span>Bardzo dużo zgłoszeń</span>
              </div>
            </div>

            {/* Card 4: E - Edukacja */}
            <div className="bg-slate-50 p-3.5 rounded-none border-l-4 border-[#354E60] border-t border-r border-b border-slate-200 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <MiniCircularRing score={edukacjaE} color="#354E60" label="E" size={38} />
                  <div>
                    <label htmlFor="slider-e" className="text-xs font-extrabold text-slate-900 block">
                      Problemy edukacyjne
                    </label>
                    <span className="text-[10px] text-slate-500 font-semibold">Waga: {(activeWeights.e * 100).toFixed(0)}%</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleTooltip('e')}
                    aria-expanded={activeTooltip === 'e'}
                    aria-controls={activeTooltip === 'e' ? 'tooltip-e' : undefined}
                    aria-describedby={activeTooltip === 'e' ? 'tooltip-e' : undefined}
                    aria-label="Więcej informacji o wskaźniku E"
                    className="text-slate-400 hover:text-[#4A6B82] transition-colors p-0.5 cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="font-mono font-black text-slate-900 bg-slate-200 px-2.5 py-1 rounded-none text-xs border border-slate-300 shrink-0">
                  {edukacjaE.toFixed(1)} / 10
                </span>
              </div>

              {activeTooltip === 'e' && (
                <div id="tooltip-e" role="tooltip" className="p-2 bg-slate-100 border border-slate-300 rounded-none text-xs text-slate-900 leading-relaxed">
                  Pokazuje między innymi, czy wyniki egzaminów uczniów są niższe niż w innych częściach gminy.
                </div>
              )}

              <input
                id="slider-e"
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={edukacjaE}
                onChange={(e) => handleSliderChange(setEdukacjaE, parseFloat(e.target.value))}
                aria-label="Problemy edukacyjne"
                aria-valuemin={0}
                aria-valuemax={10}
                aria-valuenow={edukacjaE}
                className="w-full accent-brand-blue cursor-pointer h-2 bg-slate-200 rounded-none"
              />

              <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                <span>Dobre wyniki edukacyjne</span>
                <span className="font-bold text-[#4A6B82]">Wkład w Ks: {eContrib.toFixed(2)} pkt</span>
                <span>Duże problemy edukacyjne</span>
              </div>
            </div>

            {/* Card 5: W - Niska aktywność społeczna */}
            <div className="bg-slate-50 p-3.5 rounded-none border-l-4 border-[#D4B020] border-t border-r border-b border-slate-200 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <MiniCircularRing score={wycofanieW} color="#D4B020" label="W" size={38} />
                  <div>
                    <label htmlFor="slider-w" className="text-xs font-extrabold text-slate-900 block">
                      Niska aktywność społeczna
                    </label>
                    <span className="text-[10px] text-slate-500 font-semibold">Waga: {(activeWeights.w * 100).toFixed(0)}%</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleTooltip('w')}
                    aria-expanded={activeTooltip === 'w'}
                    aria-controls={activeTooltip === 'w' ? 'tooltip-w' : undefined}
                    aria-describedby={activeTooltip === 'w' ? 'tooltip-w' : undefined}
                    aria-label="Więcej informacji o wskaźniku W"
                    className="text-slate-400 hover:text-[#4A6B82] transition-colors p-0.5 cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="font-mono font-black text-slate-900 bg-[#FFFDF0] px-2.5 py-1 rounded-none text-xs border border-[#F4D03F] shrink-0">
                  {wycofanieW.toFixed(1)} / 10
                </span>
              </div>

              {activeTooltip === 'w' && (
                <div id="tooltip-w" role="tooltip" className="p-2 bg-[#FFFDF0] border border-[#F4D03F] rounded-none text-xs text-slate-800 leading-relaxed">
                  W dokumentach źródłowych określany jako wycofanie społeczne lub niewystarczające uczestnictwo w życiu publicznym i kulturalnym.
                </div>
              )}

              <input
                id="slider-w"
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={wycofanieW}
                onChange={(e) => handleSliderChange(setWycofanieW, parseFloat(e.target.value))}
                aria-label="Niska aktywność społeczna"
                aria-valuemin={0}
                aria-valuemax={10}
                aria-valuenow={wycofanieW}
                className="w-full accent-brand-yellow cursor-pointer h-2 bg-slate-200 rounded-none"
              />

              <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                <span>Duża aktywność społeczna</span>
                <span className="font-bold text-[#4A6B82]">Wkład w Ks: {wContrib.toFixed(2)} pkt</span>
                <span>Bardzo mała aktywność</span>
              </div>
            </div>

          </div>

          {/* Right 5 cols: Result Box with Circular Score Gauge */}
          <div className="lg:col-span-5 flex flex-col">
            
            <div className="bg-[#1E2A34] text-white p-5 rounded-none border-2 border-[#4A6B82] shadow-xl space-y-5 h-full flex flex-col justify-between">
              
              {/* Result Header & Primary Score */}
              <div className="text-center space-y-3">
                <span className="text-xs uppercase tracking-widest font-black text-[#F4D03F] block">
                  Syntetyczny Wskaźnik Ks
                </span>

                {/* Main Score Display formatted as e.g. "4,10 na 10" */}
                <div className="py-2 space-y-1" role="status" aria-label="Aktualny syntetyczny wskaźnik Ks" aria-live="polite" aria-atomic="true">
                  <div className="text-4xl font-black font-mono text-white tracking-tight">
                    {formatVal(baseKs)} na 10
                  </div>
                  <div className="text-xs font-mono font-bold text-[#A3C1AD] uppercase tracking-wider">
                    {(baseKs * 10).toFixed(0)}% SKALI
                  </div>
                </div>
                
                {/* Gauge visualization */}
                <div className="flex justify-center py-1">
                  <CircularScoreGauge score={baseKs} size={130} strokeWidth={10} />
                </div>

                {/* Simple Interpretation Box */}
                <div className="p-3 bg-[#2C3E50] border-l-2 border-[#F4D03F] rounded-none text-xs text-slate-200 space-y-1.5 text-left">
                  <p className="leading-relaxed font-medium">
                    Wynik oznacza, że przy aktualnie ustawionych wartościach i wybranych wagach wskaźnik wynosi <strong>{formatVal(baseKs)} punktu na 10</strong>.
                  </p>
                  <p className="text-[11px] text-slate-400 italic border-t border-[#354E60] pt-1">
                    Nie jest to ocena całego miasta ani decyzja o objęciu obszaru rewitalizacją.
                  </p>
                </div>
              </div>

              {/* What contributed most? ("Co najbardziej wpłynęło na wynik?") */}
              <div className="bg-[#2C3E50] p-3.5 rounded-none border border-[#354E60] space-y-2.5">
                <h4 className="font-black text-[#F4D03F] text-xs uppercase tracking-wider">
                  Co najbardziej wpłynęło na wynik?
                </h4>
                
                <div className="space-y-1.5 text-xs font-mono">
                  {topContributors.map((c, idx) => (
                    <div key={c.id} className="bg-[#1E2A34] p-2 rounded-none border border-[#354E60] flex items-center justify-between">
                      <span className="font-sans font-bold text-white flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 font-mono">{idx + 1}.</span>
                        <span>{c.shortName}:</span>
                      </span>
                      <strong className="text-[#F4D03F]">{formatVal(c.val)} pkt</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Point Contribution Breakdown for all 5 */}
              <div className="border-t border-[#354E60] pt-3 space-y-2">
                <h4 className="font-bold text-slate-300 text-[11px] uppercase tracking-wider">
                  Pełne rozbicie wszystkich składników:
                </h4>

                <div className="space-y-1 text-[11px] font-mono">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Ubóstwo (U):</span>
                    <span>{ubostwoU.toFixed(1)} × {(activeWeights.u * 100).toFixed(0)}% = <strong className="text-white">{formatVal(uContrib)} pkt</strong></span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Bezrobocie (B):</span>
                    <span>{bezrobocieB.toFixed(1)} × {(activeWeights.b * 100).toFixed(0)}% = <strong className="text-white">{formatVal(bContrib)} pkt</strong></span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Bezpieczeństwo (P):</span>
                    <span>{przestepczoscP.toFixed(1)} × {(activeWeights.p * 100).toFixed(0)}% = <strong className="text-white">{formatVal(pContrib)} pkt</strong></span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Edukacja (E):</span>
                    <span>{edukacjaE.toFixed(1)} × {(activeWeights.e * 100).toFixed(0)}% = <strong className="text-white">{formatVal(eContrib)} pkt</strong></span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Aktywność (W):</span>
                    <span>{wycofanieW.toFixed(1)} × {(activeWeights.w * 100).toFixed(0)}% = <strong className="text-white">{formatVal(wContrib)} pkt</strong></span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 10. METHODOLOGY AND MODEL SOURCES SECTION */}
      <section className="space-y-4">
        <div className="bg-white rounded-none border-2 border-[#4A6B82]/20 p-6 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div>
              <h3 className="font-black text-slate-900 text-lg flex items-center gap-2">
                Źródła modeli
              </h3>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                Poniższe dokumenty są źródłem metod i wag. Nie oznacza to, że wartości aktualnie ustawione na suwakach pochodzą z tych dokumentów.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsMethodologyOpen(!isMethodologyOpen)}
              aria-expanded={isMethodologyOpen}
              aria-controls={isMethodologyOpen ? 'methodology-content' : undefined}
              className="text-xs font-bold text-[#4A6B82] hover:text-[#2C3E50] flex items-center gap-1 cursor-pointer transition-colors bg-[#EBF1F5] px-3 py-1.5 border border-[#4A6B82]/30"
            >
              <span>{isMethodologyOpen ? 'Zwiń sekcję' : 'Rozwiń sekcję'}</span>
              {isMethodologyOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {isMethodologyOpen && (
            <div id="methodology-content" className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {/* Card 1: Wołomin / Włocławek */}
              <div className="bg-slate-50 p-4 border border-slate-200 rounded-none space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold bg-[#EBF1F5] text-[#2C3E50] px-2 py-0.5 border border-[#4A6B82]/30 inline-block">
                    KARTA 1
                  </span>
                  <h4 className="font-extrabold text-sm text-slate-900">
                    Model Wołomina i Włocławka
                  </h4>
                  <div className="text-xs text-slate-600 space-y-1">
                    <div><strong>Źródła:</strong> Wołomin (2016), Włocławek (2017)</div>
                    <div><strong>Wzór źródłowy:</strong> <code className="bg-slate-200 px-1 font-mono text-[11px]">Ks = 0,44U + 0,44B + 0,12(P+E+W)</code></div>
                    <div><strong>Sposób normalizacji:</strong> wzór znormalizowany do sumy wag 100%</div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setActiveDetailCityId('wolomin')}
                    className="w-full py-2 bg-[#2C3E50] hover:bg-[#384E64] text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 border-b-2 border-[#F4D03F]"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#F4D03F]" />
                    <span>Dokument Wołomina</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveDetailCityId('wloclawek')}
                    className="w-full py-2 bg-[#2C3E50] hover:bg-[#384E64] text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 border-b-2 border-[#A3C1AD]"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#A3C1AD]" />
                    <span>Dokument Włocławka</span>
                  </button>
                </div>
              </div>

              {/* Card 2: Łódź */}
              <div className="bg-slate-50 p-4 border border-slate-200 rounded-none space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold bg-[#EBF1F5] text-[#2C3E50] px-2 py-0.5 border border-[#4A6B82]/30 inline-block">
                    KARTA 2
                  </span>
                  <h4 className="font-extrabold text-sm text-slate-900">
                    Model Łodzi
                  </h4>
                  <div className="text-xs text-slate-600 space-y-1">
                    <div><strong>Raport:</strong> Raport z monitoringu GPR za rok 2017</div>
                    <div><strong>Rok:</strong> 2018 (s. 36)</div>
                    <div><strong>Wzór Z1:</strong> <code className="bg-slate-200 px-1 font-mono text-[11px]">Z1 = 0,3C1 + 0,3C2 + 0,1C3 + 0,2C4 + 0,1C5</code></div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveDetailCityId('lodz')}
                  className="w-full py-2 bg-[#2C3E50] hover:bg-[#384E64] text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 border-b-2 border-[#F4D03F]"
                >
                  <FileText className="w-3.5 h-3.5 text-[#F4D03F]" />
                  <span>Dokument Łodzi</span>
                </button>
              </div>

              {/* Card 3: Stary Sącz */}
              <div className="bg-slate-50 p-4 border border-slate-200 rounded-none space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold bg-[#EBF1F5] text-[#2C3E50] px-2 py-0.5 border border-[#4A6B82]/30 inline-block">
                    KARTA 3
                  </span>
                  <h4 className="font-extrabold text-sm text-slate-900">
                    Model Starego Sącza
                  </h4>
                  <div className="text-xs text-slate-600 space-y-1">
                    <div><strong>Tytuł:</strong> Diagnoza służąca wyznaczeniu obszaru rewitalizacji</div>
                    <div><strong>Rok:</strong> 2016 (s. 16–19)</div>
                    <div><strong>Metoda:</strong> Średnia arytmetyczna z 5 wskaźników</div>
                    <p className="text-[11px] italic text-slate-500 pt-1">
                      Wagi po 20 procent są interpretacją średniej przyjętą w symulatorze.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveDetailCityId('stary_sacz')}
                  className="w-full py-2 bg-[#2C3E50] hover:bg-[#384E64] text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 border-b-2 border-[#F4D03F]"
                >
                  <FileText className="w-3.5 h-3.5 text-[#F4D03F]" />
                  <span>Dokument Starego Sącza</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 11. FAQ & HELP SECTION */}
      <section className="space-y-4">
        <div className="bg-white rounded-none border-2 border-[#4A6B82]/20 p-6 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <h3 className="font-black text-slate-900 text-lg flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#4A6B82] stroke-[2.2]" fill="currentColor" fillOpacity={0.2} />
              Pomoc i pytania
            </h3>

            <button
              type="button"
              onClick={() => setIsFaqSectionOpen(!isFaqSectionOpen)}
              aria-expanded={isFaqSectionOpen}
              aria-controls={isFaqSectionOpen ? 'faq-content' : undefined}
              className="text-xs font-bold text-[#4A6B82] hover:text-[#2C3E50] flex items-center gap-1 cursor-pointer transition-colors bg-[#EBF1F5] px-3 py-1.5 border border-[#4A6B82]/30"
            >
              <span>{isFaqSectionOpen ? 'Zwiń sekcję' : 'Rozwiń sekcję'}</span>
              {isFaqSectionOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {isFaqSectionOpen && (
            <div id="faq-content" className="space-y-3 pt-2">
              {/* FAQ 1: CO TO JEST? */}
              <div className="border border-slate-200 rounded-none overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaqWhatIs(!openFaqWhatIs)}
                  aria-expanded={openFaqWhatIs}
                  aria-controls={openFaqWhatIs ? 'faq-what-is' : undefined}
                  className="w-full p-4 text-left font-extrabold text-slate-900 text-sm flex items-center justify-between bg-[#EBF1F5]/60 hover:bg-[#EBF1F5] transition-colors cursor-pointer"
                >
                  <span>CO TO JEST?</span>
                  {openFaqWhatIs ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </button>
                
                {openFaqWhatIs && (
                  <div id="faq-what-is" className="p-4 bg-white text-xs text-slate-700 leading-relaxed border-t border-slate-200">
                    Wskaźnik Ks łączy pięć grup problemów społecznych w jeden wynik. Pozwala zobaczyć, jak jednoczesne występowanie różnych problemów może wpływać na ocenę badanego obszaru.
                  </div>
                )}
              </div>

              {/* FAQ 2: JAK KORZYSTAĆ? */}
              <div className="border border-slate-200 rounded-none overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaqHowToUse(!openFaqHowToUse)}
                  aria-expanded={openFaqHowToUse}
                  aria-controls={openFaqHowToUse ? 'faq-how-to-use' : undefined}
                  className="w-full p-4 text-left font-extrabold text-slate-900 text-sm flex items-center justify-between bg-[#EBF1F5]/60 hover:bg-[#EBF1F5] transition-colors cursor-pointer"
                >
                  <span>JAK KORZYSTAĆ?</span>
                  {openFaqHowToUse ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </button>

                {openFaqHowToUse && (
                  <div id="faq-how-to-use" className="p-4 bg-white text-xs text-slate-700 leading-relaxed border-t border-slate-200">
                    Najpierw wybierz model wag. Następnie ustaw natężenie problemów. Wynik zostanie obliczony automatycznie w skali od 0 do 10.
                  </div>
                )}
              </div>

              {/* FAQ 3: PO CO STOSUJE SIĘ TAKIE WSKAŹNIKI? */}
              <div className="border border-slate-200 rounded-none overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaqWhyIndicators(!openFaqWhyIndicators)}
                  aria-expanded={openFaqWhyIndicators}
                  aria-controls={openFaqWhyIndicators ? 'faq-why-indicators' : undefined}
                  className="w-full p-4 text-left font-extrabold text-slate-900 text-sm flex items-center justify-between bg-[#EBF1F5]/60 hover:bg-[#EBF1F5] transition-colors cursor-pointer"
                >
                  <span>PO CO STOSUJE SIĘ TAKIE WSKAŹNIKI?</span>
                  {openFaqWhyIndicators ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </button>

                {openFaqWhyIndicators && (
                  <div id="faq-why-indicators" className="p-4 bg-white text-xs text-slate-700 leading-relaxed border-t border-slate-200">
                    Wskaźniki syntetyczne ułatwiają porównywanie wielu części miasta. Pomagają wskazać miejsca, w których kilka problemów społecznych występuje jednocześnie.
                  </div>
                )}
              </div>

              {/* FAQ 4: CZEGO WYNIK NIE OZNACZA? */}
              <div className="border border-slate-200 rounded-none overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaqWhatNotMeans(!openFaqWhatNotMeans)}
                  aria-expanded={openFaqWhatNotMeans}
                  aria-controls={openFaqWhatNotMeans ? 'faq-what-not-means' : undefined}
                  className="w-full p-4 text-left font-extrabold text-slate-900 text-sm flex items-center justify-between bg-[#EBF1F5]/60 hover:bg-[#EBF1F5] transition-colors cursor-pointer"
                >
                  <span>CZEGO WYNIK NIE OZNACZA?</span>
                  {openFaqWhatNotMeans ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </button>

                {openFaqWhatNotMeans && (
                  <div id="faq-what-not-means" className="p-4 bg-white text-xs text-slate-700 leading-relaxed border-t border-slate-200">
                    Wynik nie opisuje pojedynczego mieszkańca. Nie oznacza także automatycznego wyznaczenia obszaru rewitalizacji ani przyznania środków finansowych.
                  </div>
                )}
              </div>

              {/* FAQ 5: DLACZEGO MODELE MAJĄ RÓŻNE WAGI? */}
              <div className="border border-slate-200 rounded-none overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaqWhyDifferentWeights(!openFaqWhyDifferentWeights)}
                  aria-expanded={openFaqWhyDifferentWeights}
                  aria-controls={openFaqWhyDifferentWeights ? 'faq-why-different-weights' : undefined}
                  className="w-full p-4 text-left font-extrabold text-slate-900 text-sm flex items-center justify-between bg-[#EBF1F5]/60 hover:bg-[#EBF1F5] transition-colors cursor-pointer"
                >
                  <span>DLACZEGO MODELE MAJĄ RÓŻNE WAGI?</span>
                  {openFaqWhyDifferentWeights ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </button>

                {openFaqWhyDifferentWeights && (
                  <div id="faq-why-different-weights" className="p-4 bg-white text-xs text-slate-700 leading-relaxed border-t border-slate-200">
                    Samorządy mogą inaczej oceniać znaczenie poszczególnych problemów. W jednym modelu większy wpływ mają ubóstwo i bezrobocie, a w innym wszystkie problemy są traktowane bardziej równomiernie.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 12. MODAL "DOKUMENT I METODOLOGIA" */}
      {detailCity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E2A34]/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            ref={dialogRef}
            className="bg-white rounded-none max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-[#4A6B82] p-6 space-y-5 relative"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-disclaimer"
            tabIndex={-1}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="px-2.5 py-0.5 bg-[#4A6B82] text-white rounded-none text-[10px] font-black uppercase tracking-wider border-b-2 border-[#F4D03F]">
                  DOKUMENT I METODOLOGIA
                </span>
                <h3 id="modal-title" className="text-base font-black text-slate-900 mt-1">
                  {detailCity.source.documentTitle}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveDetailCityId(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-none hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Zamknij okno"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Prominent Disclaimer Banner */}
            <div id="modal-disclaimer" className="p-3 bg-[#FFFDF0] border-l-4 border-[#F4D03F] rounded-none text-xs font-bold text-slate-900 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-[#D4B020] shrink-0 mt-0.5" />
              <p className="leading-snug">
                Dokument jest źródłem modelu liczenia, a nie aktualnych wartości na suwakach.
              </p>
            </div>

            {/* Four Structured Sections */}
            <div className="space-y-4 text-xs text-slate-800">
              {/* Section 1: Co pochodzi z dokumentu? */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-none space-y-1">
                <h4 className="font-extrabold text-slate-900 uppercase text-[10px] tracking-wider text-[#4A6B82]">
                  1. Co pochodzi z dokumentu?
                </h4>
                <p className="leading-relaxed">
                  {detailCity.source.whatFromDocument}
                </p>
              </div>

              {/* Section 2: Co zrobiła aplikacja? */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-none space-y-1">
                <h4 className="font-extrabold text-slate-900 uppercase text-[10px] tracking-wider text-[#4A6B82]">
                  2. Co zrobiła aplikacja?
                </h4>
                <p className="leading-relaxed">
                  {detailCity.source.applicationMethod}
                </p>
              </div>

              {/* Section 3: Czy wartości suwaków pochodzą z dokumentu? */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-none space-y-1">
                <h4 className="font-extrabold text-slate-900 uppercase text-[10px] tracking-wider text-[#4A6B82]">
                  3. Czy wartości suwaków pochodzą z dokumentu?
                </h4>
                <p className="leading-relaxed font-bold text-slate-900">
                  Nie. Wartości na suwakach są ustawiane przez użytkownika w celach edukacyjnych i demonstracyjnych.
                </p>
              </div>

              {/* Section 4: Dokument źródłowy */}
              <div className="p-3.5 bg-[#EBF1F5] border border-[#4A6B82]/30 rounded-none space-y-2">
                <h4 className="font-extrabold text-slate-900 uppercase text-[10px] tracking-wider text-[#2C3E50]">
                  4. Dokument źródłowy
                </h4>
                <div className="space-y-1 text-slate-700">
                  <div><strong>Pełny tytuł:</strong> {detailCity.source.documentTitle}</div>
                  {detailCity.source.institution && (
                    <div><strong>Autor / Instytucja:</strong> {detailCity.source.institution}</div>
                  )}
                  <div><strong>Rok:</strong> {detailCity.source.year}</div>
                  {detailCity.source.pages && (
                    <div><strong>Strony / miejsce:</strong> {detailCity.source.pages}</div>
                  )}
                </div>

                <div className="pt-2">
                  <a
                    href={detailCity.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#4A6B82] hover:bg-[#385163] text-white rounded-none font-black text-xs shadow-xs transition-all border-b-2 border-[#F4D03F]"
                  >
                    <FileText className="w-4 h-4 text-[#F4D03F]" />
                    <span>Otwórz plik źródłowy</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-200" />
                  </a>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setActiveDetailCityId(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-none transition-all cursor-pointer"
              >
                Zamknij
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
