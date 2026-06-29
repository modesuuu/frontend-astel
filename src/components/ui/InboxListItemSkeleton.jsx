// InboxListSkeleton.jsx — taruh di path yang sama dengan InboxList

export function InboxListItemSkeleton() {
  return (
    <div className="p-4 rounded-2xl border border-transparent animate-pulse">
      {/* Profile row */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-800 shrink-0" />
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-3 w-28 rounded-full bg-gray-200 dark:bg-gray-800" />
          <div className="h-2.5 w-14 rounded-full bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>

      {/* Subject + preview */}
      <div className="mt-3 pl-12 flex flex-col gap-2">
        <div className="h-3 w-2/5 rounded-full bg-gray-200 dark:bg-gray-800" />
        <div className="h-2.5 w-4/5 rounded-full bg-gray-200 dark:bg-gray-800" />
      </div>
    </div>
  );
}

export default function InboxListSkeleton({ count = 5 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <InboxListItemSkeleton key={i} />
      ))}
    </>
  );
}
