---
name: as-build
description: Implements the next pending task incrementally — build, test, verify, commit. Use when picking up a task from a plan and you need a disciplined RED→GREEN→commit loop with regression checks at each step.
---

# As-Build

## Overview

Drive a single task from the plan to a green commit using TDD plus a full-suite regression check. This skill is the operational counterpart to planning-and-task-breakdown — it consumes one task at a time and produces one commit at a time.

## When to Use

- A plan exists and lists pending tasks with acceptance criteria
- The next task is well-scoped (a single vertical slice)
- You are ready to write code, not still designing
- The repo has a working test runner and build command

**When NOT to use:** No plan or acceptance criteria exist (use planning-and-task-breakdown first); the change is a one-line typo fix; you are still exploring the design.

## Process

Invoke incremental-implementation alongside test-driven-development. Pick the next pending task. For each task:

1. Read the task's acceptance criteria
2. Load relevant context (existing code, patterns, types)
3. Write a failing test for the expected behavior (RED)
4. Implement the minimum code to pass the test (GREEN)
5. Run the full test suite to check for regressions
6. Run the build to verify compilation
7. Commit with a descriptive message
8. Mark the task complete and move to the next one

If any step fails, follow debugging-and-error-recovery.

