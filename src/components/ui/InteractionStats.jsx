"use block";
"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const InteractionStats = ({ initialStats, feedId }) => {

    const formatNumber = (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num;
    };

    // State internal dinamis untuk simulasi interaksi langsung
    const [likes, setLikes] = useState(initialStats?.likes || 0);
    const [isLiked, setIsLiked] = useState(false);

    const [commentsCount, setCommentsCount] = useState(initialStats?.comments || 0);
    const [views, setViews] = useState(initialStats?.views || 0);

    const handleLikeToggle = () => {
        if (isLiked) {
            setLikes(prev => prev - 1);
            setIsLiked(false);
        } else {
            setLikes(prev => prev + 1);
            setIsLiked(true);
        }
    };

    const detailFeedUrl = `/dasboard/feed/${feedId}`;

    return (
        <div className="flex items-center gap-3 dark:bg-gray-900 dark:border-gray-800/60 px-5 py-2.5 rounded-2xl w-fit  select-none transition-colors">

            {/* 1. STATS: VIEWS (Hanya Baca / Statis) */}
            <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 text-xs">
                <i className="bx bx-eye-alt text-lg"></i>
                <span className="font-medium tabular-nums">
                    {formatNumber(views)}
                </span>
            </div>

            <div className="w-px h-4 bg-gray-200 dark:bg-gray-800" />

            {/* 2. STATS: LIKES (Dinamis & Interaktif) */}
            <button
                type="button"
                onClick={handleLikeToggle}
                className={`flex items-center gap-1.5 text-xs font-medium transition-all duration-200 active:scale-95 focus:outline-none cursor-pointer ${isLiked
                        ? 'text-rose-500 dark:text-rose-400 scale-105'
                        : 'text-gray-400 dark:text-gray-500 hover:text-rose-500 dark:hover:text-rose-400'
                    }`}
            >
                <i className={`text-lg transition-transform duration-200 ${isLiked ? 'bx bxs-heart animate-ping-once' : 'bx bx-heart'}`}></i>
                <span className="tabular-nums">{formatNumber(likes)}</span>
            </button>

            <div className="w-px h-4 bg-gray-200 dark:bg-gray-800" />

            {/* 3. STATS: COMMENTS (Interaktif / Trigger Modal atau Fitur Lain) */}
            <Link
                href={detailFeedUrl}
                className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 hover:text-indigo-500 dark:hover:text-indigo-400 text-xs font-medium transition-all duration-200 active:scale-95 focus:outline-none cursor-pointer"
            >
                <i className="bx bx-message-circle text-lg"></i>
                <span className="tabular-nums">{formatNumber(commentsCount)}</span>
            </Link>

        </div>
    )
}

export default InteractionStats