"use client";

import { Part } from "../data/steps";

type Props = { parts: Part[] };

function darkenHex(hex: string, amount: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, (n >> 16) - amount);
  const g = Math.max(0, ((n >> 8) & 0xff) - amount);
  const b = Math.max(0, (n & 0xff) - amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

function PartSwatch({ color, label, count }: Part) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      {/* Large isometric block icon */}
      <svg width="64" height="64" viewBox="0 0 64 64">
        {/* top face */}
        <polygon points="32,6 58,20 32,34 6,20" fill={color} stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
        {/* left face */}
        <polygon points="6,20 32,34 32,58 6,44" fill={darkenHex(color, 55)} stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
        {/* right face */}
        <polygon points="58,20 32,34 32,58 58,44" fill={darkenHex(color, 30)} stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
        {/* Stud on top */}
        <ellipse cx="32" cy="17" rx="7" ry="4" fill={darkenHex(color, 15)} stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
      </svg>
      <span className="text-[11px] font-black text-gray-600 leading-tight text-center">{label}</span>
      <div className="bg-gray-900 text-white text-base font-black rounded-full w-9 h-9 flex items-center justify-center leading-none">
        ×{count}
      </div>
    </div>
  );
}

export default function PartsRequiredBox({ parts }: Props) {
  return (
    <div className="border-4 border-[#FFD400] rounded-2xl bg-white shadow-lg overflow-hidden min-w-[110px]">
      {/* Yellow header */}
      <div className="bg-[#FFD400] px-3 py-1.5 text-center">
        <span className="font-black text-[11px] text-gray-900 tracking-widest">PARTS</span>
      </div>
      <div className="flex flex-wrap gap-4 justify-center p-3">
        {parts.map((part, i) => (
          <PartSwatch key={i} {...part} />
        ))}
      </div>
    </div>
  );
}
