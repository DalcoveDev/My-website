# RESOURCE HUB — DALCOVE

Add a new **Resource Hub** to the portfolio.

The purpose of this area is to allow Dalcove to share useful things discovered while learning and building:

- Development tools
- Software and web tools
- Useful websites
- Documentation
- Learning resources
- GitHub repositories
- Open-source projects
- "Did You Know?" discoveries
- Development tips
- Creative technology references

This should feel like a **curated knowledge archive**, not a generic blog.

---

# CRITICAL DESIGN RULE

Preserve the existing portfolio design system.

Do NOT redesign the existing website.

Preserve:

- Color palette
- Typography
- 60/30/10 system
- Cursor
- Motion language
- Borders
- Spacing
- Navigation
- Existing section transitions
- Existing visual identity

The Resource Hub should feel like it belongs to the same portfolio.

---

# RESOURCE HUB CONCEPT

Think:

**DIGITAL ARCHIVE × DEVELOPER NOTEBOOK × CREATIVE TECHNOLOGY LIBRARY**

The page should communicate:

> "These are the tools, discoveries, projects and resources I find worth sharing."

It should feel curated.

Avoid making it look like a generic blog CMS.

---

# 1. RESOURCE HUB INTRO

Start with a strong editorial introduction.

Possible structure:

RESOURCE HUB

TOOLS / DISCOVERIES / REPOSITORIES / RESOURCES

Then a short description:

"A collection of tools I use, things I discover, projects I build, and resources worth sharing."

Keep this concise.

Do not create a large paragraph.

---

# 2. CONTENT CATEGORIES

Create four primary categories:

### TOOLS

Useful development, design, media and productivity tools.

### DID YOU KNOW?

Short discoveries, technical facts, useful tips and interesting technology information.

### REPOSITORIES

Dalcove's GitHub repositories and open-source work.

### RESOURCES

Useful documentation, tutorials, learning materials, references and websites.

---

# 3. TOOLS

Tools should NOT be displayed as a huge conventional card grid.

Use an editorial list/archive arrangement.

Example:

```text
01  TOOL NAME
    Short description
    DEVELOPMENT / DESIGN

    OPEN TOOL →
```

Each tool should contain:

- Name
- Category
- Short description
- Why it is useful
- External link
- Optional logo/image

Example data:

```js
{
    name: "Tool Name",
    category: "Development",
    description: "Short explanation.",
    whyUseful: "Why I recommend it.",
    url: "...",
    image: "/assets/resources/tools/tool.webp"
}
```

Keep the data separate from the UI.

---

# 4. VIEW MORE TOOLS

If there are many tools:

Show a curated selection first.

Then provide:

**VIEW MORE →**

The additional tools should be revealed within the Resource Hub experience.

Do NOT make the user scroll through an extremely long list just to discover more tools.

Do not create a separate page unless the existing architecture strongly requires it.

Use the existing animation system.

---

# 5. DID YOU KNOW?

Create a dedicated "Did You Know?" content experience.

Only ONE discovery should be visually active at a time.

Example:

```text
DID YOU KNOW?

#014

[DISCOVERY]

A short piece of useful
technology information.

DALCOVE / 2026


← PREVIOUS          NEXT →
```

Navigation:

**← PREVIOUS**

**NEXT →**

Include a small counter:

**014 / 025**

---

# 6. DID YOU KNOW CONTENT

The system should support short posts such as:

- Programming discoveries
- Web development facts
- Interesting developer tools
- Digital media facts
- Creative technology discoveries
- Open-source discoveries
- Bitcoin/developer ecosystem discoveries
- Useful development techniques
- Interesting technology history

Do not invent facts.

Content should be editable through a centralized data structure.

Example:

```js
{
    id: 14,
    title: "Did You Know?",
    content: "Short discovery...",
    category: "Development",
    date: "2026-09-08"
}
```

---

# 7. REPOSITORIES

Create a dedicated repository archive.

This should showcase projects rather than simply displaying GitHub links.

Each repository can contain:

- Project name
- Short description
- Technologies
- Current status
- GitHub link
- Live demo if available
- Optional project image

Example:

```text
01

PROJECT NAME

Short project description.

REACT / NODE / MYSQL

GITHUB →
LIVE DEMO →
```

Do not invent repository information.

Only display projects that actually exist in the provided portfolio data.

---

# 8. RESOURCE LIBRARY

Create a section for external resources.

Possible categories:

- DOCUMENTATION
- DEVELOPMENT
- DESIGN
- DIGITAL MEDIA
- CREATIVE TECHNOLOGY
- LEARNING
- OPEN SOURCE

Each resource should contain:

- Name
- Category
- Short explanation
- External link

Example:

```text
RESOURCE NAME
Development / Documentation

Why this resource is useful.

OPEN RESOURCE →
```

---

# 9. FILTERING

If the number of resources becomes large, provide lightweight category filtering.

For example:

```text
ALL
TOOLS
DEVELOPMENT
DESIGN
MEDIA
OPEN SOURCE
LEARNING
```

The filtering should happen in-place.

Do not navigate to a new page for every category.

Use the existing JavaScript architecture.

---

# 10. VISUAL BEHAVIOR

Use the existing cinematic animation language.

When resource items enter the viewport:

- Reveal typography
- Reveal metadata
- Reveal image/logo
- Reveal links

Use the existing layer/reveal philosophy where appropriate.

Do not make every item independently bounce or animate excessively.

The animation should feel editorial and controlled.

---

# 11. RESOURCE ITEM HOVER

On desktop, hovering an item can produce a subtle interaction:

- Typography shifts slightly
- Image/logo responds
- Metadata becomes more prominent
- Cursor interaction responds if the existing cursor supports it

Do not create a completely new cursor system.

---

# 12. MOBILE

The Resource Hub must work properly on mobile.

Do not force desktop multi-column layouts onto small screens.

Preserve the editorial hierarchy.

Interactive controls such as:

NEXT →

VIEW MORE →

OPEN RESOURCE →

must remain easy to use with touch.

---

# 13. DATA ARCHITECTURE

Keep content separate from presentation.

Create structured data for:

```js
tools
didYouKnow
repositories
resources
```

This will allow new content to be added without rebuilding the components.

For example:

```js
const resources = {
    tools: [],
    didYouKnow: [],
    repositories: [],
    library: []
};
```

Adapt this to the existing architecture rather than creating unnecessary files.

---

# 14. EXTERNAL LINKS

External resources should open safely and clearly.

Do not invent URLs.

Only use URLs provided by Dalcove or verified sources.

---

# 15. PERFORMANCE

Resource pages may contain many images/logos.

Use:

- Optimized local images
- WebP/AVIF where appropriate
- Lazy loading
- Efficient GSAP transforms
- Minimal DOM complexity

Do not add another library simply to display resources.

---

# 16. NO UNNECESSARY DEPENDENCIES

Do not install:

- Blog CMS
- Carousel library
- Slider library
- Animation library
- UI component library
- New routing system
- Database

unless the existing architecture genuinely requires one and there is a documented reason.

Use the existing HTML/CSS/JavaScript/GSAP architecture.

---

# 17. INFORMATION ARCHITECTURE

The Resource Hub should ultimately feel like:

```text
RESOURCE HUB
│
├── TOOLS
│   └── Useful tools I discover/use
│
├── DID YOU KNOW?
│   └── Short discoveries
│
├── REPOSITORIES
│   └── Projects / GitHub
│
└── RESOURCES
    └── Documentation / Learning / References
```

This is an archive of Dalcove's knowledge and work.

---

# FINAL EXPERIENCE

The user should leave the Resource Hub feeling:

"I discovered something useful."

Not:

"I read a blog post."

The Resource Hub is part of Dalcove's identity as a:

**DEVELOPER × DIGITAL MEDIA CREATOR × CREATIVE TECHNOLOGIST**

It should demonstrate not only what Dalcove builds, but also what he learns, discovers, uses and shares.

Implement this without changing the established portfolio visual identity.
