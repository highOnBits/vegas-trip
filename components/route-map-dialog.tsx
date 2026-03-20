"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import RouteMap from "@/components/route-map"

interface RouteMapDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RouteMapDialog({ open, onOpenChange }: RouteMapDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[70vw] w-[70vw] max-h-[70vh] overflow-hidden bg-background/95 backdrop-blur-xl border-primary/20 p-2 sm:p-3">
        <DialogHeader className="pb-1">
          <DialogTitle className="text-lg md:text-xl font-bold flex items-center gap-2">
            🗺️ Road Trip Route Map
          </DialogTitle>
        </DialogHeader>
        <div className="rounded-xl overflow-hidden w-full" style={{ height: "calc(70vh - 60px)" }}>
          {open && <RouteMap />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
