import {v2 as cloudinary} from "cloudinary";

export const configCloudinary = () => {
  const config = useRuntimeConfig();
  cloudinary.config({
    cloud_name: config.CLOUDINARY_CLOUD_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET,
    secure: true,
  });
};
export default cloudinary;
