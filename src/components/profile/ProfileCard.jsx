"use client"
import React from 'react'
import Image from 'next/image';

const ProfileCard = ({ user, isOwnProfile = true, onEditProfile, onSetting }) => {

    const defaultUser = {
        username: "Username",
        name: "G.Russel",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        avatarUrl: "/images/default-avatar.png",
        bannerUrl: ""
    };

    const activeUser = user || defaultUser;

    return (
        <div className="">
            {/* 2. SECTION AVATAR & INFO USER */}
            <div className="px-6 relative flex flex-col justify-between gap-4 -mt-20">
                {/* Sisi Kiri: Avatar & Teks Info */}
                <div className="flex flex-col  items-start gap-4 flex-1">
                    {/* Avatar Bulat Besar */}
                    <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-white dark:border-gray-950 bg-gray-200 dark:bg-gray-800 overflow-hidden relative shadow-md shrink-0">
                        <Image
                            src={activeUser.avatarUrl || "/images/default-avatar.png"}
                            alt={activeUser.name}
                            fill
                            sizes="(max-width: 768px) 128px, 144px"
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Nama & Bio */}
                    <div className="flex flex-col gap-1 pb-2 min-w-0">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-950 dark:text-white tracking-tight truncate">
                            {activeUser.name}
                        </h2>
                        <span className="text-xs font-medium text-gray-400 ">@{activeUser.username}</span>
                        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed whitespace-pre-line wrap-break-word">
                            {activeUser.bio}
                        </p>
                    </div>
                </div>

                {/* Sisi Kanan: Tombol Aksi (Hanya muncul jika isOwnProfile = true) */}
                {isOwnProfile && (
                    <div className="flex items-center gap-3 pb-2 shrink-0">
                        <button
                            type="button"
                            onClick={onEditProfile}
                            className="px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-all shadow-sm focus:outline-none select-none cursor-pointer"
                        >
                            Edit Profile
                        </button>
                        <button
                            type="button"
                            onClick={onSetting}
                            className="px-5 py-2 rounded-full bg-white dark:bg-gray-900 border border-primary hover:bg-gray-50 dark:hover:bg-gray-800/60 text-gray-800 dark:text-gray-200 text-sm font-semibold transition-all shadow-sm focus:outline-none select-none cursor-pointer"
                        >
                            Setting
                        </button>
                    </div>
                )}

            </div>

        </div>
    )
}

export default ProfileCard