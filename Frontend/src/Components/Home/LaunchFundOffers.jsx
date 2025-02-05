import React from 'react';
import { ThumbsUp, PhoneCall, Currency, DollarSign, Zap, CreditCard } from "lucide-react";

const offers = [
    { icon: <ThumbsUp size={36} />, text: "Starting a fundraiser on LaunchFund is absolutely free." },
    { icon: <PhoneCall size={36} />, text: "24x7 assistance from dedicated fundraiser managers throughout your fundraising journey." },
    { icon: <Currency size={36} />, text: "We accept donations in multiple currencies from anywhere in the world." },
    { icon: <DollarSign size={36} />, text: "You can withdraw your funds at any point during the course of your fundraiser." },
    { icon: <Zap size={36} />, text: "Get instant updates on your fundraiser's progress on a real-time dashboard." },
    { icon: <CreditCard size={36} />, text: "Accepts donations via all cards, net banking, UPI, and online wallets." },
];

const LaunchFundOffers = () => {
    return (
        <div className="w-full min-h-screen flex items-center justify-center px-6 py-16">
            <div className="max-w-6xl w-full text-center">
                <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-800 mb-14">What LaunchFund Offers?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {offers.map((offer, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center p-6 rounded-xl shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300"
                        >
                            <div className="text-green-600 mb-4 bg-green-100 p-3 rounded-full shadow-inner">{offer.icon}</div>
                            <p className="text-lg font-medium text-gray-600 leading-relaxed">{offer.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LaunchFundOffers;
