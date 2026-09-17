import { Stack } from "expo-router";
import { ToastProvider } from "../components/Toast";
import "../../global.css";

export default function RootLayout() {
  return (
    <ToastProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ToastProvider>
  );
}