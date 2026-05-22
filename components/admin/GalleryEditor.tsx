"use client";

import { useState } from "react";
import { Image as ImageIcon, Grid, Tag } from "lucide-react";
import {
  EditorSection,
  Field,
  TextInput,
  TwoCol,
  ItemCard,
  AddButton,
  EditorPageHeader,
} from "./AdminUI";

const categoryOptions = ["Farming", "Community", "Events", "Nature", "Awards"];

export default function GalleryEditor() {
  const [pageHeading, setPageHeading] = useState("Our Work in Pictures");
  const [pageSubtitle, setPageSubtitle] = useState(
    "A curated visual journey through the farms, villages, events, and lives that AGRIGO has touched over a decade of work."
  );

  const [images, setImages] = useState([
    { src: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80&fit=crop", caption: "Wheat fields of Punjab at golden hour", category: "Farming" },
    { src: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80&fit=crop", caption: "Organic training workshop in Ludhiana", category: "Community" },
    { src: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=800&q=80&fit=crop", caption: "Harvest season celebration, 2023", category: "Events" },
    { src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80&fit=crop", caption: "Water harvesting pond in Haryana", category: "Nature" },
    { src: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&q=80&fit=crop", caption: "Mountain farming outreach — Himachal", category: "Farming" },
    { src: "https://images.unsplash.com/photo-1530099486328-e021101a494a?w=800&q=80&fit=crop", caption: "National Rural Excellence Award ceremony", category: "Awards" },
    { src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80&fit=crop", caption: "Women's cooperative orientation session", category: "Community" },
    { src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80&fit=crop", caption: "Tree plantation drive — 2.1 million trees", category: "Nature" },
    { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&fit=crop", caption: "AgriTech digital kiosk installation", category: "Community" },
    { src: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=800&q=80&fit=crop", caption: "Village community dialogue session", category: "Events" },
    { src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80&fit=crop", caption: "Annual volunteer summit — New Delhi", category: "Events" },
    { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&fit=crop", caption: "Agricultural research field visit", category: "Farming" },
  ]);

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const updateImage = (i: number, key: string, val: string) =>
    setImages((p) => p.map((img, idx) => (idx === i ? { ...img, [key]: val } : img)));
  const addImage = () =>
    setImages((p) => [...p, { src: "", caption: "New Image", category: "Farming" }]);
  const removeImage = (i: number) => setImages((p) => p.filter((_, idx) => idx !== i));

  return (
    <div>
      <EditorPageHeader
        icon={ImageIcon}
        title="Gallery Page Editor"
        description="Manage all photo gallery images — add, remove, update captions and categories."
      />

      {/* Page Header */}
      <EditorSection title="Page Header">
        <Field label="Page Heading">
          <TextInput value={pageHeading} onChange={setPageHeading} />
        </Field>
        <Field label="Subtitle">
          <TextInput value={pageSubtitle} onChange={setPageSubtitle} />
        </Field>
      </EditorSection>

      {/* Images */}
      <EditorSection
        title={`Gallery Images (${images.length})`}
        subtitle="Each image appears as a card in the responsive grid. Click to zoom is built-in."
      >
        {/* View Toggle */}
        <div className="flex items-center gap-2 mb-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              viewMode === "grid" ? "bg-[#1B4332] text-white" : "text-[#52B788]/50 hover:text-[#52B788]"
            }`}
          >
            <Grid className="w-3.5 h-3.5" /> Grid Preview
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              viewMode === "list" ? "bg-[#1B4332] text-white" : "text-[#52B788]/50 hover:text-[#52B788]"
            }`}
          >
            <Tag className="w-3.5 h-3.5" /> List Edit
          </button>
        </div>

        {viewMode === "grid" ? (
          /* Grid Preview Mode */
          <div>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mb-4">
              {images.map((img, i) => (
                <div key={i} className="relative group rounded-lg overflow-hidden aspect-square bg-[#1B4332]/20">
                  {img.src ? (
                    <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#52B788]/20">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                    <p className="text-white text-[9px] leading-tight line-clamp-2">{img.caption}</p>
                    <span className="text-[#D4A853] text-[8px] mt-0.5">{img.category}</span>
                  </div>
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 w-5 h-5 bg-red-500/80 rounded-full flex items-center justify-center text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <AddButton onClick={addImage} label="Add Image" />
          </div>
        ) : (
          /* List Edit Mode */
          <div className="space-y-3">
            {images.map((img, i) => (
              <ItemCard key={i} index={i} total={images.length} onRemove={() => removeImage(i)} label={`Photo ${i + 1}`}>
                <div className="flex gap-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#1B4332]/20 shrink-0">
                    {img.src ? (
                      <img src={img.src} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#52B788]/20">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <Field label="Image URL">
                      <TextInput value={img.src} onChange={(v) => updateImage(i, "src", v)} placeholder="https://images.unsplash.com/..." />
                    </Field>
                  </div>
                </div>
                <TwoCol>
                  <Field label="Caption">
                    <TextInput value={img.caption} onChange={(v) => updateImage(i, "caption", v)} placeholder="Image caption..." />
                  </Field>
                  <Field label="Category">
                    <select
                      value={img.category}
                      onChange={(e) => updateImage(i, "category", e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#0A1A10] border border-[#2D6A4F]/25 rounded-lg text-white text-sm focus:outline-none focus:border-[#52B788]/50 transition-all appearance-none"
                    >
                      {categoryOptions.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </Field>
                </TwoCol>
              </ItemCard>
            ))}
            <AddButton onClick={addImage} label="Add Image" />
          </div>
        )}
      </EditorSection>
    </div>
  );
}