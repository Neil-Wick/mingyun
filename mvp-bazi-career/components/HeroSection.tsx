import { Compass, Brain, TrendingUp, ShieldCheck } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="w-full pt-12 md:pt-20 pb-8 text-center px-4">
      <div className="inline-flex items-center gap-2 rounded-full bg-vermilion-500/10 text-vermilion-600 px-3 py-1 text-xs md:text-sm font-medium mb-6 border border-vermilion-500/20">
        <Compass size={14} />
        2,000-year-old system · Modern career guidance
      </div>

      <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-ink-900 leading-[1.05]">
        What career path<br className="hidden md:block" /> fits your{" "}
        <span className="text-vermilion-500">energy</span>?
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-ink-500 text-base md:text-lg leading-relaxed">
        Get your career blueprint in 60 seconds. Enter your birth date to see
        your personality type, element strengths, and best-fit careers — based
        on the ancient Ba Zi system. No email needed.
      </p>

      {/* 3 value props */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-ink-700">
        <div className="flex items-center gap-2">
          <Brain size={16} className="text-vermilion-500" />
          Know your personality type
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp size={16} className="text-jade-500" />
          See your strengths &amp; blind spots
        </div>
        <div className="flex items-center gap-2">
          <Compass size={16} className="text-sky-600" />
          Match traits to real careers
        </div>
      </div>

      {/* Trust line */}
      <p className="mt-6 text-xs md:text-sm text-ink-500/80 flex items-center justify-center gap-1.5">
        <ShieldCheck size={14} className="text-jade-500" />
        For self-reflection only · We don&apos;t store your birth data
      </p>
    </section>
  );
}
