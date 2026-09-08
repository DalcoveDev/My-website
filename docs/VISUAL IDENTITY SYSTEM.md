# 13 — VISUAL IDENTITY SYSTEM

The portfolio must have a distinctive visual identity.

Do not use generic "modern portfolio" styling.

The color system, typography, spacing, imagery, and animation must work together as one recognizable art direction.

---

## 60 / 30 / 10 COLOR SYSTEM

Use the 60/30/10 principle as the foundation of the visual hierarchy.

### 60% — DOMINANT COLOR

The dominant color should control approximately 60% of the visual experience.

Use it primarily for:

* page backgrounds
* major section backgrounds
* large negative space
* primary visual atmosphere

The dominant color establishes the emotional tone of the portfolio.

It should remain consistent enough that the website feels like one identity.

---

### 30% — SECONDARY COLOR

The secondary color should occupy approximately 30% of the visual system.

Use it for:

* secondary surfaces
* large supporting typography
* project compositions
* navigation/supporting UI
* visual blocks
* secondary graphic elements

The secondary color should create contrast with the dominant color without overpowering it.

---

### 10% — ACCENT COLOR

The accent should be used sparingly.

Use approximately 10% for:

* important calls to action
* interactive states
* cursor states
* selected navigation items
* small SVG details
* project metadata
* important visual highlights
* hover states

The accent should feel valuable because it is not everywhere.

Do not turn the accent into the primary color.

---

# COLOR CONSISTENCY

Do not randomly assign colors to individual sections.

Create a centralized color system using CSS variables.

For example:

```css
:root {
  --color-primary: ...;
  --color-secondary: ...;
  --color-accent: ...;
  --color-text: ...;
  --color-muted: ...;
}
```

The actual values should be determined from the final art direction.

Project-specific themes may temporarily alter the palette, but they must still feel connected to the global identity.

---

# TYPOGRAPHIC IDENTITY

Typography is a major part of the portfolio's visual identity.

Do not use typography as an afterthought.

The portfolio should have a deliberate typographic system.

Define:

### DISPLAY TYPE

Used for:

* CREATE
* major section titles
* project titles
* major statements

Display typography should be visually distinctive and immediately recognizable.

---

### BODY TYPE

Used for:

* descriptions
* project information
* services
* testimonials
* contact information

It must remain highly readable.

---

### UTILITY / METADATA TYPE

Used for:

* project numbers
* categories
* dates
* navigation details
* small labels
* technical information

This can have a more technical/editorial character.

---

# TYPOGRAPHIC HIERARCHY

Establish a consistent hierarchy.

Example:

```text
DISPLAY
CREATE

SECTION
ABOUT / SERVICES / WORK

SUBHEADING
Creative Technology

BODY
Description and supporting information

METADATA
01 — DIGITAL EXPERIENCE — 2026
```

Do not make every piece of text large.

The contrast between huge typography and small metadata is an important part of the composition.

---

# TYPOGRAPHY + ANIMATION

Typography should participate in the motion system.

Large headings may use:

* clip-path reveals
* vertical movement
* opacity
* blur resolution
* character/word stagger
* subtle scale
* scroll-linked movement

Do not animate every letter unnecessarily.

Animation should reinforce hierarchy.

---

# SPACING IDENTITY

Spacing must also be intentional.

Use consistent spacing tokens rather than arbitrary values everywhere.

Large visual sections should have generous negative space.

Do not fill every part of the screen.

The empty space is part of the composition.

---

# CONTRAST

Maintain strong visual contrast between:

* primary content
* supporting information
* background
* interactive elements

Important information must remain readable even when animations are active.

Do not sacrifice accessibility for visual effects.

---

# PROJECT THEMES

Individual projects can have different visual identities.

However, they must still share:

* typography rules
* spacing principles
* interaction language
* animation philosophy
* navigation behavior

A project should feel like a different "world" inside the same portfolio—not a completely different website.

---

# DESIGN TOKENS

Before implementing all sections, establish a small design-token system for:

* colors
* typography
* spacing
* border radius
* shadows
* transition durations
* easing curves
* z-index layers

Do not create dozens of unnecessary variables.

The system should remain simple and understandable.

---

# FINAL DESIGN PRINCIPLE

The portfolio should be recognizable even if the logo and name were temporarily removed.

The combination of:

**COLOR + TYPOGRAPHY + SPACING + MOTION + IMAGERY**

must create the identity.

Avoid generic:

* glassmorphism
* excessive gradients
* random neon colors
* generic SaaS cards
* default font combinations
* excessive rounded cards
* template-like layouts

Every visual decision should support the identity of **Dalcove**.
