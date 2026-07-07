import { LoadingProfileSkeleton } from "@/components/rightbar/RightProfileSidebar.jsx";
import InboxListSkeleton, { InboxListItemSkeleton } from "@/components/ui/InboxListItemSkeleton.jsx";
import React from "react";

const page = () => {
  return (
    <div className="flex-1 bg-transparent ml-4 md:ml-60 mt-16 md:mt-6 animate-pulse">
      <LoadingProfileSkeleton></LoadingProfileSkeleton>
    </div>
  );
};

export default page;
