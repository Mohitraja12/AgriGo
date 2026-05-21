import Link from "next/link";
import { Leaf, MapPin, Phone, Mail, ArrowRight } from "lucide-react";

const socialBadgeClasses: Record<string, string> = {
  Facebook: "f",
  Instagram: "ig",
  "Twitter / X": "x",
  LinkedIn: "in",
  YouTube: "yt",
};

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Social Impact", href: "/social-impact" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];

const socialLinks = [
  { label: "Facebook", href: "#", handle: "@AgrigoOfficial" },
  { label: "Instagram", href: "#", handle: "@agrigo.in" },
  { label: "Twitter / X", href: "#", handle: "@AgrigoIndia" },
  { label: "LinkedIn", href: "#", handle: "AGRIGO Org" },
  { label: "YouTube", href: "#", handle: "AGRIGO Channel" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1B4332] text-[#F7F4EE]">
      {/* Top CTA Strip */}
      <div className="border-b border-white/10 bg-[#2D6A4F]/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-lg font-semibold" style={{ fontFamily: "var(--font-playfair)" }}>
              Ready to make an impact together?
            </p>
            <p className="text-sm text-[#F7F4EE]/60 mt-0.5">
              Partner with AGRIGO to transform agriculture and empower communities.
            </p>
          </div>
          <Link
            href="/contact"
            className="flex items-center gap-2 px-6 py-3 bg-[#D4A853] text-[#1B4332] font-semibold text-sm rounded-full hover:bg-[#e0b86a] transition-colors whitespace-nowrap"
          >
            Get in Touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 bg-[#D4A853] rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-[#1B4332]" />
            </div>
            <span
              className="text-2xl font-bold tracking-widest text-[#F7F4EE]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              AGRIGO
            </span>
          </div>
          <p className="text-sm text-[#F7F4EE]/60 leading-relaxed">
            Rooted in purpose. Growing communities. Cultivating sustainable futures through agriculture, education, and social innovation.
          </p>
          <div className="mt-6 flex items-center gap-1 text-xs text-[#D4A853] font-medium tracking-widest uppercase">
            <span className="w-6 h-px bg-[#D4A853]" />
            Est. 2015
          </div>
        </div>

        {/* Address Column */}
        <div>
          <h4
            className="text-sm font-semibold tracking-widest uppercase text-[#D4A853] mb-6"
          >
            Contact Info
          </h4>
          <ul className="space-y-4">
            <li className="flex gap-3 text-sm text-[#F7F4EE]/70">
              <MapPin className="w-4 h-4 text-[#52B788] mt-0.5 shrink-0" />
              <span>
                AGRIGO Organisation,<br />
                Sector 12, Krishi Nagar,<br />
                Punjab — 143001, India
              </span>
            </li>
            <li className="flex gap-3 text-sm text-[#F7F4EE]/70">
              <Phone className="w-4 h-4 text-[#52B788] mt-0.5 shrink-0" />
              <div className="flex flex-col gap-1">
                <a href="tel:+911234567890" className="hover:text-[#F7F4EE] transition-colors">+91 12345 67890</a>
                <a href="tel:+911234567891" className="hover:text-[#F7F4EE] transition-colors">+91 12345 67891</a>
              </div>
            </li>
            <li className="flex gap-3 text-sm text-[#F7F4EE]/70">
              <Mail className="w-4 h-4 text-[#52B788] mt-0.5 shrink-0" />
              <div className="flex flex-col gap-1">
                <a href="mailto:info@agrigo.org" className="hover:text-[#F7F4EE] transition-colors">info@agrigo.org</a>
                <a href="mailto:support@agrigo.org" className="hover:text-[#F7F4EE] transition-colors">support@agrigo.org</a>
              </div>
            </li>
          </ul>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="text-sm font-semibold tracking-widest uppercase text-[#D4A853] mb-6">
            Quick Links
          </h4>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-center gap-2 text-sm text-[#F7F4EE]/60 hover:text-[#F7F4EE] transition-colors"
                >
                  <span className="w-0 group-hover:w-4 h-px bg-[#52B788] transition-all duration-300" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Column */}
        <div>
          <h4 className="text-sm font-semibold tracking-widest uppercase text-[#D4A853] mb-6">
            Follow Us
          </h4>
          <ul className="space-y-3">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="group flex items-center gap-3 text-sm text-[#F7F4EE]/60 hover:text-[#F7F4EE] transition-colors"
                >
                  <span className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-[#52B788]/30 transition-colors">
                    <span className="text-[10px] font-semibold uppercase leading-none text-[#F7F4EE]">
                      {socialBadgeClasses[social.label] ?? social.label.slice(0, 2)}
                    </span>
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-xs text-[#F7F4EE]/40">{social.label}</span>
                    <span>{social.handle}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#F7F4EE]/40">
        <p>© {new Date().getFullYear()} AGRIGO Organisation. All Rights Reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-[#F7F4EE] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#F7F4EE] transition-colors">Terms of Use</a>
          <a href="#" className="hover:text-[#F7F4EE] transition-colors">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}