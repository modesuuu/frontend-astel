"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// IMPORT SUB FORM COMPONENTS
import FormPhotoUpload from "@/components/profile/edit/FormPhotoUpload";
import FormBasicInfo from "@/components/profile/edit/FormBasicInfo";
import FormSkillSelect from "@/components/profile/edit/FormSkillSelect";
import FormSocialMedia from "@/components/profile/edit/FormSocialMedia";
import { useAuthMe, useUpdateProfile } from "@/hooks/useAuth.js";
import { ROUTES } from "@/constants/routes.js";
import useCloudinary from "@/hooks/useCloudinary.js";
import useSkills from "@/hooks/useSkills.js";
import useMappingSkills from "@/mapping/useMappingSkills.js";

const EditProfilePage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null); // tampilkan error ke user
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Track blob URL aktif supaya bisa di-revoke (mencegah memory leak)
  const previewUrlRef = useRef(null);

  const router = useRouter();
  const { profile, isLoading } = useAuthMe();
  const { updateProfile, isLoading: updating } = useUpdateProfile();
  const { uploadImages, isLoading: uploading } = useCloudinary();
  const { skills } = useSkills();
  const [form, setForm] = useState({
    fullName: "",
    bio: "",
    photo_profile_url: "",
    institusi: "",
    skills: [],
    socialMedia: [],
  });

  // Isi form dari data profile yang sudah di-fetch
  useEffect(() => {
    if (!profile?.data) return;

    setForm({
      fullName: profile.data.fullName || "",
      bio: profile.data.bio || "",
      photo_profile_url: profile.data.photo_profile_url || "",
      institusi: profile.data.institusi || "",
      skills: profile.data.skills.map((s) => s._id),
      socialMedia: profile.data.socialMedia || [],
    });
  }, [profile]);

  // Revoke blob URL saat komponen unmount
  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  // ── Master skill data ───────────────────────────────────────────
  const availableSkills = useMappingSkills(skills);

  // ── Handlers ───────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleSkill = (id) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(id)
        ? prev.skills.filter((s) => s !== id)
        : [...prev.skills, id],
    }));
  };

  const handlePhotoChange = (file) => {
    // Revoke blob URL lama sebelum buat yang baru
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }

    if (!file) {
      setSelectedPhoto(null);
      setForm((prev) => ({ ...prev, photo_profile_url: "" }));
      return;
    }

    // Buat preview lokal — upload ke Cloudinary hanya saat submit
    const preview = URL.createObjectURL(file);
    previewUrlRef.current = preview;

    setSelectedPhoto(file);
    setForm((prev) => ({ ...prev, photo_profile_url: preview }));
  };

  const handleAddSocial = (newSocialItem) => {
    const existsAt = form.socialMedia.findIndex(
      (s) => s.platform === newSocialItem.platform,
    );
    if (existsAt !== -1) {
      const updated = [...form.socialMedia];
      updated[existsAt] = { ...newSocialItem };
      setForm((prev) => ({ ...prev, socialMedia: updated }));
    } else {
      setForm((prev) => ({
        ...prev,
        socialMedia: [...prev.socialMedia, { ...newSocialItem }],
      }));
    }
  };

  const handleRemoveSocial = (platform) => {
    setForm((prev) => ({
      ...prev,
      socialMedia: prev.socialMedia.filter((s) => s.platform !== platform),
    }));
  };

  // ── Submit ─────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSuccess(false);
    setSubmitError(null);

    try {
      let photoUrl = form.photo_profile_url;

      if (selectedPhoto) {
        // uploadImages expects array → returns array of URL strings
        // Kalau gagal, hook akan throw (setelah fix useCloudinary.js)
        const urls = await uploadImages([selectedPhoto]);

        // urls = ["https://res.cloudinary.com/..."]
        photoUrl = urls[0];

        // Revoke blob preview sekarang sudah ada URL Cloudinary asli
        if (previewUrlRef.current) {
          URL.revokeObjectURL(previewUrlRef.current);
          previewUrlRef.current = null;
        }
      }

      // Payload final — photo_profile_url selalu berupa string URL
      const payload = {
        fullName: form.fullName,
        bio: form.bio,
        photo_profile_url: photoUrl,
        institusi: form.institusi,
        skills: form.skills,
        socialMedia: form.socialMedia,
      };

      await updateProfile(payload);

      setIsSuccess(true);
      router.push(ROUTES.PROFILE);
    } catch (err) {
      // Error dari uploadImages atau updateProfile keduanya tertangkap di sini
      const message =
        err?.message || "Gagal menyimpan profil. Silakan coba lagi.";
      setSubmitError(message);
      console.error("Submit error:", err);
    }
  };

  const isBusy = uploading || updating;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-4 transition-colors">
      <div className="max-w-2xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-950 dark:text-white tracking-tight">
              Edit Profile
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Update your account portfolio information
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.back()}
            className="text-sm font-medium text-gray-400 hover:text-primary flex items-center gap-1 transition-colors cursor-pointer"
          >
            <i className="bx bx-left-arrow-alt text-lg"></i> Back
          </button>
        </div>

        {/* Success Banner */}
        {isSuccess && (
          <div className="mb-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 px-4 py-3 text-sm font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
            <i className="bx bx-check-circle text-lg"></i> Profile updated
            successfully!
          </div>
        )}

        {/* Error Banner */}
        {submitError && (
          <div className="mb-6 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/40 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 flex items-center gap-2">
            <i className="bx bx-error-circle text-lg"></i> {submitError}
          </div>
        )}

        {/* Upload progress */}
        {uploading && (
          <div className="mb-6 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 px-4 py-3 text-sm font-medium text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <i className="bx bx-loader-alt animate-spin text-lg"></i> Uploading
            photo…
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormPhotoUpload
            value={form.photo_profile_url}
            onChange={handlePhotoChange}
          />

          <FormBasicInfo form={form} onChange={handleChange} />

          <FormSkillSelect
            selectedSkills={form.skills}
            availableSkills={availableSkills}
            loadingSkills={false}
            toggleSkill={handleToggleSkill}
          />

          <FormSocialMedia
            socialMediaList={form.socialMedia}
            onAddSocial={handleAddSocial}
            onRemoveSocial={handleRemoveSocial}
          />

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-900">
            <button
              type="button"
              onClick={() => alert("Logout Simulation")}
              className="text-sm font-semibold text-red-500 hover:text-red-700 cursor-pointer focus:outline-none"
            >
              Logout from Account
            </button>
            <button
              type="submit"
              disabled={isBusy}
              className="px-6 py-2.5 rounded-full bg-primary hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold transition-all shadow-sm cursor-pointer"
            >
              {uploading ? "Uploading…" : updating ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;