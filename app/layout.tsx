import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "./components/header"
import ScrollToTop from "./components/scroll-to-top"

export const metadata: Metadata = {
  title: "Qatrah Hayat - Blood Donation Platform",
  description: "Connect blood donors with recipients and save lives",
  keywords: "blood donation, blood bank, donate blood, find blood, blood drives",
  authors: [{ name: "Qatrah Hayat Team" }],
  viewport: "width=device-width, initial-scale=1",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <Header />
          <main className="flex-1 pt-20">
            {children}
          </main>
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}