# Vercel Framework Detection

## How It Works

When first importing a project, Vercel inspects the **main branch** file structure to infer the framework:

| Files Detected | Inferred Framework |
|----------------|-------------------|
| `next.config.js` | Next.js |
| `package.json` + react | Create React App |
| `nuxt.config.js` | Nuxt |
| `api/*.py` (alone) | Python Serverless |
| No characteristic files | Other |

## The Problem

If your main branch only has a README and actual code is in a feature branch:

```
main branch:
├── README.md
└── (nothing else)

feature branch:
├── app/
├── next.config.js
├── package.json
└── api/index.py
```

Vercel will infer "Other" based on the main branch, causing **404 errors** when deploying the feature branch.

## Solution

Go to Vercel Dashboard and manually specify the framework:

```
Settings → General → Framework Preset → Next.js
```

Then redeploy.

## Best Practice

1. Ensure main branch has basic project structure files (at least `package.json` and `next.config.js`)
2. Or check Framework Preset settings immediately after first import
3. See 404 after deployment? First check Framework settings
