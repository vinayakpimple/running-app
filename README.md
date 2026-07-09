# Running App

A simple, fast running tracker that lives in a single HTML file — no accounts, no
server, no build step. Open it in a browser and start logging runs.

## Features

- **Log runs** with date, distance, time, and optional notes — pace is calculated for you
- **Stats at a glance**: this week's distance, totals, average pace, longest run
- **Weekly distance chart** covering the last 12 weeks, with hover/keyboard tooltips
- **Full history** with edit and delete
- **km / mi toggle** — switch units any time, everything converts
- **Light & dark mode** — follows your system setting
- **Private by design** — data is stored in your browser's localStorage only
- **Export / Import** — back up your log as JSON or move it between devices

## Using it

Open `index.html` in any modern browser. That's it.

To use it from your phone, enable GitHub Pages for this repo
(Settings → Pages → Deploy from branch → `main` / root) and the app will be
available at `https://<your-username>.github.io/running-app/`. Data is stored
per browser, so use **Export** / **Import** to move your log between devices.

## Notes

- Distances are stored in kilometres internally; the unit toggle only changes display and input.
- Time accepts `mm:ss` or `h:mm:ss` (a bare number is read as minutes).
- Weeks in the chart start on Monday.
