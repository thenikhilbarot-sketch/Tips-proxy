// api/search.js
export default async function handler(req, res) {
  try {
    // 1) token check (query param)
    const token = req.query.token;
    if (!token || token !== process.env.ACCESS_TOKEN) {
      return res.status(403).json({ ok: false, error: "Forbidden - invalid token" });
    }

    // 2) query parameter
    const q = (req.query.q || "demo").toString();

    // 3) demo external API (replace with your real API if ready)
    const url = q === "demo"
      ? "https://jsonplaceholder.typicode.com/posts/1"
      : "https://jsonplaceholder.typicode.com/posts/2";

    const r = await fetch(url);
    const data = await r.json();

    return res.status(200).json({ ok: true, query: q, data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: String(err) });
  }
}
