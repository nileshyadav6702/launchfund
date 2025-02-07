import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import { MapPin, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const dummyCampaigns = [
    {
        id: 1,
        title: "Save the Rainforests",
        tagline: "Join us in protecting our planet's most vital ecosystems.",
        location: "Amazon Rainforest, Brazil",
        category: "Environment",
        tags: "Rainforest, Nature, Conservation, Climate Change, Biodiversity",
        goalAmount: 50000,
        image: "https://www.shutterstock.com/image-vector/vector-illustration-flat-style-business-600nw-1371521327.jpg"
    },
    {
        id: 2,
        title: "Ocean Cleanup",
        tagline: "Help us clean the world's oceans and restore marine life.",
        location: "Pacific Ocean",
        category: "Environment",
        tags: "Ocean, Marine Life, Cleanup, Sustainability, Plastic Pollution",
        goalAmount: 75000,
        image: "https://www.shutterstock.com/image-vector/vector-illustration-flat-style-business-600nw-1371521327.jpg"
    },
    {
        id: 3,
        title: "Wildlife Protection",
        tagline: "Stand up for endangered species and protect their habitats.",
        location: "Africa, Asia, and South America",
        category: "Wildlife Conservation",
        tags: "Endangered Species, Wildlife, Conservation, Habitat Protection",
        goalAmount: 100000,
        image: "https://www.shutterstock.com/image-vector/vector-illustration-flat-style-business-600nw-1371521327.jpg"
    },
    {
        id: 4,
        title: "Coral Reef Conservation",
        tagline: "Help preserve the vibrant life beneath the ocean's surface.",
        location: "Great Barrier Reef, Australia",
        category: "Marine Life",
        tags: "Coral Reefs, Marine Life, Protection, Ocean Conservation",
        goalAmount: 60000,
        image: "https://www.shutterstock.com/image-vector/vector-illustration-flat-style-business-600nw-1371521327.jpg"
    },
    {
        id: 5,
        title: "Clean Energy Initiative",
        tagline: "Support the transition to renewable energy sources worldwide.",
        location: "Global",
        category: "Energy",
        tags: "Renewable Energy, Clean Power, Solar, Wind, Sustainability",
        goalAmount: 120000,
        image: "https://www.shutterstock.com/image-vector/vector-illustration-flat-style-business-600nw-1371521327.jpg"
    },
    {
        id: 6,
        title: "Plastic Free Future",
        tagline: "Join the movement to reduce plastic waste globally.",
        location: "Global",
        category: "Waste Management",
        tags: "Plastic, Recycling, Environment, Sustainability",
        goalAmount: 40000,
        image: "https://www.shutterstock.com/image-vector/vector-illustration-flat-style-business-600nw-1371521327.jpg"
    },
    {
        id: 7,
        title: "Green Cities Project",
        tagline: "Transform urban spaces into sustainable and green environments.",
        location: "Global",
        category: "Urban Development",
        tags: "Green Cities, Urban Planning, Sustainability, Eco-friendly",
        goalAmount: 90000,
        image: "https://www.shutterstock.com/image-vector/vector-illustration-flat-style-business-600nw-1371521327.jpg"
    },
    {
        id: 8,
        title: "Plant a Tree",
        tagline: "Help us plant millions of trees to combat climate change.",
        location: "Worldwide",
        category: "Reforestation",
        tags: "Tree Planting, Reforestation, Nature, Climate Action",
        goalAmount: 25000,
        image: "https://www.shutterstock.com/image-vector/vector-illustration-flat-style-business-600nw-1371521327.jpg"
    },
    {
        id: 9,
        title: "Wildlife Rescue",
        tagline: "Save animals from poaching and illegal trade.",
        location: "Africa and Southeast Asia",
        category: "Wildlife Conservation",
        tags: "Wildlife, Rescue, Endangered Species, Poaching",
        goalAmount: 150000,
        image: "https://www.shutterstock.com/image-vector/vector-illustration-flat-style-business-600nw-1371521327.jpg"
    },
    {
        id: 10,
        title: "Clean Water Access",
        tagline: "Provide clean drinking water to communities in need.",
        location: "Sub-Saharan Africa",
        category: "Water Access",
        tags: "Water, Clean Water, Sanitation, Health",
        goalAmount: 70000,
        image: "https://www.shutterstock.com/image-vector/vector-illustration-flat-style-business-600nw-1371521327.jpg"
    },
    {
        id: 11,
        title: "Sustainable Agriculture",
        tagline: "Promote eco-friendly farming practices to feed the world.",
        location: "Global",
        category: "Agriculture",
        tags: "Sustainability, Organic Farming, Agriculture, Food Security",
        goalAmount: 110000,
        image: "https://www.shutterstock.com/image-vector/vector-illustration-flat-style-business-600nw-1371521327.jpg"
    },
    {
        id: 12,
        title: "Climate Change Advocacy",
        tagline: "Raise awareness and support policies to combat climate change.",
        location: "Global",
        category: "Climate Action",
        tags: "Climate Change, Advocacy, Sustainability, Policy Change",
        goalAmount: 95000,
        image: "https://www.shutterstock.com/image-vector/vector-illustration-flat-style-business-600nw-1371521327.jpg"
    },
    {
        id: 13,
        title: "Energy Efficiency Drive",
        tagline: "Encourage the adoption of energy-efficient solutions in homes.",
        location: "Global",
        category: "Energy",
        tags: "Energy Efficiency, Sustainability, Power Conservation",
        goalAmount: 80000,
        image: "https://www.shutterstock.com/image-vector/vector-illustration-flat-style-business-600nw-1371521327.jpg"
    },
    {
        id: 14,
        title: "Waste to Wealth",
        tagline: "Turn waste into valuable resources and reduce landfill waste.",
        location: "Global",
        category: "Waste Management",
        tags: "Recycling, Waste, Sustainability, Green Economy",
        goalAmount: 60000,
        image: "https://www.shutterstock.com/image-vector/vector-illustration-flat-style-business-600nw-1371521327.jpg"
    },
    {
        id: 15,
        title: "Save the Bees",
        tagline: "Protect pollinators and secure our food systems.",
        location: "Global",
        category: "Biodiversity",
        tags: "Bees, Pollinators, Agriculture, Environment",
        goalAmount: 45000,
        image: "https://www.shutterstock.com/image-vector/vector-illustration-flat-style-business-600nw-1371521327.jpg"
    },
    {
        id: 16,
        title: "Food Waste Reduction",
        tagline: "Help reduce food waste and feed the hungry.",
        location: "Global",
        category: "Food Security",
        tags: "Food Waste, Hunger, Sustainability, Food Rescue",
        goalAmount: 30000,
        image: "https://www.shutterstock.com/image-vector/vector-illustration-flat-style-business-600nw-1371521327.jpg"
    },
    {
        id: 17,
        title: "Eco-Friendly Transportation",
        tagline: "Promote the use of electric vehicles and sustainable transport.",
        location: "Global",
        category: "Transportation",
        tags: "Electric Vehicles, Transportation, Clean Energy, Sustainability",
        goalAmount: 120000,
        image: "https://www.shutterstock.com/image-vector/vector-illustration-flat-style-business-600nw-1371521327.jpg"
    },
    {
        id: 18,
        title: "Zero Waste Living",
        tagline: "Help communities adopt a zero-waste lifestyle.",
        location: "Global",
        category: "Waste Management",
        tags: "Zero Waste, Recycling, Sustainability, Environment",
        goalAmount: 55000,
        image: "https://www.shutterstock.com/image-vector/vector-illustration-flat-style-business-600nw-1371521327.jpg"
    },
    {
        id: 19,
        title: "Endangered Species Protection",
        tagline: "Save species at risk of extinction.",
        location: "Global",
        category: "Wildlife Conservation",
        tags: "Endangered Species, Protection, Wildlife, Conservation",
        goalAmount: 130000,
        image: "https://www.shutterstock.com/image-vector/vector-illustration-flat-style-business-600nw-1371521327.jpg"
    }
];


const CampaignsList = () => {
    const url = "https://launchfund.onrender.com";
    const navigate = useNavigate();
    const [data,setdata]=useState([])

    const handleCardClick = (campaignId) => {
        navigate(`/campaign/${campaignId}`);
    };
    //function to get the campaign data
    const getdata=async ()=>{
        let campaigndata=await axios.get(`${url}/campaign/get`)
        setdata(campaigndata.data.data)
    }
    //getting the campaign data from api
    useEffect(()=>{
        getdata()
    },[])

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 text-gray-900">
        <Navbar />
        <div className="py-20 px-6 sm:px-12 lg:px-16 mt-10">
          <h2 className="text-green-700 text-4xl md:text-6xl font-extrabold text-center mb-16 drop-shadow-lg">
            Join Our Campaigns
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12">
            {data.length == 0
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
                          className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg py-3 px-6 text-lg font-semibold shadow-lg cursor-pointer hover:bg-green-800 hover:shadow-xl transition-all"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
        <Footer />
      </div>
    );
};



export default CampaignsList;
