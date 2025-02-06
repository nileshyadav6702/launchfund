import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import axios from "axios";

const StartCampaign = () => {
    const [image, setImage] = useState(null);
    const [campaignData, setCampaignData] = useState({
        title: "",
        tagline: "",
        location: "",
        category: "",
        tags: "",
        goalAmount: 0,
    });

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            const imageWithPreview = Object.assign(file, { preview: URL.createObjectURL(file) });
            setImage(imageWithPreview);
            console.log("Image Data:", imageWithPreview); // Log image data to console
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

        // Create FormData to handle image upload
        const formData = new FormData();
        formData.append("title", campaignData.title);
        formData.append("tagline", campaignData.tagline);
        formData.append("location", campaignData.location);
        formData.append("category", campaignData.category);
        formData.append("tags", campaignData.tags);
        formData.append("goalAmount", campaignData.goalAmount);
        
        // Append image file if exists
        if (image) {
            formData.append("image", image); // Append the image file itself
        }

        // Log FormData contents manually
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            const response = await axios.post("https://dummyapi.io/data", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("API Response:", response.data);

            // Clear input fields and image preview after successful submission
            setCampaignData({
                title: "",
                tagline: "",
                location: "",
                category: "",
                tags: "",
                goalAmount: 0,
            });
            setImage(null); // Clear image preview

        } catch (error) {
            console.error("Error submitting the campaign:", error);
        }
    };

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="max-w-3xl mx-auto p-6 mt-20 mb-10">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-green-600">Start Your Campaign</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Campaign Title */}
                    <div>
                        <label className="block text-gray-700 font-medium">Campaign Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={campaignData.title}
                            onChange={handleChange}
                            placeholder="Enter your campaign title"
                            className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring focus:ring-green-600 focus:border-green-600"
                        />
                    </div>

                    {/* Campaign Tagline */}
                    <div>
                        <label className="block text-gray-700 font-medium">Campaign Tagline *</label>
                        <textarea
                            name="tagline"
                            value={campaignData.tagline}
                            onChange={handleChange}
                            placeholder="Provide a short description"
                            className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring focus:ring-green-600 focus:border-green-600"
                        ></textarea>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-gray-700 font-medium">Campaign Card Image *</label>
                        <div
                            {...getRootProps()}
                            className="border-2 border-dashed border-gray-400 p-8 mt-1 text-center rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100"
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
                                    <p className="text-gray-600 mt-3">Drag & drop or click to upload an image</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-gray-700 font-medium">Location *</label>
                        <input
                            type="text"
                            name="location"
                            value={campaignData.location}
                            onChange={handleChange}
                            placeholder="Enter campaign location"
                            className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring focus:ring-green-600 focus:border-green-600"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-gray-700 font-medium">Category *</label>
                        <select
                            name="category"
                            value={campaignData.category}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring focus:ring-green-600 focus:border-green-600"
                        >
                            <option value="">Select a category</option>
                            <option value="Technology">Technology</option>
                            <option value="Health">Health</option>
                            <option value="Education">Education</option>
                            <option value="Art">Art</option>
                        </select>
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-gray-700 font-medium">Tags *</label>
                        <input
                            type="text"
                            name="tags"
                            value={campaignData.tags}
                            onChange={handleChange}
                            placeholder="Enter up to 5 tags"
                            className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring focus:ring-green-600 focus:border-green-600"
                        />
                    </div>

                    {/* Goal Amount */}
                    <div>
                        <label className="block text-gray-700 font-medium">Goal Amount *</label>
                        <input
                            type="number"
                            name="goalAmount"
                            value={campaignData.goalAmount}
                            onChange={handleChange}
                            placeholder="Enter goal amount"
                            className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring focus:ring-green-600 focus:border-green-600"
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="w-48 bg-green-600 text-white py-3 rounded-md text-lg font-medium hover:bg-green-700 transition cursor-pointer">
                        Save & Continue
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default StartCampaign;
