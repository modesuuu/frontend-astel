"use client";

import { useState, useEffect } from "react";
import postService from "@/services/post.service";

export default function usePostDetail(postId) {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchPost() {
    if (!postId) return;
    try {
      setIsLoading(true);
      setError(null);
      const data = await postService.getPost(postId);
      setPost(data);
      console.log("dari usePostDetail",data);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal mengambil detail post");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPost();
  }, [postId]);

  return {
    post,
    isLoading,
    error,
    refreshPost: fetchPost,
    like: async () => {
      await postService.likePost(postId);
      await fetchPost();
    },

    unlike: async () => {
      await postService.unlikePost(postId);
      await fetchPost();
    },
    createComment: async (payload) => {
      await postService.createComment(postId, payload);
      await fetchPost();
    }, 
    deleteComment: async (commentId) => {
      await postService.deleteComment(commentId);
      await fetchPost();
    }
  };
}
