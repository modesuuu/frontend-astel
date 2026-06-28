"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import authService from "@/services/auth.service";
import profileService from "@/services/profile.service.js";

// =========================================================
// useRegister
// =========================================================
// Cara pakai di komponen temen:
//
// const { register, isLoading, error } = useRegister();
//
// <button onClick={() => register({ username, email, password })}>
//   Daftar
// </button>
// {error && <p>{error}</p>}
// =========================================================
export function useRegister() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (payload) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authService.register(payload);
      router.push("/auth/login");
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Gagal register");
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
}

// =========================================================
// useLogin
// =========================================================
// Cara pakai di komponen temen:
//
// const { login, isLoading, error } = useLogin();
//
// <button onClick={() => login({ username, password })}>
//   Login
// </button>
// {error && <p>{error}</p>}
// =========================================================
export function useLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (payload) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authService.login(payload);
      localStorage.setItem("token", data.data.token); // simpan token
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Username atau password salah");
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}

// =========================================================
// useProfile
// =========================================================
// Cara pakai di komponen temen:
//
// const { profile, isLoading, error } = useProfile();
//
// Otomatis fetch saat komponen muncul (mount).
// Field yang bisa langsung dipakai di UI:
//   profile.username        → "raisaf"
//   profile.fullName        → "Muafa athok united"
//   profile.bio             → "Aku suka ngoding..."
//   profile.photo_profile_url → "profile.png"
//   profile.skills          → [{ _id, skillName }, ...]
//   profile.socialMedia     → [{ _id, platform, url }, ...]
// =========================================================
export function useAuthMe() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authService.me();
      setProfile(data);
      console.log("dari useAuthMe", data); // langsung ambil .data biar temen ga perlu .data.data
    } catch (err) {
      setError(err.response?.data?.message || "Gagal ambil profile");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { profile, isLoading, error, refreshProfile: fetch };
}

// =========================================================
// useUpdateProfile
// =========================================================pduseUpdateProfile();
//
// <button onClick={() => updateProfile({ fullName, bio, photo_profile_url, skills, socialMedia })}>
//   Simpan
// </button>
// {isSuccess && <p>Profile berhasil diupdate!</p>}
// {error && <p>{error}</p>}
// =========================================================
export function useUpdateProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateProfile = async (payload) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    try {
      const data = await profileService.update(payload);
      setIsSuccess(true);
      return data;
    } catch (err) {
      setError("Gagal update profile");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { updateProfile, isLoading, error, isSuccess };
}
