import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

function Signup() {
  const url = "https://launchfund.onrender.com";
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Start loading

    try {
      const response = await axios.post(`${url}/user/signup`, {
        username,
        email,
        password,
        isSignup: true,
      });

      toast.success("Account created successfully!");

      setUsername("");
      setEmail("");
      setPassword("");

      setTimeout(() => navigate("/login"), 2000);
      console.log(response.data);
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-600 to-green-300 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-green-600 tracking-wide">
            LaunchFund
          </h1>
          <p className="mt-2 text-lg font-medium text-gray-600">
            Create an account to get started
          </p>
        </div>

        {error && (
          <p className="text-red-500 text-center text-sm mb-4">{error}</p>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex items-center space-x-3">
            <User size={20} className="text-gray-500" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
              required
            />
          </div>
          <div className="flex items-center space-x-3">
            <Mail size={20} className="text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
              required
            />
          </div>
          <div className="relative">
            <div className="flex items-center space-x-3">
              <Lock size={20} className="text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200 pr-12"
                required
              />
            </div>

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? (
                <EyeOff size={20} className="text-gray-500" />
              ) : (
                <Eye size={20} className="text-gray-500" />
              )}
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white font-semibold bg-green-600 rounded-md hover:bg-green-500 transition duration-200 cursor-pointer flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <ClipLoader color="#fff" size={20} />
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            className="text-green-500 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default Signup;
