// api/search.js
export default async function handler(req, res) {
  try {
    // 1) Token from Authorization header: "Bearer MYSECRET007"
    const auth = req.headers.authorization || ""; // e.g. "Bearer MYSECRET007"
    const tokenFromHeader = auth.split(" ")[1] || "";

    // 2) fallback (optional) — agar chaho toh query param bhi rakh sakte ho temporarily
    const tokenFromQuery = req.query.token || "";

    const token = tokenFromHeader || tokenFromQuery;

    // 3) Compare with env var (Vercel environment variable name: ACCESS_TOKEN)
    if (!token || token !== process.env.ACCESS_TOKEN) {
      return res.status(403).json({ ok: false, error: "Forbidden - invalid token" });
    }

    // 4) Query param (example)
    const q = req.query.q || "demo";
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