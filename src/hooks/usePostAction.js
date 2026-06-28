"use client";

import { useState } from "react";
import postService from "@/services/post.service";

export default function usePostAction() {
  const [isLoading, setIsLoading] = useState(false);

  const like = async (postId) => {
    try {
      setIsLoading(true);
      await postService.likePost(postId);
    } finally {
      setIsLoading(false);
    }
  };

  const unlike = async (postId) => {
    try {
      setIsLoading(true);
      await postService.unlikePost(postId);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    like,
    unlike,
    isLoading,
  };
}