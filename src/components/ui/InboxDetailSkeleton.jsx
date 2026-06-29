// InboxDetailSkeleton.jsx — taruh di path yang sama dengan InboxDetail

export default function InboxDetailSkeleton() {
  return (
    <div className="flex-1 bg-transparent ml-60 mt-6 animate-pulse">
      {/* Profile header row */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-800 shrink-0" />
          <div className="flex flex-col gap-2">
            <div className="h-3 w-32 rounded-full bg-gray-200 dark:bg-gray-800" />
            <div className="h-2.5 w-16 rounded-full bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="pl-12 space-y-5">
        {/* Subject */}
        <div className="h-5 w-56 rounded-full bg-gray-200 dark:bg-gray-800" />

        {/* Message lines */}
        <div className="flex flex-col gap-2.5 max-w-2xl">
          <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-800" />
          <div className="h-3 w-11/12 rounded-full bg-gray-200 dark:bg-gray-800" />
          <div className="h-3 w-4/5 rounded-full bg-gray-200 dark:bg-gray-800" />
          <div className="h-3 w-3/5 rounded-full bg-gray-200 dark:bg-gray-800" />
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 pt-2">
          <div className="h-9 w-24 rounded-full bg-gray-200 dark:bg-gray-800" />
          <div className="h-9 w-24 rounded-full bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    </div>
  );
}
