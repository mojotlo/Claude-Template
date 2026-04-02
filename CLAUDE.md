# CLAUDE.md

This is an AI-assisted JavaScript/TypeScript/Node.js project.

## Context files — what to read and when

### Always read at session start (core)

Run `/load-context` or read these four files manually before any work:

1. `ai/core/system-invariants.md` — absolute constraints that must never be violated
2. `ai/core/agent-bootstrap.md` — working process and TDD workflow
3. `ai/core/repo-map.md` — layer locations and critical singletons
4. `ai/core/project-notes.md` — project-specific facts Claude would otherwise get wrong

### Read on demand (supplementary)

Load these only when the task requires them:

- `ai/supplementary/ai-guide.md` — read before writing code, reviewing code, or creating a new module
- `ai/supplementary/allowed-changes.md` — read before starting any implementation task
- `ai/supplementary/repo-map.md` — read when you need exact file paths, module details, or the dependency list
- `ai/decisions/README.md` + relevant ADR — read when a task touches architecture or introduces a new dependency

> **CRITICAL:** Read core files before any work. Supplementary files are not optional when their
> trigger condition applies — skipping them is how architecture violations and out-of-scope work happen.

---

## Quick Reference

### Commands

See `package.json` scripts. Key commands: `npm test`, `npm run dev`, `npm run build`, `npm run lint`, `npm run typecheck`.

### Stack

> Replace this section when cloning the template.

- **Language:** TypeScript (strict mode)
- **Runtime:** Node.js
- **Package manager:** [npm / pnpm / yarn — fill in]
- **Test framework:** [Vitest / Jest — fill in]
- **Frontend:** [fill in or remove]
- **Auth:** [fill in or remove]
- **Database:** [fill in or remove]

---

## Session Workflow

Every feature or fix follows this loop. Do not skip steps.

```
/load-context    → read core ai/ files and confirm context is loaded (start of every session)
/spec            → turn a feature idea into a testable GitHub issue; offers to create worktree
Plan mode        → review spec, confirm approach before writing any code
Code mode        → execute the spec; loop until all tests pass
/simplify        → clean up code without changing behavior (only on green tests)
/verify          → typecheck, lint, tests, browser smoke test
/code-review     → catch anything missed; flag must-fix issues before committing
/commit-push-pr  → commit, push branch, open PR, monitor CI until green
/wrap-session    → write session log, propose CLAUDE.md updates for approval
```

Full workflow rules and subagent invocation order are in `ai/core/agent-bootstrap.md`.

---

## Project Brief

> Replace this section when cloning the template.
> Keep it short — 1 paragraph and a few key domain rules.
> Detailed facts and gotchas belong in `ai/core/project-notes.md`.

[Describe what this project does and what problem it solves]

Key domain rules:
- [fill in non-obvious domain rules that affect implementation]
- [fill in]
