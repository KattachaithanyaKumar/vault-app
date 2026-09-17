import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  return (
    <SafeAreaView className="h-full bg-[#FBF8FF]">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-xl font-bold text-slate-900">Settings</Text>
        <Text className="mt-2 text-center text-base text-slate-600">
          Security and vault preferences — coming soon.
        </Text>
      </View>
    </SafeAreaView>
  );
}