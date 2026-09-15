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
function RetroAd({ ad }: { ad: (typeof site.ads)[number] }) {
  return (
    <article className={`retro-ad ${ad.theme}`}>
      <div className="ad-top">
        <span>PR　{ad.label}</span>
        <button
          type="button"
          className="ad-close"
          aria-label="閉じる（演出用・動作しません）"
        >
          ×
        </button>
      </div>
      <div className="ad-picture">
        <img src={ad.image} alt={ad.alt} width={ad.width} height={ad.height} />
        <span className="ad-sticker">受信中!</span>
      </div>
      <p className="ad-headline">{ad.headline}</p>
      <span className="ad-action">{ad.action}</span>
      <p className="ad-note">{ad.note}</p>
    </article>
  );
}
export default function Experience() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [count, setCount] = useState(0);
  const [reduced, setReduced] = useState(false);
  const releaseHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    // 初回URLに残ったアンカー位置ではなく、必ずページ先頭を表示する。
    if (window.location.hash) {
      window.history.replaceState(
        window.history.state,
        "",
        window.location.pathname + window.location.search,
      );
    }
    const resetScroll = () =>
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    resetScroll();
    const frame = window.requestAnimationFrame(resetScroll);
    window.addEventListener("pageshow", resetScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pageshow", resetScroll);
      window.history.scrollRestoration = previous;
    };
  }, []);
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
    if (phase === "intro" || phase === "release") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
    if (phase === "release")
      releaseHeading.current?.focus({ preventScroll: true });
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
        <div className="homepage-body">
          <header className="old-header">
            <p className="last-update">
              Last updated : {site.homepage.updates[0].date}
              　/　文字コード：不明
            </p>
            <p className="small-cross" aria-hidden="true">
              † ───────────── † ───────────── †
            </p>
            <h1 className="logo-heading">
              <span className="logo-crop">
                <img
                  className="title-image"
                  src={site.homepage.titleImage}
                  alt={site.homepage.title}
                  width={2224}
                  height={1668}
                />
              </span>
            </h1>
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
            <section className="telephone-banner" aria-label="電話案内の演出">
              <div className="telephone-heading">
                <span aria-hidden="true">☎</span>
                <h2>{site.telephone.heading}</h2>
              </div>
              <p
                className="telephone-number"
                aria-label="電話番号は途中から文字化けしていて読めません"
              >
                <span aria-hidden="true">
                  {site.telephone.prefix}
                  <span className="telephone-corrupt">
                    {site.telephone.broken}
                  </span>
                </span>
              </p>
              <p className="telephone-note">{site.telephone.note}</p>
              <p className="telephone-status">{site.telephone.status}</p>
            </section>
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
                <div className="entrance-video">
                  <iframe
                    src={site.intro.videoUrl}
                    title={site.intro.videoTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    loading="lazy"
                  />
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
              <aside className="inline-ad" aria-label="広告風の演出">
                {site.ads[0] && <RetroAd ad={site.ads[0]} />}
              </aside>
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
              <aside className="inline-ad" aria-label="広告風の演出">
                {site.ads[1] && <RetroAd ad={site.ads[1]} />}
              </aside>
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
      </div>
      <aside className="desktop-messages" aria-label="広告風の演出">
        <p>ADVERTISEMENT / 受信中</p>
        {site.ads.map((ad) => (
          <RetroAd ad={ad} key={ad.image} />
        ))}
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
                    "--distort-delay": `${-(i % 5) * 47}ms`,
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
        <svg
          className="distortion-filter"
          aria-hidden="true"
          width="0"
          height="0"
        >
          <defs>
            <filter
              id="popup-distortion"
              x="-30%"
              y="-10%"
              width="160%"
              height="120%"
              colorInterpolationFilters="sRGB"
            >
              <feTurbulence
                type="turbulence"
                baseFrequency="0.004 0.16"
                numOctaves="1"
                seed="7"
                result="interference"
              />
              <feComponentTransfer in="interference" result="horizontal-noise">
                <feFuncA type="linear" slope="0" intercept="0.5" />
              </feComponentTransfer>
              <feDisplacementMap
                in="SourceGraphic"
                in2="horizontal-noise"
                scale="42"
                xChannelSelector="R"
                yChannelSelector="A"
              />
            </filter>
          </defs>
        </svg>
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
