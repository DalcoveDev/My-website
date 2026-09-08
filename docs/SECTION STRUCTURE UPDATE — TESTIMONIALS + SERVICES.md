# SECTION STRUCTURE UPDATE — TESTIMONIALS + SERVICES

We are upgrading the existing portfolio structure.

## CRITICAL RULE

**DO NOT redesign the website.**

Do not change the existing:

* Color system
* Typography
* Fonts
* Visual identity
* 60/30/10 color system
* Navigation design
* Custom cursor
* Existing animation style
* Background treatment
* Borders
* Graphic language
* Existing section transitions
* Overall spacing language
* Existing GSAP architecture

The current design is already established.

We are ONLY changing:

1. How Testimonials are arranged and presented.
2. How Services are arranged and presented.
3. Adding a future placeholder for Skills, but DO NOT implement the Skills section yet.

The goal is to improve information architecture without changing the established visual direction.

---

# 1. TESTIMONIALS

## Current problem

Testimonials should NOT appear as a vertical column/list of multiple testimonials.

Instead, show **ONE testimonial at a time**.

Think of it as an editorial testimonial viewer.

### Structure

The section should display:

* One testimonial
* Person's name
* Role/title
* Optional organization/project
* Testimonial text
* Existing visual styling
* Navigation control to move to the next testimonial

Example conceptual structure:

```text
                    TESTIMONIALS


        "Testimonial content goes here..."

                         — Person Name
                           Role / Organization


                 [ NEXT TESTIMONIAL → ]

                         01 / 04
```

This is only an information-architecture example.

**Preserve the existing visual design when implementing it.**

---

## Testimonial behavior

Only ONE testimonial should be visually active at a time.

When the user presses:

**NEXT**

the current testimonial should transition out and the next testimonial should transition in.

Use the existing animation language.

The transition can use:

* opacity
* vertical movement
* horizontal movement
* clipping/masking
* subtle scale

But it must remain consistent with the portfolio's existing cinematic motion.

Do NOT introduce a new animation library.

Use the existing GSAP system where appropriate.

### Navigation

Provide a clear next control.

For example:

```text
NEXT →
```

or an equivalent control matching the current design.

Also provide a small progress indicator:

```text
01 / 04
```

This tells the user which testimonial they are viewing.

### IMPORTANT

Do NOT display testimonials like:

```text
Testimonial 1
Testimonial 2
Testimonial 3
Testimonial 4
```

stacked vertically.

Do NOT create a card grid.

Do NOT create a three-column testimonial layout.

Do NOT make the page longer simply because there are more testimonials.

The user should interact with the testimonial viewer while remaining in the same section.

---

# 2. SERVICES

## Current problem

The Services section should feel like a **complete full-screen composition**.

It should occupy the viewport rather than behaving like a normal list that pushes the page downward.

The section should work within:

```text
100vh
```

or the appropriate viewport-aware equivalent.

The first set of services should fit naturally within the screen.

---

## Services arrangement

Do NOT arrange all services into a long vertical column.

Do NOT make the user scroll through a huge list of services.

Instead, organize the primary services into a compact composition that fits inside the existing full-screen design.

For example, conceptually:

```text
                  SERVICES

        SOFTWARE DEVELOPMENT

        DIGITAL MEDIA

        CREATIVE TECHNOLOGY

        WEB EXPERIENCES


                         VIEW MORE →
```

This is only structural guidance.

Use the existing visual design and typography.

---

# 3. VIEW MORE SERVICES

If there are additional services that do not fit into the initial full-screen composition, provide:

**VIEW MORE**

The important behavior:

### Clicking "VIEW MORE" must NOT

* Navigate to another page
* Scroll the user down to another section
* Create a new Services page
* Make the entire website longer
* Introduce horizontal page scrolling
* Change the site's navigation
* Break the full-screen composition

Instead, reveal the additional services **inside the existing Services experience**.

Possible implementation approaches:

### Preferred approach

Use an in-section expansion/overlay.

For example:

```text
┌─────────────────────────────────────┐
│                                     │
│             SERVICES                │
│                                     │
│      SERVICE 01                     │
│      SERVICE 02                     │
│      SERVICE 03                     │
│                                     │
│          VIEW MORE →                │
│                                     │
└─────────────────────────────────────┘

              ↓ click

┌─────────────────────────────────────┐
│                                     │
│          ALL SERVICES               │
│                                     │
│      SERVICE 01                     │
│      SERVICE 02                     │
│      SERVICE 03                     │
│      SERVICE 04                     │
│      SERVICE 05                     │
│      SERVICE 06                     │
│                                     │
│          CLOSE / ←                  │
│                                     │
└─────────────────────────────────────┘
```

The expanded content must remain within the same viewport experience.

Use an elegant GSAP transition consistent with the existing site.

---

# 4. SERVICES MUST STILL FEEL LIKE PART OF THE PORTFOLIO

Do not turn Services into a conventional SaaS pricing/service grid.

Avoid:

* Generic cards
* Rounded rectangular service boxes
* Icon-heavy cards
* Dashboard-style layouts
* Three-column SaaS layouts
* Excessive shadows
* New gradients
* New visual systems

The Services section should still feel like part of the existing **creative technology / digital art portfolio**.

---

# 5. RELATIONSHIP BETWEEN ABOUT AND SERVICES

Keep the previously established transition:

**ABOUT → SERVICES**

Services should still feel like it enters and visually takes over from About.

The transition should preserve the existing layer/stack concept.

Think of it as:

```text
ABOUT
───────────────
        ↓
SERVICES moves into the foreground
───────────────
```

The Services section becomes the dominant viewport composition.

Do not permanently pin unnecessary sections.

Do not introduce complicated scroll hijacking.

---

# 6. FUTURE SKILLS SECTION

We WILL add a Skills section later.

For this task:

**DO NOT IMPLEMENT THE SKILLS SECTION.**

Do not invent:

* Skill cards
* Skill percentages
* Progress bars
* Technology logos
* Skill animations
* Skill grids

Simply make sure the current architecture will allow a Skills section to be added later without rewriting the existing system.

---

# 7. CONTENT MODEL

Structure Testimonials and Services as data rather than hardcoding separate HTML structures for every item.

For example, conceptually:

Testimonials:

```js
const testimonials = [
    {
        quote: "...",
        name: "...",
        role: "...",
        organization: "..."
    },
    {
        quote: "...",
        name: "...",
        role: "...",
        organization: "..."
    }
];
```

Services:

```js
const services = [
    {
        title: "...",
        description: "..."
    },
    {
        title: "...",
        description: "..."
    }
];
```

This makes the content easy to update later.

Use the existing project architecture.

Do not add a new dependency just to implement this.

---

# 8. RESPONSIVE BEHAVIOR

The new arrangements must work on:

* Desktop
* Tablet
* Mobile

On smaller screens, preserve the same design language while adapting the composition.

Do not simply shrink the desktop layout until it breaks.

For Testimonials:

**one testimonial remains active at a time.**

For Services:

**the primary Services composition remains contained within the viewport as much as reasonably possible.**

The "View More" interaction must remain inside the Services experience.

---

# 9. IMPLEMENTATION CONSTRAINTS

Before changing anything:

1. Inspect the current Services section.
2. Inspect the current Testimonials section.
3. Inspect existing GSAP animations.
4. Inspect existing CSS/layout system.
5. Understand the current section transition architecture.

Then implement the smallest possible structural change.

### DO NOT

* Install new libraries.
* Replace GSAP.
* Add a carousel library.
* Add a slider library.
* Add a smooth-scroll library.
* Redesign the page.
* Change the color palette.
* Change typography.
* Change the Hero.
* Change the Gallery.
* Change the Projects section.
* Implement Skills yet.

### Goal

The result should look like the **same portfolio**, but with a much better information architecture:

**Testimonials**
→ one testimonial at a time + next interaction.

**Services**
→ full-screen composition + View More interaction inside the same viewport.

**Skills**
→ reserved for a later implementation.

After implementation, report exactly:

* What was changed
* What was preserved
* How Testimonials work
* How View More Services works
* Whether any dependencies were added
* Any responsive issues discovered
