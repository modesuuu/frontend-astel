"use client"
import CollabCard from '@/components/collaborations/CollabCard';
import Header from '@/components/layout/Header';
import React from 'react'

const Collaborations = () => {

    // dummy data
    const dummyCollabs = [
        {
            id: 1,
            title: "UI/UX Designer Need!!",
            description: "Hi everyone, today I was on the most beautiful mountain in the world, I also want to say hi to Silena, Olya and Davis!",
            image: null,
            author: { username: "Russel", time: "2 hours ago", avatarUrl: "" }
        },
        {
            id: 2,
            title: "UI/UX Designer Need!!",
            description: "baok tant to say hi to Silena, Olya and Davis!",
            image: null,
            author: { username: "Russel", time: "2 hours ago", avatarUrl: "" }
        },
        {
            id: 3,
            title: "UI/UX Designer Need!!",
            description: "Hi everyone, today I was on the most beautiful mountain in the world, I also want to say hi to Silena, Olya and Davis!",
            image: null,
            author: { username: "Russel", time: "2 hours ago", avatarUrl: "" }
        },
        {
            id: 4,
            title: "UI/UX Designer Need!!",
            description: "Hi everyone, today I was on the most beautiful mountain in the world, I also want to say hi to Silena, Olya and Davis!",
            image: null,
            author: { username: "Russel", time: "2 hours ago", avatarUrl: "" }
        }
    ];

    return (
        <section className="pt-6 relative">
            <div className="mx-60">
                {/* Panggil Header tanpa perlu oper state lagi */}
                <Header />

                {/* LAYOUT GRID 2 KOLOM UNTUK COLLABORATIONS */}
                <div className="grid grid-cols-2 gap-6 mt-6">
                    {dummyCollabs.map((project) => (
                        <CollabCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Collaborations