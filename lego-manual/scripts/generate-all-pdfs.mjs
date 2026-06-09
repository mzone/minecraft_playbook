#!/usr/bin/env node
/**
 * generate-all-pdfs.mjs
 * 全20巻のPDFを一括生成する。
 *
 * Usage:
 *   node scripts/generate-all-pdfs.mjs [--vol vol01] [--vol vol02] ...
 *   引数なしで全20巻生成。
 */

import pkg from "../node_modules/playwright-core/index.js";
const { chromium } = pkg;
import { execSync } from "child_process";
import { mkdirSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const BROWSER_PATH = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const BASE_URL = "http://localhost:3000";
const OUT_DIR = resolve(ROOT, "output");

mkdirSync(OUT_DIR, { recursive: true });

// 生成対象の巻を決定
const ALL_VOLS = [
  { id: "vol01", title: "ひみつきち",         steps: 4 },
  { id: "vol02", title: "みはりだい",         steps: 4 },
  { id: "vol03", title: "おやすみハウス",     steps: 4 },
  { id: "vol04", title: "ボートひろば",       steps: 3 },
  { id: "vol05", title: "どうぶつひろば",     steps: 3 },
  { id: "vol06", title: "トロッコライド",     steps: 3 },
  { id: "vol07", title: "ウォータースライダー", steps: 3 },
  { id: "vol08", title: "おとしあな",         steps: 3 },
  { id: "vol09", title: "つりぼり",           steps: 3 },
  { id: "vol10", title: "はたけ",             steps: 3 },
  { id: "vol11", title: "パンやさん",         steps: 3 },
  { id: "vol12", title: "うまぼくじょう",     steps: 3 },
  { id: "vol13", title: "オオカミとなかよし", steps: 3 },
  { id: "vol14", title: "たからさがし",       steps: 3 },
  { id: "vol15", title: "マグマかんさつだい", steps: 3 },
  { id: "vol16", title: "ゆきぐに",           steps: 3 },
  { id: "vol17", title: "うみのたんけん",     steps: 3 },
  { id: "vol18", title: "むらたんけん",       steps: 3 },
  { id: "vol19", title: "たからばこ",         steps: 3 },
  { id: "vol20", title: "しかけランド",       steps: 3 },
];

// --vol フラグで絞り込み
const requestedVols = [];
for (let i = 0; i < process.argv.length; i++) {
  if (process.argv[i] === "--vol" && process.argv[i + 1]) {
    requestedVols.push(process.argv[i + 1]);
  }
}
const targets = requestedVols.length > 0
  ? ALL_VOLS.filter(v => requestedVols.includes(v.id))
  : ALL_VOLS;

console.log(`🚀 生成対象: ${targets.map(v => v.id).join(", ")}`);
console.log("🖥  ブラウザを起動中…");

const browser = await chromium.launch({
  executablePath: BROWSER_PATH,
  args: ["--no-sandbox"],
});
const ctx = await browser.newContext({
  viewport: { width: 720, height: 1200 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();

for (const vol of targets) {
  console.log(`\n📖 ${vol.id} 「${vol.title}」 (${vol.steps}ページ)`);

  const pngPaths = [];

  for (let i = 0; i < vol.steps; i++) {
    const url = `${BASE_URL}?vol=${vol.id}`;

    if (i === 0) {
      await page.goto(url, { waitUntil: "networkidle" });
      await page.waitForSelector("svg");
      // 最初のステップが表示されるまで少し待つ
      await page.waitForTimeout(400);
    }

    const pngPath = resolve(OUT_DIR, `${vol.id}_step_${String(i + 1).padStart(2, "0")}.png`);
    // カード要素だけをキャプチャすることでヘッダー・フッターの見切れを防ぐ
    const card = page.locator(".rounded-3xl").first();
    await card.screenshot({ path: pngPath });
    pngPaths.push(pngPath);
    console.log(`  📷 step ${i + 1}/${vol.steps}`);

    if (i < vol.steps - 1) {
      await page.click('button[aria-label="次へ"]');
      await page.waitForTimeout(400);
    }
  }

  // PDF生成
  const outPdf = resolve(OUT_DIR, `${vol.id}_${vol.title}.pdf`);
  const pyScript = `
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.utils import ImageReader
from PIL import Image as PILImage

paths = ${JSON.stringify(pngPaths)}
out   = ${JSON.stringify(outPdf)}

page_w, page_h = landscape(A4)
margin = 12

c = canvas.Canvas(out, pagesize=landscape(A4))
for i, p in enumerate(paths):
    img = PILImage.open(p)
    iw, ih = img.size
    scale = min((page_w - 2*margin) / iw, (page_h - 2*margin) / ih)
    draw_w = iw * scale
    draw_h = ih * scale
    x = (page_w - draw_w) / 2
    y = (page_h - draw_h) / 2
    c.drawImage(ImageReader(p), x, y, width=draw_w, height=draw_h)
    if i < len(paths) - 1:
        c.showPage()

c.save()
print(f"  ✅ PDF → {out}")
`;

  const pyFile = resolve(OUT_DIR, `_make_${vol.id}.py`);
  writeFileSync(pyFile, pyScript);
  execSync(`python3 ${pyFile}`, { stdio: "inherit" });
}

await browser.close();
console.log(`\n🎉 全${targets.length}巻のPDF生成が完了しました！`);
console.log(`📁 保存先: ${OUT_DIR}`);
