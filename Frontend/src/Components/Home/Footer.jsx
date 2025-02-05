import { Facebook, Twitter, Youtube, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 px-6">
      <div className="max-w-screen-xl mx-auto space-y-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-10">
          {/* Left Section */}
          <div className="space-y-6 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-green-600">LaunchFund</h2>
            <p className="text-base sm:text-lg text-gray-400">
              Empowering the future of creators, innovators, and communities since 2008. Join our mission.
            </p>
            <div className="flex flex-wrap justify-start sm:justify-start space-x-4 sm:space-x-6">
              <Facebook className="w-6 sm:w-8 h-6 sm:h-8 cursor-pointer hover:text-green-600 transition-all duration-300" />
              <Twitter className="w-6 sm:w-8 h-6 sm:h-8 cursor-pointer hover:text-green-600 transition-all duration-300" />
              <Youtube className="w-6 sm:w-8 h-6 sm:h-8 cursor-pointer hover:text-green-600 transition-all duration-300" />
              <Instagram className="w-6 sm:w-8 h-6 sm:h-8 cursor-pointer hover:text-green-600 transition-all duration-300" />
              <Linkedin className="w-6 sm:w-8 h-6 sm:h-8 cursor-pointer hover:text-green-600 transition-all duration-300" />
            </div>
          </div>

          {/* Navigation Sections */}
          {[
            { title: "About Us", links: ["Team LaunchFund", "Careers", "LaunchFund Blog", "Success Stories", "Press & Awards", "Contact Us"] },
            { title: "Learn", links: ["What is Crowdfunding?", "Fundraising Ideas", "Fundraising Tips", "Frequently Asked Questions", "Pricing & Fees", "Trust & Safety"] },
            { title: "Top Categories", links: ["Medical crowdfunding", "Cancer Crowdfunding", "Transplant Crowdfunding", "Education Crowdfunding", "Sports Crowdfunding", "NGO Crowdfunding", "Animal Fundraisers", "Emergency Crowdfunding"] },
          ].map((section, index) => (
            <div key={index} className="space-y-4 w-full md:w-auto">
              <h3 className="font-semibold text-lg sm:text-xl text-gray-300">{section.title}</h3>
              <ul className="space-y-2 sm:space-y-3 text-sm text-gray-400">
                {section.links.map((link, i) => (
                  <li key={i} className="cursor-pointer hover:text-green-600 transition-all duration-300">{link}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-xs text-gray-500 mb-4">© 2025 LaunchFund, Inc. All Rights Reserved</p>
          <div className="flex flex-wrap justify-center space-x-2 sm:space-x-8 text-xs text-gray-500">
            {["Terms of Use", "Privacy Policy", "Cookie Policy", "Do Not Sell My Personal Information"].map((item, index) => (
              <span key={index} className="cursor-pointer hover:text-green-600 transition duration-300 px-1 sm:px-2">{item}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
