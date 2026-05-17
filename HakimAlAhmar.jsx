import { useState, useEffect, useRef } from "react";

const researches = [
  {
    id: 1,
    title: "تأثير السلوك في الآخرين: أنت مرآة حية",
    keyPoints: [
      "سلوكك هو طاقة مباشرة تؤثر في الآخرين",
      "الناس مرآة لسلوكك",
      "الحزم والرحمة يصنعان التوازن",
      "الصدق ينعكس على من حولك",
    ],
  },
  {
    id: 2,
    title: "بدء اليوم بسعادة",
    keyPoints: [
      "الساعات الأولى تصنع مزاج يومك",
      "النية الإيجابية تغيّر الأداء",
      "العقل يبرمج نفسه من الصباح",
    ],
  },
  {
    id: 3,
    title: "العوالم المترابطة",
    keyPoints: [
      "كل إنسان يعيش عالمه الخاص",
      "الروح تؤثر على رؤية الواقع",
      "سلوكك يصنع بيئتك",
    ],
  },
  {
    id: 4,
    title: "ابن عربي والوحدة الوجودية",
    keyPoints: [
      "الوجود واحد",
      "الموجودات تجليات للحقيقة",
      "الإنسان الكامل انعكاس للأسماء الإلهية",
    ],
  },
  {
    id: 5,
    title: "ملا صدرا والحركة الجوهرية",
    keyPoints: [
      "الوجود أساس كل شيء",
      "الإنسان في حركة تكاملية مستمرة",
      "الروح تتطور نحو الكمال",
    ],
  },
];

const beliefs = [
  { id: 1, title: "الوعي أساس القوة", content: "القوة الحقيقية تبدأ من وعي الإنسان بنفسه." },
  { id: 2, title: "الحكمة قبل القرار", content: "كل قرار يحتاج إلى تأمل وفهم عميق." },
  { id: 3, title: "الرحمة لا تعني الضعف", content: "أقوى القادة هم الأكثر رحمة وعدلاً." },
  { id: 4, title: "الإنسان في تطور دائم", content: "كل يوم فرصة جديدة للنمو الداخلي." },
  { id: 5, title: "العقل والروح متكاملان", content: "الفهم الحقيقي يحتاج إلى توازن بين العقل والروح." },
  { id: 6, title: "القيادة تبدأ من الذات", content: "من لا يقود نفسه لا يستطيع قيادة الآخرين." },
];

const tabs = [
  { id: "home", label: "الرئيسية", icon: "◈" },
  { id: "research", label: "الأبحاث", icon: "◉" },
  { id: "beliefs", label: "معتقداتي", icon: "✦" },
  { id: "education", label: "التعليم", icon: "◎" },
  { id: "about", label: "عني", icon: "◐" },
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function OrbCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let t = 0;
    function draw() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const orbs = [
        { x: cx - 80, y: cy + 40, r: 220, c1: "rgba(180,20,40,0.13)", c2: "transparent" },
        { x: cx + 60, y: cy - 60, r: 180, c1: "rgba(212,175,55,0.09)", c2: "transparent" },
        { x: cx, y: cy, r: 140, c1: "rgba(100,30,60,0.11)", c2: "transparent" },
      ];
      orbs.forEach(({ x, y, r, c1, c2 }) => {
        const dx = Math.sin(t * 0.3) * 18;
        const dy = Math.cos(t * 0.2) * 14;
        const g = ctx.createRadialGradient(x + dx, y + dy, 0, x + dx, y + dy, r);
        g.addColorStop(0, c1);
        g.addColorStop(1, c2);
        ctx.beginPath();
        ctx.arc(x + dx, y + dy, r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });
      t += 0.016;
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

function ResearchCard({ research, expanded, onToggle, index }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      onClick={onToggle}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
        background: expanded
          ? "linear-gradient(135deg, rgba(28,14,20,1) 0%, rgba(18,10,16,1) 100%)"
          : "rgba(14,10,18,0.8)",
        border: expanded ? "1px solid rgba(212,175,55,0.3)" : "1px solid rgba(255,255,255,0.05)",
        borderRadius: "20px",
        padding: "2rem 2.2rem",
        cursor: "pointer",
        backdropFilter: "blur(12px)",
        boxShadow: expanded
          ? "0 8px 40px rgba(180,20,40,0.12), inset 0 1px 0 rgba(255,255,255,0.04)"
          : "0 2px 12px rgba(0,0,0,0.3)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {expanded && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "2px",
          background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.6), rgba(180,20,40,0.6), transparent)",
        }} />
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "'Courier New', monospace",
            color: "rgba(180,20,40,0.8)",
            fontSize: "0.7rem",
            letterSpacing: "0.25em",
            marginBottom: "0.8rem",
          }}>
            {String(research.id).padStart(2, "0")} ——
          </div>
          <h3 style={{
            fontSize: "1.15rem",
            fontWeight: 600,
            color: "#f0e8d0",
            marginBottom: "0.6rem",
            lineHeight: 1.6,
            direction: "rtl",
          }}>
            {research.title}
          </h3>
          <span style={{
            fontSize: "0.78rem",
            color: "rgba(212,175,55,0.65)",
            fontStyle: "italic",
            direction: "rtl",
          }}>
            ✦ بقلم آحـمـد
          </span>
        </div>
        <div style={{
          width: 36, height: 36,
          border: "1px solid rgba(212,175,55,0.25)",
          borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#d4af37",
          fontSize: "1.1rem",
          flexShrink: 0,
          marginRight: "1rem",
          transition: "transform 0.3s ease, border-color 0.3s ease",
          transform: expanded ? "rotate(45deg)" : "rotate(0deg)",
          borderColor: expanded ? "rgba(212,175,55,0.55)" : "rgba(212,175,55,0.2)",
        }}>
          +
        </div>
      </div>

      <div style={{
        maxHeight: expanded ? "400px" : "0",
        overflow: "hidden",
        transition: "max-height 0.5s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <div style={{
          marginTop: "1.8rem",
          paddingTop: "1.8rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}>
          <p style={{
            color: "rgba(212,175,55,0.7)",
            fontSize: "0.72rem",
            letterSpacing: "0.2em",
            marginBottom: "1.2rem",
            direction: "rtl",
          }}>
            النقاط الأساسية
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, direction: "rtl" }}>
            {research.keyPoints.map((pt, i) => (
              <li key={i} style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.7rem",
                color: "#d8cfc0",
                fontSize: "0.95rem",
                lineHeight: 1.8,
                marginBottom: "0.5rem",
              }}>
                <span style={{ color: "rgba(180,20,40,0.8)", flexShrink: 0, marginTop: "0.25rem" }}>◆</span>
                {pt}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function BeliefCard({ belief, expanded, onToggle, index }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      onClick={onToggle}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
        transition: `opacity 0.55s ease ${index * 0.08}s, transform 0.55s ease ${index * 0.08}s`,
        background: expanded
          ? "linear-gradient(145deg, rgba(24,12,18,0.95), rgba(15,8,12,0.95))"
          : "rgba(12,8,16,0.7)",
        border: expanded ? "1px solid rgba(212,175,55,0.28)" : "1px solid rgba(255,255,255,0.05)",
        borderRadius: "18px",
        padding: "1.8rem",
        cursor: "pointer",
        backdropFilter: "blur(10px)",
        boxShadow: expanded ? "0 12px 40px rgba(0,0,0,0.4)" : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {expanded && (
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)",
        }} />
      )}
      <div style={{
        width: 8, height: 8, borderRadius: "50%",
        background: expanded ? "#d4af37" : "rgba(180,20,40,0.6)",
        marginBottom: "1rem",
        transition: "background 0.3s ease",
        boxShadow: expanded ? "0 0 12px rgba(212,175,55,0.5)" : "none",
      }} />
      <h3 style={{
        fontSize: "1rem",
        fontWeight: 700,
        color: expanded ? "#f0e8d0" : "#c8bfb0",
        marginBottom: expanded ? "1rem" : 0,
        direction: "rtl",
        lineHeight: 1.5,
        transition: "color 0.3s ease",
      }}>
        {belief.title}
      </h3>
      <div style={{
        maxHeight: expanded ? "200px" : "0",
        overflow: "hidden",
        transition: "max-height 0.4s ease",
      }}>
        <p style={{
          color: "#b0a890",
          fontSize: "0.9rem",
          lineHeight: 1.9,
          direction: "rtl",
        }}>
          {belief.content}
        </p>
      </div>
    </div>
  );
}

export default function HakimAlAhmar() {
  const [activeTab, setActiveTab] = useState("home");
  const [expandedResearch, setExpandedResearch] = useState(null);
  const [expandedBelief, setExpandedBelief] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 80);
  }, []);

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background: #06050a;
      direction: rtl;
    }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #06050a; }
    ::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.25); border-radius: 2px; }

    .grain-overlay {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.025;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
      background-size: 180px;
    }

    .tab-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.65rem 1.2rem;
      border-radius: 8px;
      font-family: 'Noto Naskh Arabic', serif;
      font-size: 0.9rem;
      transition: all 0.25s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      white-space: nowrap;
    }

    .tab-btn:hover { background: rgba(255,255,255,0.04); }

    .hero-title {
      font-family: 'Amiri', serif;
      font-size: clamp(2.4rem, 6vw, 4.5rem);
      line-height: 1.25;
      letter-spacing: 0.01em;
    }

    .section-fade {
      animation: sectionIn 0.5s cubic-bezier(0.4,0,0.2,1) both;
    }

    @keyframes sectionIn {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes titleReveal {
      from { opacity: 0; transform: translateY(30px) skewY(1deg); }
      to { opacity: 1; transform: translateY(0) skewY(0); }
    }

    @keyframes subtleFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }

    .divider-line {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(212,175,55,0.3), rgba(180,20,40,0.3), transparent);
      margin: 3rem 0;
    }

    .stat-card {
      background: rgba(14,10,18,0.6);
      border: 1px solid rgba(255,255,255,0.05);
      border-radius: 16px;
      padding: 1.5rem;
      text-align: center;
      backdrop-filter: blur(8px);
      transition: border-color 0.3s ease, transform 0.3s ease;
    }
    .stat-card:hover {
      border-color: rgba(212,175,55,0.2);
      transform: translateY(-2px);
    }
  `;

  return (
    <div style={{
      background: "#06050a",
      minHeight: "100vh",
      color: "#e8dfc8",
      fontFamily: "'Noto Naskh Arabic', serif",
      direction: "rtl",
    }}>
      <style>{styles}</style>
      <div className="grain-overlay" />

      {/* Fixed ambient background */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 80% 60% at 30% 20%, rgba(120,15,30,0.08) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 70% 70%, rgba(212,175,55,0.05) 0%, transparent 70%)",
      }} />

      {/* Header */}
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(6,5,10,0.88)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "1.2rem 2rem" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
              <div style={{
                width: 38, height: 38,
                borderRadius: "50%",
                border: "1.5px solid rgba(180,20,40,0.6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "radial-gradient(circle, rgba(180,20,40,0.15), transparent)",
                boxShadow: "0 0 20px rgba(180,20,40,0.2)",
                fontSize: "1.1rem",
              }}>
                ◈
              </div>
              <div>
                <div style={{
                  fontFamily: "'Amiri', serif",
                  fontSize: "1.25rem",
                  color: "#d4af37",
                  lineHeight: 1.2,
                }}>
                  الحكيم الأحمر
                </div>
                <div style={{ fontSize: "0.65rem", color: "rgba(180,20,40,0.7)", letterSpacing: "0.15em" }}>
                  AL-HAKIM AL-AHMAR
                </div>
              </div>
            </div>

            {/* Nav */}
            <nav style={{ display: "flex", gap: "0.2rem", flexWrap: "wrap" }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className="tab-btn"
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    color: activeTab === tab.id ? "#d4af37" : "rgba(200,190,170,0.55)",
                    background: activeTab === tab.id
                      ? "rgba(212,175,55,0.08)"
                      : "none",
                    border: activeTab === tab.id
                      ? "1px solid rgba(212,175,55,0.15)"
                      : "1px solid transparent",
                  }}
                >
                  <span style={{ fontSize: "0.7rem", opacity: 0.8 }}>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main */}
      <main style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 2rem 5rem" }}>

        {/* HOME */}
        {activeTab === "home" && (
          <div className="section-fade">
            {/* Hero */}
            <section style={{ position: "relative", padding: "7rem 0 5rem", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                <OrbCanvas />
              </div>

              <div style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "4rem",
                alignItems: "center",
              }}>
                <div>
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    background: "rgba(180,20,40,0.08)",
                    border: "1px solid rgba(180,20,40,0.2)",
                    borderRadius: "100px",
                    padding: "0.35rem 1rem",
                    marginBottom: "2rem",
                  }}>
                    <span style={{
                      width: 6, height: 6, borderRadius: "50%",
                      background: "#b4141e",
                      boxShadow: "0 0 8px rgba(180,20,40,0.8)",
                      animation: "subtleFloat 3s ease-in-out infinite",
                    }} />
                    <span style={{ fontSize: "0.75rem", color: "rgba(200,160,160,0.8)", letterSpacing: "0.1em" }}>
                      فلسفة · حكمة · وعي
                    </span>
                  </div>

                  <h1
                    className="hero-title"
                    style={{
                      animation: mounted ? "titleReveal 0.9s cubic-bezier(0.2,0,0,1) both" : "none",
                      color: "#f0e8d0",
                      marginBottom: "1.5rem",
                    }}
                  >
                    أنا{" "}
                    <span style={{
                      background: "linear-gradient(135deg, #d4af37 0%, #b8860b 50%, #d4af37 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}>
                      الحكيم
                    </span>
                    <br />
                    <span style={{ color: "rgba(180,20,40,0.9)" }}>الأحمر</span>
                  </h1>

                  <p style={{
                    color: "rgba(200,185,160,0.7)",
                    fontSize: "1.1rem",
                    lineHeight: 2,
                    maxWidth: "520px",
                    animation: mounted ? "titleReveal 0.9s cubic-bezier(0.2,0,0,1) 0.15s both" : "none",
                  }}>
                    منصة تجمع بين الفلسفة والحكمة والقيادة والوعي — رحلة نحو الفهم الأعمق للإنسان والوجود.
                  </p>

                  <div style={{
                    marginTop: "2.5rem",
                    display: "flex",
                    gap: "1rem",
                    animation: mounted ? "titleReveal 0.9s cubic-bezier(0.2,0,0,1) 0.3s both" : "none",
                  }}>
                    <button
                      onClick={() => setActiveTab("research")}
                      style={{
                        background: "linear-gradient(135deg, rgba(212,175,55,0.15), rgba(180,20,40,0.1))",
                        border: "1px solid rgba(212,175,55,0.3)",
                        color: "#d4af37",
                        padding: "0.8rem 1.8rem",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontFamily: "'Noto Naskh Arabic', serif",
                        fontSize: "0.95rem",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = "linear-gradient(135deg, rgba(212,175,55,0.22), rgba(180,20,40,0.15))";
                        e.currentTarget.style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = "linear-gradient(135deg, rgba(212,175,55,0.15), rgba(180,20,40,0.1))";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      استكشف الأبحاث
                    </button>
                    <button
                      onClick={() => setActiveTab("about")}
                      style={{
                        background: "none",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(200,190,170,0.6)",
                        padding: "0.8rem 1.8rem",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontFamily: "'Noto Naskh Arabic', serif",
                        fontSize: "0.95rem",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                        e.currentTarget.style.color = "rgba(220,210,190,0.8)";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                        e.currentTarget.style.color = "rgba(200,190,170,0.6)";
                      }}
                    >
                      عني
                    </button>
                  </div>
                </div>

                {/* Decorative glyph */}
                <div style={{
                  display: "none",
                  "@media(minWidth:768px)": { display: "block" },
                }}>
                  <div style={{
                    width: 200, height: 200,
                    borderRadius: "50%",
                    border: "1px solid rgba(212,175,55,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    position: "relative",
                    animation: "subtleFloat 6s ease-in-out infinite",
                  }}>
                    <div style={{
                      position: "absolute", inset: 12,
                      borderRadius: "50%",
                      border: "1px solid rgba(180,20,40,0.1)",
                    }} />
                    <div style={{
                      fontFamily: "'Amiri', serif",
                      fontSize: "5rem",
                      color: "rgba(212,175,55,0.15)",
                      lineHeight: 1,
                    }}>
                      ح
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="divider-line" />

            {/* Stats */}
            <section style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "1rem",
              marginBottom: "3rem",
            }}>
              {[
                { num: "٥", label: "أبحاث فلسفية" },
                { num: "٦", label: "معتقدات جوهرية" },
                { num: "∞", label: "أسئلة وجودية" },
                { num: "١", label: "رحلة داخلية" },
              ].map((s, i) => (
                <div key={i} className="stat-card">
                  <div style={{
                    fontFamily: "'Amiri', serif",
                    fontSize: "2.2rem",
                    color: "#d4af37",
                    lineHeight: 1,
                    marginBottom: "0.5rem",
                  }}>
                    {s.num}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(200,185,160,0.5)" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </section>

            {/* Featured quote */}
            <section style={{
              background: "linear-gradient(135deg, rgba(20,10,16,0.8), rgba(12,8,14,0.8))",
              border: "1px solid rgba(212,175,55,0.1)",
              borderRadius: "24px",
              padding: "3rem",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute",
                top: 0, right: 0,
                width: 200, height: 200,
                background: "radial-gradient(circle, rgba(180,20,40,0.06), transparent)",
                borderRadius: "50%",
                transform: "translate(50%,-50%)",
              }} />
              <div style={{
                fontFamily: "'Amiri', serif",
                fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
                color: "rgba(240,232,208,0.85)",
                lineHeight: 2,
                textAlign: "center",
                direction: "rtl",
              }}>
                "أنا الفصل الذي لم تقرأه بعد"
              </div>
              <div style={{
                textAlign: "center",
                marginTop: "1rem",
                color: "rgba(180,20,40,0.6)",
                fontSize: "0.8rem",
                letterSpacing: "0.15em",
              }}>
                ——— آحـمـد ———
              </div>
            </section>
          </div>
        )}

        {/* RESEARCH */}
        {activeTab === "research" && (
          <div className="section-fade">
            <div style={{ padding: "4rem 0 2rem" }}>
              <div style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                marginBottom: "2.5rem",
                flexWrap: "wrap",
                gap: "1rem",
              }}>
                <div>
                  <div style={{
                    fontSize: "0.7rem",
                    color: "rgba(180,20,40,0.7)",
                    letterSpacing: "0.25em",
                    marginBottom: "0.6rem",
                    fontFamily: "monospace",
                  }}>
                    RESEARCH / أبحاث
                  </div>
                  <h2 style={{
                    fontFamily: "'Amiri', serif",
                    fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                    color: "#d4af37",
                  }}>
                    الأبحاث الفلسفية
                  </h2>
                </div>
                <div style={{
                  fontSize: "0.8rem",
                  color: "rgba(200,185,160,0.35)",
                  direction: "ltr",
                }}>
                  {researches.length} papers
                </div>
              </div>

              <div style={{ display: "grid", gap: "1.2rem" }}>
                {researches.map((r, i) => (
                  <ResearchCard
                    key={r.id}
                    research={r}
                    index={i}
                    expanded={expandedResearch === r.id}
                    onToggle={() => setExpandedResearch(expandedResearch === r.id ? null : r.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* BELIEFS */}
        {activeTab === "beliefs" && (
          <div className="section-fade">
            <div style={{ padding: "4rem 0 2rem" }}>
              <div style={{ marginBottom: "2.5rem" }}>
                <div style={{
                  fontSize: "0.7rem",
                  color: "rgba(180,20,40,0.7)",
                  letterSpacing: "0.25em",
                  marginBottom: "0.6rem",
                  fontFamily: "monospace",
                }}>
                  BELIEFS / معتقدات
                </div>
                <h2 style={{
                  fontFamily: "'Amiri', serif",
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  color: "#d4af37",
                }}>
                  معتقداتي
                </h2>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
                gap: "1.2rem",
              }}>
                {beliefs.map((b, i) => (
                  <BeliefCard
                    key={b.id}
                    belief={b}
                    index={i}
                    expanded={expandedBelief === b.id}
                    onToggle={() => setExpandedBelief(expandedBelief === b.id ? null : b.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* EDUCATION */}
        {activeTab === "education" && (
          <div className="section-fade">
            <div style={{ padding: "4rem 0 2rem" }}>
              <div style={{ marginBottom: "2.5rem" }}>
                <div style={{
                  fontSize: "0.7rem",
                  color: "rgba(180,20,40,0.7)",
                  letterSpacing: "0.25em",
                  marginBottom: "0.6rem",
                  fontFamily: "monospace",
                }}>
                  EDUCATION / تعليم
                </div>
                <h2 style={{
                  fontFamily: "'Amiri', serif",
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  color: "#d4af37",
                }}>
                  التعليم
                </h2>
              </div>

              <div style={{
                background: "rgba(14,10,18,0.7)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "22px",
                padding: "3rem",
                backdropFilter: "blur(12px)",
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0, height: "1px",
                  background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)",
                }} />
                <p style={{ lineHeight: 2.2, color: "rgba(210,195,170,0.8)", fontSize: "1.05rem", direction: "rtl" }}>
                  منصة تعليمية لنشر الفلسفة والحكمة والقيادة — مساحة للتفكير العميق والنمو الحقيقي.
                </p>
                <div style={{
                  marginTop: "2rem",
                  padding: "1.5rem",
                  background: "rgba(180,20,40,0.05)",
                  border: "1px solid rgba(180,20,40,0.12)",
                  borderRadius: "12px",
                }}>
                  <p style={{ color: "rgba(200,160,160,0.6)", fontSize: "0.9rem", direction: "rtl", lineHeight: 1.8 }}>
                    قريباً — محتوى تعليمي متعمق في الفلسفة الإسلامية والوعي الذاتي والقيادة.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ABOUT */}
        {activeTab === "about" && (
          <div className="section-fade">
            <div style={{ padding: "4rem 0 2rem" }}>
              <div style={{ marginBottom: "2.5rem" }}>
                <div style={{
                  fontSize: "0.7rem",
                  color: "rgba(180,20,40,0.7)",
                  letterSpacing: "0.25em",
                  marginBottom: "0.6rem",
                  fontFamily: "monospace",
                }}>
                  ABOUT / عن
                </div>
                <h2 style={{
                  fontFamily: "'Amiri', serif",
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  color: "#d4af37",
                }}>
                  عني
                </h2>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: "3rem",
                alignItems: "start",
              }}>
                {/* Avatar */}
                <div style={{
                  width: 110, height: 110,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 35% 35%, rgba(180,20,40,0.3), rgba(10,6,14,0.9))",
                  border: "1px solid rgba(212,175,55,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 0 40px rgba(180,20,40,0.15)",
                }}>
                  <span style={{
                    fontFamily: "'Amiri', serif",
                    fontSize: "3rem",
                    color: "rgba(212,175,55,0.7)",
                  }}>أ</span>
                </div>

                <div>
                  <h3 style={{
                    fontFamily: "'Amiri', serif",
                    fontSize: "1.6rem",
                    color: "#f0e8d0",
                    marginBottom: "0.4rem",
                  }}>
                    آحـمـد
                  </h3>
                  <div style={{
                    fontSize: "0.75rem",
                    color: "rgba(180,20,40,0.65)",
                    letterSpacing: "0.15em",
                    marginBottom: "1.5rem",
                  }}>
                    الحكيم الأحمر
                  </div>

                  <div style={{
                    background: "rgba(14,10,18,0.7)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "16px",
                    padding: "2rem",
                    backdropFilter: "blur(10px)",
                  }}>
                    <p style={{ lineHeight: 2.2, color: "rgba(210,195,170,0.75)", direction: "rtl", marginBottom: "1.2rem" }}>
                      باحث في الفلسفة والحكمة والوعي — أهتم بالفكر العميق والتوازن بين العقل والروح.
                    </p>
                    <p style={{ lineHeight: 2.2, color: "rgba(210,195,170,0.75)", direction: "rtl" }}>
                      رحلتي رحلة داخلية قبل أن تكون خارجية، والمعرفة الحقيقية تبدأ من الذات.
                    </p>
                  </div>

                  <div style={{
                    display: "flex",
                    gap: "0.8rem",
                    flexWrap: "wrap",
                    marginTop: "1.5rem",
                  }}>
                    {["الفلسفة", "التصوف", "القيادة", "الوعي", "الحكمة"].map((tag) => (
                      <span key={tag} style={{
                        background: "rgba(212,175,55,0.06)",
                        border: "1px solid rgba(212,175,55,0.15)",
                        color: "rgba(212,175,55,0.7)",
                        padding: "0.3rem 0.9rem",
                        borderRadius: "100px",
                        fontSize: "0.8rem",
                        direction: "rtl",
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.04)",
        padding: "2.5rem 2rem",
        textAlign: "center",
        position: "relative",
        zIndex: 1,
      }}>
        <div style={{
          fontFamily: "'Amiri', serif",
          color: "rgba(200,185,160,0.3)",
          fontSize: "0.95rem",
          direction: "rtl",
        }}>
          أنا الفصل الذي لم تقرأه بعد 📖
        </div>
        <div style={{
          marginTop: "0.5rem",
          fontSize: "0.65rem",
          color: "rgba(180,20,40,0.25)",
          letterSpacing: "0.2em",
          fontFamily: "monospace",
        }}>
          AL-HAKIM AL-AHMAR © 2025
        </div>
      </footer>
    </div>
  );
}
