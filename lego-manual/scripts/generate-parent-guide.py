#!/usr/bin/env python3
"""
generate-parent-guide.py
全20巻の設計書（docs/ai/vol*.md）から「おうちのひとへ（親向けページ）」を
抽出し、保護者向けの解説ガイドPDFを1冊にまとめて生成する。

子ども向けのビジュアルマニュアルPDF（generate-all-pdfs.mjs）とは別物で、
本スクリプトは設計書のテキストだけを使う。

使い方:
  python3 scripts/generate-parent-guide.py
出力:
  lego-manual/output/おうちのひとガイド.pdf
"""

import os
import re
import glob

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.cidfonts import UnicodeCIDFont
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer,
    Table, TableStyle, PageBreak, ListFlowable, ListItem, HRFlowable,
)

# ── パス設定 ──────────────────────────────────────────────────────────────────
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, ".."))          # lego-manual/
REPO = os.path.abspath(os.path.join(ROOT, ".."))          # リポジトリルート
DOCS = os.path.join(REPO, "docs", "ai")
OUT_DIR = os.path.join(ROOT, "output")
OUT_PDF = os.path.join(OUT_DIR, "おうちのひとガイド.pdf")

os.makedirs(OUT_DIR, exist_ok=True)

# ── フォント（reportlab 内蔵の日本語CIDフォント） ──────────────────────────────
pdfmetrics.registerFont(UnicodeCIDFont("HeiseiKakuGo-W5"))  # ゴシック
pdfmetrics.registerFont(UnicodeCIDFont("HeiseiMin-W3"))     # 明朝
GOTHIC = "HeiseiKakuGo-W5"
MINCHO = "HeiseiMin-W3"

# ── 配色（LEGO黄＋落ち着いた配色） ────────────────────────────────────────────
LEGO_YELLOW = colors.HexColor("#FFD400")
INK = colors.HexColor("#2B2B2B")
SUBINK = colors.HexColor("#555555")
ACCENT = colors.HexColor("#C8602A")
GREEN = colors.HexColor("#3A7D44")
LIGHT = colors.HexColor("#FFF8DC")
RULE = colors.HexColor("#E0E0E0")

# ── スタイル ──────────────────────────────────────────────────────────────────
styles = {
    "cover_title": ParagraphStyle(
        "cover_title", fontName=GOTHIC, fontSize=30, leading=40,
        textColor=INK, alignment=TA_CENTER,
    ),
    "cover_sub": ParagraphStyle(
        "cover_sub", fontName=GOTHIC, fontSize=14, leading=22,
        textColor=SUBINK, alignment=TA_CENTER,
    ),
    "vol_title": ParagraphStyle(
        "vol_title", fontName=GOTHIC, fontSize=20, leading=28,
        textColor=INK, spaceBefore=4, spaceAfter=8,
    ),
    "h3": ParagraphStyle(
        "h3", fontName=GOTHIC, fontSize=13, leading=20,
        textColor=ACCENT, spaceBefore=12, spaceAfter=4,
    ),
    "body": ParagraphStyle(
        "body", fontName=MINCHO, fontSize=10.5, leading=17,
        textColor=INK, alignment=TA_LEFT, spaceAfter=4,
    ),
    "point_title": ParagraphStyle(
        "point_title", fontName=GOTHIC, fontSize=11, leading=17,
        textColor=GREEN, spaceBefore=6, spaceAfter=1,
    ),
    "cell": ParagraphStyle(
        "cell", fontName=MINCHO, fontSize=10, leading=15, textColor=INK,
    ),
    "cell_head": ParagraphStyle(
        "cell_head", fontName=GOTHIC, fontSize=10, leading=15, textColor=INK,
    ),
}


def esc(s: str) -> str:
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def inline(s: str) -> str:
    """**bold** を太字相当（ゴシック）に。"""
    s = esc(s)
    s = re.sub(r"\*\*(.+?)\*\*", r'<font name="%s">\1</font>' % GOTHIC, s)
    return s


# ── 設計書のパース ────────────────────────────────────────────────────────────
def parse_volume(path: str):
    with open(path, encoding="utf-8") as f:
        lines = f.read().splitlines()

    # タイトル：「# N巻 タイトル — マニュアル設計書」
    m = re.match(r"^#\s*(\d+巻)\s+(.+?)\s*[—-].*$", lines[0])
    vol_no = m.group(1) if m else ""
    vol_name = m.group(2) if m else os.path.basename(path)

    # 基本情報テーブルから 新発見・所要時間・対象年齢 を拾う
    info = {}
    for ln in lines:
        mm_ = re.match(r"^\|\s*(新発見|所要時間|対象年齢|ゲームモード)\s*\|\s*(.+?)\s*\|$", ln)
        if mm_:
            info[mm_.group(1)] = mm_.group(2)

    # 親向けセクション抽出（## .*おうちのひとへ … 次の ## まで）
    start = end = None
    for i, ln in enumerate(lines):
        if start is None and re.match(r"^##\s+.*おうちのひとへ", ln):
            start = i + 1
        elif start is not None and re.match(r"^##\s+", ln):
            end = i
            break
    if start is None:
        return vol_no, vol_name, info, []
    if end is None:
        end = len(lines)
    body = lines[start:end]
    return vol_no, vol_name, info, body


def render_parent_body(body, flow):
    """親向けセクションの markdown を Platypus フローに変換。"""
    i = 0
    n = len(body)
    while i < n:
        ln = body[i].rstrip()

        if not ln.strip():
            i += 1
            continue

        # 水平線（--- や *** ）はスキップ
        if re.match(r"^([-*_])\1{2,}\s*$", ln.strip()):
            i += 1
            continue

        # ### 見出し（難易度はそのまま、その他は h3）
        m = re.match(r"^###\s+(.+)$", ln)
        if m:
            flow.append(Paragraph(inline(m.group(1)), styles["h3"]))
            i += 1
            continue

        # markdown テーブル
        if ln.startswith("|"):
            rows = []
            while i < n and body[i].strip().startswith("|"):
                cells = [c.strip() for c in body[i].strip().strip("|").split("|")]
                rows.append(cells)
                i += 1
            # 区切り行（---）を除去
            rows = [r for r in rows if not all(set(c) <= set("-: ") for c in r)]
            if rows:
                data = []
                for ri, r in enumerate(rows):
                    style = styles["cell_head"] if ri == 0 else styles["cell"]
                    data.append([Paragraph(inline(c), style) for c in r])
                col_w = (A4[0] - 50 * mm) / len(rows[0])
                t = Table(data, colWidths=[col_w] * len(rows[0]))
                t.setStyle(TableStyle([
                    ("BACKGROUND", (0, 0), (-1, 0), LEGO_YELLOW),
                    ("GRID", (0, 0), (-1, -1), 0.5, RULE),
                    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                    ("TOPPADDING", (0, 0), (-1, -1), 4),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                    ("LEFTPADDING", (0, 0), (-1, -1), 6),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ]))
                flow.append(Spacer(1, 2))
                flow.append(t)
                flow.append(Spacer(1, 4))
            continue

        # 箇条書き
        if re.match(r"^[-*]\s+", ln):
            items = []
            while i < n and re.match(r"^[-*]\s+", body[i].strip()):
                txt = re.sub(r"^[-*]\s+", "", body[i].strip())
                items.append(ListItem(Paragraph(inline(txt), styles["body"]),
                                      leftIndent=10))
                i += 1
            flow.append(ListFlowable(items, bulletType="bullet",
                                     start="•", leftIndent=14))
            continue

        # **太字だけの行**（つまずきポイントの見出し）
        m = re.match(r"^\*\*(.+?)\*\*$", ln)
        if m:
            flow.append(Paragraph(esc(m.group(1)), styles["point_title"]))
            i += 1
            continue

        # 通常段落（連続行をまとめる）
        para = [ln]
        i += 1
        while i < n and body[i].strip() and not re.match(
            r"^(#{2,3}\s|\||[-*]\s|\*\*.+\*\*$)", body[i].strip()
        ):
            para.append(body[i].rstrip())
            i += 1
        flow.append(Paragraph(inline(" ".join(para)), styles["body"]))

    return flow


# ── PDF 組み立て ──────────────────────────────────────────────────────────────
def build():
    vol_files = sorted(
        glob.glob(os.path.join(DOCS, "vol*.md")),
        key=lambda p: int(re.match(r"vol(\d+)", os.path.basename(p)).group(1)),
    )

    flow = []

    # 表紙
    flow.append(Spacer(1, 60 * mm))
    flow.append(Paragraph("マイクラ はじめてのしかけづくり", styles["cover_sub"]))
    flow.append(Spacer(1, 6 * mm))
    flow.append(Paragraph("おうちのひとガイド", styles["cover_title"]))
    flow.append(Spacer(1, 8 * mm))
    flow.append(HRFlowable(width="40%", thickness=2, color=LEGO_YELLOW,
                           hAlign="CENTER"))
    flow.append(Spacer(1, 8 * mm))
    flow.append(Paragraph(
        "全20巻の保護者向け解説をまとめた1冊です。<br/>"
        "各巻のあそびかた・難易度・つまずきやすいポイントを掲載しています。<br/>"
        "対象年齢 4〜6歳 ／ Minecraft Java Edition ／ ピースフル",
        styles["cover_sub"]))
    flow.append(PageBreak())

    for path in vol_files:
        vol_no, vol_name, info, body = parse_volume(path)

        # 巻見出し
        flow.append(Paragraph(f"{vol_no}　{esc(vol_name)}", styles["vol_title"]))
        flow.append(HRFlowable(width="100%", thickness=1.5, color=LEGO_YELLOW))
        flow.append(Spacer(1, 4))

        # 基本情報の一行サマリ
        chips = []
        if info.get("新発見"):
            chips.append(f"新発見：{info['新発見']}")
        if info.get("所要時間"):
            chips.append(f"所要時間：{info['所要時間']}")
        if info.get("対象年齢"):
            chips.append(f"対象：{info['対象年齢']}")
        if chips:
            flow.append(Paragraph(esc("　｜　".join(chips)), styles["body"]))

        if body:
            render_parent_body(body, flow)
        else:
            flow.append(Paragraph("（この巻の親向けページは準備中です）",
                                  styles["body"]))

        flow.append(PageBreak())

    # ヘッダー／フッター
    def on_page(canvas, doc):
        canvas.saveState()
        if doc.page > 1:  # 表紙以外
            canvas.setFont(GOTHIC, 8)
            canvas.setFillColor(SUBINK)
            canvas.drawString(20 * mm, 12 * mm, "おうちのひとガイド")
            canvas.drawRightString(A4[0] - 20 * mm, 12 * mm, f"{doc.page - 1}")
            canvas.setStrokeColor(RULE)
            canvas.line(20 * mm, 15 * mm, A4[0] - 20 * mm, 15 * mm)
        canvas.restoreState()

    doc = BaseDocTemplate(
        OUT_PDF, pagesize=A4,
        leftMargin=20 * mm, rightMargin=20 * mm,
        topMargin=18 * mm, bottomMargin=20 * mm,
        title="おうちのひとガイド", author="マイクラ はじめてのしかけづくり",
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin,
                  doc.width, doc.height, id="main")
    doc.addPageTemplates([PageTemplate(id="all", frames=[frame],
                                       onPage=on_page)])
    doc.build(flow)
    print(f"✅ PDF生成完了: {OUT_PDF}")


if __name__ == "__main__":
    build()
