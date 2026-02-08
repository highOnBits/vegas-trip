"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, DollarSign, Cloud } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DayTimeline } from "@/components/day-timeline"
import { ExpenseDialog } from "@/components/expense-dialog"
import { WeatherDialog } from "@/components/weather-dialog"
import { getImagePath } from "@/lib/utils"

const floatingEmojis = [
  "💵", "💰", "🎰", "💎", "🪙", "💸", "🃏", "🎲", "💳", "🤑",
  "💵", "💰", "🎰", "💎", "🪙", "💸", "🃏", "🎲", "💳", "🤑",
  "💵", "💰", "🎰", "💎", "🪙", "💸", "🃏", "🎲", "💳", "🤑",
]

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297
  return x - Math.floor(x)
}

// Flying money emoji configs for the title area
const flyingMoneyLeft = [
  { emoji: "💸", delay: 0, y: -10 },
  { emoji: "💵", delay: 0.3, y: 5 },
  { emoji: "💰", delay: 0.6, y: -5 },
]
const flyingMoneyRight = [
  { emoji: "💸", delay: 0.15, y: 5 },
  { emoji: "💵", delay: 0.45, y: -8 },
  { emoji: "💰", delay: 0.75, y: 3 },
]

const dayCards = [
  {
    day: 1,
    date: "Friday, Mar 27",
    title: "Arrival Night",
    emoji: "🎰",
    image: "/vegas-strip-neon-arrival.jpg",
  },
  {
    day: 2,
    date: "Saturday, Mar 28",
    title: "Full Vegas Day",
    emoji: "🎲",
    image: "/bellagio-fountains-vegas.jpg",
  },
  {
    day: 3,
    date: "Sunday, Mar 29",
    title: "Grand Canyon Road Trip",
    emoji: "🏜️",
    image: "/grand-canyon-panorama.jpg",
  },
  {
    day: 4,
    date: "Monday, Mar 30",
    title: "Return & Fly Home",
    emoji: "✈️",
    image: "/grand-canyon-sunrise.jpg",
  },
]

export default function Home() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [showExpenseDialog, setShowExpenseDialog] = useState(false)
  const [showWeatherDialog, setShowWeatherDialog] = useState(false)

  const selectDay = useCallback((day: number) => {
    setSelectedDay(day)
    window.history.pushState({ day }, "", `#day-${day}`)
  }, [])

  const goHome = useCallback(() => {
    setSelectedDay(null)
    // Replace state so we don't stack up history entries when using the Back button
    window.history.replaceState(null, "", window.location.pathname + window.location.search)
  }, [])

  useEffect(() => {
    // Handle browser back/forward
    const handlePopState = (e: PopStateEvent) => {
      if (e.state?.day) {
        setSelectedDay(e.state.day)
      } else {
        setSelectedDay(null)
      }
    }

    // Check if we landed on a #day-N hash
    const hash = window.location.hash
    const match = hash.match(/^#day-(\d+)$/)
    if (match) {
      const day = parseInt(match[1], 10)
      if (day >= 1 && day <= 4) {
        setSelectedDay(day)
        window.history.replaceState({ day }, "")
      }
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with overlay */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${getImagePath('/vegas-strip-night-background.jpg')}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
      </div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: "spring" }}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex flex-col gap-3"
      >
        <Button
          onClick={() => setShowWeatherDialog(true)}
          className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-gradient-to-br from-pink-500 to-amber-400 hover:from-pink-400 hover:to-amber-300 shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-110 glow-pink"
          size="icon"
        >
          <Cloud className="h-5 w-5 md:h-8 md:w-8" />
        </Button>
        <Button
          onClick={() => setShowExpenseDialog(true)}
          className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-gradient-to-br from-accent to-primary hover:from-accent/80 hover:to-primary/80 shadow-2xl hover:shadow-accent/50 transition-all duration-300 hover:scale-110 glow-accent"
          size="icon"
        >
          <DollarSign className="h-5 w-5 md:h-8 md:w-8" />
        </Button>
      </motion.div>

      <ExpenseDialog open={showExpenseDialog} onOpenChange={setShowExpenseDialog} />
      <WeatherDialog open={showWeatherDialog} onOpenChange={setShowWeatherDialog} />

      <AnimatePresence mode="wait">
        {selectedDay === null ? (
          <motion.div
            key="selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4"
          >
            {/* Floating casino emojis */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
              {floatingEmojis.map((emoji, i) => {
                const left = seededRandom(i * 7 + 1) * 90 + 5
                const top = seededRandom(i * 13 + 3) * 80 + 10
                const size = seededRandom(i * 3 + 5) * 14 + 20
                const delay = seededRandom(i * 11 + 7) * 5
                const duration = seededRandom(i * 5 + 2) * 6 + 8
                const driftX = (seededRandom(i * 9 + 4) - 0.5) * 80
                const driftY = (seededRandom(i * 17 + 6) - 0.5) * 50

                return (
                  <motion.span
                    key={i}
                    className="absolute select-none"
                    style={{
                      left: `${left}%`,
                      top: `${top}%`,
                      fontSize: `${size}px`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 0.45, 0.3, 0.45, 0],
                      scale: [0.5, 1.1, 0.9, 1.05, 0.5],
                      x: [0, driftX, -driftX * 0.5, driftX * 0.7, 0],
                      y: [0, driftY, -driftY * 0.6, driftY * 0.4, 0],
                      rotate: [0, 20, -15, 10, 0],
                    }}
                    transition={{
                      duration,
                      delay,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {emoji}
                  </motion.span>
                )
              })}
            </div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-12 md:mb-16"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block"
              >
                <h1 className="text-3xl md:text-6xl font-bold mb-3 md:mb-4 text-balance">
                  <span className="relative inline-flex items-center gap-2 md:gap-4">
                    {/* Left flying money */}
                    <span className="inline-flex flex-col gap-1 items-center">
                      {flyingMoneyLeft.map((m, i) => (
                        <motion.span
                          key={`left-${i}`}
                          className="text-lg md:text-3xl select-none"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{
                            opacity: [0, 0.9, 0.7, 0.9, 0],
                            x: [20, -8, 15, -5, 20],
                            y: [m.y, m.y - 10, m.y + 5, m.y - 8, m.y],
                            rotate: [0, -20, 10, -15, 0],
                            scale: [0.8, 1.1, 0.95, 1.05, 0.8],
                          }}
                          transition={{
                            duration: 3,
                            delay: m.delay + 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          {m.emoji}
                        </motion.span>
                      ))}
                    </span>

                    {/* Title */}
                    <span className="relative inline-block">
                      <span className="relative z-10 text-primary animate-pulse-glow">Vegas Adventure</span>
                      <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-pink-500 via-primary to-rose-500 opacity-60 animate-shimmer" />
                      <span className="absolute -inset-2 blur-3xl bg-gradient-to-r from-rose-500/30 via-pink-500/20 to-amber-500/30 opacity-50 animate-float" />
                    </span>

                    {/* Right flying money */}
                    <span className="inline-flex flex-col gap-1 items-center">
                      {flyingMoneyRight.map((m, i) => (
                        <motion.span
                          key={`right-${i}`}
                          className="text-lg md:text-3xl select-none"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{
                            opacity: [0, 0.9, 0.7, 0.9, 0],
                            x: [-20, 8, -15, 5, -20],
                            y: [m.y, m.y + 8, m.y - 5, m.y + 6, m.y],
                            rotate: [0, 20, -10, 15, 0],
                            scale: [0.8, 1.1, 0.95, 1.05, 0.8],
                          }}
                          transition={{
                            duration: 3,
                            delay: m.delay + 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          {m.emoji}
                        </motion.span>
                      ))}
                    </span>
                  </span>
                </h1>
              </motion.div>
              <p className="text-base md:text-2xl text-muted-foreground font-mono">March 27–31, 2026</p>
              <p className="mt-2 md:mt-3 text-sm md:text-lg font-semibold text-accent glow-text-pink">~$889 per person</p>
              <div className="mt-3 md:mt-5 flex items-center justify-center gap-2 md:gap-3 text-[10px] md:text-sm text-muted-foreground flex-wrap">
                <span>✈️ ATL → LAS</span>
                <span>•</span>
                <span>🎰 The Strip</span>
                <span>•</span>
                <span>🏜️ Grand Canyon</span>
                <span>•</span>
                <span>🌅 Fremont St</span>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 md:gap-6 w-full max-w-4xl">
              {dayCards.map((card, index) => (
                <motion.div
                  key={card.day}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Button
                    onClick={() => selectDay(card.day)}
                    className="group relative w-full h-48 md:h-72 overflow-hidden rounded-xl md:rounded-2xl border-2 border-border/50 hover:border-accent/50 transition-all duration-500 bg-card/50 backdrop-blur-sm hover:scale-[1.02] hover:shadow-xl hover:shadow-accent/10"
                    variant="ghost"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: `url('${getImagePath(card.image)}')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

                    {/* Pink glow on hover */}
                    <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-accent/0 via-accent/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 h-full flex flex-col items-start justify-end p-4 md:p-8 text-left">
                      <motion.div
                        className="mb-2 md:mb-4 px-2.5 md:px-4 py-1 md:py-2 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="text-[9px] md:text-sm font-mono text-primary">
                          {card.date}
                        </span>
                      </motion.div>

                      <h2 className="text-xl md:text-4xl font-bold mb-1 md:mb-2 text-foreground">Day {card.day}</h2>

                      <p className="text-xs md:text-lg text-muted-foreground mb-2 md:mb-4">
                        {card.title}
                      </p>

                      <div className="flex items-center gap-2 text-accent group-hover:text-pink-400 group-hover:gap-4 transition-all duration-300 text-xs md:text-base">
                        <span className="font-medium">View Itinerary</span>
                        <ChevronRight className="w-3 h-3 md:w-5 md:h-5" />
                      </div>
                    </div>

                    <motion.div
                      className="absolute top-2 right-2 md:top-4 md:right-4 w-10 h-10 md:w-16 md:h-16 rounded-full bg-accent/20 backdrop-blur-md flex items-center justify-center text-xl md:text-3xl animate-float"
                      style={{ animationDelay: `${index * 0.5}s` }}
                    >
                      {card.emoji}
                    </motion.div>
                  </Button>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 md:mt-12 text-center text-xs md:text-sm text-muted-foreground"
            >
              <p className="font-mono">Select a day to view your adventure itinerary</p>
            </motion.div>
          </motion.div>
        ) : (
          <DayTimeline day={selectedDay} onBack={goHome} />
        )}
      </AnimatePresence>
    </div>
  )
}
