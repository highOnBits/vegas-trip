"use client"

export default function RouteMap() {
  /*
    MASTER TIMELINE — 60s total

    Points:
      A = Vegas (130, 420)
      B = Grand Canyon (900, 470)
      C = Page, AZ (1100, 140)
      D = Antelope Canyon + Horseshoe Bend (1180, 320)

    Phases:
      1. Board at Vegas        0.00–0.12  (0–7.2s)
      2. Drive A→B             0.12–0.23  (7.2–13.8s)
      3. GC Stop               0.23–0.40  (13.8–24s)
      4. Drive B→C             0.40–0.48  (24–28.8s)
      5. Page Stop (overnight) 0.48–0.60  (28.8–36s)
      6. Drive C→D             0.60–0.63  (36–37.8s)
      7. D Stop (Antelope+HB)  0.63–0.80  (37.8–48s)
      8. Drive D→A             0.80–0.92  (48–55.2s)
      9. Pause                 0.92–1.00  (55.2–60s)
  */

  const DUR = "60s"

  // People data reused across stops
  const people = [
    { emoji: "🧑🏻", d: 0 },
    { emoji: "👧🏻", d: 1 },
    { emoji: "🧑🏻", d: 2 },
    { emoji: "👧🏻", d: 3 },
    { emoji: "🧑🏻", d: 4 },
    { emoji: "🧑🏻", d: 5 },
    { emoji: "👧🏻", d: 6 },
    { emoji: "🧑🏻", d: 7 },
  ]

  // GC scattered positions
  const gcSpots = [
    { x: 790, y: 400 }, { x: 825, y: 385 }, { x: 770, y: 420 }, { x: 810, y: 410 },
    { x: 845, y: 395 }, { x: 785, y: 435 }, { x: 835, y: 425 }, { x: 760, y: 410 },
  ]

  // Antelope/HB scattered positions (around point D)
  const dSpots = [
    { x: 1100, y: 290 }, { x: 1140, y: 275 }, { x: 1090, y: 310 }, { x: 1130, y: 300 },
    { x: 1160, y: 285 }, { x: 1105, y: 325 }, { x: 1150, y: 315 }, { x: 1080, y: 300 },
  ]

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1400 850"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
      style={{ background: "#0a0a18" }}
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="softglow">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000" floodOpacity="0.7" />
        </filter>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#1a1030" stopOpacity="1" />
          <stop offset="100%" stopColor="#0a0a18" stopOpacity="1" />
        </radialGradient>
      </defs>

      <rect width="1400" height="850" fill="url(#bgGrad)" />

      {/* Subtle grid */}
      <g opacity="0.06" stroke="#8888aa" strokeWidth="0.5">
        {Array.from({ length: 15 }, (_, i) => (
          <line key={`v${i}`} x1={i * 100} y1="0" x2={i * 100} y2="850" />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 100} x2="1400" y2={i * 100} />
        ))}
      </g>

      {/* State boundaries */}
      <line x1="430" y1="0" x2="430" y2="850" stroke="#444466" strokeWidth="1" strokeDasharray="8 6" opacity="0.25" />
      <line x1="430" y1="250" x2="1400" y2="250" stroke="#444466" strokeWidth="1" strokeDasharray="8 6" opacity="0.2" />

      {/* State labels */}
      <text x="220" y="320" fill="#555577" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" textAnchor="middle" opacity="0.2">NEVADA</text>
      <text x="850" y="620" fill="#555577" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" textAnchor="middle" opacity="0.2">ARIZONA</text>
      <text x="800" y="170" fill="#555577" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="bold" textAnchor="middle" opacity="0.15">UTAH</text>

      {/* ===== ROUTE LINES ===== */}

      {/* Route 1: White — A→B (Vegas → GC) */}
      <path
        d="M 130,420 C 140,500 180,580 260,630 Q 300,650 330,640 C 450,620 580,660 700,690 Q 770,700 820,660 Q 870,620 900,540 Q 910,500 900,470"
        stroke="#ffffff" strokeWidth="5" fill="none" strokeLinecap="round" filter="url(#glow)" opacity="0.7"
      />
      <path
        d="M 130,420 C 140,500 180,580 260,630 Q 300,650 330,640 C 450,620 580,660 700,690 Q 770,700 820,660 Q 870,620 900,540 Q 910,500 900,470"
        stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="14 10" opacity="0.3"
      >
        <animate attributeName="stroke-dashoffset" from="0" to="-48" dur="4s" repeatCount="indefinite" />
      </path>

      {/* Route 2: Red — B→C (GC → Page) */}
      <path
        d="M 900,470 Q 960,490 1020,530 Q 1060,560 1080,590 Q 1100,620 1130,610 Q 1170,590 1180,540 Q 1190,480 1170,400 Q 1150,330 1130,260 Q 1115,200 1100,140"
        stroke="#ef4444" strokeWidth="5" fill="none" strokeLinecap="round" filter="url(#glow)" opacity="0.85"
      />
      <path
        d="M 900,470 Q 960,490 1020,530 Q 1060,560 1080,590 Q 1100,620 1130,610 Q 1170,590 1180,540 Q 1190,480 1170,400 Q 1150,330 1130,260 Q 1115,200 1100,140"
        stroke="#f87171" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="14 10" opacity="0.4"
      >
        <animate attributeName="stroke-dashoffset" from="0" to="-48" dur="4s" repeatCount="indefinite" />
      </path>

      {/* Route 3: Green — C→D (Page → Antelope/HB) */}
      <path
        d="M 1100,140 Q 1130,200 1160,260 Q 1175,290 1180,320"
        stroke="#22c55e" strokeWidth="5" fill="none" strokeLinecap="round" filter="url(#glow)" opacity="0.85"
      />
      <path
        d="M 1100,140 Q 1130,200 1160,260 Q 1175,290 1180,320"
        stroke="#4ade80" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="14 10" opacity="0.4"
      >
        <animate attributeName="stroke-dashoffset" from="0" to="-48" dur="4s" repeatCount="indefinite" />
      </path>

      {/* Route 4: Blue — D→A (Antelope → Vegas return) */}
      <path
        d="M 1180,320 Q 1150,280 1100,200 Q 1020,105 920,95 Q 820,85 730,80 Q 650,78 590,90 Q 540,105 520,140 Q 500,175 460,200 Q 400,240 340,290 Q 280,330 230,360 C 190,380 160,400 130,420"
        stroke="#3b82f6" strokeWidth="5" fill="none" strokeLinecap="round" filter="url(#glow)" opacity="0.85"
      />
      <path
        d="M 1180,320 Q 1150,280 1100,200 Q 1020,105 920,95 Q 820,85 730,80 Q 650,78 590,90 Q 540,105 520,140 Q 500,175 460,200 Q 400,240 340,290 Q 280,330 230,360 C 190,380 160,400 130,420"
        stroke="#60a5fa" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="14 10" opacity="0.4"
      >
        <animate attributeName="stroke-dashoffset" from="0" to="-48" dur="4s" repeatCount="indefinite" />
      </path>

      {/* ===== LOCATION MARKERS ===== */}

      {/* A: Las Vegas */}
      <circle cx="130" cy="420" r="24" fill="#1e1b4b" stroke="#db5078" strokeWidth="3" filter="url(#shadow)" />
      <circle cx="130" cy="420" r="11" fill="#db5078" opacity="0.7">
        <animate attributeName="r" values="9;13;9" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x="130" y="426" fill="#fff" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="bold" textAnchor="middle">A</text>

      {/* B: Grand Canyon */}
      <circle cx="900" cy="470" r="24" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="3" filter="url(#shadow)" />
      <circle cx="900" cy="470" r="11" fill="#f59e0b" opacity="0.7">
        <animate attributeName="r" values="9;13;9" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <text x="900" y="476" fill="#fff" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="bold" textAnchor="middle">B</text>

      {/* C: Page, AZ */}
      <circle cx="1100" cy="140" r="24" fill="#1e1b4b" stroke="#22c55e" strokeWidth="3" filter="url(#shadow)" />
      <circle cx="1100" cy="140" r="11" fill="#22c55e" opacity="0.7">
        <animate attributeName="r" values="9;13;9" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0.3;0.7" dur="3s" repeatCount="indefinite" />
      </circle>
      <text x="1100" y="146" fill="#fff" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="bold" textAnchor="middle">C</text>

      {/* D: Antelope Canyon + Horseshoe Bend */}
      <circle cx="1180" cy="320" r="24" fill="#1e1b4b" stroke="#e87c5f" strokeWidth="3" filter="url(#shadow)" />
      <circle cx="1180" cy="320" r="11" fill="#e87c5f" opacity="0.7">
        <animate attributeName="r" values="9;13;9" dur="2.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2.8s" repeatCount="indefinite" />
      </circle>
      <text x="1180" y="326" fill="#fff" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="bold" textAnchor="middle">D</text>

      {/* Waypoint dots */}
      <circle cx="330" cy="640" r="12" fill="#1e1b4b" stroke="#9ca3af" strokeWidth="2" filter="url(#shadow)" />
      <circle cx="330" cy="640" r="5" fill="#9ca3af" opacity="0.6" />
      <circle cx="820" cy="660" r="12" fill="#1e1b4b" stroke="#9ca3af" strokeWidth="2" filter="url(#shadow)" />
      <circle cx="820" cy="660" r="5" fill="#9ca3af" opacity="0.6" />
      <circle cx="1080" cy="590" r="12" fill="#1e1b4b" stroke="#9ca3af" strokeWidth="2" filter="url(#shadow)" />
      <circle cx="1080" cy="590" r="5" fill="#9ca3af" opacity="0.6" />
      <circle cx="520" cy="140" r="12" fill="#1e1b4b" stroke="#9ca3af" strokeWidth="2" filter="url(#shadow)" />
      <circle cx="520" cy="140" r="5" fill="#9ca3af" opacity="0.6" />

      {/* ===== LOCATION LABELS ===== */}

      {/* Vegas */}
      <rect x="15" y="455" width="265" height="95" rx="14" fill="#0a0a15" fillOpacity="0.92" stroke="#db5078" strokeWidth="1.5" filter="url(#shadow)" />
      <text x="147" y="480" fill="#db5078" fontFamily="Arial,sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">🎰 Las Vegas</text>
      <text x="147" y="500" fill="#9ca3af" fontFamily="monospace" fontSize="12" textAnchor="middle">Start &amp; End Point</text>
      <text x="147" y="520" fill="#ffffff" fontFamily="monospace" fontSize="11" textAnchor="middle">Day 3: Depart 12:00 PM</text>
      <text x="147" y="538" fill="#60a5fa" fontFamily="monospace" fontSize="11" textAnchor="middle">Day 4: Return ~8:00 PM</text>

      {/* Grand Canyon */}
      <rect x="650" y="360" width="310" height="75" rx="14" fill="#0a0a15" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" filter="url(#shadow)" />
      <text x="805" y="385" fill="#f59e0b" fontFamily="Arial,sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">🏜️ Grand Canyon South Rim</text>
      <text x="805" y="405" fill="#ffffff" fontFamily="monospace" fontSize="12" textAnchor="middle">Day 3: Arrive 6:00 PM · Sunset 2-3 hrs</text>
      <text x="805" y="423" fill="#f59e0b" fontFamily="monospace" fontSize="11" textAnchor="middle">Viewpoints · Sunset · Depart 8:30 PM</text>

      {/* Page — simplified, just overnight */}
      <rect x="1135" y="90" width="230" height="75" rx="14" fill="#0a0a15" fillOpacity="0.92" stroke="#22c55e" strokeWidth="1.5" filter="url(#shadow)" />
      <text x="1250" y="113" fill="#22c55e" fontFamily="Arial,sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">📍 Page, AZ</text>
      <text x="1250" y="133" fill="#ffffff" fontFamily="monospace" fontSize="12" textAnchor="middle">Day 3: Arrive 11:00 PM</text>
      <text x="1250" y="153" fill="#a78bfa" fontFamily="monospace" fontSize="11" textAnchor="middle">🏠 Airbnb · Depart 10:00 AM</text>

      {/* Antelope Canyon + Horseshoe Bend */}
      <rect x="1215" y="280" width="175" height="95" rx="14" fill="#0a0a15" fillOpacity="0.92" stroke="#e87c5f" strokeWidth="1.5" filter="url(#shadow)" />
      <text x="1302" y="303" fill="#e87c5f" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="bold" textAnchor="middle">📸 Antelope Canyon</text>
      <text x="1302" y="321" fill="#e87c5f" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="bold" textAnchor="middle">🌊 Horseshoe Bend</text>
      <text x="1302" y="341" fill="#ffffff" fontFamily="monospace" fontSize="11" textAnchor="middle">Tour 11AM–2PM · HB 2–3PM</text>
      <text x="1302" y="359" fill="#e87c5f" fontFamily="monospace" fontSize="11" textAnchor="middle">Depart for Vegas 3:00 PM</text>

      {/* Waypoint labels */}
      <text x="330" y="670" fill="#9ca3af" fontFamily="Arial,sans-serif" fontSize="13" textAnchor="middle">Kingman</text>
      <text x="820" y="690" fill="#9ca3af" fontFamily="Arial,sans-serif" fontSize="13" textAnchor="middle">Williams</text>
      <text x="1080" y="618" fill="#9ca3af" fontFamily="Arial,sans-serif" fontSize="13" textAnchor="middle">Cameron</text>
      <text x="520" y="130" fill="#9ca3af" fontFamily="Arial,sans-serif" fontSize="13" textAnchor="middle">St. George</text>

      {/* ===== DRIVE TIME BADGES ===== */}

      {/* A→B */}
      <rect x="480" y="660" width="200" height="52" rx="12" fill="#1a1a2e" fillOpacity="0.95" stroke="#ffffff" strokeWidth="1.2" filter="url(#shadow)" />
      <text x="580" y="682" fill="#e5e7eb" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="bold" textAnchor="middle">🚐 ~4h 30m</text>
      <text x="580" y="702" fill="#9ca3af" fontFamily="monospace" fontSize="11" textAnchor="middle">~280 mi · I-40 / US-93</text>

      {/* B→C */}
      <rect x="1130" y="440" width="180" height="52" rx="12" fill="#3f1219" fillOpacity="0.95" stroke="#ef4444" strokeWidth="1.2" filter="url(#shadow)" />
      <text x="1220" y="462" fill="#fca5a5" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="bold" textAnchor="middle">🚐 ~2h 30m</text>
      <text x="1220" y="482" fill="#f87171" fontFamily="monospace" fontSize="11" textAnchor="middle">~140 mi · US-89</text>

      {/* C→D */}
      <rect x="1090" y="220" width="100" height="40" rx="10" fill="#0f2e1a" fillOpacity="0.95" stroke="#22c55e" strokeWidth="1.2" filter="url(#shadow)" />
      <text x="1140" y="246" fill="#4ade80" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="bold" textAnchor="middle">~30 min</text>

      {/* D→A */}
      <rect x="260" y="170" width="195" height="52" rx="12" fill="#0f1f3f" fillOpacity="0.95" stroke="#3b82f6" strokeWidth="1.2" filter="url(#shadow)" />
      <text x="357" y="192" fill="#93c5fd" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="bold" textAnchor="middle">🚐 ~4h 30m</text>
      <text x="357" y="212" fill="#60a5fa" fontFamily="monospace" fontSize="11" textAnchor="middle">~280 mi · I-15</text>

      {/* ===== ANIMATIONS ===== */}

      {/* PHASE 1: People board at Vegas (0.00–0.12) */}
      {people.map((p, i) => {
        const start = (0.01 + p.d * 0.004).toFixed(4)
        const arrive = (0.08 + p.d * 0.004).toFixed(4)
        const vanish = (0.085 + p.d * 0.004).toFixed(4)
        return (
          <text key={`board-${i}`} fontSize="28">
            <animate attributeName="opacity"
              values={`0;0;1;1;0;0`}
              keyTimes={`0;${start};${(parseFloat(start) + 0.005).toFixed(4)};${arrive};${vanish};1`}
              dur={DUR} repeatCount="1" fill="freeze"/>
            <animateMotion
              path="M 300,150 C 260,220 210,300 170,360 Q 150,390 125,415"
              keyTimes={`0;${start};${arrive};1`}
              keyPoints="0;0;1;1"
              calcMode="linear" dur={DUR} repeatCount="1" fill="freeze"/>
            {p.emoji}
          </text>
        )
      })}

      {/* Van stationary at Vegas during boarding */}
      <g filter="url(#softglow)">
        <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.005;0.115;0.12;1" dur={DUR} repeatCount="1" fill="freeze"/>
        <animateMotion values="118,408;118,408" keyTimes="0;1" dur={DUR} repeatCount="1" fill="freeze"/>
        <text fontSize="56" textAnchor="middle" dominantBaseline="central" transform="scale(-1,1)">🚐</text>
      </g>

      {/* PHASE 2: Van A→B (0.12–0.23) */}
      <g filter="url(#softglow)">
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.119;0.12;0.23;0.231;1" dur={DUR} repeatCount="1" fill="freeze"/>
        <animateMotion dur={DUR} repeatCount="1" fill="freeze"
          keyTimes="0;0.12;0.23;1" keyPoints="0;0;1;1" calcMode="linear"
          path="M 130,420 C 140,500 180,580 260,630 Q 300,650 330,640 C 450,620 580,660 700,690 Q 770,700 820,660 Q 870,620 900,540 Q 910,500 900,470"/>
        <text fontSize="56" textAnchor="middle" dominantBaseline="central" transform="scale(-1,1)">🚐</text>
      </g>

      {/* PHASE 3: GC STOP (0.23–0.40) */}
      {/* Van parked at GC */}
      <g filter="url(#softglow)">
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.229;0.23;0.40;0.401;1" dur={DUR} repeatCount="1" fill="freeze"/>
        <animateMotion values="888,458;888,458" keyTimes="0;1" dur={DUR} repeatCount="1" fill="freeze"/>
        <text fontSize="56" textAnchor="middle" dominantBaseline="central" transform="scale(-1,1)">🚐</text>
      </g>

      {/* GC people: exit → scatter → jump → return */}
      {people.map((p, i) => {
        const vanX = 895, vanY = 460
        const sp = gcSpots[i]
        const appear = (0.24 + p.d * 0.004).toFixed(4)
        const atSpot = (0.255 + p.d * 0.004).toFixed(4)
        const leaveSpot = (0.355 + p.d * 0.004).toFixed(4)
        const atVan = (0.37 + p.d * 0.004).toFixed(4)
        const gone = (0.371 + p.d * 0.004).toFixed(4)
        return (
          <text key={`gc-${i}`} fontSize="22">
            <animate attributeName="opacity"
              values="0;0;1;1;1;1;1;1;0;0"
              keyTimes={`0;${appear};${(parseFloat(appear)+0.001).toFixed(4)};${atSpot};0.32;0.33;${leaveSpot};${atVan};${gone};1`}
              dur={DUR} repeatCount="1" fill="freeze"/>
            <animateMotion
              values={`${vanX},${vanY};${vanX},${vanY};${sp.x},${sp.y};${sp.x},${sp.y};${sp.x},${sp.y-20};${sp.x},${sp.y};${sp.x},${sp.y};${vanX},${vanY};${vanX},${vanY}`}
              keyTimes={`0;${appear};${atSpot};0.315;0.325;0.33;${leaveSpot};${atVan};1`}
              dur={DUR} repeatCount="1" fill="freeze"/>
            {p.emoji}
          </text>
        )
      })}

      {/* PHASE 4: Van B→C (0.40–0.48) */}
      <g filter="url(#softglow)">
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.399;0.40;0.48;0.481;1" dur={DUR} repeatCount="1" fill="freeze"/>
        <animateMotion dur={DUR} repeatCount="1" fill="freeze"
          keyTimes="0;0.40;0.48;1" keyPoints="0;0;1;1" calcMode="linear"
          path="M 900,470 Q 960,490 1020,530 Q 1060,560 1080,590 Q 1100,620 1130,610 Q 1170,590 1180,540 Q 1190,480 1170,400 Q 1150,330 1130,260 Q 1115,200 1100,140"/>
        <text fontSize="56" textAnchor="middle" dominantBaseline="central" transform="scale(-1,1)">🚐</text>
      </g>

      {/* PHASE 5: PAGE STOP — overnight (0.48–0.60) */}
      <g filter="url(#softglow)">
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.479;0.48;0.60;0.601;1" dur={DUR} repeatCount="1" fill="freeze"/>
        <animateMotion values="1088,128;1088,128" keyTimes="0;1" dur={DUR} repeatCount="1" fill="freeze"/>
        <text fontSize="56" textAnchor="middle" dominantBaseline="central" transform="scale(-1,1)">🚐</text>
      </g>
      {/* House */}
      <text fontSize="36">
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.485;0.49;0.58;0.585;1" dur={DUR} repeatCount="1" fill="freeze"/>
        <animateMotion values="1150,85;1150,85" keyTimes="0;1" dur={DUR} repeatCount="1" fill="freeze"/>
        🏠
      </text>
      {/* Zzz */}
      <text fontSize="32">
        <animate attributeName="opacity" values="0;0;1;1;1;0;0" keyTimes="0;0.50;0.51;0.53;0.56;0.57;1" dur={DUR} repeatCount="1" fill="freeze"/>
        <animateMotion values="1170,55;1170,55;1170,15;1170,15" keyTimes="0;0.51;0.56;1" dur={DUR} repeatCount="1" fill="freeze"/>
        💤
      </text>

      {/* PHASE 6: Van C→D (0.60–0.63) */}
      <g filter="url(#softglow)">
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.599;0.60;0.63;0.631;1" dur={DUR} repeatCount="1" fill="freeze"/>
        <animateMotion dur={DUR} repeatCount="1" fill="freeze"
          keyTimes="0;0.60;0.63;1" keyPoints="0;0;1;1" calcMode="linear"
          path="M 1100,140 Q 1130,200 1160,260 Q 1175,290 1180,320"/>
        <text fontSize="56" textAnchor="middle" dominantBaseline="central" transform="scale(-1,1)">🚐</text>
      </g>

      {/* PHASE 7: D STOP — Antelope Canyon + Horseshoe Bend (0.63–0.80) */}
      {/* Van parked at D */}
      <g filter="url(#softglow)">
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.629;0.63;0.80;0.801;1" dur={DUR} repeatCount="1" fill="freeze"/>
        <animateMotion values="1168,308;1168,308" keyTimes="0;1" dur={DUR} repeatCount="1" fill="freeze"/>
        <text fontSize="56" textAnchor="middle" dominantBaseline="central" transform="scale(-1,1)">🚐</text>
      </g>

      {/* 📸 Camera flash at Antelope Canyon */}
      <text fontSize="36">
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.67;0.675;0.72;0.725;1" dur={DUR} repeatCount="1" fill="freeze"/>
        <animateMotion values="1120,260;1120,260" keyTimes="0;1" dur={DUR} repeatCount="1" fill="freeze"/>
        📸
      </text>

      {/* D stop people: exit → scatter → hang out → return */}
      {people.map((p, i) => {
        const vanX = 1175, vanY = 310
        const sp = dSpots[i]
        const appear = (0.64 + p.d * 0.004).toFixed(4)
        const atSpot = (0.655 + p.d * 0.004).toFixed(4)
        const leaveSpot = (0.755 + p.d * 0.004).toFixed(4)
        const atVan = (0.77 + p.d * 0.004).toFixed(4)
        const gone = (0.771 + p.d * 0.004).toFixed(4)
        return (
          <text key={`d-${i}`} fontSize="22">
            <animate attributeName="opacity"
              values="0;0;1;1;1;1;1;1;0;0"
              keyTimes={`0;${appear};${(parseFloat(appear)+0.001).toFixed(4)};${atSpot};0.72;0.73;${leaveSpot};${atVan};${gone};1`}
              dur={DUR} repeatCount="1" fill="freeze"/>
            <animateMotion
              values={`${vanX},${vanY};${vanX},${vanY};${sp.x},${sp.y};${sp.x},${sp.y};${sp.x},${sp.y-18};${sp.x},${sp.y};${sp.x},${sp.y};${vanX},${vanY};${vanX},${vanY}`}
              keyTimes={`0;${appear};${atSpot};0.715;0.725;0.73;${leaveSpot};${atVan};1`}
              dur={DUR} repeatCount="1" fill="freeze"/>
            {p.emoji}
          </text>
        )
      })}

      {/* PHASE 8: Van D→A return (0.80–0.92) — faces left (normal) */}
      <g filter="url(#softglow)">
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.799;0.80;0.92;0.925;1" dur={DUR} repeatCount="1" fill="freeze"/>
        <animateMotion dur={DUR} repeatCount="1" fill="freeze"
          keyTimes="0;0.80;0.92;1" keyPoints="0;0;1;1" calcMode="linear"
          path="M 1180,320 Q 1150,280 1100,200 Q 1020,105 920,95 Q 820,85 730,80 Q 650,78 590,90 Q 540,105 520,140 Q 500,175 460,200 Q 400,240 340,290 Q 280,330 230,360 C 190,380 160,400 130,420"/>
        <text fontSize="56" textAnchor="middle" dominantBaseline="central">🚐</text>
      </g>

      {/* ===== ROUTE LEGEND ===== */}
      <rect x="15" y="730" width="320" height="105" rx="12" fill="#0a0a15" fillOpacity="0.92" stroke="#333355" strokeWidth="1" filter="url(#shadow)" />
      <text x="175" y="752" fill="#e5e7eb" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="bold" textAnchor="middle">Route Legend</text>
      <line x1="30" y1="770" x2="70" y2="770" stroke="#ffffff" strokeWidth="3" opacity="0.8" />
      <text x="82" y="774" fill="#9ca3af" fontFamily="Arial,sans-serif" fontSize="12">Vegas → Grand Canyon</text>
      <line x1="30" y1="788" x2="70" y2="788" stroke="#ef4444" strokeWidth="3" opacity="0.85" />
      <text x="82" y="792" fill="#9ca3af" fontFamily="Arial,sans-serif" fontSize="12">Grand Canyon → Page</text>
      <line x1="30" y1="806" x2="70" y2="806" stroke="#22c55e" strokeWidth="3" opacity="0.85" />
      <text x="82" y="810" fill="#9ca3af" fontFamily="Arial,sans-serif" fontSize="12">Page → Antelope / Horseshoe</text>
      <line x1="30" y1="824" x2="70" y2="824" stroke="#3b82f6" strokeWidth="3" opacity="0.85" />
      <text x="82" y="828" fill="#9ca3af" fontFamily="Arial,sans-serif" fontSize="12">Antelope → Vegas (Return)</text>
    </svg>
  )
}
