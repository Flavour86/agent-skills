---
name: as-review
description: Conducts a five-axis code review across correctness, readability, architecture, security, and performance. Use before merging non-trivial changes, when a reviewer is unavailable, or when self-reviewing a draft PR.
---

# As-Review

## Overview

Apply a structured five-axis review to staged changes or recent commits, producing categorized findings with file:line references. The output is actionable feedback ranked by severity, not a vibe check.

## When to Use

- A change is staged or recently committed and ready for review
- You want a self-review pass before requesting human review
- A merge gate requires a documented review
- The diff touches logic, not just text

**When NOT to use:** Trivial changes (typo, comment); pre-coding stage (use as-spec or as-plan); the diff has no tests yet (write tests first).

## Process

Invoke code-review-and-quality. Review the current changes (staged or recent commits) across all five axes:

1. **Correctness** — Does it match the spec? Edge cases handled? Tests adequate?
2. **Readability** — Clear names? Straightforward logic? Well-organized?
3. **Architecture** — Follows existing patterns? Clean boundaries? Right abstraction level?
4. **Security** — Input validated? Secrets safe? Auth checked? (Use security-and-hardening)
5. **Performance** — No N+1 queries? No unbounded ops? (Use performance-optimization)

Categorize findings as **Critical**, **Important**, or **Suggestion**. Output a structured review with specific file:line references and fix recommendations.
