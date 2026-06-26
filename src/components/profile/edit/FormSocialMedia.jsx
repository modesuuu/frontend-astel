import React, { useState } from 'react'

const PLATFORM_OPTIONS = ["github", "instagram", "linkedin", "twitter", "youtube"];

const FormSocialMedia = ({ socialMediaList, onAddSocial, onRemoveSocial }) => {
    const [newSocial, setNewSocial] = useState({ platform: "github", url: "" });

    const handleAdd = () => {
        if (!newSocial.url.trim()) return;
        onAddSocial(newSocial);
        setNewSocial({ platform: "github", url: "" });
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
            <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
                Social Media
            </h2>

            {/* Render Current Saved Social Links */}
            {socialMediaList.length > 0 && (
                <ul className="mb-4 space-y-2">
                    {socialMediaList.map((s) => (
                        <li
                            key={s.platform}
                            className="flex items-center justify-between rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800/60 px-4 py-2 text-sm"
                        >
                            <span className="capitalize font-semibold text-primary dark:text-indigo-400 w-24 flex items-center gap-1.5">
                                <i className={`bx bxl-${s.platform === 'twitter' ? 'twitter' : s.platform} text-base`}></i>
                                {s.platform}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400 truncate flex-1 mx-2 text-xs">
                                {s.url}
                            </span>
                            <button
                                type="button"
                                onClick={() => onRemoveSocial(s.platform)}
                                className="text-red-400 hover:text-red-600 dark:hover:text-red-400 text-xs font-semibold cursor-pointer focus:outline-none"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {/* Inputs Add New Social Dynamic Group */}
            <div className="flex gap-2 items-center">
                <select
                    value={newSocial.platform}
                    onChange={(e) => setNewSocial((p) => ({ ...p, platform: e.target.value }))}
                    className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-3 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none cursor-pointer"
                >
                    {PLATFORM_OPTIONS.map((p) => (
                        <option key={p} value={p}>
                            {p.charAt(0).toUpperCase() + p.slice(1)}
                        </option>
                    ))}
                </select>

                <input
                    type="url"
                    value={newSocial.url}
                    onChange={(e) => setNewSocial((p) => ({ ...p, url: e.target.value }))}
                    placeholder="https://yourlink.com"
                    className="flex-1 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />

                <button
                    type="button"
                    onClick={handleAdd}
                    className="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-200 transition-colors cursor-pointer"
                >
                    Add
                </button>
            </div>
        </div>
    )
}

export default FormSocialMedia