import { create } from "zustand";
import { getUserProfile } from "../lib/api";

export const useAuthStore = create((set) => ({
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : { id: null, firstName: "", lastName:"",email:"", phoneNumber: "", countryCode: "" , password:""},
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

  // fetchUser: async () => {
  //   try {
  //     const { data } = await getUserProfile();
  //     const userData = {
  //       id: data.id,
  //       name: `${data.firstname} ${data.lastname}`,
  //       phoneNumber: data.phonenum || "",
  //       countryCode: data.phoneCode || "",
  //     };
  //     set({ user: userData, role: data.role });
  //     localStorage.setItem("user", JSON.stringify(userData));
  //     localStorage.setItem("role", data.role);
  //   } catch (error) {
  //     console.error(
  //       "Fetching user failed:",
  //       error.response?.data || error.message
  //     );
  //   }
  // },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    set({
      user: { id: null, firstName: "",lastName:"",email:"", phoneNumber: "", countryCode: "", password:"" },
      token: null,
      role: null,
    });
  },
}));
