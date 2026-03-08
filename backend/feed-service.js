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
  items: [],
  dataSourceLabel: "Waiting for live feed"
};

function toSafeIsoString(value) {
  if (!value) {
    return new Date().toISOString();
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return new Date().toISOString();
  }

  return parsed.toISOString();
}

function normalizeStory(item) {
  const summary = item.summary || "No summary available.";
  const text = `${item.title} ${summary}`;
  const publishedAt = toSafeIsoString(item.publishedAt);

  return {
    id: item.id,
    title: item.title,
    summary,
    source: item.source || "Unknown source",
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
    .filter((item) => item && item.title)
    .map((item) => {
      try {
        return normalizeStory(item);
      } catch {
        return null;
      }
    })
    .filter(Boolean);

  const items = normalized.length ? rankStories(dedupeStories(normalized)).slice(0, 25) : [];
  const successfulSources = settled.filter((result) => result.status === "fulfilled" && result.value.length).length;
  const dataSourceLabel = successfulSources ? "Live feed" : "No live stories";

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
