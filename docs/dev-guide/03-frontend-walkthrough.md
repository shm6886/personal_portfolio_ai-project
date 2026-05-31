# Frontend Code Walkthrough

This document details the frontend code directory structure, each file's responsibilities, and how the AI SDK is used.

---

## Directory Structure

```
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout: fonts, theme, global styles
│   ├── globals.css               # Global CSS variables, color system, utilities
│   │
│   ├── (marketing)/              # Landing Page route group (parentheses don't affect URL)
│   │   ├── page.tsx              # Home page entry → renders HomePageContent
│   │   ├── layout.tsx            # Marketing layout
│   │   ├── loading.tsx           # Loading state UI
│   │   ├── HomePageContent.tsx   # Home page main content organization
│   │   └── _components/          # Landing Page specific components
│   │       ├── Hero.tsx          # Hero section (large title, CTA buttons)
│   │       ├── StatsSection.tsx  # Stats display
│   │       └── ContactSection.tsx # Contact info
│   │
│   ├── chat/                     # Chat page
│   │   ├── page.tsx              # Chat page entry → renders Chat component
│   │   ├── layout.tsx            # Chat layout
│   │   └── loading.tsx           # Loading state
│   │
│   ├── _components/              # Cross-page shared components
│   │   ├── layouts/Navigation.tsx # Top navigation bar
│   │   └── common/MarkdownModal.tsx
│   │
│   └── test-api/                 # API test page (dev only)
│
├── components/                   # General React components
│   ├── chat/                     # Chat core components
│   │   ├── chat.tsx              # Main chat component (useChat Hook)
│   │   ├── message.tsx           # Single message rendering
│   │   ├── multimodal-input.tsx  # Input box + shortcut buttons
│   │   ├── overview.tsx          # Chat welcome screen
│   │   ├── markdown.tsx          # Markdown rendering
│   │   └── icons/                # Chat-related icons
│   │
│   ├── ui/                       # shadcn/ui base components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ... (50+ components)
│   │
│   └── theme-provider.tsx        # Theme toggle Provider
│
├── lib/                          # Utility functions
│   ├── constants.ts              # Constants (title, CDN links, routes)
│   ├── utils.ts                  # Utilities (cn for merging class names)
│   └── seo/                      # SEO related
│
├── data/                         # Static data
│   ├── achievement-stats.ts      # Landing Page stats data
│   └── suggested-actions.json    # Chat shortcut button config
│
├── hooks/                        # Custom React Hooks
│   └── use-scroll-to-bottom.ts   # Auto-scroll to bottom
│
├── types/                        # TypeScript type definitions
├── public/                       # Static assets (images, etc.)
└── styles/                       # Additional styles
```

---

## Key Files Explained

### `app/layout.tsx` - Root Layout

- Defines global fonts (Bebas Neue for headings, Source Sans 3 for body)
- Imports `globals.css`
- Wraps with `ThemeProvider` for light/dark theme support

### `app/globals.css` - Global Styles

- CSS variables define color system (black & white theme + electric blue accent)
- Utility classes: `bold-card`, `bold-button`, `bold-nav`
- Dark mode support

### `components/chat/chat.tsx` - Core Chat Component

This is the core of AI interaction, using Vercel AI SDK:

```tsx
import { useChat } from "@ai-sdk/react";

// useChat Hook manages:
// - messages: message list
// - status: 'idle' | 'loading' | 'streaming'
// - append: send new message
const { messages, status, append } = useChat({
  api: "/api/chat",        // Backend API endpoint
  id: chatId,              // Session ID
  initialMessages: [],
  onError: (error) => toast.error(error.message),
});
```

**Key implementations:**
1. Uses `FingerprintJS` to generate browser fingerprint for user tracking
2. Injects custom headers via `fetch` interceptor
3. Handles streaming responses, renders AI replies in real-time

### `components/chat/multimodal-input.tsx` - Input Component

- Text input box
- Shortcut buttons (loaded from `data/suggested-actions.json`)
- Send button
- Hover effect handling

### `lib/constants.ts` - Constants Configuration

```ts
export const METADATA = {
  TITLE: "John Doe - Software Engineer",
  AI_ASSISTANT_NAME: "AI Assistant",
};

export const ROUTES = {
  HOME: "/",
  CHAT: "/chat",
};
```

---

## AI SDK Dependencies

### AI-related dependencies in `package.json`

| Package | Version | Purpose |
|---------|---------|---------|
| `ai` | ^6.0.72 | Vercel AI SDK core, defines streaming protocol |
| `@ai-sdk/react` | ^3.0.79 | React Hooks (`useChat`, `useCompletion`) |

### How AI SDK Works

```
Frontend useChat() → POST /api/chat → Backend returns SSE Stream → useChat parses and updates UI
```

**Protocol format:** AI SDK Data Stream Protocol
- `0:` prefix = text chunk
- `e:` prefix = error
- `d:` prefix = done signal

Frontend doesn't need to parse manually, `useChat` Hook handles it automatically.

---

## Other Important Dependencies

| Package | Purpose |
|---------|---------|
| `@radix-ui/*` | Accessible UI components (shadcn/ui foundation) |
| `tailwind-merge` | Smart Tailwind class name merging |
| `framer-motion` | Animation library |
| `react-markdown` | Markdown rendering |
| `lucide-react` | Icon library |
| `sonner` | Toast notifications |
| `@fingerprintjs/fingerprintjs` | Browser fingerprint generation |

---

## Route Structure

| URL | File | Description |
|-----|------|-------------|
| `/` | `app/(marketing)/page.tsx` | Landing Page |
| `/chat` | `app/chat/page.tsx` | AI Chat page |
| `/test-api` | `app/test-api/page.tsx` | API testing (dev only) |

**Note:** `(marketing)` parentheses indicate a route group, doesn't affect URL path.
