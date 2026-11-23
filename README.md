# Robetix Website

The marketing website for Robetix, a robotics and electronics engineering company covering PCB design, robotics, automation, embedded systems, autonomous systems and drones. The project is a TypeScript monorepo with a React front end and an Express API foundation.

## Pages

Home, Solutions, PCB Design, Robotics, Autonomous Systems, Drones and UAVs, Flexible Electronics, Projects, About and Contact.

## Technology

| Area | Stack |
|---|---|
| Front end | React, Vite, Tailwind CSS, Wouter, Framer Motion |
| Components | Radix UI based component library |
| API | Express 5 |
| Database | PostgreSQL with Drizzle ORM |
| API contract | OpenAPI with generated React Query hooks and Zod schemas (Orval) |
| Tooling | pnpm workspaces, TypeScript 5.9, esbuild |

## Structure

| Path | Contents |
|---|---|
| `artifacts/robetix` | Website front end |
| `artifacts/api-server` | Express API server |
| `artifacts/mockup-sandbox` | Component preview sandbox |
| `lib/api-spec` | OpenAPI specification and code generation config |
| `lib/api-client-react` | Generated API client hooks |
| `lib/api-zod` | Generated validation schemas |
| `lib/db` | Database schema and connection |
| `attached_assets` | Images used by the site |

## Getting Started

Requirements: Node.js 24 and pnpm.

```bash
pnpm install
pnpm --filter @workspace/robetix run dev          # website
pnpm --filter @workspace/api-server run dev       # API on port 5000
```

The API requires a `DATABASE_URL` environment variable that points to a PostgreSQL database.

## Commands

| Command | Purpose |
|---|---|
| `pnpm run typecheck` | Type check all packages |
| `pnpm run build` | Type check and build all packages |
| `pnpm --filter @workspace/api-spec run codegen` | Regenerate the API client and schemas |
| `pnpm --filter @workspace/db run push` | Push database schema changes during development |

## Author

Zain Haider, Co founder of Robetix.
