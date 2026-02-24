exports.handler = async function(event) {

  const COLLECTION_ID = '6776e2989c1cc508e807b90d';
  const API_TOKEN     = 'bd4b4f0e1062f2096779d4c462784bf9828d3f3eae021ed8355cf7c591adffc7';

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  try {
    const limit = event.queryStringParameters?.limit || '3';

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
      return {
        statusCode: apiRes.status,
        headers: corsHeaders,
        body: JSON.stringify({ error: err })
      };
    }

    const data = await apiRes.json();
    return {
      statusCode: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: err.message })
    };
  }
};
```

Click **"Commit changes"**

---

## Step 4 — Test it

Once Netlify deploys (auto-deploys when you commit), your URL will be:
```
https://webflowblogs.netlify.app/.netlify/functions/blogs?limit=3
