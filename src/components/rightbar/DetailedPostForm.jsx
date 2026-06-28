"use block";
"use client";

import useSkills from "@/hooks/useSkills.js";
import React, { useState, useRef, use } from "react";
import useCloudinary from "@/hooks/useCloudinary";
import postService from "@/services/post.service";
import collabService from "@/services/collab.service";
import { useRouter } from "next/navigation";
import { mapPostPayload } from "@/mapping/post.mapping.js";
import { mapCollabPayload } from "@/mapping/collaboration.mapping.js";
import { LoadingProfileSkeleton } from "./RightProfileSidebar.jsx";

const DetailedPostForm = ({ isCollabMode, onClose }) => {
  const { uploadImages } = useCloudinary();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const defaultPost = {
    title: "",
    description: "",
    portfolioType: "link",
    externalUrl: "",
  };

  const defaultCollab = {
    title: "",
    description: "",
    requiredMember: 1,
    communicationUrl: "",
    skillsNeeded: [],
  };

  const [formData, setFormData] = useState(
    isCollabMode ? defaultCollab : defaultPost,
  );

  const [imageFiles, setImageFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  // Dummy Master Data Skills untuk Select Option
  //   const [availableSkills] = useState([
  //     { _id: "sk-1", name: "UI/UX" },
  //     { _id: "sk-2", name: "Frontend Developer" },
  //     { _id: "sk-3", name: "Backend Developer" },
  //     { _id: "sk-4", name: "React Native Expert" },
  //   ]);
  const {
    skills: availableSkills,
    isLoading: skillsLoading,
    error: skillsError,
  } = useSkills();

  const toggleSkill = (skillId) => {
    setFormData((prev) => ({
      ...prev,
      skillsNeeded: prev.skillsNeeded.includes(skillId)
        ? prev.skillsNeeded.filter((id) => id !== skillId)
        : [...prev.skillsNeeded, skillId],
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const remaining = 7 - imageFiles.length;
    const selected = files.slice(0, remaining);
    setImageFiles((prev) => [...prev, ...selected]);
    const previews = selected.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...previews]);
  };

  const handleSubmit = async (e) => {
    console.log("submit");
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const mediaUrls = imageFiles.length ? await uploadImages(imageFiles) : [];
      console.log("mediaUrls: ", mediaUrls);
      if (isCollabMode) {
        const payload = mapCollabPayload(formData, mediaUrls);
        await collabService.createCollab(payload);
      } else {
        const payload = mapPostPayload(formData, mediaUrls);
        await postService.createPost(payload);
      }
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Gagal membuat post");
      console.log("ERROR",err);
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <LoadingProfileSkeleton />;

  return (
    <div className="w-full h-full flex flex-col">
      {/* Dynamic Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-950 dark:text-white">
          {isCollabMode ? "Make collaborations" : "Post"}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl cursor-pointer"
        >
          <i className="bx bx-x"></i>
        </button>
      </div>

      {/* Form Card Area */}
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="w-full bg-gray-100 dark:bg-gray-900 border border-gray-200/40 dark:border-gray-800 rounded-3xl p-5 flex flex-col gap-4 shadow-sm overflow-y-auto max-h-[78vh] custom-scrollbar"
      >
        {/* Input Title */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 pl-1">
            Title
          </label>
          <input
            type="text"
            required
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full bg-white dark:bg-gray-950 border border-transparent dark:border-gray-800 rounded-xl py-2.5 px-4 text-xs font-medium text-gray-950 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* CONDITIONING INPUT FIELD KEDUA */}
        {!isCollabMode ? (
          /* JIKA DI FEED PAGE */
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 pl-1">
              Link Project
            </label>
            <input
              type="url"
              placeholder="https://example.com"
              value={formData.externalUrl}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  externalUrl: e.target.value,
                })
              }
              className="w-full bg-white dark:bg-gray-950 border border-transparent dark:border-gray-800 rounded-xl py-2.5 px-4 text-xs font-medium text-gray-950 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        ) : (
          /* JIKA DI COLLAB PAGE (Menampilkan Max Participants) */
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 pl-1">
              Max participants
            </label>
            <input
              type="number"
              placeholder="Add number"
              value={formData.requiredMember}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  requiredMember: e.target.value,
                })
              }
              className="w-full bg-white dark:bg-gray-950 border border-transparent dark:border-gray-800 rounded-xl py-2.5 px-4 text-xs font-medium text-gray-950 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        )}
        {isCollabMode && (
            <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 pl-1">
              External Communication Url
            </label>
            <input
              type="url"
              placeholder="https://example.com"
              value={formData.communicationUrl}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  communicationUrl: e.target.value,
                })
              }
              className="w-full bg-white dark:bg-gray-950 border border-transparent dark:border-gray-800 rounded-xl py-2.5 px-4 text-xs font-medium text-gray-950 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        )}
        {/* CONDITIONING INPUT FIELD KETIGA (SKILLS FIELD DARI KODEMU) */}
        {isCollabMode && (
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 pl-1">
              Skill needed
            </label>

            {/* Perubahan */}

            {skillsLoading && (
              <p className="text-xs text-gray-400">Loading skills...</p>
            )}
            {skillsError && (
              <p className="text-xs text-red-500">{skillsError}</p>
            )}
            <select
              disabled={skillsLoading}
              value=""
              onChange={(e) => {
                if (e.target.value) {
                  toggleSkill(e.target.value);
                }
              }}
              className="w-full rounded-xl bg-white dark:bg-gray-950 px-4 py-2.5 text-xs border border-transparent dark:border-gray-800 focus:border-indigo-500"
            >
              <option value="" disabled>
                Pilih skill
              </option>

              {availableSkills.map((skill) => (
                <option
                  key={skill._id}
                  value={skill._id}
                  disabled={formData.skillsNeeded.includes(skill._id)}
                >
                  {skill.skillName}
                </option>
              ))}
            </select>

            {/* Active Badge Lists */}
            <div className="flex flex-wrap items-center gap-2 w-full pt-2">
              {/* Perubahan Skills Badges */}
              {formData.skillsNeeded.map((skillId) => {
                const skill = availableSkills.find((s) => s._id === skillId);

                if (!skill) return null;

                return (
                  <span
                    key={skillId}
                    className=" inline-flex items-center gap-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1 text-[11px] font-semibold text-indigo-600"
                  >
                    {skill.skillName}

                    <button
                      type="button"
                      onClick={() => toggleSkill(skillId)}
                      className="ml-1 hover:text-red-500"
                    >
                      ×
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Input Descriptions */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 pl-1">
            Descriptions
          </label>
          <textarea
            rows="4"
            placeholder="Deskripsi"
            required
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full bg-white dark:bg-gray-950 border border-transparent dark:border-gray-800 rounded-xl py-2.5 px-4 text-xs font-medium text-gray-950 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
          />
        </div>

        {/* Image Previews */}
        {previewUrls.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {previewUrls.map((imageSrc, index) => (
              <div
                key={index}
                className="aspect-square bg-gray-950 rounded-xl border border-gray-800 overflow-hidden relative group"
              >
                <img
                  src={imageSrc}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImageFiles((prev) => prev.filter((_, i) => i !== index));

                    setPreviewUrls((prev) =>
                      prev.filter((_, i) => i !== index),
                    );
                  }}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-red-400 text-lg cursor-pointer transition-opacity"
                >
                  <i className="bx bx-trash"></i>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Footer controls */}
        <div className="flex items-center justify-between pt-1 mt-1">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            accept="image/*"
            disabled={imageFiles.length >= 7}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            disabled={imageFiles.length >= 7}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-800 dark:text-gray-200 hover:text-pribg-primary disabled:opacity-30 transition-colors cursor-pointer"
          >
            <i className="bx bx-folder text-base"></i> Upload files & image
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-full bg-primary hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer active:scale-95"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default DetailedPostForm;
