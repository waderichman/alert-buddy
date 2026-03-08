function toRelativeTime(isoString) {
  if (!isoString) {
    return "Unknown";
  }

  const diffMs = Date.now() - new Date(isoString).getTime();
  const diffMinutes = Math.max(1, Math.round(diffMs / 60000));

  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  }

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }

  const diffDays = Math.round(diffHours / 24);
  return `${diffDays}d ago`;
}

function inferTopics(text) {
  const haystack = text.toLowerCase();
  const matches = [];

  const rules = [
    ["ukraine", ["ukraine", "kyiv", "kremlin", "moscow", "donbas", "zelensky"]],
    ["middle-east", ["gaza", "israel", "iran", "syria", "lebanon", "hamas", "hezbollah"]],
    ["taiwan", ["taiwan", "taipei", "strait"]],
    ["us-politics", ["white house", "congress", "senate", "election", "trump", "biden"]],
    ["nato", ["nato", "alliance", "european defense"]],
    ["cyber", ["cyber", "hack", "malware", "breach", "ransomware"]],
    ["china", ["china", "beijing", "xi", "pla", "south china sea"]]
  ];

  for (const [topicId, keywords] of rules) {
    if (keywords.some((keyword) => haystack.includes(keyword))) {
      matches.push(topicId);
    }
  }

  return matches.length ? matches : ["us-politics"];
}

function inferRegion(text) {
  const haystack = text.toLowerCase();
  if (haystack.includes("ukraine") || haystack.includes("moscow")) return "Eastern Europe";
  if (haystack.includes("taiwan") || haystack.includes("beijing")) return "Indo-Pacific";
  if (haystack.includes("gaza") || haystack.includes("iran") || haystack.includes("israel")) {
    return "Middle East";
  }
  if (haystack.includes("cyber") || haystack.includes("hack")) return "Cyber domain";
  if (haystack.includes("congress") || haystack.includes("white house")) return "Washington";
  return "Global";
}

function inferSeverity(text) {
  const haystack = text.toLowerCase();

  if (
    ["missile", "invasion", "explosion", "killed", "attack", "emergency", "strike"].some((term) =>
      haystack.includes(term)
    )
  ) {
    return "critical";
  }

  if (
    ["sanction", "deploy", "warn", "drill", "ceasefire", "military", "troops"].some((term) =>
      haystack.includes(term)
    )
  ) {
    return "breaking";
  }

  return "developing";
}

function dedupeStories(items) {
  const seen = new Set();

  return items.filter((item) => {
    const key = item.url || item.title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

module.exports = {
  dedupeStories,
  inferRegion,
  inferSeverity,
  inferTopics,
  toRelativeTime
};
