import React from 'react'

const FormBasicInfo = ({ form, onChange }) => {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 space-y-4">
            <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Basic Information
            </h2>

            <div>
                <label className="block text-xs font-medium text-gray-400 dark:text-gray-500 mb-1">
                    FULL NAME
                </label>
                <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={onChange}
                    placeholder="Your name"
                    className="w-full text-sm rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-colors"
                />
            </div>

            <div>
                <label className="block text-xs font-medium text-gray-400 dark:text-gray-500 mb-1">BIO</label>
                <textarea
                    name="bio"
                    value={form.bio}
                    onChange={onChange}
                    rows={3}
                    placeholder="Tell us a little about yourself…"
                    className="w-full text-sm rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                />
            </div>

            <div>
                <label className="block text-xs font-medium text-gray-400 dark:text-gray-500 mb-1">
                    INSTITUTION
                </label>
                <input
                    type="text"
                    name="institusi"
                    value={form.institusi}
                    onChange={onChange}
                    placeholder="University / company name"
                    className="w-full text-sm rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-colors"
                />
            </div>
        </div>
    )
}

export default FormBasicInfo