import { Pressable, Text, View } from "react-native";
import { Topic } from "@/lib/types";

type TopicRowProps = {
  topic: Topic;
  isSelected: boolean;
  onToggle: () => void;
};

export function TopicRow({ topic, isSelected, onToggle }: TopicRowProps) {
  return (
    <Pressable onPress={onToggle} className="rounded-[24px] border border-line bg-card px-5 py-5">
      <View className="flex-row items-start justify-between">
        <View className="mr-4 flex-1">
          <Text className="text-base font-bold text-white">{topic.label}</Text>
          <Text className="mt-2 text-sm leading-6 text-mist">{topic.description}</Text>
        </View>
        <View
          className={`rounded-full px-3 py-2 ${isSelected ? "bg-ember/20" : "bg-steel"}`}
        >
          <Text className={`text-xs font-bold ${isSelected ? "text-signal" : "text-mist"}`}>
            {isSelected ? "Following" : "Off"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
