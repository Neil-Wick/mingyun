/**
 * Ba Zi engine core (tyme4ts v1.5.x stable API)
 *
 * - Year/Month/Day/Hour via SixtyCycle:
 *   getHeavenStem().getName()  -> stem char (Chinese, internal lookup only)
 *   getEarthBranch().getName() -> branch char (Chinese, internal lookup only)
 *
 * - With birth time -> SolarTime -> SixtyCycleHour -> full 4 pillars
 * - Without birth time -> SolarDay -> SixtyCycleDay -> 3 pillars (hour=null)
 */
import { SolarDay, SolarTime } from "tyme4ts";
import type {
  BaziInput,
  BaziReading,
  Element,
  FiveElements,
  FourPillars,
  Pillar,
} from "@/types";
import {
  BRANCHES,
  BRANCH_CN_TO_IDX,
  DAY_MASTER_PROFILES,
  ELEMENT_META,
  ELEMENT_ORDER,
  STEM_CN_TO_IDX,
  STEMS,
} from "@/lib/constants";

/* ---------------- helpers ---------------- */

function buildPillar(stemCn: string, branchCn: string): Pillar {
  const stemIdx = STEM_CN_TO_IDX[stemCn];
  const branchIdx = BRANCH_CN_TO_IDX[branchCn];
  const stem = STEMS[stemIdx] ?? STEMS[0];
  const branch = BRANCHES[branchIdx] ?? BRANCHES[0];
  return {
    stem: stem.en,            // pinyin for display
    stemEn: `${stem.en} \u00b7 ${stem.yinYang} ${ELEMENT_META[stem.element].label}`,
    stemYinYang: stem.yinYang,
    branch: branch.en,        // pinyin for display
    branchEn: branch.en,
    zodiac: branch.zodiac,
    element: stem.element,
    branchElement: branch.element,
  };
}

/** SixtyCycle -> { stem, branch } (Chinese chars used for internal lookup only) */
function extractGanZhi(cycle: any): { stem: string; branch: string } {
  const stem = String(cycle.getHeavenStem().getName());
  const branch = String(cycle.getEarthBranch().getName());
  return { stem, branch };
}

function countFiveElements(pillars: FourPillars): FiveElements {
  const counts: FiveElements = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
  const all: Pillar[] = [
    pillars.year,
    pillars.month,
    pillars.day,
    pillars.hour,
  ].filter(Boolean) as Pillar[];
  for (const p of all) {
    counts[p.element] += 1;
    counts[p.branchElement] += 1;
  }
  return counts;
}

function findStrongest(f: FiveElements): Element {
  let best: Element = "wood";
  let max = -1;
  for (const el of ELEMENT_ORDER) {
    if (f[el] > max) { max = f[el]; best = el; }
  }
  return best;
}

function findWeakest(f: FiveElements): Element {
  let best: Element = "wood";
  let min = Infinity;
  for (const el of ELEMENT_ORDER) {
    if (f[el] < min) { min = f[el]; best = el; }
  }
  return best;
}

/* ---------------- main entry ---------------- */

export function calculateBaZi(input: BaziInput): BaziReading {
  const [y, m, d] = input.dateOfBirth.split("-").map((s) => parseInt(s, 10));
  const timeKnown = !!input.timeOfBirth && input.timeOfBirth.length >= 4;

  let yearCycle: any, monthCycle: any, dayCycle: any, hourCycle: any = null;

  if (timeKnown) {
    const [hh, mm] = input.timeOfBirth!.split(":").map((s) => parseInt(s, 10));
    const solarTime = (SolarTime as any).fromYmdHms(y, m, d, hh, mm, 0);
    const sch = solarTime.getSixtyCycleHour();
    yearCycle = sch.getYear();
    monthCycle = sch.getMonth();
    dayCycle = sch.getDay();
    hourCycle = sch.getSixtyCycle();
  } else {
    const solarDay = (SolarDay as any).fromYmd(y, m, d);
    const scd = solarDay.getSixtyCycleDay();
    yearCycle = scd.getYear();
    monthCycle = scd.getMonth();
    dayCycle = scd.getSixtyCycle();
  }

  const yGZ = extractGanZhi(yearCycle);
  const mGZ = extractGanZhi(monthCycle);
  const dGZ = extractGanZhi(dayCycle);
  const hGZ = hourCycle ? extractGanZhi(hourCycle) : null;

  const fourPillars: FourPillars = {
    year: buildPillar(yGZ.stem, yGZ.branch),
    month: buildPillar(mGZ.stem, mGZ.branch),
    day: buildPillar(dGZ.stem, dGZ.branch),
    hour: hGZ ? buildPillar(hGZ.stem, hGZ.branch) : null,
  };

  const fiveElements = countFiveElements(fourPillars);
  const strongestElement = findStrongest(fiveElements);
  const weakestElement = findWeakest(fiveElements);
  const dayMaster = DAY_MASTER_PROFILES[dGZ.stem] ?? DAY_MASTER_PROFILES["甲"];

  return {
    fourPillars,
    fiveElements,
    dayMaster,
    strongestElement,
    weakestElement,
    timeKnown,
  };
}
