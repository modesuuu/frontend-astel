import api from "@/libs/axios.js";

const profileService = {
  async getProfile(userId) {
    const res = await api.get(`/profiles/${userId}`);
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

  async getUserPosts(userId) {
    if (!userId) {
      throw new Error("User ID tidak tersedia");
    }

    const res = await api.get(`/profiles/${userId}/posts`);

    if (!res.data?.success) {
      throw new Error(res.data?.message || "Gagal mengambil postingan pengguna");
    }

    return Array.isArray(res.data?.data) ? res.data.data : [];
  },
};

export default profileService;
