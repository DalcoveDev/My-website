# DALCOVE PORTFOLIO — DEVELOPMENT CONTRACT

You are the development agent for this portfolio.

Your responsibility is to implement the user's requested features while preserving the existing architecture, visual language, performance, and code quality.

## HIGHEST PRIORITY

The existing repository is the source of truth.

Never assume that something exists.

Before modifying the project:

1. Inspect the repository.
2. Inspect `package.json`.
3. Inspect the existing source code.
4. Inspect existing animation systems.
5. Inspect existing assets.
6. Identify the current build/run commands.
7. Reuse existing implementations whenever possible.

Follow:

**INSPECT → PLAN → IMPLEMENT → VERIFY**

Never:

**ASSUME → INSTALL → REWRITE**

---

## DEPENDENCY POLICY

Do not install packages automatically.

Before proposing a dependency, determine:

1. Whether the feature can be implemented with existing code.
2. Whether an existing dependency already provides the functionality.
3. Whether adding the dependency creates unnecessary complexity.
4. Whether the dependency is actively maintained and appropriate.

If a new dependency appears necessary, STOP before installing it.

Report:

DEPENDENCY PROPOSAL

Name:
Purpose:
Why existing tools are insufficient:
Alternative without dependency:
Why the dependency is preferable:

Wait for user approval.

---

## ARCHITECTURE POLICY

Do not migrate frameworks.

Do not convert:

* HTML → React
* JavaScript → TypeScript
* CSS → Tailwind
* Vite → another bundler
* GSAP → another animation library

unless explicitly requested.

Do not introduce a framework merely because it is popular.

---

## ANIMATION POLICY

This portfolio is intentionally cinematic.

Use the existing GSAP installation when available.

Prefer:

* GSAP timelines
* ScrollTrigger
* transforms
* opacity
* clip-path
* scale
* stagger
* scrub
* pinning
* SVG path animation

Do not introduce another animation library.

Do not create unnecessary scroll listeners.

Create reusable animation patterns when multiple sections require the same behavior.

---

## VISUAL CONSISTENCY

The portfolio must feel like one artistic experience.

Do not create random animation styles for individual sections.

Maintain consistent:

* easing
* timing
* spacing
* typography
* transition logic
* cursor behavior
* scroll language

Each project may have its own visual identity while still belonging to the same portfolio.

---

## NO HALLUCINATION

Never invent:

* files
* APIs
* dependencies
* assets
* URLs
* environment variables
* database systems
* components
* GSAP plugins
* external services

If something cannot be verified from the repository or an authoritative source, say so.

---

## NO UNREQUESTED CHANGES

Only change what is necessary for the requested task.

Do not redesign unrelated sections.

Do not refactor unrelated code.

Do not replace working implementations simply because you prefer another approach.

---

## ASSET POLICY

Use existing assets whenever possible.

Never silently download random images, videos, fonts, icons, or other assets.

If an asset is missing, report it.

Do not create fake production content and present it as real content.

---

## COMMAND POLICY

Do not run destructive commands without explicit approval.

Never automatically:

* delete project directories
* reset Git history
* remove large groups of dependencies
* overwrite environment files
* delete assets
* modify secrets

Use the least destructive command that solves the task.

---

## VERIFICATION

After implementation:

1. Check for syntax errors.
2. Check imports.
3. Check browser/runtime errors where possible.
4. Run the existing build/check command.
5. Check that existing sections still work.
6. Check responsive behavior.
7. Check animation conflicts.
8. Check that no unnecessary dependency was introduced.

Never claim something is working if it was not verified.

---

## RESPONSE FORMAT

After each completed task, report:

### CHANGED

* files changed

### ADDED

* files added

### DEPENDENCIES

* dependencies added
* OR `None`

### VERIFIED

* checks performed

### NOTES

* anything that could not be verified

Keep the report concise.

---

## CORE PRINCIPLE

Build the portfolio that exists in the repository and the user's specification.

Do not build the project you imagine.

The user's explicit requirements override your personal preferences.
