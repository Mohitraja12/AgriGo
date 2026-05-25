"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sprout,
  Users,
  BarChart3,
  Heart,
  TreePine,
  Star,
} from "lucide-react";
import { getHomepageContent, type HomepageData } from "@/lib/firebase/firestore";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";

interface HeroSlideView {
  id: number;
  image: string;
  tag: string;
  title: string;
  description: string;
  cta: {
    label: string;
    href: string;
  };
  accent: string;
}

interface PillarView {
  icon: typeof Sprout;
  title: string;
  description: string;
  link: string;
  color: string;
}

interface StatView {
  value: string;
  label: string;
}

// Default fallback data (agar Firebase se data nahi aata)
const defaultSlides: HeroSlideView[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600&q=80&fit=crop",
    tag: "Sustainable Agriculture",
    title: "Cultivating Futures,\nOne Field at a Time",
    description: "Empowering farmers across rural India with modern techniques, fair markets, and unwavering support for a sustainable tomorrow.",
    cta: { label: "Our Impact", href: "/social-impact" },
    accent: "#52B788",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=1600&q=80&fit=crop",
    tag: "Community Development",
    title: "Building Villages,\nStrengthening Bonds",
    description: "From self-help groups to cooperative networks — AGRIGO weaves communities together through education, resources, and shared vision.",
    cta: { label: "About AGRIGO", href: "/about" },
    accent: "#D4A853",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=1600&q=80&fit=crop",
    tag: "Social Impact",
    title: "Measurable Change,\nReal Transformation",
    description: "Thousands of lives touched. Hundreds of villages empowered. Our data-driven approach ensures every initiative creates lasting change.",
    cta: { label: "See Gallery", href: "/gallery" },
    accent: "#7C5C3B",
  },
];

const defaultPillars: PillarView[] = [
  {
    icon: Sprout,
    title: "Sustainable Farming",
    description: "We introduce climate-resilient farming methods — from drip irrigation to organic certification — that increase yield and reduce costs for smallholder farmers.",
    link: "/about",
    color: "#1B4332",
  },
  {
    icon: Users,
    title: "Community Empowerment",
    description: "Through self-help groups, cooperative societies, and vocational training, we build human capital that drives lasting village-level transformation.",
    link: "/social-impact",
    color: "#2D6A4F",
  },
  {
    icon: BarChart3,
    title: "Market Access",
    description: "We bridge the gap between rural producers and urban markets — negotiating fair prices, providing logistics support, and eliminating exploitative middlemen.",
    link: "/social-impact",
    color: "#7C5C3B",
  },
  {
    icon: Heart,
    title: "Social Welfare",
    description: "Health camps, nutrition programs, and women's empowerment initiatives run alongside agricultural work — because whole communities thrive together.",
    link: "/social-impact",
    color: "#1B4332",
  },
];

const defaultStats: StatView[] = [
  { value: "12,400+", label: "Farmers Supported" },
  { value: "340+", label: "Villages Reached" },
  { value: "8", label: "States Operational" },
  { value: "₹6.2 Cr", label: "Additional Farmer Income" },
];

export default function HomePage() {
  const [loading, setLoading] = useState<boolean>(true);
  
  // Dynamic content state
  const [slides, setSlides] = useState<HeroSlideView[]>(defaultSlides);
  const [stats, setStats] = useState<StatView[]>(defaultStats);
  const [pillars, setPillars] = useState<PillarView[]>(defaultPillars);
  const [introHeading, setIntroHeading] = useState<string>("Agriculture as a tool for dignity and prosperity");
  const [introPara1, setIntroPara1] = useState<string>("AGRIGO is a grassroots organisation working at the intersection of sustainable agriculture and community development. Founded in 2015, we have grown from a small cooperative in Punjab to a multi-state movement empowering over 12,000 farmers and their families.");
  const [introPara2, setIntroPara2] = useState<string>("We believe that when farmers thrive, villages thrive — and when villages thrive, the nation grows. Our integrated approach combines technical assistance, financial inclusion, market linkages, and deep community trust.");
  const [ctaHeading, setCtaHeading] = useState<string>("Help us plant seeds of change across India");
  const [ctaBody, setCtaBody] = useState<string>("Whether you are a donor, a corporate partner, a volunteer, or a farmer seeking support — AGRIGO has a place for you in this movement.");

  // Slider state
  const [current, setCurrent] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Fetch data from Firebase
  useEffect(() => {
    const loadData = async () => {
      try {
        const content = await getHomepageContent();
        const homepageData: HomepageData | undefined = content?.data;

        if (homepageData) {
          
          // Update slides from Firebase
          if (homepageData.slides && homepageData.slides.length > 0) {
            const firebaseSlides: HeroSlideView[] = homepageData.slides.map((slide, index) => ({
              id: index + 1,
              image: slide.imageUrl,
              tag: slide.tag,
              title: slide.title,
              description: slide.description,
              cta: { label: slide.ctaLabel, href: slide.ctaHref },
              accent: index === 0 ? "#52B788" : index === 1 ? "#D4A853" : "#7C5C3B",
            }));
            setSlides(firebaseSlides);
          }
          
          // Update stats from Firebase
          if (homepageData.stats && homepageData.stats.length > 0) {
            setStats(homepageData.stats);
          }
          
          // Update pillars from Firebase
          if (homepageData.pillars && homepageData.pillars.length > 0) {
            const updatedPillars = defaultPillars.map((pillar, index) => {
              if (homepageData.pillars[index]) {
                return {
                  ...pillar,
                  title: homepageData.pillars[index].title,
                  description: homepageData.pillars[index].description,
                };
              }
              return pillar;
            });
            setPillars(updatedPillars);
          }
          
          // Update intro section
          if (homepageData.introHeading) setIntroHeading(homepageData.introHeading);
          if (homepageData.introPara1) setIntroPara1(homepageData.introPara1);
          if (homepageData.introPara2) setIntroPara2(homepageData.introPara2);
          
          // Update CTA
          if (homepageData.ctaHeading) setCtaHeading(homepageData.ctaHeading);
          if (homepageData.ctaBody) setCtaBody(homepageData.ctaBody);
        }
      } catch (error: unknown) {
        console.error("Error loading homepage content:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Slider functions
  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent(index);
        setIsTransitioning(false);
      }, 300);
    },
    [isTransitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo, slides.length]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo, slides.length]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.5, delay },
  });

  if (loading) {
    return <LoadingSkeleton variant="home" />;
  }

  return (
    <div className="bg-[#F7F4EE]">
      {/* ── HERO SLIDER ── */}
      <section className="relative h-screen min-h-[600px] max-h-[860px] overflow-hidden">
        {/* Slide Background */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B4332]/85 via-[#1B4332]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/60 via-transparent to-transparent" />
        </div>

        {/* Slide Content */}
        <div
          className={`relative z-10 h-full flex items-center transition-all duration-500 ${
            isTransitioning
              ? "opacity-0 translate-y-4"
              : "opacity-100 translate-y-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full pt-20">
            <div className="max-w-2xl">
              <span
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-5 px-3 py-1.5 rounded-full border"
                style={{
                  color: slide.accent,
                  borderColor: `${slide.accent}50`,
                  backgroundColor: `${slide.accent}15`,
                }}
              >
                <Star className="w-3 h-3" fill="currentColor" />
                {slide.tag}
              </span>
              <h1
                className="text-5xl md:text-7xl font-bold text-[#F7F4EE] leading-[1.05] mb-6 whitespace-pre-line"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {slide.title}
              </h1>
              <p className="text-lg text-[#F7F4EE]/75 leading-relaxed mb-10 max-w-xl">
                {slide.description}
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <Link
                  href={slide.cta.href}
                  className="flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm transition-all"
                  style={{
                    backgroundColor: slide.accent,
                    color: "#1B4332",
                  }}
                >
                  {slide.cta.label} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="px-7 py-3.5 rounded-full font-semibold text-sm border border-white/40 text-white hover:bg-white/10 transition-colors"
                >
                  Partner With Us
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Prev / Next Buttons */}
        <button
          onClick={prev}
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/15 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors border border-white/20"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/15 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors border border-white/20"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 h-2.5 bg-[#D4A853]"
                  : "w-2.5 h-2.5 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute bottom-8 right-8 z-20 text-white/50 text-xs font-mono tracking-widest">
          0{current + 1} / 0{slides.length}
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section className="bg-[#1B4332]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div key={stat.label} {...fadeUp(index * 0.08)} className="text-center">
              <p
                className="text-3xl lg:text-4xl font-bold text-[#D4A853]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {stat.value}
              </p>
              <p className="text-sm text-[#F7F4EE]/60 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── INTRO SECTION ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div {...fadeUp()}>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-10 h-px bg-[#1B4332]" />
              <span className="text-xs font-semibold tracking-widest uppercase text-[#2D6A4F]">
                Who We Are
              </span>
            </div>
            <h2
              className="text-4xl lg:text-5xl font-bold text-[#1B4332] leading-tight mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {introHeading}
            </h2>
            <p className="text-[#6B6B5E] leading-relaxed mb-5">
              {introPara1}
            </p>
            <p className="text-[#6B6B5E] leading-relaxed mb-8">
              {introPara2}
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[#1B4332] font-semibold text-sm border-b-2 border-[#D4A853] pb-0.5 hover:gap-3 transition-all"
            >
              Read Our Full Story <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Visual Grid */}
          <motion.div {...fadeUp(0.08)} className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&q=80&fit=crop"
              alt="Agriculture"
              className="rounded-2xl object-cover w-full h-52 col-span-1"
            />
            <img
              src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80&fit=crop"
              alt="Community"
              className="rounded-2xl object-cover w-full h-52 col-span-1"
            />
            <div className="col-span-2 bg-[#1B4332] rounded-2xl p-6 text-[#F7F4EE] flex items-center gap-4">
              <TreePine className="w-10 h-10 text-[#D4A853] shrink-0" />
              <div>
                <p
                  className="text-xl font-bold mb-1"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  10 Years of Impact
                </p>
                <p className="text-sm text-[#F7F4EE]/60">
                  A decade of cultivating communities, preserving ecology, and
                  building rural livelihoods across 8 Indian states.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CORE PILLARS ── */}
      <section className="bg-[#EDE8DC] py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px bg-[#1B4332]" />
              <span className="text-xs font-semibold tracking-widest uppercase text-[#2D6A4F]">
                Our Core Pillars
              </span>
              <span className="w-8 h-px bg-[#1B4332]" />
            </div>
            <h2
              className="text-4xl font-bold text-[#1B4332]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              What We Stand For
            </h2>
            <p className="text-[#6B6B5E] mt-3 max-w-xl mx-auto">
              Four interconnected pillars form the foundation of everything AGRIGO
              does — from the field to the community hall.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.08)}
                className="group bg-[#F7F4EE] rounded-2xl p-7 border border-[#1B4332]/8 hover:border-[#1B4332]/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors"
                  style={{ backgroundColor: `${pillar.color}15` }}
                >
                  <pillar.icon
                    className="w-6 h-6"
                    style={{ color: pillar.color }}
                  />
                </div>
                <h3
                  className="text-lg font-bold text-[#1B4332] mb-3"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#6B6B5E] leading-relaxed flex-1">
                  {pillar.description}
                </p>
                <Link
                  href={pillar.link}
                  className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-[#2D6A4F] group-hover:gap-2.5 transition-all"
                >
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-24 bg-[#F7F4EE]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div {...fadeUp()} className="bg-[#1B4332] rounded-3xl p-10 md:p-16 overflow-hidden relative">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#2D6A4F] rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#52B788]/20 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-[#D4A853] text-sm font-semibold tracking-widest uppercase mb-3">
                  Join the Movement
                </p>
                <h2
                  className="text-4xl font-bold text-[#F7F4EE] leading-tight"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {ctaHeading}
                </h2>
              </div>
              <div>
                <p className="text-[#F7F4EE]/60 mb-8 leading-relaxed">
                  {ctaBody}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/social-impact"
                    className="flex items-center gap-2 px-6 py-3 bg-[#D4A853] text-[#1B4332] font-semibold text-sm rounded-full hover:bg-[#e0b86a] transition-colors"
                  >
                    View Our Impact <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="px-6 py-3 border border-white/30 text-white text-sm font-semibold rounded-full hover:bg-white/10 transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}