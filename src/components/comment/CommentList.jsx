import React from 'react'
import CommentItem from './CommentItem'

const CommentList = ({ comments = [] }) => {
    return (
        <div className="mt-4 space-y-5">
            {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
            ))}
        </div>
    )
}

export default CommentList