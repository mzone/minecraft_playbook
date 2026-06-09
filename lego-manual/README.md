# マイクラ はじめてのしかけづくり — レゴ風マニュアル

マインクラフトのしかけ作りを子ども向けに解説する、LEGO組み立て説明書スタイルのデジタルマニュアルです。全20巻を収録しています。

## 概要

- **Next.js 16 + React 19** で実装したインタラクティブなWebアプリ
- アイソメトリックSVGでブロックを3Dっぽく描画
- 各ステップをクリックで切り替えるスライドショー形式
- Playwright + reportlab で全20巻のPDFを一括生成

## 収録巻

| ID | タイトル | ステップ数 |
|----|---------|----------|
| vol01 | ひみつきち | 4 |
| vol02 | みはりだい | 4 |
| vol03 | おやすみハウス | 4 |
| vol04 | ボートひろば | 3 |
| vol05 | どうぶつひろば | 3 |
| vol06 | トロッコライド | 3 |
| vol07 | ウォータースライダー | 3 |
| vol08 | おとしあな | 3 |
| vol09 | つりぼり | 3 |
| vol10 | はたけ | 3 |
| vol11 | パンやさん | 3 |
| vol12 | うまぼくじょう | 3 |
| vol13 | オオカミとなかよし | 3 |
| vol14 | たからさがし | 3 |
| vol15 | マグマかんさつだい | 3 |
| vol16 | ゆきぐに | 3 |
| vol17 | うみのたんけん | 3 |
| vol18 | むらたんけん | 3 |
| vol19 | たからばこ | 3 |
| vol20 | しかけランド | 3 |

## セットアップ

```bash
npm install
```

## 開発サーバー起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

巻の切り替えは `?vol=vol02` のようにクエリパラメータで指定します。

```
http://localhost:3000?vol=vol05
```

## PDF生成

### 初回セットアップ（1回だけ）

```bash
cd lego-manual
npm run pdf:setup
```

Chromium・Python venv（`reportlab` / `Pillow`）をまとめて入れます。

Docker 環境では `PLAYWRIGHT_CHROMIUM_EXECUTABLE=/opt/pw-browsers/chromium-1194/chrome-linux/chrome` を指定できます。

### 全20巻を一括生成

```bash
cd lego-manual
npm run build
npm run start &          # 3000番が空いているときだけ
npm run pdf
```

`localhost:3000` でサーバーがすでに動いている場合は `npm run pdf` だけで OK です。

生成されたPDFは `output/` ディレクトリに保存されます。

### 特定の巻だけ生成

```bash
npm run pdf -- --vol vol01 --vol vol05
```

## ディレクトリ構成

```
lego-manual/
├── app/
│   ├── components/
│   │   ├── LegoManualContainer.tsx   # メインレイアウト
│   │   ├── MainBuildingStage.tsx     # アイソメトリックSVGステージ
│   │   ├── PartsRequiredBox.tsx      # 必要ブロック一覧
│   │   ├── CraftingRecipeBox.tsx     # クラフトレシピ表示
│   │   └── StepNavigation.tsx        # 前へ/次へボタン
│   ├── data/
│   │   ├── volumes.ts                # 全20巻のステップデータ
│   │   └── steps.ts                  # 型定義
│   └── page.tsx                      # エントリポイント
├── scripts/
│   └── generate-all-pdfs.mjs        # PDF一括生成スクリプト
└── output/                           # 生成されたPDF・PNG
```

## データ構造

ステップデータは `app/data/volumes.ts` で定義します。

```typescript
type Step = {
  stepNumber: number;
  totalSteps: number;
  label: string;
  parts: Part[];          // 必要ブロック
  blocks: Block[];        // ステージのブロック配置
  recipes?: CraftingRecipe[];  // クラフトレシピ（省略可）
  cameraOffset?: { x: number; y: number };
};
```

新しい巻を追加する場合は `volumes.ts` の `VOLUMES` オブジェクトと `ALL_VOLS` 配列（`generate-all-pdfs.mjs`）に追記します。
