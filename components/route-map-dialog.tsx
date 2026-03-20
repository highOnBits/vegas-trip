"use client"

import { useRef, useEffect, useCallback, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import RouteMap from "@/components/route-map"

interface RouteMapDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Van approximate X positions along the 50s animation timeline
// Synced with the actual animation phases in route-map.tsx
const VAN_TIMELINE = [
  // [time_fraction, x_position_in_svg]
  [0.00, 130],   // parked at Vegas (people boarding)
  [0.13, 130],   // still at Vegas
  [0.14, 130],   // van departs Vegas
  [0.18, 330],   // heading south past Kingman
  [0.22, 700],   // bottom of arc near Williams
  [0.27, 900],   // arriving at GC
  [0.28, 900],   // at GC
  [0.48, 900],   // parked at GC (long stop)
  [0.49, 950],   // leaving GC heading to Page
  [0.53, 1080],  // near Cameron
  [0.57, 1100],  // arriving at Page
  [0.58, 1100],  // at Page
  [0.73, 1100],  // parked at Page (house + zzz)
  [0.74, 1100],  // leaving Page
  [0.77, 900],   // heading back
  [0.80, 730],   // upper route
  [0.83, 520],   // near St. George
  [0.87, 300],   // heading to Vegas
  [0.91, 130],   // back at Vegas
  [1.00, 130],   // reset/pause
] as const

function getVanX(timeFraction: number): number {
  for (let i = 0; i < VAN_TIMELINE.length - 1; i++) {
    const [t0, x0] = VAN_TIMELINE[i]
    const [t1, x1] = VAN_TIMELINE[i + 1]
    if (timeFraction >= t0 && timeFraction <= t1) {
      const progress = (timeFraction - t0) / (t1 - t0)
      return x0 + (x1 - x0) * progress
    }
  }
  return 130
}

export function RouteMapDialog({ open, onOpenChange }: RouteMapDialogProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const startTimeRef = useRef<number>(0)
  const rafRef = useRef<number>(0)
  const [animationDone, setAnimationDone] = useState(false)

  const CYCLE_DURATION = 50 // seconds, matches the SVG animation

  const autoScroll = useCallback(() => {
    if (!scrollRef.current || animationDone) return
    const container = scrollRef.current
    const svgWidth = container.scrollWidth
    const viewWidth = container.clientWidth

    if (svgWidth <= viewWidth) return // no scroll needed (desktop)

    const elapsed = (Date.now() - startTimeRef.current) / 1000
    const cycle = Math.floor(elapsed / CYCLE_DURATION)

    // After first full cycle, stop auto-scrolling and let user control
    if (cycle >= 1) {
      setAnimationDone(true)
      return
    }

    const timeFraction = (elapsed % CYCLE_DURATION) / CYCLE_DURATION
    const vanX = getVanX(timeFraction)

    // Map SVG coordinate (0-1400) to scroll position
    const svgViewboxWidth = 1400
    const targetScroll = ((vanX / svgViewboxWidth) * svgWidth - viewWidth / 2)
    const scrollableWidth = svgWidth - viewWidth
    const clampedScroll = Math.max(0, Math.min(scrollableWidth, targetScroll))

    container.scrollLeft += (clampedScroll - container.scrollLeft) * 0.06 // smooth lerp

    rafRef.current = requestAnimationFrame(autoScroll)
  }, [animationDone])

  useEffect(() => {
    if (open) {
      startTimeRef.current = Date.now()
      setAnimationDone(false)
      rafRef.current = requestAnimationFrame(autoScroll)
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [open, autoScroll])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[96vw] w-[96vw] max-h-[85vh] md:max-w-[70vw] md:w-[70vw] md:max-h-[70vh] overflow-hidden bg-background/95 backdrop-blur-xl border-primary/20 p-1.5 sm:p-3">
        <DialogHeader className="pb-1">
          <DialogTitle className="text-base md:text-xl font-bold flex items-center gap-2">
            🗺️ Road Trip Route Map
          </DialogTitle>
        </DialogHeader>
        <div
          ref={scrollRef}
          className="rounded-xl overflow-x-auto overflow-y-hidden w-full h-[75vh] md:h-[calc(70vh-60px)]"
        >
          {/* On mobile: SVG is 250vw wide so it's big and scrollable. On desktop: fits container */}
          <div className="w-[250vw] md:w-full h-full">
            {open && <RouteMap />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
