"use client"

import { motion } from "framer-motion"
import { Clock, MapPin, DollarSign } from "lucide-react"

interface Event {
  time: string
  title: string
  description: string
  icon: string
  details: string
  transport: string
  cost: string
  isShared?: boolean
  backgroundImage?: string
}

interface TimelineEventProps {
  event: Event
  index: number
  totalEvents: number
}

export function TimelineEvent({ event, index, totalEvents }: TimelineEventProps) {
  const delay = index * 0.1

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className="relative pl-16 md:pl-28"
    >
      {/* Icon node */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.2, type: "spring", stiffness: 200 }}
        className="absolute left-2 md:left-8 top-4 md:top-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl md:text-2xl shadow-lg border-2 md:border-4 border-background animate-pulse-glow z-10"
      >
        {event.icon}
      </motion.div>

      {/* Content card */}
      <motion.div
        whileHover={{ scale: 1.02, x: 4 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="group relative bg-card/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-border/50 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden"
      >
        {event.backgroundImage && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40"
              style={{ backgroundImage: `url('${event.backgroundImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/55 to-black/60" />
          </>
        )}

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10">
          {/* Time badge */}
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: delay + 0.3 }}
            className="inline-flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] md:text-xs font-mono mb-2 md:mb-3"
          >
            <Clock className="w-2.5 h-2.5 md:w-3 md:h-3" />
            {event.time}
          </motion.div>

          {/* Title */}
          <h3 className="text-base md:text-2xl font-bold mb-1.5 md:mb-2 text-balance group-hover:text-primary transition-colors">
            {event.title}
          </h3>

          {/* Description */}
          <p className="text-xs md:text-base text-muted-foreground mb-3 md:mb-4 text-pretty leading-relaxed">
            {event.description}
          </p>

          {/* Details */}
          {event.details && (
            <p className="text-xs md:text-sm text-foreground/80 mb-2 md:mb-3 font-medium">{event.details}</p>
          )}

          {/* Meta info */}
          <div className="flex flex-wrap gap-2 md:gap-3 text-xs md:text-sm">
            {event.transport && (
              <div className="flex items-center gap-1 md:gap-1.5 text-muted-foreground">
                <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5 text-accent" />
                <span className="text-[10px] md:text-sm">{event.transport}</span>
              </div>
            )}
            {event.cost && (
              <div className="flex items-center gap-1 md:gap-1.5 px-2 py-1 rounded-md bg-accent/10 border border-accent/20 text-accent font-semibold">
                <DollarSign className="w-3 h-3 md:w-3.5 md:h-3.5" />
                <span className="text-[10px] md:text-sm">{event.cost} per person</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
