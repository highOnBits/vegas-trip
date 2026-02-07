"use client"

import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ExpenseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ExpenseDialog({ open, onOpenChange }: ExpenseDialogProps) {
  // Day 1 expenses per person
  const day1Food = 25 + 50 // ICON Park lunch + Disney Springs dinner
  const day1Activities = 30 // The Wheel
  const day1Uber = 8.75 + 7.5 // Two Uber rides split by 4

  // Day 2 expenses per person
  const day2Ticket = 185 // Universal IOA ticket
  const day2Food = 15 + 40 + 20 // Butterbeer + Lunch + Flex block
  const day2Uber = 8.75 // Morning Uber split by 4

  // Totals per person
  const totalDay1 = day1Food + day1Activities + day1Uber
  const totalDay2 = day2Ticket + day2Food + day2Uber

  // Trip-wide expenses
  const flight = 235 // per person
  const hotelPerPerson = 350 / 4 // $350 total divided by 4 people

  // Grand total per person
  const grandTotal = flight + hotelPerPerson + totalDay1 + totalDay2

  const expenseCategories = [
    {
      category: "Flights",
      icon: "✈️",
      amount: flight,
      color: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
      textColor: "text-blue-400",
    },
    {
      category: "Hotel",
      icon: "🏨",
      amount: hotelPerPerson,
      color: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
      textColor: "text-purple-400",
      note: "$350 total ÷ 4 people",
    },
    {
      category: "Universal Ticket",
      icon: "🎢",
      amount: day2Ticket,
      color: "from-orange-500/20 to-red-500/20 border-orange-500/30",
      textColor: "text-orange-400",
    },
    {
      category: "Food & Drinks",
      icon: "🍔",
      amount: day1Food + day2Food,
      color: "from-green-500/20 to-emerald-500/20 border-green-500/30",
      textColor: "text-green-400",
      note: "Day 1 + Day 2 meals",
    },
    {
      category: "Activities",
      icon: "🎡",
      amount: day1Activities,
      color: "from-pink-500/20 to-rose-500/20 border-pink-500/30",
      textColor: "text-pink-400",
      note: "The Wheel at ICON Park",
    },
    {
      category: "Transportation (Uber)",
      icon: "🚕",
      amount: day1Uber + day2Uber,
      color: "from-yellow-500/20 to-amber-500/20 border-yellow-500/30",
      textColor: "text-yellow-400",
      note: "All rides split by 4",
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
            Complete cost breakdown per person for the Orlando adventure
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
                <div className={`text-right font-bold text-base sm:text-xl ${item.textColor}`}>
                  ${item.amount.toFixed(2)}
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
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">For 4 people traveling</p>
              </div>
              <div className="text-right">
                <div className="text-2xl sm:text-4xl font-bold text-primary">${grandTotal.toFixed(2)}</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
                  ${(grandTotal * 4).toFixed(2)} total for group
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
            <div className="p-3 sm:p-4 rounded-xl bg-card/50 border border-border/50">
              <h4 className="font-semibold text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">Day 1 Total</h4>
              <p className="text-xl sm:text-2xl font-bold text-cyan-400">${totalDay1.toFixed(2)}</p>
            </div>
            <div className="p-3 sm:p-4 rounded-xl bg-card/50 border border-border/50">
              <h4 className="font-semibold text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">Day 2 Total</h4>
              <p className="text-xl sm:text-2xl font-bold text-cyan-400">${totalDay2.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
