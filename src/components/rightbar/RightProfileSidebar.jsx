"use block";
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import ProfileSummaryCard from './ProfileSummaryCard';
import DetailedPostForm from './DetailedPostForm';

const RightProfileSidebar = () => {

    const pathname = usePathname();
    const [isEditing, setIsEditing] = useState(false);
    const containerRef = useRef(null);

    // 2. CEK APAKAH SEDANG DI HALAMAN COLLABORATIONS
    const isCollabPage = pathname === '/dasboard/collaborations';

    const currentUser = { name: "Andi", avatar: "" };

    useEffect(() => {
        if (!containerRef.current) return;
        gsap.fromTo(
            containerRef.current.children,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.05 }
        );
    }, [isEditing, pathname]);

    return (
        <section className="fixed right-0 top-0 z-30 flex h-screen w-[320px] flex-col justify-between bg-white dark:bg-gray-900 border-l border-gray-100 dark:border-gray-800/60 px-6 py-8 shadow-sm transition-colors">
            <div ref={containerRef} className="w-full h-full flex flex-col justify-between">

                {!isEditing ? (
                    <>
                        <ProfileSummaryCard user={currentUser} />

                        {/* WIDGET INPUTAN BAWAH */}
                        <div className="w-full bg-gray-100 dark:bg-gray-800/60 border border-gray-200/20 rounded-3xl p-4 shadow-inner">
                            <button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                className="w-full py-2.5 px-4 bg-primary hover:bg-indigo-700 text-white text-xs font-medium rounded-2xl transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] transform"
                            >
                                {/* 3. DYNAMIC TEXT & ICON */}
                                <i className={isCollabPage ? 'bx bx-community text-xl' : 'hidden'}></i>
                                {isCollabPage ? 'Make Collaborations' : 'Post Something'}
                            </button>

                            <div className="flex items-center justify-between px-1 mt-3">
                                <div className="flex items-center gap-3 text-gray-400 text-[11px] font-medium">
                                    <span className="flex items-center gap-1"><i className="bx bx-folder"></i> File</span>
                                    <span className="flex items-center gap-1"><i className="bx bx-image"></i> Image</span>
                                </div>
                                <span className="px-4 py-1.5 rounded-full bg-gray-300 dark:bg-gray-800 text-[11px] text-gray-400 font-medium">Send</span>
                            </div>
                        </div>
                    </>
                ) : (
                    /* OPER PROPS MODE HALAMAN KE FORM */
                    <DetailedPostForm isCollabMode={isCollabPage} onClose={() => setIsEditing(false)} />
                )}

            </div>
        </section>
    )
}

export default RightProfileSidebar