import CommentItem from "./CommentItem.jsx";

const CommentList = ({ comments = [], currentUserId, onDeleteComment }) => {
  return (
    <div className="mt-4 space-y-5">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          currentUserId={currentUserId}
          onDelete={onDeleteComment}
        />
      ))}
    </div>
  );
};

export default CommentList;
