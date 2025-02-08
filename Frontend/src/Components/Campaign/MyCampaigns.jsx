import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast'

const MyCampaigns = () => {
    const url = "https://launchfund.onrender.com";
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        const fetchCampaigns = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("No authentication token found. Please log in.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${url}/user/allcampaign`, {
                    headers: { token },
                });
                setCampaigns(response.data.allcampaigns);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch campaigns");
            } finally {
                setLoading(false);
            }
        };
        fetchCampaigns();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this campaign?")) return;

        try {
            await axios.delete(`${url}/campaign/${id}`);
            setCampaigns(campaigns.filter(campaign => campaign._id !== id));
            toast.success("Campaign deleted successfully!");
        } catch (err) {
            toast.error("Failed to delete campaign. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-200">
            <Navbar />
            <div className="max-w-7xl mx-auto p-8 mt-16">
                <h1 className="text-4xl md:text-5xl font-extrabold text-green-600 mb-14 mt-6 tracking-wide text-left">My Campaigns</h1>

                {loading && (
                    <div className="flex items-center justify-center h-screen">
                        <div className="relative flex items-center justify-center">
                            <div className="absolute h-24 w-24 bg-green-400 opacity-20 animate-ping rounded-full"></div>
                            <div className="h-16 w-16 border-8 border-green-500 border-t-transparent border-b-transparent rounded-full animate-spin"></div>
                        </div>
                    </div>
                )}

                {error && <p className="text-xl text-red-500 text-center font-semibold">{error}</p>}

                {!loading && !error && campaigns.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                        {campaigns.map((campaign) => (
                            <div
                                key={campaign._id}
                                className="bg-gradient-to-br from-black to-gray-600 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 flex flex-col min-h-[350px] relative overflow-hidden"
                            >
                                <div className='overflow-hidden w-full h-48 rounded-xl mb-3'>
                                <img
                                    src={campaign.image}
                                    alt="Campaign"
                                    className="h-48 w-full object-cover rounded-xl mb-6 transition-transform duration-500 transform hover:scale-110"
                                />

                                </div>
                                <h2 className="text-3xl font-semibold text-white mb-4">{campaign.title}</h2>
                                <p className="text-gray-100 text-lg mb-6">{campaign.description}</p>
                                <p className="text-gray-200 text-sm mb-8">
                                    Created on: {new Date(campaign.createdAt).toLocaleDateString()}
                                </p>
                                <div className="mt-auto grid grid-row-2 gap-4 z-10 w-full">
                                    <button
                                        onClick={() => navigate(`/my-campaigns/analytics/${campaign._id}`)}
                                        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300 transform hover:scale-105 w-full lg:w-auto cursor-pointer">
                                        View Dashboard
                                    </button>
                                    <button
                                        onClick={() => handleDelete(campaign._id)}
                                        className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition duration-300 transform hover:scale-105 w-full lg:w-auto cursor-pointer">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Footer />
        </div>
    );
};

export default MyCampaigns;
