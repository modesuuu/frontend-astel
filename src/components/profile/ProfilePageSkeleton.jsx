// ProfilePageSkeleton.jsx

export default function ProfilePageSkeleton() {
  return (
    <div className="animate-pulse">
      {/* ── Banner ── */}
      <div className="w-full h-52 rounded-3xl bg-gray-200 dark:bg-gray-800" />

      <div className="flex flex-col md:flex-row gap-6 md:justify-between pb-6 w-full border-b md:border-b-0 border-gray-200 dark:border-gray-900 mt-4">
        {/* ── Kiri: Avatar + nama + bio + tombol ── */}
        <div className="flex flex-col gap-4 min-w-0">
          {/* Avatar — overlap banner */}
          <div className="w-28 h-28 rounded-full bg-gray-300 dark:bg-gray-700 border-4 border-white dark:border-gray-950 -mt-16 shrink-0" />

          {/* Nama */}
          <div className="flex flex-col gap-2">
            <div className="h-6 w-56 rounded-full bg-gray-200 dark:bg-gray-800" />
            <div className="h-3.5 w-20 rounded-full bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* Bio lines */}
          <div className="flex flex-col gap-2 max-w-xs">
            <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-800" />
            <div className="h-3 w-11/12 rounded-full bg-gray-200 dark:bg-gray-800" />
            <div className="h-3 w-4/5 rounded-full bg-gray-200 dark:bg-gray-800" />
            <div className="h-3 w-3/5 rounded-full bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* Edit Profile + Setting buttons */}
          <div className="flex items-center gap-3 mt-2">
            <div className="h-9 w-28 rounded-full bg-gray-200 dark:bg-gray-800" />
            <div className="h-9 w-24 rounded-full bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>

        {/* ── Kanan: Social media + Skills ── */}
        <div className="flex flex-col items-end gap-6 pt-4 px-6 shrink-0">
          {/* Social Media label + pills */}
          <div className="flex flex-col items-end gap-2.5">
            <div className="h-3 w-24 rounded-full bg-gray-200 dark:bg-gray-800" />
            <div className="flex items-center gap-2">
              <div className="h-8 w-20 rounded-full bg-gray-300 dark:bg-gray-700" />
              <div className="h-8 w-24 rounded-full bg-gray-300 dark:bg-gray-700" />
              <div className="h-8 w-20 rounded-full bg-gray-300 dark:bg-gray-700" />
            </div>
          </div>

          {/* Skills label + pills */}
          <div className="flex flex-col items-end gap-2.5">
            <div className="h-3 w-14 rounded-full bg-gray-200 dark:bg-gray-800" />
            <div className="flex items-center gap-2">
              <div className="h-7 w-24 rounded-full bg-gray-200 dark:bg-gray-800" />
              <div className="h-7 w-32 rounded-full bg-gray-200 dark:bg-gray-800" />
              <div className="h-7 w-28 rounded-full bg-gray-200 dark:bg-gray-800" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
