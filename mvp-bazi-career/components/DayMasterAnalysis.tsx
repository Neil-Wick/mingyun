import type { DayMasterProfile, Element } from "@/types";
import { ELEMENT_META } from "@/lib/constants";
import { Flame } from "lucide-react";

interface Props {
  dayMaster: DayMasterProfile;
  strongestElement: Element;
  weakestElement: Element;
}

export default function DayMasterAnalysis({
  dayMaster,
  strongestElement,
  weakestElement,
}: Props) {
  const elColor = ELEMENT_META[dayMaster.element].color;
  const elLabel = ELEMENT_META[dayMaster.element].label;

  return (
    <div>
      <div className="mb-4">
        <h3 className="font-serif text-2xl text-ink-900 font-semibold">
          Your Career Personality
        </h3>
        <p className="text-sm text-ink-500 mt-1">
          Your Day Master — the core energy that shapes how you work, lead, and thrive.
        </p>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-white via-white to-ink-50 ring-1 ring-ink-200/60 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="relative px-5 md:px-6 py-5 border-b border-ink-100">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-ink-500 mb-1">
                Day Master
              </p>
              <h4 className="font-serif text-2xl md:text-3xl font-semibold text-ink-900">
                {dayMaster.stemEn}
              </h4>
              <p className={`mt-1 text-sm md:text-base font-medium ${elColor} flex items-center gap-2`}>
                <Flame size={14} /> {dayMaster.tagline}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs min-w-[200px]">
              <div className="rounded-lg bg-ink-50 border border-ink-200/60 p-2">
                <p className="text-[10px] uppercase tracking-wider text-ink-500">
                  Element
                </p>
                <p className={`font-semibold ${elColor}`}>{elLabel}</p>
              </div>
              <div className="rounded-lg bg-ink-50 border border-ink-200/60 p-2">
                <p className="text-[10px] uppercase tracking-wider text-ink-500">
                  Polarity
                </p>
                <p className="font-semibold text-ink-700">{dayMaster.yinYang}</p>
              </div>
              <div className="rounded-lg bg-ink-50 border border-ink-200/60 p-2">
                <p className="text-[10px] uppercase tracking-wider text-ink-500">
                  Strength
                </p>
                <p className={`font-semibold ${ELEMENT_META[strongestElement].color}`}>
                  {ELEMENT_META[strongestElement].label}
                </p>
              </div>
              <div className="rounded-lg bg-ink-50 border border-ink-200/60 p-2">
                <p className="text-[10px] uppercase tracking-wider text-ink-500">
                  Growth
                </p>
                <p className={`font-semibold ${ELEMENT_META[weakestElement].color}`}>
                  {ELEMENT_META[weakestElement].label}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Personality */}
        <div className="px-5 md:px-6 py-5 border-b border-ink-100">
          <h5 className="text-sm font-semibold text-ink-700 mb-2">
            Personality Snapshot
          </h5>
          <p className="text-ink-700 leading-relaxed text-[15px]">
            {dayMaster.personality}
          </p>
        </div>

        {/* Career directions */}
        <div className="px-5 md:px-6 py-5">
          <h5 className="text-sm font-semibold text-ink-700 mb-3">
            Career Directions That Fit You
          </h5>
          <ul className="space-y-2.5">
            {dayMaster.careerHints.map((hint, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold text-white shrink-0"
                  style={{ background: ELEMENT_META[dayMaster.element].barColor }}
                >
                  {i + 1}
                </span>
                <span className="text-ink-700 leading-relaxed text-[15px]">
                  {hint}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
