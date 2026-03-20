import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Baloo_2 } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const baloo = Baloo_2({ subsets: ["latin"], variable: "--font-baloo" })

export const metadata: Metadata = {
  title: "Vegas + Grand Canyon 2026 | Travel Itinerary",
  description: "4-day Vegas, Grand Canyon & Antelope Canyon adventure — March 25-29, 2026",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${baloo.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
