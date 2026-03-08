import { Pressable, Text } from "react-native";
import { Topic } from "@/lib/types";

type TopicPillProps = {
  topic: Topic;
  isSelected: boolean;
  onPress: () => void;
};

export function TopicPill({ topic, isSelected, onPress }: TopicPillProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-full border px-4 py-3 ${isSelected ? "border-ember bg-ember/20" : "border-line bg-card"}`}
    >
      <Text className={`text-sm font-semibold ${isSelected ? "text-signal" : "text-white"}`}>
        {topic.label}
      </Text>
    </Pressable>
  );
}
