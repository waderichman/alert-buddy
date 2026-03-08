import { Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Screen } from "@/components/screen";
import { useAppStore } from "@/store/use-app-store";

export default function PremiumScreen() {
  const offerings = useAppStore((state) => state.offerings);
  const activateDemoPro = useAppStore((state) => state.activateDemoPro);
  const subscription = useAppStore((state) => state.subscription);

  return (
    <Screen>
      <LinearGradient
        colors={["#2d1509", "#0f1722"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-[28px] border border-[#5a2e17] px-5 pb-6 pt-6"
      >
        <Text className="text-xs font-semibold uppercase tracking-[2px] text-signal">
          Premium
        </Text>
        <Text className="mt-3 text-3xl font-black text-white">Upgrade for the fast lane.</Text>
        <Text className="mt-3 text-sm leading-6 text-mist">
          Charge for speed, focus, and control. Generic headlines are free. Precision is not.
        </Text>
      </LinearGradient>

      <View className="mt-6 rounded-[24px] border border-line bg-card px-5 py-5">
        <Text className="text-lg font-bold text-white">
          {subscription.isPro ? "Pro is active" : "Free plan"}
        </Text>
        <Text className="mt-2 text-sm leading-6 text-mist">
          {subscription.isPro
            ? "Instant pushes, premium filters, watchlists, and briefing history are unlocked."
            : "Upgrade to unlock instant alerts, advanced filters, and custom monitoring lists."}
        </Text>
      </View>

      <View className="mt-6 gap-3">
        {offerings.map((offering) => (
          <View
            key={offering.id}
            className="rounded-[24px] border border-line bg-card px-5 py-5"
          >
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-bold text-white">{offering.title}</Text>
              <Text className="text-sm font-semibold text-signal">{offering.priceLabel}</Text>
            </View>
            <Text className="mt-2 text-sm leading-6 text-mist">{offering.description}</Text>
          </View>
        ))}
      </View>

      <View className="mt-8 gap-3">
        <Feature text="Instant breaking alerts instead of delayed free-tier pushes" />
        <Feature text="Custom watchlists for regions, leaders, and military theaters" />
        <Feature text="Priority-only mode to avoid alert fatigue" />
        <Feature text="RevenueCat-ready entitlement layer in the codebase" />
      </View>

      <Pressable onPress={activateDemoPro} className="mt-8 rounded-2xl bg-ember px-4 py-4">
        <Text className="text-center text-base font-black text-abyss">
          {subscription.isPro ? "Refresh Demo Entitlement" : "Unlock Demo Pro"}
        </Text>
      </Pressable>
    </Screen>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <View className="rounded-2xl border border-line bg-card px-4 py-4">
      <Text className="text-sm leading-6 text-white">{text}</Text>
    </View>
  );
}
