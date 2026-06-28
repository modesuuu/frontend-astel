"use client";
import React from "react";
import Link from "next/link";
import Profile from "../profile/Profile";
import { ROUTES } from "@/constants/routes.js";
import { useRouter } from "next/navigation.js";
import timeAgo from "@/utils/timeAgo.js";

const CollabCard = ({ project }) => {
  const router = useRouter();
  console.log("project::", project);
  return (
    <div
      
      className="w-full"
    >
      <div onClick={() => router.push(ROUTES.COLLAB_DETAIL(project.id))} className="flex flex-col gap-4 p-4 rounded-2xl hover:bg-white">
        {/* Gambar Project masih Abu-abu placeholder */}
        <div className="w-full h-48 bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden relative">
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
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
            id={project.author.id}
            avatar={project.author.avatarUrl}
            name={project.author.username}
            time={timeAgo(project.time)}
          />
        </div>
      </div>
    </div>
  );
};

export default CollabCard;
