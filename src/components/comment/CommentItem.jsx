import React from "react";
import Profile from "../profile/Profile";

const CommentItem = ({ comment, onDelete, currentUserId }) => {
  const isOwner = comment.userId === currentUserId;
  {
    isOwner && <button onClick={() => onDelete(comment._id)}>Delete</button>;
  }
  return (
    <div className="relative flex flex-col gap-2 border-b border-gray-50 dark:border-gray-900/50 pb-4 last:border-0">
      <Profile
        avatar={comment.avatarUrl}
        name={comment.username}
        time={comment.time}
      />
      {isOwner && (
        <button
          className="group absolute top-0 right-0 p-3 rounded-full "
          onClick={() => onDelete(comment.id)}
        >
          {" "}
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 opacity-70 group-hover:text-red-500"
          >
            <path
              fillRule="evenodd"
              d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}

      <div className="pl-13 flex flex-col gap-1">
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed wrap-break-word whitespace-pre-line">
          {comment.text}
        </p>
      </div>
    </div>
  );
};

export default CommentItem;
