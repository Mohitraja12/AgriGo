// components/admin/AdminLogin.tsx
"use client";

import { useState } from "react";
import { Leaf, Eye, EyeOff, AlertCircle, Lock, Mail } from "lucide-react";
import { signIn } from "@/lib/firebase/auth";

interface Props {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn({ email, password });
      onLogin();
    } catch (err: unknown) {
      console.error("Login error:", err);
      const code = typeof err === "object" && err !== null && "code" in err ? String((err as { code?: string }).code) : "";
      if (code === "auth/user-not-found") {
        setError("No account found with this email address.");
      } else if (code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else if (code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (code === "auth/too-many-requests") {
        setError("Too many failed attempts. Please try again later.");
      } else {
        setError("Invalid credentials. Please check your email and password.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F7F4] via-[#E8F5EE] to-[#F5F0E8] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Soft background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#2D6A4F]/8 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#D4A853]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-[#52B788]/8 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-[#1B4332]/8 border border-[#1B4332]/8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-[#1B4332] rounded-2xl mb-4 shadow-md">
              <Leaf className="w-7 h-7 text-[#D4A853]" />
            </div>
            <h1
              className="text-2xl font-bold text-[#1B4332] tracking-widest"
              style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}
            >
              AGRIGO
            </h1>
            <p className="text-[#6B8F71] text-sm mt-1">Admin Control Panel</p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-[#E2EDE6]" />
            <Lock className="w-3.5 h-3.5 text-[#A0BEA8]" />
            <div className="flex-1 h-px bg-[#E2EDE6]" />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#4A7C59] mb-2 tracking-widest uppercase">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0BEA8]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@agrigo.org"
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-[#F7FAF8] border border-[#D0E6D8] rounded-xl text-[#1C1C1C] placeholder-[#A0BEA8] text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/10 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4A7C59] mb-2 tracking-widest uppercase">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0BEA8]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-12 py-3.5 bg-[#F7FAF8] border border-[#D0E6D8] rounded-xl text-[#1C1C1C] placeholder-[#A0BEA8] text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A0BEA8] hover:text-[#2D6A4F] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-semibold rounded-xl transition-all text-sm flex items-center justify-center gap-2.5 mt-2 disabled:opacity-60 shadow-md shadow-[#1B4332]/20"
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

          <p className="text-center text-xs text-[#A0BEA8] mt-6">
            Protected area — AGRIGO internal use only
          </p>
        </div>
      </div>
    </div>
  );
}