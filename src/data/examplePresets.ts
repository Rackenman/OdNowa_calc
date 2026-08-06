export interface CalculationModel {
  id: 'model-a' | 'model-b' | 'model-c';
  code: string;
  title: string;
  sourceCities: string;
  weights: {
    u: number;
    b: number;
    p: number;
    e: number;
    w: number;
  };
  info: string;
  applicationMethod: string;
  cityModelKey: string; // reference for methodology modal
}

export const calculationModels: Record<string, CalculationModel> = {
  'model-a': {
    id: 'model-a',
    code: 'MODEL A',
    title: 'Silny wpływ ubóstwa i bezrobocia',
    sourceCities: 'Wołomin i Włocławek',
    weights: { u: 0.44, b: 0.44, p: 0.04, e: 0.04, w: 0.04 },
    info: 'W dokumentach obu miast występuje ten sam zapis wzoru źródłowego. Aplikacja prezentuje jego wariant znormalizowany do 100 procent.',
    applicationMethod: 'wzór znormalizowany do sumy wag wynoszącej 100 procent.',
    cityModelKey: 'wolomin',
  },
  'model-b': {
    id: 'model-b',
    code: 'MODEL B',
    title: 'Model deficytu spójności społecznej',
    sourceCities: 'Łódź',
    weights: { u: 0.30, b: 0.30, p: 0.10, e: 0.20, w: 0.10 },
    info: 'Wagi pochodzą ze wskaźnika Z1 stosowanego w monitoringu obszaru rewitalizacji Łodzi.',
    applicationMethod: 'odwzorowanie wag wskaźnika Z1.',
    cityModelKey: 'lodz',
  },
  'model-c': {
    id: 'model-c',
    code: 'MODEL C',
    title: 'Równe znaczenie pięciu problemów',
    sourceCities: 'Stary Sącz',
    weights: { u: 0.20, b: 0.20, p: 0.20, e: 0.20, w: 0.20 },
    info: 'Aplikacja przedstawia jako równe wagi metodę średniej pięciu znormalizowanych grup wskaźników.',
    applicationMethod: 'uproszczona interpretacja metody równych wag.',
    cityModelKey: 'stary_sacz',
  },
};

export const educationalExampleValues = {
  poverty: 5.0,
  unemployment: 4.5,
  safety: 3.2,
  education: 3.8,
  participation: 4.0,
};

export interface CitySource {
  documentTitle: string;
  institution?: string;
  year: string;
  resolution?: string;
  pages?: string;
  url: string;
  sourceFormula: string;
  simulatorFormula: string;
  implementationType: string;
  valuesOrigin: string;
  shortSource: string;
  whatFromDocument: string;
  applicationMethod: string;
  detailsText: string;
  noteText?: string;
}

export interface CityModel {
  id: string;
  name: string;
  year: number;
  type: 'demo';
  description: string;
  weights: {
    u: number;
    b: number;
    p: number;
    e: number;
    w: number;
  };
  values: {
    poverty: number; // U - Ubóstwo
    unemployment: number; // B - Bezrobocie
    safety: number; // P - Bezpieczeństwo
    education: number; // E - Edukacja
    participation: number; // W - Niska aktywność społeczna
  };
  source: CitySource;
}

export const cityModels: Record<string, CityModel> = {
  wolomin: {
    id: 'wolomin',
    name: 'Wołomin',
    year: 2016,
    type: 'demo',
    description:
      'Przykładowy zestaw pięciu wskaźników oparty na układzie zastosowanym w diagnozie delimitacyjnej Wołomina z 2016 roku.',
    weights: {
      u: 0.44,
      b: 0.44,
      p: 0.04,
      e: 0.04,
      w: 0.04,
    },
    values: {
      poverty: 6.8,
      unemployment: 7.1,
      safety: 4.8,
      education: 4.5,
      participation: 3.8,
    },
    source: {
      documentTitle:
        'Diagnoza służąca wyznaczeniu obszaru zdegradowanego i obszaru rewitalizacji Gminy Wołomin',
      institution: 'Urząd Miejski w Wołominie',
      year: '2016',
      resolution:
        'Załącznik nr 2 do Uchwały nr XXIX-169/2016 Rady Miejskiej w Wołominie z 24 listopada 2016 roku.',
      pages: 'Załącznik nr 2',
      url: 'https://wolomin.org/wp-content/uploads/2017/02/GPR-WO%C5%81omin_08_05_2017-1.pdf',
      sourceFormula: 'Ks = 0,44U + 0,44B + 0,12(P + E + W)',
      simulatorFormula: 'Ks = 0,44 × U + 0,44 × B + 0,04 × P + 0,04 × E + 0,04 × W',
      implementationType: 'Model aplikacji: znormalizowana interpretacja wzoru źródłowego',
      valuesOrigin: 'zestaw demonstracyjny',
      shortSource:
        'Diagnoza służąca wyznaczeniu obszaru zdegradowanego i obszaru rewitalizacji Gminy Wołomin (2016)',
      whatFromDocument: 'pięć grup zjawisk i wzór źródłowy',
      applicationMethod: 'wzór znormalizowany do 100%',
      detailsText:
        'W dokumencie zastosowano pięć grup problemów społecznych:\n\nU - natężenie ubóstwa\nB - natężenie bezrobocia\nP - natężenie przestępczości\nE - problemy edukacyjne\nW - wycofanie społeczne, czyli brak uczestnictwa w życiu publicznym\n\nWzór źródłowy zapisano jako:\nKs = 0,44U + 0,44B + 0,12(P + E + W)\n\nW aplikacji stosowany jest wariant znormalizowany do 100 procent:\nKs = 0,44U + 0,44B + 0,04P + 0,04E + 0,04W\n\nWariant 44%, 44%, 4%, 4% i 4% jest interpretacją zastosowaną w symulatorze. Nie należy przedstawiać go jako dosłownego zapisu z dokumentu Wołomina.',
      noteText:
        'Wołomin stosował pola heksagonalne o szerokości 250 metrów. Wynik obliczano dla każdego pola oddzielnie, a nie jako jeden wynik dla całego miasta.',
    },
  },

  wloclawek: {
    id: 'wloclawek',
    name: 'Włocławek',
    year: 2017,
    type: 'demo',
    description:
      'Przykładowy zestaw pięciu wskaźników oparty na układzie zastosowanym w diagnozie delimitacyjnej Włocławka z 2016 roku.',
    weights: {
      u: 0.44,
      b: 0.44,
      p: 0.04,
      e: 0.04,
      w: 0.04,
    },
    values: {
      poverty: 8.2,
      unemployment: 7.9,
      safety: 3.5,
      education: 2.8,
      participation: 3.1,
    },
    source: {
      documentTitle:
        'Diagnoza miasta Włocławek służąca wyznaczeniu obszaru zdegradowanego i obszaru rewitalizacji',
      institution: 'Rada Miasta Włocławek',
      year: '2017',
      resolution:
        'Diagnoza przyjęta wraz z Uchwałą nr XXX/44/2017 Rady Miasta Włocławek z 27 marca 2017 roku.',
      pages: 'Tekst główny diagnozy',
      url: 'https://rewitalizacja.wloclawek.eu/strona-3351-obszar_rewitalizacji.html',
      sourceFormula: 'Ks = 0,44U + 0,44B + 0,12(P + E + W)',
      simulatorFormula: 'Ks = 0,44 × U + 0,44 × B + 0,04 × P + 0,04 × E + 0,04 × W',
      implementationType: 'Model aplikacji: znormalizowana interpretacja wzoru źródłowego',
      valuesOrigin: 'zestaw demonstracyjny',
      shortSource:
        'Diagnoza miasta Włocławek służąca wyznaczeniu obszaru zdegradowanego (2017)',
      whatFromDocument: 'pięć indeksów i wzór źródłowy',
      applicationMethod: 'wzór znormalizowany do 100%',
      detailsText:
        'We Włocławku zastosowano pięć indeksów:\n\nU - indeks natężenia ubóstwa\nB - indeks natężenia bezrobocia\nP - indeks natężenia przestępczości\nE - indeks natężenia problemów edukacyjnych\nW - indeks wycofania, czyli braku uczestnictwa w życiu publicznym i kulturalnym\n\nWzór źródłowy:\nKs = 0,44U + 0,44B + 0,12(P + E + W)\n\nW aplikacji zastosowano ten sam znormalizowany wariant co w przykładzie Wołomina:\nKs = 0,44U + 0,44B + 0,04P + 0,04E + 0,04W',
      noteText:
        'Wołomin i Włocławek korzystały z takiego samego zapisu wzoru źródłowego. Różniły się między innymi szczegółowymi danymi składającymi się na poszczególne indeksy oraz wielkością pól przestrzennych. Włocławek stosował pola o szerokości 500 metrów.',
    },
  },

  lodz: {
    id: 'lodz',
    name: 'Łódź',
    year: 2018,
    type: 'demo',
    description:
      'Przykładowy zestaw pięciu wskaźników oparty na łódzkim wskaźniku deficytu spójności społecznej Z1 z raportu monitoringu GPR.',
    weights: {
      u: 0.30,
      b: 0.30,
      p: 0.10,
      e: 0.20,
      w: 0.10,
    },
    values: {
      poverty: 6.5,
      unemployment: 6.2,
      safety: 5.0,
      education: 4.8,
      participation: 5.2,
    },
    source: {
      documentTitle:
        'Raport z monitoringu zmian stanu obszaru rewitalizacji oraz ocena postępów osiągania celów GPR za rok 2017',
      institution: 'Biuro ds. Rewitalizacji Urzędu Miasta Łodzi',
      year: '2018',
      resolution: '',
      pages: 'Rozdział 3.1.1, strona 36 - Wskaźnik deficytu spójności społecznej Z1',
      url: 'https://rewitalizacja.uml.lodz.pl/files/public/PORTAL_REWITALIZACJA/monitoring_zmian/2017_Wskazniki/Raport_monitoring_GPR_2017.pdf',
      sourceFormula: 'Z1 = 0,3C1 + 0,3C2 + 0,1C3 + 0,2C4 + 0,1C5',
      simulatorFormula: 'Ks = 0,30 × U + 0,30 × B + 0,10 × P + 0,20 × E + 0,10 × W',
      implementationType: 'Model aplikacji: odwzorowanie wag łódzkiego wskaźnika Z1',
      valuesOrigin: 'zestaw demonstracyjny',
      shortSource: 'Raport z monitoringu GPR za rok 2017, s. 36',
      whatFromDocument: 'pięć wskaźników cząstkowych i dokładne wagi',
      applicationMethod: 'odwzorowanie wag modelu Z1',
      detailsText:
        'Łódzki wskaźnik Z1 jest agregatem pięciu wskaźników cząstkowych:\n\nC1 - problemy bezrobocia\nC2 - problemy ubóstwa\nC3 - deficyt bezpieczeństwa i porządku publicznego\nC4 - problemy edukacyjne\nC5 - niewystarczający poziom uczestnictwa\n\nWzór źródłowy:\nZ1 = 0,3C1 + 0,3C2 + 0,1C3 + 0,2C4 + 0,1C5\n\nPo dostosowaniu kolejności do oznaczeń używanych w symulatorze:\nKs = 0,30U + 0,30B + 0,10P + 0,20E + 0,10W',
      noteText:
        'Model Łodzi pochodzi z systemu monitorowania zmian obszaru rewitalizacji. Nie należy przedstawiać go jako wzoru użytego bezpośrednio do pierwotnego wyznaczenia granic obszaru rewitalizacji.',
    },
  },

  stary_sacz: {
    id: 'stary_sacz',
    name: 'Stary Sącz',
    year: 2016,
    type: 'demo',
    description:
      'Przykładowy zestaw pięciu wskaźników oparty na metodzie średniej arytmetycznej z pięciu równorzędnych grup problemów.',
    weights: {
      u: 0.20,
      b: 0.20,
      p: 0.20,
      e: 0.20,
      w: 0.20,
    },
    values: {
      poverty: 5.0,
      unemployment: 4.5,
      safety: 3.2,
      education: 3.8,
      participation: 4.0,
    },
    source: {
      documentTitle:
        'Diagnoza służąca wyznaczeniu obszaru zdegradowanego i obszaru rewitalizacji',
      institution: 'Zakład Polityki Miejskiej i Rewitalizacji, Instytut Rozwoju Miast',
      year: '2016',
      resolution: '',
      pages: 'Metodyka normalizacji i tworzenia wskaźnika syntetycznego, strony 16-19',
      url: 'https://starysacz.um.gov.pl/wp-content/uploads/2020/03/diagnoza.pdf',
      sourceFormula: 'Średnia arytmetyczna z 5 znormalizowanych wskaźników cząstkowych',
      simulatorFormula: 'Ks = 0,20 × U + 0,20 × B + 0,20 × P + 0,20 × E + 0,20 × W',
      implementationType: 'Model aplikacji: uproszczona interpretacja metody równych wag',
      valuesOrigin: 'zestaw demonstracyjny',
      shortSource: 'Diagnoza GPR Stary Sącz (IRM), s. 16-19',
      whatFromDocument: 'pięć wskaźników i metoda średniej',
      applicationMethod: 'równoważne wagi po 20%',
      detailsText:
        'W diagnozie wykorzystano pięć grup wskaźników społecznych:\n- bezrobocie,\n- ubóstwo,\n- przestępczość,\n- edukację,\n- aktywność społeczną i obywatelską.\n\nNajpierw wartości zostały znormalizowane względem średniej i odchylenia standardowego. Następnie połączono je w jeden wskaźnik syntetyczny za pomocą średniej arytmetycznej.\n\nPonieważ każda z pięciu grup uczestniczy w średniej na równych zasadach, w uproszczonym symulatorze można przedstawić ten model jako:\nU - 20%\nB - 20%\nP - 20%\nE - 20%\nW - 20%\n\nWartości 20 procent nie są zapisane w dokumencie jako osobna tabela wag. Są matematyczną interpretacją średniej pięciu równorzędnych wskaźników.',
      noteText:
        'Model wykorzystuje podejście równoważne dla wszystkich 5 sfer.',
    },
  },
};

// Backward compatibility alias
export const examplePresets = cityModels;
