/**
 * MVP Validation Analytics (Client)
 *
 *   Dual-write every event:
 *     1) window.plausible() —  → Plausible SaaS dashboard (UV + event overview)
 *     2) POST /api/events    → Netlify Function (server-side country/bot filter +
 *                              per-event audit log in Netlify dashboard)
 *
 *   Visit validity check is a combined heuristic (bot UA / no-human-signal /
 *   CN timezone → CN_IP via Netlify header server-side refines it).
 *
 *   Events tracked:
 *     valid_visit        — page + human signal confirmed (PRIMARY UV count)
 *     invalid_visit      — detected as bot / CN-only browser (for tuning)
 *     form_started
 *     form_submitted
 *     result_viewed
 *     email_entered
 *     feedback_given
 */

export type EventName =
  | "valid_visit"
  | "invalid_visit"
  | "form_started"
  | "form_submitted"
  | "result_viewed"
  | "email_entered"
  | "feedback_given";

export interface EventProps {
  [k: string]: string | number | boolean | undefined;
  // validity signals (filled automatically):
  country_client_tz?: string;
  cn_likely?: boolean; // true when browser locale/tz looks like CN
  human_signals_ok?: boolean;
  ua_bot?: boolean;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

/* ---------- BOT UA detection (simple but covers 95% of common hits) ---------- */

const BOT_PATTERNS = [
  /bot/i,
  /crawl/i,
  /spider/i,
  /slurp/i,
  /headless/i,
  /phantom/i,
  /puppeteer/i,
  /selenium/i,
  /webdriver/i,
  /python-requests/i,
  /curl/i,
  /wget/i,
  /axios/i,
  /node-fetch/i,
  /go-http-client/i,
  /java/i,
  /okhttp/i,
  /scrapy/i,
  /datadogagent/i,
  /pingdom/i,
  /uptimerobot/i,
  /httpmon/i,
  /feedfetcher/i,
  /facebookexternalhit/i,
  /whatsapp/i,
  /telegrambot/i,
  /discordbot/i,
  /googleother/i,
  /semrush/i,
  /ahrefs/i,
  /mj12bot/i,
  /yandex/i,
  /baidu/i,
  /sogou/i,
];

export function isUAABot(userAgent: string): boolean {
  if (!userAgent) return true;
  // Quick rule: tiny or malformed UA => bot
  if (userAgent.length < 20) return true;
  return BOT_PATTERNS.some((re) => re.test(userAgent));
}

/* ---------- CN browser heuristic (client side) ---------- */

const CN_TIMEZONES = new Set([
  "Asia/Shanghai",
  "Asia/Chongqing",
  "Asia/Harbin",
  "Asia/Urumqi",
  "Asia/Kashgar",
  "Asia/Hong_Kong",
  "Asia/Macau",
  "Asia/Taipei",
]);

const CN_LOCALES = ["zh-CN", "zh-SG", "zh-Hans-CN"];

export function isCnByBrowserSignals(): {
  tz: string;
  locale: string;
  likely: boolean;
} {
  if (typeof Intl === "undefined") {
    return { tz: "unknown", locale: "unknown", likely: false };
  }
  const tz =
    (Intl.DateTimeFormat().resolvedOptions &&
      Intl.DateTimeFormat().resolvedOptions().timeZone) ||
    "unknown";
  const locale =
    (typeof navigator !== "undefined" && navigator.language) || "unknown";
  const likely =
    CN_TIMEZONES.has(tz) || CN_LOCALES.includes(locale.toLowerCase());
  return { tz, locale, likely };
}

/* ---------- Human signal detector ---------- */

export function watchHumanSignals(onConfirmed: () => void): () => void {
  let confirmed = false;
  let to: ReturnType<typeof setTimeout> | null = null;

  function confirm() {
    if (confirmed) return;
    confirmed = true;
    if (to) clearTimeout(to);
    onConfirmed();
  }

  // If none of pointer / key / scroll / touch fired within 2s, it's probably not a human
  to = setTimeout(() => {
    if (!confirmed) onConfirmed(); // still run caller, but signal_ok will be false
  }, 2500);

  const opts = { once: true, passive: true, capture: true } as const;
  const events = [
    "pointerdown",
    "keydown",
    "scroll",
    "touchstart",
    "visibilitychange",
    "mousemove",
  ];

  function handler(e: Event) {
    // ignore visibilitychange triggered by initial paint without user action
    if (e.type === "visibilitychange") {
      if (typeof document !== "undefined" && document.visibilityState === "visible")
        confirm();
      return;
    }
    confirm();
  }

  if (typeof window !== "undefined") {
    events.forEach((ev) => window.addEventListener(ev, handler, opts));
  }

  return () => {
    if (to) clearTimeout(to);
  };
}

/* ---------- UTM / referrer helpers ---------- */

function collectUtm(): {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
} {
  const obj: ReturnType<typeof collectUtm> = {};
  if (typeof window === "undefined") return obj;
  try {
    const params = new URLSearchParams(window.location.search);
    const s = params.get("utm_source");
    const m = params.get("utm_medium");
    const c = params.get("utm_campaign");
    if (s) obj.utm_source = s;
    if (m) obj.utm_medium = m;
    if (c) obj.utm_campaign = c;
    const ref = document.referrer?.trim();
    if (ref && ref.length && !ref.includes(window.location.host))
      obj.referrer = ref;
  } catch {
    /* noop */
  }
  return obj;
}

/* ---------- localStorage fallback + main track() ---------- */

interface StoredEvent {
  name: EventName;
  props?: EventProps;
  at: string;
}

function storeLocally(name: EventName, props?: EventProps) {
  try {
    const key = "bazi-events";
    const existing: StoredEvent[] = JSON.parse(
      localStorage.getItem(key) ?? "[]"
    );
    existing.push({ name, props, at: new Date().toISOString() });
    if (existing.length > 1000) existing.splice(0, existing.length - 1000);
    localStorage.setItem(key, JSON.stringify(existing));
  } catch {
    /* noop */
  }
}

export function track(name: EventName, props?: EventProps): void {
  if (typeof window === "undefined") return;

  const w = window as any;
  const ua = w.navigator?.userAgent ?? "";
  const cn = isCnByBrowserSignals();
  const utm = collectUtm();

  const fullProps: EventProps = {
    ua_bot: isUAABot(ua),
    country_client_tz: cn.tz,
    cn_likely: cn.likely,
    ...utm,
    ...(props || {}),
  };

  // 1) Plausible (if script loaded)
  if (typeof w.plausible === "function") {
    try {
      w.plausible(name, { props: fullProps });
    } catch {
      /* noop */
    }
  }

  // 2) POST to our own Netlify Function (server-side country filter + audit log)
  //    Best-effort / fire-and-forget — ignore failures to avoid blocking UX.
  fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, props: fullProps }),
    keepalive: true,
  }).catch(() => void 0);

  // 3) localStorage (always, so you can inspect on local machine even offline)
  storeLocally(name, fullProps);
}
