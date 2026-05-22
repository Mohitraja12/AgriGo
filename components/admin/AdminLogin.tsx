"use client";

import { useState } from "react";
import { Leaf, Eye, EyeOff, AlertCircle, Lock, Mail } from "lucide-react";

interface Props {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (email === "admin@agrigo.com" && password === "Agri@123") {
        onLogin();
      } else {
        setError("Invalid credentials. Please check your email and password.");
        setLoading(false);
      }
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#0D1F17] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#1B4332] rounded-full opacity-40 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#2D6A4F] rounded-full opacity-30 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1B4332]/10 rounded-full blur-3xl" />
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#52B788" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <div className="bg-[#0F2318]/80 backdrop-blur-xl border border-[#2D6A4F]/30 rounded-3xl p-8 md:p-10 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-[#1B4332] rounded-2xl mb-4 shadow-lg ring-1 ring-[#52B788]/20">
              <Leaf className="w-7 h-7 text-[#D4A853]" />
            </div>
            <h1
              className="text-2xl font-bold text-white tracking-widest"
              style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}
            >
              AGRIGO
            </h1>
            <p className="text-[#52B788]/70 text-sm mt-1 tracking-wide">Admin Control Panel</p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-[#2D6A4F]/30" />
            <Lock className="w-3.5 h-3.5 text-[#52B788]/40" />
            <div className="flex-1 h-px bg-[#2D6A4F]/30" />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-5 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[#52B788]/70 mb-2 tracking-widest uppercase">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52B788]/40" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@agrigo .com"
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-[#1B4332]/30 border border-[#2D6A4F]/30 rounded-xl text-white placeholder-[#52B788]/30 text-sm focus:outline-none focus:border-[#52B788]/60 focus:ring-2 focus:ring-[#52B788]/10 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-[#52B788]/70 mb-2 tracking-widest uppercase">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52B788]/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-12 py-3.5 bg-[#1B4332]/30 border border-[#2D6A4F]/30 rounded-xl text-white placeholder-[#52B788]/30 text-sm focus:outline-none focus:border-[#52B788]/60 focus:ring-2 focus:ring-[#52B788]/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#52B788]/40 hover:text-[#52B788] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-semibold rounded-xl transition-all text-sm tracking-wide flex items-center justify-center gap-2.5 mt-2 disabled:opacity-60 border border-[#52B788]/20 shadow-lg"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Authenticating...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Sign In to Dashboard
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-[#52B788]/30 mt-6">
            Protected area — AGRIGO internal use only
          </p>
        </div>
      </div>
    </div>
  );
}