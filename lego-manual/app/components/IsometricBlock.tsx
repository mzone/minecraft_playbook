"use client";

type Props = {
  x: number;
  y: number;
  z: number;
  color: string;
  isNew?: boolean;
  tileW: number;
  tileH: number;
  originX: number;
  originY: number;
};

function darken(hex: string, amount: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, (n >> 16) - amount);
  const g = Math.max(0, ((n >> 8) & 0xff) - amount);
  const b = Math.max(0, (n & 0xff) - amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

export function isoProject(
  x: number,
  y: number,
  z: number,
  tileW: number,
  tileH: number,
  originX: number,
  originY: number
) {
  const sx = originX + (x - y) * (tileW / 2);
  const sy = originY + (x + y) * (tileH / 2) - z * tileH;
  return { sx, sy };
}

export default function IsometricBlock({
  x, y, z, color, isNew, tileW, tileH, originX, originY,
}: Props) {
  const proj = (dx: number, dy: number, dz: number) =>
    isoProject(x + dx, y + dy, z + dz, tileW, tileH, originX, originY);

  // 8 corners of the cube
  const top = [
    proj(0, 0, 1), proj(1, 0, 1), proj(1, 1, 1), proj(0, 1, 1),
  ];
  const left = [
    proj(0, 1, 1), proj(1, 1, 1), proj(1, 1, 0), proj(0, 1, 0),
  ];
  const right = [
    proj(1, 0, 1), proj(1, 1, 1), proj(1, 1, 0), proj(1, 0, 0),
  ];

  const toPoints = (pts: { sx: number; sy: number }[]) =>
    pts.map((p) => `${p.sx},${p.sy}`).join(" ");

  const topColor = color;
  const leftColor = darken(color, 40);
  const rightColor = darken(color, 20);
  const strokeColor = isNew ? "#FFD400" : "rgba(0,0,0,0.15)";
  const strokeWidth = isNew ? 2 : 0.5;

  // Arrow anchor: top-center of the block
  const topCenter = proj(0.5, 0.5, 1);

  return (
    <g>
      <polygon points={toPoints(top)} fill={topColor} stroke={strokeColor} strokeWidth={strokeWidth} />
      <polygon points={toPoints(left)} fill={leftColor} stroke={strokeColor} strokeWidth={strokeWidth} />
      <polygon points={toPoints(right)} fill={rightColor} stroke={strokeColor} strokeWidth={strokeWidth} />

      {isNew && (
        <>
          {/* Dashed outline on top face */}
          <polygon
            points={toPoints(top)}
            fill="none"
            stroke="#FFD400"
            strokeWidth={2}
            strokeDasharray="4 3"
          />
          {/* Downward arrow above new block */}
          <g transform={`translate(${topCenter.sx}, ${topCenter.sy - tileH * 1.5})`}>
            <line x1="0" y1="0" x2="0" y2={tileH * 0.9} stroke="#FFD400" strokeWidth={3} strokeLinecap="round" />
            <polygon
              points={`0,${tileH * 0.9} ${-tileH * 0.35},${tileH * 0.45} ${tileH * 0.35},${tileH * 0.45}`}
              fill="#FFD400"
            />
          </g>
        </>
      )}
    </g>
  );
}
