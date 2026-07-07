import AuthGuard from "@/components/AuthGuard.jsx";
import Sidebar from "@/components/layout/Sidebar";
import RightProfileSidebar from "@/components/rightbar/RightProfileSidebar";
import React from "react";

const layout = ({ children }) => {
  return (
    <AuthGuard>
      <div className="bg-[#F7F6FE] dark:bg-gray-950 min-h-screen">
        <main>
          <Sidebar />
          <RightProfileSidebar classNameSection="hidden md:block" />
          <div className="pr-0 md:pr-26">{children}</div>
        </main>
      </div>
    </AuthGuard>
  );
};

export default layout;
