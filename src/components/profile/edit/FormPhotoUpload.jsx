"use client";
import React, { useRef } from "react";
import { toast } from "sonner";

/**
 * FormPhotoUpload
 *
 * Props:
 *  - value     : string  — current photo URL (blob preview OR existing Cloudinary URL)
 *  - onChange  : (File | null) => void — called with a File when user picks one,
 *                                        or null when user removes the photo
 */
const FormPhotoUpload = ({ value, onChange }) => {
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    // Reset input value so selecting the same file again still fires onChange
    e.target.value = "";

    if (!file) return;

    // Basic client-side validation
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Format file not supported.", { position: "top-right" });
      return;
    }

    const maxSizeMb = 5;
    if (file.size > maxSizeMb * 1024 * 1024) {
      toast.error(`Max file size is ${maxSizeMb}MB.`, { position: "top-right" });
      return;
    }

    onChange(file);
  };

  const handleRemove = () => {
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
        Profile Photo
      </h2>

      <div className="flex items-center gap-5">
        {/* Avatar preview */}
        <div className="relative shrink-0">
          {value ? (
            <img
              src={value}
              alt="Profile preview"
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-100 dark:border-gray-700"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <i className="bx bx-user text-3xl text-gray-400"></i>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            {value ? "Change Photo" : "Upload Photo"}
          </button>

          {value && (
            <button
              type="button"
              onClick={handleRemove}
              className="px-4 py-2 rounded-full text-sm font-medium text-red-500 hover:text-red-700 transition-colors cursor-pointer text-left"
            >
              Remove Photo
            </button>
          )}

          <p className="text-xs text-gray-400">
            JPG, PNG, WEBP or GIF · Max 5 MB
          </p>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleFileChange}
        aria-label="Upload profile photo"
      />
    </div>
  );
};

export default FormPhotoUpload;