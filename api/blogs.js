exports.handler = async function(event) {

  const COLLECTION_ID = '6776e2989c1cc508e807b90d';
  const API_TOKEN     = process.env.WEBFLOW_TOKEN; // ✅ Secure

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
      `https://api.webflow.com/v2/collections/${COLLECTION_ID}/items/live?limit=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'accept': 'application/json',
        }
      }
    );

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
