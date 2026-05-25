// components/admin/SocialImpactEditor.tsx
"use client";

import { useState, useEffect, type ChangeEvent } from "react";
import { TrendingUp } from "lucide-react";
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
import { getSocialImpactContent, updateSocialImpactContent, type SocialImpactData } from "@/lib/firebase/firestore";

interface Props {
  onSaveComplete?: () => void;
}

const defaultData: SocialImpactData = {
  pageHeading: "Every Number Hides a Human Story",
  pageSubtitle: "Behind every statistic is a family that now eats better, earns more, and hopes further. Here is the evidence of our collective work.",
  stats: [
    { value: 12400, suffix: "+", prefix: "", label: "Farmers Assisted" },
    { value: 340, suffix: "+", prefix: "", label: "Villages Reached" },
    { value: 500, suffix: "+", prefix: "", label: "Women SHGs Formed" },
    { value: 62, suffix: " Lakh+", prefix: "₹", label: "Additional Farmer Income" },
  ],
  timeline: [
    {
      year: "2016",
      title: "Organic Farming Training Programme",
      description: "Launched our flagship organic farming initiative across 12 villages in Ludhiana district. Over 200 farmers transitioned to chemical-free cultivation, reducing input costs by 30% and improving soil health scores.",
      tag: "Agriculture",
      metric: "200 farmers • 30% cost reduction",
      imageUrl: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80&fit=crop",
    },
    {
      year: "2017",
      title: "Community Water Harvesting Network",
      description: "Built 48 farm ponds and 120 borewell recharge structures across Haryana and Punjab. The project has conserved an estimated 180 million litres of rainwater annually, combating drought conditions.",
      tag: "Environment",
      metric: "48 ponds • 180M litres saved yearly",
      imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80&fit=crop",
    },
    {
      year: "2019",
      title: "Rural Women's Cooperative Network",
      description: "Established 150 Self-Help Groups across 3 states, collectively managing a revolving credit fund of ₹2.5 crore. Women-led micro-enterprises in food processing and handicrafts generated 1,200+ livelihoods.",
      tag: "Empowerment",
      metric: "150 SHGs • ₹2.5 Cr credit fund",
      imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80&fit=crop",
    },
    {
      year: "2020",
      title: "Digital Literacy & AgriTech Adoption",
      description: "During COVID-19, deployed 280 solar-powered smart kiosks in villages enabling farmers to access e-mandi prices, weather alerts, and government scheme information.",
      tag: "Technology",
      metric: "280 kiosks • 3,500 farmers trained",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&fit=crop",
    },
    {
      year: "2022",
      title: "Tree Plantation & Carbon Sequestration Drive",
      description: "Partnered with Forest Department and 8,000 farming households to plant 2.1 million trees on farm boundaries and common land.",
      tag: "Environment",
      metric: "2.1 million trees • 8 states",
      imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80&fit=crop",
    },
    {
      year: "2024",
      title: "National Rural Excellence Award",
      description: "Soilx was honoured with the National Rural Excellence Award by the Ministry of Rural Development for demonstrating an innovative, scalable model of integrated rural development.",
      tag: "Recognition",
      metric: "Govt. of India Recognition",
      imageUrl: "https://images.unsplash.com/photo-1530099486328-e021101a494a?w=800&q=80&fit=crop",
    },
  ],
  testimonialQuote: "Soilx ne mere khet ko badla, mere ghar ko badla, mere sapno ko badla.",
  testimonialTranslation: "Soilx changed my farm, changed my home, changed my dreams.",
  testimonialAuthor: "Gurpreet Kaur — Farmer, Fatehgarh Sahib, Punjab",
};

export default function SocialImpactEditor({ onSaveComplete }: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [data, setData] = useState<SocialImpactData>(defaultData);

  useEffect(() => {
    const loadData = async () => {
      try {
        const content = await getSocialImpactContent();
        if (content?.data) {
          setData(content.data);
        }
      } catch (error: unknown) {
        console.error("Error loading social impact data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const updateStat = (i: number, key: string, val: string | number) => {
    setData(prev => ({
      ...prev,
      stats: prev.stats.map((s, idx) => (idx === i ? { ...s, [key]: val } : s))
    }));
  };

  const addStat = () => {
    setData(prev => ({
      ...prev,
      stats: [...prev.stats, { value: 0, suffix: "+", prefix: "", label: "New Stat" }]
    }));
  };

  const removeStat = (i: number) => {
    setData(prev => ({
      ...prev,
      stats: prev.stats.filter((_, idx) => idx !== i)
    }));
  };

  const updateEntry = (i: number, key: string, val: string) => {
    setData(prev => ({
      ...prev,
      timeline: prev.timeline.map((e, idx) => (idx === i ? { ...e, [key]: val } : e))
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

  const addEntry = () => {
    setData(prev => ({
      ...prev,
      timeline: [
        ...prev.timeline,
        { year: "2025", title: "New Programme", description: "Programme description.", tag: "Agriculture", metric: "Impact metric", imageUrl: "" }
      ]
    }));
  };

  const removeEntry = (i: number) => {
    setData(prev => ({
      ...prev,
      timeline: prev.timeline.filter((_, idx) => idx !== i)
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSocialImpactContent({ data });
      if (onSaveComplete) onSaveComplete();
    } catch (error: unknown) {
      console.error("Error saving social impact data:", error);
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
        icon={TrendingUp}
        title="Social Impact Page Editor"
        description="Edit impact stats, programme timeline entries, and the testimonial section."
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
        <Field label="Main Heading">
          <TextInput value={data.pageHeading} onChange={(v) => setData(prev => ({ ...prev, pageHeading: v }))} />
        </Field>
        <Field label="Subtitle">
          <Textarea value={data.pageSubtitle} onChange={(v) => setData(prev => ({ ...prev, pageSubtitle: v }))} rows={2} />
        </Field>
      </EditorSection>

      {/* Stats Counters */}
      <EditorSection title="Impact Statistics" subtitle="Animated counter cards displayed below the page header">
        <div className="space-y-3">
          {data.stats.map((stat, i) => (
            <ItemCard key={i} index={i} total={data.stats.length} onRemove={() => removeStat(i)} label="Stat">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Field label="Prefix (e.g. ₹)">
                  <TextInput
                    value={stat.prefix}
                    onChange={(v) => updateStat(i, "prefix", v)}
                    placeholder="₹"
                  />
                </Field>
                <Field label="Number Value">
                  <TextInput
                    value={String(stat.value)}
                    onChange={(v) => updateStat(i, "value", Number(v) || 0)}
                    placeholder="12400"
                  />
                </Field>
                <Field label="Suffix (e.g. +)">
                  <TextInput value={stat.suffix} onChange={(v) => updateStat(i, "suffix", v)} placeholder="+" />
                </Field>
                <Field label="Label">
                  <TextInput value={stat.label} onChange={(v) => updateStat(i, "label", v)} placeholder="Farmers Assisted" />
                </Field>
              </div>
            </ItemCard>
          ))}
          <AddButton onClick={addStat} label="Add Statistic" />
        </div>
      </EditorSection>

      {/* Timeline */}
      <EditorSection title="Programme Timeline" subtitle="Alternating feature cards showing major initiatives">
        <div className="space-y-4">
          {data.timeline.map((entry, i) => (
            <ItemCard key={i} index={i} total={data.timeline.length} onRemove={() => removeEntry(i)} label={`Entry ${i + 1}`}>
              <TwoCol>
                <Field label="Year">
                  <TextInput value={entry.year} onChange={(v) => updateEntry(i, "year", v)} placeholder="2022" />
                </Field>
                <Field label="Category Tag">
                  <TextInput value={entry.tag} onChange={(v) => updateEntry(i, "tag", v)} placeholder="Agriculture" />
                </Field>
              </TwoCol>
              <Field label="Programme Title">
                <TextInput value={entry.title} onChange={(v) => updateEntry(i, "title", v)} />
              </Field>
              <Field label="Description">
                <Textarea value={entry.description} onChange={(v) => updateEntry(i, "description", v)} rows={3} />
              </Field>
              <TwoCol>
                <Field label="Impact Metric">
                  <TextInput value={entry.metric} onChange={(v) => updateEntry(i, "metric", v)} placeholder="200 farmers • 30% cost reduction" />
                </Field>
                <Field label="Image URL">
                  <div className="flex gap-2 items-start">
                    <TextInput value={entry.imageUrl} onChange={(v) => updateEntry(i, "imageUrl", v)} placeholder="https://..." />
                    <label className="px-3.5 py-2.5 bg-[#EDF5EF] border border-[#D0E6D8] rounded-lg text-[#1B4332] text-xs font-semibold whitespace-nowrap cursor-pointer hover:bg-[#E4F0E8] transition-colors">
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(event) => handleLocalImageUpload(event, (value) => updateEntry(i, "imageUrl", value))}
                      />
                    </label>
                  </div>
                </Field>
              </TwoCol>
              {entry.imageUrl && (
                <img src={entry.imageUrl} alt="" className="w-full h-28 object-cover rounded-lg border border-[#E2EDE6]" />
              )}
            </ItemCard>
          ))}
          <AddButton onClick={addEntry} label="Add Timeline Entry" />
        </div>
      </EditorSection>

      {/* Testimonial */}
      <EditorSection title="Testimonial Quote" subtitle="The full-width dark green testimonial block">
        <Field label="Quote (in local language)">
          <Textarea value={data.testimonialQuote} onChange={(v) => setData(prev => ({ ...prev, testimonialQuote: v }))} rows={2} />
        </Field>
        <Field label="English Translation">
          <TextInput value={data.testimonialTranslation} onChange={(v) => setData(prev => ({ ...prev, testimonialTranslation: v }))} />
        </Field>
        <Field label="Attribution (Name, Location)">
          <TextInput value={data.testimonialAuthor} onChange={(v) => setData(prev => ({ ...prev, testimonialAuthor: v }))} />
        </Field>
      </EditorSection>
    </div>
  );
}