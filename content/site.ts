// このファイルの仮データを差し替えるだけで、文章・ポップアップ・配信先を変更できます。
export type PopMessage = {
  label: string;
  title: string;
  body: string;
  action: string;
  color: "pink" | "lime" | "blue" | "white";
  symbol: string;
};
export const site = {
  band: "ねずみ幸福論",
  ads: [
    {
      image: "/images/sky.jpg",
      alt: "夕空と鉄塔の下に立つ人物",
      width: 4032,
      height: 3024,
      label: "緊急受信",
      headline: "あなたへの信号、届いています。",
      action: "今すぐ接続 ▶",
      note: "接続無料・いつでも受信中",
      theme: "signal",
    },
    {
      image: "/images/stdio.jpg",
      alt: "ねずみ幸福論の演奏風景",
      width: 1027,
      height: 676,
      label: "音源配信予告",
      headline: "この音を、まだ知らないあなたへ。",
      action: "音量を上げて確認 ▶",
      note: "ねずみ幸福論 / DIGITAL RELEASE",
      theme: "music",
    },
  ],
  release: "救済ノイズ",
  englishTitle: "SALVATION NOISE",
  releaseDate: "2026.10.01",
  releaseType: "1ST DIGITAL SINGLE",
  description: "信じなくていい。ただ、聴いてほしい。",
  telephone: {
    heading: "今すぐお電話を！",
    prefix: "0120-",
    broken: "03縺ｿ-莠ｺ�†",
    note: "年中無休・深夜受付中 ／ あなたの声を、お待ちしています。",
    status: "回線状況：応答がありません",
  },
  homepage: {
    title: "ねずみ幸福論の電子礼拝室",
    titleImage: "/images/IMG_2037.png",
    subtitle: "the unofficial sanctuary / since 1998 (fiction)",
    counter: "00001998",
    welcome: "ようこそ。あなたが来ることは、ずっと前から知っていました。",
    notice: "このページは、どこからもリンクされていないはずです。",
    updates: [
      { date: "2026.09.14", text: "音源の断片をアップロードしました。" },
      { date: "2026.09.09", text: "礼拝室を再接続しました。" },
      { date: "1998.??.??", text: "管理人の所在がわからなくなりました。" },
    ],
    diary:
      "午前３時３３分。\nモニターを消しても、まだこちらを見ている。\n電線の音と、耳鳴りの区別がつかない。\n\nここにいるのは、ほんとうに私ですか。",
    guestbook: [
      { name: "名無し", date: "03:33", text: "ここ、前にも来たことがある。" },
      {
        name: "管理人不在",
        date: "--:--",
        text: "あなたの書き込みは、まだ届いていません。",
      },
    ],
  },
  transmission: [
    "> resolving soul.nezumi-kofukuron.local",
    "> anonymous connection accepted",
    "> memory fragment found: 000001",
    "> 誰かが、あなたを認識しています。",
    "> awaiting response_",
  ],
  intro: {
    videoUrl: "https://www.youtube-nocookie.com/embed/AX9SdpLbEs0",
    videoTitle: "ねずみ幸福論 — YouTube動画",
    eyebrow: "あなたは、ここにいますか。",
    title: ["救いは、", "爆音で。"],
    body: "誰もいない部屋で、接続音だけがしている。\n画面の向こうから、あなたを呼んでいる。",
    button: "入信する",
    note: "[ 接続は無料です。切断できるとは限りません。 ]",
  },
  ticker: [
    "あなたは接続されています",
    "記憶と記録は一致しません",
    "応答のない祈りを受信しました",
    "NO CARRIER / SOMEBODY IS LISTENING",
  ],
  // ミリ秒。増殖時間と崩壊時間を個別に調整できます。
  animation: { durationMs: 8500, collapseMs: 1600, maxPopups: 42 },
  // 正式なURLが未設定のため、配信先は準備中として表示します。
  platforms: [
    { name: "Spotify", url: "" },
    { name: "Apple Music", url: "" },
    { name: "YouTube Music", url: "" },
    { name: "Bandcamp", url: "" },
  ],
  // サービスの「埋め込み」機能で取得した src のURLを設定（共有リンクではありません）。
  embed: { url: "", title: "救済ノイズ — 音源プレイヤー", height: 352 },
};
export const popups: PopMessage[] = [
  {
    label: "SALVATION.EXE",
    title: "あなたは\n選ばれました。",
    body: "この出会いは、偶然ではありません。",
    action: "救済を受け取る ↗",
    color: "pink",
    symbol: "†",
  },
  {
    label: "MESSAGE_002.TXT",
    title: "信じるものは、\nうるさい。",
    body: "あなたの毎日に、ひとさじのノイズを。",
    action: "音量を上げる ↗",
    color: "lime",
    symbol: "∴",
  },
  {
    label: "SYSTEM MESSAGE",
    title: "心の容量が\n不足しています",
    body: "不要な常識を削除してください。",
    action: "常識をアンインストール",
    color: "white",
    symbol: "!",
  },
  {
    label: "UNKNOWN HOST",
    title: "天国より、\nライブハウス。",
    body: "祈り方は自由。踊り方も自由。",
    action: "こちら側へようこそ ↗",
    color: "blue",
    symbol: "†",
  },
  {
    label: "100% PURE NOISE",
    title: "その不安、\n歪ませよう。",
    body: "救いのない夜に、救いのない音楽を。",
    action: "接続する ↗",
    color: "pink",
    symbol: "∵",
  },
  {
    label: "IMPORTANT NOTICE",
    title: "考えすぎです。\n聴きましょう。",
    body: "効果には個人差があります。",
    action: "今すぐ聴く ↗",
    color: "lime",
    symbol: "◎",
  },
];
