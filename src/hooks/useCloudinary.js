import cloudinaryService from "@/services/cloudinary.service.js";
import { useState } from "react";

export default function useCloudinary() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedUrls, setUploadedUrls] = useState([]);

  async function uploadImages(files) {
    try {
      setIsLoading(true);

      const promises = files.map((file) => cloudinaryService.uploadImage(file));

      const urls = await Promise.all(promises);

      setUploadedUrls(urls);

      return urls;
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
    uploadedUrls, // url yang di masukan ke database
    uploadImages, // fungsi upload foto
  }
} 