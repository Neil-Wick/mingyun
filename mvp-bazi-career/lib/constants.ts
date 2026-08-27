import type { Element, DayMasterProfile } from "@/types";

// ========== 10 Heavenly Stems ==========
// `cn` is kept for internal lookup only — NEVER rendered in the UI.
export const STEMS = [
  { cn: "甲", en: "Jia",  yinYang: "Yang" as const, element: "wood"  as Element },
  { cn: "乙", en: "Yi",   yinYang: "Yin"  as const, element: "wood"  as Element },
  { cn: "丙", en: "Bing", yinYang: "Yang" as const, element: "fire"  as Element },
  { cn: "丁", en: "Ding", yinYang: "Yin"  as const, element: "fire"  as Element },
  { cn: "戊", en: "Wu",   yinYang: "Yang" as const, element: "earth" as Element },
  { cn: "己", en: "Ji",   yinYang: "Yin"  as const, element: "earth" as Element },
  { cn: "庚", en: "Geng", yinYang: "Yang" as const, element: "metal" as Element },
  { cn: "辛", en: "Xin",  yinYang: "Yin"  as const, element: "metal" as Element },
  { cn: "壬", en: "Ren",  yinYang: "Yang" as const, element: "water" as Element },
  { cn: "癸", en: "Gui",  yinYang: "Yin"  as const, element: "water" as Element },
] as const;

export const STEM_CN_TO_IDX: Record<string, number> = Object.fromEntries(
  STEMS.map((s, i) => [s.cn, i])
);

// ========== 12 Earthly Branches ==========
export const BRANCHES = [
  { cn: "子", en: "Zi",   zodiac: "Rat",     element: "water" as Element },
  { cn: "丑", en: "Chou", zodiac: "Ox",      element: "earth" as Element },
  { cn: "寅", en: "Yin",  zodiac: "Tiger",   element: "wood"  as Element },
  { cn: "卯", en: "Mao",  zodiac: "Rabbit",   element: "wood"  as Element },
  { cn: "辰", en: "Chen", zodiac: "Dragon",  element: "earth" as Element },
  { cn: "巳", en: "Si",   zodiac: "Snake",   element: "fire"  as Element },
  { cn: "午", en: "Wu",   zodiac: "Horse",   element: "fire"  as Element },
  { cn: "未", en: "Wei",  zodiac: "Goat",    element: "earth" as Element },
  { cn: "申", en: "Shen", zodiac: "Monkey",  element: "metal" as Element },
  { cn: "酉", en: "You",  zodiac: "Rooster", element: "metal" as Element },
  { cn: "戌", en: "Xu",   zodiac: "Dog",     element: "earth" as Element },
  { cn: "亥", en: "Hai",  zodiac: "Pig",     element: "water" as Element },
] as const;

export const BRANCH_CN_TO_IDX: Record<string, number> = Object.fromEntries(
  BRANCHES.map((b, i) => [b.cn, i])
);

// ========== Five Elements display ==========
export const ELEMENT_META: Record<Element, {
  label: string;
  color: string;       // Tailwind text color token
  barColor: string;    // chart bar hex
  trait: string;       // one-word trait for Westerners
}> = {
  wood:  { label: "Wood",  color: "text-jade-500",     barColor: "#3d8a63", trait: "Growth" },
  fire:  { label: "Fire",  color: "text-vermilion-500", barColor: "#d4452f", trait: "Drive" },
  earth: { label: "Earth", color: "text-amber-700",     barColor: "#b48a2f", trait: "Stability" },
  metal: { label: "Metal", color: "text-slate-600",     barColor: "#7c7a75", trait: "Discipline" },
  water: { label: "Water", color: "text-sky-600",       barColor: "#2563eb", trait: "Wisdom" },
};

export const ELEMENT_ORDER: Element[] = ["wood", "fire", "earth", "metal", "water"];

// ========== Day Master profiles ==========
export const DAY_MASTER_PROFILES: Record<string, DayMasterProfile> = {
  "甲": {
    stem: "Jia",
    stemEn: "Jia · Yang Wood",
    element: "wood",
    yinYang: "Yang",
    tagline: "The Pioneer — Visionary & Principled",
    personality:
      "You carry the energy of a tall, upright tree: steady, growth-oriented, and guided by a strong inner compass. You thrive when working toward a long-term vision and naturally take responsibility for others.",
    careerHints: [
      "Purpose-driven leadership: education, non-profits, sustainability",
      "Long-term strategic roles where patience compounds into impact",
      "Advisory or independent positions that respect your principles",
    ],
  },
  "乙": {
    stem: "Yi",
    stemEn: "Yi · Yin Wood",
    element: "wood",
    yinYang: "Yin",
    tagline: "The Adapter — Flexible & Detail-Oriented",
    personality:
      "Like a vine that grows around obstacles, you are resilient, adaptable, and notice details others miss. You excel at nurturing people and projects, and flourish in collaborative settings.",
    careerHints: [
      "Design, HR, nursing, editing — any role requiring careful craft",
      "Content creation, small business, client-facing services",
      "Behind-the-scenes roles where you quietly steer outcomes",
    ],
  },
  "丙": {
    stem: "Bing",
    stemEn: "Bing · Yang Fire",
    element: "fire",
    yinYang: "Yang",
    tagline: "The Radiant — Charismatic & Inspiring",
    personality:
      "You bring the warmth and visibility of the sun. People are drawn to your energy and decisiveness; you naturally take center stage and can motivate a room with your vision.",
    careerHints: [
      "Leadership, media, sales, and public-facing roles",
      "Performing arts, motivational speaking, brand ambassadorship",
      "Any field where visibility and communication drive results",
    ],
  },
  "丁": {
    stem: "Ding",
    stemEn: "Ding · Yin Fire",
    element: "fire",
    yinYang: "Yin",
    tagline: "The Focus — Passionate & Refined",
    personality:
      "You are the warm, focused flame of a lamp: steady, intuitive, and persistent. You dig deeply into whatever captures your interest and bring quiet passion to long, focused work.",
    careerHints: [
      "Research, engineering, tech innovation, and analysis",
      "Photography, culinary arts, psychology, healing",
      "Specialized consulting that rewards deep expertise",
    ],
  },
  "戊": {
    stem: "Wu",
    stemEn: "Wu · Yang Earth",
    element: "earth",
    yinYang: "Yang",
    tagline: "The Mountain — Reliable & Structured",
    personality:
      "You are the mountain: solid, dependable, and naturally structured. People trust you with their biggest responsibilities because you deliver consistently and stay calm under pressure.",
    careerHints: [
      "Finance, accounting, project management, operations",
      "Real estate, civil engineering, construction, infrastructure",
      "Roles with clear frameworks where reliability is the top priority",
    ],
  },
  "己": {
    stem: "Ji",
    stemEn: "Ji · Yin Earth",
    element: "earth",
    yinYang: "Yin",
    tagline: "The Nurturer — Empathetic & Resourceful",
    personality:
      "You are fertile soil that quietly grows everything placed in your hands. You are empathetic, practical, and resourceful — able to turn limited inputs into thriving outcomes.",
    careerHints: [
      "Hospitality, social work, nursing, education admin",
      "Food industry, farming, supply chain management",
      "Caregiving and community-building roles",
    ],
  },
  "庚": {
    stem: "Geng",
    stemEn: "Geng · Yang Metal",
    element: "metal",
    yinYang: "Yang",
    tagline: "The Blade — Disciplined & Strategic",
    personality:
      "You carry the energy of a forged sword: strong, disciplined, and strategically sharp. You think clearly under pressure, have a natural sense of justice, and cut through complexity with directness.",
    careerHints: [
      "Law, military, management consulting, engineering",
      "Executive roles requiring decisiveness and strategy",
      "Technical and operational leadership positions",
    ],
  },
  "辛": {
    stem: "Xin",
    stemEn: "Xin · Yin Metal",
    element: "metal",
    yinYang: "Yin",
    tagline: "The Gem — Meticulous & Artistic",
    personality:
      "You are polished precious metal: refined, meticulous, with an eye for quality and beauty. You hold yourself and others to a high standard and produce work of lasting craftsmanship.",
    careerHints: [
      "Jewelry, fashion, luxury, and aesthetic fields",
      "Quality assurance, surgery, scientific instrumentation",
      "Writing, editing, and any craft that values precision",
    ],
  },
  "壬": {
    stem: "Ren",
    stemEn: "Ren · Yang Water",
    element: "water",
    yinYang: "Yang",
    tagline: "The River — Wise & Influential",
    personality:
      "You are a mighty river: far-seeing, adaptable, and naturally influential. You connect people and ideas across boundaries, think systemically, and steer large currents without forcing them.",
    careerHints: [
      "Strategy consulting, finance, trading, tech, R&D",
      "Travel, logistics, cross-border and international roles",
      "Visionary positions where long-term perspective matters",
    ],
  },
  "癸": {
    stem: "Gui",
    stemEn: "Gui · Yin Water",
    element: "water",
    yinYang: "Yin",
    tagline: "The Rain — Intuitive & Insightful",
    personality:
      "You are gentle rain or a deep still pool: intuitive, empathetic, and quietly insightful. You perceive emotional undercurrents and naturally heal, create, and understand what others cannot articulate.",
    careerHints: [
      "Psychology, therapy, coaching, healing professions",
      "Art, poetry, writing, music, creative fields",
      "Research, spirituality, and roles requiring deep empathy",
    ],
  },
};
