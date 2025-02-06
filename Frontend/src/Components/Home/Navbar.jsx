import React, { useState } from "react";
import { Menu, X, Search, User, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [logedin, setlogedin] = useState(
      localStorage.getItem("token") ? true : false
    );
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    // Function to close the menu
    const closeMenu = () => setIsOpen(false);

    //Function to logout
    const logout=()=>{
        localStorage.clear()
        setlogedin(false)
    }

    return (
        <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center fixed top-0 w-full z-50">
            {/* Left Side - Logo */}
            <div className="flex items-center space-x-6">
                <h1 className="text-2xl font-bold text-green-600">LaunchFund</h1>
                <div className="hidden lg:flex space-x-4">
                    <a
                        href="#"
                        className="text-gray-700 hover:text-green-500 transition-transform transform hover:scale-105"
                    >
                        Explore
                    </a>
                </div>
            </div>

            {/* Search Bar - Only Visible on Large Screens */}
            <div className="hidden lg:flex items-center bg-gray-100 rounded-md px-4 py-2">
                <Search className="text-gray-500 mr-3" size={20} />
                <input
                    type="text"
                    placeholder="Search crowdfunding..."
                    className="bg-transparent outline-none text-gray-700 lg:w-64 xl:w-80"
                />
            </div>

            {/* Right Side - Login & Campaign (Hidden on Small Screens) */}
            <div className="hidden lg:flex items-center space-x-4">
                {logedin?<button
                    onClick={() => logout()}
                    className="text-gray-700 hover:text-green-500 transition-transform transform hover:scale-105 flex items-center gap-1 cursor-pointer"
                >
                    <User size={18} /> Logout
                </button>:<button
                    onClick={() => navigate('/login')}
                    className="text-gray-700 hover:text-green-500 transition-transform transform hover:scale-105 flex items-center gap-1 cursor-pointer"
                >
                    <User size={18} /> Login / Sign up
                </button>}
                <button className="border border-green-400 text-green-600 px-4 py-2 rounded-md hover:bg-green-400 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center gap-1 cursor-pointer">
                    <Rocket size={18} /> START A CAMPAIGN
                </button>
            </div>

            {/* Mobile Menu Icon - Only visible on md & sm screens */}
            <div className="lg:hidden flex items-center justify-center">
                <button
                    className="text-gray-700 text-2xl cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown (Appears only in sm & md screens) */}
            <div
                className={`absolute top-14 left-0 w-full bg-white shadow-md flex flex-col items-center py-4 space-y-4 lg:hidden transition-transform origin-top ${isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                    }`}
                style={{ transformOrigin: "top" }}
            >
                <a
                    href="#"
                    className="text-gray-700 hover:text-green-500 transition-transform transform hover:scale-105"
                    onClick={closeMenu}
                >
                    Explore
                </a>
                <a
                    href="#"
                    className="text-gray-700 hover:text-green-500 transition-transform transform hover:scale-105"
                    onClick={closeMenu}
                >
                    IndieShop
                </a>
                <button
                    onClick={() => navigate('/signup')}
                    className="text-gray-700 hover:text-green-500 transition-transform transform hover:scale-105 flex items-center gap-1 cursor-pointer"
                >
                    <User size={18} /> Login / Sign up
                </button>
                <button
                    className="border border-green-400 text-green-600 px-4 py-2 rounded-md hover:bg-green-400 hover:text-white transition-all transform hover:scale-105 flex items-center gap-1"
                    onClick={closeMenu}
                >
                    <Rocket size={18} /> START A CAMPAIGN
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
