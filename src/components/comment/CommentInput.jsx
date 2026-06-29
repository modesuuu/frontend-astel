"use client"
import React, { useState } from 'react'

const CommentInput = ({ onSendComment, avatar }) => {

    const [inputComment, setInputComment] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputComment.trim()) return;

        onSendComment(inputComment);
        setInputComment("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-3 py-4 border-b border-gray-100 dark:border-gray-800">
            <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden relative shrink-0">
                <img src={avatar} alt="My Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex items-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full px-4 py-2">
                <input
                    type="text"
                    placeholder="Comment"
                    value={inputComment}
                    onChange={(e) => setInputComment(e.target.value)}
                    className="w-full bg-transparent text-sm focus:outline-none text-gray-900 dark:text-white placeholder-gray-400"
                />
            </div>
            <button
                type="submit"
                disabled={!inputComment.trim()}
                className="px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium text-sm transition-all shadow-sm select-none"
            >
                Send
            </button>
        </form>
    )
}

export default CommentInput