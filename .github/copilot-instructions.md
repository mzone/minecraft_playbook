# GitHub Copilot Instructions — minecraft_playbook

## Context

This repo is a LEGO-style step-by-step Minecraft building manual for Japanese elementary school children. It's a Next.js 16 + React 19 TypeScript web app with PDF export via Playwright + Python reportlab.

## Primary Edit Target

`lego-manual/app/data/volumes.ts` — defines all 20 volumes' step data as TypeScript objects.

## Key Types (from `lego-manual/app/data/steps.ts`)

```typescript
type Block = { id: string; x: number; y: number; z: number; color: string; isNew?: boolean };
type Part  = { color: string; label: string; count: number };
type Step  = { stepNumber: number; totalSteps: number; label: string; parts: Part[]; blocks: Block[]; recipes?: CraftingRecipe[]; cameraOffset?: { x: number; y: number } };
type CraftingRecipe = { gridSize: 2 | 3; grid: (string|null)[][]; gridLabel: (string|null)[][]; output: { color: string; label: string; count: number }; tableRequired: boolean; howTo: string[] };
```

## Copilot Suggestions Should Follow These Rules

1. `label` and `howTo` strings must be written in hiragana/katakana — no kanji, no English
2. Always assign `isNew: true` to blocks that appear for the first time in a step
3. Block `id` values must be unique within a step array
4. `gridSize: 2` = inventory craft (no crafting table); `gridSize: 3` = crafting table required
5. Colors are hex strings — use the shared color constants defined at the top of `volumes.ts`
