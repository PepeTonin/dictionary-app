import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import ToastManager from "toastify-react-native";

import { Header } from "@/components/common/Header";

import { useAuthStore } from "@/stores/authStore";

const TEN_MINUTES = 1000 * 60 * 10;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: TEN_MINUTES,
      cacheTime: TEN_MINUTES,
    },
    mutations: {
      retry: false,
    },
  },
  logger: {
    log: () => {},
    warn: () => {},
    error: () => {},
  },
});

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { initialize, isLoading } = useAuthStore();

  useEffect(() => {
    async function initializeAuth() {
      await initialize();
      SplashScreen.hideAsync();
    }
    initializeAuth();
  }, [initialize]);

  if (isLoading) {
    return null;
  }

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
