"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Leaf, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { getSiteSettings, type SiteSettingsData } from "@/lib/firebase/firestore";

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

const defaultSiteSettings: SiteSettingsData = {
  orgName: "Soilx",
  orgTagline: "Rooted in purpose. Growing communities. Cultivating sustainable futures.",
  orgEstYear: "2015",
  orgEmail: "info@soilx.org",
  orgPhone: "+91 12345 67890",
  navLinks: quickLinks,
  footerTagline: "Rooted in purpose. Growing communities. Cultivating sustainable futures through agriculture, education, and social innovation.",
  footerAddress: "Soilx Organisation,\nSector 12, Krishi Nagar,\nPunjab — 143001, India",
  footerPhone1: "+91 12345 67890",
  footerPhone2: "+91 12345 67891",
  footerEmail1: "info@soilx.org",
  footerEmail2: "support@soilx.org",
  footerSocial: [
    { platform: "Facebook", handle: "@SoilxOfficial", url: "#" },
    { platform: "Instagram", handle: "@soilx.in", url: "#" },
    { platform: "Twitter / X", handle: "@SoilxIndia", url: "#" },
    { platform: "LinkedIn", handle: "Soilx Org", url: "#" },
    { platform: "YouTube", handle: "Soilx Channel", url: "#" },
  ],
  legalLinks: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Use", href: "#" },
    { label: "Sitemap", href: "#" },
  ],
  footerCtaHeading: "Ready to make an impact together?",
  footerCtaSubtitle: "Partner with Soilx to transform agriculture and empower communities.",
  siteTitle: "Soilx — Agriculture, Community & Social Impact",
  metaDescription: "Soilx is a purpose-driven organization focused on sustainable agriculture, community development, and measurable social impact across rural India.",
};

export default function Footer() {
  const [siteSettings, setSiteSettings] = useState<SiteSettingsData>(defaultSiteSettings);

  useEffect(() => {
    const loadSiteSettings = async () => {
      try {
        const settings = await getSiteSettings();
        if (settings?.data) {
          setSiteSettings(settings.data);
        }
      } catch (error: unknown) {
        console.error("Error loading site settings:", error);
      }
    };

    loadSiteSettings();
  }, []);

  const socialLinks = siteSettings.footerSocial.length > 0 ? siteSettings.footerSocial : defaultSiteSettings.footerSocial;
  const legalLinks = siteSettings.legalLinks.length > 0 ? siteSettings.legalLinks : defaultSiteSettings.legalLinks;
  const footerAddressLines = siteSettings.footerAddress.split("\n");

  return (
    <footer className="bg-[#1B4332] text-[#F7F4EE]">
      {/* Top CTA Strip */}
      <div className="border-b border-white/10 bg-[#2D6A4F]/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-lg font-semibold" style={{ fontFamily: "var(--font-playfair)" }}>
              {siteSettings.footerCtaHeading}
            </p>
            <p className="text-sm text-[#F7F4EE]/60 mt-0.5">
              {siteSettings.footerCtaSubtitle}
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
              Soilx
            </span>
          </div>
          <p className="text-sm text-[#F7F4EE]/60 leading-relaxed">
            {siteSettings.footerTagline}
          </p>
          <div className="mt-6 flex items-center gap-1 text-xs text-[#D4A853] font-medium tracking-widest uppercase">
            <span className="w-6 h-px bg-[#D4A853]" />
            Est. {siteSettings.orgEstYear}
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
                {footerAddressLines.map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < footerAddressLines.length - 1 && <br />}
                  </span>
                ))}
              </span>
            </li>
            <li className="flex gap-3 text-sm text-[#F7F4EE]/70">
              <Phone className="w-4 h-4 text-[#52B788] mt-0.5 shrink-0" />
              <div className="flex flex-col gap-1">
                <a href={`tel:${siteSettings.footerPhone1.replace(/\s/g, "")}`} className="hover:text-[#F7F4EE] transition-colors">{siteSettings.footerPhone1}</a>
                <a href={`tel:${siteSettings.footerPhone2.replace(/\s/g, "")}`} className="hover:text-[#F7F4EE] transition-colors">{siteSettings.footerPhone2}</a>
              </div>
            </li>
            <li className="flex gap-3 text-sm text-[#F7F4EE]/70">
              <Mail className="w-4 h-4 text-[#52B788] mt-0.5 shrink-0" />
              <div className="flex flex-col gap-1">
                <a href={`mailto:${siteSettings.footerEmail1}`} className="hover:text-[#F7F4EE] transition-colors">{siteSettings.footerEmail1}</a>
                <a href={`mailto:${siteSettings.footerEmail2}`} className="hover:text-[#F7F4EE] transition-colors">{siteSettings.footerEmail2}</a>
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
            {socialLinks.map((social, index) => (
              <li key={`${social.platform}-${social.url}-${index}`}>
                <a
                  href={social.url}
                  className="group flex items-center gap-3 text-sm text-[#F7F4EE]/60 hover:text-[#F7F4EE] transition-colors"
                >
                  <span className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-[#52B788]/30 transition-colors">
                    <span className="text-[10px] font-semibold uppercase leading-none text-[#F7F4EE]">
                      {socialBadgeClasses[social.platform] ?? (social.platform?.slice(0, 2) ?? "")}
                    </span>
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-xs text-[#F7F4EE]/40">{social.platform}</span>
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
        <p>© {new Date().getFullYear()} Soilx Organisation. All Rights Reserved.</p>
        <div className="flex gap-4">
          {legalLinks.map((link) => (
            <a key={link.label} href={link.href} className="hover:text-[#F7F4EE] transition-colors">{link.label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}