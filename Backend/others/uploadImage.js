const cloudinary = require("cloudinary").v2;

//environment variables
const cloud_name = process.env.CLOUD_NAME;
const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;

//configuration
cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
});



const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "uploads", // Optional: Set Cloudinary folder
      use_filename: true, // Keep original filename
      unique_filename: false, // Avoid renaming
    });

    console.log("Upload successful!");
    console.log("Public URL:", result.secure_url);
    return result.secure_url;
  } catch (error) {
    console.error("Upload failed:", error);
  }
};
module.exports=uploadImage