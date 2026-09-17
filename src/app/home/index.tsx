import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VaultScreen() {
  return (
    <SafeAreaView className="h-full bg-[#FBF8FF]">
      <View className="flex-row items-center gap-3 p-6">
        <Image
          source={require("../../../assets/images/icon.png")}
          className="h-10 w-10"
          resizeMode="contain"
        />
        <Text className="text-lg font-bold text-slate-900">Vault</Text>
      </View>

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
    </SafeAreaView>
  );
}