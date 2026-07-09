# Running App

A private, offline-first running tracker that runs entirely in your browser —
no accounts, no server, no tracking. Installable as an app on your phone.

**Live:** https://vinayakpimple.github.io/running-app/

## Features

- **Log runs** in seconds — date, distance, time, run type (easy / tempo / long /
  intervals / race), effort, notes. Pace is computed for you.
- **Record with GPS** — live distance, time, and pace on your phone, with your
  route traced as a private shape (no map service, nothing leaves the device).
- **Weekly goal ring** with percent progress, plus a week streak counter.
- **Insights** — automatic week-over-week comparison, with a gentle warning when
  volume jumps too fast.
- **Charts** — weekly distance bars, pace trend per run, and a 16-week
  consistency heatmap. All with hover/keyboard tooltips, light and dark.
- **Personal records** — longest run, fastest pace, biggest week; new PRs are
  celebrated when you log them.
- **History** with month grouping and totals, search, and type filters.
- **GPX import** — bring in runs from Strava, Garmin, or any GPS watch export.
- **Backup** — JSON export/import (works across devices) and CSV export.
- **Installable PWA** — add to your home screen and it works offline.
- **km / mi**, manual light/dark/system theme, weekly goal — all configurable.

## Using it

Open the live URL above, or open `index.html` locally in any modern browser.

**Install on your phone:** open the live URL, then
- iPhone (Safari): Share → **Add to Home Screen**
- Android (Chrome): menu → **Install app**

GPS recording needs HTTPS and location permission, so use the live URL (not a
downloaded file) for recording.

## Data & privacy

All data lives in your browser's localStorage. Nothing is uploaded anywhere.
That also means data is **per browser, per device** — use Settings → Export /
Import to back up or move your log.

## Notes

- Distances are stored in kilometres internally; the unit toggle only changes display and input.
- Time accepts `mm:ss` or `h:mm:ss` (a bare number is read as minutes).
- Weeks start on Monday.
- The site auto-deploys to GitHub Pages from `main` via `.github/workflows/pages.yml`.
