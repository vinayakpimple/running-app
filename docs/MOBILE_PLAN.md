# Mobile Plan — iOS & Android

Goal: an **AI-native, touchless** running app that feels years ahead of Strava,
Nike Run Club, and Runna. This document is the build plan.

## 1. What "touchless" and "AI-native" mean concretely

**Touchless** — the user never logs anything by hand:
- Every run recorded anywhere (Apple Watch, Garmin, phone, treadmill app)
  appears automatically via **HealthKit** (iOS) and **Health Connect**
  (Android). No import buttons, no typing distances. The phone app is a
  *reader* of the user's life, not a data-entry form.
- Auto-detection: if the user starts running with just their phone, the app
  notices (motion + location) and offers one-tap — eventually zero-tap —
  recording.
- The AI talks first. The user doesn't open the app to ask "how am I doing";
  the app tells them each morning what today should look like.

**AI-native** — Claude is the product, not a chat bolt-on:
- **Coach**: a persistent Claude-powered coach with the user's entire training
  history, goals, injury notes, and preferences in context. It plans the week,
  adapts when reality diverges (missed run, hard effort, poor sleep), and
  explains *why* in plain language.
- **Daily brief**: one push notification a day worth reading. "Easy 5K today.
  Tuesday's tempo pushed your 7-day load 18% over your 28-day base — one more
  hard day this week is a risk, not a gain."
- **Voice-first**: post-run, the user talks — "felt heavy, left calf tight" —
  and the coach files it, tags the run, and adjusts the plan.
- **Memory**: the coach remembers ("you said hills bother your knee") across
  months, via structured memory the user can inspect and edit.
- **Race intelligence**: pick a race date; the coach builds and continuously
  rebuilds the plan; predicts finish time from actual fitness (Riegel + trend,
  explained by the coach, not a black box).
- **Injury guard**: acute:chronic workload ratio monitoring with humane,
  non-alarmist coaching language.

**Privacy stance (the moat)**: training data lives on-device. AI calls go
through a stateless proxy; no accounts required for core use. "Your coach
knows everything about your running and nobody else does."

## 2. Stack recommendation

| Option | Verdict |
|---|---|
| **React Native + Expo (recommended)** | One codebase for both phones; mature HealthKit/Health Connect/background-location modules; EAS handles builds/signing/store submission; Claude Code is extremely productive in TS. |
| Native Swift + Kotlin | Best possible polish, 2× the surface area. Adopt *selectively*: the watchOS companion (later phase) must be Swift regardless. |
| Flutter | Fine, but health-integration and Live-Activity ecosystems are weaker than RN's, and we lose TS logic reuse from the web app. |
| Capacitor (wrap current web app) | Fastest to "an app exists," but background ingestion, HealthKit observers, and Live Activities fight the model. Not "years ahead." |

**Decision: Expo (React Native, TypeScript), dev-client builds.** Key modules:
`react-native-health` (HealthKit), `react-native-health-connect`,
`expo-location` + `expo-task-manager` (in-app GPS recording),
`expo-notifications`, `expo-sqlite` (local store), Live Activities & widgets
via Expo config plugins / small native modules. The proven web-app logic
(pace math, weeks, streaks, GPX, polyline) ports as a shared TS package.

**watchOS/Wear OS**: not in v1. HealthKit ingestion makes every existing watch
a data source on day one — that IS the touchless story. Native watch apps
(SwiftUI + WorkoutKit; Compose tile) come in Phase 5 if demand proves out.

## 3. Architecture

```
apps/mobile        Expo app (UI, ingestion, record, notifications)
packages/core      shared TS: domain model, stats, plan engine, GPX/polyline
api/ (Vercel)      stateless AI proxy: /coach (Claude, streaming, tool-use),
                   /brief (scheduled), Strava token exchange (already built)
```

- **Local-first**: SQLite on device is the source of truth. Export/import
  stays JSON-compatible with the web app (people migrate in one tap).
- **AI proxy**: the Claude API key lives server-side only. The proxy is
  stateless — context is assembled on-device and sent per request. Tool-use
  lets the coach read stats and propose plan changes; the app applies them
  locally after user-visible confirmation.
- **Model strategy**: coach conversations on the flagship Claude model
  (quality is the product; the coach must feel *good*, not adequate); daily
  brief + tagging on a fast model (Haiku-class) to keep unit costs down.
- **Sync (later)**: optional E2E-ish sync via iCloud/Drive file sync of the
  export format first; a real backend only when social features demand it.

## 4. Phases

**Phase 0 — Foundations (week 1–2)**
Monorepo, Expo dev-client, EAS CI, TestFlight + Play internal track wired,
design tokens ported from the web app (light/dark), core package extracted
from web app with unit tests. *Exit: hello-world app on both stores' internal
tracks from CI.*

**Phase 1 — Touchless core (week 3–6)**
HealthKit + Health Connect read (workouts, distance, HR), background
observers so new runs appear without opening the app, history/dashboard/
charts at parity with the web app, in-app GPS recording (the web recorder,
rebuilt native with background updates + Live Activity on iOS), web-app data
import. *Exit: a Garmin/Apple-Watch run appears in the app within a minute,
untouched.*

**Phase 2 — The Coach (week 7–10)**
Coach chat (streaming, tool-use over local data), memory store, daily brief
notification pipeline, plan engine (race goal → weekly plan → daily
adaptation), voice notes → structured tags. *Exit: a tester follows a 4-week
5K plan where the coach adapts to at least one missed and one over-cooked
week.*

**Phase 3 — Feel (week 11–13)**
Onboarding ("connect Health, meet your coach, done"), widgets (streak/goal
ring), Live Activity for active runs, haptics, empty states, App Store
screenshots/copy, privacy nutrition labels, Play data-safety forms,
background-location review video for Google. *Exit: store-review-ready builds.*

**Phase 4 — Beta & launch (week 14–16)**
TestFlight beta with the run buddies, feedback loop, crash/ANR triage,
staged Play rollout, App Store submission. *Exit: public listings.*

**Phase 5 — Later**: watchOS app (WorkoutKit), Wear OS tile, group features,
Strava publish-back, sync backend.

Estimates assume ~1 focused builder + Claude Code, part-time. Treat as
sequencing, not promises.

## 5. Verification (how we keep the quality bar)

- Core package: unit tests on all math (pace, load, plan generation).
- E2E: Maestro flows on both platforms in CI (record, ingest-mock, coach
  round-trip with a stubbed proxy).
- Health integrations tested with HealthKit/HC simulators + a physical-device
  checklist per release.
- Coach quality: an eval set of ~50 real training scenarios with expected
  coaching behaviours (rest-day enforcement, ramp warnings, tone), run
  against every prompt/model change.

## 6. Store & compliance checklist

- Apple Developer Program ($99/yr) — **blocked on resolving the Apple-employee
  side-project question properly (Business Conduct approval or a genuinely
  independent owner). Do not ship around this; Android and web are not
  blocked.**
- Google Play ($25 once) + background-location declaration + data-safety form.
- Health data rules (both stores): clear purpose strings, no health data used
  for ads, privacy policy URL (static page in the repo works).
- AI content: coach disclaims medical advice; injury guard language reviewed.

## 7. Running costs (order of magnitude)

- Claude API: the dominant cost. Budget ~$0.05–0.25/user/month at "daily brief
  on a fast model + a few coach chats on the flagship" usage; the Pro tier
  (see business plan) is priced to cover heavy users with margin.
- Vercel hobby → Pro ($20/mo) once functions see real traffic.
- EAS free tier to start; $19/mo when build minutes demand it.

## 8. Top risks

1. **Apple employment policy** — resolve before iOS work begins (see above).
2. **Health-permission review friction** — both stores scrutinise health +
   background location; Phase 3 exists for this.
3. **API cost blowout from a viral free tier** — hard caps on free coach
   messages; brief-only is cheap.
4. **Coach mediocrity** — the eval set is not optional; a bland coach kills
   the "years ahead" claim.
5. **Solo-builder scope creep** — watch apps and social stay out of v1.
