import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import axios from "axios";
import { toast, Toaster } from 'react-hot-toast'
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

const StartCampaign = () => {
  const url = "https://launchfund.onrender.com";
  const [image, setImage] = useState(null);
  const [base64, setbase64] = useState(null);
  const [loading, setLoading] = useState(false);
  const [campaignData, setCampaignData] = useState({
    title: "",
    tagline: "",
    location: "",
    category: "",
    tags: "",
    goalAmount: 0,
  });

  let navigate = useNavigate();

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const imageWithPreview = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      setImage(imageWithPreview)
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setbase64(reader.result); // Store Base64 string
      };
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampaignData({
      ...campaignData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!localStorage.getItem('token')) {
      toast.error("Please sign in first!")
      return;
    }

    setLoading(true);
    // Create FormData to handle image upload
    const formData = {};
    formData["title"] = campaignData.title;
    formData["tagline"] = campaignData.tagline;
    formData["location"] = campaignData.location;
    formData["category"] = campaignData.category;
    formData["tags"] = campaignData.tags;
    formData["goalAmount"] = campaignData.goalAmount;

    // Append image file if exists
    if (image) {
      formData["image"] = base64; // Append the image file itself
    }

    try {
      const response = await axios.post(`${url}/campaign/create`, formData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      console.log("API Response:", response.data);
      toast.success('Campaign created successfully!')

      //   Clear input fields and image preview after successful submission
      setCampaignData({
        title: "",
        tagline: "",
        location: "",
        category: "",
        tags: "",
        goalAmount: 0,
      });
      setImage(null); // Clear image
      setTimeout(() => navigate("/explore"), 2000);
    } catch (error) {
      console.error("Error submitting the campaign:", error);
      toast.error('Failed to create campaign. Please try again.')
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 mt-20 mb-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-green-600">
          Start Your Campaign
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campaign Title */}
          <div>
            <label className="block text-gray-700 font-medium">
              Campaign Title *
            </label>
            <input
              type="text"
              name="title"
              value={campaignData.title}
              onChange={handleChange}
              placeholder="Enter your campaign title"
              required
              className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring focus:ring-green-600 focus:border-green-600"
            />
          </div>

          {/* Campaign Tagline */}
          <div>
            <label className="block text-gray-700 font-medium">
              Campaign Tagline *
            </label>
            <textarea
              name="tagline"
              value={campaignData.tagline}
              onChange={handleChange}
              placeholder="Provide a short description"
              required
              className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring focus:ring-green-600 focus:border-green-600"
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-medium">
              Campaign Card Image *
            </label>
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-400 p-8 mt-1 text-center rounded-md cursor-pointer bg-gra--y-50 hover:bg-gray-100"
            >
              <input {...getInputProps()} />
              {image ? (
                <img
                  src={image.preview}
                  alt="Uploaded preview"
                  className="mx-auto h-40 w-40 object-cover rounded-md"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <UploadCloud className="h-12 w-12 text-gray-500" />
                  <p className="text-gray-600 mt-3">
                    Drag & drop or click to upload an image
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-medium">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={campaignData.location}
              onChange={handleChange}
              placeholder="Enter campaign location"
              required
              className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring focus:ring-green-600 focus:border-green-600"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium">
              Category *
            </label>
            <select
              name="category"
              value={campaignData.category}
              required
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring focus:ring-green-600 focus:border-green-600"
            >
              <option value="">Select a category</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Art">Art</option>
              <option value="Environment">Environment</option>
              <option value="Wildlife">Wildlife</option>
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-gray-700 font-medium">Tags *</label>
            <input
              type="text"
              name="tags"
              required
              value={campaignData.tags}
              onChange={handleChange}
              placeholder="Enter up to 5 tags"
              className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring focus:ring-green-600 focus:border-green-600"
            />
          </div>

          {/* Goal Amount */}
          <div>
            <label className="block text-gray-700 font-medium">
              Goal Amount *
            </label>
            <input
              type="number"
              name="goalAmount"
              required
              value={campaignData.goalAmount}
              onChange={handleChange}
              placeholder="Enter goal amount"
              className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring focus:ring-green-600 focus:border-green-600"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-48 bg-green-600 text-white py-3 rounded-md text-lg font-medium hover:bg-green-700 transition cursor-pointer flex justify-center items-center"
            disabled={loading}
          >
            {loading ? <ClipLoader color="#fff" size={20} /> : "Save & Continue"}
          </button>
        </form>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Footer />
    </div>
  );
};

export default StartCampaign;
