// FeedSkeleton.jsx — taruh di @/components/feed/FeedSkeleton.jsx

export function FeedCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 mt-6 animate-pulse">
      {/* Profile row */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 shrink-0" />
        <div className="flex flex-col gap-2">
          <div className="h-3 w-28 rounded-full bg-gray-200 dark:bg-gray-800" />
          <div className="h-2.5 w-16 rounded-full bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>

      {/* Post content lines */}
      <div className="flex flex-col gap-2">
        <div className="h-3 w-3/4 rounded-full bg-gray-200 dark:bg-gray-800" />
        <div className="h-2.5 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30" />
      </div>

      {/* Image placeholder */}
      <div className="w-full h-64 rounded-2xl bg-gray-200 dark:bg-gray-800" />

      {/* Interaction stats row */}
      <div className="flex items-center gap-4 pt-1">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-800" />
          <div className="h-2.5 w-6 rounded-full bg-gray-200 dark:bg-gray-800" />
        </div>
        <div className="w-px h-3 bg-gray-200 dark:bg-gray-700" />
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-800" />
          <div className="h-2.5 w-4 rounded-full bg-gray-200 dark:bg-gray-800" />
        </div>
        <div className="w-px h-3 bg-gray-200 dark:bg-gray-700" />
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-800" />
          <div className="h-2.5 w-4 rounded-full bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    </div>
  );
}

export default function FeedSkeleton({ count = 3 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <FeedCardSkeleton key={i} />
      ))}
    </>
  );
}
