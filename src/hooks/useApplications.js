"use client";

import { useState, useEffect } from "react";
import applicationService from "@/services/application.service";

export default function useApplications() {
  const [applications, setApplications] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchApplications() {
    try {
      setIsLoading(true);
      setError(null);
      const data = await applicationService.getMyApplications();
      setApplications(data);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal mengambil aplikasi");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchApplications();
  }, []);

  return {
    applications,
    isLoading,
    error,
    refreshApplications: fetchApplications,
  };
}
