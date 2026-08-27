import type { FourPillars } from "@/types";
import { ELEMENT_META } from "@/lib/constants";

interface Props {
  fourPillars: FourPillars;
  timeKnown: boolean;
}

const PILLAR_LABELS = [
  { key: "year", title: "Year", subtitle: "Roots · Early Environment" },
  { key: "month", title: "Month", subtitle: "Career · Social Role" },
  { key: "day", title: "Day", subtitle: "Core Self · Who You Are" },
  { key: "hour", title: "Hour", subtitle: "Aspirations · Future Path" },
] as const;

export default function FourPillarsCard({ fourPillars, timeKnown }: Props) {
  return (
    <div>
      <div className="flex items-end justify-between mb-4 flex-wrap gap-2">
        <div>
          <h3 className="font-serif text-2xl text-ink-900 font-semibold">
            Your Four Pillars
          </h3>
          <p className="text-sm text-ink-500 mt-1">
            The four time-dimensions of your birth — each carries an energy signature.
          </p>
        </div>
        {!timeKnown && (
          <span className="inline-block text-[11px] bg-ink-100 text-ink-500 px-2.5 py-1 rounded-full border border-ink-200">
            Hour Pillar skipped (birth time unknown)
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {PILLAR_LABELS.map(({ key, title, subtitle }) => {
          const pillar = fourPillars[key as keyof FourPillars];
          if (!pillar) {
            return (
              <div
                key={key}
                className="rounded-xl border border-dashed border-ink-200 bg-ink-50/60 p-4 flex flex-col items-center justify-center text-ink-500 min-h-[180px]"
              >
                <p className="text-xs uppercase tracking-wider font-medium">{title}</p>
                <p className="text-[11px] mt-1 text-center opacity-80">{subtitle}</p>
                <p className="mt-4 text-[11px] text-center leading-relaxed">
                  Add your birth time<br />to unlock this pillar
                </p>
              </div>
            );
          }

          const stemEl = ELEMENT_META[pillar.element];
          const branchEl = ELEMENT_META[pillar.branchElement];

          return (
            <div
              key={key}
              className="rounded-xl bg-white ring-1 ring-ink-200/60 shadow-sm overflow-hidden flex flex-col"
            >
              <div className="px-3 pt-3 pb-2 text-center">
                <p className="text-[11px] uppercase tracking-wider text-ink-500 font-medium">
                  {title}
                </p>
                <p className="text-[11px] text-ink-500/80">{subtitle}</p>
              </div>

              {/* Stem + Branch */}
              <div className="flex-1 flex items-stretch border-y border-ink-100">
                <div className="flex-1 flex flex-col items-center justify-center py-4 border-r border-ink-100 bg-white">
                  <span
                    className={`text-2xl md:text-3xl font-serif font-bold ${stemEl.color}`}
                  >
                    {pillar.stem}
                  </span>
                  <p className="mt-1.5 text-[10px] uppercase tracking-wide text-ink-500">
                    Stem
                  </p>
                  <p className={`text-[11px] font-medium ${stemEl.color}`}>
                    {pillar.stemYinYang} {stemEl.label}
                  </p>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center py-4 bg-ink-50/60">
                  <span
                    className={`text-2xl md:text-3xl font-serif font-bold ${branchEl.color}`}
                  >
                    {pillar.branch}
                  </span>
                  <p className="mt-1.5 text-[10px] uppercase tracking-wide text-ink-500">
                    Branch
                  </p>
                  <p className="text-[11px] font-medium text-ink-700">
                    {pillar.zodiac}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
