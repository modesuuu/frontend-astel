"use client";

import React, { useState, useRef, useEffect, Fragment } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import ProfileSummaryCard from "./ProfileSummaryCard";
import DetailedPostForm from "./DetailedPostForm";
import { useAuthMe } from "@/hooks/useAuth.js";

export function LoadingProfileSkeleton() {
  // ...tetap sama, gak ada perubahan di sini...
}

const RightProfileSidebar = ({ classNameSection }) => {
  const { profile, isLoading, error } = useAuthMe();
  const pathname = usePathname();
  const [isEditing, setIsEditing] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const containerRef = useRef(null);

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

  if (isLoading) return <LoadingProfileSkeleton />;

  // konten ini dipakai bareng di desktop (static) & mobile (bottom sheet)
  const renderContent = (onNavigate) => (
    <>
      {!isEditing ? (
        <>
          <ProfileSummaryCard user={currentUser} />

          <div className="w-full bg-gray-100 dark:bg-gray-800/60 border border-gray-200/20 rounded-3xl p-4 shadow-inner">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="w-full py-2.5 px-4 bg-primary hover:bg-indigo-700 text-white text-xs font-medium rounded-2xl transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] transform"
            >
              <i className={isCollabPage ? "bx bx-community text-xl" : "hidden"}></i>
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
        <DetailedPostForm
          isCollabMode={isCollabPage}
          onClose={() => {
            setIsEditing(false);
            onNavigate?.();
          }}
        />
      )}
    </>
  );

  return (
    <>
      {/* === DESKTOP: sidebar statis, cuma tampil >= md === */}
      <section
        className={`${classNameSection} fixed right-0 top-0 z-30 flex h-screen w-[320px] flex-col justify-between bg-white dark:bg-gray-900 border-l border-gray-100 dark:border-gray-800/60 px-6 py-8 shadow-sm transition-colors`}
      >
        <div ref={containerRef} className="w-full h-full flex flex-col justify-between">
          {renderContent()}
        </div>
      </section>

      {/* === MOBILE: tombol trigger bulat, foto profil / fallback icon === */}
      <button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        aria-label="Open profile"
        className="fixed right-4 top-4 z-50 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm dark:bg-gray-900 md:hidden"
      >
        {currentUser.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={currentUser.avatar}
            alt={currentUser.name || "Profile"}
            className="h-full w-full object-cover"
          />
        ) : (
          <i className="bx bxs-user-circle text-3xl text-gray-400"></i>
        )}
      </button>

      {/* === MOBILE: bottom sheet, slide dari bawah, penuh layar === */}
      <Transition show={isMobileOpen} as={Fragment}>
        <Dialog onClose={setIsMobileOpen} className="relative z-50 md:hidden">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
          </TransitionChild>

          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="translate-y-full"
            enterTo="translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="translate-y-0"
            leaveTo="translate-y-full"
          >
            <DialogPanel className="fixed inset-0 flex h-[100dvh] w-full flex-col justify-between bg-white px-6 py-8 dark:bg-gray-900">
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                aria-label="Close profile"
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <i className="bx bx-x text-2xl"></i>
              </button>

              <div className="w-full h-full flex flex-col justify-between pt-8">
                {renderContent(() => setIsMobileOpen(false))}
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
};

export default RightProfileSidebar;