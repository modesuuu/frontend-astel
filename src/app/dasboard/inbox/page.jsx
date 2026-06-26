"use block";
"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import InboxList from '@/components/inbox/InboxList';
import InboxDetail from '@/components/inbox/InboxDetail';
import InboxSidebar from '@/components/inbox/InboxSidebar';

const Inbox = () => {

  const [messages] = useState([
    {
      id: "msg-1",
      subject: "Collaborations",
      time: "2 hours ago",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      sender: {
        id: "user-russel",
        name: "Russel",
        avatar: ""
      }
    },
    {
      id: "msg-2",
      subject: "Design Review Portfolio",
      time: "1 day ago",
      message: "Hi Andi! I love your frontend design portfolio with GSAP animations. Let's discuss about a web project opportunity next week.",
      sender: {
        id: "user-alex",
        name: "Alex Rivera",
        avatar: ""
      }
    }
  ]);

  // State untuk melacak pesan mana yang sedang aktif dibaca user
  const [selectedId, setSelectedId] = useState("msg-1");
  const activeMessage = messages.find((m) => m.id === selectedId);

  return (
    <div className="h-screen pt-3 transition-colors">
      {/* Aplikasi Navigasi Kiri */}
      <Sidebar />

      {/* Main Container Layout */}
      <main className=" flex gap-8 pr-0 items-start">
        
        {/* SISI KIRI/TENGAH: Tempat Detail Isi Surat */}
        <InboxDetail activeMessage={activeMessage} />

        {/* SISI KANAN: Sidebar List Inbox Panel */}
        <InboxSidebar
        messages={messages}
        selectedId={selectedId}
        onSelectId={setSelectedId}
      />

      </main>
    </div>
  )
}

export default Inbox