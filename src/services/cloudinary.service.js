import { NEXT_PUBLIC_CLOUDINARY_URL } from "@/libs/env.js";

const cloudinaryService = {
  async uploadImage(file) {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "media-astel");

    const response = await fetch(NEXT_PUBLIC_CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });
    console.log("dari cloudinary: service", NEXT_PUBLIC_CLOUDINARY_URL);
    const result = await response.json();
    return result.secure_url;
  },
};

export default cloudinaryService;
