import React from 'react'

const CollabMeta = ({ maxParticipants = "0/4", skills = [] }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-start gap-6 my-4 bg-gray-50/50 dark:bg-gray-900/30 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
            {/* Max Participants */}
            <div className="flex flex-col gap-1 shrink-0">
                <span className="text-xs text-gray-400 font-medium">Max participants</span>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 ">
                    <i className="bx bx-community text-lg text-indigo-500"></i>
                    <span>{maxParticipants}</span>
                </div>
            </div>

            {/* Skill Needed */}
            <div className="flex flex-col gap-1.5">
                <span className="text-xs text-gray-400 font-medium">Skill needed</span>
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#D3CFFF] text-indigo-600 text-xs font-medium"
                        >
                            <span className="text-base opacity-60">{"{ }"}</span>
                            <span>{skill}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CollabMeta