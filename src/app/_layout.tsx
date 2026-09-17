import { Stack } from "expo-router";
import "../../global.css";
import { ToastProvider } from "../components/Toast";

export default function RootLayout() {
  return (
    <ToastProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#FBF8FF" },
        }}
      />
    </ToastProvider>
  );
}
