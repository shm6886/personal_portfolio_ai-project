import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { generateSEOMetadata } from "@/lib/seo/generateMetadata"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
})

// 根布局的默认元数据（会被页面级元数据覆盖）
export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: "Haoming Sun - AI Agent Developer",
    description: "Personal portfolio of Haoming Sun, an AI Agent Developer building production-grade LLM systems with focus on evaluation, reliability, and observability.",
    keywords: ["AI Agent", "LLM", "AI Developer", "Production AI"],
  }),
  generator: 'v0.dev',
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
