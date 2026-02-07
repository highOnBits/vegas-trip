"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, DollarSign, Cloud } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DayTimeline } from "@/components/day-timeline"
import { ExpenseDialog } from "@/components/expense-dialog"
import { WeatherDialog } from "@/components/weather-dialog"
import { getImagePath } from "@/lib/utils"

export default function Home() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [showExpenseDialog, setShowExpenseDialog] = useState(false)
  const [showWeatherDialog, setShowWeatherDialog] = useState(false)

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with overlay */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${getImagePath('/orlando-universal-studios-theme-park-at-night-with.jpg')}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/90" />
      </div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: "spring" }}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex flex-col gap-3"
      >
        <Button
          onClick={() => setShowWeatherDialog(true)}
          className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110"
          size="icon"
        >
          <Cloud className="h-5 w-5 md:h-8 md:w-8" />
        </Button>
        <Button
          onClick={() => setShowExpenseDialog(true)}
          className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-gradient-to-br from-accent to-primary hover:from-accent/80 hover:to-primary/80 shadow-2xl hover:shadow-accent/50 transition-all duration-300 hover:scale-110"
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
                  <span className="relative inline-block">
                    <span className="relative z-10 text-primary animate-pulse-glow">Orlando Adventure</span>
                    <span className="absolute inset-0 blur-xl bg-gradient-to-r from-cyan-500 via-primary to-blue-500 opacity-50 animate-shimmer" />
                  </span>
                </h1>
              </motion.div>
              <p className="text-base md:text-2xl text-muted-foreground font-mono">November 27–29, 2025</p>
              <div className="mt-4 md:mt-6 flex items-center justify-center gap-2 md:gap-3 text-[10px] md:text-sm text-muted-foreground flex-wrap">
                <span>✈️ MCO</span>
                <span>•</span>
                <span>🎢 Universal</span>
                <span>•</span>
                <span>🎡 ICON Park</span>
                <span>•</span>
                <span>✨ Disney Springs</span>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6 w-full max-w-4xl">
              {[1, 2].map((day, index) => (
                <motion.div
                  key={day}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Button
                    onClick={() => setSelectedDay(day)}
                    className="group relative w-full h-64 md:h-80 overflow-hidden rounded-xl md:rounded-2xl border-2 border-border/50 hover:border-primary/50 transition-all duration-500 bg-card/50 backdrop-blur-sm hover:scale-[1.02]"
                    variant="ghost"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage:
                          day === 1
                            ? `url('${getImagePath('/disney-springs-at-night-with-fountains-and-lights.jpg')}')`
                            : `url('${getImagePath('/universal-islands-of-adventure-hogwarts-castle-at-.jpg')}')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

                    <div className="relative z-10 h-full flex flex-col items-start justify-end p-5 md:p-8 text-left">
                      <motion.div
                        className="mb-3 md:mb-4 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="text-[10px] md:text-sm font-mono text-primary">
                          {day === 1 ? "Thursday, Nov 27" : "Friday, Nov 28"}
                        </span>
                      </motion.div>

                      <h2 className="text-3xl md:text-4xl font-bold mb-1.5 md:mb-2 text-foreground">Day {day}</h2>

                      <p className="text-sm md:text-lg text-muted-foreground mb-3 md:mb-4">
                        {day === 1 ? "Arrival & Evening Exploration" : "Islands of Adventure"}
                      </p>

                      <div className="flex items-center gap-2 text-primary group-hover:gap-4 transition-all duration-300 text-sm md:text-base">
                        <span className="font-medium">View Itinerary</span>
                        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                    </div>

                    <motion.div
                      className="absolute top-3 right-3 md:top-4 md:right-4 w-12 h-12 md:w-16 md:h-16 rounded-full bg-accent/20 backdrop-blur-md flex items-center justify-center text-2xl md:text-3xl animate-float"
                      style={{ animationDelay: `${index * 0.5}s` }}
                    >
                      {day === 1 ? "🎡" : "🎢"}
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
              <p className="font-mono">Select a day to view your magical itinerary</p>
            </motion.div>
          </motion.div>
        ) : (
          <DayTimeline day={selectedDay} onBack={() => setSelectedDay(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}
