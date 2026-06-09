/**
 * item-ids.ts — ゲーム内アイテム名（日本語ラベル）→ Minecraftアイテム情報のマッピング
 */

export type ItemInfo = {
  id: string;        // Minecraft item ID (例: oak_planks)
  en: string;        // 英語表示名
  ja: string;        // 正式な日本語名
  note?: string;     // 入手方法の補足
  giveOk: boolean;   // /give コマンドで渡せるか
};

/** ラベル文字列の前方一致でマッチさせるため、長い文字列を先に定義 */
export const ITEM_MAP: [string, ItemInfo][] = [
  // ── 木材系 ────────────────────────────────────────
  ["まるた",        { id: "oak_log",         en: "Oak Log",          ja: "オークの原木",       giveOk: true }],
  ["いた",          { id: "oak_planks",      en: "Oak Planks",       ja: "オークの板材",       giveOk: true }],
  ["えだ",          { id: "stick",           en: "Stick",            ja: "棒",                 giveOk: true }],
  ["ものづくりだい",{ id: "crafting_table",  en: "Crafting Table",   ja: "作業台",             giveOk: true }],
  ["ドア",          { id: "oak_door",        en: "Oak Door",         ja: "オークのドア",       giveOk: true }],
  ["はしご",        { id: "ladder",          en: "Ladder",           ja: "はしご",             giveOk: true }],
  ["ベッド",        { id: "white_bed",       en: "White Bed",        ja: "白色のベッド",       giveOk: true }],
  ["ボート",        { id: "oak_boat",        en: "Oak Boat",         ja: "オークのボート",     giveOk: true }],
  ["さくのとびら",  { id: "oak_fence_gate",  en: "Oak Fence Gate",   ja: "オークのフェンスの扉", giveOk: true }],
  ["さく",          { id: "oak_fence",       en: "Oak Fence",        ja: "オークのフェンス",   giveOk: true }],
  ["かんばん",      { id: "oak_sign",        en: "Oak Sign",         ja: "オークの看板",       giveOk: true }],
  ["チェスト",      { id: "chest",           en: "Chest",            ja: "チェスト",           giveOk: true }],

  // ── 石材系 ────────────────────────────────────────
  ["まるいし",      { id: "cobblestone",     en: "Cobblestone",      ja: "丸石",               giveOk: true }],
  ["いし",          { id: "stone",           en: "Stone",            ja: "石",                 giveOk: true }],
  ["ガラスパネル",  { id: "glass_pane",      en: "Glass Pane",       ja: "ガラス板",           giveOk: true }],
  ["ガラス",        { id: "glass",           en: "Glass",            ja: "ガラス",             giveOk: true }],

  // ── 土・草系 ──────────────────────────────────────
  ["たがやしたつち",{ id: "farmland",        en: "Farmland",         ja: "耕した土",           giveOk: false,
    note: "クワ（wooden_hoe）で水のそばの土ブロックを右クリックすると作れます。コマンドでは渡せません。" }],
  ["たね",          { id: "wheat_seeds",     en: "Wheat Seeds",      ja: "小麦の種",           giveOk: true,
    note: "草ブロックを壊すと入手できます。" }],
  ["つちブロック",  { id: "dirt",            en: "Dirt",             ja: "土",                 giveOk: true }],
  ["つち",          { id: "dirt",            en: "Dirt",             ja: "土",                 giveOk: true }],
  ["くさブロック",  { id: "grass_block",     en: "Grass Block",      ja: "草ブロック",         giveOk: true }],
  ["じゃり",        { id: "gravel",          en: "Gravel",           ja: "砂利",               giveOk: true }],

  // ── 金属・鉱石系 ──────────────────────────────────
  ["てつのインゴット",{ id: "iron_ingot",    en: "Iron Ingot",       ja: "鉄のインゴット",     giveOk: true,
    note: "かまどで鉄鉱石を焼くと作れます。コマンドでそのまま渡すことも可。" }],
  ["てっこうせき",  { id: "iron_ore",        en: "Iron Ore",         ja: "鉄鉱石",             giveOk: true,
    note: "地下のy=16付近に多く見つかります。" }],

  // ── 道具・武器系 ──────────────────────────────────
  ["バケツ",        { id: "bucket",          en: "Bucket",           ja: "バケツ",             giveOk: true }],
  ["きのつるはし",  { id: "wooden_pickaxe",  en: "Wooden Pickaxe",   ja: "木のツルハシ",       giveOk: true }],
  ["いしのつるはし",{ id: "stone_pickaxe",   en: "Stone Pickaxe",    ja: "石のツルハシ",       giveOk: true }],
  ["きのくわ",      { id: "wooden_hoe",      en: "Wooden Hoe",       ja: "木のクワ",           giveOk: true }],
  ["きのシャベル",  { id: "wooden_shovel",   en: "Wooden Shovel",    ja: "木のシャベル",       giveOk: true }],
  ["つりざお",      { id: "fishing_rod",     en: "Fishing Rod",      ja: "釣り竿",             giveOk: true }],
  ["くら",          { id: "saddle",          en: "Saddle",           ja: "サドル",             giveOk: true,
    note: "サバイバルではチェストや釣りで入手。コマンドで渡すのが手軽です。" }],

  // ── 食料系 ────────────────────────────────────────
  ["パン",          { id: "bread",           en: "Bread",            ja: "パン",               giveOk: true }],
  ["むぎ",          { id: "wheat",           en: "Wheat",            ja: "小麦",               giveOk: true }],

  // ── 特殊アイテム ──────────────────────────────────
  ["たいまつ",      { id: "torch",           en: "Torch",            ja: "たいまつ",           giveOk: true }],
  ["レール",        { id: "rail",            en: "Rail",             ja: "レール",             giveOk: true }],
  ["トロッコ",      { id: "minecart",        en: "Minecart",         ja: "トロッコ",           giveOk: true }],
  ["ほね",          { id: "bone",            en: "Bone",             ja: "骨",                 giveOk: true,
    note: "ピースフルモードではスケルトンが出ないため、コマンドで渡してください。" }],
  ["スノーブロック",{ id: "snow_block",      en: "Snow Block",       ja: "雪ブロック",         giveOk: true,
    note: "雪バイオームでスノーボールを集めてクラフトできます。コマンドで渡すことも可。" }],
  ["パックドアイス",{ id: "packed_ice",      en: "Packed Ice",       ja: "氷塊",               giveOk: true,
    note: "凍った海バイオームで Silk Touch エンチャントのツルハシで採掘。コマンドで渡すのが簡単です。" }],

  // ── 流体系 ────────────────────────────────────────
  ["みず",          { id: "water_bucket",    en: "Water Bucket",     ja: "水入りバケツ",       giveOk: true,
    note: "バケツで川や海の水を汲みます。" }],
  ["マグマ",        { id: "lava_bucket",     en: "Lava Bucket",      ja: "溶岩入りバケツ",     giveOk: true,
    note: "バケツで地下の溶岩を汲みます（y=-54以下に多い）。コマンドで渡すことも可。" }],
];

/** ラベルからItemInfoを検索（前方一致） */
export function findItem(label: string): ItemInfo | null {
  // 完全一致を優先
  for (const [key, info] of ITEM_MAP) {
    if (label === key) return info;
  }
  // 前方一致
  for (const [key, info] of ITEM_MAP) {
    if (label.startsWith(key)) return info;
  }
  return null;
}
