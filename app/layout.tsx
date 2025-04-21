import type React from "react"
import { Inter } from "next/font/google"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import "./globals.css"
import { Chatbot } from "./components/chatbot"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Digital DSI - Document & IT Solutions",
  description: "Professional document and IT solutions for businesses",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#090A11] min-h-screen`}>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <Chatbot />
      </body>
    </html>
  )
}

import './globals.css'