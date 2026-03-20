"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { getImagePath } from "@/lib/utils"

interface RouteMapDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RouteMapDialog({ open, onOpenChange }: RouteMapDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto bg-background/95 backdrop-blur-xl border-primary/20 p-2 sm:p-4">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold flex items-center gap-2">
            🗺️ Road Trip Route Map
          </DialogTitle>
        </DialogHeader>
        <div className="rounded-xl overflow-hidden">
          <img
            src={getImagePath("/road-trip-route-map.svg")}
            alt="Road trip route: Vegas → Grand Canyon South Rim → Antelope Canyon → Horseshoe Bend → Vegas"
            className="w-full h-auto"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
