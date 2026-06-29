"use client";
import PostGallery from "@/components/feed/PostGallery";
import Sidebar from "@/components/layout/Sidebar";
import React, { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Profile from "@/components/profile/Profile";
import PostContent from "@/components/feed/PostContent";
import Link from "next/link";

// dummy images
import img1 from "@/assets/images/dummy/image1.png";
import img2 from "@/assets/images/dummy/image2.png";
import img3 from "@/assets/images/dummy/image3.png";
import img4 from "@/assets/images/dummy/image4.png";
import img5 from "@/assets/images/dummy/image5.png";
import InteractionStats from "@/components/ui/InteractionStats";
import usePosts from "@/hooks/usePosts.js";
import timeAgo from "@/utils/timeAgo.js";
import { ROUTES } from "@/constants/routes.js";
import { useRouter } from "next/navigation.js";
import FeedSkeleton, {
  FeedCardSkeleton,
} from "@/components/feed/FeedSkeleton.jsx";

const Feeds = () => {
  // dumy data wok
  const { posts, isLoading, error, refreshPosts: refreshPost } = usePosts();
  const [feedPosts, setFeedPosts] = useState([]);
  useEffect(() => {
    if (posts.data) {
      setFeedPosts(posts.data);
    }
  }, [posts]);
  const router = useRouter();

  const handleLikeSuccess = (postId) => {
    setFeedPosts((prev) =>
      prev.map((post) => {
        if (post._id !== postId) {
          return post;
        }
        return {
          ...post,
          likeCount: post.isLiked ? post.likeCount - 1 : post.likeCount + 1,
          isLiked: !post.isLiked,
        };
      }),
    );
  };

  if (isLoading)
    return (
      <div className="mx-60 px-36">
        <FeedSkeleton count={2} />
      </div>
    );
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <section className="pt-6 relative ">
      <div className="mx-60 flex flex-col items-center ">
        <Header />

        {/* ini yang mau aku static kan */}
        <div className="flex flex-col px-36 gap-6">
          {/* mulai mapping dari sini */}

          {feedPosts.map((post) => (
            <div key={post._id} className="flex flex-col gap-6 mt-6">
              <Profile
                id={post?.userId._id}
                avatar={post?.userId.photo_profile_url}
                name={post?.userId.username}
                time={timeAgo(post?.createdAt)}
              />

              <div className="flex flex-col">
                <PostContent content={post?.description} />

                <h1
                  className="text-sm font-medium text-primary cursor-pointer"
                  onClick={() => router.push(ROUTES.POST_DETAIL(post?._id))}
                >
                  View Details
                </h1>

                <PostGallery images={post?.mediaUrls} />

                <InteractionStats
                  stats={{
                    views: post?.viewCount,
                    likes: post?.likeCount,
                    isLiked: post?.isLiked,
                    comments: post?.commentCount,
                  }}
                  feedId={post?._id}
                  onLikeSuccess={handleLikeSuccess}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feeds;
