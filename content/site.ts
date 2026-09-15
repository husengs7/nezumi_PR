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
  release: "その街であなたは...",
  releaseDate: "2026.09.21",
  releaseType: "1ST DIGITAL SINGLE",
  description: "ねずみ幸福論 1stシングル「その街であなたは...」配信記念サイト。",
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
    counter: "�縺▓?繧×■�",
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
    title: ["ねずみ幸福論はあなたを救いたい。"],
    body: "あなたは迷子なの？それともどこかで？",
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
  embed: { url: "", title: "その街であなたは... — 音源プレイヤー", height: 352 },
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
    label: "SYSTEM MESSAGE",
    title: "心の容量が\n不足しています。",
    body: "不要な常識を削除してください。",
    action: "常識をアンインストール",
    color: "white",
    symbol: "!",
  },
  {
    label: "IMPORTANT NOTICE",
    title: "考えすぎです。\n聴いてください。",
    body: "効果には個人差があります。",
    action: "今すぐ聴く ↗",
    color: "lime",
    symbol: "◎",
  },
];
