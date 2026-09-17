import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";
import { UnlockPinInput } from "../components/UnlockPinInput";
import { useBiometric } from "../hooks/useBiometric";

type UnlockState = "loading" | "locked";

export default function UnlockScreen() {
  const { biometricType, isLoading: biometricLoading } = useBiometric();
  const [state, setState] = useState<UnlockState>("loading");

  useEffect(() => {
    (async () => {
      const onboarded = await SecureStore.getItemAsync("onboarding_complete");

      if (!onboarded) {
        router.replace("/");
        return;
      }

      setState("locked");
    })();
  }, []);

  const handleSuccess = () => {
    router.replace("/home");
  };

  return (
    <SafeAreaView className="h-full bg-[#FBF8FF]">
      {state === "loading" ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="small" color="#3730A3" />
        </View>
      ) : (
        <View className="flex-1 px-6 pt-4">
          <View className="items-center">
            <View className="h-20 w-20 items-center justify-center rounded-full bg-white shadow-md">
              <Ionicons name="lock-closed" size={36} color="#3730A3" />
            </View>

            <Text className="mt-6 text-2xl font-bold text-slate-900">
              Vault is locked
            </Text>

            <Text className="mt-3 text-center text-base leading-6 text-slate-600">
              Enter your PIN or use your fingerprint to unlock your documents.
            </Text>
          </View>

          {biometricLoading ? (
            <View className="mt-8 items-center">
              <ActivityIndicator size="small" color="#3730A3" />
            </View>
          ) : (
            <UnlockPinInput
              biometricType={biometricType}
              onSuccess={handleSuccess}
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
}