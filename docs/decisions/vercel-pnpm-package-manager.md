# Vercel pnpm Package Manager Configuration

## Problem

When your project uses pnpm (has `pnpm-lock.yaml`) but doesn't declare `packageManager` in `package.json`, Vercel shows a warning:

```
WARN! Warning: Could not enable corepack because package.json is missing "packageManager" property
```

Vercel will auto-detect pnpm based on the lock file, but the version may not be what you want.

## Why pnpm

Advantages of pnpm over npm:
- **Faster**: Uses hard links and content-addressable storage
- **Saves space**: Global cache, no duplicate downloads
- **Stricter**: Prevents phantom dependencies

## Solution

Explicitly declare `packageManager` in `package.json`:

```json
{
  "name": "your-project",
  "version": "0.1.0",
  "packageManager": "pnpm@10.28.0",
  ...
}
```

This allows Vercel to use the exact pnpm version via corepack.

## How to Find Version

Check the actual version used in Vercel build log:
```
Done in 4.3s using pnpm v10.28.0
```

Or run locally:
```bash
pnpm --version
```

Recommended to use Vercel's default version for consistency.
