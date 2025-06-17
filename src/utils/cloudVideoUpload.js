import axios from 'axios';
import sha1 from 'crypto-js/sha1';
import FormData from 'form-data';

const cloudName = "dorbokwzm"; // Replace with your Cloudinary Cloud Name
const apiKey = "355563563234827"; // Replace with your API Key
const apiSecret = "kjVRalFqavXC6cswRLe_MOzaoY8"; // Replace with your API Secret (keep it secure)

// Generate Cloudinary signature (SHA-1 Hash)
const generateSignature = (timestamp) => {
  const stringToSign = `timestamp=${timestamp}${apiSecret}`;
  return sha1(stringToSign).toString();
};

export const uploadVideo = async (file) => {
  console.log("Uploading video...");
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = generateSignature(timestamp);

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`;

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);

    const response = await axios.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    console.log("Video uploaded:", response.data);
    return response.data.secure_url; // ✅ Return Cloudinary Video URL
  } catch (error) {
    console.error("Error uploading video:", error);
    return null;
  }
};

