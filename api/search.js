// api/search.js
export default async function handler(req, res) {
  try {
    const token = req.query.token;
    if (!token || token !== process.env.ACCESS_TOKEN) {
      return res.status(403).json({ ok: false, error: "Forbidden - invalid token" });
    }

    const q = (req.query.q || "demo").toString();
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