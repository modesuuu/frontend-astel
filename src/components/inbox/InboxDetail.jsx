"use block";
"use client";

import React from "react";
import Profile from "@/components/profile/Profile";
import InboxDetailSkeleton from "../ui/InboxDetailSkeleton.jsx";


const InboxDetail = ({ activeMessage, loading, onAccept, onReject }) => {
  if (!activeMessage) {
    return (
     <InboxDetailSkeleton />
    );
  }
  return (
    <div className="flex-1 bg-transparent ml-60 mt-6">
      {/* Sender Header Profile Info */}
      <div className="flex items-center justify-between mb-6">
        <Profile
          avatar={activeMessage.sender.avatar}
          name={activeMessage.sender.name}
          time={activeMessage.time}
          id={activeMessage.sender.id}
        />
      </div>

      {/* Message Content Body */}
      <div className="pl-13 space-y-6">
        <h2 className="text-xl font-bold text-gray-950 dark:text-white">
          {activeMessage.subject}
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl font-light">
          {activeMessage.message}
        </p>

        {/* Action Call to Buttons (Accept & Reject) */}
        <div className="flex items-center gap-3 pt-2">
          {activeMessage.status === "pending" ? (
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                disabled={loading}
                onClick={() => onAccept(activeMessage.id)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-indigo-700 active:scale-95 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
              >
                <i className="bx bx-check text-sm"></i>
                Accept
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={() => onReject(activeMessage.id)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-500 hover:bg-red-600 active:scale-95 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
              >
                <i className="bx bx-x text-sm"></i>
                Reject
              </button>
            </div>
          ) : (
            <div className="pt-2">
              <div
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold
        ${
          activeMessage.status === "accepted"
            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
        }`}
              >
                <i
                  className={`bx ${
                    activeMessage.status === "accepted"
                      ? "bx-check-circle"
                      : "bx-x-circle"
                  }`}
                ></i>

                {activeMessage.status === "accepted"
                  ? "Application Accepted"
                  : "Application Rejected"}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InboxDetail;
