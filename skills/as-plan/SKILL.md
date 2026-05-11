---
name: as-plan
description: Breaks work into small verifiable tasks with acceptance criteria and dependency ordering. Use after a spec exists and before any code is written, when work spans multiple files, modules, or sessions.
---

# As-Plan

## Overview

Convert a spec into a dependency-ordered task list where each task is a vertical slice with explicit acceptance criteria. The plan is the contract that as-build executes against — weak plans produce weak commits.

## When to Use

- A spec (SPEC.md or equivalent) exists and is approved
- The work touches more than one file or component
- You will hand the plan to as-build for execution
- Multiple sessions or contributors will work from the same artifact

**When NOT to use:** No spec exists yet (run as-spec first); the work is a single trivial edit; requirements are still being negotiated.

## Process

Invoke planning-and-task-breakdown. Read the existing spec and the relevant codebase sections. Then:

1. Enter plan mode — read only, no code changes
2. Identify the dependency graph between components
3. Slice work vertically (one complete path per task, not horizontal layers)
4. Write tasks with acceptance criteria and verification steps
5. Add checkpoints between phases
6. Present the plan for human review

Save the plan to `tasks/plan.md` and the task list to `tasks/todo.md`.
