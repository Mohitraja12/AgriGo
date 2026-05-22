"use client";

import { useState } from "react";
import {
  Leaf,
  LayoutDashboard,
  Home,
  Info,
  TrendingUp,
  Image as ImageIcon,
  Phone,
  Menu,
  X,
  LogOut,
  ChevronRight,
  Bell,
  Settings,
} from "lucide-react";

import AdminDashboard from "./AdminDashboard";
import HomepageEditor from "./HomepageEditor";
import AboutEditor from "./AboutEditor";
import SocialImpactEditor from "./SocialImpactEditor";
import GalleryEditor from "./GalleryEditor";
import ContactEditor from "./ContactEditor";
import SiteSettingsEditor from "./SiteSettingsEditor";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "homepage", label: "Homepage", icon: Home },
  { id: "about", label: "About Page", icon: Info },
  { id: "social-impact", label: "Social Impact", icon: TrendingUp },
  { id: "gallery", label: "Gallery", icon: ImageIcon },
  { id: "contact", label: "Contact Page", icon: Phone },
  { id: "settings", label: "Site Settings", icon: Settings },
];

interface Props {
  onLogout: () => void;
}

export default function AdminShell({ onLogout }: Props) {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const activeNav = navItems.find((n) => n.id === activeSection);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard": return <AdminDashboard onNavigate={setActiveSection} />;
      case "homepage": return <HomepageEditor />;
      case "about": return <AboutEditor />;
      case "social-impact": return <SocialImpactEditor />;
      case "gallery": return <GalleryEditor />;
      case "contact": return <ContactEditor />;
      case "settings": return <SiteSettingsEditor />;
      default: return <AdminDashboard onNavigate={setActiveSection} />;
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-[#2D6A4F]/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#1B4332] rounded-xl flex items-center justify-center shrink-0">
            <Leaf className="w-4 h-4 text-[#D4A853]" />
          </div>
          {sidebarOpen && (
            <div>
              <p className="text-white font-bold text-sm tracking-widest" style={{ fontFamily: "Georgia, serif" }}>
                AGRIGO
              </p>
              <p className="text-[#52B788]/50 text-[10px] tracking-wider uppercase">Admin Panel</p>
            </div>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { setActiveSection(item.id); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium group ${
                isActive
                  ? "bg-[#1B4332] text-white shadow-lg"
                  : "text-[#52B788]/60 hover:bg-[#1B4332]/40 hover:text-[#52B788]"
              }`}
            >
              <item.icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#D4A853]" : ""}`} />
              {sidebarOpen && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#D4A853]/60" />}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-5 pt-3 border-t border-[#2D6A4F]/20">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400/70 hover:bg-red-500/10 hover:text-red-400 transition-all text-sm font-medium"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {sidebarOpen && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A1A10] flex text-white">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-[#0D1F17] border-r border-[#2D6A4F]/20 transition-all duration-300 shrink-0 ${
          sidebarOpen ? "w-56" : "w-16"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
      <aside
        className={`md:hidden fixed left-0 top-0 bottom-0 z-50 w-60 bg-[#0D1F17] border-r border-[#2D6A4F]/20 transition-transform duration-300 flex flex-col ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-[#0D1F17] border-b border-[#2D6A4F]/20 px-4 md:px-6 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-[#52B788]/60 hover:text-[#52B788] transition-colors"
              onClick={() => setMobileSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            {/* Desktop sidebar toggle */}
            <button
              className="hidden md:block text-[#52B788]/60 hover:text-[#52B788] transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[#52B788]/40">Admin</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#52B788]/30" />
              <span className="text-white font-medium">{activeNav?.label}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {saved && (
              <span className="text-xs text-[#52B788] bg-[#52B788]/10 border border-[#52B788]/20 px-3 py-1.5 rounded-full flex items-center gap-1.5 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52B788]" />
                Changes saved
              </span>
            )}
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-xs font-semibold rounded-lg transition-colors border border-[#52B788]/20"
            >
              Save Changes
            </button>
            <div className="w-8 h-8 bg-[#1B4332] rounded-full flex items-center justify-center text-xs font-bold text-[#D4A853] border border-[#52B788]/20">
              A
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#0A1A10]">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}