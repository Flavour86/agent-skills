---
name: as-test
description: Runs the TDD workflow — write failing tests, implement, verify; for bugs, applies the Prove-It pattern. Use when implementing any logic, fixing any bug, or changing any behavior that should be guaranteed by a test.
---

# As-Test

## Overview

Drive change through tests: define expected behavior as a failing test, implement to green, then verify with the full suite. For bugs, the failing test must reproduce the defect before any fix is applied.

## When to Use

- Implementing new logic, however small
- Fixing a reported bug or regression
- Changing existing behavior in a way callers depend on
- Browser-related defects (also invoke browser-testing-with-devtools)

**When NOT to use:** Pure documentation edits; cosmetic changes with no behavior impact; exploratory spikes that will be deleted.

## Process

Invoke test-driven-development.

### For new features

1. Write tests that describe the expected behavior (they should FAIL)
2. Implement the code to make them pass
3. Refactor while keeping tests green

### For bug fixes (Prove-It pattern)

1. Write a test that reproduces the bug (must FAIL)
2. Confirm the test fails for the right reason
3. Implement the fix
4. Confirm the test passes
5. Run the full test suite for regressions

For browser-related issues, also invoke browser-testing-with-devtools to verify with Chrome DevTools MCP.
