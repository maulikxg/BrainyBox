import axios from "axios";

import { useRef } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { Logo } from "../icons/Logo";

export function SignIn() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username,
      password,
    });

    const jwt = response.data.token;
    localStorage.setItem("token", jwt);

    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 flex items-center justify-center p-4">
      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-teal-300 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-cyan-200 rounded-full opacity-25 animate-ping"></div>
      </div>

      <div className="relative w-full max-w-6xl flex items-center justify-center">
        {/* Split Layout */}
        <div className="grid lg:grid-cols-2 gap-8 w-full">
          {/* Left Side - Marketing Content */}
          <div className="hidden lg:flex flex-col justify-center space-y-8 p-12">
            <div>
              <h2 className="text-5xl font-bold text-gray-800 leading-tight mb-6">
                Welcome Back to Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                  {" "}
                  Digital Brain
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Continue organizing and accessing your knowledge with Brainly
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🔍</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">
                    Instant Search
                  </h3>
                  <p className="text-gray-600">
                    Find any saved content in seconds with powerful search
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🔐</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">
                    Secure Access
                  </h3>
                  <p className="text-gray-600">
                    Your data is protected with enterprise-grade security
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📱</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">
                    Cross-Platform
                  </h3>
                  <p className="text-gray-600">
                    Access your brain from any device, anywhere
                  </p>
                </div>
              </div>
            </div>

            {/* Demo Credentials for Marketing Side */}
            <div className="pt-8">
              <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-amber-600 text-lg">🚀</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-amber-800 mb-1">
                      Demo Access Available
                    </h4>
                    <p className="text-sm text-amber-700 mb-3">
                      Try Brainly with these demo credentials:
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/70 rounded-lg px-3 py-2 border border-amber-200">
                        <div className="text-xs font-medium text-amber-600 uppercase tracking-wide">
                          Username
                        </div>
                        <div className="text-sm font-bold text-amber-800 font-mono">
                          user
                        </div>
                      </div>
                      <div className="bg-white/70 rounded-lg px-3 py-2 border border-amber-200">
                        <div className="text-xs font-medium text-amber-600 uppercase tracking-wide">
                          Password
                        </div>
                        <div className="text-sm font-bold text-amber-800 font-mono">
                          user
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (usernameRef.current)
                          usernameRef.current.value = "user";
                        if (passwordRef.current)
                          passwordRef.current.value = "user";
                      }}
                      className="mt-3 text-xs font-medium text-amber-700 hover:text-amber-800 underline hover:no-underline transition-all duration-200"
                    >
                      Click to auto-fill credentials
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Sign In Form */}
          <div className="flex items-center justify-center p-8">
            <div className="w-full max-w-md">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl mb-4 shadow-lg">
                    <div className="text-white">
                      <Logo />
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Welcome Back
                  </h1>
                  <p className="text-gray-600">
                    Sign in to access your second brain
                  </p>
                </div>

                {/* Form */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <input
                      ref={usernameRef}
                      placeholder="Enter your username"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      ref={passwordRef}
                      type="password"
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  <button
                    onClick={signin}
                    className="w-full py-4 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 focus:ring-4 focus:ring-emerald-200 transform hover:translate-y-[-2px] transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Sign In to Your Brain
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-green-500 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Secure Login
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-green-500 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Remember Me
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-green-500 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Fast Access
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                  <p className="text-gray-600">
                    Don't have an account?{" "}
                    <button
                      onClick={() => navigate("/signup")}
                      className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200"
                    >
                      Sign up here
                    </button>
                  </p>
                </div>
              </div>

              {/* Mobile Stats */}
              <div className="lg:hidden mt-8 text-center">
                <div className="flex justify-center space-x-8">
                  <div>
                    <div className="text-xl font-bold text-emerald-600">β</div>
                    <div className="text-xs text-gray-500">Beta</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-teal-600">100%</div>
                    <div className="text-xs text-gray-500">Free</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-cyan-600">2024</div>
                    <div className="text-xs text-gray-500">Launch</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
