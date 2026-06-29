"use client";
import React, { useState, use } from "react";
import Link from "next/link";
import Profile from "@/components/profile/Profile";
import PostContent from "@/components/feed/PostContent";
import PostGallery from "@/components/feed/PostGallery";
import CollabMeta from "@/components/collaborations/CollabMeta";
import CollabApplyForm from "@/components/collaborations/CollabApplyForm";

// dummy images
import img1 from "@/assets/images/dummy/image1.png";
import img2 from "@/assets/images/dummy/image2.png";
import img3 from "@/assets/images/dummy/image3.png";
import img4 from "@/assets/images/dummy/image4.png";
import img5 from "@/assets/images/dummy/image5.png";
import { ROUTES } from "@/constants/routes.js";
import useCollabDetail from "@/hooks/useCollabDetail.js";
import { collaborationDetailMapping } from "@/mapping/collaboration.mapping.js";
import { useAuthMe } from "@/hooks/useAuth.js";
import timeAgo from "@/utils/timeAgo.js";
import { useCreateApplication } from "@/hooks/useApplications.js";
import { toast } from "sonner";

const CollaborationsDetail = ({ params: paramsPromise }) => {
  // dummy data, nanti diganti pake fetch data dari API
  const params = use(paramsPromise);
  const collabId = params.id;
  const { collab, isLoading, error, refreshCollab } = useCollabDetail(collabId);
  const { profile, isLoading: profileLoading } = useAuthMe();
  console.log("dari collabDetail", collab);

  const collabData = collaborationDetailMapping(collab?.data);
  const {
    createApplication,
    isLoading: applicationLoading,
    error: applicationError,
  } = useCreateApplication();
  console.log("dari collabDetail", profile);
  const handleApplyCollab = async (message) => {
    try {
      await createApplication(collabId, { message });
      refreshCollab();
      toast.success("Successfully applied collaboration", {
        position: "top-right",
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Failed to apply collaboration",
        { position: "top-right" },
      );
    }
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="pt-6 relative mx-60">
      <div className="flex items-center gap-4 border-b border-gray-100 dark:border-gray-800 pb-4 mb-4">
        <Link
          href={ROUTES.HOME}
          className="text-gray-600 dark:text-gray-400 flex items-center hover:text-black dark:hover:text-white transition-colors"
        >
          <i className="bx bx-arrow-left-stroke text-2xl"></i>
        </Link>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Collaborations
        </h1>
      </div>

      {/* PROFIL PEMBUAT PROJECT */}
      <Profile
        id={collabData?.ownerId}
        avatar={collabData?.avatarUrl}
        name={collabData?.username}
        time={timeAgo(collabData?.createdAt)}
      />

      {/* JUDUL DAN DESKRIPSI UTAMA */}
      <div className="mt-4 flex flex-col gap-2">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          {collabData?.title}
        </h2>
        <PostContent content={collabData?.description} />
      </div>

      {/* KOMPONEN BARU: METADATA & SKILLS */}
      <CollabMeta
        maxParticipants={collabData?.maxParticipants}
        skills={collabData?.skills}
      />

      {/* GALERI MEDIA (MENGGUNAKAN LIGHTBOX KITA SEBELUMNYA) */}
      <div className="mt-4">
        <PostGallery images={collabData?.media} />
      </div>

      {/* KOMPONEN BARU: FORM LAMARAN / APPLY */}
      <CollabApplyForm profileApplicant={profile} onApply={handleApplyCollab} />
    </div>
  );
};

export default CollaborationsDetail;
