"use client";

import { useState, useEffect } from "react";
import collabService from "@/services/collab.service";

export default function useCollabDetail(collabId) {
  const [collab, setCollab] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchCollab() {
    if (!collabId) return;
    try {
      setIsLoading(true);
      setError(null);
      const data = await collabService.getCollab(collabId);
      setCollab(data);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal mengambil detail kolaborasi");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCollab();
  }, [collabId]);

  return {
    collab,
    isLoading,
    error,
    refreshCollab: fetchCollab,
  };
}
