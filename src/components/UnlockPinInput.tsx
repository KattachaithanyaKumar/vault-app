import { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";
import { NumberPad } from "./NumberPad";

const PIN_LENGTH = 6;

interface UnlockPinInputProps {
  biometricType: LocalAuthentication.AuthenticationType | null;
  onSuccess: () => void;
}

export function UnlockPinInput({
  biometricType,
  onSuccess,
}: UnlockPinInputProps) {
  const [storedPin, setStoredPin] = useState<string | null>(null);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const loadStoredPin = useCallback(async () => {
    const value = await SecureStore.getItemAsync("user_pin");
    setStoredPin(value);
    setPin("");
    setError(false);
  }, []);

  useEffect(() => {
    loadStoredPin();
  }, [loadStoredPin]);

  const handleBiometric = useCallback(async () => {
    if (!biometricType || isAuthenticating) return;

    setIsAuthenticating(true);
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage:
        biometricType === LocalAuthentication.AuthenticationType.FINGERPRINT
          ? "Unlock your vault"
          : "Unlock your vault",
      cancelLabel: "Enter PIN",
      disableDeviceFallback: true,
    });
    setIsAuthenticating(false);

    if (result.success) {
      onSuccess();
    }
  }, [biometricType, isAuthenticating, onSuccess]);

  const handleKeyPress = useCallback(
    (key: string) => {
      setError(false);

      if (key === "backspace") {
        setPin((prev) => prev.slice(0, -1));
        return;
      }

      if (pin.length >= PIN_LENGTH) return;

      const next = pin + key;
      setPin(next);

      if (next.length === PIN_LENGTH) {
        if (next === storedPin) {
          onSuccess();
        } else {
          setError(true);
          setTimeout(() => {
            setError(false);
            setPin("");
          }, 800);
        }
      }
    },
    [pin, storedPin, onSuccess]
  );

  const biometricLabel =
    biometricType === LocalAuthentication.AuthenticationType.FINGERPRINT
      ? "Use Fingerprint"
      : "Use Face ID";

  return (
    <View className="flex-1">
      {biometricType && (
        <TouchableOpacity
          onPress={handleBiometric}
          disabled={isAuthenticating}
          className="mt-2 flex-row items-center justify-center gap-3 rounded-2xl border border-[#3730A3] bg-white py-4"
        >
          <Ionicons
            name={
              biometricType === LocalAuthentication.AuthenticationType.FINGERPRINT
                ? "finger-print"
                : "scan"
            }
            size={24}
            color="#3730A3"
          />
          <Text className="font-semibold text-[#3730A3]">
            {isAuthenticating ? "Checking…" : biometricLabel}
          </Text>
        </TouchableOpacity>
      )}

      <View className="mt-6 items-center">
        <Text className="text-sm text-slate-500">Enter your PIN</Text>

        <View className="mt-6 flex-row gap-3">
          {Array.from({ length: PIN_LENGTH }).map((_, i) => (
            <View
              key={i}
              className={`h-4 w-4 rounded-full ${
                error
                  ? "bg-red-500"
                  : i < pin.length
                    ? "bg-[#3730A3]"
                    : "bg-slate-300"
              }`}
            />
          ))}
        </View>
      </View>

      <NumberPad onKeyPress={(key) => handleKeyPress(key)} />
    </View>
  );
}