"use client";

import React from "react";
import Header from "@/components/layout/Header";
import CollabCard from "@/components/collaborations/CollabCard";
import useCollabs from "@/hooks/useCollabs";
import timeAgo from "@/utils/timeAgo"; // sesuaikan path
import FeedSkeleton from "@/components/feed/FeedSkeleton.jsx";

const Collaborations = () => {
  const { collabs, isLoading, error } = useCollabs();
  console.log(collabs);

  if (isLoading) {
    return (
      <div className="mx-60 grid grid-cols-2 gap-8">
        <FeedSkeleton count={6} />
      </div>
    );
  }

  if (error) {
    return (
      <section className="pt-6 relative">
        <div className="mx-60">
          <Header />
          <div className="mt-6 text-center text-red-500">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  const collaborationList =
    collabs?.data?.map((item) => ({
      id: item._id,
      title: item.title,
      description: item.description,

      image: item.mediaUrls?.[0] || null,

      requiredMember: item.requiredMember,
      status: item.status,

      author: {
        id: item.ownerId._id,
        username: item.ownerId.username,
        avatarUrl: item.ownerId.photo_profile_url,
      },
      time: item.createdAt,
    })) || [];

  console.log("collaborationList", collaborationList);
  return (
    <section className="pt-6 relative">
      <div className="mx-60">
        <Header />

        <div className="grid grid-cols-2 gap-6 mt-6">
          {collaborationList.map((project) => (
            <CollabCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collaborations;
