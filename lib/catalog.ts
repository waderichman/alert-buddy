import { AlertSettings, Offering } from "@/lib/types";

export const defaultAlertSettings: AlertSettings = {
  breakingOnly: true,
  quietHoursEnabled: true,
  dailyBriefing: false
};

export const defaultOfferings: Offering[] = [
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
