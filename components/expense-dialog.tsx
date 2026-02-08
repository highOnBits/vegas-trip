"use client"

import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ExpenseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ExpenseDialog({ open, onOpenChange }: ExpenseDialogProps) {
  // Total costs (6 people)
  const flights = 1200 // $200 roundtrip × 6 people
  const vegasHotel = 1500 // 2 rooms × 2 nights all-in
  const gcHotel = 550 // avg of $520–$580
  const carAndGas = 600 // 7-seat SUV 2 full days (~$400 rental+taxes+fees+insurance) + gas (~$100) + parking (~$100)
  const food = 1450 // avg of $1,200–$1,700
  const parkEntry = 35 // per vehicle

  const grandTotal = flights + vegasHotel + gcHotel + carAndGas + food + parkEntry
  const perPerson = grandTotal / 6

  const expenseCategories = [
    {
      category: "Flights (ATL ⇄ LAS)",
      icon: "✈️",
      total: flights,
      perPerson: flights / 6,
      color: "from-amber-500/20 to-yellow-500/20 border-amber-500/30",
      textColor: "text-amber-400",
      note: "$200 roundtrip × 6 people",
    },
    {
      category: "Vegas Hotel — Flamingo",
      icon: "🏨",
      total: vegasHotel,
      perPerson: vegasHotel / 6,
      color: "from-pink-500/20 to-rose-500/20 border-pink-500/30",
      textColor: "text-pink-400",
      note: "$1,500 all-in • 2 rooms × 2 nights (incl. resort fees + tax)",
    },
    {
      category: "Grand Canyon — Maswik Lodge",
      icon: "🏜️",
      total: gcHotel,
      perPerson: gcHotel / 6,
      color: "from-orange-500/20 to-red-500/20 border-orange-500/30",
      textColor: "text-orange-400",
      note: "2 rooms × 1 night (inside the park!)",
    },
    {
      category: "Rental SUV + Gas",
      icon: "🚗",
      total: carAndGas,
      perPerson: carAndGas / 6,
      color: "from-emerald-500/20 to-green-500/20 border-emerald-500/30",
      textColor: "text-emerald-400",
      note: "7-seat SUV, 2 full days + taxes/fees + ~560mi gas",
    },
    {
      category: "Food & Drinks",
      icon: "🍔",
      total: food,
      perPerson: food / 6,
      color: "from-violet-500/20 to-purple-500/20 border-violet-500/30",
      textColor: "text-violet-400",
      note: "~$60–$90/person/day × 3.5 days",
    },
    {
      category: "Grand Canyon Entry",
      icon: "🎫",
      total: parkEntry,
      perPerson: parkEntry / 6,
      color: "from-teal-500/20 to-cyan-500/20 border-teal-500/30",
      textColor: "text-teal-400",
      note: "$35 per vehicle (7-day pass)",
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-xl border-primary/30 p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Trip Expense Breakdown
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-muted-foreground">
            Complete cost breakdown for 6 people — Vegas + Grand Canyon
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
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">For 6 people traveling</p>
              </div>
              <div className="text-right">
                <div className="text-2xl sm:text-4xl font-bold text-primary">~${perPerson.toFixed(0)}</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
                  ${grandTotal.toLocaleString()} total for group
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
              💡 Costs are averaged from estimated ranges. Actual costs may vary based on flight timing, hotel deals, and dining choices.
            </p>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
