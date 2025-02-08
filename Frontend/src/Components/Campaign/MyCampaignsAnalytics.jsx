import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
    ComposedChart,
    Area,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend,
    Bar
} from "recharts";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";

const MyCampaignsAnalytics = () => {
    const { campaignId } = useParams();
    const [campaign, setCampaign] = useState(null);

    useEffect(() => {
        const fetchCampaignData = async () => {
            try {
                const response = await axios.get(`https://launchfund.onrender.com/user/allcampaign/analatics/${campaignId}`);
                setCampaign(response.data.campaigndetail[0]);
            } catch (error) {
                console.error("Error fetching campaign data:", error);
            }
        };

        fetchCampaignData();
    }, [campaignId]);

    if (!campaign) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="relative flex items-center justify-center">
                    <div className="absolute h-24 w-24 bg-green-400 opacity-20 animate-ping rounded-full"></div>
                    <div className="h-16 w-16 border-8 border-green-500 border-t-transparent border-b-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    const progress = (campaign.currentAmount / campaign.goalAmount) * 100;

    const donationData = campaign.backers.map((backer, index) => ({
        name: backer.name,
        pledged: backer.pledgedAmount,
        date: new Date(backer.pledgedDate).toLocaleDateString()
    }));

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="p-6 max-w-7xl mx-auto space-y-8 mt-24 mb-8">

                {/* Campaign Details Section */}
                <div className="bg-gray-800 shadow-xl rounded-xl p-6 md:grid lg:grid-cols-2 gap-8 items-center transition-all duration-300 transform hover:scale-105">
                    {/* Image Section */}
                    <div className="relative mb-6 md:mb-0">
                        <img
                            src={campaign.image}
                            alt={campaign.title}
                            className="w-full h-full object-cover rounded-xl shadow-2xl hover:scale-105 transition-all duration-500"
                        />
                        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black to-transparent rounded-xl opacity-50 hover:opacity-40 transition-all duration-300"></div>
                    </div>

                    {/* Data Section */}
                    <div className="space-y-6 ">
                        {/* Creator Info */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white flex items-center justify-center text-3xl font-semibold shadow-md">
                                {campaign.creator.name[0].toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-white">{campaign.creator.name}</h2>
                            </div>
                        </div>

                        {/* Campaign Title */}
                        <h2 className="text-3xl font-bold text-white">{campaign.title}</h2>
                        <p className="text-lg text-gray-400 mt-3">{campaign.description}</p>

                        {/* Data Information */}
                        <div className="space-y-4 text-white">
                            <p><strong>Location:</strong> <span className="text-gray-100">{campaign.location}</span></p>
                            <p><strong>Category:</strong> <span className="text-gray-100">{campaign.category}</span></p>
                            <p><strong>Tags:</strong> <span className="text-gray-100">{campaign.tags.join(", ")}</span></p>
                        </div>

                        {/* Goal and Progress */}
                        <div className="mt-6 space-y-3">
                            <p className="text-xl font-semibold text-gray-100">Goal Amount: ₹{campaign.goalAmount}</p>
                            <p className="text-xl font-semibold text-green-500">Raised: ₹{campaign.currentAmount}</p>

                            {/* Progress Bar */}
                            <div className="w-full bg-gray-600 rounded-full h-2 mt-3">
                                <div
                                    className="bg-gradient-to-r from-green-500 to-teal-400 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Donation Breakdown Section */}
                <div className="bg-gradient-to-r from-green-400 via-green-300 to-green-200 shadow-2xl rounded-xl p-8">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Donation Breakdown</h3>

                    {/* Chart Container with Dynamic Height */}
                    <div className="w-full h-[350px] rounded-xl overflow-hidden shadow-lg bg-white">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={donationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                {/* Grid Lines */}
                                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />

                                {/* X and Y Axis Styling */}
                                <XAxis dataKey="date" tick={{ fill: "#4CAF50" }} />
                                <YAxis tick={{ fill: "#4CAF50" }} />

                                {/* Custom Tooltip Styling */}
                                <Tooltip content={({ payload }) => {
                                    if (payload && payload.length) {
                                        return (
                                            <div className="bg-white p-4 rounded-lg shadow-lg transform scale-105 transition-all">
                                                <p className="text-gray-700 font-semibold">{payload[0].payload.name}</p>
                                                <p className="text-green-500 text-lg">Pledged: ₹{payload[0].value}</p>
                                                <p className="text-gray-500 text-sm">Date: {payload[0].payload.date}</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }} />

                                {/* Legend */}
                                {/* <Legend verticalAlign="top" align="right" iconType="circle" iconSize={12} /> */}

                                {/* Chart Elements: Area, Line, and Bar */}
                                <Area
                                    type="monotone"
                                    dataKey="pledged"
                                    stroke="#4CAF50"
                                    fillOpacity={0.4}
                                    fill="#A5D6A7"
                                    strokeWidth={2}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="pledged"
                                    stroke="#2E7D32"
                                    strokeWidth={3}
                                    dot={{ stroke: "#2E7D32", strokeWidth: 2, r: 4 }}
                                    activeDot={{ r: 6, stroke: "#2E7D32", strokeWidth: 3 }}
                                />
                                <Bar
                                    dataKey="pledged"
                                    fill="#81C784"
                                    barSize={30}
                                    radius={[10, 10, 0, 0]}
                                    maxBarSize={50}
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>


                {/* Comments Section */}
                <div className="bg-gray-800 shadow-2xl rounded-xl p-8">
                    <h3 className="text-xl md:text-2xl font-semibold mb-6 text-green-600">Comments</h3>
                    <ul>
                        {campaign.comments.map((comment, index) => (
                            <li key={index} className="border-b border-gray-300 py-4">
                                <p className="font-semibold text-white">{comment.name}:</p>
                                <p className="text-white">{comment.content}</p>
                                <p className="text-sm text-gray-500">{new Date(comment.date).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MyCampaignsAnalytics;
