export type Block = {
  id: string;
  x: number; // isometric col
  y: number; // isometric row
  z: number; // height
  color: string;
  isNew?: boolean; // newly added in this step
};

export type Part = {
  color: string;
  label: string;
  count: number;
};

export type Step = {
  stepNumber: number;
  totalSteps: number;
  parts: Part[];
  blocks: Block[];
  hint?: string; // optional text hint (kept minimal)
};

// Minecraft vol.01 "ひみつきち" - 3 steps demo
export const steps: Step[] = [
  {
    stepNumber: 1,
    totalSteps: 3,
    parts: [{ color: "#C4A265", label: "いた", count: 4 }],
    blocks: [
      // 1段目 南の壁（手前）- 4ブロック横並び
      { id: "s1-0", x: 0, y: 0, z: 0, color: "#C4A265", isNew: true },
      { id: "s1-1", x: 1, y: 0, z: 0, color: "#C4A265", isNew: true },
      { id: "s1-2", x: 2, y: 0, z: 0, color: "#C4A265", isNew: true },
      { id: "s1-3", x: 3, y: 0, z: 0, color: "#C4A265", isNew: true },
    ],
  },
  {
    stepNumber: 2,
    totalSteps: 3,
    parts: [{ color: "#C4A265", label: "いた", count: 4 }],
    blocks: [
      // 1段目（既存）
      { id: "s1-0", x: 0, y: 0, z: 0, color: "#C4A265" },
      { id: "s1-1", x: 1, y: 0, z: 0, color: "#C4A265" },
      { id: "s1-2", x: 2, y: 0, z: 0, color: "#C4A265" },
      { id: "s1-3", x: 3, y: 0, z: 0, color: "#C4A265" },
      // 2段目（新規）
      { id: "s2-0", x: 0, y: 0, z: 1, color: "#C4A265", isNew: true },
      { id: "s2-1", x: 1, y: 0, z: 1, color: "#C4A265", isNew: true },
      { id: "s2-2", x: 2, y: 0, z: 1, color: "#C4A265", isNew: true },
      { id: "s2-3", x: 3, y: 0, z: 1, color: "#C4A265", isNew: true },
    ],
  },
  {
    stepNumber: 3,
    totalSteps: 3,
    parts: [
      { color: "#C4A265", label: "いた", count: 8 },
      { color: "#7B4F2E", label: "ドア", count: 1 },
    ],
    blocks: [
      // 南の壁（既存 2段）
      { id: "s1-0", x: 0, y: 0, z: 0, color: "#C4A265" },
      { id: "s1-3", x: 3, y: 0, z: 0, color: "#C4A265" },
      { id: "s2-0", x: 0, y: 0, z: 1, color: "#C4A265" },
      { id: "s2-3", x: 3, y: 0, z: 1, color: "#C4A265" },
      // 北の壁
      { id: "n1-0", x: 0, y: 3, z: 0, color: "#C4A265" },
      { id: "n1-1", x: 1, y: 3, z: 0, color: "#C4A265" },
      { id: "n1-2", x: 2, y: 3, z: 0, color: "#C4A265" },
      { id: "n1-3", x: 3, y: 3, z: 0, color: "#C4A265" },
      { id: "n2-0", x: 0, y: 3, z: 1, color: "#C4A265" },
      { id: "n2-1", x: 1, y: 3, z: 1, color: "#C4A265" },
      { id: "n2-2", x: 2, y: 3, z: 1, color: "#C4A265" },
      { id: "n2-3", x: 3, y: 3, z: 1, color: "#C4A265" },
      // 東の壁（新規）
      { id: "e1-1", x: 3, y: 1, z: 0, color: "#C4A265", isNew: true },
      { id: "e1-2", x: 3, y: 2, z: 0, color: "#C4A265", isNew: true },
      { id: "e2-1", x: 3, y: 1, z: 1, color: "#C4A265", isNew: true },
      { id: "e2-2", x: 3, y: 2, z: 1, color: "#C4A265", isNew: true },
      // 西の壁（新規）
      { id: "w1-1", x: 0, y: 1, z: 0, color: "#C4A265", isNew: true },
      { id: "w1-2", x: 0, y: 2, z: 0, color: "#C4A265", isNew: true },
      { id: "w2-1", x: 0, y: 1, z: 1, color: "#C4A265", isNew: true },
      { id: "w2-2", x: 0, y: 2, z: 1, color: "#C4A265", isNew: true },
      // ドア（新規）
      { id: "door-0", x: 1, y: 0, z: 0, color: "#7B4F2E", isNew: true },
      { id: "door-1", x: 2, y: 0, z: 0, color: "#7B4F2E", isNew: true },
      { id: "door-2", x: 1, y: 0, z: 1, color: "#6B3F1E", isNew: true },
      { id: "door-3", x: 2, y: 0, z: 1, color: "#6B3F1E", isNew: true },
    ],
  },
];
