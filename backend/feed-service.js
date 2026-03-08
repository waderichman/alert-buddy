const { mockHeadlines } = require("./mock-data");
const { fetchNewsApiStories } = require("./sources/newsapi");
const { fetchGdeltStories } = require("./sources/gdelt");
const {
  dedupeStories,
  inferRegion,
  inferSeverity,
  inferTopics,
  toRelativeTime
} = require("./utils");

let cache = {
  fetchedAt: 0,
  items: mockHeadlines,
  dataSourceLabel: "Sample feed"
};

function normalizeStory(item) {
  const summary = item.summary || "No summary available.";
  const text = `${item.title} ${summary}`;
  const publishedAt = item.publishedAt ? new Date(item.publishedAt).toISOString() : new Date().toISOString();

  return {
    id: item.id,
    title: item.title,
    summary,
    source: item.source,
    url: item.url,
    publishedAt,
    relativeTime: toRelativeTime(publishedAt),
    severity: inferSeverity(text),
    regionLabel: inferRegion(text),
    topics: inferTopics(text)
  };
}

function rankStories(items) {
  const severityScore = {
    critical: 3,
    breaking: 2,
    developing: 1
  };

  return items.sort((left, right) => {
    const severityDelta = severityScore[right.severity] - severityScore[left.severity];
    if (severityDelta !== 0) {
      return severityDelta;
    }

    return new Date(right.publishedAt || 0).getTime() - new Date(left.publishedAt || 0).getTime();
  });
}

async function refreshFeed(force = false) {
  if (!force && Date.now() - cache.fetchedAt < 120000) {
    return {
      items: cache.items,
      dataSourceLabel: cache.dataSourceLabel,
      lastUpdatedLabel: `Updated ${toRelativeTime(new Date(cache.fetchedAt).toISOString())}`
    };
  }

  const settled = await Promise.allSettled([fetchNewsApiStories(), fetchGdeltStories()]);
  const loaded = settled
    .filter((result) => result.status === "fulfilled")
    .flatMap((result) => result.value);

  const normalized = loaded
    .filter((item) => item.title)
    .map(normalizeStory);

  const items = normalized.length ? rankStories(dedupeStories(normalized)).slice(0, 25) : mockHeadlines;
  const successfulSources = settled.filter((result) => result.status === "fulfilled" && result.value.length).length;
  const dataSourceLabel = successfulSources ? "Live feed" : "Sample feed";

  cache = {
    fetchedAt: Date.now(),
    items,
    dataSourceLabel
  };

  return {
    items,
    dataSourceLabel,
    lastUpdatedLabel: `Updated ${toRelativeTime(new Date(cache.fetchedAt).toISOString())}`
  };
}

module.exports = { refreshFeed };
