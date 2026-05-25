"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTERS — each defines a zoom target on the image
// zoom.scale : how much to zoom in
// zoom.x     : horizontal pan (% of image) — positive = pan left, negative = pan right
// zoom.y     : vertical pan   (% of image) — positive = pan up,   negative = pan down
// textPosition: where the text overlay sits
// ─────────────────────────────────────────────────────────────────────────────
const chapters = [
  {
    id: "intro",
    label: "",
    title: "All in One — in All",
    subtitle: "Sacred Tantra Yoga",
    body: "Before words, before form, before the first breath — there was awareness. Not empty. Radiant. Scroll to enter the teaching.",
    detail: "",
    accent: "#e8dcc8",
    zoom: { scale: 1, x: 0, y: 0 },
    textPosition: "center",
  },
  {
    id: "crown",
    label: "Sahasrara · Crown Chakra",
    title: "The Thousand-Petalled Flame",
    subtitle: "Where consciousness dissolves into itself",
    body: "At the very crown, golden forms spiral outward like burning petals — or wings — or both. This is Sahasrara, the thousandth lotus, where individual awareness opens into the limitless.",
    detail: "In Sacred Tantra, the crown is not a destination you travel to. It is the sky you already are. Every thought, every sensation, every moment of joy or grief arises inside this vast open awareness — and dissolves back into it. The scattered golden forms are not fragments. They are the cosmos recognising its own wholeness.",
    accent: "#f5c842",
    zoom: { scale: 3.2, x: 0, y: 30 },
    textPosition: "bottom-left",
  },
  {
    id: "goldwings",
    label: "Prana · Life Force",
    title: "The Wings of Living Breath",
    subtitle: "Energy that moves before thought",
    body: "The golden wing-like forms erupting from the crown are prana — the animating intelligence that breathes you without your permission, beats your heart without a command.",
    detail: "Tantra teaches that prana is not something you have. It is something you are. Every inhale draws the universe inward. Every exhale offers the self back to the whole. The practice is not to control the breath — it is to become so intimate with it that the one who breathes and the breath itself are recognised as one movement.",
    accent: "#ffd166",
    zoom: { scale: 4.0, x: 1, y: 34 },
    textPosition: "bottom-right",
  },
  {
    id: "lotus",
    label: "Ajna · Third Eye",
    title: "The Blazing Lotus",
    subtitle: "Vision that sees the seer",
    body: "The orange lotus ignites at the brow centre. Ajna — the command chakra — is the seat where intuition and intellect finally stop arguing and listen to each other.",
    detail: "Most eyes look outward at the world. The third eye looks at the one who is looking. Sacred Tantra does not ask you to abandon the senses — it invites you to trace sensation back to its source. What is it that knows? What is it that sees? Follow that question inward and you arrive, without effort, at the blazing lotus. The fire does not consume you. It is you.",
    accent: "#ff8c42",
    zoom: { scale: 3.8, x: 0, y: 20 },
    textPosition: "bottom-left",
  },
  {
    id: "face",
    label: "Chitta · Pure Witnessing",
    title: "The Face That Was Never Born",
    subtitle: "The witness behind all experience",
    body: "Two calm eyes look outward from the centre of the cosmos. This face does not belong to a person. It belongs to the awareness in which all persons — all worlds — appear and dissolve.",
    detail: "In the Tantric vision, the face is a mirror held up to the infinite. When you look at these eyes, something in you recognises itself. Not your name, not your history — something older. This is Chitta: the luminous field of pure witnessing that has never been born and will never die. The serenity you feel is not imagined. It is your own nature, seen clearly.",
    accent: "#a8d8ea",
    zoom: { scale: 3.5, x: 0, y: 6 },
    textPosition: "bottom-right",
  },
  {
    id: "thirdeye-mark",
    label: "Bindu · The Sacred Point",
    title: "The Mark Between the Worlds",
    subtitle: "Where matter meets spirit",
    body: "The geometric mark at the brow — intricate, mandala-like — is the bindu. In Sanskrit, bindu means point, drop, seed. It is the smallest possible thing. It contains everything.",
    detail: "From the bindu, the entire manifest universe is said to have poured forth, the way an ocean pours from a single drop — which makes no logical sense and is therefore perfectly true. Sacred Tantra places the bindu at the third eye because this is where the personal self and the infinite self touch. Not merge. Touch. The boundary is part of the beauty.",
    accent: "#c9b8ff",
    zoom: { scale: 5.0, x: 0, y: 8 },
    textPosition: "bottom-left",
  },
  {
    id: "energylines",
    label: "Nāḍī · Energy Channels",
    title: "The Luminous Web",
    subtitle: "72,000 rivers of consciousness",
    body: "Turquoise filaments trace the nāḍīs — rivers of pranic energy that weave through the subtle body. Ancient Tantra maps 72,000 of them threading through every cell of your being.",
    detail: "Three are primary: Ida on the left — cool, lunar, receptive. Pingala on the right — warm, solar, active. And Sushumna, the central channel rising from the base of the spine to the crown, the royal road of awakening. When kundalini energy rises through Sushumna, it illuminates each chakra like a lamp lit from within. The web you see here is not metaphor. Yogis have charted it for five thousand years.",
    accent: "#3ecfb2",
    zoom: { scale: 2.6, x: 5, y: -4 },
    textPosition: "bottom-right",
  },
  {
    id: "tiger",
    label: "Shakti · Divine Power",
    title: "The Tiger in the Field",
    subtitle: "Power without aggression",
    body: "A tiger rests within the cosmic field — not hunting, not caged. Present. Alive. Unhurried. In Tantra, the tiger is Shakti: the raw, creative power of the universe wearing a body.",
    detail: "Shakti is not something separate from you that you invoke. She is the force by which your heart beats, the intelligence by which cells know what to become, the fire behind every desire. The tiger does not apologise for its nature. Sacred Tantra asks the same of you: to embody your full power — not to tame it into smallness, not to unleash it into destruction, but to let it move with the natural grace it was born with.",
    accent: "#ff6b35",
    zoom: { scale: 3.8, x: -10, y: -10 },
    textPosition: "bottom-left",
  },
  {
    id: "cosmos",
    label: "Brahmāṇḍa · The Cosmic Egg",
    title: "Planets in the Palm of Being",
    subtitle: "The universe as a single body",
    body: "Spheres of blue and teal float in the field like thoughts in an open mind. These are not decorations. They are the teaching: every world is held inside awareness, the way dreams are held inside a sleeping mind.",
    detail: "Brahmāṇḍa — the cosmic egg — is the Tantric understanding that the universe is a single, living, self-aware body. You are not a small being inside a vast universe. You are the vast universe, temporarily experiencing itself as a small being. The satellite, the planet, the tiger, the fish, the serpent: all arising in the same field, all made of the same luminous substance. All in One. One in All.",
    accent: "#4a9eff",
    zoom: { scale: 2.2, x: 4, y: -8 },
    textPosition: "bottom-right",
  },
  {
    id: "fish",
    label: "Jala · The Water Element",
    title: "Creatures of the Dreaming Deep",
    subtitle: "The unconscious as sacred territory",
    body: "Below the face, in the deep teal sphere, fish and serpent move through an underwater world. In Tantra, water is the element of the unconscious — the vast dreaming intelligence beneath waking thought.",
    detail: "The Tantric path does not fear the depths. It dives into them. Where other traditions ask you to rise above the body, above desire, above the animal — Tantra asks you to go deeper in. The fish knows the water completely, without needing to understand it. The serpent moves with the current, not against it. This is Tantric wisdom: not transcendence of the body, but intimacy with it so complete that the sacred is found in the very place it was sought elsewhere.",
    accent: "#06d6a0",
    zoom: { scale: 3.4, x: 2, y: -30 },
    textPosition: "top-right",
  },
  {
    id: "earthsphere",
    label: "Mūlādhāra · The Root",
    title: "The Living Earth Sphere",
    subtitle: "Where the sacred meets the ground",
    body: "At the base, the earth sphere glows — the full abundance of life gathered into one luminous orb. Mūlādhāra is not where the spiritual journey begins. It is where it has always been happening.",
    detail: "Western spirituality often places the sacred above — in the sky, in abstraction, beyond the body. Tantra turns this on its head. The root is the foundation. The body is the temple. The earth is not something to transcend — it is the form the infinite chose, specifically and deliberately, to know itself through sensation, through breath, through the remarkable fact of having a body at all. Stand on the earth. Feel your feet. This is a spiritual act.",
    accent: "#2ec4b6",
    zoom: { scale: 2.8, x: 0, y: -28 },
    textPosition: "top-left",
  },
  {
    id: "union",
    label: "Yoga · The Great Union",
    title: "All in One — One in All",
    subtitle: "The end is the beginning",
    body: "Pull back. See the whole. The crown fire and the earth sphere are one column of light. The eyes and the cosmos are one seeing. The tiger and the fish breathe the same air between worlds.",
    detail: "Sacred Tantra Yoga is not a technique. It is a recognition — sudden, total, and always available. The wave does not need to travel to reach the ocean. It already is the ocean, moving. You have never been separate from what you seek. This image was always the whole teaching. You just needed to scroll all the way through yourself to arrive at what was never absent.",
    accent: "#c084fc",
    zoom: { scale: 1.1, x: 0, y: 0 },
    textPosition: "center",
  },
];

// ─── Easing ───────────────────────────────────────────────────────────────────
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function ScrollyTantraPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const accentGlowRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const detailRef = useRef<HTMLParagraphElement>(null);
  const textWrapRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Current animated state (not React state — lives in a ref for RAF)
  const animState = useRef({ scale: 1, x: 0, y: 0, accent: "#e8dcc8", chapterIndex: 0 });
  const targetState = useRef({ scale: 1, x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const scrollRef = useRef(0);

  // Text chapter (updated less frequently to avoid re-render lag)
  const [visibleChapter, setVisibleChapter] = useState(0);
  const [textOpacity, setTextOpacity] = useState(1);
  const lastTextChapter = useRef(0);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  // ── RAF animation loop ────────────────────────────────────────────────────
  function animate() {
    const s = animState.current;
    const tgt = targetState.current;

    // Smooth lerp — 0.06 = slightly slow/cinematic, raise to 0.1 for snappier
    const factor = 0.055;
    s.scale = lerp(s.scale, tgt.scale, factor);
    s.x     = lerp(s.x,     tgt.x,     factor);
    s.y     = lerp(s.y,     tgt.y,     factor);

    // Apply to image — GPU composited, no layout thrashing
    if (imgRef.current) {
      imgRef.current.style.transform = `scale(${s.scale}) translate(${s.x}%, ${s.y}%)`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  // ── Scroll handler ────────────────────────────────────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollTop = el.scrollTop;
      const totalHeight = el.scrollHeight - el.clientHeight;
      const globalProgress = scrollTop / totalHeight; // 0..1

      // Update progress bar (direct DOM — no React re-render)
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${globalProgress * 100}%`;
      }

      const numChapters = chapters.length;
      const sliceSize = 1 / numChapters;
      const rawIndex = globalProgress / sliceSize;
      const index = Math.min(Math.floor(rawIndex), numChapters - 1);
      const within = rawIndex - index; // 0..1 within chapter

      const eased = easeInOutCubic(Math.max(0, Math.min(1, within)));
      const nextIndex = Math.min(index + 1, numChapters - 1);
      const cur = chapters[index];
      const nxt = chapters[nextIndex];

      // Update target zoom
      targetState.current = {
        scale: lerp(cur.zoom.scale, nxt.zoom.scale, eased),
        x:     lerp(cur.zoom.x,     nxt.zoom.x,     eased),
        y:     lerp(cur.zoom.y,     nxt.zoom.y,     eased),
      };

      // Glow colour
      if (accentGlowRef.current) {
        accentGlowRef.current.style.background =
          `radial-gradient(ellipse 55% 55% at 50% 50%, ${cur.accent}18 0%, transparent 65%)`;
      }

      // Progress bar colour
      if (progressBarRef.current) {
        progressBarRef.current.style.background =
          `linear-gradient(90deg, ${cur.accent}, #c084fc)`;
      }

      // Dot nav
      dotsRef.current.forEach((dot, i) => {
        if (!dot) return;
        dot.style.width  = i === index ? "8px" : "5px";
        dot.style.height = i === index ? "8px" : "5px";
        dot.style.background =
          i === index ? chapters[i].accent : "rgba(255,255,255,0.2)";
        dot.style.boxShadow =
          i === index ? `0 0 8px ${chapters[i].accent}` : "none";
      });

      // Scroll hint
      if (scrollHintRef.current) {
        scrollHintRef.current.style.opacity =
          String(Math.max(0, 1 - within * 4));
      }

      // ── Text: fade out old, swap content, fade in new ──
      // Text opacity: sin curve — full at 0.15..0.85, fades at edges
      const tOpacity = index === 0
        ? Math.min(1, within * 5)
        : within > 0.85
        ? Math.max(0, 1 - (within - 0.85) / 0.15)
        : within < 0.15
        ? Math.min(1, within / 0.15)
        : 1;

      if (textWrapRef.current) {
        textWrapRef.current.style.opacity = String(tOpacity);
      }

      // Update text content when chapter changes
      if (index !== lastTextChapter.current) {
        lastTextChapter.current = index;
        const c = chapters[index];

        if (labelRef.current)    labelRef.current.textContent    = c.label;
        if (titleRef.current)    titleRef.current.textContent    = c.title;
        if (subtitleRef.current) subtitleRef.current.textContent = c.subtitle;
        if (bodyRef.current)     bodyRef.current.textContent     = c.body;
        if (detailRef.current)   detailRef.current.textContent   = c.detail;

        if (labelRef.current)    labelRef.current.style.color    = c.accent;
        if (subtitleRef.current) subtitleRef.current.style.color = c.accent;

        // Reposition text wrap
        applyTextPosition(textWrapRef.current, c.textPosition);
      }
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  function applyTextPosition(el: HTMLDivElement | null, pos: string) {
    if (!el) return;
    // Reset
    el.style.top = "auto";
    el.style.bottom = "auto";
    el.style.left = "auto";
    el.style.right = "auto";
    el.style.transform = "none";
    el.style.textAlign = "left";
    el.style.maxWidth = "500px";

    switch (pos) {
      case "center":
        el.style.top = "50%";
        el.style.left = "50%";
        el.style.transform = "translate(-50%, -50%)";
        el.style.textAlign = "center";
        el.style.maxWidth = "580px";
        break;
      case "bottom-left":
        el.style.bottom = "8vh";
        el.style.left = "4vw";
        break;
      case "bottom-right":
        el.style.bottom = "8vh";
        el.style.right = "4vw";
        el.style.textAlign = "right";
        break;
      case "top-left":
        el.style.top = "12vh";
        el.style.left = "4vw";
        break;
      case "top-right":
        el.style.top = "12vh";
        el.style.right = "4vw";
        el.style.textAlign = "right";
        break;
    }
  }

  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh",
        overflowY: "scroll",
        overflowX: "hidden",
        background: "#030810",
      }}
    >
      {/* Tall scroll canvas — 1 chapter per 100vh */}
      <div style={{ height: `${chapters.length * 100}vh`, position: "relative" }}>

        {/* ══════════════════════════════════════════════
            STICKY FRAME
        ══════════════════════════════════════════════ */}
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
          }}
        >
          {/* THE IMAGE — will-change tells GPU to composite this layer */}
          <img
            ref={imgRef}
            src="/All-in-One-in-All.png"
            alt="All in One in All — Sacred Tantra Yoga"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              willChange: "transform",    // KEY: GPU layer
              transformOrigin: "center center",
              // NO CSS transition here — RAF lerp handles smoothness
              filter: "brightness(0.88)",
              zIndex: 1,
            }}
          />

          {/* Vignette */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 72% 72% at 50% 50%, transparent 35%, rgba(3,8,16,0.88) 100%)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />

          {/* Bottom gradient — text readability */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "45vh",
              background:
                "linear-gradient(to top, rgba(3,8,16,0.95) 0%, rgba(3,8,16,0.5) 50%, transparent 100%)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />

          {/* Accent glow */}
          <div
            ref={accentGlowRef}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              pointerEvents: "none",
              willChange: "background",
            }}
          />

          {/* ── Chapter label top-center ── */}
          <div
            style={{
              position: "absolute",
              top: "1.75rem",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
              textAlign: "center",
            }}
          >
            <p
              ref={labelRef}
              style={{
                fontSize: "0.62rem",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: chapters[0].accent,
                margin: 0,
                fontFamily: "Georgia, serif",
              }}
            >
              {chapters[0].label}
            </p>
          </div>

          {/* ── Main text block ── */}
          <div
            ref={textWrapRef}
            style={{
              position: "absolute",
              zIndex: 10,
              // Initial position — will be set by applyTextPosition
              bottom: "8vh",
              left: "4vw",
              maxWidth: "500px",
              willChange: "opacity",
            }}
          >
            <p
              ref={subtitleRef}
              style={{
                fontSize: "0.62rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: chapters[0].accent,
                margin: "0 0 0.6rem 0",
                fontFamily: "Georgia, serif",
              }}
            >
              {chapters[0].subtitle}
            </p>

            <div
              style={{
                width: "32px",
                height: "1px",
                background: "currentColor",
                color: chapters[0].accent,
                marginBottom: "1rem",
                opacity: 0.6,
              }}
            />

            <h2
              ref={titleRef}
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(1.5rem, 2.8vw, 2.3rem)",
                fontWeight: 400,
                color: "#f0e8d0",
                margin: "0 0 1rem 0",
                lineHeight: 1.2,
                letterSpacing: "0.04em",
                textShadow: "0 2px 30px rgba(0,0,0,0.85)",
              }}
            >
              {chapters[0].title}
            </h2>

            <p
              ref={bodyRef}
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(0.9rem, 1.3vw, 1.02rem)",
                lineHeight: 1.85,
                color: "rgba(240,232,208,0.82)",
                margin: "0 0 1rem 0",
                textShadow: "0 1px 16px rgba(0,0,0,0.95)",
              }}
            >
              {chapters[0].body}
            </p>

            <p
              ref={detailRef}
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(0.8rem, 1.1vw, 0.9rem)",
                lineHeight: 1.9,
                color: "rgba(240,232,208,0.52)",
                margin: 0,
                textShadow: "0 1px 16px rgba(0,0,0,0.95)",
              }}
            >
              {chapters[0].detail}
            </p>
          </div>

          {/* ── Scroll hint ── */}
          <div
            ref={scrollHintRef}
            style={{
              position: "absolute",
              bottom: "2.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <p
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "0.6rem",
                letterSpacing: "0.3em",
                color: "rgba(240,232,208,0.4)",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              scroll
            </p>
            <div
              style={{
                width: "1px",
                height: "36px",
                background:
                  "linear-gradient(to bottom, rgba(240,232,208,0.35), transparent)",
                animation: "scrollPulse 1.8s ease-in-out infinite",
              }}
            />
          </div>

          {/* ── Dot nav ── */}
          <nav
            style={{
              position: "absolute",
              right: "1.4rem",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              gap: "0.55rem",
            }}
          >
            {chapters.map((c, i) => (
              <div
                key={c.id}
                ref={(el) => { dotsRef.current[i] = el; }}
                title={c.label || c.title}
                onClick={() => {
                  const el = containerRef.current;
                  if (!el) return;
                  const total = el.scrollHeight - el.clientHeight;
                  el.scrollTo({ top: (i / chapters.length) * total + 8, behavior: "smooth" });
                }}
                style={{
                  width: i === 0 ? "8px" : "5px",
                  height: i === 0 ? "8px" : "5px",
                  borderRadius: "50%",
                  background: i === 0 ? chapters[0].accent : "rgba(255,255,255,0.2)",
                  cursor: "pointer",
                  transition: "width 0.3s, height 0.3s, background 0.3s, box-shadow 0.3s",
                  willChange: "transform",
                }}
              />
            ))}
          </nav>

          {/* ── Progress bar ── */}
          <div
            ref={progressBarRef}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              height: "2px",
              width: "0%",
              background: `linear-gradient(90deg, ${chapters[0].accent}, #c084fc)`,
              zIndex: 10,
              willChange: "width",
            }}
          />

          {/* ── Chapter counter ── */}
          <div
            style={{
              position: "absolute",
              bottom: "1.2rem",
              right: "1.5rem",
              zIndex: 10,
              fontFamily: "Georgia, serif",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              color: "rgba(240,232,208,0.3)",
            }}
          >
            {String(visibleChapter + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 1; }
          49%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
          50%  { transform: scaleY(1); transform-origin: bottom; opacity: 1; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        html { scroll-behavior: auto; }
      `}</style>
    </div>
  );
}