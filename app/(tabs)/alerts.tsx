import { Pressable, Switch, Text, View } from "react-native";
import { Screen } from "@/components/screen";
import { useAppStore } from "@/store/use-app-store";

export default function AlertsScreen() {
  const settings = useAppStore((state) => state.alertSettings);
  const updateSetting = useAppStore((state) => state.updateAlertSetting);

  return (
    <Screen>
      <Text className="text-3xl font-black text-white">Alerts</Text>
      <Text className="mt-3 text-sm leading-6 text-mist">
        Tune how aggressive the app should be. The right setup is high-signal and low-noise.
      </Text>

      <View className="mt-8 gap-4">
        <SettingCard
          title="Breaking only"
          description="Restrict pushes to the highest urgency developments."
          value={settings.breakingOnly}
          onValueChange={(value) => updateSetting("breakingOnly", value)}
        />
        <SettingCard
          title="Quiet hours"
          description="Suppress alerts overnight unless an event is marked critical."
          value={settings.quietHoursEnabled}
          onValueChange={(value) => updateSetting("quietHoursEnabled", value)}
        />
        <SettingCard
          title="Daily briefing"
          description="Get a concise wrap-up at 7:00 AM local time."
          value={settings.dailyBriefing}
          onValueChange={(value) => updateSetting("dailyBriefing", value)}
        />
      </View>

      <View className="mt-8 rounded-[24px] border border-line bg-card px-5 py-5">
        <Text className="text-lg font-bold text-white">Smart delivery</Text>
        <Text className="mt-2 text-sm leading-6 text-mist">
          In production, this screen would connect to Expo notifications and a backend routing
          service to respect time windows, premium gating, and topic severity thresholds.
        </Text>
        <Pressable className="mt-5 rounded-2xl bg-ember px-4 py-4">
          <Text className="text-center text-sm font-bold text-abyss">Preview alert schedule</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

type SettingCardProps = {
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

function SettingCard({ title, description, value, onValueChange }: SettingCardProps) {
  return (
    <View className="rounded-[24px] border border-line bg-card px-5 py-5">
      <View className="flex-row items-center justify-between">
        <View className="mr-4 flex-1">
          <Text className="text-base font-bold text-white">{title}</Text>
          <Text className="mt-2 text-sm leading-6 text-mist">{description}</Text>
        </View>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: "#17314a", true: "#ff6b2c" }}
          thumbColor={value ? "#fff7ed" : "#cbd5e1"}
        />
      </View>
    </View>
  );
}
