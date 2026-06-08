"use client";

import { Part } from "../data/steps";

type Props = { parts: Part[] };

function PartSwatch({ color, label, count }: Part) {
  return (
    <div className="flex flex-col items-center gap-1">
      {/* Block icon (simplified isometric look) */}
      <svg width="48" height="48" viewBox="0 0 48 48">
        {/* top */}
        <polygon points="24,4 44,14 24,24 4,14" fill={color} stroke="#0003" strokeWidth="1" />
        {/* left */}
        <polygon points="4,14 24,24 24,44 4,34" fill={darkenHex(color, 50)} stroke="#0003" strokeWidth="1" />
        {/* right */}
        <polygon points="44,14 24,24 24,44 44,34" fill={darkenHex(color, 30)} stroke="#0003" strokeWidth="1" />
      </svg>
      <span className="text-xs font-black text-gray-700 leading-tight text-center">{label}</span>
      <span className="text-lg font-black text-gray-900">×{count}</span>
    </div>
  );
}

function darkenHex(hex: string, amount: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, (n >> 16) - amount);
  const g = Math.max(0, ((n >> 8) & 0xff) - amount);
  const b = Math.max(0, (n & 0xff) - amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

export default function PartsRequiredBox({ parts }: Props) {
  return (
    <div className="border-4 border-[#FFD400] rounded-2xl bg-white p-3 shadow-md w-fit min-w-[120px]">
      {/* Yellow header bar */}
      <div className="bg-[#FFD400] rounded-lg px-3 py-1 mb-3 text-center">
        <span className="font-black text-sm text-gray-900 tracking-wide">PARTS</span>
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        {parts.map((part, i) => (
          <PartSwatch key={i} {...part} />
        ))}
      </div>
    </div>
  );
}
