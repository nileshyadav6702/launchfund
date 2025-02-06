import React from "react";
import Hero_Image from '../../assets/Hero_image.webp'
import { Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";


const Hero = () => {

    const navigate = useNavigate();

    return (
        <div className="flex flex-col md:flex-row items-center justify-center px-6 md:px-16 py-16 bg-white h-screen mt-20 md:mt-0">
            {/* Left Content */}
            <div className="max-w-2xl text-center md:text-left">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                    A smarter way <br /> to online fundraise
                </h1>
                <p className="text-gray-600 text-base lg:text-lg mt-4">
                    Create personalized experiences at scale and build a connected
                    community of supporters with Classy's intelligent fundraising platform.
                </p>
                {/* Button - Center on smaller screens */}
                <div className="mt-6 flex justify-center md:justify-start">
                    <button onClick={() => navigate('/start_campaign')} className="border border-green-400 text-green-600 px-4 py-2 rounded-md hover:bg-green-400 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center gap-1 cursor-pointer">
                        <Rocket size={18} /> START A CAMPAIGN
                    </button>
                </div>
            </div>

            {/* Right Image */}
            <div className="mt-10 md:mt-0 md:ml-12 w-full max-w-lg">
                <img
                    src={Hero_Image}
                    alt="Fundraising platform"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
};

export default Hero;

