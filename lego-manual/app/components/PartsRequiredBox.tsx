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
  // ラベルの日本語部分だけ表示（英語の括弧部分を除去）
  const jpLabel = label.replace(/\s*\([^)]*\)/g, "");
  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg width="64" height="64" viewBox="0 0 64 64">
        <polygon points="32,6 58,20 32,34 6,20" fill={color} stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
        <polygon points="6,20 32,34 32,58 6,44" fill={darkenHex(color, 55)} stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
        <polygon points="58,20 32,34 32,58 58,44" fill={darkenHex(color, 30)} stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
        <ellipse cx="32" cy="17" rx="7" ry="4" fill={darkenHex(color, 15)} stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
      </svg>
      <span className="text-sm font-black text-gray-700 leading-tight text-center max-w-[72px]">{jpLabel}</span>
      <div className="bg-gray-900 text-white text-xl font-black rounded-full w-10 h-10 flex items-center justify-center leading-none">
        ×{count}
      </div>
    </div>
  );
}

export default function PartsRequiredBox({ parts }: Props) {
  if (parts.length === 0) return null;
  return (
    <div className="border-4 border-[#FFD400] rounded-2xl bg-white shadow-lg overflow-hidden min-w-[110px]">
      <div className="bg-[#FFD400] px-3 py-1.5 text-center">
        <span className="font-black text-sm text-gray-900">ひつようなもの</span>
      </div>
      <div className="flex flex-wrap gap-4 justify-center p-3">
        {parts.map((part, i) => (
          <PartSwatch key={i} {...part} />
        ))}
      </div>
    </div>
  );
}
