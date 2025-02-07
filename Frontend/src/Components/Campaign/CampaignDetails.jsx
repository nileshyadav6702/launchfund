import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import { toast, Toaster } from 'react-hot-toast'

const CampaignDetails = () => {
  const url = "https://launchfund.onrender.com";
  const [campaigndetail, setCampaignDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDonationBox, setShowDonationBox] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const [comment, setComment] = useState("");
  const { id } = useParams();

  async function getCampaignData() {
    try {
      const response = await axios.get(`${url}/campaign/get/${id}`);
      if (response.data) {
        setCampaignDetail(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching campaign data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCampaignData();
  }, []);


  //Donate section
  async function handleDonate() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You need to log in to donate!");
      return;
    }

    if (!donationAmount || isNaN(donationAmount) || donationAmount <= 0) {
      toast.error("Please enter a valid donation amount!");
      return;
    }

    try {
      const response = await axios.put(
        `${url}/campaign/donate/${id}`,
        { amountdonated: donationAmount },
        { headers: { token } }
      );

      if (response.status === 200) {
        toast.success("Donation successful!");
        setTimeout(() => {
          setDonationAmount("");
          setShowDonationBox(false);
          getCampaignData(); // Refresh campaign details
        }, 2000);
      }
    } catch (err) {
      console.error("Error processing donation", err);
      toast.error("Failed to donate. Try again!");
    }
  }

  //Comments section
  async function handleCommentSubmit() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You need to log in to comment!");
      return;
    }

    if (!comment.trim()) {
      toast.error("Comment cannot be empty!");
      return;
    }

    try {
      const response = await axios.put(
        `${url}/campaign/comment/${id}`,
        { content: comment },
        { headers: { token } }
      );

      if (response.status === 200) {
        toast.success("Comment added successfully!");
        setTimeout(() => {
          setComment("");
          getCampaignData(); //Refresh
        }, 2000);
      }
    } catch (err) {
      console.error("Error adding comment", err);
      toast.error("Failed to add comment. Try again!");
    }
  }


  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-24 w-24 bg-green-400 opacity-20 animate-ping rounded-full"></div>
            <div className="h-16 w-16 border-8 border-green-500 border-t-transparent border-b-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      ) : (
        campaigndetail && (
          <div className="container mx-auto p-6 md:p-10 mt-18">
            <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start bg-white shadow-lg rounded-xl p-6 lg:p-12">
              {/* Left: Image */}
              <div className="w-full lg:w-1/2 rounded-xl overflow-hidden shadow-md my-auto">
                <img
                  src={campaigndetail.image}
                  alt="Campaign"
                  className="w-full h-96 object-cover rounded-xl hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Right: Details */}
              <div className="w-full lg:w-1/2">
                <span className="text-green-700 font-semibold uppercase">Funding</span>
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mt-2">
                  {campaigndetail.title.toUpperCase()}
                </h1>
                <p className="text-gray-600 mt-3 text-lg">{campaigndetail.description}</p>

                <div className="flex items-center gap-3 mt-5">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center text-xl font-bold">
                    {campaigndetail.creator.name[0].toUpperCase()}
                  </div>
                  <h2 className="text-xl font-semibold">{campaigndetail.creator.name}</h2>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between text-lg font-semibold">
                    <p>₹{campaigndetail.currentAmount.toLocaleString()} INR</p>
                    <p>{campaigndetail.backers.length} Backers</p>
                  </div>

                  <div className="relative w-full h-3 bg-gray-300 rounded-full mt-2 overflow-hidden">
                    <div
                      style={{ width: `${(campaigndetail.currentAmount / campaigndetail.goalAmount) * 100}%` }}
                      className="h-full bg-green-600 rounded-full transition-all duration-500"
                    ></div>
                  </div>
                  <p className="mt-2 text-lg font-semibold">
                    {Math.floor((campaigndetail.currentAmount / campaigndetail.goalAmount) * 100)}%
                    of ₹{campaigndetail.goalAmount}
                  </p>

                  {/* Donation Button */}
                  {!showDonationBox ? (
                    <button
                      onClick={() => setShowDonationBox(true)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 mt-6 rounded-lg text-lg font-semibold shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer"
                    >
                      Donate
                    </button>
                  ) : (
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
                      <input
                        type="number"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        placeholder="Enter amount (INR)"
                        className="w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
                      />
                      <button
                        onClick={handleDonate}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 mt-3 rounded-lg text-lg font-semibold shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer"
                      >
                        Confirm Donation
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-10 bg-white shadow-lg rounded-xl p-6 md:p-10">
              <h2 className="text-2xl font-semibold text-gray-900">Comments ({campaigndetail.comments.length})</h2>
              <div className="mt-4 space-y-4">
                {campaigndetail.comments.map((user, index) => (
                  <div key={index} className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center text-lg font-bold text-white">
                      {user.name[0].toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-md text-gray-900">{user.name}</h3>
                      <p className="text-gray-700">{user.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              {localStorage.getItem("token") && (
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                  <input
                    className="flex-1 py-3 px-4 text-md font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
                    placeholder="Enter your comment here..."
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button
                    onClick={handleCommentSubmit}
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg text-md font-semibold transition-all duration-300 shadow-md hover:scale-105 cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          </div>
        )
      )}
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Footer />
    </div>
  );
};

export default CampaignDetails;
