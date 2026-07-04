"use block";
"use client";
import React from "react";
import InboxList from "./InboxList";
import InboxListSkeleton from "../ui/InboxListItemSkeleton.jsx";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
const renderSection = ({
  title,
  data,
  defaultOpen = false,
  selectedId,
  onSelectId,
}) => {
  console.log("data dai", data);
  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <>
          <DisclosureButton className="flex w-full items-center justify-between rounded-lg px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400">
            <span className="font-md">
              {title} ({data?.length})
            </span>
            <i
              className={`bx bx-chevron-down transition-transform dark:text-gray-400 ${
                open ? "rotate-180" : ""
              }`}
            />
          </DisclosureButton>

          <DisclosurePanel className="mt-2 flex flex-col gap-2 space-y-3">
            {data.length > 0 ? (data?.map((item) => (
              <InboxList
                loading={false}
                key={item.id}
                item={item}
                isActive={item.id === selectedId}
                onClick={() => onSelectId(item.id)}
              />
            ))) : (
              <p className="text-center text-gray-400 dark:text-gray-500">
                No {title} yet
              </p>
            )}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};
const InboxSidebar = ({ messages, selectedId, onSelectId, loading }) => {
  const pending = messages.filter((m) => m.status === "pending");
  const accepted = messages.filter((m) => m.status === "accepted");
  const reject = messages.filter((m) => m.status === "rejected");

  console.log("messages", messages);
  return (
    <section className="fixed right-0 top-0 z-30 flex h-screen w-[320px] flex-col bg-white dark:bg-gray-900 border-l border-gray-100 dark:border-gray-800 px-6 py-6 shadow-sm">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-950 dark:text-white tracking-tight">
          Inbox
        </h1>
      </div>

      {/* Scrollable Container List Cards */}
      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
        {loading || !messages ? (
          <InboxListSkeleton count={7} />
        ) : (
          <div className="flex-1 overflow-y-auto space-y-3">
            {renderSection({
              title: "Pending",
              data: pending,
              defaultOpen: true,
              selectedId,
              onSelectId,
            })}
            {renderSection({
              title: "Accepted",
              data: accepted,
              selectedId,
              onSelectId,
            })}
            {renderSection({
              title: "Rejected",
              data: reject,
              selectedId,
              onSelectId,
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default InboxSidebar;
