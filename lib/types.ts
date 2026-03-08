export type Severity = "critical" | "breaking" | "developing";

export type Topic = {
  id: string;
  label: string;
  description: string;
};

export type Headline = {
  id: string;
  title: string;
  summary: string;
  source: string;
  url?: string;
  severity: Severity;
  relativeTime: string;
  publishedAt?: string;
  regionLabel: string;
  topics: string[];
};

export type AlertSettings = {
  breakingOnly: boolean;
  quietHoursEnabled: boolean;
  dailyBriefing: boolean;
};

export type Offering = {
  id: string;
  title: string;
  priceLabel: string;
  description: string;
};

export type SubscriptionState = {
  isPro: boolean;
  entitlementId: string | null;
};

export type FeedStatus = "idle" | "loading" | "success" | "error";
