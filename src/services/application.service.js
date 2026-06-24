import api from "@/libs/axios.js";

const applicationService = {
  async getApplications(collabId) {
    const res = await api.get(`/collab/${collabId}/applications`);
    return res.data;
  },

  async getMyApplications() {
    const res = await api.get("/myapplications");
    return res.data;
  },

  async getApplication(applicationId) {
    const res = await api.get(`/myapplications/${applicationId}`);
    return res.data;
  },

  async createApplication(collabId, payload) {
    const res = await api.post(`/collab/${collabId}/applications`, payload);
    return res.data;
  },

  async acceptApplication(applicationId) {
    const res = await api.put(
      `/collab/applications/${applicationId}/accept`
    );
    return res.data;
  },

  async rejectApplication(applicationId) {
    const res = await api.put(
      `/collab/applications/${applicationId}/reject`
    );
    return res.data;
  },
};

export default applicationService;
