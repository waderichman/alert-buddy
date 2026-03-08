import { AlertSettings, Headline, Offering, Topic } from "@/lib/types";

export const mockTopics: Topic[] = [
  {
    id: "ukraine",
    label: "Ukraine",
    description: "Frontline developments, aid packages, strikes, and diplomatic shifts."
  },
  {
    id: "middle-east",
    label: "Middle East",
    description: "Regional escalations, proxy activity, ceasefire negotiations, and border tensions."
  },
  {
    id: "taiwan",
    label: "Taiwan Strait",
    description: "Military drills, deterrence signaling, sanctions, and maritime pressure."
  },
  {
    id: "us-politics",
    label: "US Politics",
    description: "Executive moves, Congress, elections, and foreign-policy decisions."
  },
  {
    id: "nato",
    label: "NATO",
    description: "Alliance posture, defense budgets, deployments, and summit outcomes."
  },
  {
    id: "cyber",
    label: "Cyber",
    description: "State-linked breaches, infrastructure incidents, and digital retaliation."
  },
  {
    id: "china",
    label: "China",
    description: "Party messaging, military posture, trade pressure, and external diplomacy."
  }
];

export const mockHeadlines: Headline[] = [
  {
    id: "1",
    title: "Emergency security council session convened after cross-border strike claims",
    summary:
      "Officials from multiple governments issued overnight statements, while satellite imagery and battlefield claims remain partially unverified.",
    source: "Verified Wire",
    severity: "critical",
    relativeTime: "4m ago",
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
    regionLabel: "Black Sea",
    topics: ["cyber", "ukraine"]
  }
];

export const defaultAlertSettings: AlertSettings = {
  breakingOnly: true,
  quietHoursEnabled: true,
  dailyBriefing: false
};

export const mockOfferings: Offering[] = [
  {
    id: "pro-monthly",
    title: "Pro Monthly",
    priceLabel: "$7.99/mo",
    description: "Instant pushes, advanced topic controls, premium briefing cards, and no delays."
  },
  {
    id: "pro-yearly",
    title: "Pro Yearly",
    priceLabel: "$59.99/yr",
    description: "Best value for daily users who want fast alerts and long-term monitoring."
  }
];
