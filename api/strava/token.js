// Strava OAuth token exchange / refresh.
// The client secret lives only here (Vercel env vars), never in the browser.
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const clientId = process.env.STRAVA_CLIENT_ID;
  const clientSecret = process.env.STRAVA_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return res.status(500).json({ error: 'STRAVA_CLIENT_ID / STRAVA_CLIENT_SECRET env vars not set' });
  }

  const { code, refresh_token } = req.body || {};
  const params = { client_id: clientId, client_secret: clientSecret };
  if (code) Object.assign(params, { code, grant_type: 'authorization_code' });
  else if (refresh_token) Object.assign(params, { refresh_token, grant_type: 'refresh_token' });
  else return res.status(400).json({ error: 'code or refresh_token required' });

  const r = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(params),
  });
  const data = await r.json();
  return res.status(r.status).json(data);
};
