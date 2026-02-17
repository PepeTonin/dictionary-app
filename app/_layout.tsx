import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import ToastManager from "toastify-react-native";

import { Header } from "@/components/common/Header";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <KeyboardProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="word"
            options={{
              headerShown: true,
              header: () => <Header type="showClose" />,
            }}
          />
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: true,
              header: () => <Header type="showBack" />,
            }}
          />
        </Stack>
        <ToastManager showProgressBar={false} />
      </KeyboardProvider>
    </QueryClientProvider>
  );
}
