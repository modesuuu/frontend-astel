"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import authService from "@/services/auth.service";
import { ROUTES } from "@/constants/routes.js";

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
      router.push(ROUTES.HOME);
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
export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await authService.getProfile();
        setProfile(data.data); // langsung ambil .data biar temen ga perlu .data.data
      } catch (err) {
        setError(err.response?.data?.message || "Gagal ambil profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

  return { profile, isLoading, error };
}

// =========================================================
// useUpdateProfile
// =========================================================
// Cara pakai di komponen temen:
//
// const { updateProfile, isLoading, error, isSuccess } = useUpdateProfile();
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
      const data = await authService.updateProfile(payload);
      setIsSuccess(true);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Gagal update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return { updateProfile, isLoading, error, isSuccess };
}