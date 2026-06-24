import api from "@/libs/axios.js";

const profileService = {
  async me() {
    const res = await api.get("/profiles/me");
    return res.data;
  },

  async update(payload) {
    const res = await api.put("/profiles/me", payload);
    return res.data;
  },

  async getSkills() {
    const res = await api.get("/skills");
    return res.data;
  },
};

export default profileService;
