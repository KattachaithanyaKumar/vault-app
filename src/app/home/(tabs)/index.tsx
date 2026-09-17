import { Image, Text, View } from "react-native";

export default function VaultScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-[#FBF8FF]">
      {/* Illustration */}
      <Image
        source={require("../../../../assets/images/vault.png")}
        className="mb-2 h-40 w-40"
        resizeMode="contain"
      />

      {/* Content */}
      <View className="w-full items-center px-12">
        <Text className="text-center text-2xl font-bold leading-8 text-slate-900">
          Your Vault is Empty
        </Text>

        <Text className="mt-3 text-center text-base leading-6 ">
          Your documents, IDs, cards, and subscriptions will be stored securely
          and kept entirely offline on your device.
        </Text>
      </View>
    </View>
  );
}
