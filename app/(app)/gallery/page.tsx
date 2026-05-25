"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, ZoomIn, Tag } from "lucide-react";
import { getGalleryContent, type GalleryData } from "@/lib/firebase/firestore";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";

const categories = ["All", "Farming", "Community", "Events", "Nature", "Awards"];

const defaultGalleryContent: GalleryData = {
  pageHeading: "Our Work in Pictures",
  pageSubtitle: "A curated visual journey through the farms, villages, events, and lives that AGRIGO has touched over a decade of work.",
  images: [
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
  ],
};

export default function GalleryPage() {
  const [content, setContent] = useState<GalleryData>(defaultGalleryContent);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<GalleryData["images"][number] | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const galleryContent = await getGalleryContent();
        if (galleryContent?.data) {
          setContent(galleryContent.data);
        }
      } catch (error: unknown) {
        console.error("Error loading gallery content:", error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.5, delay },
  });

  if (loading) {
    return <LoadingSkeleton variant="gallery" />;
  }

  const filtered =
    activeCategory === "All"
      ? content.images
      : content.images.filter((item) => item.category === activeCategory);

  return (
    <div className="bg-[#F7F4EE] pt-20">
      {/* ── HEADER ── */}
      <section className="bg-[#1B4332] py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=60&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B4332] to-[#1B4332]/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#D4A853]" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#D4A853]">Visual Stories</span>
          </div>
          <h1
            className="text-5xl md:text-6xl font-bold text-[#F7F4EE] leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {content.pageHeading}
          </h1>
          <p className="mt-4 text-[#F7F4EE]/65 max-w-lg leading-relaxed">
            {content.pageSubtitle}
          </p>
        </div>
      </section>

      {/* ── FILTER TABS ── */}
      <div className="sticky top-[72px] z-30 bg-[#F7F4EE]/90 backdrop-blur border-b border-[#1B4332]/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          <Tag className="w-4 h-4 text-[#6B6B5E] shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-[#1B4332] text-[#F7F4EE]"
                  : "text-[#6B6B5E] hover:bg-[#1B4332]/8 hover:text-[#1B4332]"
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-xs text-[#6B6B5E] shrink-0">
            {filtered.length} photos
          </span>
        </div>
      </div>

      {/* ── GALLERY GRID ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filtered.map((item, index) => (
            <motion.div
              key={`${item.category}-${item.caption}-${index}`}
              {...fadeUp(index * 0.05)}
              className="group relative rounded-2xl overflow-hidden bg-[#EDE8DC] cursor-pointer aspect-[4/3]"
              onClick={() => setLightbox(item)}
            >
              <img
                src={item.src}
                alt={item.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs font-semibold text-[#D4A853] tracking-widest uppercase mb-1">
                  {item.category}
                </span>
                <p className="text-sm font-medium text-[#F7F4EE] leading-snug">
                  {item.caption}
                </p>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4 text-[#1B4332]" />
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-[#6B6B5E]">
            <p className="text-lg font-medium">No photos in this category yet.</p>
          </div>
        )}
      </section>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-10"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.src}
              alt={lightbox.caption}
              className="w-full rounded-2xl object-contain max-h-[80vh]"
            />
            <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="text-xs font-semibold text-[#D4A853] tracking-widest uppercase">
                  {lightbox.category}
                </span>
                <p className="text-[#F7F4EE] text-base mt-0.5">{lightbox.caption}</p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="text-[#F7F4EE]/60 hover:text-[#F7F4EE] text-sm flex items-center gap-1.5 transition-colors"
              >
                <X className="w-4 h-4" /> Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}