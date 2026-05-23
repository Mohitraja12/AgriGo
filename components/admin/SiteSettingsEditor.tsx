"use client";

import { useState } from "react";
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

export default function SiteSettingsEditor() {
  /* Org Info */
  const [orgName, setOrgName] = useState("AGRIGO");
  const [orgTagline, setOrgTagline] = useState(
    "Rooted in purpose. Growing communities. Cultivating sustainable futures."
  );
  const [orgEstYear, setOrgEstYear] = useState("2015");
  const [orgEmail, setOrgEmail] = useState("info@agrigo.org");
  const [orgPhone, setOrgPhone] = useState("+91 12345 67890");

  /* Header Nav Links */
  const [navLinks, setNavLinks] = useState([
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Social Impact", href: "/social-impact" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact Us", href: "/contact" },
  ]);

  /* Footer */
  const [footerTagline, setFooterTagline] = useState(
    "Rooted in purpose. Growing communities. Cultivating sustainable futures through agriculture, education, and social innovation."
  );
  const [footerAddress, setFooterAddress] = useState(
    "AGRIGO Organisation,\nSector 12, Krishi Nagar,\nPunjab — 143001, India"
  );
  const [footerPhone1, setFooterPhone1] = useState("+91 12345 67890");
  const [footerPhone2, setFooterPhone2] = useState("+91 12345 67891");
  const [footerEmail1, setFooterEmail1] = useState("info@agrigo.org");
  const [footerEmail2, setFooterEmail2] = useState("support@agrigo.org");

  /* Footer Social */
  const [footerSocial, setFooterSocial] = useState([
    { platform: "Facebook", handle: "@AgrigoOfficial", url: "#" },
    { platform: "Instagram", handle: "@agrigo.in", url: "#" },
    { platform: "Twitter / X", handle: "@AgrigoIndia", url: "#" },
    { platform: "LinkedIn", handle: "AGRIGO Org", url: "#" },
    { platform: "YouTube", handle: "AGRIGO Channel", url: "#" },
  ]);

  /* Footer Bottom Links */
  const [legalLinks, setLegalLinks] = useState([
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Use", href: "#" },
    { label: "Sitemap", href: "#" },
  ]);

  /* Footer CTA */
  const [footerCtaHeading, setFooterCtaHeading] = useState(
    "Ready to make an impact together?"
  );
  const [footerCtaSubtitle, setFooterCtaSubtitle] = useState(
    "Partner with AGRIGO to transform agriculture and empower communities."
  );

  /* SEO */
  const [siteTitle, setSiteTitle] = useState(
    "AGRIGO — Agriculture, Community & Social Impact"
  );
  const [metaDescription, setMetaDescription] = useState(
    "AGRIGO is a purpose-driven organization focused on sustainable agriculture, community development, and measurable social impact across rural India."
  );

  /* Helpers */
  const updateNav = (i: number, key: string, val: string) =>
    setNavLinks((p) => p.map((n, idx) => (idx === i ? { ...n, [key]: val } : n)));
  const addNav = () => setNavLinks((p) => [...p, { label: "New Page", href: "/new-page" }]);
  const removeNav = (i: number) => setNavLinks((p) => p.filter((_, idx) => idx !== i));

  const updateSocial = (i: number, key: string, val: string) =>
    setFooterSocial((p) => p.map((s, idx) => (idx === i ? { ...s, [key]: val } : s)));
  const addSocial = () => setFooterSocial((p) => [...p, { platform: "Platform", handle: "@handle", url: "#" }]);
  const removeSocial = (i: number) => setFooterSocial((p) => p.filter((_, idx) => idx !== i));

  const updateLegal = (i: number, key: string, val: string) =>
    setLegalLinks((p) => p.map((l, idx) => (idx === i ? { ...l, [key]: val } : l)));
  const addLegal = () => setLegalLinks((p) => [...p, { label: "New Link", href: "#" }]);
  const removeLegal = (i: number) => setLegalLinks((p) => p.filter((_, idx) => idx !== i));

  return (
    <div>
      <EditorPageHeader
        icon={Settings}
        title="Site Settings"
        description="Configure global settings — organisation info, header navigation, footer content, and SEO metadata."
      />

      {/* Organisation Info */}
      <EditorSection title="Organisation Information" subtitle="Core details used throughout the site">
        <TwoCol>
          <Field label="Organisation Name">
            <TextInput value={orgName} onChange={setOrgName} placeholder="AGRIGO" />
          </Field>
          <Field label="Established Year">
            <TextInput value={orgEstYear} onChange={setOrgEstYear} placeholder="2015" />
          </Field>
        </TwoCol>
        <Field label="Organisation Tagline">
          <Textarea value={orgTagline} onChange={setOrgTagline} rows={2} />
        </Field>
        <TwoCol>
          <Field label="Primary Email">
            <TextInput value={orgEmail} onChange={setOrgEmail} placeholder="info@agrigo.org" />
          </Field>
          <Field label="Primary Phone">
            <TextInput value={orgPhone} onChange={setOrgPhone} placeholder="+91 12345 67890" />
          </Field>
        </TwoCol>
      </EditorSection>

      {/* Header Nav */}
      <EditorSection title="Header Navigation Links" subtitle="The navigation menu links in the sticky header bar">
        <div className="space-y-3">
          {navLinks.map((link, i) => (
            <ItemCard key={i} index={i} total={navLinks.length} onRemove={() => removeNav(i)} label="Nav Link">
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
          <TextInput value={footerCtaHeading} onChange={setFooterCtaHeading} />
        </Field>
        <Field label="Subtitle">
          <TextInput value={footerCtaSubtitle} onChange={setFooterCtaSubtitle} />
        </Field>
      </EditorSection>

      {/* Footer Brand */}
      <EditorSection title="Footer Brand & Contact" subtitle="Address, phone and email shown in the footer's contact column">
        <Field label="Footer Tagline">
          <Textarea value={footerTagline} onChange={setFooterTagline} rows={2} />
        </Field>
        <Field label="Footer Address" hint="Use \\n for line breaks">
          <Textarea value={footerAddress} onChange={setFooterAddress} rows={3} />
        </Field>
        <TwoCol>
          <Field label="Phone 1">
            <TextInput value={footerPhone1} onChange={setFooterPhone1} />
          </Field>
          <Field label="Phone 2">
            <TextInput value={footerPhone2} onChange={setFooterPhone2} />
          </Field>
        </TwoCol>
        <TwoCol>
          <Field label="Email 1">
            <TextInput value={footerEmail1} onChange={setFooterEmail1} />
          </Field>
          <Field label="Email 2">
            <TextInput value={footerEmail2} onChange={setFooterEmail2} />
          </Field>
        </TwoCol>
      </EditorSection>

      {/* Footer Social */}
      <EditorSection title="Footer Social Media Links" subtitle="Social handles in the footer's last column">
        <div className="space-y-3">
          {footerSocial.map((s, i) => (
            <ItemCard key={i} index={i} total={footerSocial.length} onRemove={() => removeSocial(i)} label="Social">
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
          {legalLinks.map((link, i) => (
            <ItemCard key={i} index={i} total={legalLinks.length} onRemove={() => removeLegal(i)} label="Link">
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
          <TextInput value={siteTitle} onChange={setSiteTitle} />
        </Field>
        <Field label="Meta Description" hint="Keep under 160 characters for best SEO results">
          <Textarea value={metaDescription} onChange={setMetaDescription} rows={3} />
          <p className={`text-[10px] mt-1 ${metaDescription.length > 160 ? "text-red-400" : "text-[#A0BEA8]"}`}>
            {metaDescription.length}/160 characters
          </p>
        </Field>
      </EditorSection>
    </div>
  );
}