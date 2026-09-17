import { Text, View } from "react-native";

export default function CategoriesScreen() {
  return (
    <View className="h-full bg-[#FBF8FF]">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-xl font-bold text-slate-900">Categories</Text>
        <Text className="mt-2 text-center text-base text-slate-600">
          Manage your document categories — coming soon.
        </Text>
      </View>
    </View>
  );
}