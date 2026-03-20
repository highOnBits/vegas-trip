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

      {/* === People walking in a line to the van === */}
      {/* 5 male (dark hair) + 3 female (dark hair), spaced in a line from left, walking to van */}
      {[
        { emoji: "👨🏻", startX: -60, delay: 0 },
        { emoji: "👩🏻", startX: -40, delay: 0.005 },
        { emoji: "👨🏻", startX: -20, delay: 0.01 },
        { emoji: "👩🏻", startX: 0, delay: 0.015 },
        { emoji: "👨🏻", startX: 20, delay: 0.02 },
        { emoji: "👨🏻", startX: 40, delay: 0.025 },
        { emoji: "👩🏻", startX: 60, delay: 0.03 },
        { emoji: "👨🏻", startX: 80, delay: 0.035 },
      ].map((p, i) => (
        <text key={`person-${i}`} fontSize="18">
          <animate
            attributeName="opacity"
            values="0;1;1;1;0;0;0;0;0;0;0;0;1;0"
            keyTimes={`0;${0.03 + p.delay};${0.06 + p.delay};0.12;0.15;0.16;0.17;0.5;0.85;0.9;0.91;0.93;0.94;1`}
            dur="30s"
            repeatCount="indefinite"
          />
          <animateMotion
            values={`${p.startX},415;${p.startX},415;125,415;125,415`}
            keyTimes={`0;${0.03 + p.delay};0.13;1`}
            dur="30s"
            repeatCount="indefinite"
          />
          {p.emoji}
        </text>
      ))}

      {/* === Animated Van === */}
      <g filter="url(#softglow)">
        <animate
          attributeName="opacity"
          values="0;0;0;0;0;1;1;1;1;0;0;0"
          keyTimes="0;0.12;0.13;0.14;0.15;0.165;0.17;0.9;0.91;0.93;0.94;1"
          dur="30s"
          repeatCount="indefinite"
        />
        <animateMotion
          dur="30s"
          repeatCount="indefinite"
          keyTimes="0;0.165;0.91;1"
          keyPoints="0;0;1;1"
          calcMode="linear"
          path="M 130,420 C 140,500 180,580 260,630 Q 300,650 330,640 C 450,620 580,660 700,690 Q 770,700 820,660 Q 870,620 900,540 Q 910,500 900,470 Q 960,490 1020,530 Q 1060,560 1080,590 Q 1100,620 1130,610 Q 1170,590 1180,540 Q 1190,480 1170,400 Q 1150,330 1130,260 Q 1115,200 1100,140 Q 1020,105 920,95 Q 820,85 730,80 Q 650,78 590,90 Q 540,105 520,140 Q 500,175 460,200 Q 400,240 340,290 Q 280,330 230,360 C 190,380 160,400 130,420"
        />
        <text fontSize="30" textAnchor="middle" dominantBaseline="central">
          🚐
        </text>
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
