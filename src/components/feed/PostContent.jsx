"use client";
import React, { useState } from 'react'

const PostContent = ({ content = "" }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const characterLimit = 150;
    const isLongText = content.length > characterLimit;
    const textToDisplay = isExpanded
        ? content
        : isLongText
            ? content.slice(0, characterLimit)
            : content;

    return (
        <div className="">
            <p className="text-base text-gray-800 dark:text-gray-200 leading-relaxed wrap-break-word whitespace-pre-line">
                {textToDisplay}

                {isLongText && !isExpanded && "..."}

                {isLongText && (
                    <button
                        type="button"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="ml-1.5 font-semibold cursor-pointer text-indigo-600 dark:text-indigo-400 hover:underline focus:outline-none select-none text-sm inline-block"
                    >
                        {isExpanded ? "Show less" : "more"}
                    </button>
                )}
            </p>
        </div>
    )
}

export default PostContent