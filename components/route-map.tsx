"use client"

export default function RouteMap() {
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

      {/*
        TRACED FROM GOOGLE MAPS — compact rounded shape:

        Vegas (130, 420) — far left, mid
        Kingman (330, 640) — southwest, on the blue route south curve
        Flagstaff area (750, 700) — bottom, east
        Williams (820, 660) — bottom right area
        Grand Canyon (900, 470) — center right
        Cameron (1080, 560) — right side, below GC
        Page (1100, 140) — upper right
        St. George (520, 140) — upper area, left of center

        The shape is a FAT ROUNDED loop, not an elongated oval.
        Blue outbound goes south, then east along the bottom.
        Red goes right then loops up tightly.
        White return sweeps across the top with a characteristic
        bump/curve up around St. George before coming back to Vegas.
      */}

      {/* === ROUTE 1: Outbound (white) — Vegas → GC via US-93/Kingman/I-40/Williams === */}
      {/* Goes DOWN from Vegas first, curves FAR SOUTH to Kingman, then EAST along bottom, then UP to GC */}
      <path
        d="M 130,420
           C 140,500 180,580 260,630
           Q 300,650 330,640
           C 450,620 580,660 700,690
           Q 770,700 820,660
           Q 870,620 900,540
           Q 910,500 900,470"
        stroke="#ffffff"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        filter="url(#glow)"
        opacity="0.7"
      />
      <path
        d="M 130,420
           C 140,500 180,580 260,630
           Q 300,650 330,640
           C 450,620 580,660 700,690
           Q 770,700 820,660
           Q 870,620 900,540
           Q 910,500 900,470"
        stroke="#ffffff"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="14 10"
        opacity="0.3"
      >
        <animate attributeName="stroke-dashoffset" from="0" to="-48" dur="4s" repeatCount="indefinite" />
      </path>

      {/* === ROUTE 2: GC → Page (red) — S-curve: right to Cameron, then back left/north to Page === */}
      <path
        d="M 900,470
           Q 960,490 1020,530
           Q 1060,560 1080,590
           Q 1100,620 1130,610
           Q 1170,590 1180,540
           Q 1190,480 1170,400
           Q 1150,330 1130,260
           Q 1115,200 1100,140"
        stroke="#ef4444"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        filter="url(#glow)"
        opacity="0.85"
      />
      <path
        d="M 900,470
           Q 960,490 1020,530
           Q 1060,560 1080,590
           Q 1100,620 1130,610
           Q 1170,590 1180,540
           Q 1190,480 1170,400
           Q 1150,330 1130,260
           Q 1115,200 1100,140"
        stroke="#f87171"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="14 10"
        opacity="0.4"
      >
        <animate attributeName="stroke-dashoffset" from="0" to="-48" dur="4s" repeatCount="indefinite" />
      </path>

      {/* === ROUTE 3: Return (blue) — Page → St. George → I-15 → Vegas === */}
      {/* More bends: Page → east curve → dip south → back up to St. George → curve left → bend down to Vegas */}
      <path
        d="M 1100,140
           Q 1020,105 920,95
           Q 820,85 730,80
           Q 650,78 590,90
           Q 540,105 520,140
           Q 500,175 460,200
           Q 400,240 340,290
           Q 280,330 230,360
           C 190,380 160,400 130,420"
        stroke="#3b82f6"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        filter="url(#glow)"
        opacity="0.85"
      />
      <path
        d="M 1100,140
           Q 1020,105 920,95
           Q 820,85 730,80
           Q 650,78 590,90
           Q 540,105 520,140
           Q 500,175 460,200
           Q 400,240 340,290
           Q 280,330 230,360
           C 190,380 160,400 130,420"
        stroke="#60a5fa"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="14 10"
        opacity="0.4"
      >
        <animate attributeName="stroke-dashoffset" from="0" to="-48" dur="4s" repeatCount="indefinite" />
      </path>

      {/* === Location Markers === */}
      {/* Las Vegas */}
      <circle cx="130" cy="420" r="24" fill="#1e1b4b" stroke="#db5078" strokeWidth="3" filter="url(#shadow)" />
      <circle cx="130" cy="420" r="11" fill="#db5078" opacity="0.7">
        <animate attributeName="r" values="9;13;9" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x="130" y="426" fill="#fff" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="bold" textAnchor="middle">A</text>

      {/* Grand Canyon */}
      <circle cx="900" cy="470" r="24" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="3" filter="url(#shadow)" />
      <circle cx="900" cy="470" r="11" fill="#f59e0b" opacity="0.7">
        <animate attributeName="r" values="9;13;9" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <text x="900" y="476" fill="#fff" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="bold" textAnchor="middle">B</text>

      {/* Page */}
      <circle cx="1100" cy="140" r="24" fill="#1e1b4b" stroke="#22c55e" strokeWidth="3" filter="url(#shadow)" />
      <circle cx="1100" cy="140" r="11" fill="#22c55e" opacity="0.7">
        <animate attributeName="r" values="9;13;9" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0.3;0.7" dur="3s" repeatCount="indefinite" />
      </circle>
      <text x="1100" y="146" fill="#fff" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="bold" textAnchor="middle">C</text>

      {/* Waypoint dots */}
      {/* Kingman */}
      <circle cx="330" cy="640" r="12" fill="#1e1b4b" stroke="#9ca3af" strokeWidth="2" filter="url(#shadow)" />
      <circle cx="330" cy="640" r="5" fill="#9ca3af" opacity="0.6" />

      {/* Williams */}
      <circle cx="820" cy="660" r="12" fill="#1e1b4b" stroke="#9ca3af" strokeWidth="2" filter="url(#shadow)" />
      <circle cx="820" cy="660" r="5" fill="#9ca3af" opacity="0.6" />

      {/* Cameron */}
      <circle cx="1080" cy="590" r="12" fill="#1e1b4b" stroke="#9ca3af" strokeWidth="2" filter="url(#shadow)" />
      <circle cx="1080" cy="590" r="5" fill="#9ca3af" opacity="0.6" />

      {/* St. George */}
      <circle cx="520" cy="140" r="12" fill="#1e1b4b" stroke="#9ca3af" strokeWidth="2" filter="url(#shadow)" />
      <circle cx="520" cy="140" r="5" fill="#9ca3af" opacity="0.6" />

      {/* === Location Labels === */}
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

      {/* Page / Airbnb */}
      <rect x="1135" y="95" width="250" height="100" rx="14" fill="#0a0a15" fillOpacity="0.92" stroke="#22c55e" strokeWidth="1.5" filter="url(#shadow)" />
      <text x="1260" y="118" fill="#22c55e" fontFamily="Arial,sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">📍 Page, AZ</text>
      <text x="1260" y="138" fill="#ffffff" fontFamily="monospace" fontSize="12" textAnchor="middle">Day 3: Arrive 11:00 PM</text>
      <text x="1260" y="155" fill="#a78bfa" fontFamily="monospace" fontSize="11" textAnchor="middle">🏠 Night: Airbnb</text>
      <text x="1260" y="173" fill="#22c55e" fontFamily="monospace" fontSize="11" textAnchor="middle">Day 4: Antelope 11AM · HB 2PM</text>
      <text x="1260" y="189" fill="#9ca3af" fontFamily="monospace" fontSize="10" textAnchor="middle">Depart for Vegas 3:00 PM</text>

      {/* Waypoint labels */}
      <text x="330" y="670" fill="#9ca3af" fontFamily="Arial,sans-serif" fontSize="13" textAnchor="middle">Kingman</text>
      <text x="820" y="690" fill="#9ca3af" fontFamily="Arial,sans-serif" fontSize="13" textAnchor="middle">Williams</text>
      <text x="1080" y="618" fill="#9ca3af" fontFamily="Arial,sans-serif" fontSize="13" textAnchor="middle">Cameron</text>
      <text x="520" y="130" fill="#9ca3af" fontFamily="Arial,sans-serif" fontSize="13" textAnchor="middle">St. George</text>

      {/* === Drive time badges === */}
      {/* Vegas → GC (on bottom arc) */}
      <rect x="480" y="660" width="200" height="52" rx="12" fill="#1a1a2e" fillOpacity="0.95" stroke="#ffffff" strokeWidth="1.2" filter="url(#shadow)" />
      <text x="580" y="682" fill="#e5e7eb" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="bold" textAnchor="middle">🚐 ~4h 30m</text>
      <text x="580" y="702" fill="#9ca3af" fontFamily="monospace" fontSize="11" textAnchor="middle">~280 mi · I-40 / US-93</text>

      {/* GC → Page (on right arc) */}
      <rect x="1130" y="420" width="180" height="52" rx="12" fill="#3f1219" fillOpacity="0.95" stroke="#ef4444" strokeWidth="1.2" filter="url(#shadow)" />
      <text x="1220" y="442" fill="#fca5a5" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="bold" textAnchor="middle">🚐 ~2h 30m</text>
      <text x="1220" y="462" fill="#f87171" fontFamily="monospace" fontSize="11" textAnchor="middle">~140 mi · US-89</text>

      {/* Page → Vegas (on top arc) */}
      <rect x="260" y="170" width="195" height="52" rx="12" fill="#0f1f3f" fillOpacity="0.95" stroke="#3b82f6" strokeWidth="1.2" filter="url(#shadow)" />
      <text x="357" y="192" fill="#93c5fd" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="bold" textAnchor="middle">🚐 ~4h 30m</text>
      <text x="357" y="212" fill="#60a5fa" fontFamily="monospace" fontSize="11" textAnchor="middle">~280 mi · I-15</text>

      {/* === 8 faces curve in from upper-right, vanish one by one at van === */}
      {[
        { emoji: "🧑🏻", d: 0 },
        { emoji: "👧🏻", d: 1 },
        { emoji: "🧑🏻", d: 2 },
        { emoji: "👧🏻", d: 3 },
        { emoji: "🧑🏻", d: 4 },
        { emoji: "🧑🏻", d: 5 },
        { emoji: "👧🏻", d: 6 },
        { emoji: "🧑🏻", d: 7 },
      ].map((p, i) => {
        // Tighter stagger (0.005 gap), slower travel (0.01 to 0.14 window = ~4s)
        const startMove = (0.01 + p.d * 0.005).toFixed(4)
        const endMove = (0.10 + p.d * 0.005).toFixed(4)
        const vanish = (0.105 + p.d * 0.005).toFixed(4)
        return (
          <text key={`person-${i}`} fontSize="28">
            <animate
              attributeName="opacity"
              values={`0;0;1;1;0;0`}
              keyTimes={`0;${startMove};${(parseFloat(startMove) + 0.005).toFixed(4)};${endMove};${vanish};1`}
              dur="40s"
              repeatCount="indefinite"
            />
            <animateMotion
              path="M 300,150 C 260,220 210,300 170,360 Q 150,390 125,415"
              keyTimes={`0;${startMove};${endMove};1`}
              keyPoints={`0;0;1;1`}
              calcMode="linear"
              dur="40s"
              repeatCount="indefinite"
            />
            {p.emoji}
          </text>
        )
      })}

      {/*
        ANIMATION TIMELINE (40s total):
        0.00–0.12  (0–4.8s)   People curve in to van at Vegas
        0.00–0.12             Van stationary at Vegas (flipped = faces right for parked)
        0.13–0.30  (5.2–12s)  Van A→B outbound (flipped = faces right)
        0.30–0.38  (12–15.2s) STOP at GC: people out, jump, back in
        0.38–0.50  (15.2–20s) Van B→C outbound (flipped = faces right)
        0.50–0.62  (20–24.8s) STOP at Page: people→house, zzz, people→van
        0.62–0.88  (24.8–35.2s) Van C→A return (normal = faces left)
        0.88–1.00  (35.2–40s) Pause / reset
      */}

      {/* === Van: stationary at Vegas while people board (flipped = faces right) === */}
      <g filter="url(#softglow)">
        <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.005;0.12;0.125;1" dur="40s" repeatCount="indefinite"/>
        <animateMotion values="118,408;118,408" keyTimes="0;1" dur="40s" repeatCount="indefinite"/>
        <text fontSize="44" textAnchor="middle" dominantBaseline="central" transform="scale(-1,1)">🚐</text>
      </g>

      {/* === Van: outbound A → B (flipped = faces right) === */}
      <g filter="url(#softglow)">
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.12;0.13;0.30;0.301;1" dur="40s" repeatCount="indefinite"/>
        <animateMotion dur="40s" repeatCount="indefinite"
          keyTimes="0;0.13;0.30;1" keyPoints="0;0;1;1" calcMode="linear"
          path="M 130,420 C 140,500 180,580 260,630 Q 300,650 330,640 C 450,620 580,660 700,690 Q 770,700 820,660 Q 870,620 900,540 Q 910,500 900,470"/>
        <text fontSize="44" textAnchor="middle" dominantBaseline="central" transform="scale(-1,1)">🚐</text>
      </g>

      {/* === STOP AT GRAND CANYON (0.30–0.38): van parked, people out, jump, back in === */}
      {/* Van stationary at GC */}
      <g filter="url(#softglow)">
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.299;0.30;0.38;0.381;1" dur="40s" repeatCount="indefinite"/>
        <animateMotion values="888,458;888,458" keyTimes="0;1" dur="40s" repeatCount="indefinite"/>
        <text fontSize="44" textAnchor="middle" dominantBaseline="central" transform="scale(-1,1)">🚐</text>
      </g>
      {/* People pop out at GC, spread out, jump, come back */}
      <g>
        <animate attributeName="opacity" values="0;0;1;1;1;1;0;0" keyTimes="0;0.305;0.31;0.33;0.35;0.36;0.37;1" dur="40s" repeatCount="indefinite"/>
        {/* People spread out from van, then bounce */}
        <animateMotion values="900,460;900,460;860,430;860,430;860,420;860,430;900,460;900,460" keyTimes="0;0.305;0.32;0.33;0.34;0.35;0.365;1" dur="40s" repeatCount="indefinite"/>
        <text fontSize="22">🧑🏻👧🏻🧑🏻👧🏻🧑🏻🧑🏻👧🏻🧑🏻</text>
      </g>

      {/* === Van: outbound B → C (flipped = faces right) === */}
      <g filter="url(#softglow)">
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.379;0.38;0.50;0.501;1" dur="40s" repeatCount="indefinite"/>
        <animateMotion dur="40s" repeatCount="indefinite"
          keyTimes="0;0.38;0.50;1" keyPoints="0;0;1;1" calcMode="linear"
          path="M 900,470 Q 960,490 1020,530 Q 1060,560 1080,590 Q 1100,620 1130,610 Q 1170,590 1180,540 Q 1190,480 1170,400 Q 1150,330 1130,260 Q 1115,200 1100,140"/>
        <text fontSize="44" textAnchor="middle" dominantBaseline="central" transform="scale(-1,1)">🚐</text>
      </g>

      {/* === STOP AT PAGE (0.50–0.62): van parked, people→house, zzz, people→van === */}
      {/* Van stationary at Page */}
      <g filter="url(#softglow)">
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.499;0.50;0.62;0.621;1" dur="40s" repeatCount="indefinite"/>
        <animateMotion values="1088,128;1088,128" keyTimes="0;1" dur="40s" repeatCount="indefinite"/>
        <text fontSize="44" textAnchor="middle" dominantBaseline="central" transform="scale(-1,1)">🚐</text>
      </g>
      {/* House emoji near Page */}
      <text fontSize="32">
        <animate attributeName="opacity" values="0;0;1;1;1;1;0;0" keyTimes="0;0.505;0.51;0.53;0.58;0.60;0.605;1" dur="40s" repeatCount="indefinite"/>
        <animateMotion values="1140,90;1140,90" keyTimes="0;1" dur="40s" repeatCount="indefinite"/>
        🏠
      </text>
      {/* People walk from van to house */}
      <g>
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.505;0.51;0.535;0.54;1" dur="40s" repeatCount="indefinite"/>
        <animateMotion values="1095,130;1095,130;1140,100;1140,100" keyTimes="0;0.505;0.535;1" dur="40s" repeatCount="indefinite"/>
        <text fontSize="18">🧑🏻👧🏻🧑🏻👧🏻🧑🏻🧑🏻👧🏻🧑🏻</text>
      </g>
      {/* Zzz on house */}
      <text fontSize="24">
        <animate attributeName="opacity" values="0;0;0;1;1;0;0" keyTimes="0;0.54;0.545;0.55;0.58;0.585;1" dur="40s" repeatCount="indefinite"/>
        <animateMotion values="1155,65;1155,65;1155,55;1155,55" keyTimes="0;0.545;0.57;1" dur="40s" repeatCount="indefinite"/>
        💤
      </text>
      {/* People walk from house back to van */}
      <g>
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.585;0.59;0.615;0.62;1" dur="40s" repeatCount="indefinite"/>
        <animateMotion values="1140,100;1140,100;1095,130;1095,130" keyTimes="0;0.585;0.615;1" dur="40s" repeatCount="indefinite"/>
        <text fontSize="18">🧑🏻👧🏻🧑🏻👧🏻🧑🏻🧑🏻👧🏻🧑🏻</text>
      </g>

      {/* === Van: return C → A (normal orientation = faces left) === */}
      <g filter="url(#softglow)">
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.619;0.62;0.88;0.885;1" dur="40s" repeatCount="indefinite"/>
        <animateMotion dur="40s" repeatCount="indefinite"
          keyTimes="0;0.62;0.88;1" keyPoints="0;0;1;1" calcMode="linear"
          path="M 1100,140 Q 1020,105 920,95 Q 820,85 730,80 Q 650,78 590,90 Q 540,105 520,140 Q 500,175 460,200 Q 400,240 340,290 Q 280,330 230,360 C 190,380 160,400 130,420"/>
        <text fontSize="44" textAnchor="middle" dominantBaseline="central">🚐</text>
      </g>

      {/* === Route Legend === */}
      <rect x="15" y="740" width="280" height="82" rx="12" fill="#0a0a15" fillOpacity="0.92" stroke="#333355" strokeWidth="1" filter="url(#shadow)" />
      <text x="155" y="762" fill="#e5e7eb" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="bold" textAnchor="middle">Route Legend</text>
      <line x1="30" y1="780" x2="70" y2="780" stroke="#ffffff" strokeWidth="3" opacity="0.8" />
      <text x="82" y="784" fill="#9ca3af" fontFamily="Arial,sans-serif" fontSize="12">Vegas → Grand Canyon</text>
      <line x1="30" y1="798" x2="70" y2="798" stroke="#ef4444" strokeWidth="3" opacity="0.85" />
      <text x="82" y="802" fill="#9ca3af" fontFamily="Arial,sans-serif" fontSize="12">Grand Canyon → Page</text>
      <line x1="30" y1="816" x2="70" y2="816" stroke="#3b82f6" strokeWidth="3" opacity="0.85" />
      <text x="82" y="820" fill="#9ca3af" fontFamily="Arial,sans-serif" fontSize="12">Page → Vegas (Day 4 Return)</text>
    </svg>
  )
}
