---
name: as-ship
description: Runs the pre-launch checklist via parallel fan-out to specialist personas, then synthesizes a go/no-go decision with a rollback plan. Use before merging or releasing a production-bound change with non-trivial blast radius.
---

# As-Ship

## Overview

Fan-out orchestrator that runs three specialist personas in parallel against the current change, then merges their reports into a single go/no-go decision with a rollback plan. The personas operate independently — no shared state, no ordering — which is what makes parallel execution safe and useful here.

## When to Use

- A change is destined for production or a shared environment
- The diff touches more than 2 files, exceeds 50 lines, or modifies auth/payments/data access/config
- You need a documented decision and rollback plan
- Multiple risk dimensions (security, perf, tests) must be evaluated

**When NOT to use:** Skip the fan-out only if all of the following are true: the change touches 2 files or fewer, the diff is under 50 lines, and it does not touch auth, payments, data access, or config/env. Otherwise, default to fan-out.

## Process

Invoke shipping-and-launch.

### Phase A — Parallel fan-out

Spawn three subagents concurrently using the Agent tool. **Issue all three Agent tool calls in a single assistant turn so they execute in parallel** — sequential calls defeat the purpose.

In Claude Code, each call passes `subagent_type` matching the persona's `name` field:

1. **`code-reviewer`** — Five-axis review (correctness, readability, architecture, security, performance) on staged changes or recent commits.
2. **`security-auditor`** — Vulnerability and threat-model pass: OWASP Top 10, secrets, auth/authz, dependency CVEs.
3. **`test-engineer`** — Test coverage analysis: happy path, edge cases, error paths, concurrency.

In other harnesses without an Agent tool, invoke each persona's system prompt sequentially and treat their outputs as if returned in parallel — the merge phase still works.

Constraints (Claude Code subagent model):
- Subagents cannot spawn other subagents — do not let one persona delegate to another.
- Each subagent gets its own context window and returns only its report to this main session.
- For teammates that talk to each other, use Claude Code Agent Teams and reference these personas as teammate types (see `references/orchestration-patterns.md`).

**Persona resolution.** User-defined `code-reviewer`, `security-auditor`, or `test-engineer` in `.claude/agents/` or `~/.claude/agents/` take precedence over plugin versions — `as-ship` picks up customizations automatically.

### Phase B — Merge in main context

Once all three reports are back, the main agent (not a sub-persona) synthesizes:

1. **Code Quality** — Aggregate Critical/Important from `code-reviewer` and any failing tests/lint/build. Resolve duplicates.
2. **Security** — Promote any Critical/High `security-auditor` findings to launch blockers. Cross-reference with `code-reviewer`'s security axis.
3. **Performance** — Pull from `code-reviewer`'s performance axis; cross-check Core Web Vitals if applicable.
4. **Accessibility** — Verify keyboard nav, screen reader, contrast (handle directly or invoke the accessibility checklist).
5. **Infrastructure** — Env vars, migrations, monitoring, feature flags. Verify directly.
6. **Documentation** — README, ADRs, changelog. Verify directly.

### Phase C — Decision and rollback

Produce a single output:

```markdown
## Ship Decision: GO | NO-GO

### Blockers (must fix before ship)
- [Source persona: Critical finding + file:line]

### Recommended fixes (should fix before ship)
- [Source persona: Important finding + file:line]

### Acknowledged risks (shipping anyway)
- [Risk + mitigation]

### Rollback plan
- Trigger conditions: [what signals would prompt rollback]
- Rollback procedure: [exact steps]
- Recovery time objective: [target]

### Specialist reports (full)
- [code-reviewer report]
- [security-auditor report]
- [test-engineer report]
```

## Rules

1. The three Phase A personas run in parallel — never sequentially.
2. Personas do not call each other. The main agent merges in Phase B.
3. The rollback plan is mandatory before any GO decision.
4. If any persona returns a Critical finding, the default verdict is NO-GO unless the user explicitly accepts the risk.
5. **Skip the fan-out only if all of the following are true:** the change touches 2 files or fewer, the diff is under 50 lines, and it does not touch auth, payments, data access, or config/env. Otherwise, default to fan-out. `/ship` is designed for production-bound changes — when the blast radius is non-trivial, run the parallel review even if the diff looks small.

