# minecraft_playbook — Claude Code コンテキスト

## プロジェクト概要

マインクラフトのしかけ作りを子ども向けに解説する、LEGO組み立て説明書スタイルのデジタルマニュアル。全20巻をWebアプリ＋PDFで提供する。

## リポジトリ構成

```
minecraft_playbook/
├── lego-manual/          # Next.js 16 + React 19 のWebアプリ（メイン実装）
│   ├── app/
│   │   ├── components/   # UIコンポーネント（LegoManualContainer など）
│   │   ├── data/
│   │   │   ├── volumes.ts  # 全20巻のステップデータ（追加・編集の主要ファイル）
│   │   │   └── steps.ts    # 型定義（Block / Part / Step / CraftingRecipe）
│   │   └── page.tsx
│   ├── scripts/
│   │   └── generate-all-pdfs.mjs  # Playwright + reportlab でPDF一括生成
│   └── output/           # 生成済みPDF・PNG（コミット対象外）
├── data/minecraft-wiki-mcp/  # Minecraft Wiki MCPサーバー（TypeScript）
└── docs/ai/              # AIドキュメント（本ファイルが含まれるディレクトリ）
```

## よく使うコマンド

```bash
cd lego-manual
npm install          # 初回セットアップ
npm run dev          # 開発サーバー起動 → http://localhost:3000
npm run build        # 本番ビルド
npm run start        # 本番サーバー起動（PDF生成前に必要）

# PDF一括生成（本番サーバー起動後）
node scripts/generate-all-pdfs.mjs
node scripts/generate-all-pdfs.mjs --vol vol01 --vol vol05  # 特定巻のみ
```

## 巻の追加方法

1. `lego-manual/app/data/volumes.ts` の `VOLUMES` オブジェクトに新しいキーを追加
2. `lego-manual/scripts/generate-all-pdfs.mjs` の `ALL_VOLS` 配列に巻IDを追記

## データ型（重要）

```typescript
type Step = {
  stepNumber: number;
  totalSteps: number;
  label: string;            // ひらがな（子ども向け）
  parts: Part[];            // 必要ブロック一覧
  blocks: Block[];          // アイソメトリックSVGのブロック配置
  recipes?: CraftingRecipe[]; // クラフトレシピ（省略可）
  cameraOffset?: { x: number; y: number };
};

type Block = {
  id: string;
  x: number; y: number; z: number;  // アイソメトリック座標
  color: string;   // 16進数カラー
  isNew?: boolean; // true → 黄色い矢印でハイライト表示
};
```

## UIデザイン原則

- LEGO公式説明書オマージュ
- テキスト最小限・ビジュアル優先
- カラー: 背景 #FFFFFF / 強調 #FFD400（LEGO黄）
- 対象: 小学校低学年（ひらがな多用）

## Next.js バージョン注意

このプロジェクトは Next.js 16 を使用。`node_modules/next/dist/docs/` を参照すること（APIが変わっている可能性あり）。

## MCPサーバー（data/minecraft-wiki-mcp）

Minecraft Wiki の情報を取得するMCPサーバー（TypeScript）。`.mcp.json` で設定済み。
