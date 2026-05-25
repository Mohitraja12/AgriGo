"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { getContactContent, type ContactData } from "@/lib/firebase/firestore";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";

const socialBadgeClasses: Record<string, string> = {
  Facebook: "f",
  Instagram: "ig",
  LinkedIn: "in",
  Twitter: "x",
};

const offices = [
  {
    name: "Headquarters — Punjab",
    address: "Soilx Organisation, Block C, Krishi Nagar, Sector 12, Ludhiana, Punjab — 141001",
    phone: "+91 98765 43210",
    email: "info@soilx.org",
    hours: "Mon – Sat: 9:00 AM – 6:00 PM",
  },
  {
    name: "Field Office — Haryana",
    address: "Village Panchayat Bhawan, NH-44 Bypass, Ambala, Haryana — 134003",
    phone: "+91 98765 43211",
    email: "haryana@soilx.org",
    hours: "Mon – Fri: 9:00 AM – 5:00 PM",
  },
];

const departments = [
  { label: "General Enquiries", email: "info@soilx.org" },
  { label: "Farmer Support", email: "support@soilx.org" },
  { label: "Partnerships & CSR", email: "partners@soilx.org" },
  { label: "Media & Press", email: "media@soilx.org" },
];

const subjects = [
  "General Enquiry",
  "Farmer Support",
  "Volunteer / Internship",
  "Corporate Partnership / CSR",
  "Media & Press",
  "Donation / Funding",
  "Other",
];

const defaultContactContent: ContactData = {
  pageHeading: "Let's Start a Conversation",
  pageSubtitle: "Whether you're a farmer needing help, a partner wanting to collaborate, or a donor ready to make a difference — we're here and we're listening.",
  offices: [
    {
      name: "Headquarters — Punjab",
      address: "Soilx Organisation, Block C, Krishi Nagar, Sector 12, Ludhiana, Punjab — 141001",
      phone: "+91 98765 43210",
      email: "info@soilx.org",
      hours: "Mon – Sat: 9:00 AM – 6:00 PM",
    },
    {
      name: "Field Office — Haryana",
      address: "Village Panchayat Bhawan, NH-44 Bypass, Ambala, Haryana — 134003",
      phone: "+91 98765 43211",
      email: "haryana@soilx.org",
      hours: "Mon – Fri: 9:00 AM – 5:00 PM",
    },
  ],
  departments: [
    { label: "General Enquiries", email: "info@soilx.org" },
    { label: "Farmer Support", email: "support@soilx.org" },
    { label: "Partnerships & CSR", email: "partners@soilx.org" },
    { label: "Media & Press", email: "media@soilx.org" },
  ],
  socialLinks: [
    { label: "Facebook", url: "#" },
    { label: "Instagram", url: "#" },
    { label: "Twitter", url: "#" },
    { label: "LinkedIn", url: "#" },
  ],
};

export default function ContactPage() {
  const [content, setContent] = useState<ContactData>(defaultContactContent);
  const [loading, setLoading] = useState<boolean>(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const contactContent = await getContactContent();
        if (contactContent?.data) {
          setContent(contactContent.data);
        }
      } catch (error: unknown) {
        console.error("Error loading contact content:", error);
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
    return <LoadingSkeleton variant="contact" />;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1800);
  };

  return (
    <div className="bg-[#F7F4EE] pt-20">
      {/* ── PAGE HEADER ── */}
      <section className="bg-[#1B4332] py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=60&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B4332] via-[#1B4332]/90 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#D4A853]" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#D4A853]">
              Get in Touch
            </span>
          </div>
          <h1
            className="text-5xl md:text-6xl font-bold text-[#F7F4EE] leading-tight max-w-xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {content.pageHeading}
          </h1>
          <p className="mt-4 text-[#F7F4EE]/65 max-w-lg leading-relaxed">
            {content.pageSubtitle}
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* ── LEFT: Contact Details ── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Office Cards */}
            <div>
              <h2
                className="text-2xl font-bold text-[#1B4332] mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Our Offices
              </h2>
              <div className="space-y-5">
                {content.offices.map((office) => (
                  <motion.div
                    key={office.name}
                    {...fadeUp()}
                    className="bg-white rounded-2xl p-6 border border-[#1B4332]/10 hover:border-[#1B4332]/20 transition-colors"
                  >
                    <h3
                      className="font-bold text-[#1B4332] mb-4"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {office.name}
                    </h3>
                    <div className="space-y-3 text-sm text-[#6B6B5E]">
                      <div className="flex gap-3">
                        <MapPin className="w-4 h-4 text-[#2D6A4F] mt-0.5 shrink-0" />
                        <span>{office.address}</span>
                      </div>
                      <div className="flex gap-3 items-center">
                        <Phone className="w-4 h-4 text-[#2D6A4F] shrink-0" />
                        <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="hover:text-[#1B4332] transition-colors">
                          {office.phone}
                        </a>
                      </div>
                      <div className="flex gap-3 items-center">
                        <Mail className="w-4 h-4 text-[#2D6A4F] shrink-0" />
                        <a href={`mailto:${office.email}`} className="hover:text-[#1B4332] transition-colors">
                          {office.email}
                        </a>
                      </div>
                      <div className="flex gap-3 items-center">
                        <Clock className="w-4 h-4 text-[#2D6A4F] shrink-0" />
                        <span>{office.hours}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Departments */}
            <div>
              <h2
                className="text-xl font-bold text-[#1B4332] mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Department Emails
              </h2>
              <div className="bg-[#EDE8DC] rounded-2xl p-5 space-y-3">
                {content.departments.map((d) => (
                  <motion.div key={d.label} {...fadeUp()} className="flex items-center justify-between gap-4">
                    <span className="text-sm text-[#6B6B5E]">{d.label}</span>
                    <a
                      href={`mailto:${d.email}`}
                      className="text-sm font-medium text-[#1B4332] hover:text-[#2D6A4F] transition-colors flex items-center gap-1"
                    >
                      {d.email}
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social */}
            <div>
              <h2
                className="text-xl font-bold text-[#1B4332] mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Follow Our Work
              </h2>
              <div className="flex gap-3 flex-wrap">
                {content.socialLinks.map((s) => (
                  <motion.a
                    key={s.label}
                    {...fadeUp()}
                    href={s.url}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#1B4332]/10 rounded-xl text-sm text-[#1B4332] font-medium hover:bg-[#1B4332] hover:text-[#F7F4EE] hover:border-transparent transition-all group"
                  >
                    <span className="w-4 h-4 rounded-full bg-[#1B4332]/10 text-[9px] font-semibold uppercase leading-none flex items-center justify-center group-hover:bg-[#F7F4EE]/15">
                      {socialBadgeClasses[s.label] ?? s.label.slice(0, 2)}
                    </span>
                    {s.label}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Contact Form ── */}
          <motion.div {...fadeUp(0.08)} className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#1B4332]/10 shadow-sm">
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-[#1B4332]/8 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="w-8 h-8 text-[#2D6A4F]" />
                  </div>
                  <h3
                    className="text-2xl font-bold text-[#1B4332] mb-3"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    Message Received!
                  </h3>
                  <p className="text-[#6B6B5E] max-w-sm mx-auto">
                    Thank you for reaching out to Soilx. Our team will respond within 24–48 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                    className="mt-8 px-6 py-3 bg-[#1B4332] text-[#F7F4EE] font-semibold text-sm rounded-full hover:bg-[#2D6A4F] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2
                    className="text-2xl font-bold text-[#1B4332] mb-2"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    Send Us a Message
                  </h2>
                  <p className="text-sm text-[#6B6B5E] mb-8">
                    Fill in the form below and we&apos;ll get back to you as soon as possible.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name + Phone Row */}
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-[#1B4332] mb-2 tracking-wide uppercase">
                          Full Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Rajinder Singh"
                          className="w-full px-4 py-3 rounded-xl border border-[#1B4332]/15 bg-[#F7F4EE] text-[#1C1C1C] placeholder-[#6B6B5E]/50 focus:outline-none focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/10 transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#1B4332] mb-2 tracking-wide uppercase">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl border border-[#1B4332]/15 bg-[#F7F4EE] text-[#1C1C1C] placeholder-[#6B6B5E]/50 focus:outline-none focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/10 transition-all text-sm"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-[#1B4332] mb-2 tracking-wide uppercase">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-[#1B4332]/15 bg-[#F7F4EE] text-[#1C1C1C] placeholder-[#6B6B5E]/50 focus:outline-none focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/10 transition-all text-sm"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-xs font-semibold text-[#1B4332] mb-2 tracking-wide uppercase">
                        Subject <span className="text-red-400">*</span>
                      </label>
                      <select
                        name="subject"
                        required
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-[#1B4332]/15 bg-[#F7F4EE] text-[#1C1C1C] focus:outline-none focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/10 transition-all text-sm appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Select a subject...</option>
                        {subjects.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-semibold text-[#1B4332] mb-2 tracking-wide uppercase">
                        Your Message <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help you, or describe your partnership opportunity..."
                        className="w-full px-4 py-3 rounded-xl border border-[#1B4332]/15 bg-[#F7F4EE] text-[#1C1C1C] placeholder-[#6B6B5E]/50 focus:outline-none focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/10 transition-all text-sm resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#1B4332] text-[#F7F4EE] font-semibold rounded-xl hover:bg-[#2D6A4F] disabled:opacity-60 transition-all text-sm"
                    >
                      {loading ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-center text-[#6B6B5E]">
                      We respect your privacy. Your information will never be shared with third parties.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MAP PLACEHOLDER ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        <div className="rounded-3xl overflow-hidden h-72 bg-[#EDE8DC] relative flex items-center justify-center border border-[#1B4332]/10">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&q=70&fit=crop"
            alt="Map"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="relative z-10 text-center">
            <div className="w-12 h-12 bg-[#1B4332] rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
              <MapPin className="w-6 h-6 text-[#D4A853]" />
            </div>
            <p
              className="text-[#1B4332] font-bold text-lg"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Soilx Headquarters
            </p>
            <p className="text-[#6B6B5E] text-sm mt-1">Sector 12, Krishi Nagar, Ludhiana, Punjab</p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#F7F4EE] bg-[#1B4332] px-4 py-2 rounded-full hover:bg-[#2D6A4F] transition-colors"
            >
              Open in Google Maps <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}