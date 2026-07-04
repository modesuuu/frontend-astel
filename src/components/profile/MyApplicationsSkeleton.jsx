import React from "react";
export function MyApplicationsSkeleton (){
  return (
    <div className="flex flex-col gap-4 mt-6 animate-pulse">
      <div className="w-full h-64 rounded-2xl bg-gray-200 dark:bg-gray-800" />
    </div>
  );
};

export default function MyAppsSkeleton({ count = 3 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <MyApplicationsSkeleton key={i} />
      ))}
    </>
  );
}