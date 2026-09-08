# DALCOVE PORTFOLIO — CREATIVE VISION

This document defines the intended creative direction of the portfolio.

It is the visual and interaction reference for implementation.

The portfolio should feel like:

**A DIGITAL EXHIBITION, NOT A RESUME WEBSITE.**

Core experience:

ENTER → DISCOVER → EXPLORE → SCROLL → EXPERIENCE → CONNECT

The portfolio itself should demonstrate my abilities in:

* Digital Media
* Creative Technology
* Software Development
* Web Development
* Interactive Design
* Digital Experiences

The scroll is part of the artwork.

Sections should transition through layering, movement, typography, atmosphere, and interaction.

Do not simplify the experience into a conventional portfolio unless explicitly requested.

See the remainder of this document for the complete section-by-section creative specification.

# EXACT ANIMATION CHOREOGRAPHY

The animations below are REQUIRED behaviors, not optional creative suggestions.

Do not replace them with generic fade-in animations.

---

## GLOBAL REVEAL SYSTEM

Every major section must use a staged reveal.

When the section enters the viewport, the sequence should approximately be:

**Layer 01 → atmosphere/background**

↓

**Layer 02 → large typography**

↓

**Layer 03 → primary visual**

↓

**Layer 04 → supporting content**

↓

**Layer 05 → SVG/decorative elements**

↓

**Layer 06 → micro-interactions**

The layers should have intentional timing differences.

Do NOT make all elements animate at the same time.

Use ScrollTrigger where appropriate so the animation responds naturally to scroll position.

---

# 01 — OPENING NAME ANIMATION

Before the hero appears, display:

**INGABIRE DALCOVE**

The name should appear progressively.

Preferred visual behavior:

* letters initially hidden or scrambled
* characters progressively resolve
* subtle digital/cyber decoding effect
* opacity increases
* slight blur resolves
* letter spacing settles
* final name becomes completely stable

After the name is complete:

1. Hold the completed name briefly.
2. Transition the loading composition away.
3. Reveal the hero.

The transition should feel like entering the portfolio, not like a conventional website loader.

---

# 02 — HERO

The hero should occupy the viewport.

Primary typography:

**CREATE**

Secondary typography:

**with dalcove**

`CREATE` must be the dominant visual element.

On initial hero entrance:

1. Background appears.
2. `CREATE` begins entering.
3. Typography settles into its final scale.
4. `with dalcove` appears afterward.
5. Navigation becomes visible.
6. Subtle ambient motion continues.

The hero must not feel static.

---

# 03 — ABOUT

When the user scrolls into About:

### Sequence

**1. Background**

The section atmosphere appears first.

**2. Image**

My image enters from the LEFT.

It should use a combination of:

* horizontal translation
* opacity
* subtle scale
* optional clipping/masking

The image should feel like it physically enters the composition.

**3. Typography**

The About heading appears after the image begins settling.

**4. Description**

The description appears afterward.

Use staggered text/element animation where appropriate.

**5. SVG**

The decorative SVG/line begins drawing after the primary content has appeared.

The line should respond to scroll progress.

---

# 04 — SERVICES OVERLAY

This transition is IMPORTANT.

Services must not simply appear below About.

When the user continues scrolling:

**Services enters from BELOW the viewport.**

It moves upward.

As it moves upward:

**Services progressively covers About.**

The About section remains behind it.

The Services section eventually occupies the entire viewport.

Conceptually:

```text
ABOUT
████████████████████
████████████████████
        ↑
        │
   SERVICES
   enters from
     below
```

Then:

```text
SERVICES
████████████████████
████████████████████
████████████████████

ABOUT
(hidden behind)
```

Use appropriate positioning and z-index management.

Do not simply fade About out.

The physical covering motion is part of the design.

---

# 05 — PROJECT INTRODUCTION

Before the project cards begin:

Display:

**SCROLL TO VIEW PROJECTS**

This should appear as an intentional cinematic introduction.

Use an accompanying SVG/line animation.

The line can progressively draw as the user scrolls.

The instruction should respond to scroll movement.

---

# 06 — STACKED PROJECT SYSTEM

This is one of the most important interactions.

Each project occupies approximately the full viewport.

Example:

```text
PROJECT 01
████████████████████
████████████████████
████████████████████
```

When the user scrolls:

```text
PROJECT 02
████████████████████
████████████████████
████████████████████

PROJECT 01
████████████████████
```

Project 02 moves upward and covers Project 01.

Then:

```text
PROJECT 03
████████████████████
████████████████████
████████████████████

PROJECT 02
(hidden behind)

PROJECT 01
(hidden behind)
```

Continue this behavior for all projects.

Use ScrollTrigger pinning/sticky positioning only where necessary.

Avoid overlapping pin systems that conflict with one another.

Each project should have a clear start and end point.

---

# 07 — PROJECT-SPECIFIC VISUAL IDENTITY

Although the movement system is consistent, each project should feel visually different.

Change appropriate combinations of:

* typography
* imagery
* composition
* background treatment
* visual texture
* layout

Do not create completely unrelated animation systems.

The movement language should remain coherent.

---

# 08 — HORIZONTAL VISUAL FIELD

After the primary project experience, introduce a visual field containing project images/cards.

The user continues scrolling vertically.

The visual field responds by moving horizontally.

Conceptually:

```text
VERTICAL SCROLL
       ↓

┌──────────────────────────────────────────────┐
│   CARD     CARD      CARD       CARD        │
│      CARD       CARD       CARD             │
└──────────────────────────────────────────────┘
             ← horizontal movement →
```

Cards should occupy a loose horizontal composition.

They should NOT form a perfectly rigid grid.

Allow subtle:

* vertical offsets
* size differences
* spacing differences
* small rotations

Do not use extreme 90° rotations.

The composition should feel intentionally art-directed.

---

# 09 — GALLERY

Images should respond to the cursor.

Normal state:

Image remains stable.

On cursor hover:

* image subtly scales
* image can shift slightly
* project information appears
* category/title can reveal
* cursor can change state

Example:

```text
NORMAL

[ IMAGE ]


HOVER

[ IMAGE ]
   PROJECT NAME
   DIGITAL MEDIA
```

The interaction should remain elegant.

Do not use excessive distortion or distracting effects.

---

# 10 — CONTACT

The Contact section should feel like a final composition being pulled into view.

As the user scrolls toward it:

The contact section enters from ABOVE.

It should feel as if the final composition is being pulled down into the viewport.

Sequence:

1. Contact background
2. Large heading
3. Contact information
4. Form
5. Social links
6. Decorative elements

The final composition should settle naturally into the viewport.

---

# 11 — ANIMATION TIMING

Animations should feel cinematic.

Prefer:

* slower entrances
* smooth easing
* deliberate stagger
* scroll-linked motion
* controlled acceleration/deceleration

Avoid:

* excessive bounce
* random rotation
* extremely fast transitions
* generic fade-in for everything
* animations that distract from content

The animation should make the portfolio feel like a designed digital experience.

---

# 12 — IMPORTANT IMPLEMENTATION RULE

Do not implement all animations simultaneously.

Build and verify them in this order:

1. Opening name
2. Hero
3. About
4. Services overlay
5. Project introduction
6. Project stacking
7. Horizontal visual field
8. Gallery
9. Testimonials
10. Contact

After each stage, verify the behavior before continuing.

If a ScrollTrigger interaction conflicts with an earlier section, fix the underlying scroll architecture rather than adding another library.

---

# SUCCESS CRITERIA

The implementation is successful only if the visitor can clearly feel:

**The page is moving as one continuous composition.**

The sections should feel like physical layers moving through space rather than ordinary HTML sections appearing one after another.

The scroll itself is part of the artwork.
