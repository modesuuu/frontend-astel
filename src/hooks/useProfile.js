import profileService from "@/services/profile.service.js";
import { useEffect, useState } from "react";

export default function useProfile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchProfile() {
    try {
      setIsLoading(true);
      setError(null);
      const data = await profileService.me();
      setProfile(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    isLoading,
    error,
    refreshProfile: fetchProfile,
  };
}
