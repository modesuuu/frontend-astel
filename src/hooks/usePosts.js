"use client";

import { useState, useEffect } from "react";
import postService from "@/services/post.service";

export default function usePosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchPosts() {
    try {
      setIsLoading(true);
      setError(null);
      const data = await postService.getPosts();
      setPosts(data);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal mengambil posts");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts: posts || [],
    isLoading,
    error,
    refreshPosts: fetchPosts,
  };
}

export function usePostDelete(id) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deletePost = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await postService.deletePost(id);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal menghapus post");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deletePost,
    isLoading,
    error,
  };
}
