"use client";

import { ReactNode } from "react";
import { ChevronDown, ChevronUp, Plus, Trash2, GripVertical } from "lucide-react";

/* ── Section Wrapper ── */
export function EditorSection({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-[#0D1F17] border border-[#2D6A4F]/20 rounded-2xl overflow-hidden mb-5">
      <div className="px-5 py-4 border-b border-[#2D6A4F]/20 bg-[#0F2318]/60">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        {subtitle && <p className="text-xs text-[#52B788]/50 mt-0.5">{subtitle}</p>}
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );
}

/* ── Field ── */
export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#52B788]/60 mb-1.5 tracking-widest uppercase">
        {label}
      </label>
      {children}
      {hint && <p className="text-[10px] text-[#52B788]/30 mt-1">{hint}</p>}
    </div>
  );
}

/* ── Text Input ── */
export function TextInput({
  value,
  onChange,
  placeholder = "",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3.5 py-2.5 bg-[#0A1A10] border border-[#2D6A4F]/25 rounded-lg text-white text-sm placeholder-[#52B788]/25 focus:outline-none focus:border-[#52B788]/50 focus:ring-1 focus:ring-[#52B788]/10 transition-all"
    />
  );
}

/* ── Textarea ── */
export function Textarea({
  value,
  onChange,
  placeholder = "",
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3.5 py-2.5 bg-[#0A1A10] border border-[#2D6A4F]/25 rounded-lg text-white text-sm placeholder-[#52B788]/25 focus:outline-none focus:border-[#52B788]/50 focus:ring-1 focus:ring-[#52B788]/10 transition-all resize-none"
    />
  );
}

/* ── URL Input ── */
export function UrlInput({
  value,
  onChange,
  placeholder = "https://",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#52B788]/30 text-xs">URL</span>
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-3.5 py-2.5 bg-[#0A1A10] border border-[#2D6A4F]/25 rounded-lg text-white text-sm placeholder-[#52B788]/25 focus:outline-none focus:border-[#52B788]/50 transition-all"
      />
    </div>
  );
}

/* ── Two-column Row ── */
export function TwoCol({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>;
}

/* ── Card with remove/handle ── */
export function ItemCard({
  index,
  total,
  onRemove,
  children,
  label,
}: {
  index: number;
  total: number;
  onRemove: () => void;
  children: ReactNode;
  label?: string;
}) {
  return (
    <div className="border border-[#2D6A4F]/20 rounded-xl bg-[#0A1A10] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0F2318]/40 border-b border-[#2D6A4F]/15">
        <div className="flex items-center gap-2">
          <GripVertical className="w-3.5 h-3.5 text-[#52B788]/20" />
          <span className="text-[10px] font-semibold text-[#52B788]/40 uppercase tracking-widest">
            {label ?? `Item ${index + 1}`} / {total}
          </span>
        </div>
        {total > 1 && (
          <button
            onClick={onRemove}
            className="text-red-500/40 hover:text-red-400 transition-colors p-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      <div className="p-4 space-y-3">{children}</div>
    </div>
  );
}

/* ── Add Button ── */
export function AddButton({
  onClick,
  label = "Add Item",
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-[#2D6A4F]/30 rounded-xl text-xs font-semibold text-[#52B788]/50 hover:text-[#52B788] hover:border-[#52B788]/40 hover:bg-[#1B4332]/10 transition-all"
    >
      <Plus className="w-3.5 h-3.5" />
      {label}
    </button>
  );
}

/* ── Page Header ── */
export function EditorPageHeader({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
}) {
  return (
    <div className="flex items-start gap-4 mb-6 pb-5 border-b border-[#2D6A4F]/20">
      <div className="w-10 h-10 bg-[#1B4332] rounded-xl flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-[#D4A853]" />
      </div>
      <div>
        <h2 className="text-base font-bold text-white" style={{ fontFamily: "Georgia, serif" }}>
          {title}
        </h2>
        <p className="text-xs text-[#52B788]/50 mt-0.5">{description}</p>
      </div>
    </div>
  );
}