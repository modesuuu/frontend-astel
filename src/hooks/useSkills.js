"use client";

import { useEffect, useState } from "react";
import profileService from "@/services/profile.service.js";

export default function useSkills() {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchSkills() {
    try {
      setIsLoading(true);
      setError(null);
      const data = await profileService.getSkills();
      setSkills(data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal mengambil skills");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchSkills();
  }, []);

  return {
    skills: skills || [],
    isLoading,
    error,
    refreshSkills: fetchSkills,
  };
}
