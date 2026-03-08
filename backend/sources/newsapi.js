const NEWS_API_KEY = process.env.NEWS_API_KEY;

async function fetchNewsApiStories() {
  if (!NEWS_API_KEY) {
    return [];
  }

  const query = encodeURIComponent(
    '(geopolitics OR war OR military OR conflict OR sanctions OR "foreign policy") AND NOT (sports OR celebrity)'
  );
  const url =
    `https://newsapi.org/v2/everything?q=${query}` +
    "&language=en&sortBy=publishedAt&pageSize=20";

  const response = await fetch(url, {
    headers: {
      "X-Api-Key": NEWS_API_KEY
    }
  });

  if (!response.ok) {
    throw new Error(`NewsAPI request failed: ${response.status}`);
  }

  const payload = await response.json();

  return (payload.articles || []).map((article, index) => ({
    id: `newsapi-${index}-${article.publishedAt || Date.now()}`,
    title: article.title,
    summary: article.description || article.content || "No summary available.",
    source: article.source?.name || "NewsAPI",
    url: article.url,
    publishedAt: article.publishedAt
  }));
}

module.exports = { fetchNewsApiStories };
