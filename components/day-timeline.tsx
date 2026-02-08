"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TimelineEvent } from "@/components/timeline-event"
import { useRef } from "react"
import { getImagePath } from "@/lib/utils"

const day1Events = [
  {
    time: "8:50 PM ET",
    title: "Depart ATL → LAS",
    description: "Nonstop flight from Atlanta to Las Vegas",
    icon: "✈️",
    details: "~4h flight • You gain 3 hours (arrive PT)",
    transport: "✈️ Nonstop",
    cost: "",
    backgroundImage: getImagePath("/airport-departure-night.jpg"),
  },
  {
    time: "~10:30 PM PT",
    title: "Land in Las Vegas",
    description: "Arrive at Harry Reid International Airport (LAS)",
    icon: "🛬",
    details: "Grab bags & head out",
    transport: "",
    cost: "",
    backgroundImage: getImagePath("/vegas-strip-night-background.jpg"),
  },
  {
    time: "11:00 PM",
    title: "Uber to Flamingo Hotel",
    description: "Check-in at Flamingo Las Vegas Hotel & Casino",
    icon: "🏨",
    details: "2 rooms (2 Queen beds each) • Drop bags & freshen up",
    transport: "🚕 Uber from LAS",
    cost: "",
    isShared: true,
    backgroundImage: getImagePath("/flamingo-hotel-night.jpg"),
  },
  {
    time: "11:30 PM – 1:00 AM",
    title: "Strip Walk & Late Dinner",
    description: "Casual food (quick bites / food court) and a short Strip walk",
    icon: "🌃",
    details: "Sleep early-ish — big days ahead!",
    transport: "🚶 Walk",
    cost: "$15 per person",
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
    cost: "$30 per person",
    isShared: false,
    backgroundImage: getImagePath("/vegas-brunch.jpg"),
  },
  {
    time: "12:00 – 4:00 PM",
    title: "Strip Walk & Casino Hopping",
    description: "Explore freely — Bellagio fountains, Caesars, Venetian, and more",
    icon: "🎰",
    details: "No rush • Soak it all in",
    transport: "🚶 Walk the Strip",
    cost: "",
    backgroundImage: getImagePath("/vegas-strip-daytime.jpg"),
  },
  {
    time: "4:30 – 6:30 PM",
    title: "Pool & Rest",
    description: "Chill by the pool or recharge at the room",
    icon: "🏊",
    details: "Recharge for the evening ahead",
    transport: "🚶 Back to Flamingo",
    cost: "",
    backgroundImage: getImagePath("/vegas-pool-afternoon.jpg"),
  },
  {
    time: "7:30 PM",
    title: "Group Dinner",
    description: "Dinner at a group-friendly spot on the Strip",
    icon: "🍽️",
    details: "Dress up a bit — Vegas style",
    transport: "🚶 Walk / 🚕 Uber",
    cost: "$50 per person",
    isShared: false,
    backgroundImage: getImagePath("/vegas-group-dinner.jpg"),
  },
  {
    time: "9:00 PM – Late",
    title: "Casino & Fremont Street",
    description: "Casino time, then head downtown for the Fremont Street Experience",
    icon: "🎲",
    details: "Lively atmosphere • Cheaper drinks downtown",
    transport: "🚕 Uber to Fremont",
    cost: "$20 per person",
    isShared: false,
    backgroundImage: getImagePath("/fremont-street-night.jpg"),
  },
]

const day3Events = [
  {
    time: "6:45 AM",
    title: "Wake Up & Get Ready",
    description: "Early start — big adventure day!",
    icon: "⏰",
    details: "Pack a day bag with layers",
    transport: "",
    cost: "",
    backgroundImage: getImagePath("/flamingo-hotel-night.jpg"),
  },
  {
    time: "7:30 AM",
    title: "Breakfast & Check-out",
    description: "Quick breakfast, then check out of Flamingo",
    icon: "☕",
    details: "Leave extra bags with bell desk if needed",
    transport: "",
    cost: "$15 per person",
    isShared: false,
    backgroundImage: getImagePath("/vegas-brunch.jpg"),
  },
  {
    time: "8:00 AM",
    title: "Pick Up Rental SUV",
    description: "Grab the minivan or 7-seat SUV near the Strip",
    icon: "🚗",
    details: "1 vehicle for all 6 people",
    transport: "🚗 SUV / Minivan",
    cost: "",
    backgroundImage: getImagePath("/vegas-strip-daytime.jpg"),
  },
  {
    time: "8:15 AM – 1:00 PM",
    title: "Drive to Grand Canyon South Rim",
    description: "Epic road trip through the Arizona desert",
    icon: "🛣️",
    details: "~280 miles / ~4.5 hours • 1 rest stop",
    transport: "🚗 Drive",
    cost: "",
    backgroundImage: getImagePath("/desert-highway-road-trip.jpg"),
  },
  {
    time: "1:00 PM",
    title: "Arrive at Grand Canyon",
    description: "Enter the park — first glimpse of the canyon!",
    icon: "🏜️",
    details: "Park entry: $35 per vehicle (valid 7 days)",
    transport: "🚗 Drive in",
    cost: "$35 total",
    isShared: true,
    backgroundImage: getImagePath("/grand-canyon-panorama.jpg"),
  },
  {
    time: "1:30 – 5:30 PM",
    title: "Viewpoints & Rim Walking",
    description: "Lunch inside the park, then explore scenic viewpoints and easy rim trails",
    icon: "🥾",
    details: "Mather Point → Yavapai → short Rim Trail",
    transport: "🚶 Walk / 🚗 Drive between viewpoints",
    cost: "$20 per person",
    isShared: false,
    backgroundImage: getImagePath("/grand-canyon-panorama.jpg"),
  },
  {
    time: "Sunset",
    title: "Sunset at the Rim (MUST DO)",
    description: "The highlight of the entire trip — take it slow and soak it in",
    icon: "🌅",
    details: "One main sunset viewpoint • Hopi Point or Powell Point",
    transport: "",
    cost: "",
    backgroundImage: getImagePath("/grand-canyon-sunset-viewpoint.jpg"),
  },
  {
    time: "7:30 PM – Night",
    title: "Dinner & Stargazing",
    description: "Dinner at Maswik Lodge, then step outside — the stars are unreal",
    icon: "🌌",
    details: "Quiet night inside the park • Minimal light pollution",
    transport: "🚶 Walk to lodge",
    cost: "$25 per person",
    isShared: false,
    backgroundImage: getImagePath("/lodge-starry-night.jpg"),
  },
]

const day4Events = [
  {
    time: "6:15 AM",
    title: "Sunrise Viewpoint (Optional but 🔥)",
    description: "Catch the sunrise over the Grand Canyon — a 10/10 experience",
    icon: "🌄",
    details: "HIGHLY recommended • Dress warm",
    transport: "🚶 Walk from lodge",
    cost: "",
    backgroundImage: getImagePath("/grand-canyon-sunrise.jpg"),
  },
  {
    time: "8:00 AM",
    title: "Breakfast & Check-out",
    description: "Breakfast at Maswik Lodge, then check out",
    icon: "☕",
    details: "Pack up and hit the road",
    transport: "",
    cost: "$15 per person",
    isShared: false,
    backgroundImage: getImagePath("/lodge-starry-night.jpg"),
  },
  {
    time: "9:00 AM – 2:00 PM",
    title: "Drive Back to Vegas",
    description: "Scenic drive back through the Arizona desert",
    icon: "🚗",
    details: "~4.5 hours • Enjoy the desert views",
    transport: "🚗 Drive",
    cost: "",
    backgroundImage: getImagePath("/desert-highway-road-trip.jpg"),
  },
  {
    time: "2:00 – 6:00 PM",
    title: "Late Lunch & Shopping",
    description: "Grab a late lunch, last-minute shopping, and chill — don't exhaust yourselves",
    icon: "🛍️",
    details: "Keep it easy before the flight",
    transport: "🚶 Walk the Strip",
    cost: "$30 per person",
    isShared: false,
    backgroundImage: getImagePath("/vegas-strip-daytime.jpg"),
  },
  {
    time: "7:30 – 8:00 PM",
    title: "Return Car & Airport Dinner",
    description: "Drop off the rental at LAS, then grab dinner at the airport",
    icon: "🍔",
    details: "Return car → security → eat → relax",
    transport: "🚗 Drive to LAS",
    cost: "$20 per person",
    isShared: false,
    backgroundImage: getImagePath("/airport-departure-night.jpg"),
  },
  {
    time: "11:59 PM",
    title: "Redeye: LAS → ATL",
    description: "Fly home — land Atlanta Tuesday morning",
    icon: "🛫",
    details: "Get some sleep on the plane!",
    transport: "✈️ Nonstop",
    cost: "",
    backgroundImage: getImagePath("/vegas-strip-night-background.jpg"),
  },
]

const allEvents = [day1Events, day2Events, day3Events, day4Events]

const dayInfoMap: Record<number, { date: string; theme: string; subtitle: string }> = {
  1: { date: "Friday, March 27", theme: "Arrival Night", subtitle: "ATL → Las Vegas" },
  2: { date: "Saturday, March 28", theme: "Full Vegas Day", subtitle: "Strip • Casino • Fremont" },
  3: { date: "Sunday, March 29", theme: "Grand Canyon", subtitle: "Road Trip to South Rim" },
  4: { date: "Monday, March 30", theme: "Return & Fly Home", subtitle: "Grand Canyon → LAS → ATL" },
}

interface DayTimelineProps {
  day: number
  onBack: () => void
}

export function DayTimeline({ day, onBack }: DayTimelineProps) {
  const events = allEvents[day - 1] || day1Events

  const dayInfo = dayInfoMap[day] || dayInfoMap[1]

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
            total += amount / 6
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
              <li>• The stars at night are incredible — no light pollution inside the park</li>
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
            </ul>
          </motion.div>
        )}
      </div>

      {/* Departure info for Day 4 */}
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
                <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-2">Arrival Home - Tuesday, Mar 31</h3>
                <p className="text-xs md:text-base text-muted-foreground mb-1 md:mb-2">
                  <strong className="text-foreground">Early Morning</strong> - Land ATL
                </p>
                <p className="text-[10px] md:text-sm text-muted-foreground">
                  ✈️ Redeye from LAS → ATL • Get some rest on the plane!
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
