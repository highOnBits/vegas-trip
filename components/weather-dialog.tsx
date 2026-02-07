"use client"

import { motion } from "framer-motion"
import { Cloud, CloudRain, Sun } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface WeatherDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WeatherDialog({ open, onOpenChange }: WeatherDialogProps) {
  const weatherData = [
    {
      date: "Nov 27",
      day: "Thu",
      temp: "25°C",
      condition: "Partly Cloudy",
      icon: Cloud,
      high: 25,
      low: 14,
    },
    {
      date: "Nov 28",
      day: "Fri",
      temp: "24°C",
      condition: "Sunny",
      icon: Sun,
      high: 24,
      low: 13,
    },
    {
      date: "Nov 29",
      day: "Sat",
      temp: "23°C",
      condition: "Light Rain",
      icon: CloudRain,
      high: 23,
      low: 16,
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md md:max-w-2xl bg-background/95 backdrop-blur-xl border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold flex items-center gap-2 md:gap-3">
            <Sun className="w-5 h-5 md:w-6 md:h-6 text-accent" />
            Orlando Weather Forecast
          </DialogTitle>
        </DialogHeader>

        <div className="py-3 md:py-4">
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {weatherData.map((day, index) => {
              const Icon = day.icon
              return (
                <motion.div
                  key={day.date}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center p-3 md:p-5 rounded-xl bg-card/50 border border-border/30 hover:border-primary/30 transition-colors"
                >
                  <p className="text-xs md:text-sm text-muted-foreground font-mono mb-2">{day.day}</p>
                  <Icon className="w-10 h-10 md:w-14 md:h-14 text-primary mb-2 md:mb-3" />
                  <p className="text-2xl md:text-3xl font-bold text-foreground mb-1 md:mb-2">{day.temp}</p>
                  <p className="text-xs md:text-sm text-muted-foreground text-center leading-tight mb-2">
                    {day.condition}
                  </p>
                  <p className="text-xs text-muted-foreground/60">
                    H:{day.high}° L:{day.low}°
                  </p>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 md:mt-6 p-3 md:p-4 rounded-xl bg-accent/10 border border-accent/20"
          >
            <p className="text-xs md:text-sm text-muted-foreground text-center">
              ☀️ Perfect weather for your Orlando adventure! Expect warm days and cool evenings.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-3 md:mt-4 p-3 md:p-4 rounded-xl bg-card/30 border border-border/20"
          >
            <h4 className="text-xs md:text-sm font-semibold mb-2 text-foreground">🎒 What to Pack:</h4>
            <ul className="text-[10px] md:text-xs text-muted-foreground space-y-1">
              <li>• Sunscreen and sunglasses</li>
              <li>• Comfortable walking shoes</li>
            </ul>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
