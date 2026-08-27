/**
 * Quick smoke test for lib/bazi.ts (using tsx / ts-node style inline require via esbuild)
 * 运行: node --experimental-strip-types scripts/smoke-bazi.ts  (or 手动用 ts-node)
 *
 * 这里为了零额外依赖，用 Node 22 的 --experimental-strip-types + ts 直接跑。
 */
import { calculateBaZi } from "../lib/bazi.js";

// 用一个典型日期：1986-05-29 午时 = 1986 丙寅年 癸巳月 癸酉日 戊午时
const reading = calculateBaZi({
  dateOfBirth: "1986-05-29",
  timeOfBirth: "12:30",
  gender: "female",
});

console.log("\n===== Four Pillars =====");
console.log("Year :", reading.fourPillars.year.stem, reading.fourPillars.year.branch, "|", reading.fourPillars.year.stemEn, reading.fourPillars.year.branchEn, reading.fourPillars.year.zodiac);
console.log("Month:", reading.fourPillars.month.stem, reading.fourPillars.month.branch, "|", reading.fourPillars.month.stemEn, reading.fourPillars.month.branchEn, reading.fourPillars.month.zodiac);
console.log("Day  :", reading.fourPillars.day.stem, reading.fourPillars.day.branch, "|", reading.fourPillars.day.stemEn, reading.fourPillars.day.branchEn, reading.fourPillars.day.zodiac);
if (reading.fourPillars.hour) {
  console.log("Hour :", reading.fourPillars.hour.stem, reading.fourPillars.hour.branch, "|", reading.fourPillars.hour.stemEn, reading.fourPillars.hour.branchEn, reading.fourPillars.hour.zodiac);
}

console.log("\n===== Five Elements =====");
console.log(JSON.stringify(reading.fiveElements, null, 2));
console.log("Strongest:", reading.strongestElement);
console.log("Weakest  :", reading.weakestElement);

console.log("\n===== Day Master =====");
console.log("Stem   :", reading.dayMaster.stemEn);
console.log("Tagline:", reading.dayMaster.tagline);
console.log("Personality:", reading.dayMaster.personality.slice(0, 100), "...");
console.log("Career hints:", reading.dayMaster.careerHints);

console.log("\n✅ Smoke test finished.");
