"use client"
import React from 'react'
import { useRouter } from "next/navigation";
import { ROUTES } from '@/constants/routes.js';

const LogoutBtn = () => {

    const router = useRouter();
    const handleLogout = () => {
        //hapus session
        localStorage.removeItem("token");
        router.push(ROUTES.LOGIN);
    }

  return (
    <button
      type="button"
      onClick={handleLogout} className="flex items-center gap-1.5 cursor-pointer">
      <i className="bx bx-arrow-out-left-square-half text-2xl text-red-600" />
      <span className="text-base text-red-600 font-medium">Logout</span>
    </button>
  )
}

export default LogoutBtn