import { Text, View } from "react-native";
import { Headline } from "@/lib/types";
import { severityPalette } from "@/lib/theme";

export function HeadlineCard({ headline }: { headline: Headline }) {
  const palette = severityPalette[headline.severity];

  return (
    <View className="rounded-[24px] border border-line bg-card px-5 py-5">
      <View className="flex-row items-center justify-between">
        <View
          className="rounded-full px-3 py-1"
          style={{ backgroundColor: palette.backgroundColor }}
        >
          <Text className="text-[11px] font-bold uppercase tracking-[1.5px]" style={{ color: palette.color }}>
            {headline.severity}
          </Text>
        </View>
        <Text className="text-xs font-medium text-mist">{headline.relativeTime}</Text>
      </View>

      <Text className="mt-4 text-lg font-bold leading-7 text-white">{headline.title}</Text>
      <Text className="mt-3 text-sm leading-6 text-mist">{headline.summary}</Text>

      <View className="mt-5 flex-row items-center justify-between">
        <Text className="text-xs font-semibold uppercase tracking-[1.5px] text-signal">
          {headline.source}
        </Text>
        <Text className="text-xs font-medium text-mist">{headline.regionLabel}</Text>
      </View>
    </View>
  );
}
