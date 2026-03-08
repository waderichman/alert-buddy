async function fetchGdeltStories() {
  const query = encodeURIComponent(
    '(geopolitics OR war OR military OR conflict OR sanctions OR coup OR ceasefire)'
  );
  const url =
    `https://api.gdeltproject.org/api/v2/doc/doc?query=${query}` +
    "&mode=ArtList&maxrecords=20&format=json&sort=DateDesc";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`GDELT request failed: ${response.status}`);
  }

  const payload = await response.json();

  return (payload.articles || []).map((article, index) => ({
    id: `gdelt-${index}-${article.seendate || Date.now()}`,
    title: article.title,
    summary: article.socialimage ? `Image-linked coverage from ${article.domain}.` : "New article detected.",
    source: article.domain || "GDELT",
    url: article.url,
    publishedAt: article.seendate
  }));
}

module.exports = { fetchGdeltStories };
