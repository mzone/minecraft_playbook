"use client";

import { CraftingRecipe } from "../data/steps";

type Props = { recipes: CraftingRecipe[] };

function darkenHex(hex: string, amount: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, (n >> 16) - amount);
  const g = Math.max(0, ((n >> 8) & 0xff) - amount);
  const b = Math.max(0, (n & 0xff) - amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

/** Mini isometric block icon */
function BlockIcon({ color, size = 36 }: { color: string; size?: number }) {
  const h = size;
  const w = size;
  return (
    <svg width={w} height={h} viewBox="0 0 48 48">
      <polygon points="24,4 44,16 24,28 4,16"   fill={color}              stroke="rgba(0,0,0,.2)" strokeWidth="1.5" />
      <polygon points="4,16 24,28 24,48 4,36"   fill={darkenHex(color,55)} stroke="rgba(0,0,0,.2)" strokeWidth="1.5" />
      <polygon points="44,16 24,28 24,48 44,36" fill={darkenHex(color,30)} stroke="rgba(0,0,0,.2)" strokeWidth="1.5" />
      <ellipse cx="24" cy="14" rx="6" ry="3.5"  fill={darkenHex(color,15)} stroke="rgba(0,0,0,.15)" strokeWidth="1" />
    </svg>
  );
}

/** One crafting slot */
function CraftSlot({
  color, label, empty,
}: {
  color?: string | null;
  label?: string | null;
  empty?: boolean;
}) {
  return (
    <div
      className={`
        flex flex-col items-center justify-center rounded-md border-2
        ${empty || !color
          ? "border-gray-300 bg-gray-100"
          : "border-gray-400 bg-[#8B8B6B]"}
        w-10 h-10
      `}
    >
      {color && (
        <>
          <BlockIcon color={color} size={28} />
          {label && (
            <span className="text-[7px] font-black text-white leading-none mt-0.5 drop-shadow">
              {label}
            </span>
          )}
        </>
      )}
    </div>
  );
}

function Recipe({ recipe }: { recipe: CraftingRecipe }) {
  const { grid, gridLabel, gridSize, output, tableRequired } = recipe;

  return (
    <div className="flex items-center gap-3 bg-[#C6C6A6] border-2 border-[#888855] rounded-xl p-2 shadow-inner">
      {/* Table badge */}
      {tableRequired && (
        <div className="flex flex-col items-center gap-0.5 mr-1">
          <BlockIcon color="#A0522D" size={28} />
          <span className="text-[7px] font-black text-gray-700">ひつよう</span>
        </div>
      )}

      {/* Crafting grid */}
      <div
        className="grid gap-0.5"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 2.5rem)` }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <CraftSlot
              key={`${r}-${c}`}
              color={cell}
              label={gridLabel[r][c]}
              empty={!cell}
            />
          ))
        )}
      </div>

      {/* Arrow */}
      <div className="flex flex-col items-center gap-0.5 px-1">
        <span className="text-[#FFD400] text-2xl font-black drop-shadow leading-none">▶</span>
      </div>

      {/* Output */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex flex-col items-center justify-center rounded-md border-2 border-gray-400 bg-[#8B8B6B] w-12 h-12 relative">
          <BlockIcon color={output.color} size={36} />
          <span className="absolute bottom-0.5 right-1 text-[9px] font-black text-white drop-shadow leading-none">
            ×{output.count}
          </span>
        </div>
        <span className="text-[8px] font-black text-gray-700 text-center leading-tight max-w-[52px]">
          {output.label}
        </span>
      </div>
    </div>
  );
}

export default function CraftingRecipeBox({ recipes }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center gap-1.5">
        <div className="h-0.5 flex-1 bg-[#FFD400]" />
        <span className="text-[10px] font-black text-gray-500 tracking-widest">つくりかた</span>
        <div className="h-0.5 flex-1 bg-[#FFD400]" />
      </div>

      {/* Recipe cards */}
      <div className="flex flex-wrap gap-2">
        {recipes.map((r, i) => <Recipe key={i} recipe={r} />)}
      </div>
    </div>
  );
}
