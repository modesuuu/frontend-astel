"use client";
import React, { useState, use } from "react";
import Link from "next/link";
import PostContent from "@/components/feed/PostContent";
import PostGallery from "@/components/feed/PostGallery";
import CommentInput from "@/components/comment/CommentInput";
import CommentList from "@/components/comment/CommentList";
import Profile from "@/components/profile/Profile";

// dummy
import img1 from '@/assets/images/dummy/image1.png'
import img2 from '@/assets/images/dummy/image2.png'
import img3 from '@/assets/images/dummy/image3.png'
import img4 from '@/assets/images/dummy/image4.png'
import img5 from '@/assets/images/dummy/image5.png'
import InteractionStats from "@/components/ui/InteractionStats";

const FeedDetailPage = ({ params: paramsPromise }) => {
    const params = use(paramsPromise);
    const postId = params.id;

    const [dummyPost, setDummyPost] = useState({
        id: postId,
        username: "Russel",
        time: "2 hours ago",
        content: "Hi everyone, today I was on the most beautiful mountain in the world, I also want to say hi to Silena, Olya and Davis! Kebetulan pemandangannya indah banget dan udaranya segar sekali di sini. Kami mendaki dari jam 4 subuh demi mengejar momen sunrise yang golden hour banget! Jangan lupa buat mampir ke sini kalau kalian lagi liburan ya guys!",
        // dummy media
        media: [
            img1,
            img2,
            img3,
            img4,
            img5
        ]
    });

    const [comments, setComments] = useState([
        {
            id: 1,
            username: "User A",
            avatarUrl: "/images/default-avatar.png",
            time: "2 hours ago",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            likes: "12"
        },
        {
            id: 2,
            username: "User B",
            avatarUrl: "/images/default-avatar.png",
            time: "1 hours ago",
            text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            likes: "4"
        }
    ]);

    const handleAddComment = (text) => {
        const newComment = {
            id: Date.now(),
            username: "Anda (Current User)",
            avatarUrl: "/images/default-avatar.png",
            time: "Just now",
            text: text,
            likes: "0"
        };

        setComments([newComment, ...comments]);

    };

    const samplePostData = {
        views: 1240,
        likes: 342,
        comments: 18
    };

    return (
        <div className="pt-6 relative mx-60">
            {/* TOP BAR / NAVIGATION */}
            <div className="flex items-center gap-4 border-b border-gray-100 dark:border-gray-800 pb-4 mb-4">
                <Link href="/dasboard/feed" className="text-gray-600 dark:text-gray-400 flex items-center hover:text-black dark:hover:text-white">
                    <i className="bx bx-arrow-left-stroke text-2xl"></i>
                </Link>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Feeds</h1>
            </div>

            {/* MAIN POST SECTION */}
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-6 mt-6">
                    <Profile avatar={dummyPost.avatarUrl} name={dummyPost.username} time={dummyPost.time} />

                    <div className="flex flex-col">
                        <PostContent content={dummyPost.content} />
                        <PostGallery images={dummyPost.media}/>
                        <InteractionStats initialStats={samplePostData} />
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <CommentInput onSendComment={handleAddComment} />
                <CommentList comments={comments} />
            </div>

        </div>
    );
}

export default FeedDetailPage