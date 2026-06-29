"use client";

import { useState } from "react";
import postService from "@/services/post.service";

export default function useEditPost() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updatePost = async (postId, payload) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await postService.updatePost(postId, payload);
      return { success: true, data };
    } catch (err) {
      const message = err.response?.data?.message || "Gagal mengupdate post";
      setError(message);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updatePost,
    isLoading,
    error,
  };
}