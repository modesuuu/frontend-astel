import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Profile = ({ avatar, name, time, id }) => {
    
    const profileTargetUrl = `/profile/${id || 'me'}`;

    return (
        <div className="flex items-center gap-3">
            <Link 
                href={profileTargetUrl}
                className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800 shrink-0 hover:opacity-85 transition-opacity cursor-pointer"
            >
                <Image
                    src={avatar || "/images/default-avatar.png"} 
                    alt={`${name}'s avatar`}
                    fill
                    sizes="40px"
                    className="object-cover"
                />
            </Link>

            {/* Nama & Waktu */}
            <div className="flex flex-col min-w-0">
                <Link 
                    href={profileTargetUrl}
                    className="text-base font-semibold dark:text-white truncate hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                    {name}
                </Link>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                    {time}
                </span>
            </div>
        </div>
    )
}

export default Profile