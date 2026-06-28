"use block";
"use client";
import React, { useState } from 'react'
import CurrentUserProfile from '../profile/CurrentUserProfile';

const CollabApplyForm = (props) => {
    const { onApply, profileApplicant: profile } = props;
    const [reason, setReason] = useState("");

    // BAOK NOTE: nanti data user yang login
    const currentUserData = {
        name: profile?.data?.username || "Anda", 
        avatarUrl: profile?.data?.photo_profile_url || "/images/default-avatar.png"
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!reason.trim()) return;

        onApply(reason);
        setReason("");
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Apply this collaborations
            </h3>

            <CurrentUserProfile user={currentUserData} />

            {/* Textarea Input */}
            <div className="w-full">
                <textarea
                    rows={4}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Writing something"
                    className="w-full p-4 text-sm rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 resize-none transition-colors"
                />
            </div>

            <button
                type="submit"
                disabled={!reason.trim()}
                className="w-fit px-6 py-2 cursor-pointer rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium text-sm transition-all shadow-sm select-none"
            >
                Apply
            </button>
        </form>
    )
}

export default CollabApplyForm