"use client"

import { useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import RouteMap from "@/components/route-map"

interface RouteMapDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const VAN_TIMELINE = [
  [0.00, 130], [0.13, 130], [0.14, 130],
  [0.18, 330], [0.22, 700], [0.27, 900], [0.28, 900],
  [0.48, 900], [0.49, 950], [0.53, 1080], [0.57, 1100], [0.58, 1100],
  [0.73, 1100], [0.74, 1100],
  [0.77, 900], [0.80, 730], [0.83, 520], [0.87, 300], [0.91, 130],
  [1.00, 130],
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
      if (elapsed >= 50) {
        // First cycle done — stop auto-scrolling, let user control
        doneRef.current = true
        return
      }

      const vanX = getVanX(elapsed / 50)
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
          <div className="w-[250vw] md:w-full h-full">
            {open && <RouteMap />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
