"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ─── Image placeholder component ─────────────────────────────────────────────
// Чтобы добавить своё изображение — положи файл в public/images/ с нужным именем

function ImgPlaceholder({
  label,
  className,
  style,
}: {
  label: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`img-placeholder ${className ?? ""}`} style={style}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6A4828" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
      <span>{label}</span>
    </div>
  );
}

// ─── Smart image — показывает файл или плейсхолдер ───────────────────────────
function SmartImg({
  src,
  alt,
  placeholderLabel,
  fill,
  width,
  height,
  className,
  style,
  objectFit = "cover",
}: {
  src: string;
  alt: string;
  placeholderLabel: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  objectFit?: "cover" | "contain";
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <ImgPlaceholder
        label={placeholderLabel}
        className={className}
        style={fill ? { position: "absolute", inset: 0, ...style } : { width, height, ...style }}
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        style={{ objectFit, ...style }}
        onError={() => setHasError(true)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width!}
      height={height!}
      className={className}
      style={{ objectFit, ...style }}
      onError={() => setHasError(true)}
    />
  );
}


// ─── Metro Map SVG ────────────────────────────────────────────────────────────
const MetroMapSVG = () => (
  <svg viewBox="0 0 230 195" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <rect width="230" height="195" fill="#0E0B07" />

    {/* ── Lines ── */}
    {/* Ring (orange) */}
    <ellipse cx="115" cy="98" rx="54" ry="49" fill="none" stroke="#D4870A" strokeWidth="3.2" opacity="0.92" />

    {/* Red vertical */}
    <polyline points="90,16 93,54 96,98 99,142 102,178"
      fill="none" stroke="#CC2020" strokeWidth="2.6" strokeLinecap="round" />

    {/* Blue horizontal */}
    <polyline points="32,94 66,97 115,98 162,97 198,94"
      fill="none" stroke="#2255CC" strokeWidth="2.6" strokeLinecap="round" />

    {/* Green diagonal */}
    <polyline points="58,18 80,52 115,98 150,144 168,170"
      fill="none" stroke="#228855" strokeWidth="2.6" strokeLinecap="round" />

    {/* Yellow small */}
    <polyline points="115,36 117,66 117,98 117,130 115,160"
      fill="none" stroke="#C8A010" strokeWidth="1.8" strokeLinecap="round" />

    {/* ── Stations ── */}

    {/* Center hub */}
    <circle cx="115" cy="98" r="8" fill="#1A1208" stroke="#D4870A" strokeWidth="2.2" />
    <circle cx="115" cy="98" r="3.5" fill="#D4870A" opacity="0.85" />

    {/* ХАНЗА highlighted */}
    <circle cx="158" cy="58" r="6" fill="#FF6600" stroke="#1A0800" strokeWidth="1.5">
      <animate attributeName="opacity" values="1;0.7;1" dur="2.2s" repeatCount="indefinite" />
    </circle>
    <circle cx="158" cy="58" r="11" fill="none" stroke="#FF6600" strokeWidth="0.7" opacity="0.3">
      <animate attributeName="r" values="9;14;9" dur="2.2s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.3;0;0.3" dur="2.2s" repeatCount="indefinite" />
    </circle>
    <text x="167" y="55" fontFamily="Oswald,sans-serif" fontSize="8.5" fontWeight="700" fill="#FFCC44">ХАНЗА</text>

    {/* ПОЛИС */}
    <circle cx="143" cy="76" r="4" fill="#FFD700" stroke="#1A0800" strokeWidth="1.1" />
    <text x="150" y="73" fontFamily="Oswald,sans-serif" fontSize="6.5" fill="#C8B090">ПОЛИС</text>

    {/* ВДНХ */}
    <circle cx="158" cy="98" r="4" fill="#2255CC" stroke="#1A0800" strokeWidth="1.1" />
    <text x="163" y="95" fontFamily="Oswald,sans-serif" fontSize="6.5" fill="#C8B090">ВДНХ</text>

    {/* БTАЖНИЯ */}
    <circle cx="135" cy="98" r="3.5" fill="#FFD700" stroke="#1A0800" strokeWidth="1" />
    <text x="136" y="109" fontFamily="Oswald,sans-serif" fontSize="6" fill="#C8B090">БTАЖН</text>

    {/* РЕД ЛИНЕ */}
    <circle cx="99" cy="142" r="3.8" fill="#CC2020" stroke="#1A0800" strokeWidth="1" />
    <text x="74" y="150" fontFamily="Oswald,sans-serif" fontSize="6.5" fill="#C8B090">РЕД ЛИНЕ</text>

    {/* ВЕНИЯ */}
    <circle cx="117" cy="130" r="3.5" fill="#228855" stroke="#1A0800" strokeWidth="1" />
    <text x="120" y="138" fontFamily="Oswald,sans-serif" fontSize="6" fill="#C8B090">ВЕНИЯ</text>

    {/* НАИЗН */}
    <circle cx="102" cy="170" r="3.5" fill="#2255CC" stroke="#1A0800" strokeWidth="1" />
    <text x="87" y="180" fontFamily="Oswald,sans-serif" fontSize="6.5" fill="#C8B090">НАИЗН</text>

    {/* ПАНОЛ */}
    <circle cx="80" cy="116" r="3.5" fill="#C8A010" stroke="#1A0800" strokeWidth="1" />
    <text x="60" y="113" fontFamily="Oswald,sans-serif" fontSize="6.5" fill="#C8B090">ПАНОЛ</text>

    {/* ЛАPPИНА */}
    <circle cx="84" cy="70" r="3.5" fill="#CC2020" stroke="#1A0800" strokeWidth="1" />
    <text x="58" y="67" fontFamily="Oswald,sans-serif" fontSize="6.5" fill="#C8B090">ЛАPPИНА</text>
  </svg>
);

// ─── Torch ───────────────────────────────────────────────────────────────────
const Torch = ({ side }: { side: "left" | "right" }) => (
  <div
    className="absolute top-0 h-full pointer-events-none"
    style={{
      [side === "left" ? "left" : "right"]: 0,
      width: 80,
      zIndex: 12,
    }}
  >
    <div
      className="absolute"
      style={{
        top: 28,
        [side === "left" ? "left" : "right"]: 16,
      }}
    >
      {/* Bracket arm */}
      <div
        style={{
          width: 12, height: 28,
          background: "linear-gradient(180deg,#3A2010,#221408)",
          border: "1px solid #5A3010",
          borderRadius: "2px 2px 3px 3px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute", top: 5,
            [side === "left" ? "right" : "left"]: 11,
            width: 12, height: 2,
            background: "#3A2010",
            borderTop: "1px solid #5A3010",
          }}
        />
      </div>

      {/* Outer flame */}
      <div
        className="flicker"
        style={{
          position: "absolute", top: -20,
          left: "50%", transform: "translateX(-50%)",
          width: 20, height: 26,
          background: "radial-gradient(ellipse at 50% 88%, #FF8800 0%, #FF4000 50%, rgba(255,20,0,0.2) 80%, transparent 100%)",
          borderRadius: "50% 50% 38% 38%",
          filter: "blur(0.8px)",
        }}
      />
      {/* Inner flame */}
      <div
        className="flicker"
        style={{
          position: "absolute", top: -13,
          left: "50%", transform: "translateX(-50%)",
          width: 12, height: 16,
          background: "radial-gradient(ellipse at 50% 85%, #FFE000 0%, #FFA000 60%, transparent 100%)",
          borderRadius: "50% 50% 38% 38%",
          filter: "blur(0.4px)",
          animationDelay: "0.55s",
        }}
      />
      {/* Glow */}
      <div
        className="flicker"
        style={{
          position: "absolute", top: -46,
          left: "50%", transform: "translateX(-50%)",
          width: 110, height: 110,
          background: side === "left"
            ? "radial-gradient(ellipse at 25% 45%, rgba(255,138,0,0.30) 0%, rgba(255,70,0,0.07) 45%, transparent 68%)"
            : "radial-gradient(ellipse at 75% 45%, rgba(255,138,0,0.30) 0%, rgba(255,70,0,0.07) 45%, transparent 68%)",
          animationDelay: "0.28s",
        }}
      />
    </div>
  </div>
);

// ─── Slides ───────────────────────────────────────────────────────────────────
const SLIDES = [
  { title: "МЕТРО 2033:", sub: "ВЫЖИВИ В ТЕМНОТЕ", cta: "ЧИТАТЬ ДАЛЕЕ" },
  { title: "ИСТОРИЯ:", sub: "ГЛУБИНЫ ПОДЗЕМКИ", cta: "УЗНАТЬ БОЛЬШЕ" },
  { title: "СНАРЯЖЕНИЕ:", sub: "АРСЕНАЛ СТАЛКЕРА", cta: "СМОТРЕТЬ" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Metro2033Page() {
  const [slide, setSlide] = useState(0);
  const [nav, setNav] = useState("ГЛАВНАЯ");
  const NAV = ["ГЛАВНАЯ", "ИСТОРИЯ", "СТАНЦИИ", "СНАРЯЖЕНИЕ", "ОБЩИНА", "МАГАЗИН"];
  const FOOTNAV = ["ГЛАВНАЯ", "ИСТОК", "ПОЛЕН", "РЕМОНТ", "ОБЩННА", "МАГАЗИН"];

  const next = useCallback(() => setSlide((p) => (p + 1) % SLIDES.length), []);
  useEffect(() => { const t = setInterval(next, 5500); return () => clearInterval(t); }, [next]);

  return (
    <div
      className="newspaper-bg"
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Fold crease lines */}
      <div className="newspaper-fold" />
      {/* Dark vignette so site container stands out */}
      <div className="newspaper-vignette" />

      <div
        style={{
          width: "100%",
          maxWidth: "1060px",
          height: "calc(100vh - 36px)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          background: "#0A0804",
          fontFamily: "'PT Serif', serif",
          color: "#C8B89A",
          borderLeft: "1px solid #2A1A08",
          borderRight: "1px solid #2A1A08",
          boxShadow: "0 0 60px rgba(0,0,0,0.95), -2px 0 20px rgba(0,0,0,0.8), 2px 0 20px rgba(0,0,0,0.8)",
          position: "relative",
          zIndex: 2,
        }}
      >


      {/* ════════════════════════ HEADER ════════════════════════ */}
      <header style={{ flexShrink: 0, position: "relative", zIndex: 30 }}>

        {/* Top gold line */}
        <div style={{ height: 3, background: "linear-gradient(90deg,transparent,#7A4010 12%,#D4870A 50%,#7A4010 88%,transparent)" }} />

        {/* Logo row */}
        <div
          style={{
            background: "linear-gradient(180deg,#1E1608 0%,#131008 100%)",
            borderBottom: "1px solid #2E1C0A",
            padding: "7px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* TL rivet */}
          <div style={{ position: "absolute", top: 6, left: 6, width: 8, height: 8, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%,#5A4838,#2A1E14)", border: "1px solid #4A3828", boxShadow: "inset 0 1px 1px rgba(255,200,120,0.1)" }} />
          {/* TR rivet */}
          <div style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%,#5A4838,#2A1E14)", border: "1px solid #4A3828", boxShadow: "inset 0 1px 1px rgba(255,200,120,0.1)" }} />

          {/* Left ornament */}
          <div style={{ position: "absolute", left: 20, display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 18, height: 18, borderRadius: "50%", border: "1px solid #4A3020", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", border: "1px solid #6A4820", background: "#1A1008" }} />
            </div>
            <div style={{ width: 60, height: 1, background: "linear-gradient(90deg,#5A3820,transparent)" }} />
          </div>

          <h1 style={{
            fontFamily: "'Oswald',sans-serif",
            fontWeight: 700,
            fontSize: 26,
            letterSpacing: "0.28em",
            color: "#D8C080",
            textShadow: "0 0 24px rgba(200,150,20,0.4),0 2px 6px rgba(0,0,0,1)",
            textTransform: "uppercase",
          }}>
            МЕТРО 2033
          </h1>

          {/* Right ornament */}
          <div style={{ position: "absolute", right: 20, display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 60, height: 1, background: "linear-gradient(270deg,#5A3820,transparent)" }} />
            <div style={{ width: 18, height: 18, borderRadius: "50%", border: "1px solid #4A3020", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", border: "1px solid #6A4820", background: "#1A1008" }} />
            </div>
          </div>
        </div>

        {/* Nav row */}
        <div style={{
          background: "linear-gradient(180deg,#181208 0%,#120E06 100%)",
          borderBottom: "2px solid #2E1C08",
          padding: "4px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(18px,3.5vw,48px)",
        }}>
          {NAV.map((item) => (
            <button
              key={item}
              id={`nav-${item.toLowerCase()}`}
              onClick={() => setNav(item)}
              className={`nav-link ${nav === item ? "active" : ""}`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Bottom line */}
        <div style={{ height: 2, background: "linear-gradient(90deg,transparent,#4A2808 18%,#7A4818 50%,#4A2808 82%,transparent)" }} />
      </header>

      {/* ════════════════════════ HERO ════════════════════════════ */}
      <div
        style={{
          flexShrink: 0,
          position: "relative",
          height: "clamp(200px,30vh,290px)",
          overflow: "hidden",
        }}
      >
        {/* ── Background image ──
            📁 Положи файл: public/images/hero-bg.jpg
               (тёмная иллюстрация туннеля метро)
        */}
        <div className="absolute inset-0">
          <SmartImg
            key="/hero-bg.png"
            src="/hero-bg.png"
            alt="Фон туннеля метро"
            placeholderLabel="hero-bg.jpg"
            fill
            objectFit="cover"
          />
        </div>

        {/* Dark overlay for readability */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(4,3,2,0.15) 0%, rgba(4,3,2,0.05) 40%, rgba(4,3,2,0.55) 65%, rgba(4,3,2,0.80) 100%)", zIndex: 2 }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0" style={{ height: "45%", background: "linear-gradient(transparent,rgba(4,3,2,0.75))", zIndex: 3 }} />

        {/* Brick texture on top */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04, zIndex: 1 }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="bk" x="0" y="0" width="52" height="24" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="50" height="11" fill="none" stroke="#C8804A" strokeWidth="0.5" />
              <rect x="26" y="12" width="50" height="11" fill="none" stroke="#C8804A" strokeWidth="0.5" />
              <rect x="-26" y="12" width="50" height="11" fill="none" stroke="#C8804A" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bk)" />
        </svg>

        {/* Torches */}
        <Torch side="left" />
        <Torch side="right" />

        {/* ── Metro M sign (left) ── */}
        <div className="absolute" style={{ left: "5%", top: "14%", zIndex: 15 }}>
          <div style={{
            background: "#8A0000", border: "2px solid #CC0808", borderRadius: 4,
            width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 14px rgba(180,0,0,0.45)",
          }}>
            <span style={{ fontFamily: "serif", fontWeight: 900, fontSize: 22, color: "white", lineHeight: 1 }}>М</span>
          </div>
          <div style={{
            marginTop: 5, background: "#12100A", border: "1px solid #3A2808", padding: "2px 8px",
          }}>
            <span style={{ fontFamily: "'Oswald',sans-serif", fontSize: 7.5, letterSpacing: "0.06em", color: "#6A5848", textTransform: "uppercase" }}>ВХОД В МЕТРО</span>
          </div>
        </div>

        {/* ── ВДНХ sign (right) ── */}
        <div className="absolute" style={{ right: "4.5%", top: "14%", zIndex: 15 }}>
          <div style={{ background: "#1A4E7A", border: "2px solid #2A70A8", borderRadius: 3, padding: "4px 14px", boxShadow: "0 0 10px rgba(35,105,175,0.35)" }}>
            <span style={{ fontFamily: "'Oswald',sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: "0.14em", color: "#E8F6FF" }}>ВДНХ</span>
          </div>
          <div style={{ marginTop: 8, background: "#1A1206", border: "2px solid #7A5606", padding: "3px 10px", display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ fontSize: 12, color: "#E89010" }}>⚠</span>
            <span style={{ fontFamily: "'Oswald',sans-serif", fontSize: 7.5, letterSpacing: "0.07em", color: "#7A5606" }}>ОПАСНО</span>
          </div>
        </div>

        {/* ── Stalker image ──
            📁 Положи файл: public/images/stalker.png
               (PNG с прозрачным фоном — персонаж с противогазом и АКМ)
        */}
        <div
          className="absolute bottom-0"
          style={{
            left: "4%",
            width: "clamp(150px,19vw,240px)",
            height: "100%",
            zIndex: 10,
          }}
        >
          <SmartImg
            key="/stalker.png"
            src="/stalker.png"
            alt="Сталкер с противогазом"
            placeholderLabel="stalker.png"
            fill
            objectFit="contain"
            style={{ objectPosition: "bottom" }}
          />
        </div>

        {/* ── Slide text (right side) ── */}
        <div
          className="absolute inset-0"
          style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: "38%", paddingRight: "clamp(16px,5%,60px)", zIndex: 20 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45 }}
            >
              <h2 style={{
                fontFamily: "'Oswald',sans-serif",
                fontWeight: 700,
                fontSize: "clamp(22px,3vw,36px)",
                lineHeight: 1.1,
                textTransform: "uppercase",
                color: "#EEE0A0",
                textShadow: "0 0 50px rgba(0,0,0,1),0 2px 12px rgba(0,0,0,1)",
                letterSpacing: "0.04em",
              }}>
                {SLIDES[slide].title}
                <br />
                {SLIDES[slide].sub}
              </h2>
              <div style={{ marginTop: 18 }}>
                <a href="#" className="btn-amber" id={`hero-cta-${slide}`}>{SLIDES[slide].cta}</a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Dots — bottom LEFT ── */}
        <div className="absolute" style={{ bottom: 14, left: "clamp(16px,5%,32px)", display: "flex", gap: 8, zIndex: 25 }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              id={`dot-${i}`}
              onClick={() => setSlide(i)}
              className={`slider-dot ${i === slide ? "active" : ""}`}
            />
          ))}
        </div>
      </div>

      {/* Gold separator */}
      <div style={{ height: 3, flexShrink: 0, background: "linear-gradient(90deg,transparent,#7A4010 10%,#D4870A 50%,#7A4010 90%,transparent)" }} />

      {/* ════════════════════════ 4 CARDS ════════════════════════ */}
      <main
        style={{
          flex: 1,
          minHeight: 0,
          padding: "7px 7px 5px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: 7,
        }}
      >

        {/* ══ 1. ПОСЛЕДНИЕ НОВОСТИ ══ */}
        <div
          id="card-news"
          className="metal-panel riveted riveted-tl metro-card"
          style={{ padding: 10, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", zIndex: 0 }}
        >
          <div className="texture-overlay" />
          <div className="section-heading" style={{ position: "relative", zIndex: 2 }}>
            <span>Последние новости</span>
          </div>

          {/* Paper card */}
          <div
            style={{
              flex: 1,
              position: "relative",
              background: "linear-gradient(160deg,#1E1A0C 0%,#141008 100%)",
              border: "1px solid #2E2010",
              padding: "10px 12px",
              overflow: "hidden",
              zIndex: 2,
            }}
          >
            {/* Ruled lines */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 20px,rgba(80,60,20,0.10) 20px,rgba(80,60,20,0.10) 21px)",
            }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{
                fontFamily: "'Oswald',sans-serif",
                fontWeight: 700,
                fontSize: "clamp(16px,1.5vw,22px)",
                lineHeight: 1.15,
                color: "#D4C490",
                textTransform: "uppercase",
                textShadow: "0 1px 4px rgba(0,0,0,0.8)",
              }}>
                НАПАДЕНИЕ НА ВДНХ
              </p>
              <div style={{ height: 1, background: "#3A2A10", margin: "8px 0" }} />
              <p style={{
                fontFamily: "'Oswald',sans-serif",
                fontWeight: 700,
                fontSize: "clamp(13px,1.1vw,17px)",
                lineHeight: 1.2,
                color: "#B8A878",
                textTransform: "uppercase",
              }}>
                Новый Отряд Сталкеров
              </p>
            </div>
          </div>

          <div style={{ marginTop: 8, position: "relative", zIndex: 2 }}>
            <a href="#" className="btn-amber" id="news-cta" style={{ fontSize: 10, padding: "5px 14px" }}>Читать Далее</a>
          </div>
        </div>

        {/* ══ 2. КАРТА МЕТРО ══ */}
        <div
          id="card-map"
          className="metal-panel riveted riveted-tl metro-card"
          style={{ padding: 10, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", zIndex: 0 }}
        >
          <div className="texture-overlay" />
          <div className="section-heading" style={{ position: "relative", zIndex: 2 }}><span>Карта Метро</span></div>

          <div style={{ flex: 1, border: "1px solid #221408", background: "#0A0806", overflow: "hidden", position: "relative", zIndex: 2 }}>
            <MetroMapSVG />
          </div>

          <div style={{ marginTop: 8, textAlign: "center", position: "relative", zIndex: 2 }}>
            <a href="#" className="btn-amber" id="map-cta" style={{ fontSize: 10, padding: "5px 20px" }}>Карта Метро</a>
          </div>
        </div>

        {/* ══ 3. ГЕРОИ И ОРУЖИЕ ══ */}
        <div
          id="card-heroes"
          className="metal-panel riveted riveted-tl metro-card"
          style={{ padding: 10, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", zIndex: 0 }}
        >
          <div className="texture-overlay" />
          <div className="section-heading" style={{ position: "relative", zIndex: 2 }}><span>Герои и Оружие</span></div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6, position: "relative", zIndex: 2 }}>

            {/* Row 1: mask + rifle */}
            <div style={{ flex: 1, background: "#0C0A06", border: "1px solid #221408", display: "flex", alignItems: "center", gap: 8, padding: "6px 10px" }}>
              {/* Gas mask icon */}
              <svg viewBox="0 0 54 54" style={{ width: 54, height: 54, flexShrink: 0 }} fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="27" cy="30" rx="21" ry="19" fill="#1E1C12" stroke="#3A3820" strokeWidth="1.5" />
                <ellipse cx="27" cy="16" rx="21" ry="11" fill="#252018" stroke="#3A3820" strokeWidth="1" />
                {/* Left lens */}
                <circle cx="16" cy="25" r="10" fill="#0A0C08" stroke="#2E2C18" strokeWidth="1.5" />
                <circle cx="16" cy="25" r="6.5" fill="#0E1008" stroke="#1A2015" strokeWidth="1" />
                <circle cx="16" cy="25" r="3.5" fill="#152018" opacity="0.9" />
                <circle cx="13.5" cy="22.5" r="2.2" fill="rgba(170,215,190,0.1)" />
                {/* Right lens */}
                <circle cx="38" cy="25" r="10" fill="#0A0C08" stroke="#2E2C18" strokeWidth="1.5" />
                <circle cx="38" cy="25" r="6.5" fill="#0E1008" stroke="#1A2015" strokeWidth="1" />
                <circle cx="38" cy="25" r="3.5" fill="#152018" opacity="0.9" />
                <circle cx="35.5" cy="22.5" r="2.2" fill="rgba(170,215,190,0.1)" />
                {/* Bridge */}
                <rect x="24" y="23" width="6" height="4" rx="1.5" fill="#282818" stroke="#3A3820" strokeWidth="0.5" />
                {/* Bottom filter */}
                <ellipse cx="27" cy="45" rx="9" ry="6" fill="#252018" stroke="#3A3820" strokeWidth="1" />
                <rect x="20" y="40" width="14" height="4" rx="1" fill="#1E1C12" stroke="#3A3820" strokeWidth="0.5" />
                {/* Side straps */}
                <path d="M6 24 Q2 24 2 30 Q2 36 7 35" fill="none" stroke="#2E2C18" strokeWidth="1.5" />
                <path d="M48 24 Q52 24 52 30 Q52 36 47 35" fill="none" stroke="#2E2C18" strokeWidth="1.5" />
              </svg>

              {/* Rifle icon */}
              <svg viewBox="0 0 95 24" style={{ flex: 1, height: 34 }} fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="9" width="52" height="8" rx="3" fill="#1C1A0C" stroke="#3A3818" strokeWidth="0.9" />
                <rect x="52" y="7" width="37" height="10" rx="2" fill="#222010" stroke="#3A3818" strokeWidth="0.8" />
                <rect x="87" y="9" width="6" height="6" rx="1" fill="#1A1808" stroke="#3A3414" strokeWidth="0.6" />
                <rect x="55" y="17" width="18" height="8" rx="1.5" fill="#1A1808" stroke="#2E2C10" strokeWidth="0.7" />
                <rect x="32" y="7" width="20" height="4" rx="1" fill="#2A2818" stroke="#3A3818" strokeWidth="0.5" />
                <circle cx="10" cy="13" r="2.5" fill="#1A1808" stroke="#3A3818" strokeWidth="0.8" />
                {[8, 15, 22].map((x, i) => <rect key={i} x={x} y="8" width="4" height="2" rx="0.5" fill="#2A2816" />)}
              </svg>
            </div>

            {/* Row 2: flashlight + bullets */}
            <div style={{ flex: 1, background: "#0C0A06", border: "1px solid #221408", display: "flex", alignItems: "center", gap: 8, padding: "6px 10px" }}>
              {/* Flashlight */}
              <svg viewBox="0 0 28 54" style={{ width: 28, height: 50, flexShrink: 0 }} fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="2" width="12" height="34" rx="5" fill="#222010" stroke="#3A3820" strokeWidth="1.2" />
                <ellipse cx="14" cy="36" rx="9" ry="5.5" fill="#2A2818" stroke="#5A4820" strokeWidth="1" />
                <ellipse cx="14" cy="37.5" rx="6" ry="3.5" fill="#C8980A" opacity="0.3" />
                <path d="M5 39 L0 52 L28 52 L23 39Z" fill="rgba(200,160,10,0.055)" />
                <rect x="11" y="16" width="6" height="11" rx="2" fill="#1A1808" />
                <circle cx="14" cy="10" r="3" fill="#181808" stroke="#2A2818" strokeWidth="0.5" />
              </svg>

              {/* Bullets */}
              <svg viewBox="0 0 68 36" style={{ flex: 1, height: 36 }} fill="none" xmlns="http://www.w3.org/2000/svg">
                {[0, 1, 2, 3, 4].map((i) => (
                  <g key={i} transform={`translate(${i * 13 + 1}, 0)`}>
                    <rect x="2" y="12" width="9" height="22" rx="2" fill="#2E2C18" stroke="#4A4820" strokeWidth="0.8" />
                    <ellipse cx="6.5" cy="12" rx="4.5" ry="5.5" fill="#7A6828" stroke="#9A8838" strokeWidth="0.6" />
                    <rect x="2" y="23" width="9" height="4" fill="#3A3820" opacity="0.45" />
                  </g>
                ))}
              </svg>
            </div>

            {/* Label */}
            <div style={{
              background: "linear-gradient(90deg,#141008,#1C1408 50%,#141008)",
              border: "1px solid #221408",
              padding: "4px 0",
              textAlign: "center",
            }}>
              <span style={{ fontFamily: "'Oswald',sans-serif", fontSize: 9.5, letterSpacing: "0.12em", color: "#6A5A40", textTransform: "uppercase" }}>
                Снаряжение Сталкера
              </span>
            </div>
          </div>

          <div style={{ marginTop: 8, textAlign: "center", position: "relative", zIndex: 2 }}>
            <a href="#" className="btn-amber" id="heroes-cta" style={{ fontSize: 10, padding: "5px 26px" }}>Герои</a>
          </div>
        </div>

        {/* ══ 4. ОТЧЁТЫ ИЗ ТУННЕЛЕЙ ══ */}
        <div
          id="card-tunnels"
          className="metal-panel riveted riveted-tl metro-card"
          style={{ padding: 10, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", zIndex: 0 }}
        >
          <div className="texture-overlay" />
          <div className="section-heading" style={{ position: "relative", zIndex: 2 }}><span>Отчёты из Туннелей</span></div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", zIndex: 2 }}>
            {[
              { num: "298", text: "Нападения в линии на последних 2033 — выжившая упала для переговора...", time: "12 мин. назад" },
              { num: "1102", text: "Погрозовое переизнасилования мимо на левного метро: Модела...", time: "12 июня 2033" },
            ].map((e, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  borderBottom: i === 0 ? "1px solid #261608" : "none",
                  padding: "6px 0",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {/* Icon + title */}
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{
                    width: 15, height: 15,
                    background: "#3A1E08",
                    border: "1px solid #6A3810",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <span style={{ fontSize: 8, color: "#D4870A", fontWeight: 700, lineHeight: 1 }}>Ф</span>
                  </div>
                  <span style={{ fontFamily: "'Oswald',sans-serif", fontSize: 10.5, color: "#9A8A70", letterSpacing: "0.04em" }}>
                    Форм№ {e.num}
                  </span>
                </div>

                {/* Text */}
                <p style={{ fontSize: 9.5, color: "#615040", lineHeight: 1.4, marginTop: 3 }}>{e.text}</p>

                {/* Meta */}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
                  <span style={{ fontSize: 8.5, color: "#3E2E1A" }}>{e.time}</span>
                  <span style={{ fontSize: 8.5, color: "#5A3818" }}>Λūλ 13</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 8, textAlign: "center", position: "relative", zIndex: 2 }}>
            <a href="#" className="btn-amber" id="tunnels-cta" style={{ fontSize: 10, padding: "5px 22px" }}>Вступить</a>
          </div>
        </div>

      </main>

      {/* Separator */}
      <div style={{ height: 2, flexShrink: 0, background: "linear-gradient(90deg,transparent,#3A1C08 18%,#5A3010 50%,#3A1C08 82%,transparent)" }} />

      {/* ════════════════════════ FOOTER ════════════════════════ */}
      <footer
        style={{
          flexShrink: 0,
          background: "linear-gradient(180deg,#0E0C07 0%,#080604 100%)",
          borderTop: "1px solid #1E1208",
          padding: "6px 22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontFamily: "'Oswald',sans-serif", fontSize: 9, color: "#3A2A18", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          © 2033 Метро 2033 Сообщество
        </span>

        <nav style={{ display: "flex", gap: "clamp(10px,2vw,22px)" }}>
          {FOOTNAV.map((item) => (
            <a
              key={item}
              href="#"
              id={`foot-${item}`}
              style={{
                fontFamily: "'Oswald',sans-serif",
                fontSize: 9, letterSpacing: "0.1em",
                color: "#3E2E1A",
                textDecoration: "none",
                textTransform: "uppercase",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#7A6040")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#3E2E1A")}
            >
              {item}
            </a>
          ))}
        </nav>

        <span style={{ color: "#B89028", fontSize: 18, textShadow: "0 0 10px rgba(184,144,40,0.45)" }}>✦</span>
      </footer>
      </div>
    </div>
  );
}
