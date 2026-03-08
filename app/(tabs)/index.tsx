import { FlatList, Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAppStore } from "@/store/use-app-store";
import { HeadlineCard } from "@/components/headline-card";
import { Screen } from "@/components/screen";
import { TopicPill } from "@/components/topic-pill";

export default function FeedScreen() {
  const headlines = useAppStore((state) => state.headlines);
  const selectedTopicIds = useAppStore((state) => state.selectedTopicIds);
  const toggleTopic = useAppStore((state) => state.toggleTopic);
  const topics = useAppStore((state) => state.topics);
  const refreshFeed = useAppStore((state) => state.refreshFeed);
  const feedStatus = useAppStore((state) => state.feedStatus);
  const lastUpdatedLabel = useAppStore((state) => state.lastUpdatedLabel);
  const dataSourceLabel = useAppStore((state) => state.dataSourceLabel);

  const filteredHeadlines = !selectedTopicIds.length
    ? headlines
    : headlines.filter((headline) =>
        headline.topics.some((topicId) => selectedTopicIds.includes(topicId))
      );

  const topTopics = topics.slice(0, 6);

  return (
    <Screen>
      <LinearGradient
        colors={["#13263a", "#081524"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-[28px] border border-line px-5 pb-5 pt-6"
      >
        <Text className="text-xs font-semibold uppercase tracking-[2px] text-signal">
          Live watch
        </Text>
        <Text className="mt-3 text-3xl font-black text-white">
          High-signal geopolitical alerts.
        </Text>
        <Text className="mt-3 text-sm leading-6 text-mist">
          Fast headlines, source labels, and severity tiers for conflicts, military moves,
          sanctions, elections, and diplomatic shocks.
        </Text>
        <View className="mt-5 flex-row items-center gap-3">
          <View className="rounded-full bg-white/10 px-3 py-2">
            <Text className="text-xs font-semibold text-white">
              {filteredHeadlines.length} active items
            </Text>
          </View>
          <View className="rounded-full bg-ember/20 px-3 py-2">
            <Text className="text-xs font-semibold text-signal">{dataSourceLabel}</Text>
          </View>
        </View>
      </LinearGradient>

      <View className="mt-6">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-lg font-bold text-white">Topic filter</Text>
          <Pressable onPress={() => topics.forEach((topic) => toggleTopic(topic.id, false))}>
            <Text className="text-sm font-semibold text-signal">Clear</Text>
          </Pressable>
        </View>
        <FlatList
          data={topTopics}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item }) => (
            <TopicPill
              topic={item}
              isSelected={selectedTopicIds.includes(item.id)}
              onPress={() => toggleTopic(item.id)}
            />
          )}
        />
      </View>

      <View className="mb-3 mt-8 flex-row items-center justify-between">
        <Text className="text-lg font-bold text-white">Breaking feed</Text>
        <Pressable onPress={() => void refreshFeed()}>
          <Text className="text-sm font-medium text-mist">
            {feedStatus === "loading" ? "Refreshing..." : lastUpdatedLabel}
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={filteredHeadlines}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item }) => <HeadlineCard headline={item} />}
        ListEmptyComponent={
          <View className="rounded-[24px] border border-dashed border-line px-5 py-8">
            <Text className="text-base font-semibold text-white">No items match this filter.</Text>
            <Text className="mt-2 text-sm leading-6 text-mist">
              Expand your topic set or reset the filter to view the full stream.
            </Text>
          </View>
        }
      />
    </Screen>
  );
}
