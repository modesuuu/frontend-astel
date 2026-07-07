// CollaborationDetailSkeleton.jsx

export default function CollaborationDetailSkeleton() {
  return (
    <div className="animate-pulse flex flex-col gap-6">
      {/* ── Profile row ── */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 shrink-0" />
        <div className="flex flex-col gap-2">
          <div className="h-3 w-24 rounded-full bg-gray-200 dark:bg-gray-800" />
          <div className="h-2.5 w-16 rounded-full bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>

      {/* ── Title + description ── */}
      <div className="flex flex-col gap-2">
        <div className="h-5 w-64 rounded-full bg-gray-200 dark:bg-gray-800" />
        <div className="h-3.5 w-48 rounded-full bg-gray-200 dark:bg-gray-800" />
      </div>

      {/* ── Info card: max participants + skill needed ── */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-4 flex flex-col gap-3">
        <div className="flex items-start gap-12">
          {/* Max participants */}
          <div className="flex flex-col gap-2">
            <div className="h-2.5 w-28 rounded-full bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 w-10 rounded-full bg-gray-200 dark:bg-gray-800 mt-1" />
          </div>
          {/* Skill needed */}
          <div className="flex flex-col gap-2">
            <div className="h-2.5 w-24 rounded-full bg-gray-200 dark:bg-gray-800" />
            <div className="flex items-center gap-2 mt-1">
              <div className="h-7 w-24 rounded-full bg-gray-200 dark:bg-gray-800" />
              <div className="hidden md:block h-7 w-24 rounded-full bg-gray-200 dark:bg-gray-800" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Image placeholder ── */}
      <div className="w-full h-72 rounded-2xl bg-gray-200 dark:bg-gray-800" />

      {/* ── Apply section ── */}
      <div className="flex flex-col gap-4">
        {/* "Apply this collaborations" label */}
        <div className="h-3.5 w-44 rounded-full bg-gray-200 dark:bg-gray-800" />

        {/* Avatar + username row */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 shrink-0" />
          <div className="h-3 w-20 rounded-full bg-gray-200 dark:bg-gray-800" />
        </div>

        {/* Textarea placeholder */}
        <div className="w-full h-28 rounded-2xl bg-gray-200 dark:bg-gray-800" />

        {/* Apply button */}
        <div className="h-9 w-20 rounded-full bg-gray-200 dark:bg-gray-800" />
      </div>
    </div>
  );
}
