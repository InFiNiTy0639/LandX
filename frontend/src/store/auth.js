import { create } from "zustand";
import { logout, getUserProfile } from "../lib/api";

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,

  setUser: (user, role) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("role", role);
    set({ user, role });
  },

  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },

  fetchUser: async () => {
    try {
      const { data } = await getUserProfile();
      set({ user: data, role: data.role });
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("role", data.role);
    } catch (error) {
      console.error("Fetching user failed:", error.response?.data || error.message);
    }
  },

  logout: () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      set({ user: null, token: null, role: null });
  },
}));