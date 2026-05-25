"use client";

import {
  Home, Info, TrendingUp, Image as ImageIcon, Phone, Settings,
  ArrowRight, Pencil, Users, FileText, ImagePlus,
} from "lucide-react";

const sections = [
  {
    id: "homepage",
    label: "Homepage",
    icon: Home,
    description: "Hero slider, stats band, intro section, core pillars, CTA block",
    items: ["3 Hero Slides", "4 Stat Counters", "4 Core Pillars", "Intro Copy"],
    accent: "#2D6A4F",
    bg: "#EDF5EF",
  },
  {
    id: "about",
    label: "About Page",
    icon: Info,
    description: "Mission, vision, values, milestones timeline, leadership team",
    items: ["Mission Statement", "Vision Statement", "4 Core Values", "6 Milestones", "3 Team Members"],
    accent: "#7C5C3B",
    bg: "#F5EFE8",
  },
  {
    id: "social-impact",
    label: "Social Impact",
    icon: TrendingUp,
    description: "Impact statistics counters and programme timeline entries",
    items: ["4 Stat Counters", "6 Timeline Entries", "1 Testimonial"],
    accent: "#2D6A4F",
    bg: "#EDF5EF",
  },
  {
    id: "gallery",
    label: "Gallery",
    icon: ImageIcon,
    description: "Photo gallery grid with category tags and captions",
    items: ["12 Gallery Images", "6 Categories", "Captions & Tags"],
    accent: "#7C5C3B",
    bg: "#F5EFE8",
  },
  {
    id: "contact",
    label: "Contact Page",
    icon: Phone,
    description: "Office addresses, department emails, social links",
    items: ["2 Office Addresses", "4 Department Emails", "Social Handles"],
    accent: "#1B4332",
    bg: "#EDF5EF",
  },
  {
    id: "settings",
    label: "Site Settings",
    icon: Settings,
    description: "Header navigation, footer details, global organisation info",
    items: ["Nav Links", "Footer Address", "Social Media Links", "Organisation Info"],
    accent: "#2D6A4F",
    bg: "#EDF5EF",
  },
];

const quickStats = [
  { label: "Total Pages",       value: "5",   icon: FileText,  delta: "All active"   },
  { label: "Gallery Images",    value: "12",  icon: ImagePlus, delta: "Manageable"   },
  { label: "Team Members",      value: "3",   icon: Users,     delta: "Editable"     },
  { label: "Editable Sections", value: "28+", icon: Pencil,    delta: "Ready to edit"},
];

interface Props { onNavigate: (section: string) => void; }

export default function AdminDashboard({ onNavigate }: Props) {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-[#1B4332] rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-64 opacity-10 pointer-events-none">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="160" cy="40"  r="90" fill="#52B788" />
            <circle cx="80"  cy="170" r="60" fill="#D4A853" />
          </svg>
        </div>
        <div className="relative z-10">
          <p className="text-[#52B788] text-xs uppercase tracking-widest mb-1 font-medium">Welcome back</p>
          <h1 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "Georgia, serif" }}>
            Soilx Admin Dashboard
          </h1>
          <p className="text-white/50 text-sm">
            Manage all website content from this panel. Click any section below to begin editing.
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-[#E2EDE6] rounded-xl p-4 hover:border-[#2D6A4F]/30 hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-8 h-8 bg-[#EDF5EF] rounded-lg flex items-center justify-center">
                <stat.icon className="w-4 h-4 text-[#2D6A4F]" />
              </div>
              <span className="text-[10px] text-[#6B8F71] bg-[#F0F7F2] px-2 py-0.5 rounded-full border border-[#D0E6D8]">
                {stat.delta}
              </span>
            </div>
            <p className="text-2xl font-bold text-[#1B4332]" style={{ fontFamily: "Georgia, serif" }}>
              {stat.value}
            </p>
            <p className="text-xs text-[#6B8F71] mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Section Cards */}
      <div>
        <h2 className="text-xs font-semibold text-[#6B8F71] uppercase tracking-widest mb-4">
          Edit Site Sections
        </h2>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {sections.map((section) => (
            <div
              key={section.id}
              className="bg-white border border-[#E2EDE6] rounded-2xl p-5 hover:border-[#2D6A4F]/30 hover:shadow-md transition-all group cursor-pointer"
              onClick={() => onNavigate(section.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: section.bg }}
                >
                  <section.icon className="w-5 h-5" style={{ color: section.accent }} />
                </div>
                <ArrowRight className="w-4 h-4 text-[#C4D9C8] group-hover:text-[#2D6A4F] group-hover:translate-x-0.5 transition-all" />
              </div>
              <h3 className="font-semibold text-[#1B4332] text-sm mb-1">{section.label}</h3>
              <p className="text-xs text-[#6B8F71] leading-relaxed mb-4">{section.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {section.items.map((item) => (
                  <span
                    key={item}
                    className="text-[10px] px-2 py-0.5 bg-[#F4F7F5] text-[#4A6650] rounded-full border border-[#D8EBE0]"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <button
                className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 bg-[#F4F7F5] hover:bg-[#1B4332] border border-[#D8EBE0] hover:border-transparent rounded-xl text-xs font-semibold text-[#4A6650] hover:text-white transition-all"
                onClick={(e) => { e.stopPropagation(); onNavigate(section.id); }}
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