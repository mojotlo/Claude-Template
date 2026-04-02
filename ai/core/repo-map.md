# Repository Map (Core)

**Scope:** Where things are — layer locations, singletons, and change-type-to-location lookup.
Not for project facts or gotchas (that's `ai/core/project-notes.md`),
not for exact file paths or the full module table (that's `ai/supplementary/repo-map.md`).

---

## Layer Locations

| Layer | Path | What lives here |
|---|---|---|
| Domain | `src/domain/` | Pure business logic — no DB, no API calls |
| Services | `src/services/` | Orchestration — composes domain + infrastructure |
| Infrastructure | `src/infrastructure/` | External systems (DB, APIs, queues) |
| UI / Routes | `src/app/` | Next.js App Router pages and API routes |
| Components | `src/components/ui/` | Shared UI components |
| Tests | `tests/` + colocated | Vitest unit/integration, Playwright e2e |

> Update this table when you clone the template to reflect your actual layer structure.

## Critical Singletons

> List any singletons that must not be instantiated more than once.
> Example: "DB client: always import from src/infrastructure/database/client.ts"

## Where to Make Changes

| Change type | Location |
|---|---|
| Business / access rules | `src/domain/` |
| Multi-step workflows | `src/services/` |
| DB queries, API calls | `src/infrastructure/` |
| New pages or API routes | `src/app/` |
| Shared components | `src/components/ui/` |

> Read `ai/supplementary/repo-map.md` when you need the full module table,
> exact file paths, or the external dependency list.
