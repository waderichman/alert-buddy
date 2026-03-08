import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  defaultAlertSettings,
  mockHeadlines,
  mockOfferings,
  mockTopics
} from "@/lib/mock-data";
import { fetchFeed, fetchTopics } from "@/lib/api";
import { configureRevenueCat } from "@/lib/revenuecat";
import {
  AlertSettings,
  FeedStatus,
  Headline,
  Offering,
  SubscriptionState,
  Topic
} from "@/lib/types";

type AppState = {
  topics: Topic[];
  headlines: Headline[];
  selectedTopicIds: string[];
  alertSettings: AlertSettings;
  offerings: Offering[];
  subscription: SubscriptionState;
  hasBootstrapped: boolean;
  feedStatus: FeedStatus;
  lastUpdatedLabel: string;
  dataSourceLabel: string;
  bootstrap: () => Promise<void>;
  refreshFeed: () => Promise<void>;
  toggleTopic: (topicId: string, nextValue?: boolean) => void;
  updateAlertSetting: <K extends keyof AlertSettings>(key: K, value: AlertSettings[K]) => void;
  activateDemoPro: () => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      topics: mockTopics,
      headlines: mockHeadlines,
      selectedTopicIds: ["ukraine", "middle-east", "us-politics"],
      alertSettings: defaultAlertSettings,
      offerings: mockOfferings,
      subscription: {
        isPro: false,
        entitlementId: null
      },
      hasBootstrapped: false,
      feedStatus: "idle",
      lastUpdatedLabel: "Using sample data",
      dataSourceLabel: "Sample feed",
      bootstrap: async () => {
        if (get().hasBootstrapped) {
          return;
        }

        await configureRevenueCat();
        await get().refreshFeed();

        set({
          hasBootstrapped: true
        });
      },
      refreshFeed: async () => {
        set({ feedStatus: "loading" });

        try {
          const [topics, feed] = await Promise.all([fetchTopics(), fetchFeed()]);

          set((state) => ({
            topics: topics.length ? topics : state.topics,
            headlines: feed.items.length ? feed.items : state.headlines,
            feedStatus: "success",
            lastUpdatedLabel: feed.lastUpdatedLabel,
            dataSourceLabel: feed.dataSourceLabel
          }));
        } catch {
          set({
            feedStatus: "error",
            lastUpdatedLabel: "Offline fallback",
            dataSourceLabel: "Sample feed"
          });
        }
      },
      toggleTopic: (topicId, nextValue) =>
        set((state) => {
          const isSelected = state.selectedTopicIds.includes(topicId);
          const shouldEnable = nextValue ?? !isSelected;

          return {
            selectedTopicIds: shouldEnable
              ? [...new Set([...state.selectedTopicIds, topicId])]
              : state.selectedTopicIds.filter((id) => id !== topicId)
          };
        }),
      updateAlertSetting: (key, value) =>
        set((state) => ({
          alertSettings: {
            ...state.alertSettings,
            [key]: value
          }
        })),
      activateDemoPro: () =>
        set({
          subscription: {
            isPro: true,
            entitlementId: "pro"
          }
        })
    }),
    {
      name: "alertbuddy-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        selectedTopicIds: state.selectedTopicIds,
        alertSettings: state.alertSettings,
        subscription: state.subscription,
        topics: state.topics,
        headlines: state.headlines,
        lastUpdatedLabel: state.lastUpdatedLabel,
        dataSourceLabel: state.dataSourceLabel
      })
    }
  )
);
