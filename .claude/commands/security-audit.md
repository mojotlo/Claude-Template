# Security Audit

You are a subagent. You have been spawned with a fresh context window to run
a security audit of this codebase. This is not a per-commit review — it is a
periodic sweep of the full codebase for security issues.

Discover everything you need from the repository itself.

## Context discovery

```bash
cat CLAUDE.md                          # understand the project
cat ai/decisions/README.md             # understand the tech stack
cat package.json                       # understand dependencies
git log main --oneline -20             # recent changes
find src -name "*.ts" | head -50       # get a sense of scope
```

---

## Audit Areas

Work through each area in order. Report findings as you go.

### 1. Secrets and credentials

```bash
# Check for hardcoded secrets in source files
grep -r "sk_live\|sk_test\|api_key\|apikey\|secret\|password\|token" src/ \
  --include="*.ts" -l

# Check .env is gitignored
cat .gitignore | grep ".env"

# Check .env.example has no real values
cat .env.example

# Check git history for accidentally committed secrets
git log --all --full-history -- .env
git log -p --all | grep -i "sk_live\|DATABASE_URL.*@" | head -20
```

**Flag if:**
- Any real credentials appear in source files
- `.env` is not in `.gitignore`
- `.env.example` contains real values (not placeholders)
- Git history contains committed secrets

---

### 2. Dependency vulnerabilities

```bash
npm audit
```

**Flag if:**
- Any `high` or `critical` severity vulnerabilities in `dependencies`
- Any `critical` severity vulnerabilities in `devDependencies`
- Moderate vulnerabilities in `dependencies` should be noted

---

### 3. Input validation

Search for places where user input reaches the domain or infrastructure
layer without validation:

```bash
# Find request body usage
grep -r "req\.body\|request\.body\|formData\|searchParams" src/ \
  --include="*.ts" -l

# Find direct DB queries with user input
grep -r "prisma\.\w\+\.\(findFirst\|findMany\|create\|update\|delete\)" src/ \
  --include="*.ts" -n | grep -v "test"
```

For each result, trace the data flow:
- Does user input pass through a validation function before reaching the DB?
- Is the validation in the domain layer (correct) or skipped entirely (wrong)?

**Flag if:**
- User input reaches Prisma queries without explicit validation
- Validation is in the infrastructure layer only (should be domain layer)
- Any use of raw SQL strings with user input

---

### 4. Authentication boundaries

```bash
# Find route/endpoint definitions
grep -r "app\.\(get\|post\|put\|delete\|patch\)\|router\.\|Route\|route" \
  src/ --include="*.ts" -n

# Find auth middleware usage
grep -r "auth\|protect\|requireAuth\|getAuth\|currentUser\|clerkMiddleware" \
  src/ --include="*.ts" -n
```

For each route, check:
- Is it intentionally public or protected?
- If protected, is the auth check at the route level (not just UI level)?
- Are there any routes that should be protected but aren't?

**Flag if:**
- Any route that handles user data lacks auth middleware
- Auth checks exist only in frontend components, not in API routes
- Admin or privileged routes are not separately protected

---

### 5. Sensitive data exposure

```bash
# Find console.log in non-test files
grep -r "console\.log\|console\.error\|console\.warn" src/ \
  --include="*.ts" -n | grep -v "test"

# Find error handlers that might leak internals
grep -r "catch\|error\|Error" src/ --include="*.ts" -n | \
  grep -i "message\|stack\|detail" | grep -v "test" | head -30
```

**Flag if:**
- Console logs output user data, tokens, or passwords
- Error responses return raw error messages or stack traces to the client
- User PII (email, name, address) is logged anywhere

---

### 6. Environment configuration

```bash
# Check for hardcoded URLs or config values
grep -r "localhost\|127\.0\.0\.1\|http://" src/ \
  --include="*.ts" -n | grep -v "test\|comment"

# Check NODE_ENV usage
grep -r "NODE_ENV\|process\.env" src/ --include="*.ts" -n
```

**Flag if:**
- Hardcoded localhost URLs in production code paths
- Development-only features not gated behind `NODE_ENV !== 'production'`
- Sensitive config values not sourced from environment variables

---

### 7. Database security

```bash
# Check Prisma client is only imported from the singleton
grep -r "from '@prisma/client'\|require.*prisma" src/ \
  --include="*.ts" -n | grep -v "infrastructure/database/client"

# Check for raw SQL usage
grep -r "\$queryRaw\|\$executeRaw" src/ --include="*.ts" -n
```

**Flag if:**
- `@prisma/client` imported directly outside `src/infrastructure/database/client.ts`
- `$queryRaw` or `$executeRaw` used with any non-literal string
- Database errors propagated directly to API responses

---

### 8. CORS and API headers

```bash
grep -r "cors\|CORS\|Access-Control\|headers" src/ \
  --include="*.ts" -n | grep -v "test"
```

**Flag if:**
- CORS is configured with `origin: '*'` in production code
- No CORS configuration found on an API that will be called from a browser
- Security headers (Content-Security-Policy, X-Frame-Options) not set

---

## Reporting

Produce a structured report with three sections:

### Critical — fix before shipping
Security issues that could lead to data breach, unauthorized access,
or credential exposure. Block release until resolved.

### High — fix soon
Issues that create meaningful risk but don't require immediate action.
Should be resolved within the current sprint.

### Advisory — good practice
Issues that represent best practice gaps rather than active risk.
Create GitHub issues for these and prioritize accordingly.

For each finding:
- Which file and line number
- What the issue is
- Why it matters
- Exact fix required

## If no issues found

State clearly: "No security issues found in [N] files audited."
List the areas checked so the human knows what was covered.

## Rules

- Never suggest changes outside the audit scope
- Do not flag issues already captured in `npm audit` separately
- Do not create false positives — trace data flow before flagging input validation issues
- Do not run any commands that modify files — this is a read-only audit
- If you find a critical issue, flag it prominently at the top of the report
  before completing the rest of the audit
