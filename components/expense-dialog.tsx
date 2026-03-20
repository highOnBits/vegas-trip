"use client"

import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ExpenseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ExpenseDialog({ open, onOpenChange }: ExpenseDialogProps) {
  // Costs breakdown
  // Flights: $180/pp × 7 people = $1,260 + 2 checked bags × $60/bag × 2 flights = $240 → total $1,500
  const flightsTotal = 1500
  const flightPP = flightsTotal / 7 // ~$214.29

  // Rio Hotel: $550 total for 2 rooms × 2 nights (7 people)
  const rioTotal = 550
  const rioPP = rioTotal / 7 // ~$78.57

  // Airbnb Page, AZ: $414 total (8 people)
  const airbnbTotal = 414
  const airbnbPP = 51.75

  // Rental Van: $265.74 total (8 people)
  const carTotal = 265.74
  const carPP = 33.22

  // Gas estimate: ~$120 for ~560 miles (8 people)
  const gasTotal = 120
  const gasPP = gasTotal / 8

  // Grand Canyon entry: ~$100/head (new 2026 rule)
  const gcEntryPP = 100

  // Antelope Canyon tour: $864 total (8 people)
  const antelopeTotal = 864
  const antelopePP = 108

  // Food: ~$50–70/person/day × 3.5 days ≈ $200/pp
  const foodPP = 200
  const foodTotal = foodPP * 7 // rough group estimate

  // Per-person total (approximate, since some costs are /7 and some /8)
  const perPerson = Math.round(flightPP + rioPP + airbnbPP + carPP + gasPP + gcEntryPP + antelopePP + foodPP)

  const expenseCategories = [
    {
      category: "Flights (ATL ⇄ LAS)",
      icon: "✈️",
      total: flightsTotal,
      perPerson: flightPP,
      color: "from-amber-500/20 to-yellow-500/20 border-amber-500/30",
      textColor: "text-amber-400",
      note: "$180/pp roundtrip × 7 + 2 checked bags ($60/bag × 2 flights)",
    },
    {
      category: "Rio Hotel & Casino (2 nights)",
      icon: "🏨",
      total: rioTotal,
      perPerson: rioPP,
      color: "from-pink-500/20 to-rose-500/20 border-pink-500/30",
      textColor: "text-pink-400",
      note: "$550 all-in • 2 rooms × 2 nights (Wed–Fri) • 7 people",
    },
    {
      category: "Airbnb in Page, AZ (1 night)",
      icon: "🏠",
      total: airbnbTotal,
      perPerson: airbnbPP,
      color: "from-sky-500/20 to-blue-500/20 border-sky-500/30",
      textColor: "text-sky-400",
      note: "$414 total • Fri night near Horseshoe Bend • 8 people",
    },
    {
      category: "Rental Van (Avis)",
      icon: "🚐",
      total: carTotal,
      perPerson: carPP,
      color: "from-emerald-500/20 to-green-500/20 border-emerald-500/30",
      textColor: "text-emerald-400",
      note: "Ford Transit 12-passenger • 1.5 days • via Costco • 8 people",
    },
    {
      category: "Gas (~560 miles)",
      icon: "⛽",
      total: gasTotal,
      perPerson: gasPP,
      color: "from-lime-500/20 to-green-500/20 border-lime-500/30",
      textColor: "text-lime-400",
      note: "Vegas ↔ Grand Canyon ↔ Page ↔ Vegas • 8 people",
    },
    {
      category: "Grand Canyon Entry",
      icon: "🏜️",
      total: gcEntryPP * 8,
      perPerson: gcEntryPP,
      color: "from-orange-500/20 to-red-500/20 border-orange-500/30",
      textColor: "text-orange-400",
      note: "~$100/head (new 2026 rule) • If lucky: $35/vehicle instead!",
    },
    {
      category: "Antelope Canyon Tour",
      icon: "📸",
      total: antelopeTotal,
      perPerson: antelopePP,
      color: "from-rose-500/20 to-pink-500/20 border-rose-500/30",
      textColor: "text-rose-400",
      note: "$864 total • Guided slot canyon tour • 8 people",
    },
    {
      category: "Food & Drinks (~3.5 days)",
      icon: "🍔",
      total: foodTotal,
      perPerson: foodPP,
      color: "from-violet-500/20 to-purple-500/20 border-violet-500/30",
      textColor: "text-violet-400",
      note: "~$50–70/person/day including pool party & dining out",
    },
  ]

  const grandTotal = Math.round(perPerson * 7)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-xl border-primary/30 p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Trip Expense Breakdown
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-muted-foreground">
            Complete cost breakdown — Vegas + Grand Canyon + Antelope Canyon
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
          {expenseCategories.map((item, index) => (
            <motion.div
              key={item.category}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`p-3 sm:p-4 rounded-xl bg-gradient-to-br ${item.color} border backdrop-blur-sm`}
            >
              <div className="flex items-start justify-between gap-2 sm:gap-4">
                <div className="flex items-start gap-2 sm:gap-3 flex-1">
                  <span className="text-xl sm:text-3xl">{item.icon}</span>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base text-foreground">{item.category}</h3>
                    {item.note && <p className="text-xs text-muted-foreground mt-0.5 sm:mt-1">{item.note}</p>}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold text-base sm:text-xl ${item.textColor}`}>
                    ${item.perPerson.toFixed(0)}<span className="text-xs font-normal opacity-70">/pp</span>
                  </div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground">
                    ${item.total.toLocaleString()} total
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 sm:mt-6 p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/40 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="text-lg sm:text-2xl font-bold text-foreground">Total Per Person</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">7 on flights, 8 from Friday</p>
              </div>
              <div className="text-right">
                <div className="text-2xl sm:text-4xl font-bold text-primary">~${perPerson}</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
                  ~${grandTotal.toLocaleString()} group total
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="p-3 sm:p-4 rounded-xl bg-card/30 border border-border/20"
          >
            <p className="text-[10px] sm:text-xs text-muted-foreground text-center">
              💡 Grand Canyon entry could drop to ~$6/pp if the $35/vehicle rate applies. Costs are estimates — actual may vary.
            </p>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
