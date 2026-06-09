import { VOLUMES, VOLUME_IDS } from "../data/volumes";
import { findItem, ITEM_MAP } from "../data/item-ids";
import type { Part } from "../data/steps";

// ── ユーティリティ ────────────────────────────────────────────────────────────

function giveCommand(itemId: string, count: number): string {
  return `/give @s ${itemId} ${count}`;
}

/** 巻ごとに「ステップ番号→必要素材」を重複除去して集約 */
function aggregateParts(parts: Part[]): { label: string; count: number }[] {
  const map = new Map<string, number>();
  for (const p of parts) {
    const baseLabel = p.label.replace(/（[^）]*）/g, "").replace(/（.*）/, "").trim();
    map.set(baseLabel, (map.get(baseLabel) ?? 0) + p.count);
  }
  return Array.from(map.entries()).map(([label, count]) => ({ label, count }));
}

// ── コンポーネント ────────────────────────────────────────────────────────────

function MaterialRow({ label, count }: { label: string; count: number }) {
  const item = findItem(label);
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 align-top">
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
      <td className="py-2 px-3 text-gray-500 text-xs leading-snug max-w-[240px]">
        {item?.howToGet ?? item?.note ?? ""}
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

  const allParts: Part[] = vol.steps.flatMap((s) => s.parts);
  const aggregated = aggregateParts(allParts);

  return (
    <section className="mb-10 break-inside-avoid">
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

      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="py-2 px-3 text-xs font-black text-gray-600">アイテム</th>
              <th className="py-2 px-3 text-xs font-black text-gray-600">正式名称</th>
              <th className="py-2 px-3 text-xs font-black text-gray-600 text-center">個数</th>
              <th className="py-2 px-3 text-xs font-black text-gray-600">/give コマンド</th>
              <th className="py-2 px-3 text-xs font-black text-gray-600">入手方法（サバイバル）</th>
            </tr>
          </thead>
          <tbody>
            {aggregated.map((p) => (
              <MaterialRow key={p.label} label={p.label} count={p.count} />
            ))}
          </tbody>
        </table>
      </div>

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

// ── 全素材まとめセクション ────────────────────────────────────────────────────

function AllMaterialsGuide() {
  return (
    <section className="mb-10 p-5 bg-green-50 border-2 border-green-200 rounded-2xl">
      <h2 className="text-base font-black text-green-900 mb-3">🧱 素材の用意方法 — フルガイド</h2>
      <p className="text-sm text-green-800 mb-5">
        全20巻で登場するアイテムの入手方法をまとめました。コマンドを使わずにサバイバルで遊ぶ場合の参考にしてください。
      </p>

      {/* 木材系 */}
      <div className="mb-5">
        <h3 className="text-sm font-black text-green-800 mb-2 flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-yellow-700 inline-block" /> 木材・木製品
        </h3>
        <div className="space-y-2">
          {[
            { name: "まるた（オークの原木）", how: "地上の木をこぶしか斧で叩くと入手。木の幹を全部壊しても葉から苗木が落ちるので再植可能。" },
            { name: "いた（板材）×4", how: "まるた1個 → インベントリ（Eキー）の2×2クラフト左上に置くだけで板材×4が作れます（作業台不要）。" },
            { name: "えだ（棒）×4", how: "インベントリの2×2グリッドで「いた」を上下に2枚並べると棒×4が作れます（作業台不要）。" },
            { name: "ものづくりだい（作業台）×1", how: "インベントリの2×2全マスにいた×4 → ものづくりだい×1。地面に置いて右クリックで3×3クラフトが使えます。" },
            { name: "ドア×3", how: "作業台の左2列すべて（計6マス）にいたを置く。ドアは2ブロックの高さがあるため、壁の下2段に設置します。" },
            { name: "はしご×3", how: "作業台の3×3でえだ7本をH字配置（左列3・中央行の左右・右列3、真ん中の中央だけ空ける）→ はしご×3。壁に向かって設置すると登れます。" },
            { name: "ベッド×1", how: "作業台の上段に白ウール×3、中段にいた×3 → ベッド×1。白ウールは白い羊をハサミで刈るか倒すと入手できます。" },
            { name: "ボート×1", how: "作業台の中段左右＋下段3マスにいた×5をU字配置 → ボート×1。水上で右クリックすると乗れます。" },
            { name: "さく（フェンス）×3", how: "作業台の上2段を「いた・えだ・いた」×2行（計いた4＋えだ2）→ さく×3。" },
            { name: "さくのとびら×1", how: "作業台の上2段を「えだ・いた・えだ」×2行（計えだ4＋いた2）→ さくのとびら×1。" },
            { name: "かんばん×3", how: "作業台の上2段にいた×6、最下段中央にえだ×1 → かんばん×3。右クリックで文字を書けます。" },
            { name: "チェスト×1", how: "作業台の3×3グリッドで中央だけ空けた8マスにいた×8 → チェスト×1。" },
          ].map(({ name, how }) => (
            <div key={name} className="bg-white rounded-lg p-3 border border-green-100 text-sm">
              <span className="font-black text-gray-800">{name}</span>
              <span className="text-gray-500 ml-2">— {how}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 石材・鉱石系 */}
      <div className="mb-5">
        <h3 className="text-sm font-black text-green-800 mb-2 flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-gray-500 inline-block" /> 石材・鉱石系
        </h3>
        <div className="space-y-2">
          {[
            { name: "まるいし（丸石）", how: "石のつるはし以上で地面の石ブロックを掘ると「丸石」が落ちます。最初は木のつるはしを作り、石を掘って丸石を集めましょう。" },
            { name: "鉄のインゴット", how: "地下（y=16付近が最多）で石のつるはし以上を使って「鉄鉱石」を採掘。かまどで木材を燃料にして焼くと鉄インゴットに（鉱石1個→インゴット1個）。コマンドで直接 /give するのが楽です。" },
            { name: "ガラス", how: "砂浜・砂漠で「砂」を集め、かまどで燃料と一緒に焼くとガラスに（砂1個→ガラス1個）。" },
            { name: "ガラスパネル×16", how: "作業台の上2段にガラス×6を並べる → ガラスパネル×16。6枚のガラスから16枚のパネルが作れます。" },
            { name: "せきたん（石炭）", how: "地下の石炭鉱石（黒い点が入った石）を木のつるはし以上で採掘 → 石炭。たいまつのクラフトに使います（石炭の代わりに木炭も可）。" },
          ].map(({ name, how }) => (
            <div key={name} className="bg-white rounded-lg p-3 border border-green-100 text-sm">
              <span className="font-black text-gray-800">{name}</span>
              <span className="text-gray-500 ml-2">— {how}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 道具系 */}
      <div className="mb-5">
        <h3 className="text-sm font-black text-green-800 mb-2 flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-amber-600 inline-block" /> 道具
        </h3>
        <div className="space-y-2">
          {[
            { name: "きのつるはし×1", how: "作業台：上段にいた×3、中段中央と下段中央にえだ×2 → 木のつるはし×1。石や鉄鉱石を掘れます。" },
            { name: "いしのつるはし×1", how: "作業台：上段にまるいし×3、中段中央と下段中央にえだ×2 → 石のつるはし×1。鉄鉱石や金鉱石を掘れます。" },
            { name: "きのくわ×1", how: "作業台：上段左2マスにいた×2、中段中央と下段中央にえだ×2 → 木のくわ×1。水から4マス以内の土ブロックを右クリックすると「耕した土」になります。" },
            { name: "きのシャベル×1", how: "作業台：上段中央にいた×1、中段中央と下段中央にえだ×2 → 木のシャベル×1。土・砂・砂利を素早く掘れます。" },
            { name: "バケツ×1", how: "作業台：中段左右＋下段中央に鉄インゴット×3をV字配置 → バケツ×1。水や溶岩のそばで右クリックすると液体を汲めます。" },
            { name: "つりざお×1", how: "作業台：3×3グリッドの右上・中央・左下にえだ×3を斜め配置し、えだの右隣にいと×2（クモを倒して入手）→ つりざお×1。" },
            { name: "たいまつ×4", how: "インベントリ2×2：上に「せきたん（または木炭）」、下にえだ×1 → たいまつ×4（作業台不要）。設置すると周囲を明るく照らします。" },
          ].map(({ name, how }) => (
            <div key={name} className="bg-white rounded-lg p-3 border border-green-100 text-sm">
              <span className="font-black text-gray-800">{name}</span>
              <span className="text-gray-500 ml-2">— {how}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 特殊素材 */}
      <div className="mb-5">
        <h3 className="text-sm font-black text-green-800 mb-2 flex items-center gap-1">
          <span className="w-3 h-3 rounded-sm bg-blue-400 inline-block" /> 特殊素材・コマンド推奨
        </h3>
        <div className="space-y-2">
          {[
            { name: "レール×16", how: "作業台：左右2列に鉄インゴット×6（各列3個）、中央にえだ×1 → レール×16。トロッコを走らせるために地面に敷きます。" },
            { name: "トロッコ×1", how: "作業台：中段左右＋下段3マスに鉄インゴット×5をU字配置 → トロッコ×1。レールの上に置いて乗ると走ります。" },
            { name: "スノーブロック×1", how: "雪バイオームでシャベルを使うと「ゆきだま」が入手できます。ゆきだまを2×2に4個並べる → スノーブロック×1（作業台不要）。" },
            { name: "パックドアイス（氷塊）", how: "⚠ コマンド推奨。凍った海バイオームでSilk Touchエンチャントのつるはしが必要で入手が難しいです。/give コマンドをお使いください。" },
            { name: "ほね（骨）", how: "⚠ コマンド推奨。ピースフルモードではスケルトンが出ないため自然入手不可。/give コマンドをお使いください。オオカミに5本以上あげるとなかまになります。" },
            { name: "サドル（くら）", how: "⚠ コマンド推奨。クラフトで作れません。チェストや釣りでまれに入手できますが、/give コマンドが確実です。" },
            { name: "たがやしたつち（耕した土）", how: "⚠ コマンド不可・ゲーム内操作のみ。きのくわを持って水から4マス以内の土ブロックを右クリックすると作れます。" },
            { name: "みず（水入りバケツ）", how: "バケツを持って川・海・池の水ブロックに右クリックすると「水入りバケツ」になります。" },
            { name: "マグマ（溶岩入りバケツ）", how: "⚠ 注意。バケツを持って地下の溶岩湖（y=-54以下）に近づき右クリック。溶岩に落ちると即死するため、/give コマンドを強く推奨します。" },
          ].map(({ name, how }) => (
            <div key={name} className={`bg-white rounded-lg p-3 border text-sm ${how.startsWith("⚠") ? "border-orange-200" : "border-green-100"}`}>
              <span className="font-black text-gray-800">{name}</span>
              <span className="text-gray-500 ml-2">— {how}</span>
            </div>
          ))}
        </div>
      </div>

      {/* クラフトチェーン早見表 */}
      <div className="bg-white rounded-xl p-4 border border-green-200">
        <p className="font-black text-sm text-gray-800 mb-3">⛏ ゲーム開始からの素材入手チェーン</p>
        <div className="text-xs text-gray-700 space-y-1.5 font-mono">
          <div className="flex items-center gap-2">
            <span className="bg-yellow-100 border border-yellow-300 px-2 py-0.5 rounded">まるた</span>
            <span className="text-gray-400">→ 手で採取</span>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <span className="bg-yellow-100 border border-yellow-300 px-2 py-0.5 rounded">いた×4</span>
            <span className="text-gray-400">→ まるた1個からインベントリクラフト</span>
          </div>
          <div className="flex items-center gap-2 ml-8">
            <span className="bg-yellow-100 border border-yellow-300 px-2 py-0.5 rounded">ものづくりだい</span>
            <span className="text-gray-400">→ いた×4</span>
          </div>
          <div className="flex items-center gap-2 ml-12">
            <span className="bg-yellow-100 border border-yellow-300 px-2 py-0.5 rounded">えだ×4</span>
            <span className="text-gray-400">→ いた×2（縦）</span>
          </div>
          <div className="flex items-center gap-2 ml-16">
            <span className="bg-yellow-100 border border-yellow-300 px-2 py-0.5 rounded">きのつるはし</span>
            <span className="text-gray-400">→ いた×3 + えだ×2</span>
          </div>
          <div className="flex items-center gap-2 ml-20">
            <span className="bg-gray-100 border border-gray-300 px-2 py-0.5 rounded">まるいし</span>
            <span className="text-gray-400">→ きのつるはしで石を掘る</span>
          </div>
          <div className="flex items-center gap-2 ml-24">
            <span className="bg-gray-100 border border-gray-300 px-2 py-0.5 rounded">いしのつるはし</span>
            <span className="text-gray-400">→ まるいし×3 + えだ×2</span>
          </div>
          <div className="flex items-center gap-2 ml-28">
            <span className="bg-orange-100 border border-orange-300 px-2 py-0.5 rounded">鉄鉱石</span>
            <span className="text-gray-400">→ いしのつるはしで地下を掘る</span>
          </div>
          <div className="flex items-center gap-2 ml-32">
            <span className="bg-orange-100 border border-orange-300 px-2 py-0.5 rounded">鉄インゴット</span>
            <span className="text-gray-400">→ かまどで鉄鉱石を焼く</span>
          </div>
          <div className="flex items-center gap-2 ml-36">
            <span className="bg-orange-100 border border-orange-300 px-2 py-0.5 rounded">バケツ / レール / トロッコ</span>
            <span className="text-gray-400">→ 鉄インゴットでクラフト</span>
          </div>
        </div>
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

        {/* ── セクション3: 素材の用意方法フルガイド ────────────────── */}
        <AllMaterialsGuide />

        {/* ── セクション4: 各巻の素材一覧 ──────────────────────────── */}
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
