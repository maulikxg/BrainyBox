import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { Logo } from "../icons/Logo";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    await axios.post(`${BACKEND_URL}/api/v1/signup`, { username, password });

    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mb-6 shadow-lg">
              <div className="text-white">
                <Logo />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Join Brainly</h1>
            <p className="text-gray-300">
              Create your account and start building your second brain 🚀
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">
                Username
              </label>
              <input
                ref={usernameRef}
                placeholder="Choose a username"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">
                Password
              </label>
              <input
                ref={passwordRef}
                type="password"
                placeholder="Create a strong password"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
              />
            </div>

            <button
              onClick={signup}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-blue-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
            >
              Create Account
            </button>
          </div>

          {/* Features */}
          <div className="my-6">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center text-gray-300 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                Store and organize your content
              </div>
              <div className="flex items-center text-gray-300 text-sm">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                Share your knowledge with others
              </div>
              <div className="flex items-center text-gray-300 text-sm">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                Access from anywhere, anytime
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-white/20"></div>
            <span className="px-4 text-sm text-gray-300">or</span>
            <div className="flex-1 border-t border-white/20"></div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-gray-300">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/")}
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        {/* Bottom decorative text */}
        <div className="text-center mt-8">
          <p className="text-white/60 text-sm">
            Free • No Credit Card Required • Start in Seconds
          </p>
        </div>
      </div>
    </div>
  );
}
