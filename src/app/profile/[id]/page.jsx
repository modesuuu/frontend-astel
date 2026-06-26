"use block";
"use client";

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import ProfileCard from '@/components/profile/ProfileCard';
import Banner from '@/components/profile/Banner';
import SocialMediaLinks from '@/components/profile/SocialMediaLinks';
import SkillBadges from '@/components/profile/SkillBadges';
import CollabCard from '@/components/collaborations/CollabCard'; 
import Profile from '@/components/profile/Profile';
import PostContent from '@/components/feed/PostContent';
import PostGallery from '@/components/feed/PostGallery';

const page = ({ params: paramsPromise }) => {

  const params = use(paramsPromise);
  const profileId = params.id;
  const router = useRouter();

  const [userProfile, setUserProfile] = useState(null);
  const [userFeeds, setUserFeeds] = useState([]);
  const [userCollabs, setUserCollabs] = useState([]);

  const [activeTab, setActiveTab] = useState("feeds");
  const [isLoading, setIsLoading] = useState(true);

  // BACKEND NOTE: Cek apakah ID profile yang dibuka adalah ID milik user yang sedang login saat ini
  const isOwnProfile = profileId === "me" || profileId === "current-user-id-dari-auth";

  // SIMULASI FETCH DATA DARI BACKEND BERDASARKAN ID DUMMY WOK
  useEffect(() => {
    setIsLoading(true);

    // DUMMY SIMULASI TIMEOUT
    const timeout = setTimeout(() => {
      setUserProfile({
        id: profileId,
        username: profileId === "me" ? "andi" : `user${profileId}`,
        name: profileId === "me" ? "Andi (Anda)" : `User ${profileId}`,
        bio: `Ini adalah bio milik user dengan ID: ${profileId}. Menampilkan deskripsi keahlian dan background profesional di sini. paok`,
        avatarUrl: "",
        bannerUrl: "",
        socials: [
          { platform: "Instagram", url: "https://instagram.com", icon: "bxl bx-instagram" },
          { platform: "Github", url: "https://github.com", icon: "bxl bx-github" }
        ],
        skills: ["React", "Next.js", "Tailwind CSS", "GSAP", "Solidity"]
      });

      // Set Data Feeds Spesifik milik User tersebut
      setUserFeeds([
        {
          id: 101,
          time: "3 hours ago",
          content: `Halo dunia! Ini postingan feed pertama saya dari user ID: ${profileId}.`,
          media: []
        },
        {
          id: 102,
          time: "1 day ago",
          content: "Sedang sibuk mengulik slicing UI untuk dashboard web terbaru menggunakan Astro framework.",
          media: []
        }
      ]);

      // Set Data Proyek Kolaborasi milik User tersebut
      setUserCollabs([
        {
          id: "collab-abc",
          title: "Blockchain Web3 Calculator App",
          description: "Mencari frontend dev yang paham Tailwind dan basic smart contract untuk membantu integrasi interface web aplikasi kalkulator.",
          image: "",
          author: {
            username: profileId === "me" ? "Andi" : `User ${profileId}`,
            avatarUrl: "",
            time: "2 days ago"
          }
        }
      ]);

      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [profileId]);

  // LOADING SKELETON SCREEN
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

  return (
    <section className="pt-6 relative min-h-screen bg-white dark:bg-gray-950">
      <Sidebar />

      <div className="ml-60 mr-6 flex flex-col gap-6">
        <Banner
          bannerUrl={userProfile?.bannerUrl}
          isOwnProfile={isOwnProfile}
          onEditBanner={() => alert('Modal ganti gambar banner terbuka!')}
        />
        <div className="flex gap-6 items-start pb-6">
          <ProfileCard
            user={userProfile}
            isOwnProfile={isOwnProfile}
            onEditProfile={() => router.push('/profile/edit')}
            onSetting={() => router.push('/settings')}
          />

          <div className=" flex flex-col items-end pt-4 px-6">
            <SocialMediaLinks links={userProfile?.socials} />
            <SkillBadges skills={userProfile?.skills} />
          </div>
        </div>


        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4 border-b border-gray-100 dark:border-gray-900 pb-2">
            <button
              onClick={() => setActiveTab("feeds")}
              className={`text-sm font-semibold pb-2 transition-all ${activeTab === "feeds"
                ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400"
                : "text-gray-400 hover:text-gray-600"
                }`}
            >
              Feeds
            </button>
            <button
              onClick={() => setActiveTab("collaborations")}
              className={`text-sm font-semibold pb-2 transition-all ${activeTab === "collaborations"
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
                  <div key={feed.id} className="flex flex-col gap-3 pb-6 border-b border-gray-50 dark:border-gray-900/40 last:border-0">
                    <Profile avatar={userProfile?.avatarUrl} name={userProfile?.name} time={feed.time} />
                    <PostContent content={feed.content} />
                    <PostGallery images={feed.media} />

                    {/* <div className="flex items-center gap-6 text-xs text-gray-400 mt-1">
                      <span className="flex items-center gap-1"><i className="bx bx-show text-sm"></i> 124</span>
                      <span className="flex items-center gap-1 hover:text-pink-600 cursor-pointer transition-colors"><i className="bx bx-heart text-sm"></i> 42</span>
                      <span className="flex items-center gap-1 hover:text-indigo-500 cursor-pointer transition-colors"><i className="bx bx-comment text-sm"></i> Comment</span>
                    </div> */}
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-400 text-center py-12">Belum ada postingan feed.</div>
              )}
            </div>
          )}

          {/* TAB 2: KONTEN LIST COLLABORATIONS DINAMIS */}
          {activeTab === "collaborations" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userCollabs.length > 0 ? (
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
  )
}

export default page