export default async function handler(req, res) {

  const COLLECTION_ID = '6776e2989c1cc508e807b90d';
  const API_TOKEN     = 'bd4b4f0e1062f2096779d4c462784bf9828d3f3eae021ed8355cf7c591adffc7';

  /* ── CORS headers so Webflow can call this ── */
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const limit = req.query.limit || '3';

    const apiRes = await fetch(
      `https://api.webflow.com/v2/collections/${COLLECTION_ID}/items?limit=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'accept': 'application/json',
        }
      }
    );

    if (!apiRes.ok) {
      const err = await apiRes.text();
      return res.status(apiRes.status).json({ error: err });
    }

    const data = await apiRes.json();
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
```

Click **Commit new file** (green button at bottom)

---

## Step 4 — Deploy to Vercel

1. Go to **[vercel.com/new](https://vercel.com/new)**
2. Click **"Import"** next to your `webflow-blog-proxy` repo
3. Leave all settings as default → click **Deploy**
4. Wait ~30 seconds → your URL will be:
```
https://webflow-blog-proxy.vercel.app
```

---

## Step 5 — Test it works

Open this in your browser:
```
https://webflow-blog-proxy.vercel.app/api/blogs?limit=3
