import { useState } from "react";
import axios from "axios";

export default function LoginSignup() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("https://your-api-endpoint.com/auth", {
        email,
        password,
        isSignup,
      });
      console.log(response.data);
    } catch (err) {
      setError("Invalid input. Please check your details.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center">
          <img src="/logo.png" alt="Logo" className="w-16 h-16" />
        </div>
        <h2 className="text-2xl font-bold text-center">{isSignup ? "Sign Up" : "Login"}</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {isSignup ? "Create Account" : "Login"}
          </button>
        </form>
        <button className="w-full py-2 mt-2 text-black border border-gray-400 rounded-md hover:bg-gray-100">
          Continue with Google
        </button>
        <p className="text-center">
          {isSignup ? "Already have an account?" : "Don't have an account?"} 
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? " Login" : " Create an account"}
          </span>
        </p>
      </div>
    </div>
  );
}
