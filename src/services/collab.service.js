import api from "@/libs/axios.js";

const collabService = {
  async getCollabs() {
    const res = await api.get("/collab");
    return res.data;
  },

  async getMyCollabs() {
    const res = await api.get("/collab/me");
    return res.data;
  },

  async getCollab(id) {
    const res = await api.get(`/collab/${id}`);
    return res.data;
  },

  async createCollab(payload) {
    const res = await api.post("/collab", payload);
    return res.data;
  },

  async updateCollab(id, payload) {
    const res = await api.put(`/collab/${id}`, payload);
    return res.data;
  },

  async deleteCollab(id) {
    const res = await api.delete(`/collab/${id}`);
    return res.data;
  },
};

export default collabService;
