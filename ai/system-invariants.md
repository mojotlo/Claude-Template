# System Invariants

These rules must always remain true. Do not introduce changes that violate them.
If completing a task would require violating an invariant, stop and request clarification.

---

## Tests Must Pass

All automated tests must pass after any change.
Tests define expected system behavior — they are not optional.

---

## Architecture Boundaries

Dependency direction must remain:

```
infrastructure → services → domain
```

- Domain modules must not depend on infrastructure
- Services orchestrate; domain holds business logic
- Infrastructure handles external systems only

---

## Module Responsibility

Each module must have one clear responsibility.

Never mix in the same module:
- business logic
- persistence
- external integrations
- formatting or presentation

---

## File Size

AI reasoning degrades with large files.

- Target: under 300 lines
- Maximum: 500 lines

Split files when approaching the limit.

---

## Explicit Interfaces

Public functions must clearly define inputs, outputs, and error conditions.

- No hidden dependencies
- No implicit state
- No silent failures

---

## No Hidden Global State

Core logic must not depend on mutable global state.
Use explicit data flow through parameters and return values.

---

## Backwards Compatibility

Existing behavior must remain unchanged unless tests explicitly define new behavior.
Do not break existing functionality unintentionally.

---

## Minimal Scope

Changes must remain localized to the task.
Do not modify unrelated modules.

---

## Consistency Over Novelty

Follow existing patterns in this repository.
Do not introduce new architectural styles, frameworks, or libraries unless explicitly instructed.

---

## Dependency Safety

Do not add, remove, or upgrade npm dependencies without explicit instruction.
Dependency changes affect security, licensing, and bundle size — they require human review.

## Database Access

Always import the Prisma client from `src/infrastructure/database/client.ts`.
Never import directly from `@prisma/client` outside of that file.
Never run `prisma db push` in production — always use `prisma migrate deploy`.
