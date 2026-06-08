"use client";

import IsometricBlock, { isoProject } from "./IsometricBlock";
import { Block } from "../data/steps";

type Props = { blocks: Block[]; label: string; cameraOffset?: { x: number; y: number } };

const TILE_W = 80;
const TILE_H = 40;
const ORIGIN_X = 320;
const ORIGIN_Y = 160;
const GRID_SIZE = 5; // ground grid extends 5 units each way

function GroundGrid({ originX, originY }: { originX: number; originY: number }) {
  const lines: React.ReactElement[] = [];
  const gridColor = "#dde8cc";

  for (let i = 0; i <= GRID_SIZE; i++) {
    const a = isoProject(0, i, 0, TILE_W, TILE_H, originX, originY);
    const b = isoProject(GRID_SIZE, i, 0, TILE_W, TILE_H, originX, originY);
    lines.push(<line key={`rx${i}`} x1={a.sx} y1={a.sy} x2={b.sx} y2={b.sy} stroke={gridColor} strokeWidth={1} />);

    const c = isoProject(i, 0, 0, TILE_W, TILE_H, originX, originY);
    const d = isoProject(i, GRID_SIZE, 0, TILE_W, TILE_H, originX, originY);
    lines.push(<line key={`ry${i}`} x1={c.sx} y1={c.sy} x2={d.sx} y2={d.sy} stroke={gridColor} strokeWidth={1} />);
  }
  return <g>{lines}</g>;
}

function GroupArrow({ blocks, originX, originY }: { blocks: Block[]; originX: number; originY: number }) {
  const newBlocks = blocks.filter((b) => b.isNew);
  if (newBlocks.length === 0) return null;

  const cx = newBlocks.reduce((s, b) => s + b.x, 0) / newBlocks.length + 0.5;
  const cy = newBlocks.reduce((s, b) => s + b.y, 0) / newBlocks.length + 0.5;
  const cz = Math.max(...newBlocks.map((b) => b.z)) + 1;

  const { sx, sy } = isoProject(cx, cy, cz, TILE_W, TILE_H, originX, originY);
  const arrowLen = TILE_H * 1.2;
  const headSize = TILE_H * 0.5;

  return (
    <g>
      {/* Shaft */}
      <line
        x1={sx} y1={sy - arrowLen - headSize}
        x2={sx} y2={sy - headSize}
        stroke="#FFD400" strokeWidth={4} strokeLinecap="round"
      />
      {/* Head */}
      <polygon
        points={`${sx},${sy} ${sx - headSize * 0.6},${sy - headSize} ${sx + headSize * 0.6},${sy - headSize}`}
        fill="#FFD400"
      />
      {/* Drop shadow */}
      <polygon
        points={`${sx},${sy + 2} ${sx - headSize * 0.6},${sy - headSize + 2} ${sx + headSize * 0.6},${sy - headSize + 2}`}
        fill="#C8A000" opacity={0.4}
      />
    </g>
  );
}

export default function MainBuildingStage({ blocks, label, cameraOffset }: Props) {
  const ox = ORIGIN_X + (cameraOffset?.x ?? 0);
  const oy = ORIGIN_Y + (cameraOffset?.y ?? 0);
  // Sort back-to-front (painter's algorithm)
  const sorted = [...blocks].sort((a, b) =>
    (a.x + a.y + a.z * 0.01) - (b.x + b.y + b.z * 0.01)
  );

  const hasNew = blocks.some((b) => b.isNew);

  return (
    <div className="flex-1 flex flex-col bg-[#F0F7E6] rounded-2xl border-2 border-[#dde8cc] mx-2 min-h-[360px] overflow-hidden">
      {/* Step label bar */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-[#dde8cc] px-4 py-2 flex items-center gap-2">
        <span className="text-lg font-black text-gray-800">{label}</span>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <svg width="640" height="380" viewBox="0 0 640 380" className="w-full h-full max-h-[380px]">
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D4EDFF" />
              <stop offset="100%" stopColor="#F0F7E6" />
            </linearGradient>
          </defs>
          <rect width="640" height="380" fill="url(#sky)" />

          <GroundGrid originX={ox} originY={oy} />

          {sorted.map((block) => (
            <IsometricBlock
              key={block.id}
              {...block}
              tileW={TILE_W}
              tileH={TILE_H}
              originX={ox}
              originY={oy}
            />
          ))}

          {hasNew && <GroupArrow blocks={blocks} originX={ox} originY={oy} />}
        </svg>
      </div>
    </div>
  );
}
