import React from 'react'
import company_1 from '../../assets/company-1.png'
import company_2 from '../../assets/company-2.png'
import company_3 from '../../assets/company-3.png'
import company_4 from '../../assets/company-4.png'
import company_5 from '../../assets/company-5.png'
import company_6 from '../../assets/company-6.png'

const SupporterExperiences = () => {
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gray-100 px-6 py-12">
            {/* Company Logos Section */}
            <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-14 mb-20">
                {[company_1, company_2, company_3, company_4, company_5, company_6].map((company, index) => (
                    <img key={index} src={company} alt={`Company ${index + 1}`}
                        className="h-auto w-[80px] sm:w-[100px] md:w-[120px] lg:w-[140px] object-contain max-w-full transition-transform duration-300 hover:scale-110" />
                ))}
            </div>

            <div className="max-w-6xl w-full text-center">
                <p className="text-lg md:text-2xl lg:text-4xl text-green-600 font-semibold">Raise more</p>
                <h2 className="text-2xl md:text-4xl lg:text-4xl font-bold mt-6 text-gray-800">
                    Create unforgettable supporter experiences
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mt-16">
                {[
                    { title: "Direct appeals", desc: "Collect one-time and recurring gifts through a custom donation form or crowdfunding campaign to drive conversions and maximize retention." },
                    { title: "Fundraising events", desc: "Power your in-person, virtual, and hybrid event experiences with a robust event platform to drive more revenue for your mission." },
                    { title: "Peer-to-peer campaigns", desc: "Build your community and empower supporters to amplify your impact with branded peer-to-peer fundraising campaigns." }
                ].map((item, index) => (
                    <div key={index} className="text-center md:text-left bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 mt-2">{item.desc}</p>
                        <a href="#" className="text-green-600 font-semibold mt-3 inline-block hover:underline">Learn more</a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SupporterExperiences
