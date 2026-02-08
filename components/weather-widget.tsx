"use client"

import { motion } from "framer-motion"
import { Cloud, Sun, Wind } from "lucide-react"

export function WeatherWidget() {
  const weatherData = [
    {
      date: "Mar 27",
      day: "Fri",
      temp: "72°F",
      condition: "Sunny",
      icon: Sun,
      high: 72,
      low: 52,
    },
    {
      date: "Mar 28",
      day: "Sat",
      temp: "75°F",
      condition: "Clear",
      icon: Sun,
      high: 75,
      low: 54,
    },
    {
      date: "Mar 29",
      day: "Sun",
      temp: "57°F",
      condition: "Partly Cloudy",
      icon: Cloud,
      high: 57,
      low: 30,
    },
    {
      date: "Mar 30",
      day: "Mon",
      temp: "60°F",
      condition: "Breezy",
      icon: Wind,
      high: 73,
      low: 32,
    },
  ]

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="w-full max-w-4xl mx-auto mb-6 md:mb-8"
    >
      <div className="bg-card/30 backdrop-blur-md rounded-xl md:rounded-2xl border border-border/30 p-3 md:p-5 shadow-2xl">
        <div className="flex items-center gap-2 mb-3 md:mb-4">
          <Sun className="w-4 h-4 md:w-5 md:h-5 text-accent" />
          <h3 className="text-xs md:text-base font-semibold text-foreground">Vegas & Grand Canyon Weather</h3>
        </div>

        <div className="grid grid-cols-4 gap-2 md:gap-4">
          {weatherData.map((day, index) => {
            const Icon = day.icon
            return (
              <motion.div
                key={day.date}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex flex-col items-center p-2 md:p-4 rounded-lg md:rounded-xl bg-background/40 border border-border/20 hover:border-primary/30 transition-colors"
              >
                <p className="text-[10px] md:text-xs text-muted-foreground font-mono mb-1">{day.day}</p>
                <Icon className="w-6 h-6 md:w-10 md:h-10 text-primary mb-1 md:mb-2" />
                <p className="text-base md:text-2xl font-bold text-foreground mb-0.5 md:mb-1">{day.temp}</p>
                <p className="text-[8px] md:text-xs text-muted-foreground text-center leading-tight">{day.condition}</p>
                <p className="text-[8px] md:text-xs text-muted-foreground/60 mt-1">
                  H:{day.high}° L:{day.low}°
                </p>
              </motion.div>
            )
          })}
        </div>

        <p className="text-[8px] md:text-xs text-muted-foreground/60 mt-2 md:mt-3 text-center font-mono">
          Pack layers for the Grand Canyon!
        </p>
      </div>
    </motion.div>
  )
}
