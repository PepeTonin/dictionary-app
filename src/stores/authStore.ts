import { create } from "zustand";

import { logout, signIn, signUp } from "@/services/supabase/auth";
import { supabaseClient } from "@/services/supabase/client";

interface AuthStore {
  user: object | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  token: null,
  isLoading: true,

  initialize: async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabaseClient.auth.getSession();

      if (error) {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          isLoading: false,
        });
        return;
      }

      if (session?.user) {
        set({
          isAuthenticated: true,
          user: session.user,
          token: session.access_token,
          isLoading: false,
        });
      } else {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          isLoading: false,
        });
      }

      supabaseClient.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          set({
            isAuthenticated: true,
            user: session.user,
            token: session.access_token,
          });
        } else {
          set({ isAuthenticated: false, user: null, token: null });
        }
      });
    } catch {
      set({
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: false,
      });
    }
  },

  login: async (email: string, password: string) => {
    await signIn(email, password);
  },

  register: async (email: string, password: string) => {
    await signUp(email, password);
  },

  logout: async () => {
    await logout();
  },
}));
