// pages/api/recipe.js

export default async function handler(req, res) {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Missing `q` parameter' });
    }
  
    const API_BASE = process.env.API_BASE_URL;  
    if (!API_BASE) {
      return res
        .status(500)
        .json({ error: 'API_BASE_URL not configured in .env.local' });
    }
  
    try {
      const backendRes = await fetch(
        `${API_BASE}/api/recipe?q=${encodeURIComponent(q.trim())}`
      );
  
      const data = await backendRes.json();
      res.status(backendRes.status).json(data);
    } catch (err) {
      console.error('Proxy error:', err);
      res.status(500).json({ error: 'Unable to fetch from backend' });
    }
  }
  