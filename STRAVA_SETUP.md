# Strava sync — one-time setup (~5 minutes)

> **Heads-up:** Strava now requires the account that *creates* the API app to
> have a paid Strava subscription. Your friends who connect never need one —
> only the app owner. Without a subscription the form at
> strava.com/settings/api stays locked, and the Connect button in the app
> stays dormant (GPX import keeps working for everyone regardless).

The app is static; Strava's OAuth needs one tiny server-side function to keep
the client secret private. This repo already contains it (`api/strava/`) — you
just deploy the repo to Vercel and create a Strava API app.

## 1. Deploy to Vercel

1. Go to https://vercel.com/new and import the `running-app` GitHub repo.
2. No build settings needed — deploy as-is. You'll get a URL like
   `https://running-app-abc123.vercel.app` (you can rename the project for a
   nicer one). This serves the app **and** the token function.

## 2. Create the Strava API app

1. Go to https://www.strava.com/settings/api (log in with your Strava account).
2. Fill in:
   - **Application name**: Running Log (anything works)
   - **Website**: your Vercel URL
   - **Authorization Callback Domain**: your Vercel domain, e.g.
     `running-app-abc123.vercel.app` — domain only, no `https://`, no path.
3. Save — you now have a **Client ID** and **Client Secret**.

> Callback domain must match the site people open the app from. If your
> friends use the GitHub Pages URL instead, put `<username>.github.io` here —
> the Vercel deployment then only serves the token function.

## 3. Give Vercel the credentials

1. In your Vercel project: Settings → Environment Variables. Add:
   - `STRAVA_CLIENT_ID` = your client id
   - `STRAVA_CLIENT_SECRET` = your client secret
2. Redeploy (Deployments → ⋯ → Redeploy) so the functions pick them up.

## 4. Connect

- **On the Vercel URL**: open the app → Settings → Connect Strava. Done — the
  app finds the function on the same origin automatically.
- **On GitHub Pages**: in the app's Settings, paste your Vercel URL into the
  "Strava proxy" field first, then Connect.

Each person authorizes their own Strava account; tokens are stored only in
their browser. The function never stores anything — it just swaps codes for
tokens.

## What syncs

Runs (including trail and treadmill runs) — distance, time, date, name, run
type (race / long / workout mapping), and the route shape. Rides and other
sports are ignored. Re-syncing never duplicates: each Strava activity is
imported once.
