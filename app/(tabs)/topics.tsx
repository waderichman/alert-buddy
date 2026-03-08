import { FlatList, Text, View } from "react-native";
import { Screen } from "@/components/screen";
import { TopicRow } from "@/components/topic-row";
import { useAppStore } from "@/store/use-app-store";

export default function TopicsScreen() {
  const topics = useAppStore((state) => state.topics);
  const selectedTopicIds = useAppStore((state) => state.selectedTopicIds);
  const toggleTopic = useAppStore((state) => state.toggleTopic);

  return (
    <Screen>
      <Text className="text-3xl font-black text-white">Topics</Text>
      <Text className="mt-3 text-sm leading-6 text-mist">
        Choose the theaters and political lanes you want to monitor. Your selection shapes both
        the feed and future alert routing.
      </Text>

      <View className="mt-6 rounded-[24px] border border-line bg-card px-4 py-4">
        <Text className="text-sm font-semibold uppercase tracking-[2px] text-signal">
          Active coverage
        </Text>
        <Text className="mt-3 text-2xl font-black text-white">{selectedTopicIds.length}</Text>
        <Text className="mt-1 text-sm text-mist">topics selected</Text>
      </View>

      <FlatList
        className="mt-6"
        data={topics}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item }) => (
          <TopicRow
            topic={item}
            isSelected={selectedTopicIds.includes(item.id)}
            onToggle={() => toggleTopic(item.id)}
          />
        )}
      />
    </Screen>
  );
}
