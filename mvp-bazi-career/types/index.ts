export type Gender = "male" | "female";

export type Element = "wood" | "fire" | "earth" | "metal" | "water";

export interface BaziInput {
  dateOfBirth: string;
  timeOfBirth?: string;
  gender: Gender;
}

export interface Pillar {
  stem: string;          // pinyin, e.g. "Jia" (cn kept internal only)
  stemEn: string;        // full label, e.g. "Jia · Yang Wood"
  stemYinYang: "Yang" | "Yin";
  branch: string;        // pinyin, e.g. "Zi"
  branchEn: string;      // e.g. "Zi"
  zodiac: string;        // e.g. "Rat"
  element: Element;      // stem element
  branchElement: Element;
}

export interface FourPillars {
  year: Pillar;
  month: Pillar;
  day: Pillar;
  hour: Pillar | null;
}

export interface FiveElements {
  wood: number;
  fire: number;
  earth: number;
  metal: number;
  water: number;
}

export interface DayMasterProfile {
  stem: string;          // pinyin
  stemEn: string;        // full label
  element: Element;
  yinYang: "Yang" | "Yin";
  tagline: string;
  personality: string;
  careerHints: string[];
}

export interface BaziReading {
  fourPillars: FourPillars;
  fiveElements: FiveElements;
  dayMaster: DayMasterProfile;
  strongestElement: Element;
  weakestElement: Element;
  timeKnown: boolean;
}
