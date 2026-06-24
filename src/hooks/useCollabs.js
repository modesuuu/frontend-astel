"use client";

import { useState, useEffect } from "react";
import collabService from "@/services/collab.service";

export default function useCollabs() {
  const [collabs, setCollabs] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchCollabs() {
    try {
      setIsLoading(true);
      setError(null);
      const data = await collabService.getCollabs();
      setCollabs(data);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal mengambil kolaborasi");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCollabs();
  }, []);

  return {
    collabs,
    isLoading,
    error,
    refreshCollabs: fetchCollabs,
  };
}
