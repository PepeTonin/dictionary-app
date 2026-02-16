import { create } from "zustand";

import { logout, signIn, signUp } from "@/services/supabase/auth";
interface AuthStore {
  user: object | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  token: null,
  login: async (email: string, password: string) => {
    try {
      const { user, session } = await signIn(email, password);
      set({ isAuthenticated: true, user, token: session?.access_token });
    } catch (error) {
      throw error;
    }
  },
  register: async (email: string, password: string) => {
    try {
      await signUp(email, password);
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    try {
      await logout();
      set({ isAuthenticated: false, user: null, token: null });
    } catch (error) {
      throw error;
    }
  },
}));
