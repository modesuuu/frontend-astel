import cloudinaryService from "@/services/cloudinary.service.js";
import { useState } from "react";

export default function useCloudinary() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedMedias, setuploadedMedias] = useState([]);

  async function uploadImages(files, preset) {
    try {
      setIsLoading(true);

      const promises = files.map((file) => cloudinaryService.uploadImage(file, preset));

      const medias = await Promise.all(promises);

      setuploadedMedias(medias);

      return medias;
    } catch (err) {
      const message = err.response?.data?.message || "Gagal mengupload gambar";
      setError(message);
      throw new Error(message); // ← re-throw supaya caller bisa catch
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    error,
    uploadedMedias, // url yang di masukan ke database
    uploadImages, // fungsi upload foto
  }
} 