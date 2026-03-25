# Commit, Push, and Open PR

Create a git commit, push the branch, and open a pull request. Then monitor CI.

## Steps

1. Run `git status` and `git diff --staged` to see what's changed
2. Write a concise, descriptive commit message summarizing the change
3. Run `git add -A` then `git commit -m "<message>"`
4. Run `git push -u origin HEAD`
5. Create a PR using `gh pr create` with:
   - A clear title matching the commit message
   - A body that describes: what changed, why, and how to test it
   - Link any related issues if mentioned in context
6. Wait ~5 seconds for CI to start, then run `gh run watch` to monitor CI in real time
7. If CI fails, run `gh run view --log-failed` to see the error, fix it, and push again
8. Only consider the task done when CI passes

## Commit message format

```
<type>: <short description>

Types: feat, fix, refactor, test, docs, chore
```

## PR body template

```
## What
<what changed>

## Why
<why this change was needed>

## How to test
<steps to verify the change works>
```

## CI failure handling

If CI fails:
1. Read the failure output from `gh run view --log-failed`
2. Fix the issue — do not open a new PR, just push to the same branch
3. CI will re-run automatically on the new push
4. Confirm CI passes before reporting done
