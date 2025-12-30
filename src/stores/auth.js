import { ref, computed } from "vue";
import { defineStore } from "pinia";
import api from "@/api/api";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token"));
  const user = ref(null);

  const isAuthenticate = computed(() => !!token.value && !!user.value);
  console.log("is Authenticate:", !!token.value && !!user.value);

  const login = async (payload) => {
    //  header and base URL we and defined in api.js
    const res = await api.post("/auth/login", payload);
    token.value = res.data.data.token;
    console.log("data user", res.data);
    localStorage.setItem("token", token.value);
  };

  // get profile user when login to validate
  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/profile");
      user.value = res.data.data;
      console.log(user.value);
    } catch (error) {
      clearAuth();
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.delete("/auth/logout");
    } finally {
      clearAuth();
    }
  };

  // clear user and token
  const clearAuth = () => {
    token.value = null;
    user.value = null;
    localStorage.removeItem("token");
  };
  return {
    token,
    user,
    isAuthenticate,
    login,
    logout,
    clearAuth,
    fetchProfile,
  };
});
