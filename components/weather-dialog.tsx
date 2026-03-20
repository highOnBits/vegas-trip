"use client"

import { motion } from "framer-motion"
import { Cloud, Sun, Wind } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface WeatherDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WeatherDialog({ open, onOpenChange }: WeatherDialogProps) {
  const weatherData = [
    {
      date: "Mar 25",
      day: "Wed",
      location: "Vegas",
      temp: "72°F",
      condition: "Sunny",
      icon: Sun,
      high: 72,
      low: 52,
    },
    {
      date: "Mar 26",
      day: "Thu",
      location: "Vegas",
      temp: "75°F",
      condition: "Clear",
      icon: Sun,
      high: 75,
      low: 54,
    },
    {
      date: "Mar 27",
      day: "Fri",
      location: "GC South Rim",
      temp: "57°F",
      condition: "Partly Cloudy",
      icon: Cloud,
      high: 57,
      low: 30,
    },
    {
      date: "Mar 28",
      day: "Sat",
      location: "Page → Vegas",
      temp: "65°F",
      condition: "Breezy",
      icon: Wind,
      high: 73,
      low: 38,
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md md:max-w-2xl bg-background/95 backdrop-blur-xl border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold flex items-center gap-2 md:gap-3">
            <Sun className="w-5 h-5 md:w-6 md:h-6 text-accent" />
            Weather Forecast
          </DialogTitle>
        </DialogHeader>

        <div className="py-3 md:py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
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
                  <p className="text-xs md:text-sm text-muted-foreground font-mono mb-1">{day.day}</p>
                  <p className="text-[9px] md:text-xs text-muted-foreground/60 mb-2">{day.location}</p>
                  <Icon className="w-8 h-8 md:w-12 md:h-12 text-primary mb-2 md:mb-3" />
                  <p className="text-xl md:text-2xl font-bold text-foreground mb-1 md:mb-2">{day.temp}</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground text-center leading-tight mb-2">
                    {day.condition}
                  </p>
                  <p className="text-[10px] text-muted-foreground/60">
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
              🌵 Vegas will be warm and sunny! Grand Canyon South Rim is ~7,000ft elevation — expect cooler temps. Page, AZ is desert but can be windy.
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
              <li>• Sunscreen and sunglasses (desert sun is intense)</li>
              <li>• Layers for Grand Canyon (warm jacket + hoodie)</li>
              <li>• Comfortable walking shoes for hiking</li>
              <li>• Refillable water bottle</li>
              <li>• Swimwear for the pool party</li>
            </ul>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
