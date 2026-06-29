"use client";

import React, { useState, use, useEffect } from "react";
import Link from "next/link";

import Profile from "@/components/profile/Profile";
import PostContent from "@/components/feed/PostContent";
import PostGallery from "@/components/feed/PostGallery";
import InteractionStats from "@/components/ui/InteractionStats";
import CommentInput from "@/components/comment/CommentInput";
import CommentList from "@/components/comment/CommentList";

import timeAgo from "@/utils/timeAgo";
import usePostDetail from "@/hooks/usePostDetail.js";
import { useAuthMe } from "@/hooks/useAuth.js";
import { toast } from "sonner";
import PillLink from "@/components/ui/Pillink.jsx";

const FeedDetailPage = ({ params: paramsPromise }) => {
  const params = use(paramsPromise);
  const postId = params.id;

  const { post, isLoading, error, createComment, deleteComment, refreshPost } =
    usePostDetail(postId);
  const { profile } = useAuthMe();
  console.log("profile: auth me", profile);
  console.log("post: ", post);

  // =========================
  const [feedPost, setFeedPosts] = useState({});
  // Adapter Response Backend
  // =========================

  useEffect(() => {
    if (post?.data) {
      setFeedPosts(post?.data);
    }
  }, [post]);

  const dummyPost = {
    id: feedPost?._id,

    username: feedPost?.ownerId?.username,

    avatarUrl: feedPost?.ownerId?.photo_profile_url,

    time: timeAgo(feedPost?.createdAt),

    title: feedPost?.title,

    content: feedPost?.description,

    media: feedPost?.mediaUrls || [],

    views: feedPost?.viewCount,

    likes: feedPost?.likeCount,

    comments: feedPost?.commentCount,

    isLiked: feedPost?.isLiked,
    userId: feedPost?.ownerId?._id,
    externalUrl: feedPost?.externalUrl,
  };
  const handleLikeSuccess = (postId) => {
    setFeedPosts((post) => {
      if (post._id !== postId) {
        return post;
      }
      return {
        ...post,
        likeCount: post.isLiked ? post.likeCount - 1 : post.likeCount + 1,
        isLiked: !post.isLiked,
      };
    });
  };
  console.log("dummyPost: ", dummyPost);
  console.log("feedPost", feedPost);
  console.log("dummyPost.id", dummyPost.id);

  const comments =
    feedPost?.comments?.map((comment) => ({
      id: comment._id,
      userId: comment.userId._id,
      username: comment.userId.username,

      avatarUrl: comment.userId.photo_profile_url,

      time: timeAgo(comment.createdAt),

      text: comment.content,

      likes: comment.likeCount ?? 0,
    })) || [];

  const handleAddComment = async (text) => {
    try {
      const { data: newComment } = await createComment({
        content: text,
      });
      setFeedPosts((prev) => ({
        ...prev,
        commentCount: prev.commentCount + 1,
        comments: [newComment, ...prev.comments],
      }));
      toast.success("Successfully comments on this Feed", {
        position: "top-right",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed comment!", { position: "top-right" });
    }
  };

  const handleDeleteComment = async (propsCommentId) => {
    try {
      await deleteComment(propsCommentId);
      setFeedPosts((prev) => ({
        ...prev,
        commentCount: prev.commentCount - 1,
        comments: prev?.comments.filter((item) => item._id !== propsCommentId),
      }));
      toast.success("Successfully deleted comment", { position: "top-right" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete comment", { position: "top-right" });
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="pt-6 relative mx-60">
      {/* TOP BAR */}
      <div className="flex items-center gap-4 border-b border-gray-100 dark:border-gray-800 pb-4 mb-4">
        <Link
          href="/dasboard/feed"
          className="text-gray-600 dark:text-gray-400 flex items-center hover:text-black dark:hover:text-white"
        >
          <i className="bx bx-arrow-left-stroke text-2xl"></i>
        </Link>

        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Feeds
        </h1>
      </div>

      {/* POST */}

      <div className="relative flex flex-col gap-6 mt-6">
        <Profile
          id={dummyPost.userId}
          avatar={dummyPost.avatarUrl}
          name={dummyPost.username}
          time={dummyPost.time}
        />

        <PostContent content={[dummyPost.content]} />

        <PostGallery images={dummyPost.media} />

        <InteractionStats
          stats={{
            views: dummyPost.views,
            likes: dummyPost.likes,
            isLiked: dummyPost.isLiked,
            comments: dummyPost.comments,
          }}
          feedId={dummyPost.id}
          onLikeSuccess={handleLikeSuccess}
        />
        <div className="absolute top-0 right-0 ">
          <PillLink
            icon="bx bx-globe-alt"
            className="text-lg"
            external
            href={dummyPost.externalUrl}
          >
            Visit
          </PillLink>
        </div>
        {/* <p>makan</p> */}
      </div>

      {/* COMMENT */}

      <div className="mt-6">
        <CommentInput
          avatar={profile?.data?.photo_profile_url}
          onSendComment={handleAddComment}
        />

        {/* <CommentList comments={comments} /> */}
        <CommentList
          comments={comments}
          currentUserId={profile?.data?.userId}
          onDeleteComment={handleDeleteComment}
        />
      </div>
    </div>
  );
};

export default FeedDetailPage;
