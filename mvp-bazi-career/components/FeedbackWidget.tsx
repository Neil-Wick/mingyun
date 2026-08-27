"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown, MessageSquare, Send, Check } from "lucide-react";
import { track } from "@/lib/analytics";

export default function FeedbackWidget() {
  const [sentiment, setSentiment] = useState<"up" | "down" | null>(null);
  const [text, setText] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitted) return;
    track("feedback_given", { sentiment: sentiment ?? "none" });
    try {
      const existing = JSON.parse(
        typeof localStorage !== "undefined"
          ? localStorage.getItem("bazi-feedback") ?? "[]"
          : "[]"
      );
      existing.push({ sentiment, text, at: new Date().toISOString() });
      localStorage.setItem("bazi-feedback", JSON.stringify(existing));
    } catch {
      /* noop */
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-3xl mt-10 mb-2 rounded-2xl bg-jade-500/10 border border-jade-500/30 px-5 py-4 text-center text-jade-500 text-sm md:text-base flex items-center justify-center gap-2">
        <Check size={18} />
        Thank you! Your feedback helps us improve.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl mt-10 mb-2 rounded-2xl bg-white/70 backdrop-blur ring-1 ring-ink-200/60 shadow-sm p-5 md:p-6">
      <div className="flex items-center gap-2 mb-3 text-ink-700">
        <MessageSquare size={18} className="text-vermilion-500" />
        <p className="text-sm md:text-base font-medium">
          Was this reading helpful?
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setSentiment("up")}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium border transition ${
            sentiment === "up"
              ? "bg-jade-500/10 border-jade-500 text-jade-500 ring-2 ring-jade-500/20"
              : "bg-white border-ink-200 text-ink-700 hover:border-jade-500/50"
          }`}
        >
          <ThumbsUp size={16} /> Helpful
        </button>
        <button
          type="button"
          onClick={() => setSentiment("down")}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium border transition ${
            sentiment === "down"
              ? "bg-vermilion-500/10 border-vermilion-500 text-vermilion-600 ring-2 ring-vermilion-500/20"
              : "bg-white border-ink-200 text-ink-700 hover:border-vermilion-500/50"
          }`}
        >
          <ThumbsDown size={16} /> Not really
        </button>

        <form onSubmit={handleSubmit} className="flex-1 min-w-[220px] flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Anything to improve? (optional)"
            className="flex-1 rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm focus:border-vermilion-500 focus:ring-2 focus:ring-vermilion-500/20 outline-none transition"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-lg bg-ink-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-ink-700 transition disabled:opacity-50"
          >
            <Send size={14} />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}
