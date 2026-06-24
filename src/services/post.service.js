import api from "@/libs/axios.js";

const postService = {
  async getPosts() {
    const res = await api.get("/posts");
    return res.data;
  },

  async getPost(postId) {
    const res = await api.get(`/posts/${postId}`);
    return res.data;
  },

  async createPost(payload) {
    const res = await api.post("/posts", payload);
    return res.data;
  },

  async updatePost(postId, payload) {
    const res = await api.put(`/posts/${postId}`, payload);
    return res.data;
  },

  async deletePost(postId) {
    const res = await api.delete(`/posts/${postId}`);
    return res.data;
  },

  async likePost(postId) {
    const res = await api.post(`/posts/${postId}/like`);
    return res.data;
  },

  async unlikePost(postId) {
    const res = await api.delete(`/posts/${postId}/unlike`);
    return res.data;
  },

  async createComment(postId, payload) {
    const res = await api.post(`/posts/${postId}/comments`, payload);
    return res.data;
  },

  async getComments(postId) {
    const res = await api.get(`/posts/${postId}/comments`);
    return res.data;
  },

  async deleteComment(commentId) {
    const res = await api.delete(`/delete/comments/${commentId}`);
    return res.data;
  },
};

export default postService;