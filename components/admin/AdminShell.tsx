// components/admin/AdminShell.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Leaf, LayoutDashboard, Home, Info, TrendingUp,
  Image as ImageIcon, Phone, Menu, X, LogOut,
  ChevronRight, Settings,
} from "lucide-react";
import { signOutUser } from "@/lib/firebase/auth";

import AdminDashboard from "./AdminDashboard";
import HomepageEditor from "./HomepageEditor";
import AboutEditor from "./AboutEditor";
import SocialImpactEditor from "./SocialImpactEditor";
import GalleryEditor from "./GalleryEditor";
import ContactEditor from "./ContactEditor";
import SiteSettingsEditor from "./SiteSettingsEditor";
import { useAuth } from "@/context/AuthContext";

interface SidebarContentProps {
  sidebarOpen: boolean;
  activeSection: string;
  mobileSidebarOpen: boolean;
  setActiveSection: (section: string) => void;
  setMobileSidebarOpen: (open: boolean) => void;
  userEmail?: string | null;
  onLogout: () => void;
}

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

function SidebarContent({
  sidebarOpen,
  activeSection,
  mobileSidebarOpen,
  setActiveSection,
  setMobileSidebarOpen,
  userEmail,
  onLogout,
}: SidebarContentProps) {
  return (
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
                Soilx
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

      {/* User Info & Logout */}
      <div className="px-3 pb-5 pt-3 border-t border-[#E2EDE6]">
        {sidebarOpen && userEmail && (
          <div className="px-3 py-2 mb-2 text-xs text-[#6B8F71] truncate">
            {userEmail}
          </div>
        )}
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
}

export default function AdminShell({ onLogout }: Props) {
  const { user } = useAuth();
  const [activeSection, setActiveSection]       = useState("dashboard");
  const [sidebarOpen, setSidebarOpen]           = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [saved, setSaved]                       = useState(false);
  const [saving, setSaving]                     = useState(false);

  const activeNav = navItems.find((n) => n.id === activeSection);

  const handleSave = async () => {
    setSaving(true);
    // Wait a bit to show saving state
    await new Promise(resolve => setTimeout(resolve, 500));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleLogout = async () => {
    await signOutUser();
    onLogout();
  };

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":    return <AdminDashboard onNavigate={setActiveSection} />;
      case "homepage":     return <HomepageEditor onSaveComplete={handleSave} />;
      case "about":        return <AboutEditor onSaveComplete={handleSave} />;
      case "social-impact":return <SocialImpactEditor onSaveComplete={handleSave} />;
      case "gallery":      return <GalleryEditor onSaveComplete={handleSave} />;
      case "contact":      return <ContactEditor onSaveComplete={handleSave} />;
      case "settings":     return <SiteSettingsEditor onSaveComplete={handleSave} />;
      default:             return <AdminDashboard onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F5] flex text-[#1C1C1C]">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-white border-r border-[#E2EDE6] transition-all duration-300 shrink-0 shadow-sm ${
          sidebarOpen ? "w-56" : "w-16"
        }`}
      >
        <SidebarContent
          sidebarOpen={sidebarOpen}
          activeSection={activeSection}
          mobileSidebarOpen={mobileSidebarOpen}
          setActiveSection={setActiveSection}
          setMobileSidebarOpen={setMobileSidebarOpen}
          userEmail={user?.email}
          onLogout={handleLogout}
        />
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
        <SidebarContent
          sidebarOpen={sidebarOpen}
          activeSection={activeSection}
          mobileSidebarOpen={mobileSidebarOpen}
          setActiveSection={setActiveSection}
          setMobileSidebarOpen={setMobileSidebarOpen}
          userEmail={user?.email}
          onLogout={handleLogout}
        />
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
            {saving && (
              <span className="text-xs text-[#2D6A4F] bg-[#EDF7F1] border border-[#B7DECA] px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Saving...
              </span>
            )}
            {saved && !saving && (
              <span className="text-xs text-[#2D6A4F] bg-[#EDF7F1] border border-[#B7DECA] px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F]" />
                Changes saved
              </span>
            )}
            <div className="w-8 h-8 bg-[#1B4332] rounded-full flex items-center justify-center text-xs font-bold text-[#D4A853]">
              {user?.email?.[0]?.toUpperCase() || "A"}
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