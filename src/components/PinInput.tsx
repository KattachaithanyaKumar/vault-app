import { useCallback, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";
import { NumberPad } from "./NumberPad";

const PIN_LENGTH = 6;

type PinMode = "enter" | "confirm";

interface PinInputProps {
  biometricType: LocalAuthentication.AuthenticationType | null;
  onComplete: () => void;
}

export function PinInput({ biometricType, onComplete }: PinInputProps) {
  const [mode, setMode] = useState<PinMode>("enter");
  const [firstPin, setFirstPin] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const persistPin = useCallback(async (pinValue: string) => {
    await SecureStore.setItemAsync("user_pin", pinValue);
  }, []);

  const handleBiometric = useCallback(async () => {
    if (!biometricType) return;

    setIsAuthenticating(true);
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage:
        biometricType === LocalAuthentication.AuthenticationType.FINGERPRINT
          ? "Confirm your fingerprint"
          : "Confirm your face",
      cancelLabel: "Use PIN",
      disableDeviceFallback: true,
    });
    setIsAuthenticating(false);

    if (result.success) {
      await SecureStore.setItemAsync("auth_method", "biometric");
      onComplete();
    }
  }, [biometricType, onComplete]);

  const handleKeyPress = useCallback(
    (key: string) => {
      setError(false);

      if (key === "backspace") {
        if (mode === "enter") {
          setPin((prev) => prev.slice(0, -1));
        } else {
          setFirstPin((prev) => prev.slice(0, -1));
        }
        return;
      }

      const currentPin = mode === "enter" ? pin : firstPin;
      if (currentPin.length >= PIN_LENGTH) return;

      const newPin = currentPin + key;

      if (mode === "enter") {
        setPin(newPin);
      } else {
        setFirstPin(newPin);
      }

      if (newPin.length === PIN_LENGTH) {
        if (mode === "enter") {
          setMode("confirm");
        } else {
          if (newPin === pin) {
            persistPin(newPin);
            SecureStore.setItemAsync("auth_method", "pin");
            onComplete();
          } else {
            setError(true);
            setTimeout(() => {
              setError(false);
              setMode("enter");
              setFirstPin("");
              setPin("");
            }, 800);
          }
        }
      }
    },
    [mode, pin, firstPin, persistPin, onComplete]
  );

  const currentDisplayPin = mode === "enter" ? pin : firstPin;

  const biometricLabel =
    biometricType === LocalAuthentication.AuthenticationType.FINGERPRINT
      ? "Set up Fingerprint"
      : "Set up Face ID";

  return (
    <View className="flex-1">
      {biometricType && (
        <TouchableOpacity
          onPress={handleBiometric}
          disabled={isAuthenticating}
          className="mt-6 flex-row items-center justify-center gap-3 rounded-2xl border border-[#3730A3] bg-white py-4"
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
        <Text className="text-sm text-slate-500">
          {mode === "enter" ? "Or enter a PIN" : "Confirm your PIN"}
        </Text>

        <View className="mt-6 flex-row gap-3">
          {Array.from({ length: PIN_LENGTH }).map((_, i) => (
            <View
              key={i}
              className={`h-4 w-4 rounded-full ${
                error
                  ? "bg-red-500"
                  : i < currentDisplayPin.length
                    ? "bg-[#3730A3]"
                    : "bg-slate-300"
              }`}
            />
          ))}
        </View>
      </View>

      <NumberPad onKeyPress={handleKeyPress} />
    </View>
  );
}