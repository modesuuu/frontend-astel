import React from 'react'
import Image from 'next/image';

const CurrentUserProfile = ({ user }) => {

    // dummy data
    const defaultUserData = {
        name: "Anda",
        avatarUrl: "/images/default-avatar.png"
    };
    const activeUser = user || defaultUserData;

    return (
        <div className="flex items-center gap-3 select-none">
            {/* Image */}
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden relative shrink-0">
                <Image
                    src={activeUser.avatarUrl || "/images/default-avatar.png"}
                    alt={`${activeUser.name}'s profile`}
                    fill
                    sizes="32px"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Nama */}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate max-w-37.5">
                {activeUser.name}
            </span>
        </div>
    )
}

export default CurrentUserProfile