"use client"
import React from 'react'
import Link from 'next/link'
import Profile from '../profile/Profile'

const CollabCard = ({ project }) => {
    return (
        <Link href={`/dasboard/collaborations/${project.id}`} className="w-full">
        <div className="flex flex-col gap-4 p-4 rounded-2xl hover:bg-white">
            {/* Gambar Project masih Abu-abu placeholder */}
            <div className="w-full h-48 bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden relative">
                {project.image && (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                )}
            </div>

            {/* Info*/}
            <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold text-black leading-snug">
                    {project.title}
                </h3>
                <p className="text-sm text-secondary line-clamp-2">
                    {project.description}
                </p>
            </div>

            {/* Profil */}
            <div className="mt-2 pt-2 ">
                <Profile
                    avatar={project.author.avatarUrl}
                    name={project.author.username}
                    time={project.author.time}
                />
            </div>
        </div>
        </Link>
    )
}

export default CollabCard