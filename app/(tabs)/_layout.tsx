import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const iconMap = {
  index: "flash",
  topics: "globe-outline",
  alerts: "notifications-outline",
  premium: "diamond-outline"
} as const;

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#ffb36a",
        tabBarInactiveTintColor: "#70859b",
        tabBarStyle: {
          backgroundColor: "#081524",
          borderTopColor: "#17314a",
          height: 68,
          paddingTop: 8
        },
        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name={iconMap[route.name as keyof typeof iconMap]}
            size={size}
            color={color}
          />
        )
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Feed" }} />
      <Tabs.Screen name="topics" options={{ title: "Topics" }} />
      <Tabs.Screen name="alerts" options={{ title: "Alerts" }} />
      <Tabs.Screen name="premium" options={{ title: "Premium" }} />
    </Tabs>
  );
}
