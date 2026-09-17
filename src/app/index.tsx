import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PinInput } from "../components/PinInput";
import { useToast } from "../components/Toast";
import { useBiometric } from "../hooks/useBiometric";

type FeatureName =
  | "global"
  | "lock"
  | "eye-invisible"
  | "scan"
  | "edit"
  | "clock-circle"
  | "export"
  | "close-circle"
  | "delete";

type FeatureItem = {
  name: FeatureName;
  title: string;
  description: string;
};

const FEATURES_STEP1: FeatureItem[] = [
  {
    name: "global",
    title: "Works Completely Offline",
    description: "No internet needed — your documents never leave your phone",
  },
  {
    name: "lock",
    title: "Locked Behind Your Fingerprint or PIN",
    description: "Only your biometrics can unlock your vault — nothing else",
  },
  {
    name: "eye-invisible",
    title: "We Never See or Track Your Data",
    description:
      "No analytics, no accounts, no one but you can access your vault",
  },
];

const FEATURES_STEP2: FeatureItem[] = [
  {
    name: "scan",
    title: "Scan or Upload Instantly",
    description: "Snap a photo or pick a file — no scanner needed",
  },
  {
    name: "edit",
    title: "You Decide What It Is",
    description:
      "Passport, gym membership, insurance policy — type anything, nothing is locked to a preset list",
  },
  {
    name: "clock-circle",
    title: "Get Reminded Before It Expires",
    description: "Set a reminder once, and Vault tells you before it lapses",
  },
];

const FEATURES_STEP3: FeatureItem[] = [
  {
    name: "export",
    title: "Export Anytime",
    description: "Save any document back out as a file whenever you need it",
  },
  {
    name: "close-circle",
    title: "No Account, No Login",
    description: "Nothing here is tied to your name, email, or phone number",
  },
  {
    name: "delete",
    title: "Delete for Good, On Your Terms",
    description:
      "Items go to Trash first, then get erased permanently when you're ready",
  },
];

function FeatureList({ features }: { features: readonly FeatureItem[] }) {
  return (
    <View>
      {features.map((feature, index) => (
        <View
          key={index}
          className="mt-6 flex-row items-center gap-4 rounded-lg bg-white p-2 shadow-md"
        >
          <View className="h-10 w-10 items-center justify-center rounded-full">
            <AntDesign name={feature.name} size={20} color="#3730A3" />
          </View>

          <View className="flex-1">
            <Text className="text-base font-semibold text-slate-900">
              {feature.title}
            </Text>

            <Text className="mt-1 text-sm leading-6 text-slate-600">
              {feature.description}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

export default function App() {
  const [step, setStep] = useState<number>(0);
  const [isReady, setIsReady] = useState(false);
  const { biometricType, isAvailable: biometricsAvailable } = useBiometric();

  const { showToast } = useToast();

  const totalSteps = 4;

  const completeOnboarding = async () => {
    await SecureStore.setItemAsync("onboarding_complete", "true");
    showToast("Onboarding complete — welcome!");
    router.replace("/home/index");
  };

  useEffect(() => {
    (async () => {
      const onboarded = await SecureStore.getItemAsync("onboarding_complete");

      if (onboarded) {
        router.replace("/unlock");
        return;
      }

      setIsReady(true);
    })();
  }, []);

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep((prev) => prev + 1);
    } else {
      completeOnboarding();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const isSecurityStep = step === totalSteps - 1;

  return (
    <SafeAreaView className="h-full bg-[#FBF8FF]">
      {!isReady ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="small" color="#3730A3" />
        </View>
      ) : (
        <>
          {/* Header */}
          <View className="flex-row justify-between">
            <View className="flex-row items-center gap-3 p-6">
              <Image
                source={require("../../assets/images/icon.png")}
                className="h-10 w-10"
                resizeMode="contain"
              />
              <Text className="text-lg font-bold">Vault</Text>
            </View>

            <View className="flex-row items-center gap-2 px-4 pb-2">
              <Text className="text-sm font-medium text-slate-600">
                0{step + 1} / 0{totalSteps}
              </Text>

              <View className="flex-row items-center gap-2">
                {Array.from({ length: totalSteps }).map((_, index) => (
                  <View
                    key={index}
                    className={[
                      "h-2.5 w-2.5 rounded-full",
                      index === step ? "bg-[#3730A3]" : "bg-[#C8C4D5]",
                    ].join(" ")}
                  />
                ))}
              </View>
            </View>
          </View>

          {/* Content */}
          {isSecurityStep ? (
            <View className="flex-1 px-6 pt-4">
              <View>
                <Text className="text-2xl font-bold text-slate-900">
                  Secure Your Vault
                </Text>

                <Text className="mt-3 text-base leading-6 text-slate-600">
                  {biometricsAvailable
                    ? "Choose how you want to unlock your vault — fingerprint, face, or a PIN."
                    : "Set a PIN to keep your vault locked and your documents safe."}
                </Text>
              </View>

              {biometricsAvailable === null ? (
                <View className="mt-10 items-center">
                  <ActivityIndicator size="small" color="#3730A3" />
                  <Text className="mt-3 text-sm text-slate-500">
                    Checking device capabilities…
                  </Text>
                </View>
              ) : (
                <PinInput
                  biometricType={biometricType}
                  onComplete={completeOnboarding}
                />
              )}
            </View>
          ) : (
            <ScrollView
              className="px-6 pt-4"
              contentContainerStyle={{ paddingBottom: 120 }}
            >
              {/* STEP 1 */}
              {step === 0 && (
                <>
                  <View>
                    <Text className="text-2xl font-bold text-slate-900">
                      Your Documents Never Touch the Cloud
                    </Text>

                    <Text className="mt-3 text-base leading-6 text-slate-600">
                      Vault works fully offline, with no servers and no
                      tracking. Your vault only unlocks with your fingerprint or
                      PIN.
                    </Text>
                  </View>

                  <FeatureList features={FEATURES_STEP1} />
                </>
              )}

              {/* STEP 2 */}
              {step === 1 && (
                <>
                  <View>
                    <Text className="text-2xl font-bold text-slate-900">
                      Add Anything, In Seconds
                    </Text>

                    <Text className="mt-3 text-base leading-6 text-slate-600">
                      Scan a photo or pick a file — you decide what it is. No
                      forced categories, no setup.
                    </Text>
                  </View>

                  <FeatureList features={FEATURES_STEP2} />
                </>
              )}

              {/* STEP 3 */}
              {step === 2 && (
                <>
                  <View>
                    <Text className="text-2xl font-bold text-slate-900">
                      Your Data Stays Yours
                    </Text>

                    <Text className="mt-3 text-base leading-6 text-slate-600">
                      No account, no cloud, no one else involved. Just you and
                      your vault.
                    </Text>
                  </View>

                  <FeatureList features={FEATURES_STEP3} />
                </>
              )}
            </ScrollView>
          )}

          {/* Bottom buttons — hidden on security step (handled by PinInput) */}
          {!isSecurityStep && (
            <View className="absolute bottom-0 left-0 right-0 flex-row gap-3 bg-[#FBF8FF] px-6 pb-6 pt-3 mb-4">
              {step > 0 && (
                <TouchableOpacity
                  onPress={handleBack}
                  className="h-14 flex-1 items-center justify-center rounded-xl border border-[#3730A3]"
                >
                  <Text className="font-semibold text-[#3730A3]">Back</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={handleNext}
                className="h-14 flex-1 items-center justify-center rounded-xl bg-[#3730A3]"
              >
                <Text className="font-semibold text-white">
                  {step === totalSteps - 2 ? "Get Started" : "Continue"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
}
