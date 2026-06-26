import React from 'react'
import Profile from '../profile/Profile'

const CommentItem = ({ comment }) => {
    return (
        <div className="flex flex-col gap-2 border-b border-gray-50 dark:border-gray-900/50 pb-4 last:border-0">
            <Profile
                avatar={comment.avatarUrl}
                name={comment.username}
                time={comment.time}
            />

            <div className="pl-13 flex flex-col gap-1">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed wrap-break-word whitespace-pre-line">
                    {comment.text}
                </p>
            </div>
        </div>
    )
}

export default CommentItem