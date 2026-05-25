"use client";

import type { CSSProperties } from "react";

type LoadingSkeletonVariant = "home" | "about" | "social-impact" | "gallery" | "contact";

interface LoadingSkeletonProps {
  variant: LoadingSkeletonVariant;
}

function SkeletonBlock({
  className = "",
  tone = "light",
  style,
}: {
  className?: string;
  tone?: "light" | "dark";
  style?: CSSProperties;
}) {
  const baseColor = tone === "dark" ? "rgba(247, 244, 238, 0.14)" : "#EDE8DC";
  const highlightColor = tone === "dark" ? "rgba(247, 244, 238, 0.24)" : "#F7F4EE";

  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundImage: `linear-gradient(90deg, ${baseColor} 0%, ${highlightColor} 50%, ${baseColor} 100%)`,
        backgroundSize: "200% 100%",
        animation: "shimmer 1.6s ease-in-out infinite",
        ...style,
      }}
    />
  );
}

function SectionLabelSkeleton({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <SkeletonBlock tone={tone} className="h-px w-8 rounded-full" />
      <SkeletonBlock tone={tone} className="h-2.5 w-28 rounded-full" />
    </div>
  );
}

export default function LoadingSkeleton({ variant }: LoadingSkeletonProps) {
  if (variant === "home") {
    return (
      <div className="bg-[#F7F4EE] pt-20">
        <section className="relative h-screen min-h-[600px] max-h-[860px] overflow-hidden bg-[#1B4332]">
          <div className="absolute inset-0 bg-[#1B4332]" />
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full pt-20">
              <div className="max-w-2xl">
                <SkeletonBlock tone="dark" className="h-7 w-40 rounded-full mb-5" />
                <SkeletonBlock tone="dark" className="h-20 md:h-28 w-full rounded-3xl mb-4" />
                <SkeletonBlock tone="dark" className="h-20 w-11/12 rounded-3xl mb-3" />
                <SkeletonBlock tone="dark" className="h-6 w-full rounded-full mb-3" />
                <SkeletonBlock tone="dark" className="h-6 w-5/6 rounded-full mb-10" />
                <div className="flex items-center gap-4 flex-wrap">
                  <SkeletonBlock tone="dark" className="h-12 w-44 rounded-full" />
                  <SkeletonBlock tone="dark" className="h-12 w-40 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#1B4332]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="text-center space-y-3">
                <SkeletonBlock tone="dark" className="h-10 w-24 mx-auto rounded-full" />
                <SkeletonBlock tone="dark" className="h-4 w-28 mx-auto rounded-full" />
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-4">
              <SectionLabelSkeleton />
              <SkeletonBlock className="h-14 w-11/12 rounded-3xl" />
              <SkeletonBlock className="h-6 w-full rounded-full" />
              <SkeletonBlock className="h-6 w-5/6 rounded-full" />
              <SkeletonBlock className="h-6 w-4/5 rounded-full mb-4" />
              <SkeletonBlock className="h-6 w-full rounded-full" />
              <SkeletonBlock className="h-6 w-11/12 rounded-full" />
              <SkeletonBlock className="h-6 w-3/4 rounded-full mb-4" />
              <SkeletonBlock className="h-6 w-40 rounded-full" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <SkeletonBlock className="rounded-2xl h-52" />
              <SkeletonBlock className="rounded-2xl h-52" />
              <SkeletonBlock tone="dark" className="col-span-2 rounded-2xl h-28" />
            </div>
          </div>
        </section>

        <section className="bg-[#EDE8DC] py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="text-center mb-14 space-y-4">
              <SectionLabelSkeleton />
              <SkeletonBlock className="h-12 w-80 mx-auto rounded-3xl" />
              <SkeletonBlock className="h-5 w-[32rem] max-w-full mx-auto rounded-full" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-[#F7F4EE] rounded-2xl p-7 border border-[#1B4332]/8 space-y-4">
                  <SkeletonBlock className="w-12 h-12 rounded-xl" />
                  <SkeletonBlock className="h-6 w-2/3 rounded-full" />
                  <SkeletonBlock className="h-4 w-full rounded-full" />
                  <SkeletonBlock className="h-4 w-11/12 rounded-full" />
                  <SkeletonBlock className="h-4 w-3/4 rounded-full" />
                  <SkeletonBlock className="h-4 w-24 rounded-full mt-4" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#F7F4EE]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="bg-[#1B4332] rounded-3xl p-10 md:p-16 overflow-hidden relative">
              <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
                <div className="space-y-4">
                  <SkeletonBlock tone="dark" className="h-4 w-32 rounded-full" />
                  <SkeletonBlock tone="dark" className="h-12 w-11/12 rounded-3xl" />
                </div>
                <div className="space-y-4">
                  <SkeletonBlock tone="dark" className="h-6 w-full rounded-full" />
                  <SkeletonBlock tone="dark" className="h-6 w-5/6 rounded-full" />
                  <div className="flex flex-wrap gap-4 pt-2">
                    <SkeletonBlock tone="dark" className="h-12 w-44 rounded-full" />
                    <SkeletonBlock tone="dark" className="h-12 w-32 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (variant === "about") {
    return (
      <div className="bg-[#F7F4EE] pt-20">
        <section className="bg-[#1B4332] py-24 relative overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 space-y-4">
            <SectionLabelSkeleton tone="dark" />
            <SkeletonBlock tone="dark" className="h-16 w-3/5 rounded-3xl" />
            <SkeletonBlock tone="dark" className="h-6 w-4/5 rounded-full" />
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24 space-y-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-[#1B4332] rounded-3xl p-10 space-y-4">
              <SectionLabelSkeleton tone="dark" />
              <SkeletonBlock tone="dark" className="h-10 w-11/12 rounded-3xl" />
              <SkeletonBlock tone="dark" className="h-5 w-full rounded-full" />
              <SkeletonBlock tone="dark" className="h-5 w-11/12 rounded-full" />
              <div className="grid grid-cols-2 gap-4 pt-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <SkeletonBlock key={index} tone="dark" className="h-5 rounded-full" />
                ))}
              </div>
            </div>
            <div className="bg-[#EDE8DC] rounded-3xl p-8 space-y-4">
              <SectionLabelSkeleton />
              <SkeletonBlock className="h-8 w-4/5 rounded-2xl" />
              <SkeletonBlock className="h-5 w-full rounded-full" />
              <SkeletonBlock className="h-5 w-11/12 rounded-full" />
              <SkeletonBlock className="h-24 w-full rounded-2xl mt-6" />
            </div>
          </div>
          <div>
            <SkeletonBlock className="h-10 w-56 rounded-3xl mb-8" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="p-6 bg-white rounded-2xl border border-[#1B4332]/8 space-y-4">
                  <SkeletonBlock className="h-10 w-10 rounded-xl" />
                  <SkeletonBlock className="h-5 w-2/3 rounded-full" />
                  <SkeletonBlock className="h-4 w-full rounded-full" />
                  <SkeletonBlock className="h-4 w-11/12 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#EDE8DC] py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-8">
            <SkeletonBlock className="h-10 w-48 rounded-3xl" />
            <div className="space-y-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex items-start gap-8">
                  <SkeletonBlock className="h-8 w-20 rounded-full hidden md:block" />
                  <SkeletonBlock className="h-3.5 w-3.5 rounded-full hidden md:block" />
                  <SkeletonBlock className="flex-1 h-20 rounded-2xl" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24 space-y-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="space-y-4">
              <SectionLabelSkeleton />
              <SkeletonBlock className="h-10 w-80 rounded-3xl" />
            </div>
            <SkeletonBlock className="h-10 w-36 rounded-full" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="group space-y-4">
                <SkeletonBlock className="rounded-2xl aspect-[4/3]" />
                <SkeletonBlock className="h-6 w-2/3 rounded-full" />
                <SkeletonBlock className="h-4 w-1/2 rounded-full" />
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#EDE8DC] py-16">
          <div className="max-w-3xl mx-auto px-6 text-center space-y-4">
            <SkeletonBlock className="h-10 w-10 mx-auto rounded-full" />
            <SkeletonBlock className="h-10 w-3/4 mx-auto rounded-3xl" />
            <SkeletonBlock className="h-5 w-full rounded-full" />
            <SkeletonBlock className="h-5 w-2/3 mx-auto rounded-full" />
            <div className="flex gap-4 justify-center flex-wrap pt-2">
              <SkeletonBlock className="h-12 w-36 rounded-full" />
              <SkeletonBlock className="h-12 w-32 rounded-full" />
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (variant === "social-impact") {
    return (
      <div className="bg-[#F7F4EE] pt-20">
        <section className="bg-[#1B4332] py-24 relative overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 space-y-4">
            <SectionLabelSkeleton tone="dark" />
            <SkeletonBlock tone="dark" className="h-16 w-3/5 rounded-3xl" />
            <SkeletonBlock tone="dark" className="h-6 w-4/5 rounded-full" />
          </div>
        </section>

        <section className="py-16 bg-[#EDE8DC]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center border border-[#1B4332]/8 space-y-4">
                <SkeletonBlock className="w-12 h-12 mx-auto rounded-xl" />
                <SkeletonBlock className="h-10 w-24 mx-auto rounded-full" />
                <SkeletonBlock className="h-4 w-28 mx-auto rounded-full" />
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24 space-y-16">
          <div className="text-center space-y-4">
            <SectionLabelSkeleton />
            <SkeletonBlock className="h-12 w-80 mx-auto rounded-3xl" />
            <SkeletonBlock className="h-5 w-[32rem] max-w-full mx-auto rounded-full" />
          </div>
          <div className="space-y-16">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="grid lg:grid-cols-2 gap-10 items-center">
                <SkeletonBlock className="rounded-3xl aspect-video" />
                <div className="space-y-4">
                  <SkeletonBlock className="h-10 w-40 rounded-full" />
                  <SkeletonBlock className="h-7 w-3/4 rounded-full" />
                  <SkeletonBlock className="h-5 w-full rounded-full" />
                  <SkeletonBlock className="h-5 w-11/12 rounded-full" />
                  <SkeletonBlock className="h-5 w-5/6 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#1B4332] py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center space-y-4">
            <SkeletonBlock tone="dark" className="h-12 w-3/4 mx-auto rounded-3xl" />
            <SkeletonBlock tone="dark" className="h-5 w-2/3 mx-auto rounded-full" />
            <SkeletonBlock tone="dark" className="h-5 w-2/5 mx-auto rounded-full" />
          </div>
        </section>

        <section className="py-16 bg-[#EDE8DC]">
          <div className="max-w-3xl mx-auto text-center px-6 space-y-4">
            <SkeletonBlock className="h-10 w-10 mx-auto rounded-full" />
            <SkeletonBlock className="h-10 w-3/4 mx-auto rounded-3xl" />
            <SkeletonBlock className="h-5 w-full rounded-full" />
            <SkeletonBlock className="h-12 w-48 mx-auto rounded-full mt-4" />
          </div>
        </section>
      </div>
    );
  }

  if (variant === "gallery") {
    return (
      <div className="bg-[#F7F4EE] pt-20">
        <section className="bg-[#1B4332] py-20 relative overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 space-y-4">
            <SectionLabelSkeleton tone="dark" />
            <SkeletonBlock tone="dark" className="h-16 w-3/5 rounded-3xl" />
            <SkeletonBlock tone="dark" className="h-6 w-4/5 rounded-full" />
          </div>
        </section>

        <div className="sticky top-[72px] z-30 bg-[#F7F4EE]/90 backdrop-blur border-b border-[#1B4332]/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <SkeletonBlock className="h-4 w-4 rounded-full shrink-0 mr-1" />
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonBlock key={index} className="h-9 w-24 rounded-full shrink-0" />
            ))}
            <SkeletonBlock className="h-4 w-20 rounded-full ml-auto shrink-0" />
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, index) => (
              <SkeletonBlock key={index} className="rounded-2xl aspect-[4/3]" />
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F4EE] pt-20">
      <section className="bg-[#1B4332] py-20 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 space-y-4">
          <SectionLabelSkeleton tone="dark" />
          <SkeletonBlock tone="dark" className="h-16 w-3/5 rounded-3xl" />
          <SkeletonBlock tone="dark" className="h-6 w-4/5 rounded-full" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <SkeletonBlock className="h-8 w-40 rounded-3xl mb-6" />
              <div className="space-y-5">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 border border-[#1B4332]/10 space-y-4">
                    <SkeletonBlock className="h-6 w-44 rounded-full" />
                    <div className="space-y-3">
                      <SkeletonBlock className="h-4 w-full rounded-full" />
                      <SkeletonBlock className="h-4 w-11/12 rounded-full" />
                      <SkeletonBlock className="h-4 w-3/4 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SkeletonBlock className="h-7 w-48 rounded-3xl mb-4" />
              <div className="bg-[#EDE8DC] rounded-2xl p-5 space-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex items-center justify-between gap-4">
                    <SkeletonBlock className="h-4 w-32 rounded-full" />
                    <SkeletonBlock className="h-4 w-24 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SkeletonBlock className="h-7 w-40 rounded-3xl mb-4" />
              <div className="flex gap-3 flex-wrap">
                {Array.from({ length: 4 }).map((_, index) => (
                  <SkeletonBlock key={index} className="h-10 w-24 rounded-xl" />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#1B4332]/10 shadow-sm space-y-5">
              <SkeletonBlock className="h-8 w-56 rounded-3xl" />
              <SkeletonBlock className="h-5 w-80 max-w-full rounded-full" />
              <div className="space-y-5 pt-3">
                <div className="grid md:grid-cols-2 gap-5">
                  <SkeletonBlock className="h-14 rounded-xl" />
                  <SkeletonBlock className="h-14 rounded-xl" />
                </div>
                <SkeletonBlock className="h-14 rounded-xl" />
                <SkeletonBlock className="h-14 rounded-xl" />
                <SkeletonBlock className="h-32 rounded-xl" />
                <SkeletonBlock className="h-12 w-40 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}