import type { FiveElements } from "@/types";
import { ELEMENT_META, ELEMENT_ORDER } from "@/lib/constants";

interface Props {
  fiveElements: FiveElements;
  strongest: keyof FiveElements;
  weakest: keyof FiveElements;
}

export default function FiveElementsChart({ fiveElements, strongest, weakest }: Props) {
  const max = Math.max(...ELEMENT_ORDER.map((e) => fiveElements[e]), 1);
  const total = ELEMENT_ORDER.reduce((a, e) => a + fiveElements[e], 0);

  return (
    <div>
      <div className="mb-4">
        <h3 className="font-serif text-2xl text-ink-900 font-semibold">
          Your Element Balance
        </h3>
        <p className="text-sm text-ink-500 mt-1">
          Five elemental energies in your chart — each maps to a personality trait.
        </p>
      </div>

      <div className="rounded-xl bg-white ring-1 ring-ink-200/60 shadow-sm p-5 md:p-6">
        {/* Bar chart */}
        <div className="flex items-end justify-around gap-3 md:gap-6 h-44 border-b border-ink-100 pb-2">
          {ELEMENT_ORDER.map((el) => {
            const count = fiveElements[el];
            const h = max === 0 ? 0 : (count / max) * 100;
            const meta = ELEMENT_META[el];
            const tag =
              el === strongest ? "Strong" : el === weakest ? (count === 0 ? "Missing" : "Weak") : "";
            return (
              <div key={el} className="flex-1 flex flex-col items-center justify-end h-full">
                <div className="relative w-full flex flex-col items-center justify-end flex-1">
                  {tag && (
                    <span
                      className={`mb-1 text-[10px] md:text-[11px] px-2 py-0.5 rounded-full ${
                        tag === "Strong"
                          ? "bg-vermilion-500/10 text-vermilion-600"
                          : tag === "Missing"
                          ? "bg-slate-100 text-slate-500"
                          : "bg-amber-500/10 text-amber-700"
                      }`}
                    >
                      {tag}
                    </span>
                  )}
                  <span className="text-xs md:text-sm font-semibold text-ink-700 mb-1">
                    {count}
                  </span>
                  <div
                    className="w-full rounded-t-md transition-all duration-700"
                    style={{
                      height: `${Math.max(h, count > 0 ? 8 : 0)}%`,
                      background: meta.barColor,
                      minHeight: count > 0 ? "8px" : "2px",
                      opacity: count === 0 ? 0.35 : 1,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom labels */}
        <div className="flex justify-around gap-3 md:gap-6 mt-3">
          {ELEMENT_ORDER.map((el) => {
            const meta = ELEMENT_META[el];
            const count = fiveElements[el];
            const pct = total === 0 ? 0 : Math.round((count / total) * 100);
            return (
              <div key={el} className="flex-1 text-center">
                <p className={`text-sm md:text-base font-semibold ${meta.color}`}>
                  {meta.label}
                </p>
                <p className="text-[10px] md:text-[11px] text-ink-500 italic">{meta.trait}</p>
                <p className="text-[11px] md:text-xs text-ink-500 mt-0.5">{pct}%</p>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="mt-5 grid md:grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg bg-ink-50 border border-ink-200/60 p-3">
            <p className="text-[11px] uppercase tracking-wider text-ink-500 mb-1">
              Your Dominant Trait
            </p>
            <p className={`font-semibold ${ELEMENT_META[strongest].color}`}>
              {ELEMENT_META[strongest].label} — {ELEMENT_META[strongest].trait}
              <span className="text-ink-500 font-normal"> (natural strength)</span>
            </p>
          </div>
          <div className="rounded-lg bg-ink-50 border border-ink-200/60 p-3">
            <p className="text-[11px] uppercase tracking-wider text-ink-500 mb-1">
              {fiveElements[weakest] === 0 ? "Missing Element" : "Growth Area"}
            </p>
            <p className={`font-semibold ${ELEMENT_META[weakest].color}`}>
              {ELEMENT_META[weakest].label} — {ELEMENT_META[weakest].trait}
              <span className="text-ink-500 font-normal"> (room to grow)</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
