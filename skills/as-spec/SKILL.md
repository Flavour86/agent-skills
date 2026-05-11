---
name: as-spec
description: Starts spec-driven development by writing a structured specification before any code. Use when starting a new project, feature, or significant change and no specification exists yet, or when requirements are unclear or only exist as a vague idea.
---

# As-Spec

## Overview

Produce a single, agreed SPEC.md that captures objective, commands, project structure, code style, testing strategy, and boundaries before any implementation. The spec becomes the shared source of truth between the user and the agent.

## When to Use

- Starting a new project or feature
- Requirements are ambiguous or only verbal
- The change touches multiple files or modules
- An architectural decision is about to be made
- The task would take more than ~30 minutes to implement

**When NOT to use:** Single-line fixes; typo corrections; tasks where requirements are unambiguous and self-contained.

## Process

Invoke spec-driven-development. Begin by understanding what the user wants to build. Ask clarifying questions about:

1. The objective and target users
2. Core features and acceptance criteria
3. Tech stack preferences and constraints
4. Known boundaries (what to always do, ask first about, and never do)

Then generate a structured spec covering all six core areas: objective, commands, project structure, code style, testing strategy, and boundaries.

Save the spec as `SPEC.md` in the project root and confirm with the user before proceeding.
