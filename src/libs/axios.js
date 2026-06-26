import axios from "axios";
import { NEXT_PUBLIC_API_URL } from "./env.js";

const api = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;
