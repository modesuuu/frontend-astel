"use block";
"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import InboxList from "@/components/inbox/InboxList";
import InboxDetail from "@/components/inbox/InboxDetail";
import InboxSidebar from "@/components/inbox/InboxSidebar";
import { mapInboxList } from "@/mapping/inbox.mapping.js";
import useInbox from "@/hooks/useInbox.js";
import useInboxAction from "@/hooks/useInboxAction.js";

const Inbox = () => {
  const { inbox, updateInboxStatus, loading: inboxLoading } = useInbox();
  const { accept, reject, loading: inboxActionLoading } = useInboxAction(updateInboxStatus);
  // const [messages] = useState([
  //   {
  //     id: "msg-1",
  //     subject: "Collaborations",
  //     time: "2 hours ago",
  //     message:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  //     sender: {
  //       id: "user-russel",
  //       name: "Russel",
  //       avatar: "",
  //     },
  //   },
  //   {
  //     id: "msg-2",
  //     subject: "Design Review Portfolio",
  //     time: "1 day ago",
  //     message:
  //       "Hi Andi! I love your frontend design portfolio with GSAP animations. Let's discuss about a web project opportunity next week.",
  //     sender: {
  //       id: "user-alex",
  //       name: "Alex Rivera",
  //       avatar: "",
  //     },
  //   },
  // ]);

  // State untuk melacak pesan mana yang sedang aktif dibaca user

  const messages = mapInboxList(inbox || []);
  console.log("loading", inboxLoading || inboxActionLoading);
  console.log("message", messages);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (messages.length > 0 && !selectedId) {
      setSelectedId(messages[0].id);
    }
  }, [messages, selectedId]);
  const handleAccept = async (id) => {
    await accept(id);
    const next = messages.find((m) => m.id !== id);
    setSelectedId(next ? next.id : null);
  };

  const handleReject = async (id) => {
    await reject(id);
    const next = messages.find((m) => m.id !== id);
    setSelectedId(next ? next.id : null);
  };

  const activeMessage = messages.find((m) => m.id === selectedId);

  console.log("activeMessage", activeMessage);
  return (
    <div className="h-screen pt-3 transition-colors">
      {/* Aplikasi Navigasi Kiri */}
      <Sidebar />

      {/* Main Container Layout */}
      <main className=" flex gap-8 pr-0 items-start">
        {/* SISI KIRI/TENGAH: Tempat Detail Isi Surat */}
        <InboxDetail
          activeMessage={activeMessage}
          onAccept={handleAccept}
          onReject={handleReject}
          loading={inboxLoading || inboxActionLoading}
        />

        {/* SISI KANAN: Sidebar List Inbox Panel */}
        <InboxSidebar
          loading={inboxLoading || inboxActionLoading}
          messages={messages}
          selectedId={selectedId}
          onSelectId={setSelectedId}
        />
      </main>
    </div>
  );
};

export default Inbox;
