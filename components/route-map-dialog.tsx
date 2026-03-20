"use client"

import { useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import RouteMap from "@/components/route-map"

interface RouteMapDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const VAN_TIMELINE = [
  [0.00, 130],   // parked at Vegas
  [0.12, 130],   // van departs
  [0.16, 330],   // heading south
  [0.20, 700],   // bottom arc
  [0.23, 900],   // arriving at GC
  [0.40, 900],   // parked at GC (long stop)
  [0.42, 950],   // leaving GC
  [0.46, 1080],  // near Cameron
  [0.48, 1100],  // arriving at Page
  [0.60, 1100],  // parked at Page (overnight)
  [0.61, 1120],  // leaving for Antelope
  [0.63, 1180],  // arriving at D
  [0.80, 1180],  // parked at D (Antelope+HB stop)
  [0.82, 1100],  // leaving D, heading back
  [0.85, 800],   // upper route
  [0.88, 520],   // near St. George
  [0.92, 130],   // back at Vegas
  [1.00, 130],   // pause
] as const

function getVanX(t: number): number {
  for (let i = 0; i < VAN_TIMELINE.length - 1; i++) {
    const [t0, x0] = VAN_TIMELINE[i]
    const [t1, x1] = VAN_TIMELINE[i + 1]
    if (t >= t0 && t <= t1) {
      return x0 + (x1 - x0) * ((t - t0) / (t1 - t0))
    }
  }
  return 130
}

export function RouteMapDialog({ open, onOpenChange }: RouteMapDialogProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const startTimeRef = useRef(0)
  const rafRef = useRef(0)
  const doneRef = useRef(false)

  useEffect(() => {
    if (!open) return

    startTimeRef.current = Date.now()
    doneRef.current = false

    const tick = () => {
      if (doneRef.current || !scrollRef.current) return

      const container = scrollRef.current
      const svgWidth = container.scrollWidth
      const viewWidth = container.clientWidth
      if (svgWidth <= viewWidth) { rafRef.current = requestAnimationFrame(tick); return }

      const elapsed = (Date.now() - startTimeRef.current) / 1000
      if (elapsed >= 60) {
        doneRef.current = true
        return
      }

      const vanX = getVanX(elapsed / 60)
      const targetScroll = (vanX / 1400) * svgWidth - viewWidth / 2
      const clamped = Math.max(0, Math.min(svgWidth - viewWidth, targetScroll))
      container.scrollLeft += (clamped - container.scrollLeft) * 0.06

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-route-map className="max-w-[96vw] w-[96vw] max-h-[85vh] md:max-w-[70vw] md:w-[70vw] md:max-h-[70vh] overflow-hidden bg-background/95 backdrop-blur-xl border-primary/20 p-1.5 sm:p-3">
        <DialogHeader className="pb-1">
          <DialogTitle className="text-base md:text-xl font-bold flex items-center gap-2">
            🗺️ Road Trip Route Map
          </DialogTitle>
        </DialogHeader>
        <div
          ref={scrollRef}
          className="rounded-xl overflow-x-auto overflow-y-hidden w-full h-[75vh] md:h-[calc(70vh-60px)]"
        >
          <div className="w-[250vw] md:w-full h-full">
            {open && <RouteMap />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
