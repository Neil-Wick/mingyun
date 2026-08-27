# BaZi Career · MVP (Phase 1)

> Stage 1 MVP — "Free Ba Zi Career Reading" single-page app.
> Tech: Next.js 14 (App Router) + TypeScript + Tailwind CSS + **tyme4ts** (calendar engine).
> Output mode: **Pure Static Export** (`output: "export"` in Next.js) → produces `./out/` folder that can be hosted on **any** static host for $0.
> Analytics: **3-layer validation** (Plausible dashboard + Netlify Functions server-side log + localStorage) so you can distinguish real overseas human UVs from bots / crawlers / CN traffic.

---

## 🚀 Quick start (local)

```bash
# 1. Enter the project folder
cd mvp-bazi-career

# 2. Install dependencies (ignore EACCES errors — use the cache workaround if needed)
npm install

# 3. Start dev server (http://localhost:3000)
npm run dev
```

Open http://localhost:3000 in your browser. Enter a DOB → confirm the Four Pillars / Five Elements / Day Master portrait appear correctly.

---

## ✅ MVP Validation System — How You Know It's Working

Netlify's built-in UV count is **useless** for MVP validation. It counts bots, crawlers, and CDN pings as real visits — and it cannot tell you which country the visitor is from or whether a human actually interacted with the page.

This project ships a **3-layer validation system** that gives you a single clean metric: **valid_visit** per day.

### Event funnel (measured end-to-end)

| # | Event | When it fires | What it proves |
|---|---|---|---|
| 1 | `valid_visit` 🔥 | Page loads + (real human signal OR timeout) AND UA ≠ bot | This is your PRIMARY "effective UV" number |
|   | `invalid_visit` | Bot UA detected | For tuning filters, ignore for business |
| 2 | `form_started` | User first focuses any form field | Interest (clicked/touched a field) |
| 3 | `form_submitted` | Click "Reveal My Career Reading" | Commitment |
| 4 | `result_viewed` | Four Pillars / 5 Elements / Day Master render | Conversion 1: content consumed |
| 5 | `email_entered` 🔥 | Leave email for 2026 forecast | **Stage 2 validation metric** |
| 6 | `feedback_given` | Click thumbs up/down + optional text | Qualitative signal |

All events carry automatic props (from client + server):

```
ua_bot                 → true if UA looks like bot / curl / HeadlessChrome / crawler ...
human_signals_ok       → true if user moved / clicked / scrolled within ~2.5 s
country_client_tz      → browser timezone (client-side CN heuristic)
cn_likely              → true when browser locale/tz looks like Greater China
country_cdn            → [SERVER ONLY] real IP country via Netlify/Cloudflare headers
referrer               → previous URL (reddit / twitter / tiktok direct)
utm_source / medium / campaign → UTM params if you tagged your post links
```

### 3 data destinations (dual writes, pick what you need)

```
Every `track()` call sends to 3 places.
│
├─ 1) Plausible dashboard → High-level overview + country breakdown + funnels
│       (see next section for 2-minute enablement)
│
├─ 2) Netlify Function `/api/events` → Server-side filter + **per-event JSON log**
│       Go to Netlify → Site → Functions → events → Logs to view / export
│       (Free quota: 125k invocations / month, more than enough)
│
└─ 3) localStorage `bazi-events` → Local browser cache, useful for debugging
        In Chrome DevTools → Application → Local Storage → / → bazi-events
```

### Turning on the Plausible dashboard (0$ for <10k pageviews/mo)

1. Open https://plausible.io → Start free trial → Add **a new site** with EXACTLY the Netlify/Cloudflare domain you'll deploy on (e.g. `tiny-melba-5e4afb.netlify.app`).
2. Open [app/layout.tsx](./app/layout.tsx) and set:
   ```ts
   const PLAUSIBLE_ENABLED = true;
   const PLAUSIBLE_DOMAIN  = "tiny-melba-5e4afb.netlify.app"; // your exact domain
   ```
3. Re-run `npm run build` and re-deploy.
4. Back in Plausible, click the site → you will see a live dashboard with:
   - **Unique visitors** (Plausible itself already filters bots)
   - **Goal Events** custom funnels: valid_visit → form_submitted → result_viewed → email_entered
   - **Countries** (confirm traffic is US/UK/AU etc., not CN)
   - **Sources** / **UTM** (see which Reddit/Tweet is actually driving people)

### Checking server-side audit logs (Netlify Functions → `valid` flag)

1. Netlify dashboard → your site → **Functions** → open the `events` function.
2. Click **Log tail** or the **Logs** tab.
3. You will see one single-line JSON per event:
   ```json
   {"at":"2026-08-27T12:34:56.789Z",
    "event":"valid_visit",
    "valid":true,
    "filters":{"ua_bot":false,"country_cdn":"US","is_cn_ip":false,"cn_client_likely":false,"country_client_tz":"America/Los_Angeles"},
    "props":{"human_signals_ok":true,"referrer":"https:\/\/www.reddit.com\/..."}}
   ```
   The `"valid": true/false` field is the TRUTH. `true` = overseas human.
   `country_cdn: "CN"` or `ua_bot: true` events are auto-excluded from your dashboard.

> **Extra: Getting country-level accuracy without Cloudflare**
>
> Netlify free tier already sends `X-Nf-Country` (90%+ coverage on public IPs).
> If you want 100% accurate geo-IP and even better APAC speed, just set your
> Netlify custom domain behind Cloudflare (orange-clouded). Then the function
> automatically reads `CF-IPCountry` header instead, which is Cloudflare-level
> accurate. No code change needed.

---

## 📦 Step 0 — Build the static output (`./out/`) FIRST

> **Rule (learned from hard-fought experience)**: Always produce the deployable artifact folder locally BEFORE any upload / platform action. This keeps "build fails" and "upload fails" two separate problems.

```bash
cd mvp-bazi-career
npm run build
# → Next.js will print:
#   Route (app)               Size
#   ┌ ○ /                     82.5 kB
#   ...
#   ○ (Static)  prerendered as static content
#
# → You should see a new ./out/ folder (~1.5 MB) created at the project root.
```

Sanity-check the output folder before deploying:

```bash
# Serve ./out/ with a tiny static file server to simulate real hosting
npx --yes serve out
# → Open http://localhost:3000 (or whatever port serve prints)
# → Click around the form, submit a birth date, make sure everything still works
```

If the page looks and works good in this local static server → it will work on **any** of the platforms below. 100% of compute happens in the browser, no server required.

---

## ☁️ Step 1 — Pick ONE free static host & deploy

You only need **one** of the three options below. Ordered from **least friction to most flexible**.

> 💡 Common trait of all three: **you can deploy by uploading ./out/ via a web page — no CLI login required** (helps if one platform's login is blocked for you).

---

### ✅ Option 1 — Netlify 🔥 **RECOMMENDED** (supports the /api/events validation function)

Netlify is the recommended host for this project because it runs **Netlify Functions** for free (125k/month calls = our `/api/events` server-side validation filter).

> Note: The simple drag-and-drop Netlify Drop does **not** bundle functions. So please use **Option 1A (connected to Git)** or **Option 1B (CLI deploy)** below. Both are free.

#### 1A. Git-based deploy (best for long-term, ~5 min one-time setup)

1. Push the whole `mvp-bazi-career/` project (including `netlify.toml`!) to a GitHub/GitLab repo.
2. Open Netlify dashboard → **Add new site → Import an existing project**.
3. Select the repo → Deploy settings will be auto-filled from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `out`
   - Functions directory: `netlify/functions`
4. Click Deploy. 30 seconds later you'll get a `https://<name>.netlify.app` URL.

Now every time you push to `main`, Netlify rebuilds static pages + redeploys the function.

#### 1B. CLI deploy (no Git needed, 2 commands)

```bash
# 1) Install Netlify CLI once
npm install -g netlify-cli

# 2) Build the static output first (ALWAYS before deploy)
cd mvp-bazi-career
npm run build

# 3) Deploy (this deploys out/ folder + picks up netlify/functions/events.ts too)
netlify deploy --prod
```

It will open your browser once to authorize your Netlify account → return a public URL.

#### What if I still want drag-and-drop, without functions?

It'll still work as a purely static site — `track()` will fall back to Plausible + localStorage, but you lose the server-side CN-IP filter. Acceptable during Week 1.

---

### ⚡ Option 2 — Cloudflare Pages (best APAC speed / best CDN country accuracy)

Cloudflare Pages is compatible with static export + supports **Pages Functions** too. If you deploy here you can rewrite `netlify/functions/events.ts` to be a Pages Function (identical runtime, just place in `functions/` or `pages/api/`). Cloudflare's `CF-IPCountry` header is more accurate than Netlify's on free tier.

**Web UI upload (no functions / quick static):** same instructions as before (drop `out/`).

---

### 🐙 Option 3 — GitHub Pages

Same as before (purely static). You'll lose server-side CN filtering unless you additionally add a Cloudflare Worker.

---

### 🌐 Comparison table at a glance (with analytics functions support)

| Platform | Time to deploy | Login needed? | APAC speed | Runs `/api/events` filter | Custom domain | Free HTTPS |
|---|---|---|---|---|---|---|
| **Netlify (Git / CLI)** | 2-5 min 🔥 | Yes (free account) | Good | ✅ 🔥 Best-integrated | ✅ | ✅ |
| **Cloudflare Pages** | 5 min | Yes (CF account) | **Best** 🔥 | ✅ via Pages Functions | ✅ | ✅ |
| **GitHub Pages** | 5 min | Yes (GH account) | Average | ❌ needs extra Worker | ✅ | ✅ |
| Netlify Drop (drag & drop) | 30 s ❗ | No ❗ | Good | ❌ (no functions) | ✅ | ✅ |

> If later you want to **switch back to Vercel / a Node-runtime platform** (e.g. for Phase 3+ features like email APIs or server-side PDF generation), you only need to remove the `output: "export"` line in `next.config.mjs` — the code is fully compatible.

---

## ✅ Phase 1 Post-deploy checklist

After you get a public URL, manually verify the 10 items below before starting Reddit / TikTok promotion:

- [ ] Homepage loads correctly (Hero, form, footer all visible)
- [ ] Enter a known historical Ba Zi date (e.g. `1986-05-29` + `12:30` female) → verify it shows:
  - [ ] 4 Pillar cards (Year / Month / Day / Hour — if time was filled)
  - [ ] Stem & Branch characters visible with pinyin / zodiac animal / element colors
  - [ ] Five Elements bar chart with correct Strongest/Weakest badges
  - [ ] Day Master personality paragraph + 3 numbered Career Directions
- [ ] Check **"I don't know my exact birth time"** → Hour Pillar becomes a gray placeholder card
- [ ] Click Feedback widget 👍/👎 + optional text → Thank-you message appears
- [ ] Enter an email in the waitlist CTA box → browser MVP-storage alert appears
- [ ] Mobile width (375px) has **no horizontal scroll**, form/cards/chart wrap cleanly
- [ ] **🔍 Analytics validation — THESE 2 are the point of the whole exercise:**
  - [ ] Load the deployed page as a real visitor (fresh incognito window if possible) → wait 2s → click around → **open Netlify dashboard → your site → Functions → `events` → Logs tail**. You should see 1 line for `valid_visit` with `"valid":true` and `country_cdn: <your country>`.
  - [ ] If you enabled Plausible: open Plausible dashboard for your site → Go to **Goals** tab → You should see `valid_visit` count ≥ 1, with your country NOT "China".
  - [ ] Do a full submission flow (fill form → click **Reveal My Career Reading** → enter email). In Netlify Functions logs confirm you see 4 JSON log lines: `form_started` → `form_submitted` → `result_viewed` → `email_entered` — each with `"valid": true`.

---

## 🧱 Project structure

```
mvp-bazi-career/
├── app/
│   ├── globals.css        ← Tailwind + subtle paper-texture bg gradients
│   ├── layout.tsx         ← Metadata / OG tags / Google fonts (Cormorant Garamond + Inter)
│   └── page.tsx           ← Main page: composes all components + state machine
├── components/
│   ├── HeroSection.tsx
│   ├── InputForm.tsx
│   ├── FourPillarsCard.tsx
│   ├── FiveElementsChart.tsx
│   ├── DayMasterAnalysis.tsx
│   └── FeedbackWidget.tsx
├── lib/
│   ├── bazi.ts            ← ★ Ba Zi engine: tyme4ts SixtyCycleDay / SixtyCycleHour → BaziReading
│   └── constants.ts       ← 10 Stems / 12 Branches / 5 Elements / 10 Day Master profiles
├── types/
│   └── index.ts           ← BaziInput / BaziReading / Pillar / FiveElements types
├── out/                   ← ★ Static deploy artifact. Upload this folder to any host above
├── scripts/
│   └── smoke-bazi.mts     ← (optional) dev-only quick sanity check of the engine
├── next.config.mjs        ← output: "export" + basePath commented out + image unoptimized
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

---

## 🧠 How the Ba Zi engine works (`lib/bazi.ts`)

Uses **tyme4ts v1.5.x** official stable classes:

```
┌────────────────────────────────────────────────────────────────────┐
│ Input: { dateOfBirth, timeOfBirth?, gender }                         │
│                                                                      │
│  if (birth time known)                                               │
│     SolarTime.fromYmdHms(y,m,d,h,m,0)                                │
│         → .getSixtyCycleHour()                                       │
│             → .getYear()  / .getMonth() / .getDay() / .getSixtyCycle()│
│  else                                                                 │
│     SolarDay.fromYmd(y,m,d)                                          │
│         → .getSixtyCycleDay()                                        │
│             → .getYear()  / .getMonth() / .getSixtyCycle()           │
│                                                                      │
│  Each SixtyCycle →                                                    │
│     .getHeavenStem().getName()  → Stem char  (e.g. "甲")             │
│     .getEarthBranch().getName() → Branch char (e.g. "子")            │
│                                                                      │
│  Look up in STEMS / BRANCHES tables →                                │
│     pinyin, yin-yang, element, zodiac animal → build 4 x Pillar      │
│                                                                      │
│  5 Elements count = (stem element + branch element) for each pillar  │
│                                                                      │
│  Day Master = day pillar's stem → look up DAY_MASTER_PROFILES       │
│     → personality paragraph + 3 numbered career directions          │
└────────────────────────────────────────────────────────────────────┘
```

If a future `tyme4ts` upgrade renames methods (e.g. `getSixtyCycleHour` → something else) you only need to edit the ~20 lines inside `calculateBaZi()` in [lib/bazi.ts](./lib/bazi.ts); the rest of the app depends on your typed `BaziReading` interface, not on tyme4ts classes.

---

## 🚪 Next phases (see PRD for full detail)

| Phase | When | What |
|-------|------|------|
| Phase 2 | Week 5-8 | Top 60% results free; bottom 40% → unlock with email → automated email welcome sequence |
| Phase 3 | Week 9-16 | PDF full report + Stripe checkout ($14.9 / $29.9) + 7-day conversion email funnel |
| Phase 4 | Week 17-36 | 50 long-tail SEO articles + TikTok/YouTube/Pinterest matrix → 1000+ daily UV |
| Phase 5 | Month 13-24 | Compatibility reading / Annual forecast / 1:1 consultations / membership → $3,000+/mo |
| Phase 6 | Month 25+ | Kindle ebook + Udemy course + paid community → the #1 English Ba Zi brand |

The complete playbook (gates, kill criteria, risks, decision principles) lives at `../PRD/BaZiCareer_PRD_V1.0.md` in the same workspace.
