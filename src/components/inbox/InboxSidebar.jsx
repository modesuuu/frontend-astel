"use client";
import React, { useState, Fragment } from "react";
import InboxList from "./InboxList";
import InboxListSkeleton from "../ui/InboxListItemSkeleton.jsx";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";

const renderSection = ({
  title,
  data,
  defaultOpen = false,
  selectedId,
  onSelectId,
}) => {
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
            {data.length > 0 ? (
              data?.map((item) => (
                <InboxList
                  loading={false}
                  key={item.id}
                  item={item}
                  isActive={item.id === selectedId}
                  onClick={() => onSelectId(item.id)}
                />
              ))
            ) : (
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
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const pending = messages.filter((m) => m.status === "pending");
  const accepted = messages.filter((m) => m.status === "accepted");
  const reject = messages.filter((m) => m.status === "rejected");

  const renderBody = (onNavigate) => (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-950 dark:text-white tracking-tight">
          Inbox
        </h1>
      </div>

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
              onSelectId: (id) => {
                onSelectId(id);
                onNavigate?.();
              },
            })}
            {renderSection({
              title: "Accepted",
              data: accepted,
              selectedId,
              onSelectId: (id) => {
                onSelectId(id);
                onNavigate?.();
              },
            })}
            {renderSection({
              title: "Rejected",
              data: reject,
              selectedId,
              onSelectId: (id) => {
                onSelectId(id);
                onNavigate?.();
              },
            })}
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* === DESKTOP: sidebar statis, cuma tampil >= md === */}
      <section className="fixed right-0 top-0 z-30 hidden h-screen w-[320px] flex-col bg-white dark:bg-gray-900 border-l border-gray-100 dark:border-gray-800 px-6 py-6 shadow-sm md:flex">
        {renderBody()}
      </section>

      {/* === MOBILE: tombol trigger, di kanan atas === */}
      <button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        aria-label="Open inbox"
        className="fixed right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm dark:bg-gray-900 md:hidden"
      >
        <i className="bx bx-inbox text-xl text-gray-700 dark:text-gray-200"></i>
        {pending.length > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-white">
            {pending.length}
          </span>
        )}
      </button>

      {/* === MOBILE: drawer dari kanan === */}
      <Transition show={isMobileOpen} as={Fragment}>
        <Dialog onClose={setIsMobileOpen} className="relative z-50 md:hidden">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
          </TransitionChild>

          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="ease-in duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <DialogPanel className="fixed right-0 top-0 flex h-screen w-80 max-w-[85vw] flex-col bg-white px-6 py-6 shadow-lg dark:bg-gray-900">
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                aria-label="Close inbox"
                className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <i className="bx bx-x text-2xl"></i>
              </button>
              <div className="mt-8 flex h-full flex-col">
                {renderBody(() => setIsMobileOpen(false))}
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
};

export default InboxSidebar;