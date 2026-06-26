"use block";
"use client";
import React from 'react';
import Profile from '@/components/profile/Profile';

const InboxList = ({ item, isActive, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer select-none text-left ${isActive
                    ? 'bg-gray-100 dark:bg-gray-900 border-gray-200/60 dark:border-gray-800'
                    : 'bg-white dark:bg-transparent border-transparent hover:bg-gray-50 dark:hover:bg-gray-900/40'
                }`}
        >
            {/* Menggunakan kembali komponen Profile yang sudah ada */}
            <Profile
                avatar={item.sender.avatar}
                name={item.sender.name}
                time={item.time}
                id={item.sender.id}
            />

            <div className="mt-3 pl-13">
                <h4 className="text-sm font-bold text-gray-950 dark:text-white mb-0.5">
                    {item.subject}
                </h4>
                <p className="text-xs text-gray-400 dark:text-gray-500 line-clamp-1">
                    {item.message}
                </p>
            </div>
        </div>
    )
}

export default InboxList