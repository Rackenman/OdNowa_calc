export type ProjectCategory = 'podstawowe' | 'uzupelniajace';

export type SphereType = 'spoleczna' | 'gospodarcza' | 'srodowiskowa' | 'przestrzenna' | 'techniczna';

export interface GprTask {
  id: string; // e.g., "1.1", "2.3", "PU1"
  parentId: string; // e.g., "PP1", "PP2", "PU"
  parentTitle: string;
  title: string;
  category: ProjectCategory;
  spheres: SphereType[];
  location: string;
  budgetPln: number;
  timeline: string;
  responsible: string;
  partners: string[];
  problemsAddressed: string[];
  description: string;
  expectedResults: string[];
  accessibilityFeatures: string[];
  keyIndicator?: {
    name: string;
    targetValue: string;
  };
}

export interface MapPoint {
  id: number;
  title: string;
  category: string;
  x: number; // percentage in map
  y: number; // percentage in map
  address: string;
  description: string;
  relatedTaskId?: string;
  image?: string;
  type: 'inwestycja' | 'woonerf' | 'strefa' | 'kultura';
}

export interface IndicatorData {
  metric: string;
  category: string;
  val2015: number | string;
  val2022: number | string;
  target2035: number | string;
  unit: string;
  changePercent?: string;
  note?: string;
}

export interface PerceptionData {
  location: string;
  score2016: number;
  score2023: number;
}

export interface SafetyChartData {
  year: string;
  safe: number;
  unsafe: number;
  dontGo: number;
}

export interface BudgetShare {
  source: string;
  amountPln: number;
  percentage: number;
  color: string;
}

export interface CitizenIdea {
  id: string;
  title: string;
  author: string;
  location: string;
  category: 'podworko' | 'zieleniec' | 'kultura' | 'młodziez';
  votes: number;
  status: 'zgłoszony' | 'w_weryfikacji' | 'zaakceptowany';
  createdAt: string;
  description: string;
}
