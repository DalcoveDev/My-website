# RESOURCE HUB — CONTENT PLACEMENT & INFORMATION ARCHITECTURE

Update the Resource Hub using the content structure below.

## CRITICAL RULE

**DO NOT redesign the current website.**

The existing visual design is already established and must remain unchanged.

Preserve:

- Current colors
- Typography
- Font sizes and hierarchy
- 60/30/10 color system
- Background
- Borders
- Cursor
- Hover language
- GSAP animation style
- Section transitions
- Spacing language
- Existing navigation
- Existing responsive behavior

We are ONLY changing:

**content placement, ordering, grouping, and interaction behavior.**

Do not introduce a new visual design system.

---

# RESOURCE HUB STRUCTURE

The Resource Hub should contain exactly these four content areas in this order:

```text
RESOURCE HUB
        ↓
TOOLS
        ↓
DID YOU KNOW?
        ↓
REPOSITORIES
        ↓
RESOURCES
```

Each section should have its own visual composition while still inheriting the existing portfolio design.

---

# 01 — TOOLS

The Tools section should show the first four tools initially.

### FEATURED TOOLS

```text
01

VS CODE

A lightweight but powerful source code editor.

Development

OPEN TOOL →
```

```text
02

FIGMA

A collaborative interface design tool.

Design

OPEN TOOL →
```

```text
03

GITHUB

A platform for version control and collaboration.

Development

OPEN TOOL →
```

```text
04

VITE

A fast build tool for modern web projects.

Development

OPEN TOOL →
```

These four are the **initial visible tools**.

Do NOT display all eight immediately.

---

## VIEW MORE

Place:

**VIEW MORE →**

as the control for revealing the remaining tools.

When clicked, reveal:

```text
05

GSAP

GreenSock Animation Platform for web animations.

Development

OPEN TOOL →
```

```text
06

BLENDER

A free and open-source 3D creation suite.

Design

OPEN TOOL →
```

```text
07

NOTION

A connected workspace for notes, tasks, and wikis.

Productivity

OPEN TOOL →
```

```text
08

TERMINAL

Command-line interface for system operations.

Development
```

### IMPORTANT

Do NOT duplicate tools.

The first four are already part of the complete tools dataset.

"VIEW MORE" should reveal items 05–08.

When expanded, the control should become:

**← CLOSE**

Clicking CLOSE returns to the first four.

Do not navigate to another page.

Do not create a second Tools section.

Do not make the user scroll to another part of the website to see the remaining tools.

---

# 02 — DID YOU KNOW?

This should be a **single-content editorial experience**.

Never display all five discoveries at the same time.

Only ONE discovery is visible.

Initial content:

```text
DID YOU KNOW?

#001

The first computer bug was an actual bug —
a moth found trapped in a Harvard Mark II
computer in 1947.

DALCOVE / 2026

← PREVIOUS     01 / 05     NEXT →
```

The exact visual styling must use the existing portfolio design.

---

## NEXT / PREVIOUS BEHAVIOR

When the user clicks:

**NEXT →**

replace the current discovery with the next discovery.

When the user clicks:

**← PREVIOUS**

return to the previous discovery.

Use a subtle existing GSAP transition.

Do NOT create a conventional carousel card.

Do NOT display five cards in a row.

Do NOT create a vertical list of discoveries.

The experience should feel like an editorial archive.

The counter should update:

```text
01 / 05
02 / 05
03 / 05
04 / 05
05 / 05
```

---

# 03 — REPOSITORIES

Repositories should be presented as an **editorial project archive**, not as a card grid.

Use this content:

### 01 — Portfolio Website

```text
01

PORTFOLIO WEBSITE

A cinematic digital portfolio showcasing
creative technology and web development work.

HTML / CSS / JAVASCRIPT / GSAP

GITHUB →
```

### 02 — Interactive Data Platform

```text
02

INTERACTIVE DATA PLATFORM

A real-time data visualization platform
with scroll-driven narratives.

REACT / D3.JS / NODE.JS

GITHUB →
```

### 03 — Digital Art Exhibition

```text
03

DIGITAL ART EXHIBITION

A curated online exhibition platform
for digital artworks.

HTML / CSS / GSAP / CANVAS

GITHUB →
```

---

## REPOSITORY LAYOUT

Do NOT create:

- Three equal cards
- Three-column card grid
- Dashboard layout
- SaaS project cards

Instead, arrange the repositories vertically as distinct editorial entries.

Example:

```text
01 ─────────────────────────

PORTFOLIO WEBSITE

Description

TECHNOLOGIES

GITHUB →


02 ─────────────────────────

INTERACTIVE DATA PLATFORM

Description

TECHNOLOGIES

GITHUB →


03 ─────────────────────────

DIGITAL ART EXHIBITION

Description

TECHNOLOGIES

GITHUB →
```

Use the existing typography, spacing, lines, and animation system.

---

# 04 — RESOURCES

The Resources section should be the final knowledge-library area.

At the top, provide category filters:

```text
ALL
DEVELOPMENT
DESIGN
MEDIA
LEARNING
OPEN SOURCE
```

Filtering must happen within the same section.

Do not navigate to different pages.

---

## RESOURCE CONTENT

Use the following content:

### MDN Web Docs

**Category:** Documentation

Comprehensive documentation for web technologies including HTML, CSS, and JavaScript.

**OPEN RESOURCE →**

---

### GSAP Documentation

**Category:** Development

Official documentation for GreenSock Animation Platform.

**OPEN RESOURCE →**

---

### Awwwards

**Category:** Design

A platform showcasing the best in web design and development.

**OPEN RESOURCE →**

---

### CSS-Tricks

**Category:** Development

Articles, tutorials, and techniques for web developers.

**OPEN RESOURCE →**

---

### Coursera

**Category:** Learning

Online courses from top universities and companies.

**OPEN RESOURCE →**

---

### GitHub Explore

**Category:** Open Source

Discover open source projects and repositories.

**OPEN RESOURCE →**

---

### Behance

**Category:** Design

A platform for creative professionals to showcase their work.

**OPEN RESOURCE →**

---

### freeCodeCamp

**Category:** Learning

Free coding courses and certifications.

**OPEN RESOURCE →**

---

# RESOURCE ARRANGEMENT

Do NOT create a giant 4-column or 3-column card grid.

Use a clean editorial list.

For example:

```text
MDN WEB DOCS
Documentation
Description
OPEN RESOURCE →


GSAP DOCUMENTATION
Development
Description
OPEN RESOURCE →


AWWWARDS
Design
Description
OPEN RESOURCE →
```

Continue the same structure for the remaining resources.

The existing visual language should determine exact spacing and typography.

---

# CONTENT HIERARCHY

The final Resource Hub should read in this order:

```text
RESOURCE HUB

    TOOLS
    ├── VS CODE
    ├── FIGMA
    ├── GITHUB
    ├── VITE
    └── VIEW MORE
            ├── GSAP
            ├── BLENDER
            ├── NOTION
            └── TERMINAL


    DID YOU KNOW?
    └── ONE DISCOVERY AT A TIME


    REPOSITORIES
    ├── PORTFOLIO WEBSITE
    ├── INTERACTIVE DATA PLATFORM
    └── DIGITAL ART EXHIBITION


    RESOURCES
    ├── ALL
    ├── DEVELOPMENT
    ├── DESIGN
    ├── MEDIA
    ├── LEARNING
    └── OPEN SOURCE
```

---

# CONTENT DATA

Keep all Resource Hub content in structured data.

Separate:

```text
tools
didYouKnow
repositories
resources
```

from the presentation layer.

Do not hardcode duplicate content into multiple UI states.

For example:

```js
const tools = [
    {
        name: "VS Code",
        description: "A lightweight but powerful source code editor.",
        category: "Development",
        url: "https://code.visualstudio.com/"
    },
    ...
];
```

The UI should derive:

**Featured Tools = first 4**

and:

**Additional Tools = remaining items**

rather than maintaining duplicate arrays.

---

# LINKS

Use the provided official links exactly.

Tools:

- VS Code — https://code.visualstudio.com/
- Figma — https://www.figma.com/
- GitHub — https://github.com/
- Vite — https://vitejs.dev/
- GSAP — https://greensock.com/gsap
- Blender — https://www.blender.org/
- Notion — https://www.notion.so/

Resources:

- MDN — https://developer.mozilla.org/
- GSAP Documentation — https://greensock.com/docs
- Awwwards — https://www.awwwards.com/
- CSS-Tricks — https://css-tricks.com/
- Coursera — https://www.coursera.org/
- GitHub Explore — https://github.com/explore
- Behance — https://www.behance.net/
- freeCodeCamp — https://www.freecodecamp.org/

Do not invent alternative links.

---

# ANIMATION

Use the existing GSAP animation architecture.

Do not add another animation library.

Tools:

**VIEW MORE →**

should reveal additional tools with a controlled transition.

Did You Know:

**NEXT / PREVIOUS**

should transition between discoveries.

Repositories:

Entries can use the existing layer-by-layer reveal behavior.

Resources:

Filtering can use a subtle existing transition.

Do not make every item perform a large animation.

---

# IMPORTANT: PRESERVE THE CURRENT DESIGN

After implementation, the Resource Hub should look like it was always part of the existing portfolio.

The goal is:

**same design + better content organization**

NOT:

**new design + new components everywhere.**

Do not modify the Hero.

Do not modify Gallery.

Do not modify Projects.

Do not modify Services.

Do not modify Testimonials.

Do not modify Skills.

Only implement the Resource Hub content placement and interactions described above.

---

# FINAL QA

Before finishing, verify:

- [ ] Only four tools are initially visible.
- [ ] VIEW MORE reveals tools 05–08.
- [ ] CLOSE returns to the initial four.
- [ ] No duplicate tool content exists.
- [ ] Only one Did You Know item is visible at a time.
- [ ] NEXT works.
- [ ] PREVIOUS works.
- [ ] Counter updates correctly.
- [ ] Three repositories appear as editorial entries, not cards.
- [ ] Resources have category filters.
- [ ] Filtering happens in-place.
- [ ] External links work.
- [ ] No new dependencies were added.
- [ ] Existing design has not been changed.
- [ ] No unwanted horizontal overflow exists.
- [ ] Mobile layout remains usable.