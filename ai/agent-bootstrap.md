# Agent Bootstrap

You are working in an AI-assisted TypeScript/Node.js repository.

Before touching any code, read the context files in CLAUDE.md in order.
This file defines your working process once you have that context.

---

## Task Workflow

When given a task, follow these steps exactly:

1. **Identify the relevant module** using `repo-map.md`
2. **Read related tests** before reading implementation code
3. **Plan the smallest change** that satisfies the task
4. **State your plan** before writing any code — confirm if uncertain
5. **Implement the change**
6. **Run tests** — all must pass
7. **Summarize** what changed and why

Do not skip steps. Do not jump straight to implementation.

---

## Planning

Use Plan mode (Shift+Tab twice in Claude Code) before implementing.

If the task references a GitHub issue number (e.g. "implement issue #12"):
1. Run `gh issue view 12` to read the full issue spec
2. Use the acceptance criteria as the definition of done
3. Reference the issue number in the PR body as "Closes #12"

A good plan:
- names the specific files to be changed
- describes what will change in each file
- identifies which tests cover the affected behavior
- maps each acceptance criterion to a specific test case
- flags any risk or uncertainty

A good plan enables 1-shot implementation. Invest in it.

---

## Scope Discipline

Before starting, check `allowed-changes.md`.

If the task requires work outside allowed scope:
1. Stop
2. Explain what would be needed and why it's out of scope
3. Request clarification before proceeding

Do not interpret tasks broadly. Do not do unrequested work.

---

## Verification

After every meaningful code change — not just at end of session:

1. Run `npm test` — this runs tests AND writes `test-results/summary.txt`
2. Read `test-results/summary.txt` — understand exactly what passed, failed, or has coverage gaps
3. Fix any failures before moving to the next change
4. Run `npm run lint` and `npm run typecheck` before committing

If tests fail:
- Read the full error in `test-results/results.json` for stack traces
- Fix the code or the test — never skip or comment out failing tests
- Re-run until summary.txt shows ✅ PASSED

Claude should never consider a task done until `test-results/summary.txt` shows all passing and 100% coverage.

---

## Architecture Decisions

If a task involves introducing a new library, framework, tool, or architectural
pattern not already in the codebase:

1. **Stop before implementing** — check `ai/decisions/` for an existing ADR
2. **If no ADR exists** — create one before writing any code
3. **If an ADR exists but the decision has changed** — update it before implementing
4. **After implementing** — update the ADR index in `ai/decisions/README.md`

Do not introduce new dependencies or architectural patterns without a documented decision.
This is not optional — undocumented decisions are not allowed changes.

---

## Subagent Invocation

The following slash commands are subagents — they run in a fresh context window
and should be invoked automatically at the right points in the workflow, not just
when the human asks. Each is self-contained and discovers its own context from
the repository.

Invoke subagents in this order after completing an implementation:

```
Implementation complete + tests passing
  → invoke /simplify
    → if simplify reports changes: re-run tests to confirm still passing
  → invoke /verify
    → if verify reports failures: fix them, then re-run /verify
  → invoke /code-review
    → if code-review reports Must Fix items: fix them, then re-run /code-review
  → invoke /commit-push-pr
    → subagent owns CI monitoring until green
  → invoke /wrap-session (for significant feature builds only)
    → human approves any proposed CLAUDE.md updates before they are applied
```

Do not invoke a later subagent until the earlier one has reported success.
Do not skip subagents — each one catches a different class of problems.
If a subagent fails after 3 attempts to fix the issue, stop and ask for human input.

/wrap-session is optional — skip it for small fixes, docs updates, and dependency bumps.
Invoke it whenever something went wrong, a retry was needed, or an architecture decision was made.

---

## Style

- Small, focused commits
- One logical change per session where possible
- Do not refactor unrelated code while implementing a feature
- Prefer obvious code over clever code
