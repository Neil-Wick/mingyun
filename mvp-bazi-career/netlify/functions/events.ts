/**
 * Netlify Function: POST /api/events
 *
 * Receives every client-side analytics event and runs the FINAL server-side
 * validity filters (which client JS cannot fake):
 *
 *   1) UA-based bot filter (server-side again, in case client lied)
 *   2) Country filter via CDN country headers:
 *        - `CF-IPCountry` (if using Cloudflare proxy in front of Netlify)
 *        - `X-Nf-Country` (Netlify's own GeoIP header, free tier supported)
 *        - fallback to `X-Forwarded-For` IP via ipinfo-free lookup is intentionally
 *          skipped to keep the function latency-free
 *   3) Print a single-line JSON log — you can export Netlify Function logs any
 *      time and process locally for audits.
 *
 * Free tier quota: 125k function invocations / month (Netlify free plan) —
 * plenty for MVP phases 1-3.
 */

import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

// Local re-declaration of BOT_PATTERNS to avoid importing the client module
// (the client module uses `window`, which does not exist in Node runtime.)
const BOT_PATTERNS = [
  /bot/i, /crawl/i, /spider/i, /slurp/i, /headless/i, /phantom/i,
  /puppeteer/i, /selenium/i, /webdriver/i, /python-requests/i, /curl/i,
  /wget/i, /axios/i, /node-fetch/i, /go-http-client/i, /java/i, /okhttp/i,
  /scrapy/i, /datadogagent/i, /pingdom/i, /uptimerobot/i, /httpmon/i,
  /feedfetcher/i, /facebookexternalhit/i, /whatsapp/i, /telegrambot/i,
  /discordbot/i, /semrush/i, /ahrefs/i, /mj12bot/i, /yandex/i, /baidu/i, /sogou/i,
];
function isUAABot(ua: string) {
  if (!ua) return true;
  if (ua.length < 20) return true;
  return BOT_PATTERNS.some((re) => re.test(ua));
}

const CN_COUNTRY_CODES = new Set([
  "CN", // Mainland China
  "MO", // Macao (excluded in stage2 later but here for reference)
]);

const VALIDATED_STAGE2_CN_EXCLUDES = new Set(["CN"]); // 如果以后 HK/TW 要算流量，就只保留 CN

interface EventPayload {
  name?: string;
  props?: Record<string, any>;
}

function ipCountryFromHeaders(headers: Record<string, string | undefined>): string {
  const cf = headers["cf-ipcountry"] || headers["CF-IPCountry"];
  if (cf) return cf.toUpperCase();
  const nf = headers["x-nf-country"] || headers["X-Nf-Country"];
  if (nf) return nf.toUpperCase();
  // Netlify also passes this via `X-Nf-Client-Ip-Country` on some edge nodes
  const alt = headers["x-nf-client-ip-country"] || headers["X-Nf-Client-Ip-Country"];
  if (alt) return alt.toUpperCase();
  return "ZZ"; // ZZ = unknown
}

export const handler: Handler = async (
  event: HandlerEvent,
  _context: HandlerContext
) => {
  // CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      } as Record<string, string>,
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let payload: EventPayload = {};
  try {
    payload = event.body ? (JSON.parse(event.body) as EventPayload) : {};
  } catch {
    payload = {};
  }

  const name = payload.name && typeof payload.name === "string" ? payload.name : "unknown";
  const props = payload.props && typeof payload.props === "object" ? payload.props : {};

  const ua = event.headers["user-agent"] || event.headers["User-Agent"] || "";
  const ua_bot = isUAABot(ua);

  const country_cdn = ipCountryFromHeaders(event.headers as any);
  const is_cn_ip = CN_COUNTRY_CODES.has(country_cdn);
  const exclude_cn = VALIDATED_STAGE2_CN_EXCLUDES.has(country_cdn);

  // Validity = NOT bot AND (server-side CN not excluded)
  const valid = !ua_bot && !exclude_cn;

  // ------------- single-line JSON logs for Netlify Functions dashboard -------------
  const logLine = JSON.stringify({
    at: new Date().toISOString(),
    event: name,
    valid,
    filters: {
      ua_bot,
      country_cdn,     // ZZ when header unavailable
      is_cn_ip,        // true when CDN header === CN
      cn_client_likely: !!props.cn_likely,   // fallback heuristic from browser (TZ+locale)
      country_client_tz: props.country_client_tz,
    },
    props,
    ua_len: ua.length,
  });

  // Using console.log so Netlify stores it as part of function invocation logs
  // (Netlify free plan keeps these for 24h in the dashboard UI; upgrade for more.)
  console.log("[BAZI]", logLine);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store, private",
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      ok: true,
      v: 1,
      valid,
      country_cdn,
      ua_bot,
    }),
  };
};
