---
name: as-code-simplify
description: Simplifies code for clarity and maintainability while preserving exact behavior. Use when recently changed code has grown complex, when reviewers flag readability, or before merging a large diff that could be tightened.
---

# As-Code-Simplify

## Overview

Reduce structural and naming complexity in already-working code without changing observable behavior. Simplifications are applied incrementally and re-verified after each step so any regression is isolated to one change.

## When to Use

- Recent changes have introduced nesting, long functions, or duplication
- Tests exist and pass — you have a safety net
- A reviewer or you flagged the code as hard to follow
- A broader scope is explicitly requested

**When NOT to use:** Tests do not cover the target code (write tests first via test-driven-development); behavior changes are required (use a normal feature/bug workflow); the code is hot-path and you would risk performance.

## Process

Invoke code-simplification.

1. Read CLAUDE.md and study project conventions
2. Identify the target code — recent changes unless a broader scope is specified
3. Understand the code's purpose, callers, edge cases, and test coverage before touching it
4. Scan for simplification opportunities:
   - Deep nesting → guard clauses or extracted helpers
   - Long functions → split by responsibility
   - Nested ternaries → if/else or switch
   - Generic names → descriptive names
   - Duplicated logic → shared functions
   - Dead code → remove after confirming
5. Apply each simplification incrementally — run tests after each change
6. Verify all tests pass, the build succeeds, and the diff is clean

If tests fail after a simplification, revert that change and reconsider. Use code-review-and-quality to review the result.
