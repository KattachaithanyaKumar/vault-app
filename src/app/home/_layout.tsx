import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack
      initialRouteName="(tabs)"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#FBF8FF" },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="settings"
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#FBF8FF" },
          headerTintColor: "#3730A3",
          headerTitleStyle: { fontWeight: "700" },
          title: "Settings",
        }}
      />
    </Stack>
  );
}