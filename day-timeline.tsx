"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TimelineEvent } from "@/components/timeline-event"
import { useRef } from "react"
import { getImagePath } from "@/lib/utils"

const day1Events = [
  {
    time: "11:00 AM - 12:20 PM",
    title: "Airport Arrival → Avanti Resort",
    description: "Uber ride from MCO to Avanti International Resort on I-Drive",
    icon: "✈️",
    details: "~20-35 min ride • Drop bags & quick refresh",
    transport: "🚕 Uber",
    cost: "$8.75",
    isShared: true,
    backgroundImage: getImagePath("/orlando-airport-road-view.jpg"),
  },
  {
    time: "12:30 PM - 3:00 PM",
    title: "ICON Park Lunch & Stroll",
    description: "Casual lunch, people-watching, and quick photos on the lawn",
    icon: "🍔",
    details: "Walking distance from Avanti or I-RIDE Trolley",
    transport: "🚶 Walk / 🚋 Trolley",
    cost: "$25 per person",
    isShared: false,
    backgroundImage: getImagePath("/icon-park-orlando-daytime-restaurants.jpg"),
  },
  {
    time: "3:00 PM - 4:00 PM",
    title: "Check-in & Rest",
    description: "Shower and 30-40 min downtime at the resort",
    icon: "🏨",
    details: "Recharge for the evening adventures",
    transport: "🚶 Short walk back",
    cost: "",
    backgroundImage: getImagePath("/modern-hotel-room-orlando-resort.jpg"),
  },
  {
    time: "4:45 PM - 6:00 PM",
    title: "The Wheel Sunset Ride",
    description: "Board around 5:05-5:15 PM for the perfect sunset view",
    icon: "🎡",
    details: "~20 min ride • Sunset at 5:28 PM",
    transport: "🚶 Walk / 🚋 Trolley",
    cost: "$30 per person",
    isShared: false,
    backgroundImage: getImagePath("/icon-park-ferris-wheel-sunset-orlando.jpg"),
  },
  {
    time: "6:00 PM - 9:30 PM",
    title: "Disney Springs Evening",
    description: "Drinks, dinner, live music, and holiday décor",
    icon: "✨",
    details: "Magical evening vibes with festive atmosphere",
    transport: "🚕 Uber (~15-25 min)",
    cost: "$50 per person",
    isShared: false,
    backgroundImage: getImagePath("/disney-springs-night-lights-holiday-decorations.jpg"),
  },
  {
    time: "9:30 PM - 10:00 PM",
    title: "Return to Avanti",
    description: "Head back to the resort for rest",
    icon: "🌙",
    details: "End of Day 1",
    transport: "🚕 Uber (~15-25 min)",
    cost: "$7.50",
    isShared: true,
    backgroundImage: getImagePath("/orlando-night-street-lights.jpg"),
  },
]

const day2Events = [
  {
    time: "7:45 AM - 8:30 AM",
    title: "Avanti → Islands of Adventure",
    description: "Uber to Universal CityWalk, aim to be at IOA gates by 8:30 AM",
    icon: "🚕",
    details: "Park opens ~9:00 AM • Open Universal Orlando app",
    transport: "🚕 Uber",
    cost: "$8.75",
    isShared: true,
    backgroundImage: getImagePath("/universal-orlando-citywalk-entrance-morning.jpg"),
  },
  {
    time: "9:00 AM - 10:10 AM",
    title: "Hagrid's Motorbike Adventure",
    description: "Rope drop for the biggest headliner ride",
    icon: "🧹",
    details: "If huge wait, swap with VelociCoaster",
    transport: "",
    cost: "",
    backgroundImage: getImagePath("/hagrids-motorbike-adventure-universal-ride.jpg"),
  },
  {
    time: "10:15 AM - 10:40 AM",
    title: "Harry Potter Forbidden Journey",
    description: "Experience the castle queue and incredible dark ride",
    icon: "🏰",
    details: "Indoor headliner • Magical experience",
    transport: "",
    cost: "",
    backgroundImage: getImagePath("/hogwarts-castle-universal-islands-of-adventure.jpg"),
  },
  {
    time: "10:50 AM - 11:25 AM",
    title: "Jurassic World VelociCoaster",
    description: "Epic outdoor coaster with metal detectors",
    icon: "🦖",
    details: "Free ride-time lockers • Try Single Rider",
    transport: "",
    cost: "",
    backgroundImage: getImagePath("/velocicoaster-universal-orlando-blue-coaster.jpg"),
  },
  {
    time: "11:30 AM - 12:10 PM",
    title: "Potter Experience & Butterbeer",
    description: "Ollivanders wand demo and photos in Hogsmeade",
    icon: "⚡",
    details: "Immerse in the wizarding world",
    transport: "",
    cost: "$15 per person",
    isShared: false,
    backgroundImage: getImagePath("/hogsmeade-village-universal-butterbeer-shops.jpg"),
  },
  {
    time: "12:15 PM - 1:00 PM",
    title: "Lunch Break",
    description: "Three Broomsticks (Hogsmeade) or Thunder Falls Terrace",
    icon: "🍗",
    details: "Quick bite nearby",
    transport: "",
    cost: "$40 per person",
    isShared: false,
    backgroundImage: getImagePath("/three-broomsticks-restaurant-hogsmeade-interior.jpg"),
  },
  {
    time: "1:10 PM - 1:45 PM",
    title: "Skull Island: Reign of Kong",
    description: "Big indoor ride experience",
    icon: "🗿",
    details: "Mostly indoors • Single Rider option",
    transport: "",
    cost: "",
    backgroundImage: getImagePath("/skull-island-king-kong-universal-orlando.jpg"),
  },
  {
    time: "1:55 PM - 2:30 PM",
    title: "Spider-Man Adventure",
    description: "Amazing 3D dark ride classic",
    icon: "🕷️",
    details: "Single Rider when posted",
    transport: "",
    cost: "",
    backgroundImage: getImagePath("/spiderman-ride-universal-islands-of-adventure.jpg"),
  },
  {
    time: "2:35 PM - 3:10 PM",
    title: "The Incredible Hulk Coaster",
    description: "Optional 3rd big coaster",
    icon: "💪",
    details: "Metal detectors + lockers required",
    transport: "",
    cost: "",
    backgroundImage: getImagePath("/incredible-hulk-coaster-green-universal-orlando.jpg"),
  },
  {
    time: "3:15 PM - 5:00 PM",
    title: "Flex Block & Exploration",
    description: "Jurassic Park Discovery Center, coffee, shops",
    icon: "🧊",
    details: "Optional: Jurassic Park River Adventure if warm",
    transport: "",
    cost: "$20 per person",
    isShared: false,
    backgroundImage: getImagePath("/placeholder.svg?height=400&width=600"),
  },
  {
    time: "5:00 PM - Close",
    title: "Night Vibes & Re-rides",
    description: "Hogsmeade after dark, VelociCoaster at night",
    icon: "🌌",
    details: "Magical atmosphere • Lap on Hulk if skipped earlier",
    transport: "",
    cost: "",
    backgroundImage: getImagePath("/placeholder.svg?height=400&width=600"),
  },
  {
    time: "Optional",
    title: "Toon Lagoon Water Rides",
    description: "Dudley Do-Right's & Popeye rides (you WILL get soaked!)",
    icon: "💦",
    details: "Poncho/lockers recommended • Best on warm evenings",
    transport: "",
    cost: "",
    backgroundImage: getImagePath("/placeholder.svg?height=400&width=600"),
  },
]

interface DayTimelineProps {
  day: number
  onBack: () => void
}

export function DayTimeline({ day, onBack }: DayTimelineProps) {
  const events = day === 1 ? day1Events : day2Events
  const dayInfo =
    day === 1
      ? { date: "Thursday, November 27", theme: "Light & Chill", subtitle: "Thanksgiving Day" }
      : { date: "Friday, November 28", theme: "Islands of Adventure", subtitle: "No Express Pass" }

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
          total += Number.parseFloat(match[1])
        }
      }
    })

    if (day === 2) {
      total += 185
    }

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
              <div className="px-2.5 md:px-4 py-1.5 md:py-2 rounded-full bg-accent/20 text-accent border border-accent/30 font-bold">
                💰 Total: ${totalExpense.toFixed(2)} per person
              </div>
              <div className="px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                {events.length} Activities
              </div>
              {day === 2 && (
                <div className="px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                  🎢 Includes Ticket
                </div>
              )}
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
              d={`M 1 0 Q 1 50, ${day === 1 ? "15" : "20"} 100 T 1 200 Q 1 250, ${day === 1 ? "-10" : "25"} 300 T 1 400 Q 1 450, ${day === 1 ? "20" : "-15"} 500 T 1 600 Q 1 650, ${day === 1 ? "-5" : "18"} 700 T 1 800 Q 1 850, ${day === 1 ? "12" : "-8"} 900 T 1 1000 Q 1 1050, 1 1100 T 1 ${events.length * 180}`}
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
                <stop offset="0%" stopColor="rgb(139 220 234 / 0.3)" />
                <stop offset="50%" stopColor="rgb(139 220 234 / 0.6)" />
                <stop offset="100%" stopColor="rgb(139 220 234 / 0.3)" />
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

        {/* Footer info */}
        {day === 2 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 md:mt-12 p-4 md:p-6 rounded-xl md:rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50"
          >
            <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-primary">💡 Pro Tips</h3>
            <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-muted-foreground">
              <li>• Use Single Rider lines on VelociCoaster, Hulk, Spider-Man & Kong when available</li>
              <li>• Bring a slim sling bag - large bags require paid lockers</li>
              <li>• VelociCoaster & Hulk require completely empty pockets</li>
              <li>• Download Universal Orlando app for live wait times</li>
            </ul>
            <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-border/50">
              <p className="text-xs md:text-sm text-muted-foreground">
                <strong className="text-foreground">Day 2 includes:</strong> Universal Islands of Adventure ticket ($185
                per person) + food & activities
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Departure info for Day 2 */}
      {day === 2 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="relative z-10 container mx-auto px-3 md:px-4 pb-8 md:pb-12 max-w-5xl"
        >
          <div className="p-4 md:p-8 rounded-xl md:rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20 backdrop-blur-sm">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="text-2xl md:text-4xl">🛫</div>
              <div>
                <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-2">Departure - Saturday, Nov 29</h3>
                <p className="text-xs md:text-base text-muted-foreground mb-1 md:mb-2">
                  <strong className="text-foreground">9:30 AM</strong> - Leave for MCO
                </p>
                <p className="text-[10px] md:text-sm text-muted-foreground">
                  🚕 Uber from Avanti → MCO (~20-35 min) • Pad earlier if you want extra buffer time
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
