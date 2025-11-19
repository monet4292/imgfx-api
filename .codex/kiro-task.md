---
name: kiro-task
description: Load and persist .codex context for all tasks in this session.
argument-hint: ROOT=<path to project root>
---

# Codex Integration Mode (Persistent Session Context)
Activate long-lived context mode.

Codex must load and keep in memory, for the entire session, the following files:

- `$ROOT/.codex/product.md`
- `$ROOT/.codex/structure.md`
- `$ROOT/.codex/tech.md`

If ROOT is not provided, Codex uses workspace root.

---

## Persistent Rules (for all subsequent tasks)

1. **Always preload these three `.codex` files** at the start of the session.
2. **Store them as persistent memory** and reuse automatically for every future command.
3. Always follow:
   - Behavior & constraints → `product.md`
   - Architecture & placement → `structure.md`
   - Build/run/test/env rules → `tech.md`
4. If `.codex` conflicts with actual code → prefer the code and update internal memory.
5. Never guess.  
   Never introduce new structures or dependencies unless consistent with the project.
6. If missing context → ask before generating code.
7. For every task:
   - Use `.codex` context first  
   - Identify relevant parts  
   - Output exact file paths and justify using `structure.md`  
   - Ensure output builds, passes tests, and respects `tech.md`
8. Only perform repo-wide search if `.codex` context is insufficient.

---

## Placeholder Notes
- `$ROOT` expands from `ROOT=<value>`
- Positional: `$1 … $9`  
- Named: `$FILE`, `$TARGET`, `$MODE`, `$FOCUS`  
- Use `$$` to output a literal `$`

---

## Invocation Example
