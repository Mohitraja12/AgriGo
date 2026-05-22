"use client";

import { useState } from "react";
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

export default function ContactEditor() {
  const [pageHeading, setPageHeading] = useState("Let's Start a Conversation");
  const [pageSubtitle, setPageSubtitle] = useState(
    "Whether you're a farmer needing help, a partner wanting to collaborate, or a donor ready to make a difference — we're here and we're listening."
  );

  const [offices, setOffices] = useState([
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
  ]);

  const [departments, setDepartments] = useState([
    { label: "General Enquiries", email: "info@agrigo.org" },
    { label: "Farmer Support", email: "support@agrigo.org" },
    { label: "Partnerships & CSR", email: "partners@agrigo.org" },
    { label: "Media & Press", email: "media@agrigo.org" },
  ]);

  const [subjects, setSubjects] = useState([
    "General Enquiry",
    "Farmer Support",
    "Volunteer / Internship",
    "Corporate Partnership / CSR",
    "Media & Press",
    "Donation / Funding",
    "Other",
  ]);

  const [social, setSocial] = useState([
    { platform: "Facebook", handle: "@AgrigoOfficial", url: "#" },
    { platform: "Instagram", handle: "@agrigo.in", url: "#" },
    { platform: "Twitter / X", handle: "@AgrigoIndia", url: "#" },
    { platform: "LinkedIn", handle: "AGRIGO Org", url: "#" },
  ]);

  const updateOffice = (i: number, key: string, val: string) =>
    setOffices((p) => p.map((o, idx) => (idx === i ? { ...o, [key]: val } : o)));
  const addOffice = () =>
    setOffices((p) => [...p, { name: "New Office", address: "", phone: "", email: "", hours: "Mon – Fri: 9:00 AM – 5:00 PM" }]);
  const removeOffice = (i: number) => setOffices((p) => p.filter((_, idx) => idx !== i));

  const updateDept = (i: number, key: string, val: string) =>
    setDepartments((p) => p.map((d, idx) => (idx === i ? { ...d, [key]: val } : d)));
  const addDept = () => setDepartments((p) => [...p, { label: "New Department", email: "dept@agrigo.org" }]);
  const removeDept = (i: number) => setDepartments((p) => p.filter((_, idx) => idx !== i));

  const updateSubject = (i: number, val: string) =>
    setSubjects((p) => p.map((s, idx) => (idx === i ? val : s)));
  const addSubject = () => setSubjects((p) => [...p, "New Subject"]);
  const removeSubject = (i: number) => setSubjects((p) => p.filter((_, idx) => idx !== i));

  const updateSocial = (i: number, key: string, val: string) =>
    setSocial((p) => p.map((s, idx) => (idx === i ? { ...s, [key]: val } : s)));
  const addSocial = () => setSocial((p) => [...p, { platform: "Platform", handle: "@handle", url: "#" }]);
  const removeSocial = (i: number) => setSocial((p) => p.filter((_, idx) => idx !== i));

  return (
    <div>
      <EditorPageHeader
        icon={Phone}
        title="Contact Page Editor"
        description="Edit office details, department emails, social links, and contact form dropdown subjects."
      />

      {/* Page Header */}
      <EditorSection title="Page Header">
        <Field label="Main Heading">
          <TextInput value={pageHeading} onChange={setPageHeading} />
        </Field>
        <Field label="Subtitle">
          <Textarea value={pageSubtitle} onChange={setPageSubtitle} rows={2} />
        </Field>
      </EditorSection>

      {/* Offices */}
      <EditorSection title="Office Locations" subtitle="Physical address cards shown on the left column">
        <div className="space-y-4">
          {offices.map((office, i) => (
            <ItemCard key={i} index={i} total={offices.length} onRemove={() => removeOffice(i)} label="Office">
              <Field label="Office Name">
                <TextInput value={office.name} onChange={(v) => updateOffice(i, "name", v)} placeholder="Headquarters — Punjab" />
              </Field>
              <Field label="Full Address">
                <Textarea value={office.address} onChange={(v) => updateOffice(i, "address", v)} rows={2} />
              </Field>
              <TwoCol>
                <Field label="Phone Number">
                  <TextInput value={office.phone} onChange={(v) => updateOffice(i, "phone", v)} placeholder="+91 98765 43210" />
                </Field>
                <Field label="Email Address">
                  <TextInput value={office.email} onChange={(v) => updateOffice(i, "email", v)} placeholder="office@agrigo.org" />
                </Field>
              </TwoCol>
              <Field label="Working Hours">
                <TextInput value={office.hours} onChange={(v) => updateOffice(i, "hours", v)} placeholder="Mon – Sat: 9:00 AM – 6:00 PM" />
              </Field>
            </ItemCard>
          ))}
          <AddButton onClick={addOffice} label="Add Office" />
        </div>
      </EditorSection>

      {/* Department Emails */}
      <EditorSection title="Department Emails" subtitle="The email table shown below the office cards">
        <div className="space-y-3">
          {departments.map((dept, i) => (
            <ItemCard key={i} index={i} total={departments.length} onRemove={() => removeDept(i)} label="Department">
              <TwoCol>
                <Field label="Department Name">
                  <TextInput value={dept.label} onChange={(v) => updateDept(i, "label", v)} placeholder="Farmer Support" />
                </Field>
                <Field label="Email Address">
                  <TextInput value={dept.email} onChange={(v) => updateDept(i, "email", v)} placeholder="dept@agrigo.org" />
                </Field>
              </TwoCol>
            </ItemCard>
          ))}
          <AddButton onClick={addDept} label="Add Department" />
        </div>
      </EditorSection>

      {/* Contact Form Subjects */}
      <EditorSection title="Contact Form — Subject Options" subtitle="Dropdown options in the contact form's Subject field">
        <div className="space-y-2">
          {subjects.map((subject, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={subject}
                onChange={(e) => updateSubject(i, e.target.value)}
                className="flex-1 px-3.5 py-2 bg-[#0A1A10] border border-[#2D6A4F]/25 rounded-lg text-white text-sm focus:outline-none focus:border-[#52B788]/50 transition-all"
              />
              {subjects.length > 1 && (
                <button onClick={() => removeSubject(i)} className="text-red-500/40 hover:text-red-400 px-2 text-sm">✕</button>
              )}
            </div>
          ))}
          <AddButton onClick={addSubject} label="Add Subject Option" />
        </div>
      </EditorSection>

      {/* Social Links */}
      <EditorSection title="Social Media Links" subtitle="Follow Us section in the left column of the Contact page (also used in Footer)">
        <div className="space-y-3">
          {social.map((s, i) => (
            <ItemCard key={i} index={i} total={social.length} onRemove={() => removeSocial(i)} label="Social">
              <div className="grid grid-cols-3 gap-3">
                <Field label="Platform">
                  <TextInput value={s.platform} onChange={(v) => updateSocial(i, "platform", v)} placeholder="Instagram" />
                </Field>
                <Field label="Handle">
                  <TextInput value={s.handle} onChange={(v) => updateSocial(i, "handle", v)} placeholder="@agrigo.in" />
                </Field>
                <Field label="Profile URL">
                  <TextInput value={s.url} onChange={(v) => updateSocial(i, "url", v)} placeholder="https://instagram.com/..." />
                </Field>
              </div>
            </ItemCard>
          ))}
          <AddButton onClick={addSocial} label="Add Social Link" />
        </div>
      </EditorSection>
    </div>
  );
}