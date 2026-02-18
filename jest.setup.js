process.env.EXPO_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key";
process.env.EXPO_PUBLIC_DICTIONARY_API_URL = "https://api.test.com";

jest.mock("react-native-mmkv", () => {
  const storage = {};
  return {
    createMMKV: jest.fn(() => ({
      set: (key, value) => {
        storage[key] = value;
      },
      getString: (key) =>
        storage[key] != null ? String(storage[key]) : undefined,
      remove: (key) => {
        delete storage[key];
      },
    })),
  };
});

jest.mock("@/services/supabase/client", () => {
  const actual = jest.requireActual("@/services/supabase/client");
  return {
    ...actual,
    supabaseRestClient: {
      ...actual.supabaseRestClient,
      get: jest.fn(),
    },
  };
});

jest.mock("react-native-safe-area-context", () => {
  return {
    useSafeAreaInsets: () => ({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    }),
    SafeAreaProvider: ({ children }) => children,
  };
});
