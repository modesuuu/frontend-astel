"use client";

import { useCallback, useEffect, useState } from "react";
import postService from "@/services/post.service.js";

export default function useMyPosts(userId) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyPosts = useCallback(async () => {
    if (!userId) {
      setPosts([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await postService.getUserPosts(userId);
      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Gagal mengambil postingan Anda");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchMyPosts();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [fetchMyPosts]);

  return {
    posts,
    isLoading,
    error,
    refreshMyPosts: fetchMyPosts,
  };
}
