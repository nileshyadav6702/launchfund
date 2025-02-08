import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';

const MyCampaigns = () => {
    const url = "https://launchfund.onrender.com";
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return (
      <div>
        <Navbar />
        <div className="max-w-4xl mx-auto p-6 mt-20">
          <h1 className="text-2xl font-bold mb-4">My Campaigns</h1>

          {loading && <p>Loading campaigns...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && campaigns.length === 0 && (
            <p>No campaigns found.</p>
          )}

          {!loading && !error && campaigns.length > 0 && (
            <ul className="space-y-4">
              {campaigns.map((campaign) => (
                <li
                  key={campaign.id}
                  className="border p-4 rounded-md shadow-md flex sm:flex-row flex-col gap-3 items-center "
                >
                  <img
                    src={campaign.image}
                    alt=""
                    className="h-[100px] w-[150px] rounded-md object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{campaign.title}</h2>
                    <p>{campaign.description}</p>
                    <p className="text-gray-500">
                      Created on:{" "}
                      {new Date(campaign.createdAt).toLocaleDateString()}
                    </p>
                    <div className="grid grid-col-1 sm:grid-cols-2  items-center gap-3 mt-3">
                      <button className="bg-red-400 px-2 py-1 rounded-sm">
                        Delete
                      </button>
                      <button className="bg-green-400 px-2 py-1 rounded-sm">
                        View DashBoard
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Footer />
      </div>
    );
};

export default MyCampaigns;
