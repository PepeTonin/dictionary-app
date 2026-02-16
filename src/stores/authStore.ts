import { create } from "zustand";

interface AuthStore {
  user: object | null;
  setUser: (user: object | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  user: null,
  setUser: (user: object | null) => set({ user }),
  token: null,
  setToken: (token: string | null) => set({ token }),
  login: (email: string, password: string) => {
    set({ isAuthenticated: true });
  },
  register: (email: string, password: string) => {
    set({ isAuthenticated: true });
  },
  logout: () => {
    set({ isAuthenticated: false });
  },
}));
