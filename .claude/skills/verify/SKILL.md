---
name: verify
description: Build/launch/drive recipe for verifying changes to the running-app web app
---

# Verifying running-app

Static app: `index.html` (all CSS/JS inline) + `sw.js`, `manifest.webmanifest`,
`icons/`. No build step, no dependencies.

## Launch

```bash
cd <repo-root> && python3 -m http.server 8077 &
```

App at `http://127.0.0.1:8077/index.html`. Use http, not `file://` —
localStorage, downloads, and the service worker need it (127.0.0.1 counts as a
secure context, so the SW registers).

## Drive (headless Chromium)

Playwright is installed globally (browsers at `/opt/pw-browsers`):

```bash
NODE_PATH=/opt/node22/lib/node_modules node <driver>.js
```

Create the context with GPS mocking up front:

```js
browser.newContext({ geolocation: {latitude, longitude}, permissions: ['geolocation'] })
```

## Flows worth driving

- Log run via the `<dialog>` modal (`#header-add` / `#fab-add` open it); pace
  math (5 km in 25:00 → 5:00 /km); type chips; effort; PR toast on new bests.
- Tabs: `nav.tabs button[data-view=home|history|record|settings]`.
- GPS recording: `#rec-start`, step `ctx.setGeolocation()` by ~0.0001 lat
  (~11 m) once per second. **The app skips points implying > 15 m/s** (glitch
  filter) and **discards recordings under 10 s moving time or 50 m** — keep the
  simulated run above both. Pause must freeze distance. Finish opens the save
  modal prefilled.
- GPX import: `setInputFiles('#gpx-file', …)`; distance from haversine,
  duration from trkpt timestamps. Bad file → error toast.
- JSON export/import (`#export-btn`/`#import-btn`), CSV (`#csv-btn`) via
  `page.waitForEvent('download')`.
- Legacy data: seed `running-app.runs.v1` with v1-shaped runs
  ({id,date,km,sec,notes}) via `addInitScript` — they must render with default
  type "easy".
- Settings: unit toggle converts history/pace/goal; theme seg sets
  `html[data-theme]`; wipe (`#wipe-btn`) asks confirm twice.
- Charts: weekly bars (`#chart-weekly path.bar`), pace line (runs ≥ 1 km only),
  heatmap (`rect.heat-cell`, dark ramp under dark theme — assert no `#efeeea`
  fills). Tooltips on hover; pace chart also arrow-keys when focused.

## Gotchas

- Delete/wipe use `confirm()` — register a Playwright dialog handler first.
- ResizeObserver redraws charts async — wait ~300 ms after viewport changes.
- The heatmap SVG renders at natural size (`svg.heat-svg`); its tooltip offsets
  are computed from `getBoundingClientRect`, so don't restretch it to 100%.
- Same-date runs keep insertion order in history (stable sort) — don't assume
  the newest logged run is the first row.
- Bars have `pointer-events: none`; the transparent hit rects own all pointer
  events — that's load-bearing, don't "fix" it.
