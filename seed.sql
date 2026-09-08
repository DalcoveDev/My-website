-- DALCOVE PORTFOLIO — SEED DATA
-- Run this SQL to populate the database with current content

-- Settings
INSERT INTO settings (key, value) VALUES
('site', '{"title": "DALCOVE — Digital Creative Technologist", "description": "Ingabire Dalcove — Digital media technologist and creative technologist combining technology, design, media, interaction, and software to create digital experiences.", "copyright": "© 2026 Ingabire Dalcove. All rights reserved.", "logoText": "DALCOVE"}'::jsonb),

('hero', '{"title": "CREATE", "subtitle": "with dalcove", "scrollText": "Scroll"}'::jsonb),

('about', '{"label": "01 / About", "title": ["Digital Media", "Technologist"], "paragraphs": ["I am Ingabire Dalcove — a digital media technologist and creative technologist who combines technology, design, media, interaction, and software to create immersive digital experiences. My work spans creative technology, software development, web development, and interactive design.", "Every project is an opportunity to push the boundaries of what digital experiences can feel like. The portfolio you are exploring is itself one of my works."], "image": "images/1001028563.jpg"}'::jsonb),

('contact', '{"label": "07 / Contact", "title": ["LET'\''S CREATE", "SOMETHING"], "email": "hello@dalcove.dev", "availability": "Open for projects", "socialLinks": [{"label": "GitHub", "url": "#"}, {"label": "LinkedIn", "url": "#"}, {"label": "Twitter", "url": "#"}, {"label": "Behance", "url": "#"}]}'::jsonb),

('resourcesHero', '{"eyebrow": ["DALCOVE", "DIGITAL ARCHIVE", "2026"], "title": "RESOURCES", "description": "A curated collection of tools, knowledge, experiments and references that shape the way I build digital experiences.", "stats": [{"label": "TOOLS", "value": "08"}, {"label": "KNOWLEDGE", "value": "05"}, {"label": "REPOSITORIES", "value": "03"}, {"label": "REFERENCES", "value": "08"}]}'::jsonb),

('preloader', '{"name": "INGABIRE DALCOVE", "subtitle": "Loading experience..."}'::jsonb);

-- Services
INSERT INTO items (section, sort_order, data) VALUES
('services', 0, '{"title": "Software Development", "desc": "Custom software solutions built with modern technologies and thoughtful architecture."}'::jsonb),
('services', 1, '{"title": "Web Development", "desc": "Performant, responsive, and visually intentional web experiences."}'::jsonb),
('services', 2, '{"title": "Digital Media", "desc": "Creative media production blending technology with visual storytelling."}'::jsonb),
('services', 3, '{"title": "Creative Development", "desc": "Experimental and interactive digital experiences that push creative boundaries."}'::jsonb),
('services', 4, '{"title": "UI/UX Design", "desc": "User-centered interfaces that balance aesthetics with functionality."}'::jsonb),
('services', 5, '{"title": "Interactive Experiences", "desc": "Immersive digital installations and interactive web applications."}'::jsonb),
('services', 6, '{"title": "Content & Media Management", "desc": "Strategic content systems and media pipeline optimization."}'::jsonb),
('services', 7, '{"title": "Digital Solutions", "desc": "End-to-end digital strategy, implementation, and deployment."}'::jsonb);

-- Testimonials
INSERT INTO items (section, sort_order, data) VALUES
('testimonials', 0, '{"quote": "Dalcove brings a rare combination of technical precision and creative vision. Every project feels like a work of art.", "name": "Sarah Mensah", "role": "Creative Director, Lumina Studio"}'::jsonb),
('testimonials', 1, '{"quote": "Working with Dalcove transformed our digital presence. The attention to interaction and detail is unmatched.", "name": "Jean-Pierre Hakizimana", "role": "Founder, TechFlow Africa"}'::jsonb),
('testimonials', 2, '{"quote": "The immersive experience Dalcove created for our exhibition redefined what our visitors expected from digital art.", "name": "Amara Okafor", "role": "Curator, Digital Arts Festival"}'::jsonb);

-- Skills (Languages)
INSERT INTO items (section, sort_order, data) VALUES
('skills', 0, '{"name": "JavaScript", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", "experience": "ADD EXPERIENCE", "usedFor": "Interactive web applications", "extra": "Frontend / Backend / Full-stack", "category": "languages"}'::jsonb),
('skills', 1, '{"name": "Python", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", "experience": "ADD EXPERIENCE", "usedFor": "Automation, data processing, scripting", "extra": "Backend / Automation", "category": "languages"}'::jsonb),
('skills', 2, '{"name": "C++", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", "experience": "ADD EXPERIENCE", "usedFor": "Systems programming, performance-critical applications", "extra": "Systems / Performance", "category": "languages"}'::jsonb),
('skills', 3, '{"name": "HTML", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", "experience": "ADD EXPERIENCE", "usedFor": "Semantic markup and web structure", "extra": "Web Fundamentals", "category": "languages"}'::jsonb),
('skills', 4, '{"name": "CSS", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", "experience": "ADD EXPERIENCE", "usedFor": "Visual design, layouts, animations", "extra": "Styling / Layout", "category": "languages"}'::jsonb),
('skills', 5, '{"name": "TypeScript", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", "experience": "ADD EXPERIENCE", "usedFor": "Type-safe JavaScript development", "extra": "Frontend / Backend", "category": "languages"}'::jsonb);

-- Skills (Frameworks)
INSERT INTO items (section, sort_order, data) VALUES
('skills', 6, '{"name": "React", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", "experience": "ADD EXPERIENCE", "usedFor": "Interactive web applications", "extra": "Frontend / UI / Component Architecture", "category": "frameworks"}'::jsonb),
('skills', 7, '{"name": "Next.js", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", "experience": "ADD EXPERIENCE", "usedFor": "Full-stack React applications", "extra": "SSR / SSG / Full-stack", "category": "frameworks"}'::jsonb),
('skills', 8, '{"name": "GSAP", "logo": "https://raw.githubusercontent.com/nicedoc/gsap-logo/master/gsap-logo.svg", "experience": "ADD EXPERIENCE", "usedFor": "Cinematic animations and scroll-driven experiences", "extra": "Animation / Scroll / Motion", "category": "frameworks"}'::jsonb),
('skills', 9, '{"name": "Express", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", "experience": "ADD EXPERIENCE", "usedFor": "Backend APIs and server-side logic", "extra": "Backend / APIs", "category": "frameworks"}'::jsonb),
('skills', 10, '{"name": "Tailwind CSS", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", "experience": "ADD EXPERIENCE", "usedFor": "Utility-first styling and rapid UI development", "extra": "Styling / Design Systems", "category": "frameworks"}'::jsonb),
('skills', 11, '{"name": "Node.js", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", "experience": "ADD EXPERIENCE", "usedFor": "Server-side JavaScript runtime", "extra": "Backend / Runtime", "category": "frameworks"}'::jsonb);

-- Skills (Tools)
INSERT INTO items (section, sort_order, data) VALUES
('skills', 12, '{"name": "Git", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", "experience": "ADD EXPERIENCE", "usedFor": "Version control and collaboration", "extra": "Version Control", "category": "tools"}'::jsonb),
('skills', 13, '{"name": "GitHub", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", "experience": "ADD EXPERIENCE", "usedFor": "Code hosting and collaboration", "extra": "Collaboration / CI/CD", "category": "tools"}'::jsonb),
('skills', 14, '{"name": "MySQL", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", "experience": "ADD EXPERIENCE", "usedFor": "Relational database management", "extra": "Database / SQL", "category": "tools"}'::jsonb),
('skills', 15, '{"name": "PostgreSQL", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", "experience": "ADD EXPERIENCE", "usedFor": "Advanced relational database operations", "extra": "Database / SQL", "category": "tools"}'::jsonb),
('skills', 16, '{"name": "MongoDB", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", "experience": "ADD EXPERIENCE", "usedFor": "NoSQL document-based database", "extra": "Database / NoSQL", "category": "tools"}'::jsonb),
('skills', 17, '{"name": "PocketBase", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pocketbase/pocketbase-original.svg", "experience": "ADD EXPERIENCE", "usedFor": "Lightweight backend-as-a-service", "extra": "Backend / BaaS", "category": "tools"}'::jsonb),
('skills', 18, '{"name": "Vite", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg", "experience": "ADD EXPERIENCE", "usedFor": "Frontend build tooling and dev server", "extra": "Build / Tooling", "category": "tools"}'::jsonb);

-- Tools (Resource Hub)
INSERT INTO items (section, sort_order, data) VALUES
('tools', 0, '{"name": "VS Code", "category": "Development", "description": "A lightweight but powerful source code editor.", "whyUseful": "My primary code editor with extensive extension support.", "url": "https://code.visualstudio.com"}'::jsonb),
('tools', 1, '{"name": "Figma", "category": "Design", "description": "A collaborative interface design tool.", "whyUseful": "Essential for UI/UX design and prototyping.", "url": "https://www.figma.com"}'::jsonb),
('tools', 2, '{"name": "GitHub", "category": "Development", "description": "A platform for version control and collaboration.", "whyUseful": "Used for all my project repositories and collaboration.", "url": "https://github.com"}'::jsonb),
('tools', 3, '{"name": "Vite", "category": "Development", "description": "A fast build tool for modern web projects.", "whyUseful": "Lightning fast development server and build tool.", "url": "https://vitejs.dev"}'::jsonb),
('tools', 4, '{"name": "GSAP", "category": "Development", "description": "GreenSock Animation Platform for web animations.", "whyUseful": "The animation library I use for cinematic experiences.", "url": "https://greensock.com/gsap"}'::jsonb),
('tools', 5, '{"name": "Blender", "category": "Design", "description": "A free and open-source 3D creation suite.", "whyUseful": "For 3D modeling and creative technology projects.", "url": "https://www.blender.org"}'::jsonb),
('tools', 6, '{"name": "Notion", "category": "Productivity", "description": "A connected workspace for notes, tasks, and wikis.", "whyUseful": "Perfect for organizing projects and documentation.", "url": "https://www.notion.so"}'::jsonb),
('tools', 7, '{"name": "Terminal", "category": "Development", "description": "Command-line interface for system operations.", "whyUseful": "Essential for Git, package management, and scripting.", "url": ""}'::jsonb);

-- Did You Know
INSERT INTO items (section, sort_order, data) VALUES
('didYouKnow', 0, '{"id": 1, "content": "The first computer bug was an actual bug — a moth found trapped in a Harvard Mark II computer in 1947.", "category": "Technology History", "date": "2026-01-15"}'::jsonb),
('didYouKnow', 1, '{"id": 2, "content": "JavaScript was created in just 10 days by Brendan Eich in 1995, yet it became the most widely used programming language in the world.", "category": "Development", "date": "2026-02-10"}'::jsonb),
('didYouKnow', 2, '{"id": 3, "content": "The first website ever made is still online. It was created by Tim Berners-Lee at CERN in 1991.", "category": "Web Development", "date": "2026-03-05"}'::jsonb),
('didYouKnow', 3, '{"id": 4, "content": "CSS was first proposed by Håkon Wium Lie in 1994, and it took until 1996 for it to become a W3C recommendation.", "category": "Web Development", "date": "2026-04-20"}'::jsonb),
('didYouKnow', 4, '{"id": 5, "content": "The average webpage in 2025 weighs over 2MB, compared to just 14KB for the first website in 1991.", "category": "Web Development", "date": "2026-05-12"}'::jsonb);

-- Repositories
INSERT INTO items (section, sort_order, data) VALUES
('repositories', 0, '{"name": "Portfolio Website", "description": "A cinematic digital portfolio showcasing creative technology and web development work.", "tags": ["HTML", "CSS", "JavaScript", "GSAP"], "status": "Active", "github": "https://github.com/dalcove", "demo": ""}'::jsonb),
('repositories', 1, '{"name": "Interactive Data Platform", "description": "A real-time data visualization platform with scroll-driven narratives.", "tags": ["React", "D3.js", "Node.js"], "status": "In Development", "github": "https://github.com/dalcove", "demo": ""}'::jsonb),
('repositories', 2, '{"name": "Digital Art Exhibition", "description": "A curated online exhibition platform for digital artworks.", "tags": ["HTML/CSS", "GSAP", "Canvas"], "status": "Completed", "github": "https://github.com/dalcove", "demo": ""}'::jsonb);

-- Library (References)
INSERT INTO items (section, sort_order, data) VALUES
('library', 0, '{"name": "MDN Web Docs", "category": "Documentation", "description": "Comprehensive documentation for web technologies including HTML, CSS, and JavaScript.", "url": "https://developer.mozilla.org"}'::jsonb),
('library', 1, '{"name": "GSAP Documentation", "category": "Development", "description": "Official documentation for GreenSock Animation Platform.", "url": "https://greensock.com/docs"}'::jsonb),
('library', 2, '{"name": "Awwwards", "category": "Design", "description": "A platform showcasing the best in web design and development.", "url": "https://www.awwwards.com"}'::jsonb),
('library', 3, '{"name": "CSS-Tricks", "category": "Development", "description": "Articles, tutorials, and techniques for web developers.", "url": "https://css-tricks.com"}'::jsonb),
('library', 4, '{"name": "Coursera", "category": "Learning", "description": "Online courses from top universities and companies.", "url": "https://www.coursera.org"}'::jsonb),
('library', 5, '{"name": "GitHub Explore", "category": "Open Source", "description": "Discover open source projects and repositories.", "url": "https://github.com/explore"}'::jsonb),
('library', 6, '{"name": "Behance", "category": "Design", "description": "A platform for creative professionals to showcase their work.", "url": "https://www.behance.net"}'::jsonb),
('library', 7, '{"name": "freeCodeCamp", "category": "Learning", "description": "Free coding courses and certifications.", "url": "https://www.freecodecamp.org"}'::jsonb);

-- Projects
INSERT INTO items (section, sort_order, data) VALUES
('projects', 0, '{"num": "01", "year": "2025", "category": "Creative Development", "title": "Digital Identity System", "desc": "A comprehensive visual and interactive identity system exploring the intersection of technology and personal expression.", "tags": ["GSAP", "SVG", "WebGL"], "image": "images/1001028575.jpg", "theme": "editorial"}'::jsonb),
('projects', 1, '{"num": "02", "year": "2025", "category": "Software Development", "title": "Interactive Data Platform", "desc": "A real-time data visualization platform with cinematic scroll-driven narratives and custom interaction models.", "tags": ["React", "D3.js", "Node.js"], "image": "images/1001028579.jpg", "theme": "tech"}'::jsonb),
('projects', 2, '{"num": "03", "year": "2024", "category": "Interactive Experiences", "title": "Immersive Media Installation", "desc": "An interactive digital installation blending projection, sound, and motion to create an immersive sensory experience.", "tags": ["Three.js", "Web Audio", "Sensors"], "image": "images/1G4A4069.jpg", "theme": "bold"}'::jsonb),
('projects', 3, '{"num": "04", "year": "2024", "category": "Web Development", "title": "Digital Art Exhibition", "desc": "A curated online exhibition platform for digital artworks, featuring generative layouts and scroll-driven gallery experiences.", "tags": ["HTML/CSS", "GSAP", "Canvas"], "image": "images/1G4A4070.jpg", "theme": "experimental"}'::jsonb);

-- Gallery
INSERT INTO items (section, sort_order, data) VALUES
('gallery', 0, '{"image": "images/4N0A9807.JPG", "alt": "Gallery work", "label": "Photography", "sublabel": "Visual Exploration", "layout": "wide"}'::jsonb),
('gallery', 1, '{"image": "images/1001028563.jpg", "alt": "Gallery work", "label": "Creative Direction", "sublabel": "Brand Identity", "layout": "default"}'::jsonb),
('gallery', 2, '{"image": "images/1001028575.jpg", "alt": "Gallery work", "label": "Digital Media", "sublabel": "Interactive Design", "layout": "default"}'::jsonb),
('gallery', 3, '{"image": "images/1001028579.jpg", "alt": "Gallery work", "label": "Web Development", "sublabel": "Immersive Experience", "layout": "tall"}'::jsonb),
('gallery', 4, '{"image": "images/1G4A4069.jpg", "alt": "Gallery work", "label": "Installation", "sublabel": "Spatial Design", "layout": "default"}'::jsonb),
('gallery', 5, '{"image": "images/1G4A4070.jpg", "alt": "Gallery work", "label": "Creative Technology", "sublabel": "Motion & Light", "layout": "wide"}'::jsonb);

-- Visual Field
INSERT INTO items (section, sort_order, data) VALUES
('visualField', 0, '{"image": "images/4N0A9359.JPG", "offset": "-2deg", "y": "10px", "alt": "Work preview"}'::jsonb),
('visualField', 1, '{"image": "images/4N0A9385.JPG", "offset": "1.5deg", "y": "-8px", "alt": "Work preview"}'::jsonb),
('visualField', 2, '{"image": "images/4N0A9519.JPG", "offset": "-1deg", "y": "15px", "alt": "Work preview"}'::jsonb),
('visualField', 3, '{"image": "images/4N0A9548.JPG", "offset": "2deg", "y": "-5px", "alt": "Work preview"}'::jsonb),
('visualField', 4, '{"image": "images/4N0A9732.JPG", "offset": "-0.5deg", "y": "12px", "alt": "Work preview"}'::jsonb),
('visualField', 5, '{"image": "images/4N0A9733.JPG", "offset": "1deg", "y": "-10px", "alt": "Work preview"}'::jsonb),
('visualField', 6, '{"image": "images/4N0A9745.JPG", "offset": "-1.5deg", "y": "8px", "alt": "Work preview"}'::jsonb),
('visualField', 7, '{"image": "images/4N0A9747.JPG", "offset": "0.5deg", "y": "-12px", "alt": "Work preview"}'::jsonb);
