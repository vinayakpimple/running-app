// Exposes the public Strava client id so the static app can start OAuth.
module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const clientId = process.env.STRAVA_CLIENT_ID;
  if (!clientId) return res.status(500).json({ error: 'STRAVA_CLIENT_ID env var not set' });
  return res.status(200).json({ clientId });
};
