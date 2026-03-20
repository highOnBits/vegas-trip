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
      <DialogContent className="max-w-[96vw] w-[96vw] max-h-[85vh] md:max-w-[70vw] md:w-[70vw] md:max-h-[70vh] overflow-hidden bg-background/95 backdrop-blur-xl border-primary/20 p-1.5 sm:p-3">
        <DialogHeader className="pb-1">
          <DialogTitle className="text-base md:text-xl font-bold flex items-center gap-2">
            🗺️ Road Trip Route Map
          </DialogTitle>
        </DialogHeader>
        <div className="rounded-xl overflow-hidden w-full h-[75vh] md:h-[calc(70vh-60px)]">
          {open && <RouteMap />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
