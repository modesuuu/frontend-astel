"use block";
"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import ProfileSummaryCard from "./ProfileSummaryCard";
import DetailedPostForm from "./DetailedPostForm";
import { useAuthMe } from "@/hooks/useAuth.js";

export function LoadingProfileSkeleton() {
  return (
    <section className={`hidden md:flex fixed right-0 top-0 z-30 h-screen w-[320px] flex-col justify-between bg-white dark:bg-gray-900 border-l border-gray-100 dark:border-gray-800/60 px-6 py-8 shadow-sm transition-colors`}>
      <div className="w-full h-full flex flex-col justify-between animate-pulse">

        {/* === TOP: ProfileSummaryCard Skeleton === */}
        <div className="flex flex-col gap-5">

          {/* Avatar + nama + username */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0" />
            <div className="flex flex-col gap-2 flex-1">
              <div className="h-3.5 w-32 rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="h-3 w-20 rounded-full bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>

          {/* Bio / deskripsi singkat */}
          <div className="flex flex-col gap-2">
            <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="h-3 w-5/6 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="h-3 w-4/6 rounded-full bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Stats row: followers / following / posts */}
          <div className="flex items-center gap-4 pt-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col gap-1.5 items-center flex-1">
                <div className="h-4 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                <div className="h-3 w-14 rounded-full bg-gray-200 dark:bg-gray-700" />
              </div>
            ))}
          </div>

          {/* Tags / skill badges */}
          <div className="flex flex-wrap gap-2">
            {[60, 80, 50, 70].map((w, i) => (
              <div
                key={i}
                className="h-6 rounded-full bg-gray-200 dark:bg-gray-700"
                style={{ width: `${w}px` }}
              />
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gray-100 dark:bg-gray-800" />

          {/* List item rows (misal: recent activity / konten) */}
          <div className="flex flex-col gap-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gray-200 dark:bg-gray-700 shrink-0" />
                <div className="flex flex-col gap-1.5 flex-1">
                  <div className="h-3 w-3/4 rounded-full bg-gray-200 dark:bg-gray-700" />
                  <div className="h-2.5 w-1/2 rounded-full bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === BOTTOM: Widget Input Skeleton === */}
        <div className="w-full bg-gray-100 dark:bg-gray-800/60 border border-gray-200/20 rounded-3xl p-4 shadow-inner">

          {/* Tombol utama */}
          <div className="w-full h-10 rounded-2xl bg-gray-300 dark:bg-gray-700" />

          {/* Row bawah: File / Image + Send */}
          <div className="flex items-center justify-between px-1 mt-3">
            <div className="flex items-center gap-3">
              <div className="h-3.5 w-10 rounded-full bg-gray-300 dark:bg-gray-700" />
              <div className="h-3.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700" />
            </div>
            <div className="h-6 w-14 rounded-full bg-gray-300 dark:bg-gray-700" />
          </div>
        </div>

      </div>
    </section>
  );
}

const RightProfileSidebar = ({ classNameSection  }) => {
  const { profile, isLoading, error } = useAuthMe();
console.log("profile: ", profile);
  const pathname = usePathname();
  const [isEditing, setIsEditing] = useState(false);
  const containerRef = useRef(null);

  // 1. CEK APAKAH SEDANG DI HALAMAN PROFILE
  // 2. CEK APAKAH SEDANG DI HALAMAN COLLABORATIONS
  const isCollabPage = pathname === "/dasboard/collaborations";
  
  const currentUser = {
    name: profile?.data?.username,
    avatar: profile?.data?.photo_profile_url,
};

useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.05 },
    );
}, [isEditing, pathname]);

if(isLoading) return <LoadingProfileSkeleton />;
  return (
    <section className={`${classNameSection} fixed right-0 top-0 z-30 flex h-screen w-[320px] flex-col justify-between bg-white dark:bg-gray-900 border-l border-gray-100 dark:border-gray-800/60 px-6 py-8 shadow-sm transition-colors`}>
      <div
        ref={containerRef}
        className="w-full h-full flex flex-col justify-between"
      >
        {!isEditing ? (
          <>
            <ProfileSummaryCard user={currentUser} />

            {/* WIDGET INPUTAN BAWAH */}
            <div className="w-full bg-gray-100 dark:bg-gray-800/60 border border-gray-200/20 rounded-3xl p-4 shadow-inner">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="w-full py-2.5 px-4 bg-primary hover:bg-indigo-700 text-white text-xs font-medium rounded-2xl transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] transform"
              >
                {/* 3. DYNAMIC TEXT & ICON */}
                <i
                  className={
                    isCollabPage ? "bx bx-community text-xl" : "hidden"
                  }
                ></i>
                {isCollabPage ? "Make Collaborations" : "Post Something"}
              </button>

              <div className="flex items-center justify-between px-1 mt-3">
                <div className="flex items-center gap-3 text-gray-400 text-[11px] font-medium">
                  <span className="flex items-center gap-1">
                    <i className="bx bx-folder"></i> File
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="bx bx-image"></i> Image
                  </span>
                </div>
                <span className="px-4 py-1.5 rounded-full bg-gray-300 dark:bg-gray-800 text-[11px] text-gray-400 font-medium">
                  Send
                </span>
              </div>
            </div>
          </>
        ) : (
          /* OPER PROPS MODE HALAMAN KE FORM */
          <DetailedPostForm
            isCollabMode={isCollabPage}
            onClose={() => setIsEditing(false)}
          />
        )}
      </div>
    </section>
  );
};

export default RightProfileSidebar;
