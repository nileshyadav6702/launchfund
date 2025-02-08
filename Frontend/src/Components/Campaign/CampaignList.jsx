import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import { MapPin, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {DataContext} from "../Datacontext";

const CampaignsList = () => {
  const url = "https://launchfund.onrender.com";
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {query}=useContext(DataContext)

  
  const handleCardClick = (campaignId) => {
    navigate(`/campaign/${campaignId}`);
  };

  const getData = async () => {
    try {
      let campaignData = await axios.get(`${url}/campaign/get`);
      setData(campaignData.data.data.filter(item=>item.title.toLowerCase().includes(query.toLowerCase())));
    } catch (error) {
      console.error("Error fetching campaign data:", error);
    } finally {
      setLoading(false);
    }
  };

  let timer
  useEffect(() => {
    setLoading(true)
    clearTimeout(timer)
    timer=setTimeout(()=>{
      getData();
      setLoading(false)
    },1000)
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 text-gray-900">
      <Navbar />
      <div className="py-20 px-6 sm:px-12 lg:px-16 mt-10">
        <h2 className="text-green-700 text-4xl md:text-6xl font-extrabold text-center mb-16 drop-shadow-lg">
          Join Our Campaigns
        </h2>
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <div className="relative flex items-center justify-center">
              <div className="absolute h-24 w-24 bg-green-400 opacity-20 animate-ping rounded-full"></div>
              <div className="h-16 w-16 border-8 border-green-500 border-t-transparent border-b-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12">
            {data.length === 0
              ? null
              : data.map((campaign) => (
                <div
                  key={campaign._id}
                  className="bg-gradient-to-t from-gray-900 to-gray-700 rounded-xl shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex flex-col h-full"
                >
                  <div className="relative">
                    <img
                      src={campaign.image}
                      alt={campaign.title.toUpperCase()}
                      className="w-full h-60 object-cover rounded-t-xl transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-3xl font-bold text-green-500 mb-2">
                      {campaign.title.toUpperCase()}
                    </h3>
                    <p className="text-lg text-gray-300 mb-4 flex-grow">
                      {campaign.tagline}
                    </p>
                    <div className="flex items-center text-sm mt-4 text-gray-400 space-x-3">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-green-500" />
                        {campaign.location}
                      </span>
                      <span className="flex items-center">
                        <Tag className="w-4 h-4 mr-1 text-green-500" />
                        {campaign.category}
                      </span>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <p className="text-xl font-semibold text-green-500">
                        Goal: ₹{campaign.goalAmount.toLocaleString()}
                      </p>
                      <button
                        onClick={() => handleCardClick(campaign._id)}
                        className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg py-3 px-6 text-lg font-semibold shadow-lg cursor-pointer 
                      hover:bg-green-800 hover:shadow-xl hover:scale-105 hover:brightness-110 hover:-rotate-1 transition-all duration-300"
                      >
                        View Details
                      </button>

                    </div>
                    <div className="mt-4 w-full h-2 bg-gray-400 rounded-3xl">
                      <div
                        style={{ width: `${((campaign.currentAmount ? campaign.currentAmount : 0) / campaign.goalAmount) * 100}%` }}
                        className="h-2 rounded-3xl bg-green-600"
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CampaignsList;
