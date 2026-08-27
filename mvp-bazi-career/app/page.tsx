"use client";

import { useEffect, useRef, useState } from "react";
import HeroSection from "@/components/HeroSection";
import InputForm from "@/components/InputForm";
import FourPillarsCard from "@/components/FourPillarsCard";
import FiveElementsChart from "@/components/FiveElementsChart";
import DayMasterAnalysis from "@/components/DayMasterAnalysis";
import FeedbackWidget from "@/components/FeedbackWidget";
import { calculateBaZi } from "@/lib/bazi";
import {
  track,
  isUAABot,
  isCnByBrowserSignals,
  watchHumanSignals,
} from "@/lib/analytics";
import type { BaziInput, BaziReading } from "@/types";
import { Sparkles, Mail, Check } from "lucide-react";

export default function HomePage() {
  const [reading, setReading] = useState<BaziReading | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false);
  const resultRef = useRef<HTMLDivElement>(null);

  /**
   * Valid-visit detection — runs exactly once per page load.
   *
   * Heuristic validity flow (client side, server side will double check):
   *   1. If UA matches known bot → invalid_visit
   *   2. Otherwise wait for 1 real human signal (pointer/key/scroll/touch/move)
   *      — or a 2.5s timeout — then fire valid_visit + human_signals_ok prop
   */
  useEffect(() => {
    let disposed = false;
    let fired = false;
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const cn = isCnByBrowserSignals();

    function fire(humanSignalsOk: boolean) {
      if (fired || disposed) return;
      fired = true;
      if (isUAABot(ua)) {
        track("invalid_visit", {
          reason: "bot_ua",
          human_signals_ok: humanSignalsOk,
        });
        return;
      }
      track("valid_visit", {
        human_signals_ok: humanSignalsOk,
        country_client_tz: cn.tz,
        cn_likely: cn.likely,
      });
    }

    // Human-signal observer — fires humanSignalsOk=true when real input happens
    // within 2.5s; otherwise fires with humanSignalsOk=false.
    // If UA was detected bot, we still wait for signals to fill the signal_ok
    // field in invalid_visit for tuning purposes.
    const cancel = watchHumanSignals(() => fire(true));

    // Safety timeout fallback — guarantees fire() always eventually gets called
    // even if watchHumanSignals's internal timer is suppressed somehow.
    const safety = setTimeout(() => fire(false), 4000);

    return () => {
      disposed = true;
      cancel();
      clearTimeout(safety);
    };
  }, []);

  function handleSubmit(input: BaziInput) {
    try {
      setError(null);
      setLoading(true);
      setTimeout(() => {
        try {
          const r = calculateBaZi(input);
          setReading(r);
          setLoading(false);
          track("result_viewed", {
            dayMaster: r.dayMaster.stemEn,
            timeKnown: r.timeKnown,
          });
          requestAnimationFrame(() => {
            resultRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          });
        } catch (e: any) {
          setError(
            e?.message ?? "Something went wrong calculating your reading."
          );
          setLoading(false);
        }
      }, 350);
    } catch (e: any) {
      setError(e?.message ?? "Unknown error.");
      setLoading(false);
    }
  }

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    track("email_entered");
    try {
      const list = JSON.parse(localStorage.getItem("bazi-waitlist") ?? "[]");
      list.push({ email, at: new Date().toISOString() });
      localStorage.setItem("bazi-waitlist", JSON.stringify(list));
    } catch {
      /* noop */
    }
    form.reset();
    setEmailSubmitted(true);
  }

  return (
    <main className="mx-auto max-w-5xl w-full">
      <HeroSection />

      <InputForm onSubmit={handleSubmit} loading={loading} />

      {error && (
        <div className="mx-auto max-w-xl px-4 mb-10 rounded-xl bg-vermilion-500/10 border border-vermilion-500/30 text-vermilion-600 px-5 py-4 text-sm">
          {error}
        </div>
      )}

      {loading && !reading && (
        <div className="mx-auto max-w-xl px-4 mb-10 flex items-center justify-center gap-3 text-ink-500 text-sm py-6">
          <Sparkles size={18} className="text-vermilion-500 animate-pulse" />
          Calculating your career blueprint...
        </div>
      )}

      {/* Results */}
      {reading && (
        <div
          ref={resultRef}
          className="px-4 pt-2 pb-16 space-y-8 md:space-y-10 result-appear"
        >
          <FourPillarsCard
            fourPillars={reading.fourPillars}
            timeKnown={reading.timeKnown}
          />
          <FiveElementsChart
            fiveElements={reading.fiveElements}
            strongest={reading.strongestElement}
            weakest={reading.weakestElement}
          />
          <DayMasterAnalysis
            dayMaster={reading.dayMaster}
            strongestElement={reading.strongestElement}
            weakestElement={reading.weakestElement}
          />

          <FeedbackWidget />

          {/* Email validation hook — this is the #1 MVP metric */}
          <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-br from-vermilion-500 via-vermilion-600 to-ink-900 text-white px-6 py-7 shadow-xl overflow-hidden relative">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.6), transparent 40%)",
              }}
            />
            <div className="relative">
              <p className="text-[11px] uppercase tracking-[0.25em] text-white/80 mb-2 flex items-center gap-1.5">
                <Mail size={12} /> Coming Next
              </p>
              <h3 className="font-serif text-2xl md:text-3xl font-semibold mb-2">
                Want a deeper 2026 career forecast?
              </h3>
              <p className="text-white/85 leading-relaxed text-[15px] max-w-2xl">
                We&apos;re building the next layer: your 10-year career timing
                cycles, best months for job changes, and personalized action
                dates. Leave your email to get early access when it launches.
              </p>

              {emailSubmitted ? (
                <div className="mt-5 flex items-center gap-2 text-white text-sm md:text-base bg-white/15 rounded-lg px-4 py-3">
                  <Check size={18} />
                  You&apos;re on the list! We&apos;ll email you when it&apos;s ready.
                </div>
              ) : (
                <form
                  className="mt-5 flex flex-col sm:flex-row gap-2 max-w-xl"
                  onSubmit={handleEmailSubmit}
                >
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="flex-1 rounded-lg bg-white/95 text-ink-900 px-4 py-2.5 placeholder:text-ink-500 outline-none focus:ring-4 focus:ring-white/30"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-ink-900 hover:bg-black text-white px-5 py-2.5 font-semibold text-sm transition shadow"
                  >
                    Get Early Access
                  </button>
                </form>
              )}
              <p className="mt-2 text-[11px] text-white/70">
                No spam. One email when the full forecast launches — unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Founder note */}
      <section className="mx-auto max-w-3xl px-4 py-10 text-center">
        <div className="rounded-xl bg-white/50 border border-ink-200/60 p-5 md:p-6">
          <p className="text-sm text-ink-500 uppercase tracking-wider mb-2">
            Why I built this
          </p>
          <p className="text-ink-700 leading-relaxed text-[15px]">
            After years in tech, I discovered the Ba Zi system and was struck by
            how precisely it mapped my career arcs and natural tendencies. I
            wanted others to access this 2,000-year-old framework without needing
            to learn Chinese — translated into language a modern professional
            can actually use.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-5xl px-4 pb-12 pt-8 border-t border-ink-200/60 mt-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div>
            <p className="font-serif text-lg font-semibold leading-none text-ink-900">
              BaZi Career
            </p>
            <p className="text-[11px] text-ink-500 mt-0.5">
              Career guidance rooted in ancient wisdom.
            </p>
          </div>

          <p className="text-xs text-ink-500 text-center md:text-right">
            &copy; {new Date().getFullYear()} BaZi Career · For self-reflection
            only.
            <br />
            Not a substitute for professional career or financial advice.
          </p>
        </div>
      </footer>
    </main>
  );
}
