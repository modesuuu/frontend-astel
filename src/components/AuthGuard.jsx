"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/auth/login");
      return;
    }

    setChecking(false);
  }, []);

  if (checking) {
    return null;
    // atau loading spinner
  }

  return children;
}