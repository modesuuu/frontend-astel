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
import useProfile from "@/hooks/useProfile.js";
import { isAuthenticated } from "@/utils/auth.js";
import { useAuthMe } from "@/hooks/useAuth.js";
import {
  profileMapping,
  feedMapping,
} from "@/mapping/profile.mapping.js";
import useCollabs, { useMyCollabs } from "@/hooks/useCollabs.js";
import useMyPosts from "@/hooks/useMyPosts.js";
import { ROUTES } from "@/constants/routes.js";
import timeAgo from "@/utils/timeAgo.js";
import { collaborationMapping } from "@/mapping/collaboration.mapping.js";
const ProfilePage = () => {
  const profileId = useParams().id;
  console.log("params", profileId);

  const router = useRouter();

  const [activeTab, setActiveTab] = useState("feeds");

  // BACKEND NOTE: Cek apakah ID profile yang dibuka adalah ID milik user yang sedang login saat ini

  // const isMe = profileId === "me";
  // console.log("TOKEN:", localStorage.getItem("token"));
  const publicProfile = useProfile(profileId);
  const rawProfile = publicProfile.profile;

  console.log("rawProfile", rawProfile);
  // State dari Hook yok
  const { myCollabs, isLoading: collabsLoading } = useMyCollabs(profileId);
  const { posts, isLoading: postsLoading } = useMyPosts(profileId);

  const userProfile = profileMapping(rawProfile?.data);
  const userFeeds = feedMapping(posts);
  const userCollabs = collaborationMapping(myCollabs, userProfile);

  console.log("userCollabs", userCollabs, `\nmyCollabs: \n`, myCollabs, `\nuserId: \n`, profileId);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push(ROUTES.LOGIN);
      return;
    }
  }, [router]);
  // SIMULASI FETCH DATA DARI BACKEND BERDASARKAN ID DUMMY WOK

  // LOADING SKELETON SCREEN
  const isLoading = publicProfile.isLoading || postsLoading || collabsLoading;
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

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <section className="pt-6 relative min-h-screen bg-white dark:bg-gray-950">
      <Sidebar />

      <div className="ml-60 mr-6 flex flex-col gap-6">
        <Banner
          bannerUrl={""}
          isOwnProfile={false}
          onEditBanner={() => alert("Modal ganti gambar banner terbuka!")}
        />
        <div className="flex gap-6 justify-between pb-6">
          <ProfileCard
            user={userProfile}
            isOwnProfile={false}
            onEditProfile={() => router.push("/profile/edit")}
            onSetting={() => router.push("/settings")}
          />

          <div className=" flex flex-col items-end pt-4 px-6">
            <SocialMediaLinks links={userProfile?.socialMedia} />
            <SkillBadges skills={userProfile?.skills} />
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
          </div>

          {/* TAB 1: KONTEN LIST FEEDS DINAMIS */}
          {activeTab === "feeds" && (
            <div className="flex flex-col gap-8">
              {userFeeds.length > 0 ? (
                userFeeds.map((feed) => (
                  <div key={feed._id}>
                    <Profile
                      avatar={userProfile?.photo_profile_url}
                      name={userProfile?.username}
                      time={timeAgo(feed.time)}
                    />

                    <PostContent content={feed.description} />

                    <PostGallery images={feed.mediaUrls} />
                    {/* <div className="flex items-center gap-6 text-xs text-gray-400 mt-1">
                        <span className="flex items-center gap-1"><i className="bx bx-show text-sm"></i> 124</span>
                        <span className="flex items-center gap-1 hover:text-pink-600 cursor-pointer transition-colors"><i className="bx bx-heart text-sm"></i> 42</span>
                        <span className="flex items-center gap-1 hover:text-indigo-500 cursor-pointer transition-colors"><i className="bx bx-message-circle text-sm"></i> Comment</span>
                      </div> */}
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
              {Array.isArray(userCollabs) && userCollabs.length > 0 ? (
                userCollabs.map((project) => (
                  <CollabCard key={project.id} project={project} />
                ))
              ) : (
                <div className="col-span-2 text-sm text-gray-400 text-center py-12 bg-gray-50 dark:bg-gray-900/30 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
                  Belum ada proyek kolaborasi yang diajukan.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
