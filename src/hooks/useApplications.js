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

export function useCreateApplication() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function createApplication(collabId, payload) {
    try {
      setIsLoading(true);
      setError(null);

      const data = await applicationService.createApplication(
        collabId,
        payload,
      );

      return data;
    } catch (err) {
      const message = err.response?.data?.message || "Gagal melamar kolaborasi";
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    createApplication,
    isLoading,
    error,
  };
}
