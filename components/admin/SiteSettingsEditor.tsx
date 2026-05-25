// components/admin/SiteSettingsEditor.tsx
"use client";

import { useState, useEffect } from "react";
import { Settings, Globe, MapPin, Mail, Phone } from "lucide-react";
import {
  EditorSection,
  Field,
  TextInput,
  Textarea,
  TwoCol,
  ItemCard,
  AddButton,
  EditorPageHeader,
} from "./AdminUI";
import { getSiteSettings, updateSiteSettings, type SiteSettingsData } from "@/lib/firebase/firestore";

interface Props {
  onSaveComplete?: () => void;
}

const defaultData: SiteSettingsData = {
  orgName: "Soilx",
  orgTagline: "Rooted in purpose. Growing communities. Cultivating sustainable futures.",
  orgEstYear: "2015",
  orgEmail: "info@soilx.org",
  orgPhone: "+91 12345 67890",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Social Impact", href: "/social-impact" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact Us", href: "/contact" },
  ],
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

export default function SiteSettingsEditor({ onSaveComplete }: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [data, setData] = useState<SiteSettingsData>(defaultData);

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("[SiteSettingsEditor] Loading site settings from Firestore...");
        const content = await getSiteSettings();
        if (content?.data) {
          console.log("[SiteSettingsEditor] Loaded site settings:", content.data);
          setData(content.data);
        }
      } catch (error: unknown) {
        console.error("Error loading site settings:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const updateNav = (i: number, key: string, val: string) => {
    setData(prev => ({
      ...prev,
      navLinks: prev.navLinks.map((n, idx) => (idx === i ? { ...n, [key]: val } : n))
    }));
  };

  const addNav = () => {
    setData(prev => ({
      ...prev,
      navLinks: [...prev.navLinks, { label: "New Page", href: "/new-page" }]
    }));
  };

  const removeNav = (i: number) => {
    setData(prev => ({
      ...prev,
      navLinks: prev.navLinks.filter((_, idx) => idx !== i)
    }));
  };

  const updateSocial = (i: number, key: string, val: string) => {
    setData(prev => ({
      ...prev,
      footerSocial: prev.footerSocial.map((s, idx) => (idx === i ? { ...s, [key]: val } : s))
    }));
  };

  const addSocial = () => {
    setData(prev => ({
      ...prev,
      footerSocial: [...prev.footerSocial, { platform: "Platform", handle: "@handle", url: "#" }]
    }));
  };

  const removeSocial = (i: number) => {
    setData(prev => ({
      ...prev,
      footerSocial: prev.footerSocial.filter((_, idx) => idx !== i)
    }));
  };

  const updateLegal = (i: number, key: string, val: string) => {
    setData(prev => ({
      ...prev,
      legalLinks: prev.legalLinks.map((l, idx) => (idx === i ? { ...l, [key]: val } : l))
    }));
  };

  const addLegal = () => {
    setData(prev => ({
      ...prev,
      legalLinks: [...prev.legalLinks, { label: "New Link", href: "#" }]
    }));
  };

  const removeLegal = (i: number) => {
    setData(prev => ({
      ...prev,
      legalLinks: prev.legalLinks.filter((_, idx) => idx !== i)
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      console.log("[SiteSettingsEditor] Saving site settings to Firestore:", data);
      await updateSiteSettings({ data });
      console.log("[SiteSettingsEditor] Site settings saved successfully");
      if (onSaveComplete) onSaveComplete();
    } catch (error: unknown) {
      console.error("Error saving site settings:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#1B4332] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <EditorPageHeader
        icon={Settings}
        title="Site Settings"
        description="Configure global settings — organisation info, header navigation, footer content, and SEO metadata."
      />

      <div className="flex justify-end mb-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-[#1B4332] text-white rounded-lg text-sm font-semibold hover:bg-[#2D6A4F] disabled:opacity-60 transition-colors"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Organisation Info */}
      <EditorSection title="Organisation Information" subtitle="Core details used throughout the site">
        <TwoCol>
          <Field label="Organisation Name">
            <TextInput value={data.orgName} onChange={(v) => setData(prev => ({ ...prev, orgName: v }))} placeholder="Soilx" />
          </Field>
          <Field label="Established Year">
            <TextInput value={data.orgEstYear} onChange={(v) => setData(prev => ({ ...prev, orgEstYear: v }))} placeholder="2015" />
          </Field>
        </TwoCol>
        <Field label="Organisation Tagline">
          <Textarea value={data.orgTagline} onChange={(v) => setData(prev => ({ ...prev, orgTagline: v }))} rows={2} />
        </Field>
        <TwoCol>
          <Field label="Primary Email">
            <TextInput value={data.orgEmail} onChange={(v) => setData(prev => ({ ...prev, orgEmail: v }))} placeholder="info@soilx.org" />
          </Field>
          <Field label="Primary Phone">
            <TextInput value={data.orgPhone} onChange={(v) => setData(prev => ({ ...prev, orgPhone: v }))} placeholder="+91 12345 67890" />
          </Field>
        </TwoCol>
      </EditorSection>

      {/* Header Nav */}
      <EditorSection title="Header Navigation Links" subtitle="The navigation menu links in the sticky header bar">
        <div className="space-y-3">
          {data.navLinks.map((link, i) => (
            <ItemCard key={i} index={i} total={data.navLinks.length} onRemove={() => removeNav(i)} label="Nav Link">
              <TwoCol>
                <Field label="Link Label">
                  <TextInput value={link.label} onChange={(v) => updateNav(i, "label", v)} placeholder="About Us" />
                </Field>
                <Field label="URL Path (href)">
                  <TextInput value={link.href} onChange={(v) => updateNav(i, "href", v)} placeholder="/about" />
                </Field>
              </TwoCol>
            </ItemCard>
          ))}
          <AddButton onClick={addNav} label="Add Nav Link" />
        </div>
      </EditorSection>

      {/* Footer CTA Strip */}
      <EditorSection title="Footer CTA Strip" subtitle="The top banner inside the footer prompting users to get in touch">
        <Field label="Heading">
          <TextInput value={data.footerCtaHeading} onChange={(v) => setData(prev => ({ ...prev, footerCtaHeading: v }))} />
        </Field>
        <Field label="Subtitle">
          <TextInput value={data.footerCtaSubtitle} onChange={(v) => setData(prev => ({ ...prev, footerCtaSubtitle: v }))} />
        </Field>
      </EditorSection>

      {/* Footer Brand */}
      <EditorSection title="Footer Brand & Contact" subtitle="Address, phone and email shown in the footer's contact column">
        <Field label="Footer Tagline">
          <Textarea value={data.footerTagline} onChange={(v) => setData(prev => ({ ...prev, footerTagline: v }))} rows={2} />
        </Field>
        <Field label="Footer Address" hint="Use \n for line breaks">
          <Textarea value={data.footerAddress} onChange={(v) => setData(prev => ({ ...prev, footerAddress: v }))} rows={3} />
        </Field>
        <TwoCol>
          <Field label="Phone 1">
            <TextInput value={data.footerPhone1} onChange={(v) => setData(prev => ({ ...prev, footerPhone1: v }))} />
          </Field>
          <Field label="Phone 2">
            <TextInput value={data.footerPhone2} onChange={(v) => setData(prev => ({ ...prev, footerPhone2: v }))} />
          </Field>
        </TwoCol>
        <TwoCol>
          <Field label="Email 1">
            <TextInput value={data.footerEmail1} onChange={(v) => setData(prev => ({ ...prev, footerEmail1: v }))} />
          </Field>
          <Field label="Email 2">
            <TextInput value={data.footerEmail2} onChange={(v) => setData(prev => ({ ...prev, footerEmail2: v }))} />
          </Field>
        </TwoCol>
      </EditorSection>

      {/* Footer Social */}
      <EditorSection title="Footer Social Media Links" subtitle="Social handles in the footer's last column">
        <div className="space-y-3">
          {data.footerSocial.map((s, i) => (
            <ItemCard key={i} index={i} total={data.footerSocial.length} onRemove={() => removeSocial(i)} label="Social">
              <div className="grid grid-cols-3 gap-3">
                <Field label="Platform">
                  <TextInput value={s.platform} onChange={(v) => updateSocial(i, "platform", v)} />
                </Field>
                <Field label="Handle">
                  <TextInput value={s.handle} onChange={(v) => updateSocial(i, "handle", v)} />
                </Field>
                <Field label="URL">
                  <TextInput value={s.url} onChange={(v) => updateSocial(i, "url", v)} placeholder="https://..." />
                </Field>
              </div>
            </ItemCard>
          ))}
          <AddButton onClick={addSocial} label="Add Social Link" />
        </div>
      </EditorSection>

      {/* Footer Legal Links */}
      <EditorSection title="Footer Bottom Links" subtitle="Privacy policy, terms, sitemap links in the footer bar">
        <div className="space-y-3">
          {data.legalLinks.map((link, i) => (
            <ItemCard key={i} index={i} total={data.legalLinks.length} onRemove={() => removeLegal(i)} label="Link">
              <TwoCol>
                <Field label="Label">
                  <TextInput value={link.label} onChange={(v) => updateLegal(i, "label", v)} />
                </Field>
                <Field label="URL">
                  <TextInput value={link.href} onChange={(v) => updateLegal(i, "href", v)} />
                </Field>
              </TwoCol>
            </ItemCard>
          ))}
          <AddButton onClick={addLegal} label="Add Legal Link" />
        </div>
      </EditorSection>

      {/* SEO */}
      <EditorSection title="SEO & Metadata" subtitle="Browser tab title and search engine description">
        <Field label="Site Title (browser tab & search results)">
          <TextInput value={data.siteTitle} onChange={(v) => setData(prev => ({ ...prev, siteTitle: v }))} />
        </Field>
        <Field label="Meta Description" hint="Keep under 160 characters for best SEO results">
          <Textarea value={data.metaDescription} onChange={(v) => setData(prev => ({ ...prev, metaDescription: v }))} rows={3} />
          <p className={`text-[10px] mt-1 ${data.metaDescription.length > 160 ? "text-red-400" : "text-[#A0BEA8]"}`}>
            {data.metaDescription.length}/160 characters
          </p>
        </Field>
      </EditorSection>
    </div>
  );
}