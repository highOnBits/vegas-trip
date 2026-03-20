"use client"

export default function RouteMap() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1600 700"
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

      <rect width="1600" height="700" fill="url(#bgGrad)" />

      {/* Subtle grid */}
      <g opacity="0.06" stroke="#8888aa" strokeWidth="0.5">
        {Array.from({ length: 17 }, (_, i) => (
          <line key={`v${i}`} x1={i * 100} y1="0" x2={i * 100} y2="700" />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 100} x2="1600" y2={i * 100} />
        ))}
      </g>

      {/* State boundary hints */}
      <line x1="420" y1="0" x2="420" y2="700" stroke="#444466" strokeWidth="1" strokeDasharray="8 6" opacity="0.25" />
      <line x1="420" y1="210" x2="1600" y2="210" stroke="#444466" strokeWidth="1" strokeDasharray="8 6" opacity="0.2" />

      {/* State labels */}
      <text x="210" y="260" fill="#555577" fontFamily="Arial, sans-serif" fontSize="30" fontWeight="bold" textAnchor="middle" opacity="0.25">NEVADA</text>
      <text x="900" y="500" fill="#555577" fontFamily="Arial, sans-serif" fontSize="30" fontWeight="bold" textAnchor="middle" opacity="0.25">ARIZONA</text>
      <text x="900" y="140" fill="#555577" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" textAnchor="middle" opacity="0.2">UTAH</text>

      {/* === ROUTE 1: Outbound (white) — Vegas → GC via US-93/I-40/AZ-64 === */}
      <path
        d="M 130,340 Q 190,420 300,480 Q 400,540 490,570 L 680,560 L 870,545 L 1020,535 Q 1040,460 1050,320"
        stroke="#ffffff"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        filter="url(#glow)"
        opacity="0.7"
      />
      <path
        d="M 130,340 Q 190,420 300,480 Q 400,540 490,570 L 680,560 L 870,545 L 1020,535 Q 1040,460 1050,320"
        stroke="#ffffff"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="14 10"
        opacity="0.3"
      >
        <animate attributeName="stroke-dashoffset" from="0" to="-48" dur="4s" repeatCount="indefinite" />
      </path>

      {/* === ROUTE 2: GC → Page (red) — via Desert View / Cameron / US-89 === */}
      <path
        d="M 1050,320 Q 1100,330 1170,360 Q 1220,385 1270,400 Q 1290,320 1310,240 Q 1320,170 1330,100"
        stroke="#ef4444"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        filter="url(#glow)"
        opacity="0.85"
      />
      <path
        d="M 1050,320 Q 1100,330 1170,360 Q 1220,385 1270,400 Q 1290,320 1310,240 Q 1320,170 1330,100"
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
      <path
        d="M 1330,100 Q 1150,65 900,60 Q 700,65 580,85 Q 420,120 310,210 Q 200,290 130,340"
        stroke="#3b82f6"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        filter="url(#glow)"
        opacity="0.85"
      />
      <path
        d="M 1330,100 Q 1150,65 900,60 Q 700,65 580,85 Q 420,120 310,210 Q 200,290 130,340"
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
      <circle cx="130" cy="340" r="24" fill="#1e1b4b" stroke="#db5078" strokeWidth="3" filter="url(#shadow)" />
      <circle cx="130" cy="340" r="11" fill="#db5078" opacity="0.7">
        <animate attributeName="r" values="9;13;9" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x="130" y="346" fill="#fff" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="bold" textAnchor="middle">A</text>

      {/* Grand Canyon */}
      <circle cx="1050" cy="320" r="24" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="3" filter="url(#shadow)" />
      <circle cx="1050" cy="320" r="11" fill="#f59e0b" opacity="0.7">
        <animate attributeName="r" values="9;13;9" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <text x="1050" y="326" fill="#fff" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="bold" textAnchor="middle">B</text>

      {/* Page */}
      <circle cx="1330" cy="100" r="24" fill="#1e1b4b" stroke="#22c55e" strokeWidth="3" filter="url(#shadow)" />
      <circle cx="1330" cy="100" r="11" fill="#22c55e" opacity="0.7">
        <animate attributeName="r" values="9;13;9" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0.3;0.7" dur="3s" repeatCount="indefinite" />
      </circle>
      <text x="1330" y="106" fill="#fff" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="bold" textAnchor="middle">C</text>

      {/* Cameron */}
      <circle cx="1270" cy="400" r="14" fill="#1e1b4b" stroke="#9ca3af" strokeWidth="2" filter="url(#shadow)" />
      <circle cx="1270" cy="400" r="5" fill="#9ca3af" opacity="0.6" />

      {/* Kingman */}
      <circle cx="490" cy="570" r="14" fill="#1e1b4b" stroke="#9ca3af" strokeWidth="2" filter="url(#shadow)" />
      <circle cx="490" cy="570" r="5" fill="#9ca3af" opacity="0.6" />

      {/* Williams */}
      <circle cx="1020" cy="535" r="14" fill="#1e1b4b" stroke="#9ca3af" strokeWidth="2" filter="url(#shadow)" />
      <circle cx="1020" cy="535" r="5" fill="#9ca3af" opacity="0.6" />

      {/* St. George */}
      <circle cx="580" cy="85" r="14" fill="#1e1b4b" stroke="#9ca3af" strokeWidth="2" filter="url(#shadow)" />
      <circle cx="580" cy="85" r="5" fill="#9ca3af" opacity="0.6" />

      {/* === Location Labels === */}
      {/* Vegas label */}
      <rect x="15" y="375" width="270" height="95" rx="14" fill="#0a0a15" fillOpacity="0.92" stroke="#db5078" strokeWidth="1.5" filter="url(#shadow)" />
      <text x="150" y="400" fill="#db5078" fontFamily="Arial,sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">🎰 Las Vegas</text>
      <text x="150" y="420" fill="#9ca3af" fontFamily="monospace" fontSize="12" textAnchor="middle">Start &amp; End Point</text>
      <text x="150" y="442" fill="#ffffff" fontFamily="monospace" fontSize="11" textAnchor="middle">Day 3: Depart 12:00 PM</text>
      <text x="150" y="460" fill="#60a5fa" fontFamily="monospace" fontSize="11" textAnchor="middle">Day 4: Return ~8:00 PM</text>

      {/* Grand Canyon label */}
      <rect x="830" y="225" width="310" height="82" rx="14" fill="#0a0a15" fillOpacity="0.92" stroke="#f59e0b" strokeWidth="1.5" filter="url(#shadow)" />
      <text x="985" y="250" fill="#f59e0b" fontFamily="Arial,sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">🏜️ Grand Canyon South Rim</text>
      <text x="985" y="270" fill="#ffffff" fontFamily="monospace" fontSize="12" textAnchor="middle">Day 3: Arrive 6:00 PM · Sunset 2-3 hrs</text>
      <text x="985" y="288" fill="#f59e0b" fontFamily="monospace" fontSize="11" textAnchor="middle">Viewpoints · Sunset · Depart 8:30 PM</text>

      {/* Page / Airbnb label */}
      <rect x="1360" y="50" width="230" height="100" rx="14" fill="#0a0a15" fillOpacity="0.92" stroke="#22c55e" strokeWidth="1.5" filter="url(#shadow)" />
      <text x="1475" y="75" fill="#22c55e" fontFamily="Arial,sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">📍 Page, AZ</text>
      <text x="1475" y="95" fill="#ffffff" fontFamily="monospace" fontSize="12" textAnchor="middle">Day 3: Arrive 11:00 PM</text>
      <text x="1475" y="113" fill="#a78bfa" fontFamily="monospace" fontSize="11" textAnchor="middle">🏠 Night: Airbnb</text>
      <text x="1475" y="133" fill="#22c55e" fontFamily="monospace" fontSize="11" textAnchor="middle">Day 4: Antelope 11AM · HB 2PM</text>
      <text x="1475" y="146" fill="#9ca3af" fontFamily="monospace" fontSize="10" textAnchor="middle">Depart for Vegas 3:00 PM</text>

      {/* Cameron label */}
      <text x="1270" y="430" fill="#9ca3af" fontFamily="Arial,sans-serif" fontSize="13" textAnchor="middle">Cameron</text>

      {/* Kingman label */}
      <text x="490" y="600" fill="#9ca3af" fontFamily="Arial,sans-serif" fontSize="13" textAnchor="middle">Kingman</text>

      {/* Williams label */}
      <text x="1020" y="565" fill="#9ca3af" fontFamily="Arial,sans-serif" fontSize="13" textAnchor="middle">Williams</text>

      {/* St. George label */}
      <text x="580" y="75" fill="#9ca3af" fontFamily="Arial,sans-serif" fontSize="13" textAnchor="middle">St. George</text>

      {/* === Drive time / distance badges === */}
      {/* Vegas → GC */}
      <rect x="560" y="450" width="190" height="52" rx="12" fill="#1a1a2e" fillOpacity="0.95" stroke="#ffffff" strokeWidth="1.2" filter="url(#shadow)" />
      <text x="655" y="472" fill="#e5e7eb" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="bold" textAnchor="middle">🚐 ~4h 30m</text>
      <text x="655" y="492" fill="#9ca3af" fontFamily="monospace" fontSize="11" textAnchor="middle">~280 mi · I-40 / US-93</text>

      {/* GC → Page */}
      <rect x="1110" y="340" width="180" height="52" rx="12" fill="#3f1219" fillOpacity="0.95" stroke="#ef4444" strokeWidth="1.2" filter="url(#shadow)" />
      <text x="1200" y="362" fill="#fca5a5" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="bold" textAnchor="middle">🚐 ~2h 30m</text>
      <text x="1200" y="382" fill="#f87171" fontFamily="monospace" fontSize="11" textAnchor="middle">~140 mi · US-89</text>

      {/* Page → Vegas (return) */}
      <rect x="260" y="115" width="195" height="52" rx="12" fill="#0f1f3f" fillOpacity="0.95" stroke="#3b82f6" strokeWidth="1.2" filter="url(#shadow)" />
      <text x="357" y="137" fill="#93c5fd" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="bold" textAnchor="middle">🚐 ~4h 30m</text>
      <text x="357" y="157" fill="#60a5fa" fontFamily="monospace" fontSize="11" textAnchor="middle">~280 mi · I-15</text>

      {/* === People boarding animation (at Vegas) === */}
      {[
        { emoji: "👨", from: "80,320", to: "125,335" },
        { emoji: "👨", from: "90,305", to: "122,332" },
        { emoji: "👩", from: "65,335", to: "118,338" },
        { emoji: "👨", from: "100,355", to: "128,343" },
        { emoji: "👩", from: "70,315", to: "120,330" },
        { emoji: "👨", from: "85,350", to: "126,345" },
      ].map((p, i) => (
        <text key={`person-${i}`} fontSize="18">
          <animate
            attributeName="opacity"
            values="0;1;1;1;0;0;0;0;0;0;0;0;1;0"
            keyTimes="0;0.03;0.06;0.12;0.15;0.16;0.17;0.5;0.85;0.9;0.91;0.93;0.94;1"
            dur="30s"
            repeatCount="indefinite"
          />
          <animateMotion
            values={`${p.from};${p.from};${p.to};${p.to}`}
            keyTimes="0;0.03;0.12;1"
            dur="30s"
            repeatCount="indefinite"
          />
          {p.emoji}
        </text>
      ))}

      {/* === Animated Van (travels the full loop) === */}
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
          path="M 130,340 Q 190,420 300,480 Q 400,540 490,570 L 680,560 L 870,545 L 1020,535 Q 1040,460 1050,320 Q 1100,330 1170,360 Q 1220,385 1270,400 Q 1290,320 1310,240 Q 1320,170 1330,100 Q 1150,65 900,60 Q 700,65 580,85 Q 420,120 310,210 Q 200,290 130,340"
        />
        <text fontSize="30" textAnchor="middle" dominantBaseline="central">
          🚐
        </text>
      </g>

      {/* === Route Legend === */}
      <rect x="15" y="610" width="280" height="82" rx="12" fill="#0a0a15" fillOpacity="0.92" stroke="#333355" strokeWidth="1" filter="url(#shadow)" />
      <text x="155" y="632" fill="#e5e7eb" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="bold" textAnchor="middle">Route Legend</text>
      <line x1="30" y1="650" x2="70" y2="650" stroke="#ffffff" strokeWidth="3" opacity="0.8" />
      <text x="82" y="654" fill="#9ca3af" fontFamily="Arial,sans-serif" fontSize="12">Vegas → Grand Canyon</text>
      <line x1="30" y1="668" x2="70" y2="668" stroke="#ef4444" strokeWidth="3" opacity="0.85" />
      <text x="82" y="672" fill="#9ca3af" fontFamily="Arial,sans-serif" fontSize="12">Grand Canyon → Page</text>
      <line x1="30" y1="686" x2="70" y2="686" stroke="#3b82f6" strokeWidth="3" opacity="0.85" />
      <text x="82" y="690" fill="#9ca3af" fontFamily="Arial,sans-serif" fontSize="12">Page → Vegas (Day 4 Return)</text>
    </svg>
  )
}
