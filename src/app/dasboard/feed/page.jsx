"use client";
import PostGallery from '@/components/feed/PostGallery'
import Sidebar from '@/components/layout/Sidebar'
import React, { useState } from 'react'
import Header from '@/components/layout/Header'
import Profile from '@/components/profile/Profile';
import PostContent from '@/components/feed/PostContent';
import Link from 'next/link';

// dummy images
import img1 from '@/assets/images/dummy/image1.png'
import img2 from '@/assets/images/dummy/image2.png'
import img3 from '@/assets/images/dummy/image3.png'
import img4 from '@/assets/images/dummy/image4.png'
import img5 from '@/assets/images/dummy/image5.png'
import InteractionStats from '@/components/ui/InteractionStats';

const Feeds = () => {

    // dumy data wok
    const dummyPost = {
        id: "post-russel-01",
        username: "Russel",
        time: "2 hours ago",
        content: "Hi everyone, today I was on the most beautiful mountain in the world, I also want to say hi to Silena, Olya and Davis! Kebetulan pemandangannya indah banget dan udaranya segar sekali di sini. Kami mendaki dari jam 4 subuh demi mengejar momen sunrise yang golden hour banget! Jangan lupa buat mampir ke sini kalau kalian lagi liburan ya guys!",
        // dummy media
        media: [
            img1,
            img2,
            img3,
            img4,
        ]
    };

    const samplePostData = {
        views: 1240,
        likes: 342,
        comments: 18
    };

    return (
        <section className="pt-6 relative">
            <div className="mx-60">
                <Header />
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-6 mt-6">
                        <Profile avatar={dummyPost.avatarUrl} name={dummyPost.username} time={dummyPost.time} />

                        <div className="flex flex-col">
                            <PostContent content={dummyPost.content} />
                            <Link href={`/dasboard/feed/${dummyPost.id}`}><h1>View Details test</h1></Link>
                            <PostGallery images={dummyPost.media} />
                            <InteractionStats initialStats={samplePostData} feedId={dummyPost.id} />
                        </div>
                    </div>

                    {/* dummy2 */}
                    <div className="flex flex-col gap-6 mt-6">
                        <Profile avatar={dummyPost.avatarUrl} name={dummyPost.username} time={dummyPost.time} id={dummyPost.id} />

                        <div className="flex flex-col">
                            <PostContent content={dummyPost.content} />
                            <PostGallery images={dummyPost.media} />
                            <InteractionStats initialStats={samplePostData} feedId={dummyPost.id} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Feeds