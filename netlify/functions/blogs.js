exports.handler = async function(event) {

  var COLLECTION_ID = "6776e2989c1cc508e807b90d";
  var API_TOKEN = process.env.bd4b4f0e1062f2096779d4c462784bf9828d3f3eae021ed8355cf7c591adffc7;

  var corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ""
    };
  }

  try {

    var limit = "3";
    if (event.queryStringParameters && event.queryStringParameters.limit) {
      limit = event.queryStringParameters.limit;
    }

    var response = await fetch(
      "https://api.webflow.com/v2/collections/" +
      COLLECTION_ID +
      "/items/live?limit=" +
      limit,
      {
        headers: {
          "Authorization": "Bearer " + API_TOKEN,
          "accept": "application/json"
        }
      }
    );
    
exports.handler = async () => {
  return {
    statusCode: 200,
    body: "Function working "
  };
};
    var data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };

  } catch (error) {

    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: error.message
      })
    };

  }
};
