import { useEffect, useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";

interface UseBiometricResult {
  biometricType: LocalAuthentication.AuthenticationType | null;
  isAvailable: boolean;
  isLoading: boolean;
}

export function useBiometric(): UseBiometricResult {
  const [biometricType, setBiometricType] =
    useState<LocalAuthentication.AuthenticationType | null>(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        if (!hasHardware) {
          setIsAvailable(false);
          return;
        }

        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        if (!isEnrolled) {
          setIsAvailable(false);
          return;
        }

        const types =
          await LocalAuthentication.supportedAuthenticationTypesAsync();
        setBiometricType(types[0] ?? null);
        setIsAvailable(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { biometricType, isAvailable, isLoading };
}