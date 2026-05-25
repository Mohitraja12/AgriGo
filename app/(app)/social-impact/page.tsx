"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Users,
  Sprout,
  Building2,
  HeartHandshake,
  BookOpen,
  Droplets,
  TreePine,
  Award,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { getSocialImpactContent, type SocialImpactData } from "@/lib/firebase/firestore";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";

const statDecorations = [
  { icon: Sprout, color: "#1B4332" },
  { icon: Building2, color: "#2D6A4F" },
  { icon: HeartHandshake, color: "#7C5C3B" },
  { icon: TrendingUp, color: "#D4A853" },
];

const defaultContent: SocialImpactData = {
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
      description:
        "Launched our flagship organic farming initiative across 12 villages in Ludhiana district. Over 200 farmers transitioned to chemical-free cultivation, reducing input costs by 30% and improving soil health scores.",
      imageUrl: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80&fit=crop",
      tag: "Agriculture",
      metric: "200 farmers • 30% cost reduction",
    },
    {
      year: "2017",
      title: "Community Water Harvesting Network",
      description:
        "Built 48 farm ponds and 120 borewell recharge structures across Haryana and Punjab. The project has conserved an estimated 180 million litres of rainwater annually, combating drought conditions.",
      imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80&fit=crop",
      tag: "Environment",
      metric: "48 ponds • 180M litres saved yearly",
    },
    {
      year: "2019",
      title: "Rural Women's Cooperative Network",
      description:
        "Established 150 Self-Help Groups across 3 states, collectively managing a revolving credit fund of ₹2.5 crore. Women-led micro-enterprises in food processing and handicrafts generated 1,200+ livelihoods.",
      imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80&fit=crop",
      tag: "Empowerment",
      metric: "150 SHGs • ₹2.5 Cr credit fund",
    },
    {
      year: "2020",
      title: "Digital Literacy & AgriTech Adoption",
      description:
        "During COVID-19, deployed 280 solar-powered smart kiosks in villages enabling farmers to access e-mandi prices, weather alerts, and government scheme information. Trained 3,500 farmers on smartphone usage.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&fit=crop",
      tag: "Technology",
      metric: "280 kiosks • 3,500 farmers trained",
    },
    {
      year: "2022",
      title: "Tree Plantation & Carbon Sequestration Drive",
      description:
        "Partnered with Forest Department and 8,000 farming households to plant 2.1 million trees on farm boundaries and common land, creating green corridors and supplementary income through agroforestry.",
      imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80&fit=crop",
      tag: "Environment",
      metric: "2.1 million trees • 8 states",
    },
    {
      year: "2024",
      title: "National Rural Excellence Award",
      description:
        "Soilx was honoured with the National Rural Excellence Award by the Ministry of Rural Development for demonstrating an innovative, scalable model of integrated rural development spanning agriculture, livelihoods, and ecology.",
      imageUrl: "https://images.unsplash.com/photo-1530099486328-e021101a494a?w=800&q=80&fit=crop",
      tag: "Recognition",
      metric: "Govt. of India Recognition",
    },
  ],
  testimonialQuote: "Soilx ne mere khet ko badla, mere ghar ko badla, mere sapno ko badla.",
  testimonialTranslation: "Soilx changed my farm, changed my home, changed my dreams.",
  testimonialAuthor: "Gurpreet Kaur — Farmer, Fatehgarh Sahib, Punjab",
};

function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString("en-IN")}{suffix}
    </span>
  );
}

export default function SocialImpactPage() {
  const [content, setContent] = useState<SocialImpactData>(defaultContent);
  const [loading, setLoading] = useState<boolean>(true);
  const statsWithMeta = content.stats.map((stat, index) => ({
    ...stat,
    ...(statDecorations[index] ?? statDecorations[0]),
  }));

  useEffect(() => {
    const loadContent = async () => {
      try {
        const socialImpactContent = await getSocialImpactContent();
        if (socialImpactContent?.data) {
          setContent((prev) => ({
            ...prev,
            ...socialImpactContent.data,
            stats: socialImpactContent.data.stats?.length ? socialImpactContent.data.stats : prev.stats,
            timeline: socialImpactContent.data.timeline?.length ? socialImpactContent.data.timeline : prev.timeline,
          }));
        }
      } catch (error: unknown) {
        console.error("Error loading social impact content:", error);
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
    return <LoadingSkeleton variant="social-impact" />;
  }

  return (
    <div className="bg-[#F7F4EE] pt-20">
      {/* ── PAGE HEADER ── */}
      <section className="bg-[#1B4332] py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=1600&q=60&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B4332] via-[#1B4332]/95 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#D4A853]" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#D4A853]">Impact Stories</span>
          </div>
          <h1
            className="text-5xl md:text-6xl font-bold text-[#F7F4EE] leading-tight max-w-2xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {content.pageHeading}
          </h1>
          <p className="mt-5 text-[#F7F4EE]/65 max-w-xl leading-relaxed text-lg">
            {content.pageSubtitle}
          </p>
        </div>
      </section>

      {/* ── STAT COUNTERS ── */}
      <section className="py-16 bg-[#EDE8DC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statsWithMeta.map((stat, index) => (
            <motion.div
              key={stat.label}
              {...fadeUp(index * 0.08)}
              className="bg-white rounded-2xl p-8 text-center border border-[#1B4332]/8 hover:shadow-md transition-shadow"
            >
              <div
                className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
              <p
                className="text-3xl lg:text-4xl font-bold"
                style={{ fontFamily: "var(--font-playfair)", color: stat.color }}
              >
                <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </p>
              <p className="text-sm text-[#6B6B5E] mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#1B4332]" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#2D6A4F]">Our Programmes</span>
            <span className="w-8 h-px bg-[#1B4332]" />
          </div>
          <h2
            className="text-4xl font-bold text-[#1B4332]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Key Initiatives & Milestones
          </h2>
          <p className="text-[#6B6B5E] mt-3 max-w-xl mx-auto">
            A decade of purposeful work, told through our most impactful programmes.
          </p>
        </div>

        {/* Alternating Layout */}
        <div className="space-y-16">
          {content.timeline.map((item, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={i}
                {...fadeUp(i * 0.08)}
                className={`grid lg:grid-cols-2 gap-10 items-center ${
                  isEven ? "" : "lg:grid-flow-dense"
                }`}
              >
                {/* Image */}
                <div className={`rounded-3xl overflow-hidden aspect-video ${isEven ? "" : "lg:col-start-2"}`}>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className={isEven ? "lg:col-start-2" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="text-4xl font-bold text-[#1B4332]/15"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {item.year}
                    </span>
                    <span className="px-3 py-1 bg-[#1B4332]/8 text-[#1B4332] text-xs font-semibold rounded-full">
                      {item.tag}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 bg-[#1B4332] rounded-xl flex items-center justify-center shrink-0">
                      <Sparkles className="w-5 h-5 text-[#D4A853]" />
                    </div>
                    <h3
                      className="text-2xl font-bold text-[#1B4332]"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-[#6B6B5E] leading-relaxed mb-5">{item.description}</p>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#2D6A4F] bg-[#2D6A4F]/8 px-4 py-2 rounded-full">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {item.metric}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section className="bg-[#1B4332] py-20">
        <motion.div {...fadeUp()} className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <p
            className="text-3xl md:text-4xl font-bold text-[#F7F4EE] leading-relaxed mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {content.testimonialQuote}
          </p>
          <p className="text-[#F7F4EE]/40 italic text-base mb-2">
            {content.testimonialTranslation}
          </p>
          <p className="text-[#D4A853] font-semibold text-sm tracking-wide">
            {content.testimonialAuthor}
          </p>
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-[#EDE8DC]">
        <motion.div {...fadeUp()} className="max-w-3xl mx-auto text-center px-6">
          <h2
            className="text-3xl font-bold text-[#1B4332] mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Want to contribute to the next milestone?
          </h2>
          <p className="text-[#6B6B5E] mb-8">
            Partner with Soilx as a donor, corporate CSR partner, volunteer, or knowledge expert.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1B4332] text-[#F7F4EE] font-semibold rounded-full hover:bg-[#2D6A4F] transition-colors"
          >
            Start a Conversation <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}