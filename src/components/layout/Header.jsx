// src/components/layout/Header.jsx
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
    const pathname = usePathname();

    const isFeed = pathname.startsWith('/dasboard/feed');
    const isCollab = pathname.startsWith('/dasboard/collaborations');

    return (
        <div className="sticky top-0 z-10 flex w-full justify-between items-center pb-4 pt-2">
            <h1 className="text-2xl font-medium capitalize">
                {isCollab ? "Collaborations" : "Feeds"}
            </h1>

            <div className="flex items-center gap-4">
                {/* Link ke Halaman Feeds */}
                <Link
                    href="/dasboard/feed"
                    className={`text-base font-medium transition-colors select-none cursor-pointer
                        ${isFeed
                        ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                >
                    Feeds
                </Link>

                {/* Link ke Halaman Collaborations */}
                <Link
                    href="/dasboard/collaborations"
                    className={`text-base font-medium transition-colors select-none cursor-pointer
                    ${isCollab
                        ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                >
                    Collaborations
                </Link>
            </div>
        </div>
    )
}

export default Header;