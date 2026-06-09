# minecraft_playbook — Agent Context

## Project Summary

A LEGO-style step-by-step digital manual for Minecraft redstone/mechanism building, targeting Japanese elementary school children (hiragana text). Covers 20 volumes as a Next.js web app with PDF export.

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS, TypeScript
- **PDF Generation**: Playwright (screenshot) + Python reportlab
- **MCP Server**: `data/minecraft-wiki-mcp/` — TypeScript MCP server for Minecraft Wiki data

## Key Files

| File | Purpose |
|------|---------|
| `lego-manual/app/data/volumes.ts` | All 20 volumes' step data — primary edit target |
| `lego-manual/app/data/steps.ts` | Type definitions (Block, Part, Step, CraftingRecipe) |
| `lego-manual/app/components/LegoManualContainer.tsx` | Root layout component |
| `lego-manual/app/components/MainBuildingStage.tsx` | Isometric SVG stage |
| `lego-manual/scripts/generate-all-pdfs.mjs` | Batch PDF generation |

## Volumes (vol01–vol20)

| ID | Title (Japanese) |
|----|-----------------|
| vol01 | ひみつきち |
| vol02 | みはりだい |
| vol03 | おやすみハウス |
| vol04 | ボートひろば |
| vol05 | どうぶつひろば |
| vol06 | トロッコライド |
| vol07 | ウォータースライダー |
| vol08 | おとしあな |
| vol09 | つりぼり |
| vol10 | はたけ |
| vol11 | パンやさん |
| vol12 | うまぼくじょう |
| vol13 | オオカミとなかよし |
| vol14 | たからさがし |
| vol15 | マグマかんさつだい |
| vol16 | ゆきぐに |
| vol17 | うみのたんけん |
| vol18 | むらたんけん |
| vol19 | たからばこ |
| vol20 | しかけランド |

## Development Commands

```bash
cd lego-manual
npm install
npm run dev          # http://localhost:3000?vol=vol01
npm run build && npm run start  # Production (required before PDF gen)
node scripts/generate-all-pdfs.mjs
```

## Adding a New Volume

1. Add an entry to the `VOLUMES` object in `lego-manual/app/data/volumes.ts`
2. Add the volume ID to `ALL_VOLS` array in `lego-manual/scripts/generate-all-pdfs.mjs`

## Block Coordinate System

Blocks use isometric coordinates `{x, y, z}`. Set `isNew: true` to highlight a block with a yellow arrow indicator, showing children where to place the new piece.

## Style Guidelines

- All user-facing text must be in hiragana/katakana (for young readers)
- Keep text minimal — visuals communicate the steps
- Accent color: `#FFD400` (LEGO yellow)
