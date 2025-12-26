import { ref, computed } from "vue";
import { defineStore } from "pinia";
import api from "@/api/api";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token"));
  const login = async (payload) => {
    // console.log("BASE URL:", api.defaults.baseURL);
    // console.log("LOGIN PAYLOAD:", payload);
    const res = await api.post("/auth/login", payload);
    token.value = res.data.data.token;
    localStorage.setItem("token", token.value);
  };

  // const fetchProfile = async () => {
  //   try {
  //     const res = await api.get("/auth/profile");
  //     UserActivation.value = res
  //   }
  // }

  const logout = async () => {
    const res = await api.delete("/auth/logout");
    console.log(res.data);
    localStorage.removeItem("token");
  };

  return { token, login, logout };
});
