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
      setError(err?.message || "Gagal mengambil kolaborasi");
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

export function useMyCollabs(userId) {
  const [collabs, setCollabs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMyCollabs() {
    try {
      setIsLoading(true);
      setError(null);
      const data = await collabService.getMyCollabs(userId);
      setCollabs(data.data);
    } catch (err) {
      setError(err?.message || "Gagal mengambil kolaborasi");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if(!userId) return;
    fetchMyCollabs();
  }, [userId]);

  return {
    myCollabs: collabs,
    isLoading,
    error,
    refreshMyCollabs: fetchMyCollabs,
  };
}