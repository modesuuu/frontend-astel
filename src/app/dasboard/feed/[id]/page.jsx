"use client";

import React, { useState, use } from "react";
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

const FeedDetailPage = ({ params: paramsPromise }) => {
  const params = use(paramsPromise);
  const postId = params.id;

  const { post, isLoading, error, createComment, deleteComment, refreshPost } =
    usePostDetail(postId);
  const { profile } = useAuthMe();
  console.log("profile: auth me", profile);
  console.log("post: ", post);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // =========================
  // Adapter Response Backend
  // =========================

  const dummyPost = {
    id: post?.data?._id,

    username: post?.data?.ownerId?.username,

    avatarUrl: post?.data?.ownerId?.photo_profile_url,

    time: timeAgo(post?.data?.createdAt),

    title: post?.data?.title,

    content: post?.data?.description,

    media: post?.data?.mediaUrls || [],

    views: post?.data?.viewCount,

    likes: post?.data?.likeCount,

    comments: post?.data?.commentCount,

    isLiked: post?.data?.isLiked,
    userId: post?.data?.ownerId._id,

  };

  const comments =
    post?.data?.comments?.map((comment) => ({
      id: comment._id,
      userId: comment.userId._id,
      username: comment.userId.username,

      avatarUrl: comment.userId.photo_profile_url,

      time: timeAgo(comment.createdAt),

      text: comment.content,

      likes: comment.likeCount ?? 0,
    })) || [];
  console.log(comments);

  const handleAddComment = async (text) => {
    await createComment({
      content: text,
    });
  };
  const handleDeleteComment = async (propsCommentId) => {
    try {
      await deleteComment(propsCommentId);
      await refreshPost();
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus komentar.");
    }
  };

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

      <div className="flex flex-col gap-6 mt-6">
        <Profile
          id={dummyPost.userId}
          avatar={dummyPost.avatarUrl}
          name={dummyPost.username}
          time={dummyPost.time}
        />

        <PostContent content={[dummyPost.content]} />

        <PostGallery images={dummyPost.media} />

        <InteractionStats
          initialStats={{
            views: dummyPost.views,
            likes: dummyPost.likes,
            isLiked: dummyPost.isLiked,
            comments: dummyPost.comments,
          }}
          feedId={dummyPost.id}
          refreshPosts={refreshPost}
        />
      </div>

      {/* COMMENT */}

      <div className="mt-6">
        <CommentInput onSendComment={handleAddComment} />

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
