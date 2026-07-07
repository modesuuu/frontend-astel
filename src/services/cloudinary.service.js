import { NEXT_PUBLIC_CLOUDINARY_URL } from "@/libs/env.js";

const cloudinaryService = {
  async uploadImage(file, preset = "default") {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", `media-astel-${preset}`);

    const response = await fetch(NEXT_PUBLIC_CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });
    console.log("dari cloudinary: service", NEXT_PUBLIC_CLOUDINARY_URL);
    const result = await response.json();
    console.log("DARI SERVICE FRONTEND CLOUDINARY", result);
    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
    };
  },
};

export default cloudinaryService;
