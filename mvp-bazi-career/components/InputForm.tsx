"use client";

import { useMemo, useRef, useState } from "react";
import { Calendar, Clock, Users, Sparkles } from "lucide-react";
import type { BaziInput, Gender } from "@/types";
import { track } from "@/lib/analytics";

interface Props {
  onSubmit: (input: BaziInput) => void;
  loading?: boolean;
}

const MONTHS = [
  { v: 1, label: "January" },
  { v: 2, label: "February" },
  { v: 3, label: "March" },
  { v: 4, label: "April" },
  { v: 5, label: "May" },
  { v: 6, label: "June" },
  { v: 7, label: "July" },
  { v: 8, label: "August" },
  { v: 9, label: "September" },
  { v: 10, label: "October" },
  { v: 11, label: "November" },
  { v: 12, label: "December" },
];

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

export default function InputForm({ onSubmit, loading }: Props) {
  const formStartedRef = useRef(false);

  const thisYear = new Date().getFullYear();
  const years = useMemo(() => {
    const y: number[] = [];
    for (let i = thisYear; i >= 1920; i--) y.push(i);
    return y;
  }, [thisYear]);

  const [year, setYear] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [hour, setHour] = useState<string>("12");
  const [minute, setMinute] = useState<string>("00");
  const [timeUnknown, setTimeUnknown] = useState<boolean>(true);
  const [gender, setGender] = useState<Gender>("female");

  const daysInMonth = useMemo(() => {
    if (!year || !month) return 31;
    return new Date(parseInt(year, 10), parseInt(month, 10), 0).getDate();
  }, [year, month]);

  function handleFirstFocus() {
    if (!formStartedRef.current) {
      formStartedRef.current = true;
      track("form_started");
    }
  }

  const dateComplete = !!year && !!month && !!day;
  const dateOfBirth = dateComplete ? `${year}-${month}-${day}` : "";

  // Clamp day when e.g. user picks Jan 31 then switches to Feb
  function onMonthChange(newMonth: string) {
    setMonth(newMonth);
    if (day && newMonth) {
      const max = new Date(parseInt(year || `${thisYear}`, 10), parseInt(newMonth, 10), 0).getDate();
      if (parseInt(day, 10) > max) setDay(pad(max));
    }
  }
  function onYearChange(newYear: string) {
    setYear(newYear);
    if (day && month && newYear) {
      const max = new Date(parseInt(newYear, 10), parseInt(month, 10), 0).getDate();
      if (parseInt(day, 10) > max) setDay(pad(max));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!dateComplete || !gender || loading) return;
    const timeOfBirth = timeUnknown ? undefined : `${hour}:${minute}`;
    track("form_submitted", { timeKnown: !timeUnknown });
    onSubmit({ dateOfBirth, timeOfBirth, gender });
  }

  const selectClass =
    "w-full appearance-none rounded-lg border border-ink-200 bg-white px-3 py-2.5 pr-9 text-ink-900 focus:border-vermilion-500 focus:ring-2 focus:ring-vermilion-500/20 outline-none transition bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22%236b6355%22%20stroke-width=%222%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22%3E%3Cpolyline%20points=%226%209%2012%2015%2018%209%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_0.5rem_center] bg-[length:1.25rem_1.25rem] disabled:bg-ink-50 disabled:text-ink-500";

  return (
    <section id="form" className="w-full px-4 pb-14">
      <div className="mx-auto max-w-xl bg-white/80 backdrop-blur rounded-2xl shadow-xl ring-1 ring-ink-200/60 p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-5" onFocus={handleFirstFocus}>
          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2 flex items-center gap-2">
              <Calendar size={16} className="text-vermilion-500" />
              Date of Birth
            </label>
            <div className="grid grid-cols-[2fr_3fr_1.5fr] gap-2">
              <select
                value={year}
                onChange={(e) => onYearChange(e.target.value)}
                required
                className={selectClass}
                aria-label="Year of birth"
              >
                <option value="">Year</option>
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <select
                value={month}
                onChange={(e) => onMonthChange(e.target.value)}
                required
                className={selectClass}
                aria-label="Month of birth"
              >
                <option value="">Month</option>
                {MONTHS.map((m) => (
                  <option key={m.v} value={pad(m.v)}>{m.label}</option>
                ))}
              </select>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                required
                className={selectClass}
                aria-label="Day of birth"
              >
                <option value="">Day</option>
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={pad(d)}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Time of Birth */}
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2 flex items-center gap-2">
              <Clock size={16} className="text-vermilion-500" />
              Time of Birth
              <span className="text-xs font-normal text-ink-500 ml-1">(optional)</span>
            </label>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-ink-500 mb-1">
                    Hour (24h)
                  </label>
                  <select
                    value={hour}
                    onChange={(e) => {
                      setHour(e.target.value);
                      if (timeUnknown) setTimeUnknown(false);
                    }}
                    disabled={timeUnknown}
                    className={selectClass}
                    aria-label="Hour of birth"
                  >
                    {Array.from({ length: 24 }, (_, i) => i).map((h) => (
                      <option key={h} value={pad(h)}>{pad(h)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-ink-500 mb-1">
                    Minute
                  </label>
                  <select
                    value={minute}
                    onChange={(e) => {
                      setMinute(e.target.value);
                      if (timeUnknown) setTimeUnknown(false);
                    }}
                    disabled={timeUnknown}
                    className={selectClass}
                    aria-label="Minute of birth"
                  >
                    {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                      <option key={m} value={pad(m)}>{pad(m)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <label className="inline-flex items-center gap-2 text-sm text-ink-500 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={timeUnknown}
                  onChange={(e) => setTimeUnknown(e.target.checked)}
                  className="w-4 h-4 accent-vermilion-500"
                />
                I don&apos;t know my birth time
              </label>
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2 flex items-center gap-2">
              <Users size={16} className="text-vermilion-500" />
              Gender
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(["female", "male"] as Gender[]).map((g) => (
                <button
                  type="button"
                  key={g}
                  onClick={() => setGender(g)}
                  className={`py-2.5 rounded-lg border text-sm font-medium capitalize transition ${
                    gender === g
                      ? "border-vermilion-500 bg-vermilion-500/10 text-vermilion-600 ring-2 ring-vermilion-500/20"
                      : "border-ink-200 bg-white text-ink-700 hover:border-ink-500"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!dateComplete || loading}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-vermilion-500 px-4 py-3.5 text-sm md:text-base font-semibold text-white shadow-md hover:bg-vermilion-600 focus:ring-4 focus:ring-vermilion-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles size={18} />
            {loading ? "Calculating..." : "Reveal My Career Reading"}
          </button>

          <p className="text-center text-xs text-ink-500 pt-1">
            100% free · No email required · Results in 60 seconds
          </p>
        </form>
      </div>
    </section>
  );
}
