"use client";
import React, { useState, use } from 'react';
import Link from 'next/link';
import Profile from '@/components/profile/Profile';
import PostContent from '@/components/feed/PostContent';
import PostGallery from '@/components/feed/PostGallery';
import CollabMeta from '@/components/collaborations/CollabMeta';
import CollabApplyForm from '@/components/collaborations/CollabApplyForm';

// dummy images
import img1 from '@/assets/images/dummy/image1.png'
import img2 from '@/assets/images/dummy/image2.png'
import img3 from '@/assets/images/dummy/image3.png'
import img4 from '@/assets/images/dummy/image4.png'
import img5 from '@/assets/images/dummy/image5.png'

const CollaborationsDetail = ({ params: paramsPromise }) => {

    // dummy data, nanti diganti pake fetch data dari API
    const params = use(paramsPromise);
    const collabId = params.id;

    const [collabData, setCollabData] = useState({
        id: collabId,
        username: "Russel",
        time: "2 hours ago",
        avatarUrl: "",
        title: "UI/UX Designer Need!!",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        maxParticipants: "0/4",
        skills: ["Coding", "Coding", "Coding", "Coding", "Coding", "Coding", "Coding", "Coding"],
        media: [
            img1,
            img2,
            img3,
            img4,
            img5,
        ]
    });

    const handleApplyCollab = (message) => {
        alert(`Aplikasi kolaborasi terkirim dengan pesan: "${message}"`);
    };

    return (
        <div className="pt-6 relative mx-60">

            <div className="flex items-center gap-4 border-b border-gray-100 dark:border-gray-800 pb-4 mb-4">
                <Link
                    href="/dasboard/collaborations"
                    className="text-gray-600 dark:text-gray-400 flex items-center hover:text-black dark:hover:text-white transition-colors"
                >
                    <i className="bx bx-arrow-left-stroke text-2xl"></i>
                </Link>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Collaborations</h1>
            </div>

            {/* PROFIL PEMBUAT PROJECT */}
            <Profile
                avatar={collabData.avatarUrl}
                name={collabData.username}
                time={collabData.time}
            />

            {/* JUDUL DAN DESKRIPSI UTAMA */}
            <div className="mt-4 flex flex-col gap-2">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    {collabData.title}
                </h2>
                <PostContent content={collabData.description} />
            </div>

            {/* KOMPONEN BARU: METADATA & SKILLS */}
            <CollabMeta
                maxParticipants={collabData.maxParticipants}
                skills={collabData.skills}
            />

            {/* GALERI MEDIA (MENGGUNAKAN LIGHTBOX KITA SEBELUMNYA) */}
            <div className="mt-4">
                <PostGallery images={collabData.media} />
            </div>

            {/* KOMPONEN BARU: FORM LAMARAN / APPLY */}
            <CollabApplyForm onApply={handleApplyCollab} />

        </div>
    )
}

export default CollaborationsDetail