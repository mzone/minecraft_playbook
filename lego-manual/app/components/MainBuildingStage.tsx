"use client";

import IsometricBlock from "./IsometricBlock";
import { Block } from "../data/steps";

type Props = { blocks: Block[] };

const TILE_W = 64;
const TILE_H = 32;
const ORIGIN_X = 320;
const ORIGIN_Y = 120;

export default function MainBuildingStage({ blocks }: Props) {
  // Sort back-to-front for correct overlap (painter's algorithm)
  const sorted = [...blocks].sort((a, b) => {
    const depthA = a.x + a.y + a.z * 0.1;
    const depthB = b.x + b.y + b.z * 0.1;
    return depthA - depthB;
  });

  return (
    <div className="flex-1 flex items-center justify-center bg-white rounded-2xl shadow-inner border border-gray-100 mx-4 min-h-[340px]">
      <svg width="640" height="400" viewBox="0 0 640 400" className="w-full h-full max-h-[400px]">
        {/* Ground grid hint */}
        <rect x="0" y="0" width="640" height="400" fill="#f8f8f8" />
        {sorted.map((block) => (
          <IsometricBlock
            key={block.id}
            {...block}
            tileW={TILE_W}
            tileH={TILE_H}
            originX={ORIGIN_X}
            originY={ORIGIN_Y}
          />
        ))}
      </svg>
    </div>
  );
}
