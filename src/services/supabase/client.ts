import { SupportedStorage, createClient } from "@supabase/supabase-js";
import axios from "axios";
import { createMMKV } from "react-native-mmkv";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

const storage = createMMKV({ id: "supabase-storage" });

const mmkvStorageConfig = {
  setItem: (key: string, value: boolean | string | number | ArrayBuffer) =>
    storage.set(key, value),
  getItem: (key: string) => storage.getString(key) ?? null,
  removeItem: (key: string) => {
    storage.remove(key);
    return;
  },
} satisfies SupportedStorage;

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: mmkvStorageConfig,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export const supabaseRestClient = axios.create({
  baseURL: `${supabaseUrl}/rest/v1`,
  headers: {
    apikey: supabaseAnonKey,
    "Content-Type": "application/json",
    Authorization: `Bearer ${supabaseAnonKey}`,
  },
});
