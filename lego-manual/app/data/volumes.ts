/**
 * volumes.ts — 全20巻のステップデータ
 * 各巻の主要クラフトレシピ＋代表的なブロック配置を定義
 */

import type { Step, CraftingRecipe } from "./steps";

// ── 共有カラー ────────────────────────────────────────────────────────────────
const LOG    = "#8B6914";
const PLANK  = "#C4A265";
const STICK  = "#B8883A";
const STONE  = "#808080";
const COBBLE = "#7A7A7A";
const IRON   = "#D4D4D4";
const WATER  = "#3F76E4";
const DIRT   = "#966C4A";
const GRASS  = "#5D9E2A";
const WOOLW  = "#F5F0E8";   // 白ウール
const GRAVEL = "#8A8A8A";
const WHEAT  = "#D4AA30";
const FARMLAND = "#6B3F18";
const SNOW   = "#F0F4F8";
const ICE    = "#7EC8E3";
const GLASS  = "#AADDEE";
const TORCH  = "#FFD400";
const DOOR   = "#7B4F2E";
const TABLE  = "#A0522D";
const BED    = "#CC4444";
const FENCE  = "#B89040";
const SADDLE = "#C84830";
const WOLF   = "#D4D0C8";
const CHEST  = "#C0861A";
const LAVA   = "#FF6600";
const RAIL   = "#999999";

// ── 共有レシピ ────────────────────────────────────────────────────────────────
const R_PLANK: CraftingRecipe = {
  gridSize: 2,
  grid: [[LOG, null], [null, null]],
  gridLabel: [["まるた", null], [null, null]],
  output: { color: PLANK, label: "いた (Oak Planks)", count: 4 },
  tableRequired: false,
  howTo: [
    "「E」ボタンで もちものを ひらこう",
    "2×2の ひだりうえに「まるた」を 1こ いれよう",
    "みぎに「いた×4」が でたら うけとろう",
  ],
};

const R_TABLE: CraftingRecipe = {
  gridSize: 2,
  grid: [[PLANK, PLANK], [PLANK, PLANK]],
  gridLabel: [["いた", "いた"], ["いた", "いた"]],
  output: { color: TABLE, label: "ものづくりだい (Crafting Table)", count: 1 },
  tableRequired: false,
  howTo: [
    "2×2 の 4マスに「いた」を 1まいずつ いれよう",
    "「ものづくりだい」を うけとって ちめんに おこう",
  ],
};

const R_DOOR: CraftingRecipe = {
  gridSize: 3,
  grid: [[PLANK, PLANK, null], [PLANK, PLANK, null], [PLANK, PLANK, null]],
  gridLabel: [["いた", "いた", null], ["いた", "いた", null], ["いた", "いた", null]],
  output: { color: DOOR, label: "ドア (Oak Door)", count: 3 },
  tableRequired: true,
  howTo: [
    "ものづくりだいを ひらこう",
    "ひだりの 2れつ に「いた」を 6まい いれよう",
    "「ドア×3」を うけとろう",
  ],
};

const R_STICK: CraftingRecipe = {
  gridSize: 2,
  grid: [[PLANK, null], [PLANK, null]],
  gridLabel: [["いた", null], ["いた", null]],
  output: { color: STICK, label: "えだ (Stick)", count: 4 },
  tableRequired: false,
  howTo: [
    "2×2の ひだりれつに「いた」を 2まい たてに いれよう",
    "「えだ×4」を うけとろう",
  ],
};

const R_LADDER: CraftingRecipe = {
  gridSize: 3,
  grid: [
    [STICK, null,  STICK],
    [STICK, STICK, STICK],
    [STICK, null,  STICK],
  ],
  gridLabel: [
    ["えだ", null, "えだ"],
    ["えだ", "えだ", "えだ"],
    ["えだ", null, "えだ"],
  ],
  output: { color: STICK, label: "はしご (Ladder)", count: 3 },
  tableRequired: true,
  howTo: [
    "ものづくりだいを ひらこう",
    "Hのかたちに「えだ」を 7こ ならべよう（まんなかの まんなか だけ あけてね）",
    "「はしご×3」を うけとろう",
  ],
};

const R_BED: CraftingRecipe = {
  gridSize: 3,
  grid: [[WOOLW, WOOLW, WOOLW], [PLANK, PLANK, PLANK], [null, null, null]],
  gridLabel: [["ウール", "ウール", "ウール"], ["いた", "いた", "いた"], [null, null, null]],
  output: { color: BED, label: "ベッド (Bed)", count: 1 },
  tableRequired: true,
  howTo: [
    "ものづくりだいを ひらこう",
    "うえの れつに「ウール」を 3まい いれよう",
    "まんなかの れつに「いた」を 3まい いれよう",
    "「ベッド×1」を うけとろう",
  ],
};

const R_BOAT: CraftingRecipe = {
  gridSize: 3,
  grid: [[null, null, null], [PLANK, null, PLANK], [PLANK, PLANK, PLANK]],
  gridLabel: [[null, null, null], ["いた", null, "いた"], ["いた", "いた", "いた"]],
  output: { color: PLANK, label: "ボート (Oak Boat)", count: 1 },
  tableRequired: true,
  howTo: [
    "ものづくりだいを ひらこう",
    "まんなかの れつに「いた」を ひだりとみぎ に いれよう",
    "いちばん したの れつに「いた」を 3まい いれよう",
    "Uのかたちに なるよ！「ボート×1」を うけとろう",
  ],
};

const R_FENCE: CraftingRecipe = {
  gridSize: 3,
  grid: [[PLANK, STICK, PLANK], [PLANK, STICK, PLANK], [null, null, null]],
  gridLabel: [["いた", "えだ", "いた"], ["いた", "えだ", "いた"], [null, null, null]],
  output: { color: FENCE, label: "さく (Oak Fence)", count: 3 },
  tableRequired: true,
  howTo: [
    "ものづくりだいを ひらこう",
    "うえの れつ：いた・えだ・いた の じゅんに いれよう",
    "まんなかの れつも おなじように いれよう",
    "「さく×3」を うけとろう",
  ],
};

const R_FENCE_GATE: CraftingRecipe = {
  gridSize: 3,
  grid: [[STICK, PLANK, STICK], [STICK, PLANK, STICK], [null, null, null]],
  gridLabel: [["えだ", "いた", "えだ"], ["えだ", "いた", "えだ"], [null, null, null]],
  output: { color: FENCE, label: "さくのとびら (Oak Fence Gate)", count: 1 },
  tableRequired: true,
  howTo: [
    "ものづくりだいを ひらこう",
    "うえの れつ：えだ・いた・えだ の じゅんに いれよう",
    "まんなかの れつも おなじように いれよう",
    "「さくのとびら×1」を うけとろう",
  ],
};

const R_BUCKET: CraftingRecipe = {
  gridSize: 3,
  grid: [[null, null, null], [IRON, null, IRON], [null, IRON, null]],
  gridLabel: [[null, null, null], ["てつ", null, "てつ"], [null, "てつ", null]],
  output: { color: IRON, label: "バケツ (Bucket)", count: 1 },
  tableRequired: true,
  howTo: [
    "ものづくりだいを ひらこう",
    "まんなかの れつの ひだりとみぎに「てつのインゴット」を いれよう",
    "いちばん したの まんなかに「てつのインゴット」を いれよう",
    "Vのかたちに なるよ！「バケツ×1」を うけとろう",
  ],
};

const R_FISHING_ROD: CraftingRecipe = {
  gridSize: 3,
  grid: [[null, null, STICK], [null, STICK, "#E0E0E0"], [STICK, "#E0E0E0", null]],
  gridLabel: [[null, null, "えだ"], [null, "えだ", "いと"], ["えだ", "いと", null]],
  output: { color: STICK, label: "つりざお (Fishing Rod)", count: 1 },
  tableRequired: true,
  howTo: [
    "ものづくりだいを ひらこう",
    "みぎうえ・まんなか・ひだりしたに「えだ」を ならめに 3こ いれよう",
    "えだの みぎとなりに「いと」を 2こ いれよう",
    "「つりざお×1」を うけとろう",
  ],
};

const R_HOE: CraftingRecipe = {
  gridSize: 3,
  grid: [[PLANK, PLANK, null], [null, STICK, null], [null, STICK, null]],
  gridLabel: [["いた", "いた", null], [null, "えだ", null], [null, "えだ", null]],
  output: { color: PLANK, label: "きのくわ (Wooden Hoe)", count: 1 },
  tableRequired: true,
  howTo: [
    "ものづくりだいを ひらこう",
    "うえの れつ ひだり2マスに「いた」を 2まい いれよう",
    "まんなかと したの まんなかに「えだ」を 2こ いれよう",
    "「きのくわ×1」を うけとろう",
  ],
};

const R_BREAD: CraftingRecipe = {
  gridSize: 3,
  grid: [[null, null, null], [WHEAT, WHEAT, WHEAT], [null, null, null]],
  gridLabel: [[null, null, null], ["むぎ", "むぎ", "むぎ"], [null, null, null]],
  output: { color: "#C47B30", label: "パン (Bread)", count: 1 },
  tableRequired: true,
  howTo: [
    "ものづくりだいを ひらこう",
    "まんなかの れつに「むぎ」を 3こ よこに ならべよう",
    "「パン×1」を うけとろう",
  ],
};

const R_SIGN: CraftingRecipe = {
  gridSize: 3,
  grid: [[PLANK, PLANK, PLANK], [PLANK, PLANK, PLANK], [null, STICK, null]],
  gridLabel: [["いた", "いた", "いた"], ["いた", "いた", "いた"], [null, "えだ", null]],
  output: { color: PLANK, label: "かんばん (Oak Sign)", count: 3 },
  tableRequired: true,
  howTo: [
    "ものづくりだいを ひらこう",
    "うえ2れつに「いた」を 6まい うめよう",
    "いちばん したの まんなかに「えだ」を いれよう",
    "「かんばん×3」を うけとろう",
  ],
};

const R_PICKAXE_WOOD: CraftingRecipe = {
  gridSize: 3,
  grid: [[PLANK, PLANK, PLANK], [null, STICK, null], [null, STICK, null]],
  gridLabel: [["いた", "いた", "いた"], [null, "えだ", null], [null, "えだ", null]],
  output: { color: PLANK, label: "きのつるはし (Wooden Pickaxe)", count: 1 },
  tableRequired: true,
  howTo: [
    "ものづくりだいを ひらこう",
    "うえの れつに「いた」を 3まい ならべよう",
    "まんなかと したの まんなかに「えだ」を 2こ いれよう",
    "「きのつるはし×1」を うけとろう",
  ],
};

const R_PICKAXE_STONE: CraftingRecipe = {
  gridSize: 3,
  grid: [[COBBLE, COBBLE, COBBLE], [null, STICK, null], [null, STICK, null]],
  gridLabel: [["まるいし", "まるいし", "まるいし"], [null, "えだ", null], [null, "えだ", null]],
  output: { color: COBBLE, label: "いしのつるはし (Stone Pickaxe)", count: 1 },
  tableRequired: true,
  howTo: [
    "ものづくりだいを ひらこう",
    "うえの れつに「まるいし」を 3こ ならべよう",
    "まんなかと したの まんなかに「えだ」を 2こ いれよう",
    "「いしのつるはし×1」を うけとろう",
  ],
};

const R_TORCH: CraftingRecipe = {
  gridSize: 2,
  grid: [["#222222", null], [STICK, null]],
  gridLabel: [["せきたん", null], ["えだ", null]],
  output: { color: TORCH, label: "たいまつ (Torch)", count: 4 },
  tableRequired: false,
  howTo: [
    "2×2の ひだりうえに「せきたん」を いれよう",
    "ひだりした に「えだ」を いれよう",
    "「たいまつ×4」を うけとろう",
  ],
};

const R_GLASS_PANE: CraftingRecipe = {
  gridSize: 3,
  grid: [[GLASS, GLASS, GLASS], [GLASS, GLASS, GLASS], [null, null, null]],
  gridLabel: [["ガラス", "ガラス", "ガラス"], ["ガラス", "ガラス", "ガラス"], [null, null, null]],
  output: { color: GLASS, label: "ガラスパネル (Glass Pane)", count: 16 },
  tableRequired: true,
  howTo: [
    "ものづくりだいを ひらこう",
    "うえ2れつに「ガラス」を 6まい うめよう",
    "「ガラスパネル×16」を うけとろう",
  ],
};

const R_SNOW_BLOCK: CraftingRecipe = {
  gridSize: 2,
  grid: [[SNOW, SNOW], [SNOW, SNOW]],
  gridLabel: [["ゆきだま", "ゆきだま"], ["ゆきだま", "ゆきだま"]],
  output: { color: SNOW, label: "スノーブロック (Snow Block)", count: 1 },
  tableRequired: false,
  howTo: [
    "もちものを ひらこう",
    "2×2の 4マスに「ゆきだま」を いれよう",
    "「スノーブロック×1」を うけとろう",
  ],
};

const R_SHOVEL: CraftingRecipe = {
  gridSize: 3,
  grid: [[null, PLANK, null], [null, STICK, null], [null, STICK, null]],
  gridLabel: [[null, "いた", null], [null, "えだ", null], [null, "えだ", null]],
  output: { color: PLANK, label: "きのシャベル (Wooden Shovel)", count: 1 },
  tableRequired: true,
  howTo: [
    "ものづくりだいを ひらこう",
    "うえの まんなかに「いた」を 1まい いれよう",
    "まんなかと したの まんなかに「えだ」を 2こ いれよう",
    "「きのシャベル×1」を うけとろう",
  ],
};

const R_CHEST: CraftingRecipe = {
  gridSize: 3,
  grid: [[PLANK, PLANK, PLANK], [PLANK, null, PLANK], [PLANK, PLANK, PLANK]],
  gridLabel: [["いた", "いた", "いた"], ["いた", null, "いた"], ["いた", "いた", "いた"]],
  output: { color: CHEST, label: "チェスト (Chest)", count: 1 },
  tableRequired: true,
  howTo: [
    "ものづくりだいを ひらこう",
    "まんなかの まんなか だけ あけて 8マスに「いた」を いれよう",
    "「チェスト×1」を うけとろう",
  ],
};

// ── 各巻データ ────────────────────────────────────────────────────────────────

/** vol01 ひみつきち */
export const vol01Steps: Step[] = [
  {
    stepNumber: 1, totalSteps: 4, label: "まるたを あつめよう",
    recipes: [R_PLANK],
    parts: [{ color: PLANK, label: "いた (Oak Planks)", count: 4 }],
    blocks: [
      { id: "p0", x: 0, y: 0, z: 0, color: PLANK, isNew: true },
      { id: "p1", x: 1, y: 0, z: 0, color: PLANK, isNew: true },
      { id: "p2", x: 0, y: 1, z: 0, color: PLANK, isNew: true },
      { id: "p3", x: 1, y: 1, z: 0, color: PLANK, isNew: true },
    ],
  },
  {
    stepNumber: 2, totalSteps: 4, label: "ものづくりだいを つくろう",
    recipes: [R_TABLE],
    parts: [{ color: TABLE, label: "ものづくりだい (Crafting Table)", count: 1 }],
    blocks: [
      { id: "p0", x: 0, y: 0, z: 0, color: PLANK },
      { id: "p1", x: 1, y: 0, z: 0, color: PLANK },
      { id: "p2", x: 0, y: 1, z: 0, color: PLANK },
      { id: "p3", x: 1, y: 1, z: 0, color: PLANK },
      { id: "tb", x: 0, y: 0, z: 1, color: TABLE, isNew: true },
    ],
  },
  {
    stepNumber: 3, totalSteps: 4, label: "ドアを つくろう",
    recipes: [R_DOOR],
    parts: [{ color: DOOR, label: "ドア (Oak Door)", count: 1 }],
    blocks: [
      { id: "p0", x: 0, y: 0, z: 0, color: PLANK },
      { id: "p1", x: 1, y: 0, z: 0, color: PLANK },
      { id: "p2", x: 0, y: 1, z: 0, color: PLANK },
      { id: "p3", x: 1, y: 1, z: 0, color: PLANK },
      { id: "tb", x: 0, y: 0, z: 1, color: TABLE },
      { id: "w0", x: 0, y: 0, z: 2, color: PLANK, isNew: true },
      { id: "w1", x: 1, y: 0, z: 2, color: PLANK, isNew: true },
      { id: "w2", x: 0, y: 1, z: 2, color: PLANK, isNew: true },
      { id: "w3", x: 1, y: 1, z: 2, color: PLANK, isNew: true },
    ],
  },
  {
    stepNumber: 4, totalSteps: 4, label: "かべと ドアを つけよう",
    parts: [{ color: DOOR, label: "ドア (Oak Door)", count: 1 }],
    blocks: [
      { id: "p0", x: 0, y: 0, z: 0, color: PLANK },
      { id: "p1", x: 1, y: 0, z: 0, color: PLANK },
      { id: "p2", x: 0, y: 1, z: 0, color: PLANK },
      { id: "p3", x: 1, y: 1, z: 0, color: PLANK },
      { id: "w0", x: 0, y: 0, z: 2, color: PLANK },
      { id: "w1", x: 1, y: 0, z: 2, color: PLANK },
      { id: "w2", x: 0, y: 1, z: 2, color: PLANK },
      { id: "w3", x: 1, y: 1, z: 2, color: PLANK },
      { id: "d0", x: 0, y: 0, z: 1, color: DOOR, isNew: true },
      { id: "d1", x: 1, y: 0, z: 1, color: DOOR, isNew: true },
      { id: "side0", x: 0, y: 1, z: 1, color: PLANK, isNew: true },
      { id: "side1", x: 1, y: 1, z: 1, color: PLANK, isNew: true },
    ],
  },
];

/** vol02 みはりだい */
export const vol02Steps: Step[] = [
  {
    stepNumber: 1, totalSteps: 4, label: "いたと えだを つくろう",
    recipes: [R_PLANK, R_STICK],
    parts: [{ color: PLANK, label: "いた (Oak Planks)", count: 8 }, { color: STICK, label: "えだ (Stick)", count: 14 }],
    blocks: [
      { id: "b0", x: 0, y: 0, z: 0, color: LOG, isNew: true },
      { id: "b1", x: 1, y: 0, z: 0, color: LOG, isNew: true },
      { id: "b2", x: 0, y: 1, z: 0, color: LOG, isNew: true },
      { id: "b3", x: 1, y: 1, z: 0, color: LOG, isNew: true },
    ],
  },
  {
    stepNumber: 2, totalSteps: 4, label: "ものづくりだいと はしごを つくろう",
    recipes: [R_TABLE, R_LADDER],
    parts: [{ color: TABLE, label: "ものづくりだい (Crafting Table)", count: 1 }, { color: STICK, label: "はしご (Ladder)", count: 6 }],
    blocks: [
      { id: "b0", x: 0, y: 0, z: 0, color: LOG },
      { id: "b1", x: 1, y: 0, z: 0, color: LOG },
      { id: "b2", x: 0, y: 1, z: 0, color: LOG },
      { id: "b3", x: 1, y: 1, z: 0, color: LOG },
      { id: "t0", x: 0, y: 0, z: 1, color: TABLE, isNew: true },
    ],
  },
  {
    stepNumber: 3, totalSteps: 4, label: "みはりだいの ゆかを おこう",
    parts: [{ color: LOG, label: "まるた (Oak Log)", count: 4 }],
    blocks: [
      { id: "b0", x: 0, y: 0, z: 0, color: LOG },
      { id: "b1", x: 1, y: 0, z: 0, color: LOG },
      { id: "b2", x: 0, y: 1, z: 0, color: LOG },
      { id: "b3", x: 1, y: 1, z: 0, color: LOG },
      { id: "c0", x: 0, y: 0, z: 3, color: LOG, isNew: true },
      { id: "c1", x: 1, y: 0, z: 3, color: LOG, isNew: true },
      { id: "c2", x: 0, y: 1, z: 3, color: LOG, isNew: true },
      { id: "c3", x: 1, y: 1, z: 3, color: LOG, isNew: true },
    ],
  },
  {
    stepNumber: 4, totalSteps: 4, label: "はしごを のぼってみよう",
    parts: [{ color: STICK, label: "はしご (Ladder)", count: 3 }],
    blocks: [
      { id: "b0", x: 0, y: 0, z: 0, color: LOG },
      { id: "b1", x: 1, y: 0, z: 0, color: LOG },
      { id: "b2", x: 0, y: 1, z: 0, color: LOG },
      { id: "b3", x: 1, y: 1, z: 0, color: LOG },
      { id: "c0", x: 0, y: 0, z: 3, color: LOG },
      { id: "c1", x: 1, y: 0, z: 3, color: LOG },
      { id: "c2", x: 0, y: 1, z: 3, color: LOG },
      { id: "c3", x: 1, y: 1, z: 3, color: LOG },
      { id: "l0", x: 0, y: 0, z: 1, color: STICK, isNew: true },
      { id: "l1", x: 0, y: 0, z: 2, color: STICK, isNew: true },
      { id: "l2", x: 0, y: 0, z: 3, color: STICK, isNew: true },
    ],
  },
];

/** vol03 おやすみハウス */
export const vol03Steps: Step[] = [
  {
    stepNumber: 1, totalSteps: 4, label: "いたを つくろう",
    recipes: [R_PLANK, R_TABLE],
    parts: [{ color: PLANK, label: "いた (Oak Planks)", count: 14 }],
    blocks: [
      { id: "f0", x: 0, y: 0, z: 0, color: PLANK, isNew: true },
      { id: "f1", x: 1, y: 0, z: 0, color: PLANK, isNew: true },
      { id: "f2", x: 2, y: 0, z: 0, color: PLANK, isNew: true },
      { id: "f3", x: 0, y: 1, z: 0, color: PLANK, isNew: true },
      { id: "f4", x: 2, y: 1, z: 0, color: PLANK, isNew: true },
    ],
  },
  {
    stepNumber: 2, totalSteps: 4, label: "ベッドを つくろう",
    recipes: [R_BED],
    parts: [{ color: BED, label: "ベッド (Bed)", count: 1 }],
    blocks: [
      { id: "f0", x: 0, y: 0, z: 0, color: PLANK },
      { id: "f1", x: 1, y: 0, z: 0, color: PLANK },
      { id: "f2", x: 2, y: 0, z: 0, color: PLANK },
      { id: "f3", x: 0, y: 1, z: 0, color: PLANK },
      { id: "f4", x: 2, y: 1, z: 0, color: PLANK },
      { id: "bd", x: 1, y: 0, z: 1, color: BED, isNew: true },
    ],
  },
  {
    stepNumber: 3, totalSteps: 4, label: "ドアを つくろう",
    recipes: [R_DOOR],
    parts: [{ color: DOOR, label: "ドア (Oak Door)", count: 1 }],
    blocks: [
      { id: "f0", x: 0, y: 0, z: 0, color: PLANK },
      { id: "f1", x: 1, y: 0, z: 0, color: PLANK },
      { id: "f2", x: 2, y: 0, z: 0, color: PLANK },
      { id: "f3", x: 0, y: 1, z: 0, color: PLANK },
      { id: "f4", x: 2, y: 1, z: 0, color: PLANK },
      { id: "bd", x: 1, y: 0, z: 1, color: BED },
      { id: "w0", x: 0, y: 0, z: 1, color: PLANK, isNew: true },
      { id: "w1", x: 2, y: 0, z: 1, color: PLANK, isNew: true },
    ],
  },
  {
    stepNumber: 4, totalSteps: 4, label: "おやすみ ハウスかんせい！",
    parts: [{ color: PLANK, label: "いた (Oak Planks)（やね）", count: 4 }],
    blocks: [
      { id: "f0", x: 0, y: 0, z: 0, color: PLANK },
      { id: "f1", x: 1, y: 0, z: 0, color: PLANK },
      { id: "f2", x: 2, y: 0, z: 0, color: PLANK },
      { id: "f3", x: 0, y: 1, z: 0, color: PLANK },
      { id: "f4", x: 2, y: 1, z: 0, color: PLANK },
      { id: "bd", x: 1, y: 0, z: 1, color: BED },
      { id: "w0", x: 0, y: 0, z: 1, color: PLANK },
      { id: "w1", x: 2, y: 0, z: 1, color: PLANK },
      { id: "d0", x: 1, y: 1, z: 1, color: DOOR, isNew: true },
      { id: "r0", x: 0, y: 0, z: 2, color: LOG, isNew: true },
      { id: "r1", x: 1, y: 0, z: 2, color: LOG, isNew: true },
      { id: "r2", x: 2, y: 0, z: 2, color: LOG, isNew: true },
    ],
  },
];

/** vol04 ボートひろば */
export const vol04Steps: Step[] = [
  {
    stepNumber: 1, totalSteps: 3, label: "いたを つくろう",
    recipes: [R_PLANK, R_TABLE],
    parts: [{ color: PLANK, label: "いた (Oak Planks)", count: 24 }],
    blocks: [
      { id: "d0", x: 0, y: 0, z: 0, color: DIRT, isNew: true },
      { id: "d1", x: 1, y: 0, z: 0, color: DIRT, isNew: true },
      { id: "d2", x: 2, y: 0, z: 0, color: DIRT, isNew: true },
      { id: "d3", x: 0, y: 1, z: 0, color: WATER, isNew: true },
      { id: "d4", x: 1, y: 1, z: 0, color: WATER, isNew: true },
      { id: "d5", x: 2, y: 1, z: 0, color: WATER, isNew: true },
    ],
  },
  {
    stepNumber: 2, totalSteps: 3, label: "ボートを つくろう",
    recipes: [R_BOAT],
    parts: [{ color: PLANK, label: "ボート (Oak Boat)", count: 1 }],
    blocks: [
      { id: "d0", x: 0, y: 0, z: 0, color: DIRT },
      { id: "d1", x: 1, y: 0, z: 0, color: DIRT },
      { id: "d2", x: 2, y: 0, z: 0, color: DIRT },
      { id: "d3", x: 0, y: 1, z: 0, color: WATER },
      { id: "d4", x: 1, y: 1, z: 0, color: WATER },
      { id: "d5", x: 2, y: 1, z: 0, color: WATER },
      { id: "bt", x: 1, y: 1, z: 1, color: PLANK, isNew: true },
    ],
  },
  {
    stepNumber: 3, totalSteps: 3, label: "ボートに のろう！",
    parts: [{ color: WATER, label: "みず (Water)", count: 4 }],
    blocks: [
      { id: "d0", x: 0, y: 0, z: 0, color: DIRT },
      { id: "d1", x: 1, y: 0, z: 0, color: DIRT },
      { id: "d2", x: 2, y: 0, z: 0, color: DIRT },
      { id: "d3", x: 0, y: 1, z: 0, color: WATER },
      { id: "d4", x: 1, y: 1, z: 0, color: WATER },
      { id: "d5", x: 2, y: 1, z: 0, color: WATER },
      { id: "d6", x: 0, y: 2, z: 0, color: WATER, isNew: true },
      { id: "d7", x: 1, y: 2, z: 0, color: WATER, isNew: true },
      { id: "d8", x: 2, y: 2, z: 0, color: WATER, isNew: true },
      { id: "bt", x: 1, y: 1, z: 1, color: PLANK },
    ],
  },
];

/** vol05 どうぶつひろば */
export const vol05Steps: Step[] = [
  {
    stepNumber: 1, totalSteps: 3, label: "いたと えだを つくろう",
    recipes: [R_PLANK, R_STICK],
    parts: [{ color: PLANK, label: "いた (Oak Planks)", count: 16 }, { color: STICK, label: "えだ (Stick)", count: 8 }],
    blocks: [
      { id: "g0", x: 0, y: 0, z: 0, color: GRASS, isNew: true },
      { id: "g1", x: 1, y: 0, z: 0, color: GRASS, isNew: true },
      { id: "g2", x: 2, y: 0, z: 0, color: GRASS, isNew: true },
      { id: "g3", x: 0, y: 2, z: 0, color: GRASS, isNew: true },
      { id: "g4", x: 1, y: 2, z: 0, color: GRASS, isNew: true },
      { id: "g5", x: 2, y: 2, z: 0, color: GRASS, isNew: true },
    ],
  },
  {
    stepNumber: 2, totalSteps: 3, label: "さくを つくろう",
    recipes: [R_TABLE, R_FENCE],
    parts: [{ color: FENCE, label: "さく (Oak Fence)", count: 12 }],
    blocks: [
      { id: "g0", x: 0, y: 0, z: 0, color: GRASS },
      { id: "g1", x: 1, y: 0, z: 0, color: GRASS },
      { id: "g2", x: 2, y: 0, z: 0, color: GRASS },
      { id: "g3", x: 0, y: 2, z: 0, color: GRASS },
      { id: "g4", x: 1, y: 2, z: 0, color: GRASS },
      { id: "g5", x: 2, y: 2, z: 0, color: GRASS },
      { id: "f0", x: 0, y: 0, z: 1, color: FENCE, isNew: true },
      { id: "f1", x: 1, y: 0, z: 1, color: FENCE, isNew: true },
      { id: "f2", x: 2, y: 0, z: 1, color: FENCE, isNew: true },
      { id: "f3", x: 0, y: 2, z: 1, color: FENCE, isNew: true },
      { id: "f4", x: 1, y: 2, z: 1, color: FENCE, isNew: true },
      { id: "f5", x: 2, y: 2, z: 1, color: FENCE, isNew: true },
    ],
  },
  {
    stepNumber: 3, totalSteps: 3, label: "どうぶつひろばかんせい！",
    parts: [{ color: FENCE, label: "さく (Oak Fence)（よこかべ）", count: 4 }],
    blocks: [
      { id: "g0", x: 0, y: 0, z: 0, color: GRASS },
      { id: "g1", x: 1, y: 0, z: 0, color: GRASS },
      { id: "g2", x: 2, y: 0, z: 0, color: GRASS },
      { id: "g3", x: 0, y: 2, z: 0, color: GRASS },
      { id: "g4", x: 1, y: 2, z: 0, color: GRASS },
      { id: "g5", x: 2, y: 2, z: 0, color: GRASS },
      { id: "f0", x: 0, y: 0, z: 1, color: FENCE },
      { id: "f1", x: 1, y: 0, z: 1, color: FENCE },
      { id: "f2", x: 2, y: 0, z: 1, color: FENCE },
      { id: "f3", x: 0, y: 2, z: 1, color: FENCE },
      { id: "f4", x: 1, y: 2, z: 1, color: FENCE },
      { id: "f5", x: 2, y: 2, z: 1, color: FENCE },
      { id: "s0", x: 0, y: 1, z: 1, color: FENCE, isNew: true },
      { id: "s1", x: 2, y: 1, z: 1, color: FENCE, isNew: true },
    ],
  },
];

/** vol06 トロッコライド */
export const vol06Steps: Step[] = [
  {
    stepNumber: 1, totalSteps: 3, label: "てつのインゴットを つくろう（おうちのひとと）",
    parts: [{ color: IRON, label: "てつのインゴット (Iron Ingot)", count: 11 }],
    blocks: [
      { id: "s0", x: 0, y: 0, z: 0, color: STONE, isNew: true },
      { id: "s1", x: 1, y: 0, z: 0, color: STONE, isNew: true },
      { id: "s2", x: 0, y: 1, z: 0, color: STONE, isNew: true },
      { id: "s3", x: 1, y: 1, z: 0, color: STONE, isNew: true },
      { id: "k0", x: 0, y: 0, z: 1, color: COBBLE, isNew: true },
    ],
  },
  {
    stepNumber: 2, totalSteps: 3, label: "レールと トロッコを つくろう",
    parts: [{ color: RAIL, label: "レール (Rail)", count: 6 }, { color: IRON, label: "トロッコ (Minecart)", count: 1 }],
    blocks: [
      { id: "g0", x: 0, y: 0, z: 0, color: DIRT },
      { id: "g1", x: 1, y: 0, z: 0, color: DIRT },
      { id: "g2", x: 2, y: 0, z: 0, color: DIRT },
      { id: "g3", x: 3, y: 0, z: 0, color: DIRT },
      { id: "r0", x: 0, y: 0, z: 1, color: RAIL, isNew: true },
      { id: "r1", x: 1, y: 0, z: 1, color: RAIL, isNew: true },
      { id: "r2", x: 2, y: 0, z: 1, color: RAIL, isNew: true },
      { id: "r3", x: 3, y: 0, z: 1, color: RAIL, isNew: true },
    ],
  },
  {
    stepNumber: 3, totalSteps: 3, label: "トロッコライドかんせい！",
    parts: [{ color: IRON, label: "トロッコ (Minecart)", count: 1 }],
    blocks: [
      { id: "g0", x: 0, y: 0, z: 0, color: DIRT },
      { id: "g1", x: 1, y: 0, z: 0, color: DIRT },
      { id: "g2", x: 2, y: 0, z: 0, color: DIRT },
      { id: "g3", x: 3, y: 0, z: 0, color: DIRT },
      { id: "r0", x: 0, y: 0, z: 1, color: RAIL },
      { id: "r1", x: 1, y: 0, z: 1, color: RAIL },
      { id: "r2", x: 2, y: 0, z: 1, color: RAIL },
      { id: "r3", x: 3, y: 0, z: 1, color: RAIL },
      { id: "mc", x: 1, y: 0, z: 2, color: IRON, isNew: true },
    ],
  },
];

/** vol07 ウォータースライダー */
export const vol07Steps: Step[] = [
  {
    stepNumber: 1, totalSteps: 3, label: "つちを あつめよう",
    parts: [{ color: DIRT, label: "つちブロック (Dirt)", count: 30 }],
    blocks: [
      { id: "d0", x: 0, y: 0, z: 0, color: DIRT, isNew: true },
      { id: "d1", x: 1, y: 0, z: 0, color: DIRT, isNew: true },
      { id: "d2", x: 0, y: 1, z: 0, color: DIRT, isNew: true },
      { id: "d3", x: 1, y: 1, z: 0, color: DIRT, isNew: true },
      { id: "d4", x: 0, y: 0, z: 1, color: DIRT, isNew: true },
      { id: "d5", x: 1, y: 0, z: 1, color: DIRT, isNew: true },
    ],
  },
  {
    stepNumber: 2, totalSteps: 3, label: "バケツを つくろう（おうちのひとと）",
    recipes: [R_BUCKET],
    parts: [{ color: IRON, label: "バケツ (Bucket)", count: 1 }],
    blocks: [
      { id: "d0", x: 0, y: 0, z: 0, color: DIRT },
      { id: "d1", x: 1, y: 0, z: 0, color: DIRT },
      { id: "d2", x: 0, y: 1, z: 0, color: DIRT },
      { id: "d3", x: 1, y: 1, z: 0, color: DIRT },
      { id: "d4", x: 0, y: 0, z: 1, color: DIRT },
      { id: "d5", x: 1, y: 0, z: 1, color: DIRT },
      { id: "d6", x: 0, y: 0, z: 2, color: DIRT, isNew: true },
      { id: "d7", x: 1, y: 0, z: 2, color: DIRT, isNew: true },
    ],
  },
  {
    stepNumber: 3, totalSteps: 3, label: "ウォータースライダーかんせい！",
    parts: [{ color: WATER, label: "みず (Water)（バケツ1こ）", count: 1 }],
    blocks: [
      { id: "d0", x: 0, y: 0, z: 0, color: DIRT },
      { id: "d1", x: 1, y: 0, z: 0, color: DIRT },
      { id: "d2", x: 0, y: 1, z: 0, color: DIRT },
      { id: "d3", x: 1, y: 1, z: 0, color: DIRT },
      { id: "d4", x: 0, y: 0, z: 1, color: DIRT },
      { id: "d5", x: 1, y: 0, z: 1, color: DIRT },
      { id: "d6", x: 0, y: 0, z: 2, color: DIRT },
      { id: "d7", x: 1, y: 0, z: 2, color: DIRT },
      { id: "w0", x: 0, y: 0, z: 3, color: WATER, isNew: true },
      { id: "w1", x: 0, y: 1, z: 2, color: WATER, isNew: true },
      { id: "w2", x: 0, y: 2, z: 1, color: WATER, isNew: true },
    ],
  },
];

/** vol08 おとしあな */
export const vol08Steps: Step[] = [
  {
    stepNumber: 1, totalSteps: 3, label: "あなを 1だん ほろう",
    parts: [{ color: DIRT, label: "つち（ほれるよ）", count: 1 }],
    blocks: [
      { id: "g0", x: 0, y: 0, z: 0, color: GRASS, isNew: true },
      { id: "g1", x: 1, y: 0, z: 0, color: GRASS, isNew: true },
      { id: "g2", x: 2, y: 0, z: 0, color: GRASS, isNew: true },
      { id: "g3", x: 0, y: 1, z: 0, color: GRASS, isNew: true },
      { id: "g4", x: 2, y: 1, z: 0, color: GRASS, isNew: true },
      { id: "g5", x: 0, y: 2, z: 0, color: GRASS, isNew: true },
      { id: "g6", x: 1, y: 2, z: 0, color: GRASS, isNew: true },
      { id: "g7", x: 2, y: 2, z: 0, color: GRASS, isNew: true },
    ],
  },
  {
    stepNumber: 2, totalSteps: 3, label: "じゃりを あつめよう",
    parts: [{ color: GRAVEL, label: "じゃり (Gravel)", count: 4 }],
    blocks: [
      { id: "g0", x: 0, y: 0, z: 0, color: GRASS },
      { id: "g1", x: 1, y: 0, z: 0, color: GRASS },
      { id: "g2", x: 2, y: 0, z: 0, color: GRASS },
      { id: "g3", x: 0, y: 1, z: 0, color: GRASS },
      { id: "g4", x: 2, y: 1, z: 0, color: GRASS },
      { id: "g5", x: 0, y: 2, z: 0, color: GRASS },
      { id: "g6", x: 1, y: 2, z: 0, color: GRASS },
      { id: "g7", x: 2, y: 2, z: 0, color: GRASS },
      { id: "gv", x: 1, y: 1, z: 0, color: GRAVEL, isNew: true },
    ],
  },
  {
    stepNumber: 3, totalSteps: 3, label: "じゃりを あなに おとそう！",
    parts: [{ color: GRAVEL, label: "じゃり (Gravel)（おちるよ！）", count: 1 }],
    blocks: [
      { id: "g0", x: 0, y: 0, z: 0, color: GRASS },
      { id: "g1", x: 1, y: 0, z: 0, color: GRASS },
      { id: "g2", x: 2, y: 0, z: 0, color: GRASS },
      { id: "g3", x: 0, y: 1, z: 0, color: GRASS },
      { id: "g4", x: 2, y: 1, z: 0, color: GRASS },
      { id: "g5", x: 0, y: 2, z: 0, color: GRASS },
      { id: "g6", x: 1, y: 2, z: 0, color: GRASS },
      { id: "g7", x: 2, y: 2, z: 0, color: GRASS },
      { id: "gv0", x: 1, y: 1, z: 0, color: GRAVEL },
      { id: "gv1", x: 1, y: 1, z: 1, color: GRAVEL, isNew: true },
    ],
  },
];

/** vol09 つりぼり */
export const vol09Steps: Step[] = [
  {
    stepNumber: 1, totalSteps: 3, label: "いけを ほろう・みずをいれよう",
    recipes: [R_BUCKET],
    parts: [{ color: WATER, label: "みず (Water)（いけにいれよう）", count: 1 }],
    blocks: [
      { id: "w0", x: 0, y: 0, z: 0, color: WATER, isNew: true },
      { id: "w1", x: 1, y: 0, z: 0, color: WATER, isNew: true },
      { id: "w2", x: 2, y: 0, z: 0, color: WATER, isNew: true },
      { id: "w3", x: 0, y: 1, z: 0, color: WATER, isNew: true },
      { id: "w4", x: 1, y: 1, z: 0, color: WATER, isNew: true },
      { id: "w5", x: 2, y: 1, z: 0, color: WATER, isNew: true },
    ],
  },
  {
    stepNumber: 2, totalSteps: 3, label: "つりざおを つくろう",
    recipes: [R_TABLE, R_STICK, R_FISHING_ROD],
    parts: [{ color: STICK, label: "つりざお (Fishing Rod)", count: 1 }],
    blocks: [
      { id: "w0", x: 0, y: 0, z: 0, color: WATER },
      { id: "w1", x: 1, y: 0, z: 0, color: WATER },
      { id: "w2", x: 2, y: 0, z: 0, color: WATER },
      { id: "w3", x: 0, y: 1, z: 0, color: WATER },
      { id: "w4", x: 1, y: 1, z: 0, color: WATER },
      { id: "w5", x: 2, y: 1, z: 0, color: WATER },
      { id: "d0", x: 0, y: 2, z: 1, color: PLANK, isNew: true },
      { id: "d1", x: 1, y: 2, z: 1, color: PLANK, isNew: true },
      { id: "d2", x: 2, y: 2, z: 1, color: PLANK, isNew: true },
    ],
  },
  {
    stepNumber: 3, totalSteps: 3, label: "つりぼりかんせい！",
    parts: [{ color: PLANK, label: "どっく（いた）", count: 3 }],
    blocks: [
      { id: "w0", x: 0, y: 0, z: 0, color: WATER },
      { id: "w1", x: 1, y: 0, z: 0, color: WATER },
      { id: "w2", x: 2, y: 0, z: 0, color: WATER },
      { id: "w3", x: 0, y: 1, z: 0, color: WATER },
      { id: "w4", x: 1, y: 1, z: 0, color: WATER },
      { id: "w5", x: 2, y: 1, z: 0, color: WATER },
      { id: "d0", x: 0, y: 2, z: 1, color: PLANK },
      { id: "d1", x: 1, y: 2, z: 1, color: PLANK },
      { id: "d2", x: 2, y: 2, z: 1, color: PLANK },
      { id: "d3", x: 0, y: 2, z: 2, color: PLANK, isNew: true },
      { id: "d4", x: 1, y: 2, z: 2, color: PLANK, isNew: true },
      { id: "d5", x: 2, y: 2, z: 2, color: PLANK, isNew: true },
    ],
  },
];

/** vol10 はたけ */
export const vol10Steps: Step[] = [
  {
    stepNumber: 1, totalSteps: 3, label: "きのくわを つくろう",
    recipes: [R_TABLE, R_STICK, R_HOE],
    parts: [{ color: PLANK, label: "きのくわ (Wooden Hoe)", count: 1 }],
    blocks: [
      { id: "f0", x: 0, y: 0, z: 0, color: FARMLAND, isNew: true },
      { id: "f1", x: 1, y: 0, z: 0, color: FARMLAND, isNew: true },
      { id: "f2", x: 2, y: 0, z: 0, color: FARMLAND, isNew: true },
      { id: "f3", x: 3, y: 0, z: 0, color: FARMLAND, isNew: true },
    ],
  },
  {
    stepNumber: 2, totalSteps: 3, label: "みずみちと はたけを つくろう",
    parts: [{ color: FARMLAND, label: "たがやしたつち (Farmland)", count: 8 }],
    blocks: [
      { id: "f0", x: 0, y: 0, z: 0, color: FARMLAND },
      { id: "f1", x: 1, y: 0, z: 0, color: FARMLAND },
      { id: "f2", x: 2, y: 0, z: 0, color: FARMLAND },
      { id: "f3", x: 3, y: 0, z: 0, color: FARMLAND },
      { id: "f4", x: 0, y: 1, z: 0, color: FARMLAND, isNew: true },
      { id: "f5", x: 1, y: 1, z: 0, color: FARMLAND, isNew: true },
      { id: "f6", x: 2, y: 1, z: 0, color: FARMLAND, isNew: true },
      { id: "f7", x: 3, y: 1, z: 0, color: FARMLAND, isNew: true },
      { id: "wr", x: 4, y: 0, z: 0, color: WATER, isNew: true },
    ],
  },
  {
    stepNumber: 3, totalSteps: 3, label: "たねを うえよう！",
    parts: [{ color: WHEAT, label: "たね (Wheat Seeds)", count: 8 }],
    blocks: [
      { id: "f0", x: 0, y: 0, z: 0, color: FARMLAND },
      { id: "f1", x: 1, y: 0, z: 0, color: FARMLAND },
      { id: "f2", x: 2, y: 0, z: 0, color: FARMLAND },
      { id: "f3", x: 3, y: 0, z: 0, color: FARMLAND },
      { id: "f4", x: 0, y: 1, z: 0, color: FARMLAND },
      { id: "f5", x: 1, y: 1, z: 0, color: FARMLAND },
      { id: "f6", x: 2, y: 1, z: 0, color: FARMLAND },
      { id: "f7", x: 3, y: 1, z: 0, color: FARMLAND },
      { id: "wr", x: 4, y: 0, z: 0, color: WATER },
      { id: "w0", x: 0, y: 0, z: 1, color: WHEAT, isNew: true },
      { id: "w1", x: 1, y: 0, z: 1, color: WHEAT, isNew: true },
      { id: "w2", x: 2, y: 0, z: 1, color: WHEAT, isNew: true },
      { id: "w3", x: 3, y: 0, z: 1, color: WHEAT, isNew: true },
    ],
  },
];

/** vol11 パンやさん */
export const vol11Steps: Step[] = [
  {
    stepNumber: 1, totalSteps: 3, label: "パンを つくろう",
    recipes: [R_TABLE, R_BREAD],
    parts: [{ color: "#C47B30", label: "パン (Bread)", count: 3 }],
    blocks: [
      { id: "t0", x: 1, y: 0, z: 0, color: TABLE, isNew: true },
      { id: "b0", x: 0, y: 0, z: 1, color: "#C47B30", isNew: true },
      { id: "b1", x: 1, y: 0, z: 1, color: "#C47B30", isNew: true },
      { id: "b2", x: 2, y: 0, z: 1, color: "#C47B30", isNew: true },
    ],
  },
  {
    stepNumber: 2, totalSteps: 3, label: "かんばんを つくろう",
    recipes: [R_SIGN],
    parts: [{ color: PLANK, label: "かんばん (Oak Sign)", count: 2 }],
    blocks: [
      { id: "t0", x: 1, y: 0, z: 0, color: TABLE },
      { id: "b0", x: 0, y: 0, z: 1, color: "#C47B30" },
      { id: "b1", x: 1, y: 0, z: 1, color: "#C47B30" },
      { id: "b2", x: 2, y: 0, z: 1, color: "#C47B30" },
      { id: "s0", x: 0, y: 1, z: 1, color: PLANK, isNew: true },
      { id: "s1", x: 2, y: 1, z: 1, color: PLANK, isNew: true },
    ],
  },
  {
    stepNumber: 3, totalSteps: 3, label: "パンやさんかんせい！",
    parts: [{ color: "#C47B30", label: "パンを ならべよう", count: 3 }],
    blocks: [
      { id: "t0", x: 1, y: 0, z: 0, color: TABLE },
      { id: "b0", x: 0, y: 0, z: 1, color: "#C47B30" },
      { id: "b1", x: 1, y: 0, z: 1, color: "#C47B30" },
      { id: "b2", x: 2, y: 0, z: 1, color: "#C47B30" },
      { id: "s0", x: 0, y: 1, z: 1, color: PLANK },
      { id: "s1", x: 2, y: 1, z: 1, color: PLANK },
      { id: "r0", x: 0, y: 0, z: 2, color: PLANK, isNew: true },
      { id: "r1", x: 1, y: 0, z: 2, color: PLANK, isNew: true },
      { id: "r2", x: 2, y: 0, z: 2, color: PLANK, isNew: true },
    ],
  },
];

/** vol12 うまぼくじょう */
export const vol12Steps: Step[] = [
  {
    stepNumber: 1, totalSteps: 3, label: "さくを つくろう",
    recipes: [R_TABLE, R_PLANK, R_STICK, R_FENCE],
    parts: [{ color: FENCE, label: "さく (Oak Fence)", count: 24 }],
    blocks: [
      { id: "g0", x: 0, y: 0, z: 0, color: GRASS, isNew: true },
      { id: "g1", x: 1, y: 0, z: 0, color: GRASS, isNew: true },
      { id: "g2", x: 2, y: 0, z: 0, color: GRASS, isNew: true },
      { id: "g3", x: 0, y: 2, z: 0, color: GRASS, isNew: true },
      { id: "g4", x: 2, y: 2, z: 0, color: GRASS, isNew: true },
    ],
  },
  {
    stepNumber: 2, totalSteps: 3, label: "さくのとびらを つくろう",
    recipes: [R_FENCE_GATE],
    parts: [{ color: FENCE, label: "さくのとびら (Oak Fence Gate)", count: 1 }],
    blocks: [
      { id: "g0", x: 0, y: 0, z: 0, color: GRASS },
      { id: "g1", x: 1, y: 0, z: 0, color: GRASS },
      { id: "g2", x: 2, y: 0, z: 0, color: GRASS },
      { id: "g3", x: 0, y: 2, z: 0, color: GRASS },
      { id: "g4", x: 2, y: 2, z: 0, color: GRASS },
      { id: "f0", x: 0, y: 0, z: 1, color: FENCE, isNew: true },
      { id: "f1", x: 2, y: 0, z: 1, color: FENCE, isNew: true },
      { id: "f2", x: 0, y: 2, z: 1, color: FENCE, isNew: true },
      { id: "f3", x: 2, y: 2, z: 1, color: FENCE, isNew: true },
      { id: "f4", x: 1, y: 2, z: 1, color: FENCE, isNew: true },
    ],
  },
  {
    stepNumber: 3, totalSteps: 3, label: "うまぼくじょうかんせい！",
    parts: [{ color: FENCE, label: "さく (Oak Fence)（のこり）", count: 6 }],
    blocks: [
      { id: "g0", x: 0, y: 0, z: 0, color: GRASS },
      { id: "g1", x: 1, y: 0, z: 0, color: GRASS },
      { id: "g2", x: 2, y: 0, z: 0, color: GRASS },
      { id: "g3", x: 0, y: 2, z: 0, color: GRASS },
      { id: "g4", x: 2, y: 2, z: 0, color: GRASS },
      { id: "f0", x: 0, y: 0, z: 1, color: FENCE },
      { id: "f1", x: 2, y: 0, z: 1, color: FENCE },
      { id: "f2", x: 0, y: 2, z: 1, color: FENCE },
      { id: "f3", x: 2, y: 2, z: 1, color: FENCE },
      { id: "f4", x: 1, y: 2, z: 1, color: FENCE },
      { id: "f5", x: 1, y: 0, z: 1, color: FENCE, isNew: true },
      { id: "f6", x: 0, y: 1, z: 1, color: FENCE, isNew: true },
      { id: "f7", x: 2, y: 1, z: 1, color: FENCE, isNew: true },
    ],
  },
];

/** vol13 オオカミとなかよし */
export const vol13Steps: Step[] = [
  {
    stepNumber: 1, totalSteps: 3, label: "いぬごやを つくろう",
    recipes: [R_PLANK, R_TABLE],
    parts: [{ color: PLANK, label: "いた (Oak Planks)", count: 16 }],
    blocks: [
      { id: "f0", x: 0, y: 0, z: 0, color: PLANK, isNew: true },
      { id: "f1", x: 1, y: 0, z: 0, color: PLANK, isNew: true },
      { id: "f2", x: 0, y: 1, z: 0, color: PLANK, isNew: true },
      { id: "f3", x: 1, y: 1, z: 0, color: PLANK, isNew: true },
      { id: "w0", x: 0, y: 0, z: 1, color: PLANK, isNew: true },
      { id: "w1", x: 1, y: 0, z: 1, color: PLANK, isNew: true },
    ],
  },
  {
    stepNumber: 2, totalSteps: 3, label: "オオカミを さがそう",
    parts: [{ color: WOLF, label: "ほね (Bone)（オオカミにあげよう）", count: 5 }],
    blocks: [
      { id: "f0", x: 0, y: 0, z: 0, color: PLANK },
      { id: "f1", x: 1, y: 0, z: 0, color: PLANK },
      { id: "f2", x: 0, y: 1, z: 0, color: PLANK },
      { id: "f3", x: 1, y: 1, z: 0, color: PLANK },
      { id: "w0", x: 0, y: 0, z: 1, color: PLANK },
      { id: "w1", x: 1, y: 0, z: 1, color: PLANK },
      { id: "r0", x: 0, y: 0, z: 2, color: LOG, isNew: true },
      { id: "r1", x: 1, y: 0, z: 2, color: LOG, isNew: true },
    ],
  },
  {
    stepNumber: 3, totalSteps: 3, label: "なかまに なれた！",
    parts: [{ color: WOLF, label: "オオカミ (Wolf)（なかま）", count: 1 }],
    blocks: [
      { id: "f0", x: 0, y: 0, z: 0, color: PLANK },
      { id: "f1", x: 1, y: 0, z: 0, color: PLANK },
      { id: "f2", x: 0, y: 1, z: 0, color: PLANK },
      { id: "f3", x: 1, y: 1, z: 0, color: PLANK },
      { id: "w0", x: 0, y: 0, z: 1, color: PLANK },
      { id: "w1", x: 1, y: 0, z: 1, color: PLANK },
      { id: "r0", x: 0, y: 0, z: 2, color: LOG },
      { id: "r1", x: 1, y: 0, z: 2, color: LOG },
      { id: "wf", x: 2, y: 0, z: 1, color: WOLF, isNew: true },
    ],
  },
];

/** vol14 たからさがし */
export const vol14Steps: Step[] = [
  {
    stepNumber: 1, totalSteps: 3, label: "つるはしを つくろう",
    recipes: [R_TABLE, R_PLANK, R_STICK, R_PICKAXE_WOOD],
    parts: [{ color: PLANK, label: "きのつるはし (Wooden Pickaxe)", count: 1 }],
    blocks: [
      { id: "s0", x: 0, y: 0, z: 0, color: STONE, isNew: true },
      { id: "s1", x: 1, y: 0, z: 0, color: STONE, isNew: true },
      { id: "s2", x: 0, y: 1, z: 0, color: STONE, isNew: true },
    ],
  },
  {
    stepNumber: 2, totalSteps: 3, label: "たいまつと いしのつるはしを つくろう",
    recipes: [R_TORCH, R_PICKAXE_STONE],
    parts: [{ color: TORCH, label: "たいまつ (Torch)", count: 4 }, { color: COBBLE, label: "いしのつるはし (Stone Pickaxe)", count: 1 }],
    blocks: [
      { id: "s0", x: 0, y: 0, z: 0, color: STONE },
      { id: "s1", x: 1, y: 0, z: 0, color: STONE },
      { id: "s2", x: 0, y: 1, z: 0, color: STONE },
      { id: "s3", x: 0, y: 0, z: 1, color: COBBLE, isNew: true },
      { id: "t0", x: 1, y: 0, z: 1, color: TORCH, isNew: true },
    ],
  },
  {
    stepNumber: 3, totalSteps: 3, label: "トンネルを ほって たからをさがそう！",
    parts: [{ color: IRON, label: "てっこうせき (Iron Ore)", count: 1 }],
    blocks: [
      { id: "s0", x: 0, y: 0, z: 0, color: STONE },
      { id: "s1", x: 1, y: 0, z: 0, color: STONE },
      { id: "s2", x: 0, y: 1, z: 0, color: STONE },
      { id: "s3", x: 0, y: 0, z: 1, color: COBBLE },
      { id: "t0", x: 1, y: 0, z: 1, color: TORCH },
      { id: "or", x: 2, y: 0, z: 0, color: "#AA8855", isNew: true },
      { id: "t1", x: 2, y: 0, z: 1, color: TORCH, isNew: true },
      { id: "t2", x: 3, y: 0, z: 1, color: TORCH, isNew: true },
    ],
  },
];

/** vol15 マグマかんさつだい */
export const vol15Steps: Step[] = [
  {
    stepNumber: 1, totalSteps: 3, label: "ガラスパネルを つくろう（おうちのひとと）",
    recipes: [R_GLASS_PANE],
    parts: [{ color: GLASS, label: "ガラスパネル (Glass Pane)", count: 8 }],
    blocks: [
      { id: "s0", x: 0, y: 0, z: 0, color: COBBLE, isNew: true },
      { id: "s1", x: 1, y: 0, z: 0, color: COBBLE, isNew: true },
      { id: "s2", x: 2, y: 0, z: 0, color: COBBLE, isNew: true },
      { id: "s3", x: 0, y: 1, z: 0, color: COBBLE, isNew: true },
      { id: "s4", x: 2, y: 1, z: 0, color: COBBLE, isNew: true },
    ],
  },
  {
    stepNumber: 2, totalSteps: 3, label: "かんさつだいの ゆかと かべを おこう",
    parts: [{ color: COBBLE, label: "まるいし (Cobblestone)", count: 8 }],
    blocks: [
      { id: "s0", x: 0, y: 0, z: 0, color: COBBLE },
      { id: "s1", x: 1, y: 0, z: 0, color: COBBLE },
      { id: "s2", x: 2, y: 0, z: 0, color: COBBLE },
      { id: "s3", x: 0, y: 1, z: 0, color: COBBLE },
      { id: "s4", x: 2, y: 1, z: 0, color: COBBLE },
      { id: "w0", x: 0, y: 0, z: 1, color: COBBLE, isNew: true },
      { id: "w1", x: 1, y: 0, z: 1, color: GLASS, isNew: true },
      { id: "w2", x: 2, y: 0, z: 1, color: COBBLE, isNew: true },
    ],
  },
  {
    stepNumber: 3, totalSteps: 3, label: "マグマを みよう！",
    parts: [{ color: LAVA, label: "マグマ（ちかに あるよ）", count: 1 }],
    blocks: [
      { id: "s0", x: 0, y: 0, z: 0, color: COBBLE },
      { id: "s1", x: 1, y: 0, z: 0, color: COBBLE },
      { id: "s2", x: 2, y: 0, z: 0, color: COBBLE },
      { id: "s3", x: 0, y: 1, z: 0, color: COBBLE },
      { id: "s4", x: 2, y: 1, z: 0, color: COBBLE },
      { id: "w0", x: 0, y: 0, z: 1, color: COBBLE },
      { id: "w1", x: 1, y: 0, z: 1, color: GLASS },
      { id: "w2", x: 2, y: 0, z: 1, color: COBBLE },
      { id: "lv", x: 3, y: 0, z: 0, color: LAVA, isNew: true },
    ],
  },
];

/** vol16 ゆきぐに */
export const vol16Steps: Step[] = [
  {
    stepNumber: 1, totalSteps: 3, label: "ゆきだまを あつめよう",
    recipes: [R_SNOW_BLOCK],
    parts: [{ color: SNOW, label: "スノーブロック (Snow Block)", count: 8 }],
    blocks: [
      { id: "s0", x: 0, y: 0, z: 0, color: SNOW, isNew: true },
      { id: "s1", x: 1, y: 0, z: 0, color: SNOW, isNew: true },
      { id: "s2", x: 2, y: 0, z: 0, color: SNOW, isNew: true },
      { id: "s3", x: 0, y: 2, z: 0, color: SNOW, isNew: true },
      { id: "s4", x: 2, y: 2, z: 0, color: SNOW, isNew: true },
    ],
  },
  {
    stepNumber: 2, totalSteps: 3, label: "こおりを あつめよう",
    recipes: [R_SHOVEL],
    parts: [{ color: ICE, label: "パックドアイス (Packed Ice)", count: 9 }],
    blocks: [
      { id: "i0", x: 0, y: 0, z: 0, color: ICE, isNew: true },
      { id: "i1", x: 1, y: 0, z: 0, color: ICE, isNew: true },
      { id: "i2", x: 2, y: 0, z: 0, color: ICE, isNew: true },
      { id: "i3", x: 0, y: 1, z: 0, color: ICE, isNew: true },
      { id: "i4", x: 1, y: 1, z: 0, color: ICE, isNew: true },
      { id: "i5", x: 2, y: 1, z: 0, color: ICE, isNew: true },
    ],
  },
  {
    stepNumber: 3, totalSteps: 3, label: "イグルーかんせい！",
    parts: [{ color: SNOW, label: "スノーブロック (Snow Block)（かべ）", count: 8 }],
    blocks: [
      { id: "i0", x: 0, y: 0, z: 0, color: ICE },
      { id: "i1", x: 1, y: 0, z: 0, color: ICE },
      { id: "i2", x: 2, y: 0, z: 0, color: ICE },
      { id: "i3", x: 0, y: 1, z: 0, color: ICE },
      { id: "i4", x: 1, y: 1, z: 0, color: ICE },
      { id: "i5", x: 2, y: 1, z: 0, color: ICE },
      { id: "s0", x: 0, y: 0, z: 1, color: SNOW, isNew: true },
      { id: "s1", x: 1, y: 0, z: 1, color: SNOW, isNew: true },
      { id: "s2", x: 2, y: 0, z: 1, color: SNOW, isNew: true },
      { id: "s3", x: 0, y: 1, z: 1, color: SNOW, isNew: true },
      { id: "s4", x: 2, y: 1, z: 1, color: SNOW, isNew: true },
      { id: "s5", x: 1, y: 0, z: 2, color: SNOW, isNew: true },
    ],
  },
];

/** vol17 うみのたんけん */
export const vol17Steps: Step[] = [
  {
    stepNumber: 1, totalSteps: 3, label: "ガラスと ドアを つくろう（おうちのひとと）",
    recipes: [R_GLASS_PANE, R_TABLE, R_DOOR],
    parts: [{ color: GLASS, label: "ガラス (Glass)", count: 6 }, { color: DOOR, label: "ドア (Oak Door)", count: 1 }],
    blocks: [
      { id: "w0", x: 0, y: 0, z: 0, color: WATER, isNew: true },
      { id: "w1", x: 1, y: 0, z: 0, color: WATER, isNew: true },
      { id: "w2", x: 2, y: 0, z: 0, color: WATER, isNew: true },
      { id: "w3", x: 0, y: 1, z: 0, color: WATER, isNew: true },
      { id: "w4", x: 1, y: 1, z: 0, color: WATER, isNew: true },
      { id: "w5", x: 2, y: 1, z: 0, color: WATER, isNew: true },
    ],
  },
  {
    stepNumber: 2, totalSteps: 3, label: "かんさつしつの かべを おこう",
    parts: [{ color: GLASS, label: "ガラスパネル (Glass Pane)", count: 8 }],
    blocks: [
      { id: "w0", x: 0, y: 0, z: 0, color: WATER },
      { id: "w1", x: 1, y: 0, z: 0, color: WATER },
      { id: "w2", x: 2, y: 0, z: 0, color: WATER },
      { id: "w3", x: 0, y: 1, z: 0, color: WATER },
      { id: "w4", x: 1, y: 1, z: 0, color: WATER },
      { id: "w5", x: 2, y: 1, z: 0, color: WATER },
      { id: "g0", x: 0, y: 0, z: 1, color: GLASS, isNew: true },
      { id: "g1", x: 1, y: 0, z: 1, color: GLASS, isNew: true },
      { id: "g2", x: 2, y: 0, z: 1, color: GLASS, isNew: true },
      { id: "g3", x: 0, y: 1, z: 1, color: GLASS, isNew: true },
      { id: "g4", x: 2, y: 1, z: 1, color: GLASS, isNew: true },
    ],
  },
  {
    stepNumber: 3, totalSteps: 3, label: "うみのかんさつしつかんせい！",
    parts: [{ color: GRAVEL, label: "じゃり (Gravel)（ふた）", count: 9 }],
    blocks: [
      { id: "w0", x: 0, y: 0, z: 0, color: WATER },
      { id: "w1", x: 1, y: 0, z: 0, color: WATER },
      { id: "w2", x: 2, y: 0, z: 0, color: WATER },
      { id: "w3", x: 0, y: 1, z: 0, color: WATER },
      { id: "w4", x: 1, y: 1, z: 0, color: WATER },
      { id: "w5", x: 2, y: 1, z: 0, color: WATER },
      { id: "g0", x: 0, y: 0, z: 1, color: GLASS },
      { id: "g1", x: 1, y: 0, z: 1, color: GLASS },
      { id: "g2", x: 2, y: 0, z: 1, color: GLASS },
      { id: "g3", x: 0, y: 1, z: 1, color: GLASS },
      { id: "g4", x: 2, y: 1, z: 1, color: GLASS },
      { id: "d0", x: 1, y: 1, z: 1, color: DOOR, isNew: true },
      { id: "r0", x: 0, y: 0, z: 2, color: GRAVEL, isNew: true },
      { id: "r1", x: 1, y: 0, z: 2, color: GRAVEL, isNew: true },
      { id: "r2", x: 2, y: 0, z: 2, color: GRAVEL, isNew: true },
    ],
  },
];

/** vol18 むらたんけん */
export const vol18Steps: Step[] = [
  {
    stepNumber: 1, totalSteps: 3, label: "かんばんと チェストを つくろう",
    recipes: [R_TABLE, R_PLANK, R_SIGN, R_CHEST],
    parts: [{ color: PLANK, label: "かんばん (Oak Sign)", count: 2 }, { color: CHEST, label: "チェスト (Chest)", count: 1 }],
    blocks: [
      { id: "f0", x: 0, y: 0, z: 0, color: PLANK, isNew: true },
      { id: "f1", x: 1, y: 0, z: 0, color: PLANK, isNew: true },
      { id: "f2", x: 2, y: 0, z: 0, color: PLANK, isNew: true },
      { id: "ch", x: 1, y: 0, z: 1, color: CHEST, isNew: true },
    ],
  },
  {
    stepNumber: 2, totalSteps: 3, label: "いちばの かんばんを たてよう",
    parts: [{ color: PLANK, label: "かんばん (Oak Sign)", count: 2 }],
    blocks: [
      { id: "f0", x: 0, y: 0, z: 0, color: PLANK },
      { id: "f1", x: 1, y: 0, z: 0, color: PLANK },
      { id: "f2", x: 2, y: 0, z: 0, color: PLANK },
      { id: "ch", x: 1, y: 0, z: 1, color: CHEST },
      { id: "s0", x: 0, y: 1, z: 1, color: PLANK, isNew: true },
      { id: "s1", x: 2, y: 1, z: 1, color: PLANK, isNew: true },
    ],
  },
  {
    stepNumber: 3, totalSteps: 3, label: "いちばかんせい！",
    parts: [{ color: PLANK, label: "やね（いた）", count: 3 }],
    blocks: [
      { id: "f0", x: 0, y: 0, z: 0, color: PLANK },
      { id: "f1", x: 1, y: 0, z: 0, color: PLANK },
      { id: "f2", x: 2, y: 0, z: 0, color: PLANK },
      { id: "ch", x: 1, y: 0, z: 1, color: CHEST },
      { id: "s0", x: 0, y: 1, z: 1, color: PLANK },
      { id: "s1", x: 2, y: 1, z: 1, color: PLANK },
      { id: "r0", x: 0, y: 0, z: 2, color: LOG, isNew: true },
      { id: "r1", x: 1, y: 0, z: 2, color: LOG, isNew: true },
      { id: "r2", x: 2, y: 0, z: 2, color: LOG, isNew: true },
    ],
  },
];

/** vol19 たからばこ */
export const vol19Steps: Step[] = [
  {
    stepNumber: 1, totalSteps: 3, label: "チェストを 6こ つくろう",
    recipes: [R_TABLE, R_PLANK, R_CHEST],
    parts: [{ color: CHEST, label: "チェスト (Chest)", count: 6 }],
    blocks: [
      { id: "c0", x: 0, y: 0, z: 0, color: CHEST, isNew: true },
      { id: "c1", x: 1, y: 0, z: 0, color: CHEST, isNew: true },
      { id: "c2", x: 2, y: 0, z: 0, color: CHEST, isNew: true },
    ],
  },
  {
    stepNumber: 2, totalSteps: 3, label: "かんばんを つくろう",
    recipes: [R_SIGN],
    parts: [{ color: PLANK, label: "かんばん (Oak Sign)", count: 6 }],
    blocks: [
      { id: "c0", x: 0, y: 0, z: 0, color: CHEST },
      { id: "c1", x: 1, y: 0, z: 0, color: CHEST },
      { id: "c2", x: 2, y: 0, z: 0, color: CHEST },
      { id: "c3", x: 0, y: 1, z: 0, color: CHEST, isNew: true },
      { id: "c4", x: 1, y: 1, z: 0, color: CHEST, isNew: true },
      { id: "c5", x: 2, y: 1, z: 0, color: CHEST, isNew: true },
    ],
  },
  {
    stepNumber: 3, totalSteps: 3, label: "しゅうのうへやかんせい！",
    parts: [{ color: PLANK, label: "かんばん (Oak Sign)（チェストの上に）", count: 6 }],
    blocks: [
      { id: "c0", x: 0, y: 0, z: 0, color: CHEST },
      { id: "c1", x: 1, y: 0, z: 0, color: CHEST },
      { id: "c2", x: 2, y: 0, z: 0, color: CHEST },
      { id: "c3", x: 0, y: 1, z: 0, color: CHEST },
      { id: "c4", x: 1, y: 1, z: 0, color: CHEST },
      { id: "c5", x: 2, y: 1, z: 0, color: CHEST },
      { id: "s0", x: 0, y: 0, z: 1, color: PLANK, isNew: true },
      { id: "s1", x: 1, y: 0, z: 1, color: PLANK, isNew: true },
      { id: "s2", x: 2, y: 0, z: 1, color: PLANK, isNew: true },
    ],
  },
];

/** vol20 しかけランド */
export const vol20Steps: Step[] = [
  {
    stepNumber: 1, totalSteps: 3, label: "マスターマップを みよう",
    parts: [{ color: GRASS, label: "ぜんぶの しかけが あつまるよ！", count: 20 }],
    blocks: [
      { id: "g0", x: 0, y: 0, z: 0, color: GRASS, isNew: true },
      { id: "g1", x: 1, y: 0, z: 0, color: GRASS, isNew: true },
      { id: "g2", x: 2, y: 0, z: 0, color: GRASS, isNew: true },
      { id: "g3", x: 0, y: 1, z: 0, color: WATER, isNew: true },
      { id: "g4", x: 1, y: 1, z: 0, color: FARMLAND, isNew: true },
      { id: "g5", x: 2, y: 1, z: 0, color: SNOW, isNew: true },
    ],
  },
  {
    stepNumber: 2, totalSteps: 3, label: "えりあを くぎって つくろう",
    parts: [{ color: FENCE, label: "さく (Oak Fence)（えりあわけ）", count: 40 }],
    blocks: [
      { id: "g0", x: 0, y: 0, z: 0, color: GRASS },
      { id: "g1", x: 1, y: 0, z: 0, color: GRASS },
      { id: "g2", x: 2, y: 0, z: 0, color: GRASS },
      { id: "g3", x: 0, y: 1, z: 0, color: WATER },
      { id: "g4", x: 1, y: 1, z: 0, color: FARMLAND },
      { id: "g5", x: 2, y: 1, z: 0, color: SNOW },
      { id: "f0", x: 0, y: 0, z: 1, color: FENCE, isNew: true },
      { id: "f1", x: 1, y: 0, z: 1, color: FENCE, isNew: true },
      { id: "f2", x: 2, y: 0, z: 1, color: FENCE, isNew: true },
      { id: "f3", x: 0, y: 2, z: 1, color: FENCE, isNew: true },
      { id: "f4", x: 1, y: 2, z: 1, color: FENCE, isNew: true },
      { id: "f5", x: 2, y: 2, z: 1, color: FENCE, isNew: true },
    ],
  },
  {
    stepNumber: 3, totalSteps: 3, label: "しかけランド ぜんかんかんせい！！",
    parts: [{ color: "#FFD400", label: "ぜんぶ あつめたよ！", count: 20 }],
    blocks: [
      { id: "g0", x: 0, y: 0, z: 0, color: GRASS },
      { id: "g1", x: 1, y: 0, z: 0, color: GRASS },
      { id: "g2", x: 2, y: 0, z: 0, color: GRASS },
      { id: "g3", x: 0, y: 1, z: 0, color: WATER },
      { id: "g4", x: 1, y: 1, z: 0, color: FARMLAND },
      { id: "g5", x: 2, y: 1, z: 0, color: SNOW },
      { id: "f0", x: 0, y: 0, z: 1, color: FENCE },
      { id: "f1", x: 1, y: 0, z: 1, color: FENCE },
      { id: "f2", x: 2, y: 0, z: 1, color: FENCE },
      { id: "f3", x: 0, y: 2, z: 1, color: FENCE },
      { id: "f4", x: 1, y: 2, z: 1, color: FENCE },
      { id: "f5", x: 2, y: 2, z: 1, color: FENCE },
      { id: "tb", x: 1, y: 1, z: 1, color: TABLE, isNew: true },
      { id: "ic", x: 0, y: 1, z: 1, color: CHEST, isNew: true },
      { id: "bd", x: 2, y: 1, z: 1, color: BED, isNew: true },
    ],
  },
];

// ── ボリューム マップ ──────────────────────────────────────────────────────────
export type VolumeId =
  | "vol01" | "vol02" | "vol03" | "vol04" | "vol05"
  | "vol06" | "vol07" | "vol08" | "vol09" | "vol10"
  | "vol11" | "vol12" | "vol13" | "vol14" | "vol15"
  | "vol16" | "vol17" | "vol18" | "vol19" | "vol20";

export type VolumeInfo = {
  id: VolumeId;
  title: string;
  subtitle: string;
  steps: Step[];
};

export const VOLUMES: Record<VolumeId, VolumeInfo> = {
  vol01: { id: "vol01", title: "ひみつきち",         subtitle: "はじめての おうち",       steps: vol01Steps },
  vol02: { id: "vol02", title: "みはりだい",         subtitle: "はしごで のぼれる",       steps: vol02Steps },
  vol03: { id: "vol03", title: "おやすみハウス",     subtitle: "ベッドで ねられる",       steps: vol03Steps },
  vol04: { id: "vol04", title: "ボートひろば",       subtitle: "ボートに のれる",         steps: vol04Steps },
  vol05: { id: "vol05", title: "どうぶつひろば",     subtitle: "どうぶつを つれてこられる",steps: vol05Steps },
  vol06: { id: "vol06", title: "トロッコライド",     subtitle: "トロッコで いどうできる", steps: vol06Steps },
  vol07: { id: "vol07", title: "ウォータースライダー",subtitle: "みずに ながされる",       steps: vol07Steps },
  vol08: { id: "vol08", title: "おとしあな",         subtitle: "じゃりが おちるよ",       steps: vol08Steps },
  vol09: { id: "vol09", title: "つりぼり",           subtitle: "つりが できる",           steps: vol09Steps },
  vol10: { id: "vol10", title: "はたけ",             subtitle: "さくもつが そだつ",       steps: vol10Steps },
  vol11: { id: "vol11", title: "パンやさん",         subtitle: "たべものが できる",       steps: vol11Steps },
  vol12: { id: "vol12", title: "うまぼくじょう",     subtitle: "うまに のれる",           steps: vol12Steps },
  vol13: { id: "vol13", title: "オオカミとなかよし", subtitle: "なかまに なれる",         steps: vol13Steps },
  vol14: { id: "vol14", title: "たからさがし",       subtitle: "こうせきが みつかる",     steps: vol14Steps },
  vol15: { id: "vol15", title: "マグマかんさつだい", subtitle: "マグマが みえる",         steps: vol15Steps },
  vol16: { id: "vol16", title: "ゆきぐに",           subtitle: "ゆきで おうちを つくる",  steps: vol16Steps },
  vol17: { id: "vol17", title: "うみのたんけん",     subtitle: "うみのそこに もぐれる",   steps: vol17Steps },
  vol18: { id: "vol18", title: "むらたんけん",       subtitle: "むらびとと とりひき",     steps: vol18Steps },
  vol19: { id: "vol19", title: "たからばこ",         subtitle: "チェストに しまえる",     steps: vol19Steps },
  vol20: { id: "vol20", title: "しかけランド",       subtitle: "ぜんぶの しかけが あつまった！", steps: vol20Steps },
};

export const VOLUME_IDS = Object.keys(VOLUMES) as VolumeId[];
