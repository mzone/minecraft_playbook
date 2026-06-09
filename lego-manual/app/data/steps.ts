export type Block = {
  id: string;
  x: number;
  y: number;
  z: number;
  color: string;
  isNew?: boolean;
};

export type Part = {
  color: string;
  label: string;
  count: number;
};

// A single crafting recipe (2×2 or 3×3 grid)
export type CraftingRecipe = {
  gridSize: 2 | 3;                          // 2 = inventory craft, 3 = crafting table
  grid: (string | null)[][];               // color string or null for empty
  gridLabel: (string | null)[][];          // hiragana label per cell
  output: { color: string; label: string; count: number };
  tableRequired: boolean;                   // true = ものづくりだい が必要
};

export type Step = {
  stepNumber: number;
  totalSteps: number;
  label: string;
  parts: Part[];
  blocks: Block[];
  cameraOffset?: { x: number; y: number };
  // If set, show crafting recipe panel before placing blocks.
  // List all recipes needed to obtain the new parts in this step.
  recipes?: CraftingRecipe[];
};

// ── Shared recipe definitions ────────────────────────────────────────────────

const LOG_COLOR  = "#8B6914";
const PLANK_COLOR = "#C4A265";
const DOOR_TOP   = "#7B4F2E";

/** まるた → いた×4  (2×2, no table needed) */
export const RECIPE_PLANK: CraftingRecipe = {
  gridSize: 2,
  grid: [[LOG_COLOR, null], [null, null]],
  gridLabel: [["まるた", null], [null, null]],
  output: { color: PLANK_COLOR, label: "いた", count: 4 },
  tableRequired: false,
};

/** いた×4 → ものづくりだい×1  (2×2, no table needed) */
export const RECIPE_TABLE: CraftingRecipe = {
  gridSize: 2,
  grid: [
    [PLANK_COLOR, PLANK_COLOR],
    [PLANK_COLOR, PLANK_COLOR],
  ],
  gridLabel: [
    ["いた", "いた"],
    ["いた", "いた"],
  ],
  output: { color: "#A0522D", label: "ものづくりだい", count: 1 },
  tableRequired: false,
};

/** いた×6（左2列）→ ドア×3  (3×3, table required) */
export const RECIPE_DOOR: CraftingRecipe = {
  gridSize: 3,
  grid: [
    [PLANK_COLOR, PLANK_COLOR, null],
    [PLANK_COLOR, PLANK_COLOR, null],
    [PLANK_COLOR, PLANK_COLOR, null],
  ],
  gridLabel: [
    ["いた", "いた", null],
    ["いた", "いた", null],
    ["いた", "いた", null],
  ],
  output: { color: DOOR_TOP, label: "ドア", count: 3 },
  tableRequired: true,
};

// ── Step data ────────────────────────────────────────────────────────────────

export const steps: Step[] = [
  {
    stepNumber: 1,
    totalSteps: 5,
    label: "まるたを いたに かえよう",
    recipes: [RECIPE_PLANK],
    parts: [{ color: PLANK_COLOR, label: "いた", count: 4 }],
    blocks: [
      { id: "s1-0", x: 0, y: 0, z: 0, color: PLANK_COLOR, isNew: true },
      { id: "s1-1", x: 1, y: 0, z: 0, color: PLANK_COLOR, isNew: true },
      { id: "s1-2", x: 2, y: 0, z: 0, color: PLANK_COLOR, isNew: true },
      { id: "s1-3", x: 3, y: 0, z: 0, color: PLANK_COLOR, isNew: true },
    ],
  },
  {
    stepNumber: 2,
    totalSteps: 5,
    label: "かべを 2だんに しよう",
    parts: [{ color: PLANK_COLOR, label: "いた", count: 4 }],
    blocks: [
      { id: "s1-0", x: 0, y: 0, z: 0, color: PLANK_COLOR },
      { id: "s1-1", x: 1, y: 0, z: 0, color: PLANK_COLOR },
      { id: "s1-2", x: 2, y: 0, z: 0, color: PLANK_COLOR },
      { id: "s1-3", x: 3, y: 0, z: 0, color: PLANK_COLOR },
      { id: "s2-0", x: 0, y: 0, z: 1, color: PLANK_COLOR, isNew: true },
      { id: "s2-1", x: 1, y: 0, z: 1, color: PLANK_COLOR, isNew: true },
      { id: "s2-2", x: 2, y: 0, z: 1, color: PLANK_COLOR, isNew: true },
      { id: "s2-3", x: 3, y: 0, z: 1, color: PLANK_COLOR, isNew: true },
    ],
  },
  {
    stepNumber: 3,
    totalSteps: 5,
    label: "ものづくりだいを つくろう",
    recipes: [RECIPE_TABLE],
    parts: [{ color: "#A0522D", label: "ものづくりだい", count: 1 }],
    blocks: [
      { id: "s1-0", x: 0, y: 0, z: 0, color: PLANK_COLOR },
      { id: "s1-3", x: 3, y: 0, z: 0, color: PLANK_COLOR },
      { id: "s2-0", x: 0, y: 0, z: 1, color: PLANK_COLOR },
      { id: "s2-3", x: 3, y: 0, z: 1, color: PLANK_COLOR },
      // ものづくりだいを地面に置く
      { id: "ct",   x: 1, y: 2, z: 0, color: "#A0522D", isNew: true },
    ],
  },
  {
    stepNumber: 4,
    totalSteps: 5,
    label: "ドアを つくろう",
    recipes: [RECIPE_DOOR],
    parts: [{ color: DOOR_TOP, label: "ドア", count: 1 }],
    blocks: [
      { id: "s1-0", x: 0, y: 0, z: 0, color: PLANK_COLOR },
      { id: "s1-3", x: 3, y: 0, z: 0, color: PLANK_COLOR },
      { id: "s2-0", x: 0, y: 0, z: 1, color: PLANK_COLOR },
      { id: "s2-3", x: 3, y: 0, z: 1, color: PLANK_COLOR },
      { id: "ct",   x: 1, y: 2, z: 0, color: "#A0522D" },
      // ドアが手持ちに入ったイメージ（表示はPartsBoxで）
    ],
  },
  {
    stepNumber: 5,
    totalSteps: 5,
    label: "まわりと ドアを つけよう",
    cameraOffset: { x: -60, y: 30 },
    parts: [
      { color: PLANK_COLOR, label: "いた", count: 8 },
      { color: DOOR_TOP,    label: "ドア",  count: 1 },
    ],
    blocks: [
      { id: "s1-0", x: 0, y: 0, z: 0, color: PLANK_COLOR },
      { id: "s1-3", x: 3, y: 0, z: 0, color: PLANK_COLOR },
      { id: "s2-0", x: 0, y: 0, z: 1, color: PLANK_COLOR },
      { id: "s2-3", x: 3, y: 0, z: 1, color: PLANK_COLOR },
      { id: "n1-0", x: 0, y: 3, z: 0, color: PLANK_COLOR },
      { id: "n1-1", x: 1, y: 3, z: 0, color: PLANK_COLOR },
      { id: "n1-2", x: 2, y: 3, z: 0, color: PLANK_COLOR },
      { id: "n1-3", x: 3, y: 3, z: 0, color: PLANK_COLOR },
      { id: "n2-0", x: 0, y: 3, z: 1, color: PLANK_COLOR },
      { id: "n2-1", x: 1, y: 3, z: 1, color: PLANK_COLOR },
      { id: "n2-2", x: 2, y: 3, z: 1, color: PLANK_COLOR },
      { id: "n2-3", x: 3, y: 3, z: 1, color: PLANK_COLOR },
      { id: "e1-1", x: 3, y: 1, z: 0, color: PLANK_COLOR, isNew: true },
      { id: "e1-2", x: 3, y: 2, z: 0, color: PLANK_COLOR, isNew: true },
      { id: "e2-1", x: 3, y: 1, z: 1, color: PLANK_COLOR, isNew: true },
      { id: "e2-2", x: 3, y: 2, z: 1, color: PLANK_COLOR, isNew: true },
      { id: "w1-1", x: 0, y: 1, z: 0, color: PLANK_COLOR, isNew: true },
      { id: "w1-2", x: 0, y: 2, z: 0, color: PLANK_COLOR, isNew: true },
      { id: "w2-1", x: 0, y: 1, z: 1, color: PLANK_COLOR, isNew: true },
      { id: "w2-2", x: 0, y: 2, z: 1, color: PLANK_COLOR, isNew: true },
      { id: "door-0", x: 1, y: 0, z: 0, color: DOOR_TOP,    isNew: true },
      { id: "door-1", x: 2, y: 0, z: 0, color: DOOR_TOP,    isNew: true },
      { id: "door-2", x: 1, y: 0, z: 1, color: "#6B3F1E",   isNew: true },
      { id: "door-3", x: 2, y: 0, z: 1, color: "#6B3F1E",   isNew: true },
    ],
  },
];
