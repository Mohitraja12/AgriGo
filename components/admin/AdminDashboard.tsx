"use client";

import {
  Home,
  Info,
  TrendingUp,
  Image as ImageIcon,
  Phone,
  Settings,
  ArrowRight,
  Eye,
  Pencil,
  Users,
  FileText,
  ImagePlus,
} from "lucide-react";

const sections = [
  {
    id: "homepage",
    label: "Homepage",
    icon: Home,
    description: "Hero slider, stats band, intro section, core pillars, CTA block",
    items: ["3 Hero Slides", "4 Stat Counters", "4 Core Pillars", "Intro Copy"],
    color: "#1B4332",
    accent: "#52B788",
  },
  {
    id: "about",
    label: "About Page",
    icon: Info,
    description: "Mission, vision, values, milestones timeline, leadership team",
    items: ["Mission Statement", "Vision Statement", "4 Core Values", "6 Milestones", "3 Team Members"],
    color: "#1B4332",
    accent: "#D4A853",
  },
  {
    id: "social-impact",
    label: "Social Impact",
    icon: TrendingUp,
    description: "Impact statistics counters and programme timeline entries",
    items: ["4 Stat Counters", "6 Timeline Entries", "1 Testimonial"],
    color: "#1B4332",
    accent: "#52B788",
  },
  {
    id: "gallery",
    label: "Gallery",
    icon: ImageIcon,
    description: "Photo gallery grid with category tags and captions",
    items: ["12 Gallery Images", "6 Categories", "Captions & Tags"],
    color: "#1B4332",
    accent: "#7C5C3B",
  },
  {
    id: "contact",
    label: "Contact Page",
    icon: Phone,
    description: "Office addresses, department emails, social links",
    items: ["2 Office Addresses", "4 Department Emails", "Social Handles"],
    color: "#1B4332",
    accent: "#D4A853",
  },
  {
    id: "settings",
    label: "Site Settings",
    icon: Settings,
    description: "Header navigation, footer details, global organisation info",
    items: ["Nav Links", "Footer Address", "Social Media Links", "Organisation Info"],
    color: "#1B4332",
    accent: "#52B788",
  },
];

const quickStats = [
  { label: "Total Pages", value: "5", icon: FileText, delta: "All active" },
  { label: "Gallery Images", value: "12", icon: ImagePlus, delta: "Manageable" },
  { label: "Team Members", value: "3", icon: Users, delta: "Editable" },
  { label: "Editable Sections", value: "28+", icon: Pencil, delta: "Ready to edit" },
];

interface Props {
  onNavigate: (section: string) => void;
}

export default function AdminDashboard({ onNavigate }: Props) {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-[#1B4332] to-[#0D1F17] rounded-2xl p-6 border border-[#2D6A4F]/30 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-48 opacity-10">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="150" cy="50" r="80" fill="#52B788" />
            <circle cx="100" cy="150" r="60" fill="#D4A853" />
          </svg>
        </div>
        <div className="relative z-10">
          <p className="text-[#52B788]/60 text-xs uppercase tracking-widest mb-1">Welcome back</p>
          <h1 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "Georgia, serif" }}>
            AGRIGO Admin Dashboard
          </h1>
          <p className="text-[#52B788]/60 text-sm">
            Manage all website content from this panel. Click any section below to begin editing.
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#0D1F17] border border-[#2D6A4F]/20 rounded-xl p-4 hover:border-[#52B788]/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-8 h-8 bg-[#1B4332] rounded-lg flex items-center justify-center">
                <stat.icon className="w-4 h-4 text-[#52B788]" />
              </div>
              <span className="text-[10px] text-[#52B788]/40 bg-[#52B788]/5 px-2 py-0.5 rounded-full border border-[#52B788]/10">
                {stat.delta}
              </span>
            </div>
            <p className="text-2xl font-bold text-white" style={{ fontFamily: "Georgia, serif" }}>
              {stat.value}
            </p>
            <p className="text-xs text-[#52B788]/50 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Section Cards */}
      <div>
        <h2 className="text-sm font-semibold text-[#52B788]/60 uppercase tracking-widest mb-4">
          Edit Site Sections
        </h2>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {sections.map((section) => (
            <div
              key={section.id}
              className="bg-[#0D1F17] border border-[#2D6A4F]/20 rounded-2xl p-5 hover:border-[#52B788]/30 transition-all group hover:shadow-lg hover:shadow-[#1B4332]/20 cursor-pointer"
              onClick={() => onNavigate(section.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-[#1B4332] rounded-xl flex items-center justify-center">
                  <section.icon className="w-5 h-5" style={{ color: section.accent }} />
                </div>
                <ArrowRight className="w-4 h-4 text-[#52B788]/30 group-hover:text-[#52B788] group-hover:translate-x-0.5 transition-all" />
              </div>
              <h3 className="font-semibold text-white text-sm mb-1">{section.label}</h3>
              <p className="text-xs text-[#52B788]/50 leading-relaxed mb-4">{section.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {section.items.map((item) => (
                  <span
                    key={item}
                    className="text-[10px] px-2 py-0.5 bg-[#1B4332]/40 text-[#52B788]/60 rounded-full border border-[#2D6A4F]/20"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <button
                className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 bg-[#1B4332]/40 hover:bg-[#1B4332] border border-[#2D6A4F]/20 hover:border-[#52B788]/30 rounded-xl text-xs font-semibold text-[#52B788]/70 hover:text-white transition-all"
                onClick={() => onNavigate(section.id)}
              >
                <Pencil className="w-3.5 h-3.5" />
                Edit {section.label}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}