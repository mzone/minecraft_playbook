#!/usr/bin/env node
/**
 * generate-pdf.mjs
 * Captures each manual step as a full-page screenshot, then
 * combines them into a single A4-landscape PDF using reportlab (via Python).
 *
 * Usage:
 *   node scripts/generate-pdf.mjs [--out <path>]
 *   Defaults to: output/vol01_himitsukichi.pdf
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
const STEPS = 5; // total steps in the mock data
const OUT_DIR = resolve(ROOT, "output");
const OUT_PDF = process.argv.includes("--out")
  ? process.argv[process.argv.indexOf("--out") + 1]
  : resolve(OUT_DIR, "vol01_himitsukichi.pdf");

mkdirSync(OUT_DIR, { recursive: true });

console.log("🖥  Launching browser…");
const browser = await chromium.launch({
  executablePath: BROWSER_PATH,
  args: ["--no-sandbox"],
});
const ctx = await browser.newContext({
  viewport: { width: 700, height: 760 },
  deviceScaleFactor: 2, // retina quality
});
const page = await ctx.newPage();

await page.goto(BASE_URL, { waitUntil: "networkidle" });
await page.waitForSelector("svg");

const pngPaths = [];

for (let i = 0; i < STEPS; i++) {
  const path = resolve(OUT_DIR, `step_${String(i + 1).padStart(2, "0")}.png`);
  await page.screenshot({ path, fullPage: false });
  pngPaths.push(path);
  console.log(`  📷 step ${i + 1}/${STEPS} → ${path}`);

  if (i < STEPS - 1) {
    await page.click('button[aria-label="次へ"]');
    await page.waitForTimeout(350);
  }
}

await browser.close();
console.log("✅ Screenshots captured. Generating PDF…");

// Build PDF with reportlab via Python (canvas-based, one image per page)
const pyScript = `
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.utils import ImageReader
from PIL import Image as PILImage

paths = ${JSON.stringify(pngPaths)}
out   = ${JSON.stringify(OUT_PDF)}

page_w, page_h = landscape(A4)
margin = 12

c = canvas.Canvas(out, pagesize=landscape(A4))
for i, p in enumerate(paths):
    img = PILImage.open(p)
    iw, ih = img.size
    # fit inside page with margin
    scale = min((page_w - 2*margin) / iw, (page_h - 2*margin) / ih)
    draw_w = iw * scale
    draw_h = ih * scale
    x = (page_w - draw_w) / 2
    y = (page_h - draw_h) / 2
    c.drawImage(ImageReader(p), x, y, width=draw_w, height=draw_h)
    if i < len(paths) - 1:
        c.showPage()

c.save()
print(f"PDF saved: {out}")
`;

const pyFile = resolve(OUT_DIR, "_make_pdf.py");
writeFileSync(pyFile, pyScript);
execSync(`python3 ${pyFile}`, { stdio: "inherit" });
console.log(`\n🎉 Done! → ${OUT_PDF}`);
