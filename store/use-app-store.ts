import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { fetchFeed, fetchTopics } from "@/lib/api";
import { defaultAlertSettings, defaultOfferings } from "@/lib/catalog";
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
  feedError: string | null;
  bootstrap: () => Promise<void>;
  refreshFeed: () => Promise<void>;
  toggleTopic: (topicId: string, nextValue?: boolean) => void;
  updateAlertSetting: <K extends keyof AlertSettings>(key: K, value: AlertSettings[K]) => void;
  activateDemoPro: () => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      topics: [],
      headlines: [],
      selectedTopicIds: [],
      alertSettings: defaultAlertSettings,
      offerings: defaultOfferings,
      subscription: {
        isPro: false,
        entitlementId: null
      },
      hasBootstrapped: false,
      feedStatus: "idle",
      lastUpdatedLabel: "Not loaded",
      dataSourceLabel: "Waiting for backend",
      feedError: null,
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
        set({ feedStatus: "loading", feedError: null });

        try {
          const [topics, feed] = await Promise.all([fetchTopics(), fetchFeed()]);

          set({
            topics,
            headlines: feed.items,
            feedStatus: "success",
            lastUpdatedLabel: feed.lastUpdatedLabel,
            dataSourceLabel: feed.dataSourceLabel,
            feedError: null
          });
        } catch (error) {
          set({
            feedStatus: "error",
            lastUpdatedLabel: "Refresh failed",
            dataSourceLabel: "Backend unavailable",
            feedError: error instanceof Error ? error.message : "Unknown error",
            headlines: []
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
      version: 2,
      storage: createJSONStorage(() => AsyncStorage),
      migrate: (persistedState) => {
        const state = persistedState as AppState;

        return {
          selectedTopicIds: state?.selectedTopicIds ?? [],
          alertSettings: state?.alertSettings ?? defaultAlertSettings,
          subscription: state?.subscription ?? {
            isPro: false,
            entitlementId: null
          }
        };
      },
      partialize: (state) => ({
        selectedTopicIds: state.selectedTopicIds,
        alertSettings: state.alertSettings,
        subscription: state.subscription
      })
    }
  )
);
