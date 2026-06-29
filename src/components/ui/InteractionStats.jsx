  "use client";

  import Link from "next/link";
  import { ROUTES } from "@/constants/routes";
  import usePostAction from "@/hooks/usePostAction";

  const InteractionStats = ({ stats, feedId, onLikeSuccess }) => {
    const { like, unlike } = usePostAction();

    const formatNumber = (num) => {
      if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
      }
      return num;
    };

    const handleLikeToggle = async () => {
      if (stats.isLiked) {
        await unlike(feedId);
      } else {
        await like(feedId);
      }
      onLikeSuccess(feedId)
    };
    // console.log("stats", stats);
    return (
      <div className="flex items-center gap-3 px-5 py-3 rounded-2xl w-fit">
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <i className="bx bx-eye-alt text-lg"></i>

          <span>{formatNumber(stats.views)}</span>
        </div>

        <div className="w-px h-4 bg-gray-200" />

        <button
          onClick={handleLikeToggle}
          className={`flex items-center gap-1.5 text-xs transition cursor-pointer ${
            stats.isLiked
              ? "text-rose-500"
              : "text-gray-400 hover:text-rose-500"
          }`}
        >
          <i
            className={`text-lg ${
              stats.isLiked ? "bx bx-heart" : "bx bx-heart"
            }`}
          />

          <span>{formatNumber(stats.likes)}</span>
        </button>

        <div className="w-px h-4 bg-gray-200" />

        <Link
          href={ROUTES.POST_DETAIL(feedId)}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-indigo-500"
        >
          <i className="bx bx-message-circle text-lg"></i>

          <span>{formatNumber(stats.comments)}</span>
        </Link>
      </div>
    );
  };

  export default InteractionStats;
