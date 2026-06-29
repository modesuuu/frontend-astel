"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import ProfileCard from "@/components/profile/ProfileCard";
import Banner from "@/components/profile/Banner";
import SocialMediaLinks from "@/components/profile/SocialMediaLinks";
import SkillBadges from "@/components/profile/SkillBadges";
import CollabCard from "@/components/collaborations/CollabCard";
import Profile from "@/components/profile/Profile";
import PostContent from "@/components/feed/PostContent";
import PostGallery from "@/components/feed/PostGallery";
import { isAuthenticated } from "@/utils/auth.js";
import { useAuthMe } from "@/hooks/useAuth.js";
import { useMyCollabs } from "@/hooks/useCollabs.js";
import useMyPosts from "@/hooks/useMyPosts.js";
import timeAgo from "@/utils/timeAgo.js";
import { collaborationMapping } from "@/mapping/collaboration.mapping.js";
import useApplications from "@/hooks/useApplications.js";
import CardDropdownMenu from "@/components/Elements/CardDropdownMenu.jsx";
import postService from "@/services/post.service.js";
import { toast } from "sonner";
import { ROUTES } from "@/constants/routes.js";
import collabService from "@/services/collab.service.js";

// function CollabCard({ data }) {
//   const { title, description, mediaUrls, createdAt, ownerId, key } = data;
//   const [imgErr, setImgErr] = useState(false);
//   const coverImage = mediaUrls?.[0];
//   const hasImage = coverImage && !imgErr;
//   const owner = ownerId || {};
//   const ownerName = owner.username || "user";
//   const ownerAvatar =
//     owner.photo_profile_url ||
//     `https://ui-avatars.com/api/?name=${ownerName}&background=6366f1&color=fff`;
//   return (
//     <article key={data.key} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
//       {/* Header */}
//       <div className="flex items-center gap-3 px-4 pt-4 pb-3">
//         <img
//           src={ownerAvatar}
//           alt={ownerName}
//           onError={(e) => {
//             e.target.src = `https://ui-avatars.com/api/?name=${ownerName}&background=6366f1&color=fff`;
//           }}
//           className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-100 shrink-0"
//         />
//         <div className="flex flex-col min-w-0">
//           <span className="text-sm font-semibold text-gray-800 truncate">
//             @{ownerName}
//           </span>
//           <span className="text-xs text-gray-400">{timeAgo(createdAt)}</span>
//         </div>
//       </div>

//       {/* Cover image */}
//       {hasImage && (
//         <div className="relative w-48 h-48 object-cover bg-gray-100">
//           <img
//             src={coverImage}
//             alt={title}
//             onError={() => setImgErr(true)}
//             className="w-full h-full object-cover"
//           />
//           {mediaUrls.length > 1 && (
//             <span className="absolute bottom-2 right-2 bg-black/50 text-white text-xs font-medium px-2 py-0.5 rounded-full backdrop-blur-sm">
//               +{mediaUrls.length - 1} foto
//             </span>
//           )}
//         </div>
//       )}

//       {/* Body */}
//       <div className="px-4 pt-3 pb-2">
//         <h3 className="text-sm font-bold text-gray-900 leading-snug mb-1 line-clamp-1">
//           {title}
//         </h3>
//         <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
//           {description}
//         </p>
//       </div>

//       {/* Footer */}
//       <div className="px-4 pb-4 pt-2">
//         <button
//           onClick={() => onDetail?.(data)}
//           className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-semibold py-2 rounded-xl transition-all duration-150"
//         >
//           Lihat Detail
//         </button>
//       </div>
//     </article>
//   );
// }

// function timeAgo(dateStr) {
//   const now = new Date();
//   const past = new Date(dateStr);
//   const diffMs = now - past;

//   if (isNaN(past.getTime())) return "–";

//   const seconds = Math.floor(diffMs / 1000);
//   const minutes = Math.floor(seconds / 60);
//   const hours = Math.floor(minutes / 60);
//   const days = Math.floor(hours / 24);
//   const weeks = Math.floor(days / 7);
//   const months = Math.floor(days / 30);
//   const years = Math.floor(days / 365);

//   if (seconds < 60) return "Baru saja";
//   if (minutes < 60) return `${minutes} menit lalu`;
//   if (hours < 24) return `${hours} jam lalu`;
//   if (days === 1) return "Kemarin";
//   if (days < 7) return `${days} hari lalu`;
//   if (weeks < 4) return `${weeks} minggu lalu`;
//   if (months < 12) return `${months} bulan lalu`;
//   return `${years} tahun lalu`;
// }

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("feeds");
  // const [userFeeds, setUserFeeds] = useState([]);

  const {
    profile: userProfile,
    isLoading,
    error,
    refreshProfile,
  } = useAuthMe();
  const userId = userProfile?.data?.userId;
  const {
    posts: userFeeds,
    isLoading: postsLoading,
    error: postsError,
    refreshMyPosts,
  } = useMyPosts(userId);

  const {
    myCollabs: userCollabs,
    isLoading: collabsLoading,
    error: collabsError,
    refreshMyCollabs,
  } = useMyCollabs(userId);

  const {
    applications,
    isLoading: applicationsLoading,
    error: applicationsError,
  } = useApplications();
  // console.log("userFeeds", userFeeds);
  // console.log("uesrCOllab", userCollabs, `userId: \n`, userId);

  const [deletingPostId, setDeletingPostId] = useState(null);

  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
      return;
    }
    refreshProfile();
  }, [refreshProfile, router]);
  const collaborationList = collaborationMapping(userCollabs);
  console.log("collaborationList", userCollabs);
  const handleDeletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      setDeletingPostId(postId);
      await postService.deletePost(postId);
      await refreshMyPosts();
      toast.success("Successfully deleted post");
    } catch (err) {
      alert(
        err.response?.data?.message || err.message || "Failed to delete post",
      );
    } finally {
      setDeletingPostId(null);
    }
  };

  const handleDeleteCollab = async (collabId) => {
    if (!window.confirm("Are you sure you want to delete this collaboration?"))
      return;
    try {
      await collabService.deleteCollab(collabId);
      await refreshMyCollabs();
      toast.success("Successfully deleted collaboration");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Failed to delete collaboration",
      );
    } finally {
      setDeletingPostId(null);
    }
  };

  const handleDetailPost = (postId) => {
    router.push(`/posts/${postId}/edit`);
  };

  if (isLoading) {
    return (
      <section className="pt-6 min-h-screen bg-white dark:bg-gray-950 flex">
        <Sidebar />
        <div className="mx-60 flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <i className="bx bx-loader-alt animate-spin text-3xl text-indigo-600"></i>
            <span className="text-sm font-medium">Loading profile...</span>
          </div>
        </div>
      </section>
    );
  }
  if (error) return <h1>{error}</h1>;
  console.log({
    profileLoading: isLoading,
    collabLoading: collabsLoading,
    userId,
    userCollabs,
  });
  return (
    <section className="pt-6 relative min-h-screen bg-white dark:bg-gray-950">
      <Sidebar />

      <div className="ml-60 mr-6 flex flex-col gap-6">
        <Banner
          bannerUrl={userProfile?.bannerUrl}
          isOwnProfile={true}
          onEditBanner={() => alert("Modal ganti gambar banner terbuka!")}
        />
        <div className="flex gap-6 justify-between pb-6 w-full">
          <ProfileCard
            user={userProfile?.data}
            isOwnProfile={true}
            onEditProfile={() => router.push("/profile/edit")}
            onSetting={() => router.push("/settings")}
          />

          <div className=" flex flex-col items-end pt-4 px-6">
            <SocialMediaLinks links={userProfile?.data.socialMedia} />
            <SkillBadges skills={userProfile?.data.skills} />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4 border-b border-gray-100 dark:border-gray-900 pb-2">
            <button
              onClick={() => setActiveTab("feeds")}
              className={`text-sm font-semibold pb-2 transition-all ${
                activeTab === "feeds"
                  ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Feeds
            </button>
            <button
              onClick={() => setActiveTab("collaborations")}
              className={`text-sm font-semibold pb-2 transition-all ${
                activeTab === "collaborations"
                  ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Collaborations
            </button>
            <button
              onClick={() => setActiveTab("my-applications")}
              className={`text-sm font-semibold pb-2 transition-all ${
                activeTab === "my-applications"
                  ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              My Applications
            </button>
          </div>

          {/* TAB 1: KONTEN LIST FEEDS DINAMIS */}
          {activeTab === "feeds" && (
            <div className="flex flex-col gap-8 ">
              {userFeeds.length > 0 ? (
                userFeeds.map((feed) => (
                  <div
                    key={feed._id}
                    className="relative flex flex-col gap-2 pb-6 border-b border-gray-50 dark:border-gray-900/40 last:border-0"
                  >
                    <div className="absolute right-0 top-0 p-2">
                      <CardDropdownMenu
                        onDelete={() => handleDeletePost(feed._id)}
                        onEdit={() => handleDetailPost(feed._id)}
                      />
                    </div>
                    <Profile
                      avatar={userProfile?.data.photo_profile_url}
                      name={userProfile?.data.username}
                      time={timeAgo(feed.createdAt)}
                    />
                    <PostContent content={feed.description} />
                    <h1
                      className="text-sm font-medium text-primary cursor-pointer"
                      onClick={() => router.push(ROUTES.POST_DETAIL(feed?._id))}
                    >
                      View Details
                    </h1>
                    <PostGallery images={feed.mediaUrls} />

                    <div className="flex items-center gap-6 text-xs text-gray-400 mt-1">
                      <span className="flex items-center gap-1">
                        <i className="bx bx-eye text-sm"></i> {feed.viewCount}
                      </span>
                      <span className="flex items-center gap-1 hover:text-pink-600 cursor-pointer transition-colors">
                        <i className="bx bx-heart text-sm"></i> {feed.likeCount}
                      </span>
                      <span className="flex items-center gap-1 hover:text-indigo-500 cursor-pointer transition-colors">
                        <i className="bx bx-message-circle text-sm"></i>{" "}
                        {feed.commentCount}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-400 text-center py-12">
                  Belum ada postingan feed.
                </div>
              )}
            </div>
          )}

          {/* TAB 2: KONTEN LIST COLLABORATIONS DINAMIS */}
          {activeTab === "collaborations" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.isArray(collaborationList) &&
              collaborationList.length > 0 ? (
                collaborationList.map((project) => (
                  <div className="relative">
                    <div className="absolute right-0 bottom-0 p-6">
                      <CardDropdownMenu
                        onDelete={() => handleDeleteCollab(project.id)}
                      />
                    </div>
                    <CollabCard key={project.id} project={project} />
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-sm text-gray-400 text-center py-12 bg-gray-50 dark:bg-gray-900/30 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
                  Belum ada proyek kolaborasi yang diajukan.
                </div>
              )}
            </div>
          )}

          {/* TAB 3: KONTEN LIST MY APPLICATIONS DINAMIS */}
          {activeTab === "my-applications" && (
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              {/* {activeTab === "my-applications" && (...)} */}
              <div className="grid grid-cols-4 gap-4">
                {applications?.data?.map((app) => {
                  /* ── Status config ── */
                  const statusMap = {
                    pending: {
                      label: "Pending",
                      color: "#F59E0B",
                      bg: "#FEF3C7",
                    },
                    rejected: {
                      label: "Reject",
                      color: "#EF4444",
                      bg: "#FEE2E2",
                    },
                    accepted: {
                      label: "Accept",
                      color: "#6A60E3",
                      bg: "#EDE9FF",
                    },
                  };
                  const s = statusMap[app.status] ?? statusMap.pending;

                  return (
                    <div
                      key={app.applicationId}
                      className="relative flex flex-col justify-between rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 min-h-[260px] p-5"
                    >
                      {/* ── Status badge — rotated vertical kiri atas ── */}
                      <div className="flex items-start justify-between mb-4">
                        <span
                          className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                          style={{ color: s.color, backgroundColor: s.bg }}
                        >
                          {s.label}
                        </span>

                        {/* Avatar owner */}
                        <img
                          src={app.owner.photo_profile_url}
                          alt={app.owner.username}
                          onError={(e) => {
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${app.owner.username}&background=6A60E3&color=fff&size=64`;
                          }}
                          className="w-9 h-9 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-sm"
                        />
                      </div>

                      {/* ── Collab title — bold, vertikal feel via leading tight ── */}
                      <div className="flex-1 flex flex-col justify-center gap-1 mb-4">
                        <p className="text-[11px] text-gray-400 dark:text-gray-500 font-medium">
                          @{app.owner.username}
                        </p>
                        <h3
                          className="text-lg font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white uppercase"
                          style={{ wordBreak: "break-word" }}
                        >
                          {app.collab.title}
                        </h3>
                        <p className="text-xs text-gray-400 dark:text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                          {app.message}
                        </p>
                      </div>

                      {/* ── Bottom section ── */}
                      <div className="border-t border-gray-100 dark:border-gray-800 pt-3 flex items-center justify-between gap-3">
                        <span className="text-[10px] text-gray-400 dark:text-gray-500">
                          {new Date(app.createdAt).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>

                        {/* CommunicationUrl — hanya muncul jika accepted & ada URL */}
                        {app.status === "accepted" && app.communicationUrl ? (
                          <a
                            href={app.communicationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full transition-colors"
                            style={{
                              backgroundColor: "#6A60E3",
                              color: "#FFFFFF",
                            }}
                          >
                            <i className="bx bx-link-external text-sm" />
                            Join Group
                          </a>
                        ) : app.status === "accepted" ? (
                          /* accepted tapi URL belum tersedia */
                          <span className="text-[10px] italic text-gray-400 dark:text-gray-500">
                            Link coming soon
                          </span>
                        ) : (
                          /* pending / rejected — tidak ada aksi */
                          <span
                            className="text-[10px] font-medium px-3 py-1 rounded-full"
                            style={{ color: s.color, backgroundColor: s.bg }}
                          >
                            {app.status === "pending"
                              ? "Waiting review"
                              : "Not accepted"}
                          </span>
                        )}
                      </div>

                      {/* ── Accent strip kiri — signature visual ── */}
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                        style={{ backgroundColor: s.color, opacity: 0.7 }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
