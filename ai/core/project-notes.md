# Project Notes

**Scope:** Things that are true about this specific project that Claude would get wrong
from general knowledge alone. Read at session start alongside the other core files.
Add a note here whenever Claude makes the same mistake twice.

---

## Subagent model routing (pending Claude Code fix)

Intent: main session on Opus, subagents on Sonnet except `/code-review` which stays on Opus
since it requires architectural judgment.

Current status: the `model:` field in agent frontmatter is unreliable for Task-tool-spawned
subagents (known bug: github.com/anthropics/claude-code/issues/5456). The
`CLAUDE_CODE_SUBAGENT_MODEL` env var works globally but can't exclude `/code-review`.

For now: leave as inherit (Opus). Revisit when the bug is resolved.

When fixed, implement as:
1. Add `export CLAUDE_CODE_SUBAGENT_MODEL=sonnet` to `.zshrc`
2. Convert `/code-review` to `.claude/agents/code-review.md` with `model: opus` frontmatter
   so it overrides the env var for that specific agent

---

## Domain rules

> Replace this section with your project's key domain rules.
> Example: "All monetary values are integers in cents — never floats"

## Infrastructure rules

> Replace this section with non-obvious facts about how your infrastructure is wired.
> Example: "The Prisma client must always be imported from src/infrastructure/database/client.ts"

## Styling

> Replace this section with any non-obvious styling decisions.
> Example: "Tailwind v4 is in use — theme variables are defined via @theme in globals.css"

## Other gotchas

> Add any other things Claude would likely get wrong in this specific codebase.
> This file grows over time — add a note here whenever Claude makes the same mistake twice.
