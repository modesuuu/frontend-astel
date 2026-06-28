import api from "@/libs/axios.js";

const authService = {
  async register(payload) {
    const res = await api.post("/auth/register", payload);
    return res.data;
  },

  async login(payload) {
    const res = await api.post("/auth/login", payload);
    return res.data;
  },

  async me() {
    const res = await api.get("/profiles/me");
    return res.data;
  },
};

export default authService;
