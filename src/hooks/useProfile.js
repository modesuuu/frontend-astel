import profileService from "@/services/profile.service.js";
import { useEffect, useState } from "react";

export default function useProfile(userId) {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchProfile(id = userId) {
    try {
      setIsLoading(true);
      setError(null);
      const data = await profileService.getProfile(id);
      setProfile(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, [userId]); // Add userId as a dependency

  return {
    profile,
    isLoading,
    error,
    refreshProfile: fetchProfile,
  };
}
