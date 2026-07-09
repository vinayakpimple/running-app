---
name: verify
description: Build/launch/drive recipe for verifying changes to the running-app single-file web app
---

# Verifying running-app

Single-file app: `index.html`. No build step, no dependencies.

## Launch

```bash
cd <repo-root> && python3 -m http.server 8077 &
```

App at `http://127.0.0.1:8077/index.html`. Prefer http over `file://` —
localStorage and download events behave consistently.

## Drive (headless Chromium)

Playwright is installed globally (browsers at `/opt/pw-browsers`):

```bash
NODE_PATH=/opt/node22/lib/node_modules node <driver>.js
```

`require('playwright')` + `chromium.launch()` works as-is.

## Flows worth driving

- Add run: date defaults to today; distance accepts comma decimals ("5,2");
  time parses `mm:ss` / `h:mm:ss` / bare minutes; invalid input shows inline
  `#f-error` and adds no row.
- Pace math: 5 km in 27:30 → 5:30 /km; mi toggle → 3.1 mi at 8:51 /mi.
- Chart: one bar per week (12 Monday-start slots); tooltip on hover/focus of
  `rect.hit`. Bars have `pointer-events: none` so the hit rect owns all
  pointer events — do not "fix" that, it's load-bearing.
- Edit / Delete: Delete uses `confirm()` — register a Playwright dialog
  handler before clicking.
- Export: assert via `page.waitForEvent('download')`. Import: `setInputFiles`
  on the hidden `#import-file`; completion fires an `alert()`.
- Persistence: reload keeps runs and unit (localStorage keys `running-app.*`).
- Themes: use `page.emulateMedia({colorScheme})` on the same page — a new
  browser context starts with empty localStorage.

## Gotchas

- ResizeObserver redraws the chart asynchronously — wait ~300 ms after a
  viewport change before screenshotting.
