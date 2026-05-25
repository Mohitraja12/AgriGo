// components/admin/HomepageEditor.tsx
"use client";

import { useState, useEffect, type ChangeEvent } from "react";
import { Home, Trash2 } from "lucide-react";
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
import { getHomepageContent, updateHomepageContent, type HomepageData } from "@/lib/firebase/firestore";

interface Props {
  onSaveComplete?: () => void;
}

const defaultData: HomepageData = {
  slides: [
    {
      tag: "Sustainable Agriculture",
      title: "Cultivating Futures,\nOne Field at a Time",
      description: "Empowering farmers across rural India with modern techniques, fair markets, and unwavering support for a sustainable tomorrow.",
      ctaLabel: "Our Impact",
      ctaHref: "/social-impact",
      imageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600&q=80&fit=crop",
    },
    {
      tag: "Community Development",
      title: "Building Villages,\nStrengthening Bonds",
      description: "From self-help groups to cooperative networks — AGRIGO weaves communities together through education, resources, and shared vision.",
      ctaLabel: "About AGRIGO",
      ctaHref: "/about",
      imageUrl: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=1600&q=80&fit=crop",
    },
    {
      tag: "Social Impact",
      title: "Measurable Change,\nReal Transformation",
      description: "Thousands of lives touched. Hundreds of villages empowered. Our data-driven approach ensures every initiative creates lasting change.",
      ctaLabel: "See Gallery",
      ctaHref: "/gallery",
      imageUrl: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=1600&q=80&fit=crop",
    },
  ],
  stats: [
    { value: "12,400+", label: "Farmers Supported" },
    { value: "340+", label: "Villages Reached" },
    { value: "8", label: "States Operational" },
    { value: "₹6.2 Cr", label: "Additional Farmer Income" },
  ],
  pillars: [
    {
      title: "Sustainable Farming",
      description: "We introduce climate-resilient farming methods — from drip irrigation to organic certification — that increase yield and reduce costs for smallholder farmers.",
    },
    {
      title: "Community Empowerment",
      description: "Through self-help groups, cooperative societies, and vocational training, we build human capital that drives lasting village-level transformation.",
    },
    {
      title: "Market Access",
      description: "We bridge the gap between rural producers and urban markets — negotiating fair prices, providing logistics support, and eliminating exploitative middlemen.",
    },
    {
      title: "Social Welfare",
      description: "Health camps, nutrition programs, and women's empowerment initiatives run alongside agricultural work — because whole communities thrive together.",
    },
  ],
  introHeading: "Agriculture as a tool for dignity and prosperity",
  introPara1: "AGRIGO is a grassroots organisation working at the intersection of sustainable agriculture and community development. Founded in 2015, we have grown from a small cooperative in Punjab to a multi-state movement empowering over 12,000 farmers and their families.",
  introPara2: "We believe that when farmers thrive, villages thrive — and when villages thrive, the nation grows. Our integrated approach combines technical assistance, financial inclusion, market linkages, and deep community trust.",
  ctaHeading: "Help us plant seeds of change across India",
  ctaBody: "Whether you are a donor, a corporate partner, a volunteer, or a farmer seeking support — AGRIGO has a place for you in this movement.",
};

export default function HomepageEditor({ onSaveComplete }: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [data, setData] = useState<HomepageData>(defaultData);

  // Load data from Firestore
  useEffect(() => {
    const loadData = async () => {
      try {
        const content = await getHomepageContent();
        if (content?.data) {
          setData(content.data);
        }
      } catch (error: unknown) {
        console.error("Error loading homepage data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const updateSlide = (i: number, key: string, val: string) => {
    setData((prev) => ({
      ...prev,
      slides: prev.slides.map((s, idx) => (idx === i ? { ...s, [key]: val } : s)),
    }));
  };

  const addSlide = () => {
    setData((prev) => ({
      ...prev,
      slides: [
        ...prev.slides,
        { tag: "New Slide", title: "Slide Title", description: "Description here.", ctaLabel: "Learn More", ctaHref: "/", imageUrl: "" },
      ],
    }));
  };

  const removeSlide = (i: number) => {
    setData((prev) => ({
      ...prev,
      slides: prev.slides.filter((_, idx) => idx !== i),
    }));
  };

  const updateStat = (i: number, key: string, val: string) => {
    setData((prev) => ({
      ...prev,
      stats: prev.stats.map((s, idx) => (idx === i ? { ...s, [key]: val } : s)),
    }));
  };

  const addStat = () => {
    setData((prev) => ({
      ...prev,
      stats: [...prev.stats, { value: "0", label: "New Stat" }],
    }));
  };

  const removeStat = (i: number) => {
    setData((prev) => ({
      ...prev,
      stats: prev.stats.filter((_, idx) => idx !== i),
    }));
  };

  const updatePillar = (i: number, key: string, val: string) => {
    setData((prev) => ({
      ...prev,
      pillars: prev.pillars.map((p, idx) => (idx === i ? { ...p, [key]: val } : p)),
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

  const addPillar = () => {
    setData((prev) => ({
      ...prev,
      pillars: [...prev.pillars, { title: "New Pillar", description: "Pillar description." }],
    }));
  };

  const removePillar = (i: number) => {
    setData((prev) => ({
      ...prev,
      pillars: prev.pillars.filter((_, idx) => idx !== i),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateHomepageContent({ data });
      if (onSaveComplete) onSaveComplete();
    } catch (error: unknown) {
      console.error("Error saving homepage data:", error);
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
        icon={Home}
        title="Homepage Editor"
        description="Edit all content sections displayed on the AGRIGO homepage."
      />

      {/* Save Button at Top */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-[#1B4332] text-white rounded-lg text-sm font-semibold hover:bg-[#2D6A4F] disabled:opacity-60 transition-colors"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* ── HERO SLIDER ── */}
      <EditorSection
        title="Hero Slider"
        subtitle="Auto-playing slides shown at the top of the homepage"
      >
        <div className="space-y-4">
          {data.slides.map((slide, i) => (
            <ItemCard
              key={i}
              index={i}
              total={data.slides.length}
              onRemove={() => removeSlide(i)}
              label={`Slide ${i + 1}`}
            >
              <TwoCol>
                <Field label="Tag Badge">
                  <TextInput value={slide.tag} onChange={(v) => updateSlide(i, "tag", v)} placeholder="Sustainable Agriculture" />
                </Field>
                <Field label="CTA Button Label">
                  <TextInput value={slide.ctaLabel} onChange={(v) => updateSlide(i, "ctaLabel", v)} placeholder="Our Impact" />
                </Field>
              </TwoCol>
              <Field label="Slide Headline" hint="Use \n for a line break">
                <TextInput value={slide.title} onChange={(v) => updateSlide(i, "title", v)} placeholder="Headline text" />
              </Field>
              <Field label="Slide Description">
                <Textarea value={slide.description} onChange={(v) => updateSlide(i, "description", v)} rows={2} />
              </Field>
              <TwoCol>
                <Field label="CTA Link (href)">
                  <TextInput value={slide.ctaHref} onChange={(v) => updateSlide(i, "ctaHref", v)} placeholder="/social-impact" />
                </Field>
                <Field label="Background Image URL">
                  <div className="flex gap-2 items-start">
                    <TextInput value={slide.imageUrl} onChange={(v) => updateSlide(i, "imageUrl", v)} placeholder="https://..." />
                    <label className="px-3.5 py-2.5 bg-[#EDF5EF] border border-[#D0E6D8] rounded-lg text-[#1B4332] text-xs font-semibold whitespace-nowrap cursor-pointer hover:bg-[#E4F0E8] transition-colors">
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(event) => handleLocalImageUpload(event, (value) => updateSlide(i, "imageUrl", value))}
                      />
                    </label>
                  </div>
                </Field>
              </TwoCol>
            </ItemCard>
          ))}
          <AddButton onClick={addSlide} label="Add Slide" />
        </div>
      </EditorSection>

      {/* ── STATS BAND ── */}
      <EditorSection title="Stats Band" subtitle="4 statistics displayed in the dark green strip below the hero">
        <div className="space-y-3">
          {data.stats.map((stat, i) => (
            <ItemCard key={i} index={i} total={data.stats.length} onRemove={() => removeStat(i)} label="Stat">
              <TwoCol>
                <Field label="Value">
                  <TextInput value={stat.value} onChange={(v) => updateStat(i, "value", v)} placeholder="12,400+" />
                </Field>
                <Field label="Label">
                  <TextInput value={stat.label} onChange={(v) => updateStat(i, "label", v)} placeholder="Farmers Supported" />
                </Field>
              </TwoCol>
            </ItemCard>
          ))}
          <AddButton onClick={addStat} label="Add Stat" />
        </div>
      </EditorSection>

      {/* ── INTRO SECTION ── */}
      <EditorSection title="Introduction Section" subtitle="The 'Who We Are' block below the stats band">
        <Field label="Section Heading">
          <TextInput value={data.introHeading} onChange={(v) => setData(prev => ({ ...prev, introHeading: v }))} />
        </Field>
        <Field label="Paragraph 1">
          <Textarea value={data.introPara1} onChange={(v) => setData(prev => ({ ...prev, introPara1: v }))} rows={3} />
        </Field>
        <Field label="Paragraph 2">
          <Textarea value={data.introPara2} onChange={(v) => setData(prev => ({ ...prev, introPara2: v }))} rows={3} />
        </Field>
      </EditorSection>

      {/* ── CORE PILLARS ── */}
      <EditorSection title="Core Pillars" subtitle="The 4-card grid under 'What We Stand For'">
        <div className="space-y-3">
          {data.pillars.map((pillar, i) => (
            <ItemCard key={i} index={i} total={data.pillars.length} onRemove={() => removePillar(i)} label="Pillar">
              <Field label="Pillar Title">
                <TextInput value={pillar.title} onChange={(v) => updatePillar(i, "title", v)} />
              </Field>
              <Field label="Pillar Description">
                <Textarea value={pillar.description} onChange={(v) => updatePillar(i, "description", v)} rows={2} />
              </Field>
            </ItemCard>
          ))}
          <AddButton onClick={addPillar} label="Add Pillar" />
        </div>
      </EditorSection>

      {/* ── BOTTOM CTA ── */}
      <EditorSection title="Bottom CTA Block" subtitle="The dark green call-to-action banner at the bottom of the homepage">
        <Field label="CTA Heading">
          <TextInput value={data.ctaHeading} onChange={(v) => setData(prev => ({ ...prev, ctaHeading: v }))} />
        </Field>
        <Field label="CTA Body Text">
          <Textarea value={data.ctaBody} onChange={(v) => setData(prev => ({ ...prev, ctaBody: v }))} rows={2} />
        </Field>
      </EditorSection>
    </div>
  );
}