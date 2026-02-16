import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import ToastManager from "toastify-react-native";

import { Header } from "@/components/common/Header";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    // Adicione suas fontes customizadas aqui
    // 'CustomFont-Regular': require('../assets/fonts/CustomFont-Regular.ttf'),
  });

  const queryClient = new QueryClient();

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
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
