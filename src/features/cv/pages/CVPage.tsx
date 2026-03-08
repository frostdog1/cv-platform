import { useState, useEffect } from "react";

/* ── Data ── */
const PROFILE = {
  name: "Sean Frost",
  title: "Software Engineer & Business Consultant",
  location: "United Kingdom (Aberdeen)",
  email: "frostsean35@gmail.com",
  linkedin: "https://www.linkedin.com/in/sean-frost-software/",
  summary: "Software engineer with a track record spanning energy sector consulting, full-stack development, and cloud infrastructure. Experienced in PL/SQL, React, AWS, Docker, and CI/CD pipelines. Combines deep technical ability with domain expertise in hydrocarbon accounting and enterprise systems.",
};

const EXPERIENCE = [
  { role: "Business Consultant", company: "Cegal", product: "EnergyX", type: "Full-time", period: "2022 — Present", accent: "#c8ff00",
    description: "Technical support, system implementation, and reliability engineering for hydrocarbon accounting solutions in the energy sector.",
    highlights: [
      "Maintain and troubleshoot Energy Components environments including Docker container monitoring and server-level diagnostics",
      "Develop and support Oracle PL/SQL packages, procedures, and functions for complex oil & gas financial allocation processes",
      "Support Azure infrastructure and CI/CD pipelines for the EnergyX software suite",
      "Ensure reliable file processing and automated workflows across multiple environments",
      "Contributed to Energy Components upgrade projects with detailed validation and testing",
      "Maintain high data accuracy for Cegal EnergyX Control, enabling precise weekly and monthly invoicing",
    ],
    tags: ["Oracle PL/SQL", "Docker", "Azure", "CI/CD", "Energy Components"],
  },
  { role: "Consultant", company: "GSES", product: "Acquired by Cegal", type: "Full-time", period: "2020 — 2022", accent: "#c8ff0",
    description: "Data management, PL/SQL development, and client support for hydrocarbon accounting. Facilitated the transition during the Cegal acquisition.",
    highlights: [
      "Facilitated large-scale data migration to EnergyBuilder platform",
      "Developed a data uploader tool and maintained hydrocarbon accounting solution in Django",
      "Ensured precise data management across Oracle-based systems",
      "Provided reliable client support both on-site and remotely",
    ],
    tags: ["PL/SQL", "Oracle", "Django", "Data Migration", "EnergyBuilder"],
  },
  { role: "Full Stack Developer", company: "Shaping", product: "Child Safety Platform", type: "Start-up", period: "2019 — 2020", accent: "#a855f7",
    description: "Agile development for a start-up protecting children online. Built cloud-native applications from the ground up.",
    highlights: [
      "Created and maintained databases, serverless functions, and APIs on AWS",
      "Developed high-fidelity React front-end with Ionic framework",
      "Built mobile applications for Android and iOS using React Native",
      "Contributed to CI/CD pipeline architecture and led sprint ceremonies",
      "Ensured smooth releases through rigorous testing and deployment practices",
    ],
    tags: ["React", "Ionic", "React Native", "AWS Lambda", "Serverless", "Agile"],
  },
  { role: "Web Developer", company: "Darter", product: "RAF Web Application", type: "Contract — 5 weeks", period: "2019", accent: "#f59e0b",
    description: "Rapid delivery of a responsive web application for the Royal Air Force under Ministry of Defence guidelines.",
    highlights: [
      "Developed responsive RAF web application in React within a five-week timeline",
      "Achieved WCAG 2.1 accessibility compliance throughout the application",
      "Adhered to Ministry of Defence design and security guidelines",
      "Delivered on time through iterative client feedback and agile flexibility",
    ],
    tags: ["React", "WCAG 2.1", "Accessibility", "MoD", "Agile"],
  },
  { role: "Student Intern", company: "Petrofac", product: "Engineering Services", type: "Internship — 3 months", period: "2018", accent: "#10b981",
    description: "Industry placement gaining hands-on experience in the oil and gas sector.",
    highlights: [
      "Amended work packs and populated engineering databases",
      "Created audit and inspection lists for operational use",
      'Completed Oilennium "Intro to Oil and Gas" certification',
      "Presented learnings and experiences to the wider team",
    ],
    tags: ["Oil & Gas", "Database Management", "Auditing"],
  },
];

const SKILL_CATEGORIES = [
  { name: "Languages & Frameworks", color: "#c8ff00", skills: [
    { name: "React / React Native", level: 90 }, { name: "TypeScript / JavaScript", level: 85 },
    { name: "Oracle PL/SQL", level: 90 }, { name: "Python / Django", level: 70 }, { name: "HTML / CSS", level: 85 },
  ]},
  { name: "Cloud & DevOps", color: "#6dd5ed", skills: [
    { name: "AWS (Lambda, S3, API GW)", level: 80 }, { name: "Azure", level: 75 },
    { name: "Docker", level: 80 }, { name: "CI/CD Pipelines", level: 80 }, { name: "Terraform", level: 60 },
  ]},
  { name: "Tools & Practices", color: "#a855f7", skills: [
    { name: "Git / GitHub", level: 85 }, { name: "Agile / Scrum", level: 85 },
    { name: "Ionic Framework", level: 80 }, { name: "Oracle Database", level: 90 }, { name: "Serverless", level: 75 },
  ]},
];

const CORE = ["Hydrocarbon Accounting", "Full Stack Development", "Cloud Infrastructure", "Database Engineering", "System Integration", "Agile Delivery"];

/* ── Skill Bar ── */
const SkillBar = ({ name, level, delay, visible, color }) => (
  <div style={{ marginBottom: 13 }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 12.5, fontFamily: "'Outfit', sans-serif" }}>
      <span style={{ color: "#aaa" }}>{name}</span>
      <span style={{ color: "#333", fontFamily: "'Fira Code', monospace", fontSize: 10.5 }}>{level}%</span>
    </div>
    <div style={{ height: 3, background: "#1a1a1a", borderRadius: 2, overflow: "hidden" }}>
      <div style={{ height: "100%", width: visible ? `${level}%` : "0%", background: `linear-gradient(90deg, ${color}, ${color}66)`, borderRadius: 2, transition: `width 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms` }} />
    </div>
  </div>
);

/* ── Main ── */
export default function CVPagePreview() {
  const [loaded, setLoaded] = useState(false);
  const [skillsVis, setSkillsVis] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLoaded(true), 120);
    const t2 = setTimeout(() => setSkillsVis(true), 650);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const ease = "cubic-bezier(0.16,1,0.3,1)";
  const a = (d) => ({ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: `all 0.7s ${ease} ${d}s` });

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", fontFamily: "'Outfit', sans-serif", color: "#e8e8e8", overflowY: "auto" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;600&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet" />

      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; }
        ::selection { background:#c8ff00; color:#0a0a0a; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:#0a0a0a; }
        ::-webkit-scrollbar-thumb { background:#1e1e1e; border-radius:3px; }
        .cv-link:hover { background:#c8ff0015 !important; border-color:#c8ff0066 !important; }
        .act-btn:hover { background:#c8ff0015 !important; border-color:#c8ff0055 !important; }
        .act-sec:hover { border-color:#3a3a3a !important; color:#aaa !important; }
        .nav-lnk { padding:8px 16px; border-radius:6px; font-size:13px; font-weight:500; color:#8a8a8a; cursor:pointer; transition:all .2s; border:none; background:none; font-family:'Outfit',sans-serif; letter-spacing:.2px; }
        .nav-lnk:hover { color:#e8e8e8; background:#1a1a1a; }
        .nav-lnk.active { color:#c8ff00; background:rgba(200,255,0,.08); }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        @media (max-width:860px) { .cv-grid { grid-template-columns:1fr !important; gap:48px !important; } }
        body::after { content:''; position:fixed; inset:0; pointer-events:none; z-index:9999; opacity:.022; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-repeat:repeat; background-size:256px; }
      `}</style>

      {/* ═══ HERO HEADER ═══ */}
      <header style={{ padding:"72px clamp(24px,5vw,80px) 48px", maxWidth:1200, margin:"0 auto", position:"relative" }}>
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"linear-gradient(rgba(200,255,0,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(200,255,0,.02) 1px,transparent 1px)", backgroundSize:"48px 48px", maskImage:"radial-gradient(ellipse 50% 60% at 30% 50%,black 10%,transparent 60%)", WebkitMaskImage:"radial-gradient(ellipse 50% 60% at 30% 50%,black 10%,transparent 60%)" }} />
        <div style={{ position:"relative" }}>
          <div style={a(0.1)}>
            <div style={{ fontFamily:"'Fira Code',monospace", fontSize:11, letterSpacing:3, textTransform:"uppercase", color:"#c8ff00", marginBottom:16, fontWeight:500 }}>Curriculum Vitae</div>
          </div>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(36px,6vw,64px)", lineHeight:1.05, letterSpacing:"-0.03em", marginBottom:14, ...a(0.2) }}>{PROFILE.name}</h1>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:20, fontWeight:400, color:"#8a8a8a", marginBottom:24, ...a(0.3) }}>{PROFILE.title}</p>

          {/* Contact row */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:16, alignItems:"center", ...a(0.4) }}>
            <span style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, color:"#6a6a6a" }}><span style={{fontSize:14}}>📍</span>{PROFILE.location}</span>
            <span style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, color:"#6a6a6a" }}><span style={{fontSize:14}}>✉️</span>{PROFILE.email}</span>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="cv-link" style={{ display:"flex", alignItems:"center", gap:6, fontSize:13, color:"#c8ff00", fontFamily:"'Fira Code',monospace", fontWeight:500, textDecoration:"none", padding:"6px 14px", borderRadius:6, border:"1px solid #c8ff0033", background:"#c8ff0008", transition:"all .2s" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
          </div>

          {/* Summary */}
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:15, lineHeight:1.8, color:"#7a7a7a", maxWidth:720, marginTop:28, paddingTop:28, borderTop:"1px solid #1e1e1e", ...a(0.55) }}>{PROFILE.summary}</p>

          {/* Core pills */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:20, ...a(0.65) }}>
            {CORE.map(s => (
              <span key={s} style={{ padding:"5px 14px", borderRadius:4, fontSize:12, fontFamily:"'Fira Code',monospace", fontWeight:500, color:"#c8ff00", border:"1px solid #c8ff0022", background:"#c8ff0008", letterSpacing:.3 }}>{s}</span>
            ))}
          </div>
        </div>
      </header>

      {/* ═══ TWO-COLUMN BODY ═══ */}
      <div className="cv-grid" style={{ maxWidth:1200, margin:"0 auto", padding:"0 clamp(24px,5vw,80px) 100px", display:"grid", gridTemplateColumns:"1fr 300px", gap:64 }}>

        {/* ── Experience Timeline ── */}
        <div>
          <div style={{ fontFamily:"'Fira Code',monospace", fontSize:11, letterSpacing:3, textTransform:"uppercase", color:"#c8ff00", marginBottom:16, fontWeight:500 }}>Experience</div>

          {EXPERIENCE.map((exp, idx) => (
            <article key={idx} style={{
              position:"relative", paddingLeft:28,
              paddingBottom: idx===EXPERIENCE.length-1 ? 0 : 44,
              borderLeft: `2px solid ${idx===0 ? exp.accent : "#1e1e1e"}`,
              ...a(0.3 + idx*0.08),
            }}>
              {/* Dot */}
              <div style={{ position:"absolute", left:-7, top:2, width:12, height:12, borderRadius:"50%", background: idx===0 ? exp.accent : "#0a0a0a", border:`2px solid ${exp.accent}`, boxShadow: idx===0 ? `0 0 12px ${exp.accent}44` : "none" }} />

              {/* Role + Company */}
              <div style={{ display:"flex", flexWrap:"wrap", alignItems:"baseline", gap:"6px 14px", marginBottom:4 }}>
                <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:19, letterSpacing:-.3 }}>{exp.role}</h3>
                <span style={{ fontFamily:"'Fira Code',monospace", fontSize:12, color:exp.accent, fontWeight:500 }}>{exp.company}</span>
              </div>

              {/* Meta */}
              <div style={{ display:"flex", flexWrap:"wrap", gap:"4px 14px", marginBottom:12, fontSize:12, color:"#4a4a4a" }}>
                <span>{exp.period}</span>
                <span style={{color:"#2a2a2a"}}>·</span>
                <span>{exp.type}</span>
                {exp.product && <><span style={{color:"#2a2a2a"}}>·</span><span>{exp.product}</span></>}
              </div>

              {/* Description */}
              <p style={{ fontSize:14, lineHeight:1.7, color:"#8a8a8a", marginBottom:12 }}>{exp.description}</p>

              {/* Highlights */}
              <ul style={{ listStyle:"none", padding:0, margin:"0 0 14px 0" }}>
                {exp.highlights.map((h,hi) => (
                  <li key={hi} style={{ padding:"3px 0 3px 18px", position:"relative", fontSize:13, lineHeight:1.7, color:"#7a7a7a" }}>
                    <span style={{ position:"absolute", left:0, top:10, width:5, height:5, borderRadius:"50%", background:exp.accent, opacity:.45 }} />
                    {h}
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {exp.tags.map(t => (
                  <span key={t} style={{ padding:"3px 10px", borderRadius:3, fontSize:11, fontFamily:"'Fira Code',monospace", color:"#555", border:"1px solid #1e1e1e", background:"#111", letterSpacing:.3 }}>{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* ── Skills Sidebar ── */}
        <aside>
          <div style={{ position:"sticky", top:80 }}>

            {SKILL_CATEGORIES.map((cat, ci) => (
              <div key={ci} style={{ marginBottom:28 }}>
                <div style={{ fontFamily:"'Fira Code',monospace", fontSize:11, letterSpacing:3, textTransform:"uppercase", color:cat.color, marginBottom:14, fontWeight:500 }}>{cat.name}</div>
                {cat.skills.map((sk, si) => (
                  <SkillBar key={sk.name} name={sk.name} level={sk.level} delay={ci*200+si*80} visible={skillsVis} color={cat.color} />
                ))}
              </div>
            ))}

            {/* Action card */}
            <div style={{ marginTop:16, padding:20, borderRadius:8, border:"1px solid #1e1e1e", background:"#111" }}>
              <div style={{ fontFamily:"'Fira Code',monospace", fontSize:11, letterSpacing:2, textTransform:"uppercase", color:"#3a3a3a", marginBottom:14 }}>Quick Actions</div>
              {/* <button className="act-btn" style={{ width:"100%", padding:"12px 16px", borderRadius:6, border:"1px solid #c8ff0033", background:"#c8ff0008", color:"#c8ff00", fontFamily:"'Syne',sans-serif", fontWeight:600, fontSize:13, cursor:"pointer", transition:"all .2s", marginBottom:8, letterSpacing:.3 }}>Print CV</button> */}
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="act-sec" style={{ display:"block", width:"100%", padding:"12px 16px", borderRadius:6, border:"1px solid #1e1e1e", background:"transparent", color:"#6a6a6a", fontFamily:"'Syne',sans-serif", fontWeight:600, fontSize:13, textAlign:"center", textDecoration:"none", transition:"all .2s", boxSizing:"border-box", letterSpacing:.3 }}>View on LinkedIn</a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
