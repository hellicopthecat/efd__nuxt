import {v2 as cloudinary} from "cloudinary";

export const configCloudinary = () => {
  const config = useRuntimeConfig();
  cloudinary.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiScret,
    secure: true,
  });
};
export default cloudinary;
