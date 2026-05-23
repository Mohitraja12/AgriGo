"use client";

import { useState } from "react";
import {
  Leaf, LayoutDashboard, Home, Info, TrendingUp,
  Image as ImageIcon, Phone, Menu, X, LogOut,
  ChevronRight, Settings,
} from "lucide-react";

import AdminDashboard from "./AdminDashboard";
import HomepageEditor from "./HomepageEditor";
import AboutEditor from "./AboutEditor";
import SocialImpactEditor from "./SocialImpactEditor";
import GalleryEditor from "./GalleryEditor";
import ContactEditor from "./ContactEditor";
import SiteSettingsEditor from "./SiteSettingsEditor";

const navItems = [
  { id: "dashboard",     label: "Dashboard",     icon: LayoutDashboard },
  { id: "homepage",      label: "Homepage",       icon: Home },
  { id: "about",         label: "About Page",     icon: Info },
  { id: "social-impact", label: "Social Impact",  icon: TrendingUp },
  { id: "gallery",       label: "Gallery",        icon: ImageIcon },
  { id: "contact",       label: "Contact Page",   icon: Phone },
  { id: "settings",      label: "Site Settings",  icon: Settings },
];

interface Props { onLogout: () => void; }

export default function AdminShell({ onLogout }: Props) {
  const [activeSection, setActiveSection]       = useState("dashboard");
  const [sidebarOpen, setSidebarOpen]           = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [saved, setSaved]                       = useState(false);

  const activeNav = navItems.find((n) => n.id === activeSection);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":    return <AdminDashboard onNavigate={setActiveSection} />;
      case "homepage":     return <HomepageEditor />;
      case "about":        return <AboutEditor />;
      case "social-impact":return <SocialImpactEditor />;
      case "gallery":      return <GalleryEditor />;
      case "contact":      return <ContactEditor />;
      case "settings":     return <SiteSettingsEditor />;
      default:             return <AdminDashboard onNavigate={setActiveSection} />;
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-[#E2EDE6]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#1B4332] rounded-xl flex items-center justify-center shrink-0">
            <Leaf className="w-4 h-4 text-[#D4A853]" />
          </div>
          {sidebarOpen && (
            <div>
              <p className="text-[#1B4332] font-bold text-sm tracking-widest" style={{ fontFamily: "Georgia, serif" }}>
                AGRIGO
              </p>
              <p className="text-[#6B8F71] text-[10px] tracking-wider uppercase">Admin Panel</p>
            </div>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { setActiveSection(item.id); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${
                isActive
                  ? "bg-[#1B4332] text-white shadow-sm shadow-[#1B4332]/20"
                  : "text-[#4A6650] hover:bg-[#EDF5EF] hover:text-[#1B4332]"
              }`}
            >
              <item.icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#D4A853]" : "text-[#6B8F71]"}`} />
              {sidebarOpen && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#D4A853]/70" />}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-5 pt-3 border-t border-[#E2EDE6]">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500/70 hover:bg-red-50 hover:text-red-600 transition-all text-sm font-medium"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {sidebarOpen && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F4F7F5] flex text-[#1C1C1C]">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-white border-r border-[#E2EDE6] transition-all duration-300 shrink-0 shadow-sm ${
          sidebarOpen ? "w-56" : "w-16"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
      <aside
        className={`md:hidden fixed left-0 top-0 bottom-0 z-50 w-60 bg-white border-r border-[#E2EDE6] transition-transform duration-300 flex flex-col shadow-xl ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-[#E2EDE6] px-4 md:px-6 py-3.5 flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-[#6B8F71] hover:text-[#1B4332] transition-colors"
              onClick={() => setMobileSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              className="hidden md:block text-[#6B8F71] hover:text-[#1B4332] transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[#A0BEA8]">Admin</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#C4D9C8]" />
              <span className="text-[#1B4332] font-semibold">{activeNav?.label}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {saved && (
              <span className="text-xs text-[#2D6A4F] bg-[#EDF7F1] border border-[#B7DECA] px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F]" />
                Changes saved
              </span>
            )}
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
            >
              Save Changes
            </button>
            <div className="w-8 h-8 bg-[#1B4332] rounded-full flex items-center justify-center text-xs font-bold text-[#D4A853]">
              A
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}