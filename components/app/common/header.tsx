"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Leaf } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Social Impact", href: "/social-impact" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // On homepage hero, header overlays the dark image — use white text when not scrolled
  const isHero = pathname === "/";
  const overlayMode = isHero && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#F7F4EE]/95 backdrop-blur-md shadow-sm border-b border-[#1B4332]/10"
          : overlayMode
          ? "bg-gradient-to-b from-black/40 to-transparent"
          : "bg-[#F7F4EE]/95 backdrop-blur-md border-b border-[#1B4332]/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-18 flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors ${overlayMode ? "bg-white/20 group-hover:bg-white/30" : "bg-[#1B4332] group-hover:bg-[#2D6A4F]"}`}>
            <Leaf className={`w-5 h-5 ${overlayMode ? "text-[#D4A853]" : "text-[#D4A853]"}`} />
          </div>
          <span
            className={`text-2xl font-bold tracking-widest transition-colors ${overlayMode ? "text-white drop-shadow-md" : "text-[#1B4332]"}`}
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            AGRIGO
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-200 rounded-full
                  ${overlayMode
                    ? isActive
                      ? "text-white bg-white/20"
                      : "text-white/85 hover:text-white hover:bg-white/15"
                    : isActive
                      ? "text-[#1B4332] bg-[#1B4332]/10"
                      : "text-[#1C1C1C]/70 hover:text-[#1B4332] hover:bg-[#1B4332]/8"
                  }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#D4A853] rounded-full" />
                )}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className={`ml-3 px-5 py-2.5 text-sm font-semibold rounded-full transition-colors shadow-sm ${
              overlayMode
                ? "bg-white/20 text-white border border-white/30 hover:bg-white/30 backdrop-blur-sm"
                : "bg-[#1B4332] text-[#F7F4EE] hover:bg-[#2D6A4F]"
            }`}
          >
            Get in Touch
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${overlayMode ? "text-white" : "text-[#1B4332]"}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#F7F4EE]/95 backdrop-blur-md border-t border-[#1B4332]/10 px-6 pb-6 pt-2 flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 rounded-xl text-base font-medium transition-colors
                  ${
                    isActive
                      ? "bg-[#1B4332]/10 text-[#1B4332] font-semibold"
                      : "text-[#1C1C1C]/70 hover:bg-[#1B4332]/5 hover:text-[#1B4332]"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="mt-3 px-5 py-3 bg-[#1B4332] text-[#F7F4EE] text-sm font-semibold rounded-xl text-center hover:bg-[#2D6A4F] transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </header>
  );
}