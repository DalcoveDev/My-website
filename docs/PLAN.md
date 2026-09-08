# ADMIN PANEL — COMPLETE IMPLEMENTATION PLAN

## 1. ARCHITECTURE

```
admin.html → admin.js → Vercel API (/api/*.js) → Neon Postgres
main site  → content-loader.js → same API → reads content + renders
```

- Static Vite site with Vercel Serverless backend
- Neon Postgres stores all content as JSONB
- Images stay in local `images/` folder, DB stores file references
- Admin panel is a separate `admin.html` page with dark dashboard + sidebar

---

## 2. DATABASE SCHEMA (Neon Postgres)

### Table: settings
| Column | Type | Purpose |
|--------|------|---------|
| id | SERIAL PRIMARY KEY | Row ID |
| key | TEXT UNIQUE NOT NULL | Setting name (e.g. 'hero', 'about', 'contact') |
| value | JSONB NOT NULL | Setting content as JSON |
| updated_at | TIMESTAMPTZ | Last modified |

**Setting keys:**
- `site` → { title, description, copyright, logoText }
- `hero` → { title, subtitle, scrollText, eyebrow }
- `about` → { label, title[], paragraphs[], image }
- `contact` → { label, title[], email, availability, socialLinks[] }
- `resourcesHero` → { eyebrow, title, description, stats[] }
- `preloader` → { name, subtitle }

### Table: items
| Column | Type | Purpose |
|--------|------|---------|
| id | SERIAL PRIMARY KEY | Row ID |
| section | TEXT NOT NULL | Section name |
| sort_order | INTEGER | Display order |
| data | JSONB NOT NULL | Item content as JSON |
| updated_at | TIMESTAMPTZ | Last modified |

**Section names and item fields:**
- `services` → { title, desc }
- `testimonials` → { quote, name, role }
- `skills` → { name, logo, experience, usedFor, extra, category }
- `tools` → { name, category, description, whyUseful, url }
- `didYouKnow` → { id, content, category, date }
- `repositories` → { name, description, tags[], status, github, demo }
- `library` → { name, category, description, url }
- `projects` → { num, year, category, title, desc, tags[], image, theme }
- `gallery` → { image, alt, label, sublabel, layout }
- `visualField` → { image, offset, y, alt }

### Table: images
| Column | Type | Purpose |
|--------|------|---------|
| id | SERIAL PRIMARY KEY | Row ID |
| filename | TEXT NOT NULL | File name in images/ folder |
| alt | TEXT | Alt text |
| section | TEXT | Which section uses this |
| sort_order | INTEGER | Display order |
| updated_at | TIMESTAMPTZ | Last modified |

---

## 3. FILES TO CREATE

### Backend (Vercel Serverless)
| File | Purpose |
|------|---------|
| api/db.js | Neon connection helper using @neondatabase/serverless |
| api/content.js | GET returns all content, POST saves changes (auth required) |
| api/auth.js | POST login with password, returns session token |
| api/upload.js | POST handles image file uploads to public/images/ |

### Admin Panel
| File | Purpose |
|------|---------|
| admin.html | Admin dashboard page with sidebar + content area |
| css/admin.css | Dark dashboard theme, sidebar, forms, image browser |
| js/admin.js | Login, sidebar nav, form rendering, CRUD, image management |

### Main Site Integration
| File | Purpose |
|------|---------|
| js/content-loader.js | Fetches content from API, falls back to hardcoded data |

### Config
| File | Purpose |
|------|---------|
| vercel.json | Route config for API + static files |
| .env.example | Template for DATABASE_URL, ADMIN_PASSWORD |
| seed.sql | SQL to insert current hardcoded content into DB |

### Dependencies
| Package | Purpose |
|---------|---------|
| @neondatabase/serverless | Neon Postgres serverless driver |

---

## 4. ADMIN PANEL LAYOUT

```
┌──────────────────────────────────────────────────────────┐
│  DALCOVE ADMIN                          [Logout]         │
├──────────┬───────────────────────────────────────────────┤
│ SIDEBAR  │  CONTENT AREA                                 │
│          │                                               │
│ Dashboard│  (dynamic based on selected section)          │
│ Site     │                                               │
│ Hero     │  Each section shows:                          │
│ About    │  - Section title                              │
│ Services │  - List of items with edit/delete/reorder     │
│ Projects │  - Add New button                             │
│ Skills   │  - Save button                                │
│ Gallery  │                                               │
│ Visual   │                                               │
│ Testimon.│                                               │
│ Contact  │                                               │
│ Tools    │                                               │
│ Repos    │                                               │
│ Library  │                                               │
│ DYK      │                                               │
│ Images   │                                               │
├──────────┴───────────────────────────────────────────────┤
│  Status: All changes saved / Unsaved changes (3)         │
└──────────────────────────────────────────────────────────┘
```

---

## 5. ADMIN FEATURES

### Content Editing
- Form-based editor per section (label + input/textarea per field)
- Add / Delete / Reorder items (drag handle or up/down buttons)
- Unsaved changes indicator (asterisk on sidebar section name)
- Save button POSTs all changes to API

### Image Management
- Image browser — grid of thumbnails from images/ folder
- Upload zone — drag-and-drop or file picker, uploads via /api/upload
- Image selector — click image field to open browser and pick image
- Image metadata — edit alt text

### Authentication
- Simple password login (ADMIN_PASSWORD from .env)
- Session token in localStorage
- API routes check token before write operations

---

## 6. MAIN SITE INTEGRATION

### New file: js/content-loader.js
- Fetches all content from /api/content.js on page load
- Caches in localStorage with timestamp (5min TTL)
- Falls back to hardcoded data if API unavailable
- Exports loaded data for app.js and resources.js to consume

### Changes to js/app.js
- Replace hardcoded servicesData, testimonialsData, skillsData
- With data from content-loader
- Keep hardcoded data as fallback

### Changes to js/resources.js
- Replace hardcoded resourceHubData
- With data from content-loader
- Keep hardcoded data as fallback

### Changes to HTML files
- index.html sections that were hardcoded (hero, about, projects, gallery, contact) become dynamically rendered
- Resources page hero and footer become dynamic

---

## 7. ENVIRONMENT VARIABLES

```
DATABASE_URL=postgresql://...        # Neon connection string
ADMIN_PASSWORD=your-secure-password  # Admin login password
```

---

## 8. IMPLEMENTATION ORDER

### Phase 1: Database + API
1. Create api/db.js — Neon connection helper
2. Create api/auth.js — login endpoint
3. Create api/content.js — GET/POST content
4. Create api/upload.js — image upload
5. Create seed.sql — current content inserted into DB
6. Add @neondatabase/serverless dependency
7. Create .env.example

### Phase 2: Admin Panel
8. Create admin.html — page structure
9. Create css/admin.css — dark dashboard styles
10. Create js/admin.js — core logic
11. Implement login/auth flow
12. Implement sidebar navigation
13. Implement settings editors (site, hero, about, contact)
14. Implement items list editors (services, testimonials, skills, tools, repos, library, DYK)
15. Implement content section editors (projects, gallery, visualField)
16. Implement image browser
17. Implement image upload

### Phase 3: Main Site Integration
18. Create js/content-loader.js
19. Update app.js to consume loaded data
20. Update resources.js to consume loaded data
21. Update index.html to render dynamic sections
22. Update resources.html to render dynamic sections

### Phase 4: Config + Deploy
23. Create vercel.json
24. Test API endpoints
25. Test admin panel end-to-end
26. Test main site with API data

---

## 9. VERIFICATION

1. npm run build — no errors
2. Admin panel loads at /admin.html — login works
3. All 16 sidebar sections display current content from DB
4. Editing a service → save → API returns success → DB updated
5. Main site loads content from API → displays updated content
6. Image upload → file appears in images/ → selectable in image browser
7. API returns 401 for unauthorized write attempts
8. Main site falls back to hardcoded data if API is down
9. Responsive: admin panel usable on tablet+
10. No regressions on existing portfolio pages
