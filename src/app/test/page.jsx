import InboxListSkeleton, { InboxListItemSkeleton } from "@/components/ui/InboxListItemSkeleton.jsx";
import React from "react";

const page = () => {
  return (
    <div className="flex-1 bg-transparent ml-60 mt-6 animate-pulse">
      <InboxListSkeleton count={9}></InboxListSkeleton>
    </div>
  );
};

export default page;
