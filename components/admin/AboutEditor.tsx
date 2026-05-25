// components/admin/AboutEditor.tsx
"use client";

import { useState, useEffect, type ChangeEvent } from "react";
import { Info } from "lucide-react";
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
import { getAboutContent, updateAboutContent, type AboutData } from "@/lib/firebase/firestore";

interface Props {
  onSaveComplete?: () => void;
}

const defaultData: AboutData = {
  pageHeading: "Rooted in Purpose, Growing with Purpose",
  pageSubtitle: "Since 2015, AGRIGO has been a living testament to what happens when communities are trusted, supported, and connected.",
  missionHeading: "To build a world where every farmer is food-secure, financially independent, and socially dignified.",
  missionBody: "We pursue this mission by integrating sustainable agricultural practices, inclusive financial services, market access programs, and community-led governance into a single, cohesive development model that scales from one farm to thousands of villages.",
  missionBullets: ["Sustainable Farming Models", "Financial Inclusion", "Market Linkages", "Policy Advocacy"],
  visionHeading: "A prosperous, equitable rural India by 2035",
  visionBody: "We envision a future where the prosperity gap between rural and urban India has closed — where a farmer's child has the same opportunities as a city child, and where the land is cared for as much as the people who depend on it.",
  visionQuote: "Khet se khushhaali tak — From field to flourishing.",
  values: [
    { title: "Compassion First", desc: "Every decision we make is rooted in empathy for the farmer, the family, and the community we serve." },
    { title: "Integrity Always", desc: "Transparent operations, honest reporting, and accountable governance at every level of the organisation." },
    { title: "Community Ownership", desc: "We don't work for communities — we work with them, ensuring they lead their own development journeys." },
    { title: "Innovation & Learning", desc: "Combining traditional farming wisdom with modern research to develop solutions that are practical and scalable." },
  ],
  milestones: [
    { year: "2015", event: "AGRIGO founded in Ludhiana, Punjab with a 12-farmer cooperative." },
    { year: "2016", event: "Launched first organic farming training programme; 200 farmers enrolled." },
    { year: "2017", event: "Expanded to Haryana and Himachal Pradesh. Established mobile health camps." },
    { year: "2019", event: "Crossed 2,000 farmer milestone. Received National Rural Development Award." },
    { year: "2021", event: "Launched women's empowerment vertical — 500 SHGs formed across 3 states." },
    { year: "2023", event: "8 states, 340+ villages, and 12,400+ farmers supported annually." },
  ],
  team: [
    { name: "Rajinder Singh", role: "Founder & Executive Director", imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&fit=crop" },
    { name: "Priya Mehta", role: "Director — Community Programs", imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80&fit=crop" },
    { name: "Dr. Amit Rao", role: "Head of Agricultural Research", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&fit=crop" },
  ],
};

export default function AboutEditor({ onSaveComplete }: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [data, setData] = useState<AboutData>(defaultData);

  useEffect(() => {
    const loadData = async () => {
      try {
        const content = await getAboutContent();
        if (content?.data) {
          setData(content.data);
        }
      } catch (error: unknown) {
        console.error("Error loading about data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const updateValue = (i: number, key: string, val: string) => {
    setData(prev => ({
      ...prev,
      values: prev.values.map((v, idx) => (idx === i ? { ...v, [key]: val } : v))
    }));
  };

  const addValue = () => {
    setData(prev => ({
      ...prev,
      values: [...prev.values, { title: "New Value", desc: "Description." }]
    }));
  };

  const removeValue = (i: number) => {
    setData(prev => ({
      ...prev,
      values: prev.values.filter((_, idx) => idx !== i)
    }));
  };

  const updateMilestone = (i: number, key: string, val: string) => {
    setData(prev => ({
      ...prev,
      milestones: prev.milestones.map((m, idx) => (idx === i ? { ...m, [key]: val } : m))
    }));
  };

  const addMilestone = () => {
    setData(prev => ({
      ...prev,
      milestones: [...prev.milestones, { year: "2025", event: "New milestone." }]
    }));
  };

  const removeMilestone = (i: number) => {
    setData(prev => ({
      ...prev,
      milestones: prev.milestones.filter((_, idx) => idx !== i)
    }));
  };

  const updateTeam = (i: number, key: string, val: string) => {
    setData(prev => ({
      ...prev,
      team: prev.team.map((m, idx) => (idx === i ? { ...m, [key]: val } : m))
    }));
  };

  const addTeamMember = () => {
    setData(prev => ({
      ...prev,
      team: [...prev.team, { name: "Team Member", role: "Role Title", imageUrl: "" }]
    }));
  };

  const removeTeamMember = (i: number) => {
    setData(prev => ({
      ...prev,
      team: prev.team.filter((_, idx) => idx !== i)
    }));
  };

  const updateBullet = (i: number, val: string) => {
    setData(prev => ({
      ...prev,
      missionBullets: prev.missionBullets.map((b, idx) => (idx === i ? val : b))
    }));
  };

  const handleLocalImageUpload = (event: ChangeEvent<HTMLInputElement>, updateValue: (value: string) => void) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateValue(reader.result);
      }
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const addBullet = () => {
    setData(prev => ({
      ...prev,
      missionBullets: [...prev.missionBullets, "New Point"]
    }));
  };

  const removeBullet = (i: number) => {
    setData(prev => ({
      ...prev,
      missionBullets: prev.missionBullets.filter((_, idx) => idx !== i)
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateAboutContent({ data });
      if (onSaveComplete) onSaveComplete();
    } catch (error: unknown) {
      console.error("Error saving about data:", error);
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
        icon={Info}
        title="About Page Editor"
        description="Edit all content on the About Us page — mission, vision, values, timeline and team."
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
      <EditorSection title="Page Header" subtitle="The hero banner at the top of the About page">
        <Field label="Main Heading">
          <TextInput value={data.pageHeading} onChange={(v) => setData(prev => ({ ...prev, pageHeading: v }))} />
        </Field>
        <Field label="Subtitle / Tagline">
          <Textarea value={data.pageSubtitle} onChange={(v) => setData(prev => ({ ...prev, pageSubtitle: v }))} rows={2} />
        </Field>
      </EditorSection>

      {/* Mission */}
      <EditorSection title="Mission Statement" subtitle="The large left card in the Mission/Vision grid">
        <Field label="Mission Headline">
          <Textarea value={data.missionHeading} onChange={(v) => setData(prev => ({ ...prev, missionHeading: v }))} rows={2} />
        </Field>
        <Field label="Mission Body">
          <Textarea value={data.missionBody} onChange={(v) => setData(prev => ({ ...prev, missionBody: v }))} rows={3} />
        </Field>
        <Field label="Checklist Items">
          <div className="space-y-2">
            {data.missionBullets.map((b, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={b}
                  onChange={(e) => updateBullet(i, e.target.value)}
                  className="flex-1 px-3.5 py-2 bg-[#F7FAF8] border border-[#D0E6D8] rounded-lg text-[#1B4332] text-sm placeholder-[#A0BEA8] focus:outline-none focus:border-[#2D6A4F] transition-all"
                />
                {data.missionBullets.length > 1 && (
                  <button onClick={() => removeBullet(i)} className="text-red-500/40 hover:text-red-400 px-2">✕</button>
                )}
              </div>
            ))}
            <AddButton onClick={addBullet} label="Add Checklist Item" />
          </div>
        </Field>
      </EditorSection>

      {/* Vision */}
      <EditorSection title="Vision Statement" subtitle="The right tall card in the Mission/Vision grid">
        <Field label="Vision Heading">
          <TextInput value={data.visionHeading} onChange={(v) => setData(prev => ({ ...prev, visionHeading: v }))} />
        </Field>
        <Field label="Vision Body">
          <Textarea value={data.visionBody} onChange={(v) => setData(prev => ({ ...prev, visionBody: v }))} rows={3} />
        </Field>
        <Field label="Founding Quote">
          <TextInput value={data.visionQuote} onChange={(v) => setData(prev => ({ ...prev, visionQuote: v }))} />
        </Field>
      </EditorSection>

      {/* Values */}
      <EditorSection title="Core Values" subtitle="The 4-card values grid">
        <div className="space-y-3">
          {data.values.map((v, i) => (
            <ItemCard key={i} index={i} total={data.values.length} onRemove={() => removeValue(i)} label="Value">
              <Field label="Value Title">
                <TextInput value={v.title} onChange={(val) => updateValue(i, "title", val)} />
              </Field>
              <Field label="Value Description">
                <Textarea value={v.desc} onChange={(val) => updateValue(i, "desc", val)} rows={2} />
              </Field>
            </ItemCard>
          ))}
          <AddButton onClick={addValue} label="Add Value" />
        </div>
      </EditorSection>

      {/* Milestones */}
      <EditorSection title="Journey Milestones" subtitle="The decade timeline on the About page">
        <div className="space-y-3">
          {data.milestones.map((m, i) => (
            <ItemCard key={i} index={i} total={data.milestones.length} onRemove={() => removeMilestone(i)} label="Milestone">
              <TwoCol>
                <Field label="Year">
                  <TextInput value={m.year} onChange={(v) => updateMilestone(i, "year", v)} placeholder="2019" />
                </Field>
                <Field label="Event Description">
                  <TextInput value={m.event} onChange={(v) => updateMilestone(i, "event", v)} placeholder="What happened..." />
                </Field>
              </TwoCol>
            </ItemCard>
          ))}
          <AddButton onClick={addMilestone} label="Add Milestone" />
        </div>
      </EditorSection>

      {/* Team */}
      <EditorSection title="Leadership Team" subtitle="Team member cards displayed at the bottom of the About page">
        <div className="space-y-3">
          {data.team.map((member, i) => (
            <ItemCard key={i} index={i} total={data.team.length} onRemove={() => removeTeamMember(i)} label="Member">
              <TwoCol>
                <Field label="Full Name">
                  <TextInput value={member.name} onChange={(v) => updateTeam(i, "name", v)} />
                </Field>
                <Field label="Role / Title">
                  <TextInput value={member.role} onChange={(v) => updateTeam(i, "role", v)} />
                </Field>
              </TwoCol>
              <Field label="Photo URL">
                <div className="flex gap-2 items-start">
                  <TextInput value={member.imageUrl} onChange={(v) => updateTeam(i, "imageUrl", v)} placeholder="https://images.unsplash.com/..." />
                  <label className="px-3.5 py-2.5 bg-[#EDF5EF] border border-[#D0E6D8] rounded-lg text-[#1B4332] text-xs font-semibold whitespace-nowrap cursor-pointer hover:bg-[#E4F0E8] transition-colors">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => handleLocalImageUpload(event, (value) => updateTeam(i, "imageUrl", value))}
                    />
                  </label>
                </div>
              </Field>
              {member.imageUrl && (
                <img src={member.imageUrl} alt={member.name} className="w-16 h-16 rounded-xl object-cover mt-1 border border-[#E2EDE6]" />
              )}
            </ItemCard>
          ))}
          <AddButton onClick={addTeamMember} label="Add Team Member" />
        </div>
      </EditorSection>
    </div>
  );
}