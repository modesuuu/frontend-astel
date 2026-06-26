"use block";
"use client";
import React from 'react';
import InboxList from './InboxList';

const InboxSidebar = ({ messages, selectedId, onSelectId }) => {
    return (
        <section className="fixed right-0 top-0 z-30 flex h-screen max-w-90 flex-col bg-white dark:bg-gray-900 border-l border-gray-100 dark:border-gray-800 px-6 py-6 shadow-sm">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-950 dark:text-white tracking-tight">
                    Inbox
                </h1>
            </div>

            {/* Scrollable Container List Cards */}
            <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                {messages.map((item) => (
                    <InboxList
                        key={item.id}
                        item={item}
                        isActive={item.id === selectedId}
                        onClick={() => onSelectId(item.id)}
                    />
                ))}
            </div>
        </section>
    )
}

export default InboxSidebar