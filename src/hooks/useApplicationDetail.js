"use client";

import { useState, useEffect } from "react";
import applicationService from "@/services/application.service";

export default function useApplicationDetail(applicationId) {
  const [application, setApplication] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchApplication() {
    if (!applicationId) return;
    try {
      setIsLoading(true);
      setError(null);
      const data = await applicationService.getApplication(applicationId);
      setApplication(data);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal mengambil detail aplikasi");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchApplication();
  }, [applicationId]);

  return {
    application,
    isLoading,
    error,
    refreshApplication: fetchApplication,
  };
}
