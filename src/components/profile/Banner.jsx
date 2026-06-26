"use client";
import React from 'react'
import Image from 'next/image';

const Banner = ({ bannerUrl, isOwnProfile = true, onEditBanner }) => {
    return (
        <div className="w-full h-48 md:h-60 rounded-2xl relative overflow-hidden bg-linear-to-r from-purple-500 via-indigo-500 to-pink-500">
            {bannerUrl && (
                <img
                    src={bannerUrl}
                    alt="Profile Banner"
                    className="w-full h-full object-cover"
                />
            )}

            {isOwnProfile && (
                <button
                    type="button"
                    onClick={onEditBanner}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 dark:bg-gray-900/80 hover:bg-white text-gray-800 dark:text-white border border-gray-200/50 dark:border-gray-700/50 shadow-sm transition-all focus:outline-none cursor-pointer"
                    title="Edit Banner"
                >
                    <i className="bx bx-edit-alt text-lg"></i>
                </button>
            )}
        </div>
    )
}

export default Banner