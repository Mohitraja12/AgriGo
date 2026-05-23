"use client";

import { ReactNode } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";

/* ── Section Wrapper ── */
export function EditorSection({
  title, subtitle, children,
}: {
  title: string; subtitle?: string; children: ReactNode;
}) {
  return (
    <div className="bg-white border border-[#E2EDE6] rounded-2xl overflow-hidden mb-5 shadow-sm">
      <div className="px-5 py-4 border-b border-[#EDF2EF] bg-[#F7FAF8]">
        <h3 className="text-sm font-semibold text-[#1B4332]">{title}</h3>
        {subtitle && <p className="text-xs text-[#6B8F71] mt-0.5">{subtitle}</p>}
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );
}

/* ── Field ── */
export function Field({
  label, hint, children,
}: {
  label: string; hint?: string; children: ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#4A6650] mb-1.5 tracking-widest uppercase">
        {label}
      </label>
      {children}
      {hint && <p className="text-[10px] text-[#A0BEA8] mt-1">{hint}</p>}
    </div>
  );
}

/* ── Text Input ── */
export function TextInput({
  value, onChange, placeholder = "",
}: {
  value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3.5 py-2.5 bg-[#F7FAF8] border border-[#D0E6D8] rounded-lg text-[#1C1C1C] text-sm placeholder-[#A0BEA8] focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/10 transition-all"
    />
  );
}

/* ── Textarea ── */
export function Textarea({
  value, onChange, placeholder = "", rows = 3,
}: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3.5 py-2.5 bg-[#F7FAF8] border border-[#D0E6D8] rounded-lg text-[#1C1C1C] text-sm placeholder-[#A0BEA8] focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/10 transition-all resize-none"
    />
  );
}

/* ── URL Input ── */
export function UrlInput({
  value, onChange, placeholder = "https://",
}: {
  value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div className="relative">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A0BEA8] text-xs font-medium">URL</span>
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-3.5 py-2.5 bg-[#F7FAF8] border border-[#D0E6D8] rounded-lg text-[#1C1C1C] text-sm placeholder-[#A0BEA8] focus:outline-none focus:border-[#2D6A4F] transition-all"
      />
    </div>
  );
}

/* ── Two-column Row ── */
export function TwoCol({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>;
}

/* ── Item Card ── */
export function ItemCard({
  index, total, onRemove, children, label,
}: {
  index: number; total: number; onRemove: () => void; children: ReactNode; label?: string;
}) {
  return (
    <div className="border border-[#E2EDE6] rounded-xl bg-[#F7FAF8] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#EDF5EF] border-b border-[#D8EBE0]">
        <div className="flex items-center gap-2">
          <GripVertical className="w-3.5 h-3.5 text-[#A0BEA8]" />
          <span className="text-[10px] font-semibold text-[#4A6650] uppercase tracking-widest">
            {label ?? `Item ${index + 1}`} / {total}
          </span>
        </div>
        {total > 1 && (
          <button onClick={onRemove} className="text-red-400/60 hover:text-red-500 transition-colors p-1">
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
  onClick, label = "Add Item",
}: {
  onClick: () => void; label?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-[#B7DECA] rounded-xl text-xs font-semibold text-[#6B8F71] hover:text-[#1B4332] hover:border-[#2D6A4F] hover:bg-[#EDF5EF] transition-all"
    >
      <Plus className="w-3.5 h-3.5" />
      {label}
    </button>
  );
}

/* ── Page Header ── */
export function EditorPageHeader({
  title, description, icon: Icon,
}: {
  title: string; description: string; icon: React.ElementType;
}) {
  return (
    <div className="flex items-start gap-4 mb-6 pb-5 border-b border-[#E2EDE6]">
      <div className="w-10 h-10 bg-[#1B4332] rounded-xl flex items-center justify-center shrink-0 shadow-sm">
        <Icon className="w-5 h-5 text-[#D4A853]" />
      </div>
      <div>
        <h2 className="text-base font-bold text-[#1B4332]" style={{ fontFamily: "Georgia, serif" }}>
          {title}
        </h2>
        <p className="text-xs text-[#6B8F71] mt-0.5">{description}</p>
      </div>
    </div>
  );
}