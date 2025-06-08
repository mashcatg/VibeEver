export const uploadZip = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "files_mehedi");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/raw/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("ZIP file upload failed");
  }

  const data = await response.json();
  return data.secure_url;
};
