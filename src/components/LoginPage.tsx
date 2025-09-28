import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useStore";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("⚠️ Please fill in both fields.");
      return;
    }

    // ✅ Allow login with any credentials
    login(username, password);
    navigate("/"); // Redirect to dashboard
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#282142] font-['Raleway']">
      <div className="flex w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Left Side (Form) */}
        <div className="w-1/2 bg-[#424769] p-10 text-white flex flex-col justify-center">
          {/* Logo + Title */}
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white mr-4 flex-shrink-0">
              <img
                src={`${import.meta.env.BASE_URL || '/'}logo.jpg`}
                alt="Rail Sanchalak Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-3xl font-semibold">Rail Sanchalak</h2>
          </div>

          <h3 className="text-2xl font-semibold mb-6">Welcome!</h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm mb-2">Username</label>
              <input
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="email@example.com"
                className="w-full p-3 rounded-lg bg-[#282142] border border-gray-600 text-sm focus:ring-2 focus:ring-[#f9b17a] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 rounded-lg bg-[#282142] border border-gray-600 text-sm focus:ring-2 focus:ring-[#f9b17a] outline-none"
              />
            </div>

            {error && <p className="text-red-400 text-sm font-medium">{error}</p>}

            <button
              type="submit"
              className="w-full bg-[#f9b17a] text-[#2d3250] font-semibold py-3 rounded-lg hover:bg-[#f7a864] transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right Side (Image) */}
        <div className="w-1/2">
          <img
            src="https://i.pinimg.com/736x/64/7a/40/647a4031c6c381b9300b738dfb67c8ac.jpg"
            alt="background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
