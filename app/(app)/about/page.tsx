import Link from "next/link";
import {
  Target,
  Eye,
  Heart,
  Shield,
  Handshake,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  Users,
  Leaf,
} from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Compassion First",
    desc: "Every decision we make is rooted in empathy for the farmer, the family, and the community we serve.",
  },
  {
    icon: Shield,
    title: "Integrity Always",
    desc: "Transparent operations, honest reporting, and accountable governance at every level of the organisation.",
  },
  {
    icon: Handshake,
    title: "Community Ownership",
    desc: "We don't work for communities — we work with them, ensuring they lead their own development journeys.",
  },
  {
    icon: Lightbulb,
    title: "Innovation & Learning",
    desc: "Combining traditional farming wisdom with modern research to develop solutions that are practical and scalable.",
  },
];

const milestones = [
  { year: "2015", event: "AGRIGO founded in Ludhiana, Punjab with a 12-farmer cooperative." },
  { year: "2016", event: "Launched first organic farming training programme; 200 farmers enrolled." },
  { year: "2017", event: "Expanded to Haryana and Himachal Pradesh. Established mobile health camps." },
  { year: "2019", event: "Crossed 2,000 farmer milestone. Received National Rural Development Award." },
  { year: "2021", event: "Launched women's empowerment vertical — 500 SHGs formed across 3 states." },
  { year: "2023", event: "8 states, 340+ villages, and 12,400+ farmers supported annually." },
];

const team = [
  {
    name: "Rajinder Singh",
    role: "Founder & Executive Director",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&fit=crop&faces",
  },
  {
    name: "Priya Mehta",
    role: "Director — Community Programs",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80&fit=crop&faces",
  },
  {
    name: "Dr. Amit Rao",
    role: "Head of Agricultural Research",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&fit=crop&faces",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#F7F4EE] pt-20">
      {/* ── PAGE HEADER ── */}
      <section className="relative overflow-hidden bg-[#1B4332] py-24">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600&q=60&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B4332] via-[#1B4332]/90 to-[#1B4332]/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#D4A853]" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#D4A853]">
              Our Story
            </span>
          </div>
          <h1
            className="text-5xl md:text-6xl font-bold text-[#F7F4EE] leading-tight max-w-2xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Rooted in Purpose, Growing with Purpose
          </h1>
          <p className="mt-5 text-[#F7F4EE]/65 max-w-xl leading-relaxed text-lg">
            Since 2015, AGRIGO has been a living testament to what happens when communities are trusted, supported, and connected.
          </p>
        </div>
      </section>

      {/* ── MISSION / VISION / VALUES GRID ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Mission — Large Card */}
          <div className="lg:col-span-2 bg-[#1B4332] rounded-3xl p-10 text-[#F7F4EE] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-56 h-56 bg-[#2D6A4F] rounded-full translate-x-1/3 -translate-y-1/3 opacity-60" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#D4A853] rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-[#1B4332]" />
                </div>
                <span className="text-sm font-semibold tracking-widest uppercase text-[#D4A853]">Our Mission</span>
              </div>
              <h2
                className="text-3xl font-bold text-[#F7F4EE] mb-5 leading-snug"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                To build a world where every farmer is food-secure, financially independent, and socially dignified.
              </h2>
              <p className="text-[#F7F4EE]/65 leading-relaxed">
                We pursue this mission by integrating sustainable agricultural practices, inclusive financial services, market access programs, and community-led governance into a single, cohesive development model that scales from one farm to thousands of villages.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {["Sustainable Farming Models", "Financial Inclusion", "Market Linkages", "Policy Advocacy"].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-[#F7F4EE]/80">
                    <CheckCircle2 className="w-4 h-4 text-[#52B788] shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Vision — Tall Card */}
          <div className="bg-[#EDE8DC] rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-[#1B4332] rounded-xl flex items-center justify-center">
                  <Eye className="w-5 h-5 text-[#D4A853]" />
                </div>
                <span className="text-sm font-semibold tracking-widest uppercase text-[#2D6A4F]">Our Vision</span>
              </div>
              <h3
                className="text-2xl font-bold text-[#1B4332] leading-snug mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                A prosperous, equitable rural India by 2035
              </h3>
              <p className="text-sm text-[#6B6B5E] leading-relaxed">
                We envision a future where the prosperity gap between rural and urban India has closed — where a farmer's child has the same opportunities as a city child, and where the land is cared for as much as the people who depend on it.
              </p>
            </div>
            <div className="mt-8 p-5 bg-[#1B4332]/8 rounded-2xl border border-[#1B4332]/10">
              <p
                className="text-lg font-semibold text-[#1B4332] italic"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                "Khet se khushhaali tak — From field to flourishing."
              </p>
              <p className="text-xs text-[#6B6B5E] mt-2">— AGRIGO Founding Charter, 2015</p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mt-12">
          <h2
            className="text-3xl font-bold text-[#1B4332] mb-8"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="p-6 bg-white rounded-2xl border border-[#1B4332]/8 hover:border-[#1B4332]/20 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 bg-[#1B4332]/8 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#1B4332] transition-colors">
                  <v.icon className="w-5 h-5 text-[#1B4332] group-hover:text-[#D4A853] transition-colors" />
                </div>
                <h4
                  className="font-bold text-[#1B4332] mb-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {v.title}
                </h4>
                <p className="text-sm text-[#6B6B5E] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR JOURNEY ── */}
      <section className="bg-[#EDE8DC] py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-[#1B4332]" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#2D6A4F]">Our Journey</span>
          </div>
          <h2
            className="text-3xl font-bold text-[#1B4332] mb-12"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            A Decade of Milestones
          </h2>

          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-px bg-[#1B4332]/20 hidden md:block" />
            <div className="space-y-6">
              {milestones.map((m) => (
                <div key={m.year} className="flex items-start gap-8">
                  <div
                    className="w-24 text-right text-2xl font-bold text-[#1B4332] shrink-0 hidden md:block"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {m.year}
                  </div>
                  <div className="hidden md:flex w-8 items-center justify-center pt-1.5 shrink-0">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#D4A853] border-2 border-[#EDE8DC] ring-2 ring-[#D4A853]/30" />
                  </div>
                  <div className="flex-1 bg-white rounded-xl p-5 border border-[#1B4332]/8">
                    <span
                      className="text-[#D4A853] font-bold md:hidden"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {m.year} —{" "}
                    </span>
                    <span className="text-[#1C1C1C] text-sm leading-relaxed">{m.event}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-px bg-[#1B4332]" />
              <span className="text-xs font-semibold tracking-widest uppercase text-[#2D6A4F]">Leadership</span>
            </div>
            <h2
              className="text-3xl font-bold text-[#1B4332]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The People Behind AGRIGO
            </h2>
          </div>
          <Link
            href="/contact"
            className="flex items-center gap-2 text-sm font-semibold text-[#1B4332] border-b-2 border-[#D4A853] pb-0.5 hover:gap-3 transition-all"
          >
            Get in Touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.name} className="group">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] mb-4 bg-[#EDE8DC]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3
                className="text-lg font-bold text-[#1B4332]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {member.name}
              </h3>
              <p className="text-sm text-[#6B6B5E]">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="bg-[#EDE8DC] py-16">
        <div className="max-w-3xl mx-auto text-center px-6">
          <Leaf className="w-10 h-10 text-[#1B4332] mx-auto mb-5" />
          <h2
            className="text-3xl font-bold text-[#1B4332] mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Want to become part of the story?
          </h2>
          <p className="text-[#6B6B5E] mb-8">
            We are always looking for passionate partners, volunteers, and supporters who share our vision for a better rural India.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/social-impact"
              className="px-6 py-3 bg-[#1B4332] text-[#F7F4EE] font-semibold text-sm rounded-full hover:bg-[#2D6A4F] transition-colors"
            >
              See Our Impact
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border-2 border-[#1B4332] text-[#1B4332] font-semibold text-sm rounded-full hover:bg-[#1B4332]/5 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}