"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { NavItem, NavigationProps } from "@/types"

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Chat", href: "/chat" },
]

export default function Navigation({ items = DEFAULT_NAV_ITEMS }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 minimal-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <Link
            href="/"
            className="font-display text-2xl text-black dark:text-white hover:text-accent transition-colors"
          >
            HS
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {items.map((item) => {
              const active = isActive(item.href)
              const isChat = item.href === "/chat"

              if (isChat) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="font-display text-base px-6 py-2 bg-accent text-white rounded-full hover:bg-accent/80 transition-colors cursor-pointer shadow-sm"
                  >
                    CHAT
                  </Link>
                )
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    font-display text-base tracking-wide transition-all cursor-pointer px-4 py-1.5 rounded-full
                    ${active
                      ? "text-accent bg-accent/10"
                      : "text-black dark:text-white hover:text-accent hover:bg-muted/60"
                    }
                  `}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-black dark:text-white hover:text-accent transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t-2 border-black dark:border-white">
            <div className="py-4 space-y-2">
              {items.map((item) => {
                const active = isActive(item.href)
                const isChat = item.href === "/chat"

                if (isChat) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block font-display text-xl py-3 px-4 bg-accent text-white text-center cursor-pointer rounded-full mx-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      CHAT
                    </Link>
                  )
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      block font-display text-xl py-3 px-4 tracking-wide transition-colors cursor-pointer rounded-full
                      ${active
                        ? "text-accent"
                        : "text-black dark:text-white hover:text-accent"
                      }
                    `}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
