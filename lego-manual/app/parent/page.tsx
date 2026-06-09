import { VOLUMES, VOLUME_IDS } from "../data/volumes";
import { findItem } from "../data/item-ids";
import type { Part } from "../data/steps";

// ── ユーティリティ ────────────────────────────────────────────────────────────

function giveCommand(itemId: string, count: number): string {
  return `/give @s ${itemId} ${count}`;
}

/** 巻ごとに「ステップ番号→必要素材」を重複除去して集約 */
function aggregateParts(parts: Part[]): { label: string; count: number }[] {
  const map = new Map<string, number>();
  for (const p of parts) {
    // カッコ書きの補足を除いた基本ラベルをキーにする
    const baseLabel = p.label.replace(/（[^）]*）/g, "").replace(/（.*）/, "").trim();
    map.set(baseLabel, (map.get(baseLabel) ?? 0) + p.count);
  }
  return Array.from(map.entries()).map(([label, count]) => ({ label, count }));
}

// ── コンポーネント ────────────────────────────────────────────────────────────

function MaterialRow({ label, count }: { label: string; count: number }) {
  const item = findItem(label);
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="py-2 px-3 font-bold text-gray-800 text-sm whitespace-nowrap">{label}</td>
      <td className="py-2 px-3 text-gray-500 text-xs">{item ? item.ja : "—"}</td>
      <td className="py-2 px-3 text-center font-mono font-bold text-sm">{count}</td>
      <td className="py-2 px-3">
        {item?.giveOk ? (
          <code className="bg-gray-900 text-green-400 px-2 py-0.5 rounded text-xs font-mono select-all">
            {giveCommand(item.id, count)}
          </code>
        ) : (
          <span className="text-orange-600 text-xs font-bold">コマンド不可</span>
        )}
      </td>
      <td className="py-2 px-3 text-gray-500 text-xs leading-snug max-w-[200px]">
        {item?.note ?? ""}
      </td>
    </tr>
  );
}

function VolumeSection({
  volId,
  index,
}: {
  volId: string;
  index: number;
}) {
  const vol = VOLUMES[volId as keyof typeof VOLUMES];
  if (!vol) return null;

  // 全ステップから素材を集約
  const allParts: Part[] = vol.steps.flatMap((s) => s.parts);
  const aggregated = aggregateParts(allParts);

  // ステップごとの素材（詳細表示用）
  return (
    <section className="mb-10 break-inside-avoid">
      {/* ヘッダー */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center font-black text-gray-900 text-sm shadow">
          {String(index + 1).padStart(2, "0")}
        </div>
        <div>
          <h2 className="text-lg font-black text-gray-900 leading-none">{vol.title}</h2>
          <p className="text-xs text-gray-500 mt-0.5">{vol.subtitle}</p>
        </div>
        <div className="ml-auto text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
          {vol.steps.length}ステップ
        </div>
      </div>

      {/* ステップ別素材 */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="py-2 px-3 text-xs font-black text-gray-600">アイテム（子ども向け表記）</th>
              <th className="py-2 px-3 text-xs font-black text-gray-600">正式名称</th>
              <th className="py-2 px-3 text-xs font-black text-gray-600 text-center">個数</th>
              <th className="py-2 px-3 text-xs font-black text-gray-600">/give コマンド</th>
              <th className="py-2 px-3 text-xs font-black text-gray-600">メモ</th>
            </tr>
          </thead>
          <tbody>
            {aggregated.map((p) => (
              <MaterialRow key={p.label} label={p.label} count={p.count} />
            ))}
          </tbody>
        </table>
      </div>

      {/* ステップ内訳（折りたたまずそのまま表示） */}
      <div className="mt-2 flex flex-wrap gap-2">
        {vol.steps.map((step) => (
          <div key={step.stepNumber} className="text-[11px] text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1">
            <span className="font-black text-gray-700">STEP {step.stepNumber}</span>
            {" "}{step.label}
            {" — "}
            {step.parts.map((p) => `${p.label}×${p.count}`).join("・")}
          </div>
        ))}
      </div>
    </section>
  );
}

// ── ページ本体 ────────────────────────────────────────────────────────────────

export default function ParentManualPage() {
  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Nunito', 'M PLUS Rounded 1c', sans-serif" }}
    >
      {/* トップバー */}
      <div className="bg-gray-900 text-white px-6 py-4 print:bg-gray-900">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-yellow-400 text-xs font-black tracking-widest mb-1">PARENT GUIDE</p>
            <h1 className="text-2xl font-black leading-none">おうちのかた用 マニュアル</h1>
            <p className="text-gray-400 text-sm mt-1">マイクラ はじめてのしかけづくり — 全20巻 素材準備ガイド</p>
          </div>
          <a
            href="/"
            className="text-xs text-gray-400 hover:text-white border border-gray-600 px-3 py-1.5 rounded-full transition-colors print:hidden"
          >
            ← 子ども用マニュアルへ
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">

        {/* ── セクション1: チートの有効化 ───────────────────────────── */}
        <section className="mb-10 p-5 bg-blue-50 border-2 border-blue-200 rounded-2xl">
          <h2 className="text-base font-black text-blue-900 mb-3">📋 はじめに — コマンド（チート）の使い方</h2>
          <p className="text-sm text-blue-800 mb-4">
            コマンドを使うと、アイテムを自由に渡したり、環境を整えることができます。<br />
            <strong>ピースフルモード</strong>で遊ぶ場合、骨（vol.13）など一部アイテムはコマンドなしでは入手困難なため、このガイドを参考にしてください。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Java Edition */}
            <div className="bg-white rounded-xl p-4 border border-blue-200">
              <p className="font-black text-sm text-gray-800 mb-2">💻 Java Edition（PC）</p>
              <ol className="text-sm text-gray-700 space-y-1.5 list-decimal list-inside">
                <li>ワールド作成 → <strong>「チートを許可」をON</strong></li>
                <li>すでに作ったワールドの場合：<br />
                  <span className="ml-4 text-gray-500">ESC → 「LANに公開」 → 「チートを許可：ON」→「LANワールドを開始」</span>
                </li>
                <li>チャット欄（<kbd className="bg-gray-100 border rounded px-1">T</kbd>）を開いてコマンドを入力</li>
              </ol>
            </div>

            {/* Switch / Bedrock */}
            <div className="bg-white rounded-xl p-4 border border-blue-200">
              <p className="font-black text-sm text-gray-800 mb-2">🎮 Nintendo Switch / Bedrock</p>
              <ol className="text-sm text-gray-700 space-y-1.5 list-decimal list-inside">
                <li>ワールド作成 → 「ゲーム」タブ → <strong>「チート」をON</strong></li>
                <li>すでに作ったワールドの場合：<br />
                  <span className="ml-4 text-gray-500">ワールドを編集 → 「ゲーム」→「チートを有効化」</span>
                </li>
                <li>チャット欄（
                  <kbd className="bg-gray-100 border rounded px-1">右十字キー▶</kbd>
                  ）を開いてコマンドを入力</li>
              </ol>
            </div>
          </div>

          <div className="mt-4 bg-white rounded-xl p-4 border border-blue-200">
            <p className="font-black text-sm text-gray-800 mb-2">📌 コマンドの基本書式</p>
            <code className="block bg-gray-900 text-green-400 px-4 py-2 rounded-lg text-sm font-mono mb-2">
              /give @s アイテムID 個数
            </code>
            <ul className="text-xs text-gray-600 space-y-1">
              <li><code className="bg-gray-100 px-1 rounded">@s</code> = 自分自身（コマンドを打ったプレイヤー）</li>
              <li>アイテムIDは下の表の「/give コマンド」列をそのままコピーしてください</li>
              <li>Switch版はアイテムIDの前に <code className="bg-gray-100 px-1 rounded">minecraft:</code> は不要です</li>
            </ul>
          </div>
        </section>

        {/* ── セクション2: ピースフルモードについて ─────────────────── */}
        <section className="mb-10 p-5 bg-amber-50 border-2 border-amber-200 rounded-2xl">
          <h2 className="text-base font-black text-amber-900 mb-2">⚠️ ピースフルモードでのご注意</h2>
          <div className="text-sm text-amber-800 space-y-2">
            <p>このシリーズは<strong>ピースフル（平和）モード</strong>での遊びを想定しています。敵Mobが出ないため安全に遊べますが、以下の点にご注意ください。</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>骨（vol.13）</strong>：スケルトンが出ないので入手不可。コマンドで渡してください。</li>
              <li><strong>水・溶岩のバケツ</strong>：近くに川・湖・溶岩湖がない場合はコマンドで渡してください。</li>
              <li><strong>落下ダメージ</strong>：ピースフルでも落下ダメージはあります。高い場所では注意を。</li>
              <li><strong>鉄のインゴット（vol.06・07）</strong>：かまどで焼く必要があるため、コマンドで直接渡すと楽です。</li>
            </ul>
          </div>
        </section>

        {/* ── セクション3: 各巻の素材一覧 ──────────────────────────── */}
        <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-yellow-400 rounded-full block" />
          各巻の必要素材とコマンド一覧
        </h2>

        {VOLUME_IDS.map((id, i) => (
          <VolumeSection key={id} volId={id} index={i} />
        ))}

        {/* フッター */}
        <footer className="mt-10 pt-6 border-t border-gray-200 text-center text-xs text-gray-400">
          マイクラ はじめてのしかけづくり — おうちのかた用マニュアル
        </footer>
      </div>
    </div>
  );
}
