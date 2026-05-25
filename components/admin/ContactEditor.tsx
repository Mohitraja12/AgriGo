// components/admin/ContactEditor.tsx
"use client";

import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
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
import { getContactContent, updateContactContent, type ContactData } from "@/lib/firebase/firestore";

interface Props {
  onSaveComplete?: () => void;
}

const defaultData: ContactData = {
  pageHeading: "Let's Start a Conversation",
  pageSubtitle: "Whether you're a farmer needing help, a partner wanting to collaborate, or a donor ready to make a difference — we're here and we're listening.",
  offices: [
    {
      name: "Headquarters — Punjab",
      address: "AGRIGO Organisation, Block C, Krishi Nagar, Sector 12, Ludhiana, Punjab — 141001",
      phone: "+91 98765 43210",
      email: "info@agrigo.org",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM",
    },
    {
      name: "Field Office — Haryana",
      address: "Village Panchayat Bhawan, NH-44 Bypass, Ambala, Haryana — 134003",
      phone: "+91 98765 43211",
      email: "haryana@agrigo.org",
      hours: "Mon – Fri: 9:00 AM – 5:00 PM",
    },
  ],
  departments: [
    { label: "General Enquiries", email: "info@agrigo.org" },
    { label: "Farmer Support", email: "support@agrigo.org" },
    { label: "Partnerships & CSR", email: "partners@agrigo.org" },
    { label: "Media & Press", email: "media@agrigo.org" },
  ],
  socialLinks: [
    { label: "Facebook", url: "#" },
    { label: "Instagram", url: "#" },
    { label: "Twitter", url: "#" },
    { label: "LinkedIn", url: "#" },
  ],
};

export default function ContactEditor({ onSaveComplete }: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [data, setData] = useState<ContactData>(defaultData);

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("[ContactEditor] Loading contact content from Firestore...");
        const content = await getContactContent();
        if (content?.data) {
          console.log("[ContactEditor] Loaded contact content:", content.data);
          setData(content.data);
        }
      } catch (error: unknown) {
        console.error("Error loading contact data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const updateOffice = (i: number, key: string, val: string) => {
    setData(prev => ({
      ...prev,
      offices: prev.offices.map((o, idx) => (idx === i ? { ...o, [key]: val } : o))
    }));
  };

  const addOffice = () => {
    setData(prev => ({
      ...prev,
      offices: [...prev.offices, { name: "New Office", address: "", phone: "", email: "", hours: "" }]
    }));
  };

  const removeOffice = (i: number) => {
    setData(prev => ({
      ...prev,
      offices: prev.offices.filter((_, idx) => idx !== i)
    }));
  };

  const updateDepartment = (i: number, key: string, val: string) => {
    setData(prev => ({
      ...prev,
      departments: prev.departments.map((d, idx) => (idx === i ? { ...d, [key]: val } : d))
    }));
  };

  const addDepartment = () => {
    setData(prev => ({
      ...prev,
      departments: [...prev.departments, { label: "New Department", email: "email@agrigo.org" }]
    }));
  };

  const removeDepartment = (i: number) => {
    setData(prev => ({
      ...prev,
      departments: prev.departments.filter((_, idx) => idx !== i)
    }));
  };

  const updateSocial = (i: number, key: string, val: string) => {
    setData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.map((s, idx) => (idx === i ? { ...s, [key]: val } : s))
    }));
  };

  const addSocial = () => {
    setData(prev => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { label: "New Platform", url: "#" }]
    }));
  };

  const removeSocial = (i: number) => {
    setData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, idx) => idx !== i)
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      console.log("[ContactEditor] Saving contact content to Firestore:", data);
      await updateContactContent({ data });
      console.log("[ContactEditor] Contact content saved successfully");
      if (onSaveComplete) onSaveComplete();
    } catch (error: unknown) {
      console.error("Error saving contact data:", error);
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
        icon={Phone}
        title="Contact Page Editor"
        description="Manage office addresses, department emails, and social media links."
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

      {/* Page Header */}
      <EditorSection title="Page Header">
        <Field label="Page Heading">
          <TextInput value={data.pageHeading} onChange={(v) => setData(prev => ({ ...prev, pageHeading: v }))} />
        </Field>
        <Field label="Subtitle">
          <Textarea value={data.pageSubtitle} onChange={(v) => setData(prev => ({ ...prev, pageSubtitle: v }))} rows={2} />
        </Field>
      </EditorSection>

      {/* Office Addresses */}
      <EditorSection title="Office Addresses" subtitle="Physical office locations with contact details">
        <div className="space-y-3">
          {data.offices.map((office, i) => (
            <ItemCard key={i} index={i} total={data.offices.length} onRemove={() => removeOffice(i)} label="Office">
              <Field label="Office Name">
                <TextInput value={office.name} onChange={(v) => updateOffice(i, "name", v)} />
              </Field>
              <Field label="Address">
                <Textarea value={office.address} onChange={(v) => updateOffice(i, "address", v)} rows={2} />
              </Field>
              <TwoCol>
                <Field label="Phone">
                  <TextInput value={office.phone} onChange={(v) => updateOffice(i, "phone", v)} />
                </Field>
                <Field label="Email">
                  <TextInput value={office.email} onChange={(v) => updateOffice(i, "email", v)} />
                </Field>
              </TwoCol>
              <Field label="Working Hours">
                <TextInput value={office.hours} onChange={(v) => updateOffice(i, "hours", v)} />
              </Field>
            </ItemCard>
          ))}
          <AddButton onClick={addOffice} label="Add Office" />
        </div>
      </EditorSection>

      {/* Department Emails */}
      <EditorSection title="Department Emails" subtitle="Email addresses for different departments">
        <div className="space-y-3">
          {data.departments.map((dept, i) => (
            <ItemCard key={i} index={i} total={data.departments.length} onRemove={() => removeDepartment(i)} label="Department">
              <TwoCol>
                <Field label="Department Name">
                  <TextInput value={dept.label} onChange={(v) => updateDepartment(i, "label", v)} />
                </Field>
                <Field label="Email Address">
                  <TextInput value={dept.email} onChange={(v) => updateDepartment(i, "email", v)} />
                </Field>
              </TwoCol>
            </ItemCard>
          ))}
          <AddButton onClick={addDepartment} label="Add Department" />
        </div>
      </EditorSection>

      {/* Social Links */}
      <EditorSection title="Social Media Links" subtitle="Social media profiles to display on contact page">
        <div className="space-y-3">
          {data.socialLinks.map((social, i) => (
            <ItemCard key={i} index={i} total={data.socialLinks.length} onRemove={() => removeSocial(i)} label="Social Link">
              <TwoCol>
                <Field label="Platform Name">
                  <TextInput value={social.label} onChange={(v) => updateSocial(i, "label", v)} />
                </Field>
                <Field label="Profile URL">
                  <TextInput value={social.url} onChange={(v) => updateSocial(i, "url", v)} placeholder="https://..." />
                </Field>
              </TwoCol>
            </ItemCard>
          ))}
          <AddButton onClick={addSocial} label="Add Social Link" />
        </div>
      </EditorSection>
    </div>
  );
}