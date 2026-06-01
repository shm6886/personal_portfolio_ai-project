import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Luxury/Natural Theme: Cream + Earth Green
        primary: {
          DEFAULT: "#FAF8F3",
          foreground: "#2D2D2D",
        },
        secondary: {
          DEFAULT: "#F5F0E8",
          foreground: "#2D2D2D",
        },
        accent: {
          DEFAULT: "#5C7A5C", // Muted earth green
          foreground: "#FFFFFF",
          light: "#7A9E7E",
          dark: "#4A5F4A",
        },
        background: {
          DEFAULT: "#FAF8F3",
          dark: "#FAF8F3",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          dark: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#E0D8CC",
          foreground: "#8A7D6B",
          dark: "#E0D8CC",
        },
        border: {
          DEFAULT: "#E0D8CC",
          dark: "#E0D8CC",
        },
        // Legacy colors for compatibility
        "text-primary": "#2D2D2D",
        "text-secondary": "#6B6B6B",
        highlight: "#5C7A5C",
        "cta-button": "#5C7A5C",
        "regular-button": "#FFFFFF",
        contrast: "#5C7A5C",
        // shadcn/ui compatibility
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-playfair)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(2.5rem, 7vw, 6rem)", { lineHeight: "0.95", letterSpacing: "-0.01em" }],
        "display-lg": ["clamp(2rem, 8vw, 6rem)", { lineHeight: "1", letterSpacing: "-0.005em" }],
        "display-md": ["clamp(1.5rem, 4vw, 3rem)", { lineHeight: "1.2", letterSpacing: "0" }],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-in-left": "slideInLeft 0.6s ease-out",
        "slide-in-right": "slideInRight 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-30px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(30px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        none: "0px",
      },
      boxShadow: {
        "bold": "0 4px 20px rgba(0, 0, 0, 0.08)",
        "bold-sm": "0 2px 10px rgba(0, 0, 0, 0.06)",
        "bold-accent": "0 4px 15px rgba(92, 122, 92, 0.1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
