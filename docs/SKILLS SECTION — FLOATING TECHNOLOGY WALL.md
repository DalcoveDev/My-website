# SKILLS SECTION — FLOATING TECHNOLOGY WALL

Add a new **Skills** section to the existing portfolio.

The Skills section must NOT look like a traditional developer skills section.

Do NOT create:

* Progress bars
* Percentage charts
* Star ratings
* Normal skill cards
* A static 3-column grid
* A list with logos next to text
* A conventional "My Skills" section

Instead, create a **large cinematic technology wall** where programming languages, frameworks, libraries, tools, and other technologies continuously float vertically through three columns.

The section should feel like an artistic installation made from technology logos.

---

# 1. CORE VISUAL CONCEPT

Imagine a large vertical wall containing floating 3D technology logos.

There are three independent columns:

```text
        COLUMN 01       COLUMN 02       COLUMN 03


           ▲                ▼                ▲

        [ Python ]      [ React ]        [ Node ]

        [ Java ]        [ GSAP ]         [ MySQL ]

        [ C++ ]         [ Next ]         [ Git ]

        [ ... ]         [ ... ]          [ ... ]


           ▲                ▼                ▲
```

The columns continuously move vertically.

### Movement direction

**Column 1**
→ moves upward

**Column 2**
→ moves downward

**Column 3**
→ moves upward

The movement should be continuous and seamless.

Do not make the columns move at the same speed.

Use slightly different speeds to create depth and visual variation.

---

# 2. CONTINUOUS LOOP

The technology items should continuously loop.

There should NOT be an obvious moment where the animation reaches the end and suddenly jumps back to the beginning.

Create a seamless infinite-loop effect.

The user should feel as if the technology wall is continuously moving.

Use GSAP if appropriate.

Do NOT install another animation library.

---

# 3. TECHNOLOGY GROUPS

Organize the technologies into meaningful categories.

For example:

### COLUMN 01 — PROGRAMMING LANGUAGES

* JavaScript
* Python
* C++
* HTML
* CSS

### COLUMN 02 — FRAMEWORKS / LIBRARIES

* React
* Next.js
* GSAP
* Express
* Tailwind CSS

### COLUMN 03 — TOOLS / DATABASES / TECHNOLOGIES

* Git
* GitHub
* MySQL
* PostgreSQL
* MongoDB
* PocketBase
* Node.js

These are examples only.

Use the technologies that are actually present in the existing project/content.

**Do not claim that I have experience with a technology unless it is explicitly provided in the portfolio data.**

---

# 4. LOGOS

Each technology should be represented primarily by its visual logo.

The logos will be supplied as local assets.

Use high-quality 3D or visually distinctive logo artwork where appropriate.

The user may download the logo assets separately and place them in the project.

Recommended structure:

```text
/assets/
    /skills/
        javascript.webp
        python.webp
        react.webp
        node.webp
        gsap.webp
        mysql.webp
        ...
```

Do not hotlink external logo URLs.

The portfolio should load the local assets.

Use appropriate image formats and optimize large assets where possible.

---

# 5. LOGO PRESENTATION

Do not simply display flat tiny icons.

Give the logos enough visual presence to become part of the artwork.

Possible treatment:

* Large logo
* Subtle depth
* 3D logo asset
* Slight rotation
* Subtle scale variation
* Fine border or framing where consistent with the existing design
* Small technical label
* Subtle shadow/depth if it fits the current visual system

However:

**DO NOT change the existing portfolio's visual identity.**

The Skills section must look like it belongs to the existing website.

Do not introduce a completely different design language.

---

# 6. COLUMN MOVEMENT

The three columns must move independently.

Example:

```text
COLUMN 1      COLUMN 2      COLUMN 3

   ↑             ↓             ↑

 Python        React          Git

 JavaScript    GSAP           MySQL

 C++           Next           Node

   ↑             ↓             ↑
```

Use different speeds.

For example:

```text
Column 1 = medium speed upward
Column 2 = slower speed downward
Column 3 = slightly faster speed upward
```

Do not use identical speeds.

This should create a layered kinetic composition.

---

# 7. HOVER INTERACTION

This is an important part of the experience.

When the user moves the mouse over a technology/logo:

### 1. Pause the column

The column containing the hovered technology should stop moving.

Do not stop all three columns.

Only stop the relevant column.

For example:

```text
COLUMN 1        COLUMN 2        COLUMN 3

   ↑               STOP            ↑

 Python          React           Git
 Java            GSAP            MySQL
 C++             Next            Node
```

The other columns continue moving.

---

# 8. HOVER INFORMATION PANEL

When the user hovers over an individual technology, reveal a small information panel.

The panel should appear close to the selected technology.

It should contain:

### Technology name

Example:

**React**

### Experience

Example:

**2+ years**

### Used for

Example:

**Interactive web applications**

### Optional additional information

Example:

**Frontend / UI / Component Architecture**

Conceptually:

```text
┌──────────────────────────────┐
│ REACT                        │
│                              │
│ EXPERIENCE                   │
│ 2+ YEARS                     │
│                              │
│ USED FOR                     │
│ Interactive web applications │
│                              │
│ FRONTEND / UI                │
└──────────────────────────────┘
```

This is an example only.

Use the actual experience information supplied in the portfolio content.

---

# 9. DO NOT INVENT EXPERIENCE

This is critical.

Do NOT automatically write:

"5 years experience"

or

"Expert"

or

"Advanced"

unless the portfolio data explicitly says so.

If experience duration has not yet been provided, create a clean data structure with placeholder values that can easily be updated.

For example:

```js
{
    name: "React",
    logo: "/assets/skills/react.webp",
    category: "Framework / Library",
    experience: "ADD EXPERIENCE",
    usedFor: "Frontend development"
}
```

The content should be centralized in a skills data array so it can easily be edited later.

---

# 10. HOVER ANIMATION

The information panel should not simply appear instantly.

Use a subtle cinematic transition:

1. Logo slightly scales
2. Column pauses
3. Information panel enters
4. Text reveals/staggers subtly

When the mouse leaves:

1. Information panel disappears
2. Logo returns to normal state
3. Column resumes movement

Keep the animation restrained.

No bouncing.

No excessive rotation.

No exaggerated 3D effects.

---

# 11. MOUSE INTERACTION

The hover interaction should feel physical.

The selected logo can have a subtle:

* Scale increase
* Translation
* Rotation
* Depth movement

But keep it consistent with the existing custom cursor.

Do not allow the Skills section to fight with the existing cursor system.

If the portfolio already has a custom cursor, integrate with it rather than creating a second cursor.

---

# 12. SECTION INTRODUCTION

At the beginning of the Skills section, introduce the section with the existing typography system.

For example:

```text
SKILLS

TECHNOLOGIES I USE
TO BUILD DIGITAL EXPERIENCES
```

But do not make this a large conventional heading followed by a grid.

The technology wall should remain the main visual focus.

The heading can occupy a small part of the composition while the moving columns dominate the viewport.

---

# 13. FULL-SCREEN EXPERIENCE

Skills should feel like a major visual section.

Prefer:

```text
min-height: 100vh;
```

or an equivalent viewport-aware layout.

The three moving columns should occupy the majority of the available visual area.

The section should feel like the user has entered a **moving technology archive**.

---

# 14. SCROLL BEHAVIOR

Do not create a separate horizontal scroll system.

The website should continue using normal vertical page scrolling.

The three columns move vertically inside the Skills section.

The user scrolls normally through the website.

The Skills animation should not hijack the user's scroll.

Do NOT introduce:

* Horizontal page scrolling
* Scroll-jacking
* A new smooth-scroll library
* A carousel library
* A slider library

---

# 15. RESPONSIVE DESIGN

Desktop:

Use three columns.

Tablet:

Maintain three columns if space allows, but reduce spacing and logo size.

Mobile:

Adapt intelligently.

Possible mobile behavior:

```text
COLUMN 01
   ↑

COLUMN 02
   ↓

COLUMN 03
   ↑
```

or reduce to two columns if three become too cramped.

Do not allow the technology wall to create unwanted horizontal page overflow.

Hover interactions should also have a touch-friendly fallback.

On touch devices where hover does not exist:

* Tap a technology to reveal its information.
* Tap another technology to change the active item.
* Tapping outside closes the information panel.

---

# 16. VISUAL IDENTITY

The Skills section must inherit the existing portfolio design.

Preserve:

* Existing colors
* Existing typography
* Existing 60/30/10 system
* Existing background
* Existing borders
* Existing cursor
* Existing motion language
* Existing spacing principles

Do not create a new color palette specifically for Skills.

Do not turn Skills into a colorful technology-logo showcase.

The logos themselves may have their natural colors, but their presentation should remain visually controlled.

---

# 17. DATA STRUCTURE

Create a centralized skills data structure.

Example:

```js
const skills = {
    languages: [
        {
            name: "JavaScript",
            logo: "/assets/skills/javascript.webp",
            experience: "...",
            usedFor: "..."
        }
    ],

    frameworks: [
        {
            name: "React",
            logo: "/assets/skills/react.webp",
            experience: "...",
            usedFor: "..."
        }
    ],

    tools: [
        {
            name: "Git",
            logo: "/assets/skills/git.webp",
            experience: "...",
            usedFor: "..."
        }
    ]
};
```

The actual structure can be adapted to the current architecture.

The important requirement is:

**Content must be separated from presentation.**

---

# 18. PERFORMANCE

There may be many logo assets.

Optimize the implementation.

Use:

* Appropriate image dimensions
* WebP/AVIF where practical
* Lazy loading where appropriate
* GPU-friendly transforms
* `transform` rather than expensive layout-changing properties
* Efficient GSAP animation

Do not animate `top`, `left`, `width`, or other layout properties continuously if `transform` can accomplish the same effect.

Avoid excessive DOM duplication.

---

# 19. ACCESSIBILITY

Each logo must have an appropriate accessible label.

Example:

```html
<img
    src="/assets/skills/react.webp"
    alt="React"
/>
```

The information panel must also be accessible.

Do not make important skill information available only through visual hover.

Provide an appropriate keyboard/touch interaction where practical.

---

# 20. IMPLEMENTATION CONSTRAINTS

Before implementation:

1. Inspect the existing portfolio architecture.
2. Inspect the current CSS.
3. Inspect the current GSAP system.
4. Inspect the existing custom cursor.
5. Inspect existing responsive behavior.
6. Identify where the new Skills section belongs.

Then implement Skills using the smallest appropriate change.

### DO NOT

* Install another animation library.
* Install a carousel library.
* Install a slider library.
* Install a 3D library just for the logos.
* Replace GSAP.
* Replace the existing CSS system.
* Redesign existing sections.
* Change the Hero.
* Change Gallery.
* Change Projects.
* Change Testimonials.
* Change Services.

---

# FINAL EXPERIENCE

The finished Skills section should feel like:

**a kinetic archive of the technologies behind the work.**

The visitor sees technology moving continuously through the screen.

Three independent columns create rhythm.

Hovering a technology:

**stops its column → highlights the technology → reveals the experience information.**

Leaving:

**the information disappears → the column continues moving.**

The result should feel like a **creative technology installation**, not a conventional developer skills grid.
