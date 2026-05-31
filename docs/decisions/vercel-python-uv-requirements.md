# Vercel Python with uv and requirements.txt

## Current Situation

Vercel's Python runtime **already supports uv** as the installer:

```
Using uv at "/usr/local/bin/uv"
Installing required dependencies from requirements.txt with uv...
```

But Vercel **does not support** reading dependencies directly from `pyproject.toml`.

## Why Not pyproject.toml Directly

Vercel's Python detection logic only recognizes these files:
- `requirements.txt`
- `Pipfile` / `Pipfile.lock`

If you only have `pyproject.toml`, Vercel doesn't know how to install dependencies.

## Our Workflow

```
Local dev: pyproject.toml + uv.lock (managed by uv)
     ↓
Before deploy: mise run export (generates requirements.txt)
     ↓
Vercel: installs requirements.txt using uv
```

The export task in `mise.toml`:

```toml
[tasks.export]
description = "Export Python dependencies to requirements.txt"
run = "uv export --format requirements-txt --no-dev --no-emit-project > requirements.txt"
```

## .vercelignore

To prevent Vercel from incorrectly reading `pyproject.toml`, you can ignore it in `.vercelignore`:

```
pyproject.toml
```

## Summary

```
pyproject.toml  →  uv export  →  requirements.txt  →  Vercel (uv install)
    (source)        (convert)       (bridge)            (deploy)
```

Although it's an extra step, this maintains using modern tools locally (uv + pyproject.toml) while being compatible with Vercel's requirements for deployment.
