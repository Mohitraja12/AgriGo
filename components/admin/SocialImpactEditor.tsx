"use client";

import { useState } from "react";
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

export default function SocialImpactEditor() {
  const [pageHeading, setPageHeading] = useState("Every Number Hides a Human Story");
  const [pageSubtitle, setPageSubtitle] = useState(
    "Behind every statistic is a family that now eats better, earns more, and hopes further. Here is the evidence of our collective work."
  );

  const [stats, setStats] = useState([
    { value: 12400, suffix: "+", label: "Farmers Assisted" },
    { value: 340, suffix: "+", label: "Villages Reached" },
    { value: 500, suffix: "+", label: "Women SHGs Formed" },
    { value: 62, prefix: "₹", suffix: " Lakh+", label: "Additional Farmer Income" },
  ]);

  const [timeline, setTimeline] = useState([
    {
      year: "2016",
      title: "Organic Farming Training Programme",
      description:
        "Launched our flagship organic farming initiative across 12 villages in Ludhiana district. Over 200 farmers transitioned to chemical-free cultivation, reducing input costs by 30% and improving soil health scores.",
      tag: "Agriculture",
      metric: "200 farmers • 30% cost reduction",
      imageUrl: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80&fit=crop",
    },
    {
      year: "2017",
      title: "Community Water Harvesting Network",
      description:
        "Built 48 farm ponds and 120 borewell recharge structures across Haryana and Punjab. The project has conserved an estimated 180 million litres of rainwater annually, combating drought conditions.",
      tag: "Environment",
      metric: "48 ponds • 180M litres saved yearly",
      imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80&fit=crop",
    },
    {
      year: "2019",
      title: "Rural Women's Cooperative Network",
      description:
        "Established 150 Self-Help Groups across 3 states, collectively managing a revolving credit fund of ₹2.5 crore. Women-led micro-enterprises in food processing and handicrafts generated 1,200+ livelihoods.",
      tag: "Empowerment",
      metric: "150 SHGs • ₹2.5 Cr credit fund",
      imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80&fit=crop",
    },
    {
      year: "2020",
      title: "Digital Literacy & AgriTech Adoption",
      description:
        "During COVID-19, deployed 280 solar-powered smart kiosks in villages enabling farmers to access e-mandi prices, weather alerts, and government scheme information.",
      tag: "Technology",
      metric: "280 kiosks • 3,500 farmers trained",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&fit=crop",
    },
    {
      year: "2022",
      title: "Tree Plantation & Carbon Sequestration Drive",
      description:
        "Partnered with Forest Department and 8,000 farming households to plant 2.1 million trees on farm boundaries and common land.",
      tag: "Environment",
      metric: "2.1 million trees • 8 states",
      imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80&fit=crop",
    },
    {
      year: "2024",
      title: "National Rural Excellence Award",
      description:
        "AGRIGO was honoured with the National Rural Excellence Award by the Ministry of Rural Development for demonstrating an innovative, scalable model of integrated rural development.",
      tag: "Recognition",
      metric: "Govt. of India Recognition",
      imageUrl: "https://images.unsplash.com/photo-1530099486328-e021101a494a?w=800&q=80&fit=crop",
    },
  ]);

  const [testimonialQuote, setTestimonialQuote] = useState(
    "AGRIGO ne mere khet ko badla, mere ghar ko badla, mere sapno ko badla."
  );
  const [testimonialTranslation, setTestimonialTranslation] = useState(
    "AGRIGO changed my farm, changed my home, changed my dreams."
  );
  const [testimonialAuthor, setTestimonialAuthor] = useState(
    "Gurpreet Kaur — Farmer, Fatehgarh Sahib, Punjab"
  );

  const updateStat = (i: number, key: string, val: string | number) =>
    setStats((p) => p.map((s, idx) => (idx === i ? { ...s, [key]: val } : s)));
  const addStat = () =>
    setStats((p) => [...p, { value: 0, suffix: "+", label: "New Stat", prefix: "" }]);
  const removeStat = (i: number) => setStats((p) => p.filter((_, idx) => idx !== i));

  const updateEntry = (i: number, key: string, val: string) =>
    setTimeline((p) => p.map((e, idx) => (idx === i ? { ...e, [key]: val } : e)));
  const addEntry = () =>
    setTimeline((p) => [
      ...p,
      { year: "2025", title: "New Programme", description: "Programme description.", tag: "Agriculture", metric: "Impact metric", imageUrl: "" },
    ]);
  const removeEntry = (i: number) => setTimeline((p) => p.filter((_, idx) => idx !== i));

  return (
    <div>
      <EditorPageHeader
        icon={TrendingUp}
        title="Social Impact Page Editor"
        description="Edit impact stats, programme timeline entries, and the testimonial section."
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

      {/* Stats Counters */}
      <EditorSection title="Impact Statistics" subtitle="Animated counter cards displayed below the page header">
        <div className="space-y-3">
          {stats.map((stat, i) => (
            <ItemCard key={i} index={i} total={stats.length} onRemove={() => removeStat(i)} label="Stat">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Field label="Prefix (e.g. ₹)">
                  <TextInput
                    value={"prefix" in stat ? (stat as any).prefix : ""}
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
          {timeline.map((entry, i) => (
            <ItemCard key={i} index={i} total={timeline.length} onRemove={() => removeEntry(i)} label={`Entry ${i + 1}`}>
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
                  <TextInput value={entry.imageUrl} onChange={(v) => updateEntry(i, "imageUrl", v)} placeholder="https://..." />
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
          <Textarea value={testimonialQuote} onChange={setTestimonialQuote} rows={2} />
        </Field>
        <Field label="English Translation">
          <TextInput value={testimonialTranslation} onChange={setTestimonialTranslation} />
        </Field>
        <Field label="Attribution (Name, Location)">
          <TextInput value={testimonialAuthor} onChange={setTestimonialAuthor} />
        </Field>
      </EditorSection>
    </div>
  );
}