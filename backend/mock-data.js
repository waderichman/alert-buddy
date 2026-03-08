const mockHeadlines = [
  {
    id: "1",
    title: "Emergency security council session convened after cross-border strike claims",
    summary:
      "Officials from multiple governments issued overnight statements, while satellite imagery and battlefield claims remain partially unverified.",
    source: "Verified Wire",
    severity: "critical",
    relativeTime: "4m ago",
    publishedAt: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
    regionLabel: "Eastern Europe",
    topics: ["ukraine", "nato"]
  },
  {
    id: "2",
    title: "Naval task force movement prompts new monitoring in the Taiwan Strait",
    summary:
      "Regional defense ministries reported elevated tracking activity as patrol patterns shifted and air-defense units were placed on higher readiness.",
    source: "Maritime Desk",
    severity: "breaking",
    relativeTime: "12m ago",
    publishedAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    regionLabel: "Indo-Pacific",
    topics: ["taiwan", "china"]
  },
  {
    id: "3",
    title: "Lawmakers debate fresh sanctions package tied to strategic export controls",
    summary:
      "The proposal would expand restrictions on dual-use technology and increase compliance penalties for firms that breach licensing rules.",
    source: "Capitol Monitor",
    severity: "developing",
    relativeTime: "26m ago",
    publishedAt: new Date(Date.now() - 26 * 60 * 1000).toISOString(),
    regionLabel: "Washington",
    topics: ["us-politics", "china"]
  },
  {
    id: "4",
    title: "Ceasefire talks stall as negotiators dispute sequencing and monitoring terms",
    summary:
      "Mediators signaled narrow progress on humanitarian access, but core disagreements over enforcement and troop positioning remain unresolved.",
    source: "Global Brief",
    severity: "breaking",
    relativeTime: "39m ago",
    publishedAt: new Date(Date.now() - 39 * 60 * 1000).toISOString(),
    regionLabel: "Middle East",
    topics: ["middle-east"]
  },
  {
    id: "5",
    title: "State-linked cyber campaign suspected after logistics disruption at regional port",
    summary:
      "Security analysts are tracing malware overlap with prior intrusion clusters, though attribution has not been formally confirmed.",
    source: "InfraWatch",
    severity: "developing",
    relativeTime: "51m ago",
    publishedAt: new Date(Date.now() - 51 * 60 * 1000).toISOString(),
    regionLabel: "Black Sea",
    topics: ["cyber", "ukraine"]
  }
];

module.exports = { mockHeadlines };
