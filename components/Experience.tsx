"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { popups, site, type PopMessage } from "@/content/site";
type Phase = "intro" | "overload" | "collapse" | "release";
function Popup({
  data,
  onClick,
  style,
  className = "",
}: {
  data: PopMessage;
  onClick?: () => void;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <article className={`popup ${data.color} ${className}`} style={style}>
      <div className="window-bar">
        <span>
          <i /> {data.label}
        </span>
        <span aria-hidden="true">− □ ×</span>
      </div>
      <div className="popup-content">
        <span className="popup-symbol" aria-hidden="true">
          {data.symbol}
        </span>
        <h3>{data.title}</h3>
        <p>{data.body}</p>
        {onClick ? (
          <button onClick={onClick}>{data.action}</button>
        ) : (
          <span className="fake-button">{data.action}</span>
        )}
      </div>
    </article>
  );
}
export default function Experience() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [count, setCount] = useState(0);
  const [reduced, setReduced] = useState(false);
  const releaseHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (phase !== "overload") return;
    const start = performance.now();
    const timer = window.setInterval(() => {
      const progress = Math.min(
        (performance.now() - start) / site.animation.durationMs,
        1,
      );
      setCount(Math.floor(progress ** 1.7 * site.animation.maxPopups));
      if (progress === 1) setPhase("collapse");
    }, 80);
    return () => window.clearInterval(timer);
  }, [phase]);
  useEffect(() => {
    if (phase !== "collapse") return;
    const timer = window.setTimeout(
      () => setPhase("release"),
      site.animation.collapseMs,
    );
    return () => window.clearTimeout(timer);
  }, [phase]);
  useEffect(() => {
    if (phase === "release") releaseHeading.current?.focus();
  }, [phase]);
  function begin() {
    setCount(0);
    setPhase(reduced ? "release" : "overload");
  }
  function skip() {
    setPhase("release");
  }
  if (phase === "release")
    return (
      <main className="release-page">
        <header className="release-header">
          <a href="./" aria-label="トップへ">
            {site.band}
            <span>®</span>
          </a>
          <span>接続が切断されました。</span>
        </header>
        <section className="release-layout">
          <div className="release-info">
            <p className="eyebrow">
              {site.releaseType} · {site.releaseDate}
            </p>
            <h1 tabIndex={-1} ref={releaseHeading}>
              {site.release}
            </h1>
            <p className="release-description">{site.description}</p>
            {site.embed.url ? (
              <iframe
                className="music-embed"
                src={site.embed.url}
                title={site.embed.title}
                height={site.embed.height}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            ) : (
              <div className="player-placeholder">
                <span className="record" aria-hidden="true">
                  ◉
                </span>
                <div>
                  <strong>{site.release}</strong>
                  <span>{site.band} · 配信準備中</span>
                </div>
                <span className="sound-bars" aria-hidden="true">
                  ▂▅▃▇▂
                </span>
              </div>
            )}
            <div className="platforms">
              {site.platforms.map((platform) =>
                platform.url ? (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {platform.name}
                    <span>聴く ↗</span>
                  </a>
                ) : (
                  <div key={platform.name}>
                    {platform.name}
                    <span>COMING SOON</span>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>
        <footer className="release-footer">
          <span>© {site.band} / ALL WE NEED IS SOUND.</span>
          <button
            onClick={() => {
              setCount(0);
              setPhase("intro");
            }}
          >
            もう一度、勧誘される ↗
          </button>
        </footer>
      </main>
    );
  return (
    <main
      className={`experience ${phase}`}
      style={
        {
          "--collapse-duration": `${site.animation.collapseMs}ms`,
        } as CSSProperties
      }
    >
      <div className="intro-scene">
        <div className="browser-chrome" aria-hidden="true">
          <span>無題のページ - {site.band} Navigator</span>
          <span>_ □ ×</span>
        </div>
        <div className="browser-menu" aria-hidden="true">
          ファイル(F)　編集(E)　表示(V)　移動(G)　お気に入り(A)
        </div>
        <div className="address-bar">
          <span>場所：</span>
          <code>https://nezumi-kofukuron.local/~salvation/index.html</code>
          <span aria-hidden="true">↵</span>
        </div>
        <div className="homepage-body">
          <header className="old-header">
            <p className="last-update">
              Last updated : {site.homepage.updates[0].date}
              　/　文字コード：不明
            </p>
            <p className="small-cross" aria-hidden="true">
              † ───────────── † ───────────── †
            </p>
            <h1>{site.homepage.title}</h1>
            <p className="site-subtitle">{site.band} / electronic sanctuary</p>
            <p className="welcome">{site.homepage.welcome}</p>
            <p className="visitor">
              あなたは{" "}
              <span
                className="counter"
                aria-label={`訪問者番号 ${site.homepage.counter}`}
              >
                {site.homepage.counter.split("").map((digit, i) => (
                  <b key={i}>{digit}</b>
                ))}
              </span>{" "}
              人目の迷い人です。
            </p>
            <p className="counter-note">
              ※ カウンターは止まっています。キリ番の報告は不要です。
            </p>
          </header>
          <div className="ticker">
            <div>
              {[...site.ticker, ...site.ticker].map((text, i) => (
                <span key={i}>… {text} …</span>
              ))}
            </div>
          </div>
          <div className="old-columns">
            <nav className="old-nav" aria-label="サイト内メニュー">
              <h2>CONTENTS</h2>
              <p className="nav-cross" aria-hidden="true">
                †
              </p>
              <a href="#entrance">入口 / enter</a>
              <a href="#news">
                更新履歴 <span className="new-label">NEW</span>
              </a>
              <a href="#diary">管理人の記憶</a>
              <a href="#guestbook">残された書き込み</a>
              <button onClick={skip}>音源へスキップ</button>
              <hr />
              <p>現在の接続状態</p>
              <span className="connection">● 接続されています</span>
              <pre className="nav-log">{site.transmission.join("\n")}</pre>
              <div className="web-badge">
                NO CARRIER
                <br />
                <b>{site.band}</b>
              </div>
              <div className="web-badge muted">
                音量注意
                <br />
                NO AUTO PLAY
              </div>
              <p className="nav-note">
                この場所を
                <br />
                忘れないでください。
              </p>
            </nav>
            <div className="old-content">
              <section className="entrance" id="entrance">
                <p className="warning-text">{site.homepage.notice}</p>
                <div
                  className="reception-image"
                  role="img"
                  aria-label="電線に囲まれた赤い受信信号"
                >
                  <div className="reception-ring" />
                  <span className="image-coordinates">
                    REC 03:33:07
                    <br />
                    CH_07 / NO INPUT
                  </span>
                  <span className="image-message">
                    あなたは、
                    <br />
                    ここにいますか。
                  </span>
                  <span className="image-bottom">
                    connection lost........................
                  </span>
                </div>
                <p className="entrance-poem">{site.intro.body}</p>
                <p className="salvation-copy">{site.intro.title.join("")}</p>
                <button
                  className="enter-link"
                  onClick={begin}
                  disabled={phase !== "intro"}
                >
                  {phase === "intro" ? site.intro.button : "救済に接続中…"}
                </button>
                <p className="enter-caption">[ enter the sanctuary ]</p>
                <p className="join-note">{site.intro.note}</p>
              </section>
              <section className="old-section" id="news">
                <h2>■ 更新履歴 / what's new</h2>
                <dl className="updates">
                  {site.homepage.updates.map((item) => (
                    <div key={item.date}>
                      <dt>{item.date}</dt>
                      <dd>{item.text}</dd>
                    </div>
                  ))}
                </dl>
                <p className="release-notice">
                  ※ {site.releaseDate} 「{site.release}」配信予定。
                </p>
              </section>
              <section className="old-section diary" id="diary">
                <h2>■ 管理人の記憶 / fragment_001</h2>
                <p>{site.homepage.diary}</p>
                <span>続きを読むことはできません。</span>
              </section>
              <section className="old-section" id="guestbook">
                <h2>■ 残された書き込み / read only</h2>
                {site.homepage.guestbook.map((post, i) => (
                  <article className="guestbook-post" key={i}>
                    <p>
                      No.00{i + 1}　{post.name}　[{post.date}]
                    </p>
                    <p>{post.text}</p>
                  </article>
                ))}
              </section>
            </div>
          </div>
          <footer className="old-footer">
            <p>このサイトは {site.band} の音源配信記念サイトです。</p>
            <p>動作環境：あなたのいる場所 ／ 推奨解像度：800 × 600</p>
            <p className="webring">
              <a href="#entrance">← 前の記憶</a>　[ 電子礼拝環 ]　
              <a href="#diary">次の記憶 →</a>
            </p>
            <p>
              無断転載・無断救済を禁じます。
              <br />
              Copyright © {site.band}. All memories reserved.
            </p>
          </footer>
        </div>
        <div className="browser-status">
          <span>ドキュメント：読み込み完了</span>
          <span>接続：不明</span>
        </div>
      </div>
      <aside className="desktop-messages" aria-label="受信メッセージ">
        <p>受信されたメッセージ (3)</p>
        <Popup data={popups[0]} onClick={begin} className="initial first" />
        <Popup
          data={popups[1 % popups.length]}
          onClick={begin}
          className="initial second"
        />
        <Popup
          data={popups[2 % popups.length]}
          onClick={begin}
          className="initial third"
        />
        <pre className="desktop-log">{site.transmission.join("\n")}</pre>
      </aside>
      {(phase === "overload" || phase === "collapse") && (
        <>
          <div className="popup-storm" aria-hidden="true">
            {Array.from({ length: count }, (_, i) => (
              <Popup
                key={i}
                data={popups[i % popups.length]}
                className="storm-popup"
                style={
                  {
                    left: `${(i * 37 + 8) % 76}%`,
                    top: `${(i * 29 + 3) % 72}%`,
                    zIndex: i,
                  } as CSSProperties
                }
              />
            ))}
          </div>
          <div className="overload-status" role="status">
            {phase === "collapse"
              ? "SIGNAL LOST. 接続が失われました。"
              : `救済をダウンロード中… ${Math.round((count / site.animation.maxPopups) * 100)}%`}
          </div>
          <button className="emergency-skip" onClick={skip}>
            音源へスキップ ↗
          </button>
        </>
      )}
      {phase === "collapse" && (
        <div className="signal-noise" aria-hidden="true">
          <div className="noise-grain" />
          <div className="noise-tracking" />
        </div>
      )}
      <noscript>
        <div className="noscript-note">
          演出にはJavaScriptを使用します。{site.band}「{site.release}」
          {site.releaseDate} 配信予定。
          {site.platforms
            .filter((p) => p.url)
            .map((p) => (
              <a key={p.name} href={p.url}>
                {p.name} ↗{" "}
              </a>
            ))}
        </div>
      </noscript>
    </main>
  );
}
