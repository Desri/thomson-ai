import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserProfile {
  email: string;
  role: string
}

interface AuthState {
  isLogin: boolean;
  user: UserProfile | null;
  setIsLogin: (status: boolean) => void;
  setUser: (user: UserProfile) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLogin: false,
      user: null,
      setIsLogin: (status) => set({ isLogin: status }),
      setUser: (user) => set({ user }),
      logout: () => set({ isLogin: false, user: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);

