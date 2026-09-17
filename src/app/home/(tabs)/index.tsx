import { Text, View } from "react-native";

export default function VaultScreen() {
  return (
    <View className="h-full bg-[#FBF8FF]">
      <View className="flex-1 items-center justify-center px-6">
        <View className="h-20 w-20 items-center justify-center rounded-full bg-white shadow-md">
          <Text className="text-3xl font-bold text-[#3730A3]">0</Text>
        </View>
        <Text className="mt-6 text-xl font-bold text-slate-900">
          No documents yet
        </Text>
        <Text className="mt-2 text-center text-base text-slate-600">
          Tap Add to scan or upload your first document.
        </Text>
      </View>
    </View>
  );
}