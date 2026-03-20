"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowLeft, Map } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TimelineEvent } from "@/components/timeline-event"
import { RouteMapDialog } from "@/components/route-map-dialog"
import { useRef, useState } from "react"
import { getImagePath } from "@/lib/utils"

const day1Events = [
  {
    time: "8:50 PM ET",
    title: "Depart ATL → LAS",
    description: "Frontier F93923 — Nonstop from Atlanta to Las Vegas",
    icon: "✈️",
    details: "~4h flight • Arrive 10:48 PM PT (you gain 3 hours)",
    transport: "✈️ Nonstop",
    cost: "",
    backgroundImage: getImagePath("/airport-departure-night.jpg"),
  },
  {
    time: "10:48 PM PT",
    title: "Land in Las Vegas",
    description: "Arrive at Harry Reid International Airport (LAS)",
    icon: "🛬",
    details: "Grab bags & head out",
    transport: "",
    cost: "",
    backgroundImage: getImagePath("/vegas-strip-night-background.jpg"),
  },
  {
    time: "11:15 PM",
    title: "Uber to Rio Hotel & Casino",
    description: "Check-in at Rio Hotel & Casino",
    icon: "🏨",
    details: "2 rooms • Check-in after 4 PM, check-out Fri Mar 27 by 11 AM",
    transport: "🚕 Uber from LAS",
    cost: "",
    isShared: true,
    backgroundImage: getImagePath("/rio-hotel-casino.jpg"),
  },
  {
    time: "11:45 PM – 1:00 AM",
    title: "Strip Walk & Late Dinner",
    description: "Casual food (quick bites / food court) and a short Strip walk",
    icon: "🌃",
    details: "Sleep early-ish — big days ahead!",
    transport: "🚶 Walk",
    cost: "$15",
    isShared: false,
    backgroundImage: getImagePath("/vegas-late-night-food.jpg"),
  },
]

const day2Events = [
  {
    time: "10:00 AM",
    title: "Late Wake-up & Brunch",
    description: "Brunch near the hotel — start the day right",
    icon: "🥞",
    details: "No rush, take it easy",
    transport: "🚶 Walk",
    cost: "$30",
    isShared: false,
    backgroundImage: getImagePath("/vegas-brunch.jpg"),
  },
  {
    time: "11:00 AM – 3:00 PM",
    title: "Marquee Dayclub Pool Party",
    description: "Daytime pool party at the Cosmopolitan — DJs, drinks, and vibes",
    icon: "🏊",
    details: "21+ • Opens 11 AM • Bring swimwear & sunscreen",
    transport: "🚕 Uber / 🚶 Walk",
    cost: "$40",
    isShared: false,
    backgroundImage: getImagePath("/vegas-pool-party.jpg"),
  },
  {
    time: "3:30 – 5:30 PM",
    title: "Strip Walk & Casino Hopping",
    description: "Explore freely — Bellagio fountains, Caesars, Venetian, and more",
    icon: "🎰",
    details: "No rush • Soak it all in",
    transport: "🚶 Walk the Strip",
    cost: "",
    backgroundImage: getImagePath("/vegas-strip-daytime.jpg"),
  },
  {
    time: "6:00 – 7:30 PM",
    title: "Rest & Get Ready",
    description: "Head back to Rio, freshen up for the evening",
    icon: "🛁",
    details: "Recharge for the night ahead",
    transport: "🚕 Uber back to Rio",
    cost: "",
    backgroundImage: getImagePath("/rio-hotel-casino.jpg"),
  },
  {
    time: "8:00 PM",
    title: "Group Dinner",
    description: "Dinner at a group-friendly spot on the Strip",
    icon: "🍽️",
    details: "Dress up a bit — Vegas style",
    transport: "🚶 Walk / 🚕 Uber",
    cost: "$50",
    isShared: false,
    backgroundImage: getImagePath("/vegas-group-dinner.jpg"),
  },
  {
    time: "9:30 PM – Late",
    title: "Casino & Fremont Street",
    description: "Casino time, then head downtown for the Fremont Street Experience",
    icon: "🎲",
    details: "Lively atmosphere • Cheaper drinks downtown",
    transport: "🚕 Uber to Fremont",
    cost: "$20",
    isShared: false,
    backgroundImage: getImagePath("/fremont-street-night.jpg"),
  },
]

const day3Events = [
  {
    time: "9:30 AM",
    title: "Pick Up Rental Van at LAS",
    description: "Pick up Ford Transit 12-Passenger Van from Avis at Harry Reid Airport",
    icon: "🚐",
    details: "Avis rental • Duration: 1 day 13.5 hours • Drop-off Mar 28 11 PM",
    transport: "🚕 Uber to LAS",
    cost: "",
    backgroundImage: getImagePath("/vegas-strip-daytime.jpg"),
  },
  {
    time: "10:00 AM",
    title: "Check Out of Rio Hotel",
    description: "Check out by 11 AM — load bags into the van",
    icon: "🏨",
    details: "Check-out before 11 AM",
    transport: "🚐 Drive from LAS to Rio",
    cost: "",
    backgroundImage: getImagePath("/rio-hotel-casino.jpg"),
  },
  {
    time: "12:00 PM",
    title: "Depart Vegas for Grand Canyon",
    description: "Epic road trip through the Arizona desert begins!",
    icon: "🛣️",
    details: "~280 miles / ~4h 21m • Rest stop along the way",
    transport: "🚐 Drive",
    cost: "",
    backgroundImage: getImagePath("/desert-highway-road-trip.jpg"),
  },
  {
    time: "6:00 PM",
    title: "Arrive at Grand Canyon South Rim",
    description: "Enter the park — first glimpse of the canyon!",
    icon: "🏜️",
    details: "Park entry: ~$100/head (new 2026 rule) • If lucky, $35/vehicle",
    transport: "🚐 Drive in",
    cost: "$100",
    isShared: false,
    backgroundImage: getImagePath("/grand-canyon-panorama.jpg"),
  },
  {
    time: "6:00 – 8:00 PM",
    title: "Sunset & Viewpoints",
    description: "Explore viewpoints and catch the sunset — the highlight of the trip",
    icon: "🌅",
    details: "Hopi Point or Powell Point • 2–3 hours of golden hour magic",
    transport: "🚶 Walk / 🚐 Drive between viewpoints",
    cost: "",
    backgroundImage: getImagePath("/grand-canyon-sunset-viewpoint.jpg"),
  },
  {
    time: "8:30 PM",
    title: "Drive to Page, AZ",
    description: "After sunset, drive to Page — nothing to do at the canyon after dark",
    icon: "🚐",
    details: "~2h 30m drive to Page",
    transport: "🚐 Drive",
    cost: "",
    backgroundImage: getImagePath("/desert-highway-road-trip.jpg"),
  },
  {
    time: "11:00 PM",
    title: "Arrive at Airbnb in Page",
    description: "Check into the Airbnb — rest up for Antelope Canyon & Horseshoe Bend",
    icon: "🏠",
    details: "8 people • Settle in and sleep — early-ish morning tomorrow",
    transport: "",
    cost: "",
    isShared: true,
    backgroundImage: getImagePath("/page-arizona-airbnb.jpg"),
  },
]

const day4Events = [
  {
    time: "10:00 AM",
    title: "Depart Airbnb",
    description: "Check out, load up, and head to Antelope Canyon",
    icon: "☕",
    details: "Quick breakfast at the Airbnb or grab something on the way",
    transport: "🚐 Drive",
    cost: "$15",
    isShared: false,
    backgroundImage: getImagePath("/page-arizona-airbnb.jpg"),
  },
  {
    time: "10:30 AM",
    title: "Arrive at Antelope Canyon",
    description: "Arrive early, park, and get ready for the tour",
    icon: "🅿️",
    details: "Tour starts at 11:00 AM • Be there 30 min early",
    transport: "🚐 Short drive",
    cost: "",
    backgroundImage: getImagePath("/antelope-canyon-tour.jpg"),
  },
  {
    time: "11:00 AM – 2:00 PM",
    title: "Antelope Canyon Tour & Explore",
    description: "Guided tour of the famous slot canyon — unreal light beams & colors",
    icon: "📸",
    details: "Pre-booked guided tour • ~1–1.5 hours + time to explore & take photos",
    transport: "",
    cost: "$108",
    isShared: false,
    backgroundImage: getImagePath("/antelope-canyon-tour.jpg"),
  },
  {
    time: "2:00 PM",
    title: "Horseshoe Bend",
    description: "Iconic overlook of the Colorado River's dramatic 270° meander",
    icon: "🌊",
    details: "~15 min drive from Antelope Canyon • Short hike to the viewpoint",
    transport: "🚐 Drive + 🚶 Hike",
    cost: "",
    backgroundImage: getImagePath("/horseshoe-bend-sunset.jpg"),
  },
  {
    time: "3:00 PM",
    title: "Depart Page for Vegas",
    description: "Scenic drive back through the Arizona desert",
    icon: "🚐",
    details: "~4h 22m via I-15 through St. George • Grab food on the way",
    transport: "🚐 Drive",
    cost: "$20",
    isShared: false,
    backgroundImage: getImagePath("/desert-highway-road-trip.jpg"),
  },
  {
    time: "8:00 PM",
    title: "Arrive in Vegas",
    description: "Back in Vegas! Quick dinner near the Strip or at the airport",
    icon: "🍕",
    details: "Keep it light before the flight",
    transport: "🚐 Drive",
    cost: "$20",
    isShared: false,
    backgroundImage: getImagePath("/vegas-late-night-food.jpg"),
  },
  {
    time: "9:30 PM",
    title: "Return Rental Van at LAS",
    description: "Drop off the Avis van at Harry Reid Airport",
    icon: "🔑",
    details: "Return by 11 PM deadline • Head to terminal",
    transport: "🚐 Drive to LAS",
    cost: "",
    backgroundImage: getImagePath("/airport-departure-night.jpg"),
  },
  {
    time: "11:54 PM",
    title: "Redeye: LAS → ATL",
    description: "Frontier F92428 — Fly home, land Sunday morning 6:58 AM ET",
    icon: "🛫",
    details: "Get some sleep on the plane!",
    transport: "✈️ Nonstop",
    cost: "",
    backgroundImage: getImagePath("/vegas-strip-night-background.jpg"),
  },
]

const allEvents = [day1Events, day2Events, day3Events, day4Events]

const dayInfoMap: Record<number, { date: string; theme: string; subtitle: string }> = {
  1: { date: "Wednesday, March 25", theme: "Arrival Night", subtitle: "ATL → Las Vegas" },
  2: { date: "Thursday, March 26", theme: "Full Vegas Day", subtitle: "Pool Party • Strip • Casino • Fremont" },
  3: { date: "Friday, March 27", theme: "Grand Canyon Road Trip", subtitle: "Vegas → South Rim → Page, AZ" },
  4: { date: "Saturday, March 28", theme: "Antelope Canyon & Home", subtitle: "Antelope Canyon • Horseshoe Bend • LAS → ATL" },
}

interface DayTimelineProps {
  day: number
  onBack: () => void
}

export function DayTimeline({ day, onBack }: DayTimelineProps) {
  const events = allEvents[day - 1] || day1Events
  const dayInfo = dayInfoMap[day] || dayInfoMap[1]
  const [showRouteMap, setShowRouteMap] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.15, 0.1])

  const calculateTotal = () => {
    let total = 0
    events.forEach((event) => {
      if (event.cost) {
        const match = event.cost.match(/\$?(\d+(?:\.\d+)?)/)
        if (match) {
          const amount = Number.parseFloat(match[1])
          if (event.isShared) {
            total += amount / 8
          } else {
            total += amount
          }
        }
      }
    })
    return total
  }

  const totalExpense = calculateTotal()

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-10 min-h-screen bg-background"
    >
      {/* Header */}
      <div className="relative z-10 sticky top-0 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-3 md:px-4 py-3 md:py-6">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="mb-3 md:mb-4 hover:bg-primary/10 hover:text-primary transition-colors text-xs md:text-sm"
          >
            <ArrowLeft className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
            Back to Overview
          </Button>

          <div className="flex flex-col gap-3 md:gap-4">
            <div>
              <motion.p
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="text-[10px] md:text-sm font-mono text-muted-foreground mb-1 md:mb-2"
              >
                {dayInfo.date} • {dayInfo.subtitle}
              </motion.p>
              <motion.h1
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-2xl md:text-5xl font-bold text-balance"
              >
                Day {day}: <span className="text-primary">{dayInfo.theme}</span>
              </motion.h1>
            </div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-2 text-[10px] md:text-sm"
            >
              {totalExpense > 0 && (
                <div className="px-2.5 md:px-4 py-1.5 md:py-2 rounded-full bg-accent/20 text-accent border border-accent/30 font-bold">
                  💰 ~${totalExpense.toFixed(0)} per person
                </div>
              )}
              <div className="px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                {events.length} Activities
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Route Map Dialog */}
      <RouteMapDialog open={showRouteMap} onOpenChange={setShowRouteMap} />

      {/* Fancy floating Route Map button — top right, only on Day 3/4 */}
      {(day === 3 || day === 4) && (
        <motion.button
          onClick={() => setShowRouteMap(true)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
          className="fixed top-20 md:top-24 right-4 md:right-8 z-50 group cursor-pointer"
        >
          <div className="relative">
            <motion.span
              className="text-7xl md:text-8xl drop-shadow-2xl cursor-pointer block"
              style={{ rotate: "45deg" }}
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.25 }}
            >
              🗺️
            </motion.span>
            {/* Curved "Route Map" label using SVG text on path */}
            <motion.div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="100" height="36" viewBox="0 0 100 36">
                <defs>
                  <path id="curve" d="M 5,30 Q 50,0 95,30" fill="none" />
                </defs>
                <text fill="#60a5fa" fontSize="11" fontWeight="bold" fontFamily="monospace">
                  <textPath href="#curve" startOffset="50%" textAnchor="middle">
                    Route Map
                  </textPath>
                </text>
              </svg>
            </motion.div>
          </div>
        </motion.button>
      )}

      {/* Timeline */}
      <div className="relative z-10 container mx-auto px-3 md:px-4 py-6 md:py-12 max-w-5xl">
        <div className="relative">
          {/* Curved path SVG */}
          <svg className="absolute left-6 md:left-12 top-0 h-full w-1 pointer-events-none" style={{ width: "2px" }}>
            <motion.path
              d={`M 1 0 Q 1 50, 15 100 T 1 200 Q 1 250, -10 300 T 1 400 Q 1 450, 20 500 T 1 600 Q 1 650, -5 700 T 1 800 Q 1 850, 12 900 T 1 1000 Q 1 1050, 1 1100 T 1 ${events.length * 180}`}
              stroke="url(#gradient)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="8 8"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(219 80 120 / 0.4)" />
                <stop offset="50%" stopColor="rgb(219 80 120 / 0.6)" />
                <stop offset="100%" stopColor="rgb(217 149 47 / 0.3)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Events */}
          <div className="space-y-4 md:space-y-6">
            {events.map((event, index) => (
              <TimelineEvent key={index} event={event} index={index} totalEvents={events.length} />
            ))}
          </div>
        </div>

        {/* Pro Tips */}
        {day === 3 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 md:mt-12 p-4 md:p-6 rounded-xl md:rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50"
          >
            <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-primary">💡 Grand Canyon Tips</h3>
            <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-muted-foreground">
              <li>• Bring layers — the rim is 7,000ft elevation and much cooler than Vegas</li>
              <li>• Carry plenty of water and snacks for the viewpoint walks</li>
              <li>• Sunset is the #1 highlight — arrive at your viewpoint early for a good spot</li>
              <li>• After sunset there's nothing to do — that's why we drive to Page at night</li>
            </ul>
          </motion.div>
        )}

        {day === 4 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 md:mt-12 p-4 md:p-6 rounded-xl md:rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50"
          >
            <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-primary">💡 Day 4 Tips</h3>
            <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-muted-foreground">
              <li>• Antelope Canyon: listen to your guide — best photo spots are shared during the tour</li>
              <li>• Horseshoe Bend: the hike is short (~15 min) but bring water — it's exposed desert</li>
              <li>• The drive back to Vegas is ~4.5 hours — leave Page by 3 PM latest</li>
              <li>• Van must be returned to Avis at LAS by 11 PM</li>
            </ul>
          </motion.div>
        )}

        {day === 2 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 md:mt-12 p-4 md:p-6 rounded-xl md:rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50"
          >
            <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-primary">💡 Vegas Tips</h3>
            <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-muted-foreground">
              <li>• Bellagio fountains run every 15–30 min — free show, don't miss it</li>
              <li>• Fremont Street is cheaper and livelier for drinks & vibes</li>
              <li>• Set a casino budget before you go and stick to it</li>
              <li>• Wear comfortable walking shoes — the Strip is longer than it looks</li>
              <li>• Marquee Dayclub pool party is 21+ — bring your ID!</li>
            </ul>
          </motion.div>
        )}
      </div>

      {/* Arrival info for Day 4 */}
      {day === 4 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="relative z-10 container mx-auto px-3 md:px-4 pb-8 md:pb-12 max-w-5xl"
        >
          <div className="p-4 md:p-8 rounded-xl md:rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20 backdrop-blur-sm">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="text-2xl md:text-4xl">🛬</div>
              <div>
                <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-2">Arrival Home — Sunday, Mar 29</h3>
                <p className="text-xs md:text-base text-muted-foreground mb-1 md:mb-2">
                  <strong className="text-foreground">6:58 AM ET</strong> — Land at ATL
                </p>
                <p className="text-[10px] md:text-sm text-muted-foreground">
                  ✈️ Frontier F92428 Redeye from LAS → ATL • Get some rest on the plane!
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
