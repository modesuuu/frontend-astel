"use block";
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ProfileSummaryCard = ({ user }) => {
    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-medium text-gray-950 dark:text-white">Profile</h2>
                <Link
                    href="/dasboard/profile/me"
                    className="text-gray-400 hover:text-indigo-600 p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all cursor-pointer"
                >
                    <i className="bx bx-export text-xl rotate-45 block"></i>
                </Link>
            </div>

            <div className="flex flex-col items-center text-center">
                <div className="relative w-24 h-24 rounded-full border-4 border-white dark:border-gray-950 shadow-md bg-gray-100 dark:bg-gray-800 overflow-hidden mb-4">
                    <Image src={user?.avatar || "/images/default-avatar.png"} alt="User avatar" fill sizes="96px" className="object-cover" />
                </div>
                <h3 className="text-lg font-medium text-gray-950 dark:text-white">Hello {user?.name || 'User'}🔥</h3>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 font-light">Let's make something today!</p>
            </div>
        </div>
    )
}

export default ProfileSummaryCard