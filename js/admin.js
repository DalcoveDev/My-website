/* ============================================
   ADMIN PANEL — CORE LOGIC
   ============================================ */

const API_BASE = '/api';
let authToken = localStorage.getItem('admin_token');
let contentData = null;
let currentSection = 'dashboard';
let hasUnsavedChanges = false;
let currentImageCallback = null;
let useLocalMode = false;

/* ============================================
   INIT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  if (authToken) {
    showDashboard();
    loadContent();
  } else {
    tryLocalMode();
  }

  initLoginForm();
  initSidebar();
  initLogout();
  initImageModal();
});

function tryLocalMode() {
  const saved = localStorage.getItem('admin_local_content');
  if (saved) {
    useLocalMode = true;
    authToken = 'local';
    contentData = JSON.parse(saved);
    showDashboard();
    renderSection(currentSection);
    return;
  }
  showLogin();
}

/* ============================================
   AUTH
   ============================================ */

function showLogin() {
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('admin-dashboard').style.display = 'none';
}

function showDashboard() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('admin-dashboard').style.display = 'block';
}

function initLoginForm() {
  const form = document.getElementById('login-form');
  const errorEl = document.getElementById('login-error');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const password = document.getElementById('login-password').value;
    errorEl.textContent = '';

    try {
      const res = await fetch(`${API_BASE}/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();

      if (!res.ok) {
        errorEl.textContent = data.error || 'Login failed';
        return;
      }

      authToken = data.token;
      localStorage.setItem('admin_token', authToken);
      showDashboard();
      loadContent();
    } catch (_) {
      useLocalMode = true;
      authToken = 'local';
      const saved = localStorage.getItem('admin_local_content');
      contentData = saved ? JSON.parse(saved) : getDefaultContent();
      localStorage.setItem('admin_local_content', JSON.stringify(contentData));
      showDashboard();
      renderSection(currentSection);
    }
  });
}

function initLogout() {
  document.getElementById('logout-btn').addEventListener('click', () => {
    authToken = null;
    useLocalMode = false;
    localStorage.removeItem('admin_token');
    contentData = null;
    showLogin();
  });
}

/* ============================================
   DATA LOADING
   ============================================ */

async function loadContent() {
  if (useLocalMode) {
    const saved = localStorage.getItem('admin_local_content');
    contentData = saved ? JSON.parse(saved) : getDefaultContent();
    renderSection(currentSection);
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/content`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });

    if (res.status === 401) {
      authToken = null;
      localStorage.removeItem('admin_token');
      showLogin();
      return;
    }

    contentData = await res.json();
    renderSection(currentSection);
  } catch (_) {
    useLocalMode = true;
    const saved = localStorage.getItem('admin_local_content');
    contentData = saved ? JSON.parse(saved) : getDefaultContent();
    renderSection(currentSection);
  }
}

function getDefaultContent() {
  return {
    settings: {
      site: { title: 'DALCOVE — Digital Creative Technologist', description: '', copyright: '© 2026 Ingabire Dalcove', logoText: 'DALCOVE' },
      hero: { title: 'CREATE', subtitle: 'with dalcove', scrollText: 'Scroll' },
      about: { label: '01 / About', title: ['Digital Media', 'Technologist'], paragraphs: ['', ''], image: 'images/1001028563.jpg' },
      contact: { label: '07 / Contact', title: ["LET'S CREATE", 'SOMETHING'], email: 'hello@dalcove.dev', availability: 'Open for projects', socialLinks: [] },
      preloader: { name: 'INGABIRE DALCOVE', subtitle: 'Loading experience...' },
      resourcesHero: { eyebrow: ['DALCOVE', 'DIGITAL ARCHIVE', '2026'], title: 'RESOURCES', description: '', stats: [] }
    },
    items: {
      services: [], testimonials: [], skills: [], tools: [], didYouKnow: [],
      repositories: [], library: [], projects: [], gallery: [], visualField: []
    },
    images: []
  };
}

/* ============================================
   SIDEBAR
   ============================================ */

function initSidebar() {
  const toggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('admin-sidebar');

  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('is-open');
  });

  document.querySelectorAll('.admin-nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.dataset.section;
      navigateTo(section);
      sidebar.classList.remove('is-open');
    });
  });
}

function navigateTo(section) {
  if (hasUnsavedChanges) {
    if (!confirm('You have unsaved changes. Leave anyway?')) return;
  }

  currentSection = section;

  document.querySelectorAll('.admin-nav-item').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.section === section);
  });

  document.getElementById('current-section-label').textContent = getSectionLabel(section);
  renderSection(section);
}

function getSectionLabel(section) {
  const labels = {
    dashboard: 'Dashboard', site: 'Site Settings', hero: 'Hero', preloader: 'Preloader',
    about: 'About', contact: 'Contact', services: 'Services', projects: 'Projects',
    skills: 'Skills', gallery: 'Gallery', visualField: 'Visual Field', testimonials: 'Testimonials',
    tools: 'Tools', repositories: 'Repositories', library: 'Library', didYouKnow: 'Did You Know',
    resourcesHero: 'Resources Hero', images: 'Images'
  };
  return labels[section] || section;
}

/* ============================================
   SAVE STATUS
   ============================================ */

function markUnsaved() {
  hasUnsavedChanges = true;
  const status = document.getElementById('save-status');
  status.textContent = 'Unsaved changes';
  status.classList.add('is-unsaved');

  document.querySelectorAll('.admin-nav-item').forEach(btn => {
    if (btn.dataset.section === currentSection) {
      btn.classList.add('has-unsaved');
    }
  });
}

function markSaved() {
  hasUnsavedChanges = false;
  const status = document.getElementById('save-status');
  status.textContent = 'All changes saved';
  status.classList.remove('is-unsaved');

  document.querySelectorAll('.admin-nav-item').forEach(btn => {
    btn.classList.remove('has-unsaved');
  });
}

async function saveContent() {
  if (!contentData) return;

  if (useLocalMode) {
    localStorage.setItem('admin_local_content', JSON.stringify(contentData));
    markSaved();
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(contentData)
    });

    if (!res.ok) throw new Error('Save failed');
    markSaved();
  } catch (_) {
    localStorage.setItem('admin_local_content', JSON.stringify(contentData));
    markSaved();
  }
}

/* ============================================
   RENDER SECTION
   ============================================ */

function renderSection(section) {
  const content = document.getElementById('admin-content');

  if (!contentData) {
    content.innerHTML = `<div class="empty-state"><div class="empty-state-icon">⏳</div><div class="empty-state-text">Loading content...</div></div>`;
    return;
  }

  switch (section) {
    case 'dashboard': renderDashboard(content); break;
    case 'site': renderSettingsEditor(content, 'site', 'Site Settings', siteFields()); break;
    case 'hero': renderSettingsEditor(content, 'hero', 'Hero Section', heroFields()); break;
    case 'preloader': renderSettingsEditor(content, 'preloader', 'Preloader', preloaderFields()); break;
    case 'about': renderSettingsEditor(content, 'about', 'About Section', aboutFields()); break;
    case 'contact': renderSettingsEditor(content, 'contact', 'Contact Section', contactFields()); break;
    case 'resourcesHero': renderSettingsEditor(content, 'resourcesHero', 'Resources Hero', resourcesHeroFields()); break;
    case 'services': renderItemsList(content, 'services', 'Services', serviceFields()); break;
    case 'testimonials': renderItemsList(content, 'testimonials', 'Testimonials', testimonialFields()); break;
    case 'skills': renderItemsList(content, 'skills', 'Skills', skillFields()); break;
    case 'tools': renderItemsList(content, 'tools', 'Tools', toolFields()); break;
    case 'didYouKnow': renderItemsList(content, 'didYouKnow', 'Did You Know', dykFields()); break;
    case 'repositories': renderItemsList(content, 'repositories', 'Repositories', repoFields()); break;
    case 'library': renderItemsList(content, 'library', 'Library / References', libraryFields()); break;
    case 'projects': renderItemsList(content, 'projects', 'Projects', projectFields()); break;
    case 'gallery': renderItemsList(content, 'gallery', 'Gallery', galleryFields()); break;
    case 'visualField': renderItemsList(content, 'visualField', 'Visual Field', visualFieldFields()); break;
    case 'images': renderImages(content); break;
    default: renderDashboard(content);
  }
}

/* ============================================
   DASHBOARD
   ============================================ */

function renderDashboard(container) {
  const items = contentData.items;
  const stats = [
    { label: 'Services', count: items.services?.length || 0, section: 'services' },
    { label: 'Projects', count: items.projects?.length || 0, section: 'projects' },
    { label: 'Skills', count: items.skills?.length || 0, section: 'skills' },
    { label: 'Gallery Items', count: items.gallery?.length || 0, section: 'gallery' },
    { label: 'Testimonials', count: items.testimonials?.length || 0, section: 'testimonials' },
    { label: 'Tools', count: items.tools?.length || 0, section: 'tools' },
    { label: 'Repositories', count: items.repositories?.length || 0, section: 'repositories' },
    { label: 'References', count: items.library?.length || 0, section: 'library' },
    { label: 'Did You Know', count: items.didYouKnow?.length || 0, section: 'didYouKnow' },
    { label: 'Images', count: contentData.images?.length || 0, section: 'images' },
  ];

  container.innerHTML = `
    <h1 class="dashboard-title">Dashboard</h1>
    <p class="dashboard-subtitle">Manage all content for your portfolio</p>
    <div class="dashboard-stats">
      ${stats.map(s => `
        <div class="stat-card">
          <div class="stat-card-label">${s.label}</div>
          <div class="stat-card-value">${String(s.count).padStart(2, '0')}</div>
          <button class="stat-card-link" onclick="navigateTo('${s.section}')">Edit →</button>
        </div>
      `).join('')}
    </div>
  `;
}

/* ============================================
   SETTINGS EDITOR (for single-object settings)
   ============================================ */

function renderSettingsEditor(container, key, title, fields) {
  const data = contentData.settings[key] || {};

  container.innerHTML = `
    <div class="section-header">
      <h2 class="section-title">${title}</h2>
      <div class="section-actions">
        <button class="btn btn-accent" id="save-btn">SAVE</button>
      </div>
    </div>
    <div class="form-grid" id="settings-form">
      ${fields.map(f => renderFormField(f, data)).join('')}
    </div>
  `;

  container.querySelector('#save-btn').addEventListener('click', () => {
    const formData = collectFormData(container, fields);
    contentData.settings[key] = formData;
    saveContent();
  });

  container.querySelectorAll('.form-input, .form-textarea').forEach(el => {
    el.addEventListener('input', markUnsaved);
  });
}

function renderFormField(field, data) {
  const value = getNestedValue(data, field.key) ?? field.default ?? '';

  if (field.type === 'textarea') {
    return `
      <div class="form-group ${field.fullWidth ? 'full-width' : ''}">
        <label class="form-label">${field.label}</label>
        <textarea class="form-textarea" data-key="${field.key}" rows="${field.rows || 3}">${escapeHtml(String(value))}</textarea>
      </div>
    `;
  }

  if (field.type === 'array') {
    const items = Array.isArray(value) ? value : [];
    return `
      <div class="form-group ${field.fullWidth ? 'full-width' : ''}">
        <label class="form-label">${field.label}</label>
        <div class="tags-editor" data-key="${field.key}">
          ${items.map((item, i) => `
            <div class="tag-item">
              <span>${escapeHtml(String(item))}</span>
              <button class="tag-remove" data-index="${i}">×</button>
            </div>
          `).join('')}
          <input class="tag-add-input" placeholder="Add..." data-array-key="${field.key}">
        </div>
      </div>
    `;
  }

  if (field.type === 'image') {
    const imgPath = value || '';
    return `
      <div class="form-group ${field.fullWidth ? 'full-width' : ''}">
        <label class="form-label">${field.label}</label>
        <div class="image-selector">
          <div class="image-selector-preview">
            ${imgPath ? `<img src="${imgPath}" alt="">` : '<span>No image</span>'}
          </div>
          <div>
            <div class="image-selector-path">${imgPath || 'No image selected'}</div>
            <button class="btn btn-sm image-select-btn" data-key="${field.key}">Choose Image</button>
            ${imgPath ? `<button class="btn btn-sm image-clear-btn" data-key="${field.key}">Clear</button>` : ''}
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="form-group ${field.fullWidth ? 'full-width' : ''}">
      <label class="form-label">${field.label}</label>
      <input class="form-input" type="${field.type || 'text'}" data-key="${field.key}" value="${escapeHtml(String(value))}" placeholder="${field.placeholder || ''}">
    </div>
  `;
}

function collectFormData(container, fields) {
  const result = {};
  fields.forEach(field => {
    if (field.type === 'array') {
      const tagsEditor = container.querySelector(`.tags-editor[data-key="${field.key}"]`);
      if (tagsEditor) {
        const items = [];
        tagsEditor.querySelectorAll('.tag-item span').forEach(span => {
          items.push(span.textContent);
        });
        setNestedValue(result, field.key, items);
      }
    } else if (field.type === 'image') {
      const input = container.querySelector(`.form-input[data-key="${field.key}"]`);
      if (input) setNestedValue(result, field.key, input.value);
    } else {
      const el = container.querySelector(`[data-key="${field.key}"]`);
      if (el) setNestedValue(result, field.key, el.value);
    }
  });
  return result;
}

/* ============================================
   ITEMS LIST EDITOR
   ============================================ */

function renderItemsList(container, section, title, fields) {
  const items = contentData.items[section] || [];

  container.innerHTML = `
    <div class="section-header">
      <h2 class="section-title">${title}</h2>
      <div class="section-actions">
        <button class="btn" id="add-item-btn">+ ADD</button>
        <button class="btn btn-accent" id="save-btn">SAVE</button>
      </div>
    </div>
    <div class="items-list" id="items-list">
      ${items.length === 0 ? `
        <div class="empty-state">
          <div class="empty-state-icon">📋</div>
          <div class="empty-state-text">No items yet</div>
        </div>
      ` : items.map((item, i) => renderItemCard(item, i, fields, section)).join('')}
    </div>
  `;

  container.querySelector('#add-item-btn').addEventListener('click', () => {
    const newItem = createDefaultItem(fields);
    contentData.items[section].push(newItem);
    renderSection(section);
    markUnsaved();
  });

  container.querySelector('#save-btn').addEventListener('click', () => {
    collectItemsList(container, section, fields);
    saveContent();
  });

  initItemCards(container, section, fields);
}

function renderItemCard(item, index, fields, _section) {
  const titleField = fields.find(f => f.isTitle);
  const titleValue = titleField ? getNestedValue(item, titleField.key) : `Item ${index + 1}`;

  return `
    <div class="item-card" data-index="${index}">
      <div class="item-card-header">
        <div>
          <span class="item-card-num">${String(index + 1).padStart(2, '0')}</span>
          <span class="item-card-title">${escapeHtml(String(titleValue || 'Untitled'))}</span>
        </div>
        <div class="item-card-actions">
          <button class="item-card-toggle" data-action="toggle">
            Details <span class="item-expand-icon">▼</span>
          </button>
          <button class="btn btn-sm btn-danger" data-action="delete">Delete</button>
        </div>
      </div>
      <div class="item-card-fields">
        ${fields.map(f => renderFormField(f, item)).join('')}
      </div>
    </div>
  `;
}

function initItemCards(container, section, fields) {
  container.querySelectorAll('.item-card').forEach(card => {
    const index = parseInt(card.dataset.index);

    card.querySelector('[data-action="toggle"]').addEventListener('click', () => {
      card.classList.toggle('expanded');
    });

    card.querySelector('[data-action="delete"]').addEventListener('click', () => {
      if (confirm('Delete this item?')) {
        contentData.items[section].splice(index, 1);
        renderSection(section);
        markUnsaved();
      }
    });

    card.querySelectorAll('.form-input, .form-textarea').forEach(el => {
      el.addEventListener('input', () => {
        markUnsaved();
        const key = el.dataset.key;
        const value = el.value;
        setNestedValue(contentData.items[section][index], key, value);

        if (fields.find(f => f.key === key && f.isTitle)) {
          card.querySelector('.item-card-title').textContent = value || 'Untitled';
        }
      });
    });

    card.querySelectorAll('.image-select-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        openImageModal((filename) => {
          const input = card.querySelector(`.form-input[data-key="${btn.dataset.key}"]`);
          if (input) {
            input.value = `images/${filename}`;
            input.dispatchEvent(new Event('input'));
          }
          const preview = card.querySelector('.image-selector-preview');
          if (preview) {
            preview.innerHTML = `<img src="images/${filename}" alt="">`;
          }
          const pathEl = card.querySelector('.image-selector-path');
          if (pathEl) pathEl.textContent = `images/${filename}`;
        });
      });
    });

    card.querySelectorAll('.image-clear-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = card.querySelector(`.form-input[data-key="${btn.dataset.key}"]`);
        if (input) {
          input.value = '';
          input.dispatchEvent(new Event('input'));
        }
        const preview = card.querySelector('.image-selector-preview');
        if (preview) preview.innerHTML = '<span>No image</span>';
        const pathEl = card.querySelector('.image-selector-path');
        if (pathEl) pathEl.textContent = 'No image selected';
      });
    });

    initTagsEditors(card);
  });
}

function collectItemsList(container, section, fields) {
  const cards = container.querySelectorAll('.item-card');
  cards.forEach((card, i) => {
    fields.forEach(field => {
      if (field.type === 'array') {
        const tagsEditor = card.querySelector(`.tags-editor[data-key="${field.key}"]`);
        if (tagsEditor) {
          const items = [];
          tagsEditor.querySelectorAll('.tag-item span').forEach(span => {
            items.push(span.textContent);
          });
          setNestedValue(contentData.items[section][i], field.key, items);
        }
      } else {
        const el = card.querySelector(`[data-key="${field.key}"]`);
        if (el) setNestedValue(contentData.items[section][i], field.key, el.value);
      }
    });
  });
}

function createDefaultItem(fields) {
  const item = {};
  fields.forEach(f => {
    if (f.type === 'array') setNestedValue(item, f.key, []);
    else if (f.type === 'number') setNestedValue(item, f.key, 0);
    else setNestedValue(item, f.key, f.default || '');
  });
  return item;
}

/* ============================================
   TAGS EDITOR (inline arrays)
   ============================================ */

function initTagsEditors(container) {
  container.querySelectorAll('.tag-add-input').forEach(input => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && input.value.trim()) {
        e.preventDefault();
        const arrayKey = input.dataset.arrayKey;
        const editor = input.closest('.tags-editor');
        const items = [];
        editor.querySelectorAll('.tag-item span').forEach(s => items.push(s.textContent));
        items.push(input.value.trim());

        const tagsHtml = items.map((item, i) => `
          <div class="tag-item">
            <span>${escapeHtml(item)}</span>
            <button class="tag-remove" data-index="${i}">×</button>
          </div>
        `).join('');

        editor.innerHTML = tagsHtml + `<input class="tag-add-input" placeholder="Add..." data-array-key="${arrayKey}">`;
        initTagsEditors(container);
        markUnsaved();
      }
    });
  });

  container.querySelectorAll('.tag-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.tag-item').remove();
      markUnsaved();
    });
  });
}

/* ============================================
   IMAGES SECTION
   ============================================ */

function renderImages(container) {
  const images = contentData.images || [];

  container.innerHTML = `
    <div class="section-header">
      <h2 class="section-title">Images</h2>
      <div class="section-actions">
        <button class="btn btn-accent" id="save-images-btn">SAVE</button>
      </div>
    </div>
    <div class="image-modal-upload" style="padding:0;margin-bottom:1.5rem;">
      <div class="upload-zone" id="admin-upload-zone">
        <span>Drop images here or click to upload to images/ folder</span>
        <input type="file" id="admin-upload-input" accept="image/*" multiple style="display:none;">
      </div>
    </div>
    <div class="items-list">
      ${images.length === 0 ? `
        <div class="empty-state">
          <div class="empty-state-icon">🖼️</div>
          <div class="empty-state-text">No images tracked yet</div>
        </div>
      ` : images.map((img, i) => `
        <div class="item-card expanded" data-index="${i}">
          <div class="item-card-header">
            <div style="display:flex;align-items:center;gap:1rem;">
              <div class="image-selector-preview" style="width:50px;height:50px;">
                <img src="images/${img.filename}" alt="${escapeHtml(img.alt || '')}">
              </div>
              <div>
                <div class="item-card-title">${escapeHtml(img.filename)}</div>
                <div class="form-label" style="margin-top:0.2rem;">${escapeHtml(img.section || 'Unassigned')}</div>
              </div>
            </div>
            <div class="item-card-actions">
              <button class="btn btn-sm btn-danger" data-action="delete-img">Remove</button>
            </div>
          </div>
          <div class="item-card-fields">
            <div class="form-group">
              <label class="form-label">Alt Text</label>
              <input class="form-input" data-img-field="alt" data-index="${i}" value="${escapeHtml(img.alt || '')}">
            </div>
            <div class="form-group">
              <label class="form-label">Section</label>
              <input class="form-input" data-img-field="section" data-index="${i}" value="${escapeHtml(img.section || '')}" placeholder="e.g. gallery, projects">
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  container.querySelectorAll('[data-img-field]').forEach(input => {
    input.addEventListener('input', () => {
      const i = parseInt(input.dataset.index);
      const field = input.dataset.imgField;
      contentData.images[i][field] = input.value;
      markUnsaved();
    });
  });

  container.querySelectorAll('[data-action="delete-img"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.item-card');
      const i = parseInt(card.dataset.index);
      if (confirm(`Remove ${contentData.images[i].filename}?`)) {
        contentData.images.splice(i, 1);
        renderSection('images');
        markUnsaved();
      }
    });
  });

  container.querySelector('#save-images-btn')?.addEventListener('click', saveContent);

  const uploadZone = document.getElementById('admin-upload-zone');
  const uploadInput = document.getElementById('admin-upload-input');

  if (uploadZone && uploadInput) {
    uploadZone.addEventListener('click', () => uploadInput.click());
    uploadZone.addEventListener('dragover', (e) => { e.preventDefault(); uploadZone.classList.add('is-dragover'); });
    uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('is-dragover'));
    uploadZone.addEventListener('drop', (e) => { e.preventDefault(); uploadZone.classList.remove('is-dragover'); handleImageUpload(e.dataTransfer.files); });
    uploadInput.addEventListener('change', () => handleImageUpload(uploadInput.files));
  }
}

async function handleImageUpload(files) {
  for (const file of files) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${authToken}` },
        body: formData
      });
      const data = await res.json();

      if (res.ok) {
        contentData.images.push({ filename: data.filename, alt: '', section: '' });
      }
    } catch (_) {
      alert(`Upload failed for ${file.name}`);
    }
  }
  renderSection('images');
  markSaved();
}

/* ============================================
   IMAGE MODAL (for inline image picking)
   ============================================ */

function initImageModal() {
  const _modal = document.getElementById('image-modal');
  const backdrop = document.getElementById('image-modal-backdrop');
  const closeBtn = document.getElementById('image-modal-close');
  const _grid = document.getElementById('image-modal-grid');
  const uploadZone = document.getElementById('upload-zone');
  const uploadInput = document.getElementById('upload-input');

  closeBtn.addEventListener('click', closeImageModal);
  backdrop.addEventListener('click', closeImageModal);

  uploadZone.addEventListener('click', () => uploadInput.click());
  uploadZone.addEventListener('dragover', (e) => { e.preventDefault(); uploadZone.classList.add('is-dragover'); });
  uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('is-dragover'));
  uploadZone.addEventListener('drop', async (e) => {
    e.preventDefault();
    uploadZone.classList.remove('is-dragover');
    for (const file of e.dataTransfer.files) {
      await uploadFile(file);
    }
    renderImageGrid();
  });
  uploadInput.addEventListener('change', async () => {
    for (const file of uploadInput.files) {
      await uploadFile(file);
    }
    renderImageGrid();
  });
}

async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  try {
    await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${authToken}` },
      body: formData
    });
  } catch (err) {
    alert(`Upload failed: ${err.message}`);
  }
}

function openImageModal(callback) {
  currentImageCallback = callback;
  document.getElementById('image-modal').style.display = 'flex';
  renderImageGrid();
}

function closeImageModal() {
  document.getElementById('image-modal').style.display = 'none';
  currentImageCallback = null;
}

function renderImageGrid() {
  const grid = document.getElementById('image-modal-grid');
  const images = contentData.images || [];

  grid.innerHTML = images.map(img => `
    <div class="image-grid-item" data-filename="${img.filename}">
      <img src="images/${img.filename}" alt="${escapeHtml(img.alt || '')}">
      <div class="image-grid-item-name">${img.filename}</div>
    </div>
  `).join('');

  grid.querySelectorAll('.image-grid-item').forEach(item => {
    item.addEventListener('click', () => {
      if (currentImageCallback) {
        currentImageCallback(item.dataset.filename);
      }
      closeImageModal();
    });
  });
}

/* ============================================
   FIELD DEFINITIONS
   ============================================ */

function siteFields() {
  return [
    { key: 'title', label: 'Site Title', type: 'text', fullWidth: true },
    { key: 'description', label: 'Meta Description', type: 'textarea', rows: 2, fullWidth: true },
    { key: 'copyright', label: 'Copyright Text', type: 'text', fullWidth: true },
    { key: 'logoText', label: 'Logo Text', type: 'text' },
  ];
}

function heroFields() {
  return [
    { key: 'title', label: 'Hero Title', type: 'text', fullWidth: true, placeholder: 'CREATE' },
    { key: 'subtitle', label: 'Subtitle', type: 'text', fullWidth: true, placeholder: 'with dalcove' },
    { key: 'scrollText', label: 'Scroll Indicator Text', type: 'text', placeholder: 'Scroll' },
  ];
}

function preloaderFields() {
  return [
    { key: 'name', label: 'Preloader Name', type: 'text', fullWidth: true },
    { key: 'subtitle', label: 'Subtitle', type: 'text', fullWidth: true },
  ];
}

function aboutFields() {
  return [
    { key: 'label', label: 'Section Label', type: 'text' },
    { key: 'title', label: 'Title (line 1)', type: 'text', isTitle: true },
    { key: 'paragraphs', label: 'Paragraphs', type: 'array', fullWidth: true },
    { key: 'image', label: 'About Image', type: 'image' },
  ];
}

function contactFields() {
  return [
    { key: 'label', label: 'Section Label', type: 'text' },
    { key: 'title', label: 'Title (line 1)', type: 'text', isTitle: true },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'availability', label: 'Availability Status', type: 'text' },
  ];
}

function resourcesHeroFields() {
  return [
    { key: 'title', label: 'Title', type: 'text', fullWidth: true },
    { key: 'description', label: 'Description', type: 'textarea', rows: 2, fullWidth: true },
    { key: 'eyebrow', label: 'Eyebrow Items', type: 'array', fullWidth: true },
  ];
}

function serviceFields() {
  return [
    { key: 'title', label: 'Service Title', type: 'text', fullWidth: true, isTitle: true },
    { key: 'desc', label: 'Description', type: 'textarea', rows: 2, fullWidth: true },
  ];
}

function testimonialFields() {
  return [
    { key: 'quote', label: 'Quote', type: 'textarea', rows: 3, fullWidth: true },
    { key: 'name', label: 'Author Name', type: 'text', isTitle: true },
    { key: 'role', label: 'Role / Company', type: 'text', fullWidth: true },
  ];
}

function skillFields() {
  return [
    { key: 'name', label: 'Skill Name', type: 'text', isTitle: true },
    { key: 'category', label: 'Category (languages/frameworks/tools)', type: 'text' },
    { key: 'logo', label: 'Logo URL', type: 'text', fullWidth: true },
    { key: 'experience', label: 'Experience', type: 'text' },
    { key: 'usedFor', label: 'Used For', type: 'text', fullWidth: true },
    { key: 'extra', label: 'Extra Info', type: 'text' },
  ];
}

function toolFields() {
  return [
    { key: 'name', label: 'Tool Name', type: 'text', isTitle: true },
    { key: 'category', label: 'Category', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea', rows: 2, fullWidth: true },
    { key: 'whyUseful', label: 'Why Useful', type: 'textarea', rows: 2, fullWidth: true },
    { key: 'url', label: 'URL', type: 'text', fullWidth: true },
  ];
}

function dykFields() {
  return [
    { key: 'content', label: 'Fact', type: 'textarea', rows: 3, fullWidth: true, isTitle: true },
    { key: 'category', label: 'Category', type: 'text' },
    { key: 'date', label: 'Date (YYYY-MM-DD)', type: 'text' },
  ];
}

function repoFields() {
  return [
    { key: 'name', label: 'Repository Name', type: 'text', isTitle: true },
    { key: 'description', label: 'Description', type: 'textarea', rows: 2, fullWidth: true },
    { key: 'tags', label: 'Tags', type: 'array', fullWidth: true },
    { key: 'status', label: 'Status', type: 'text' },
    { key: 'github', label: 'GitHub URL', type: 'text', fullWidth: true },
    { key: 'demo', label: 'Demo URL', type: 'text', fullWidth: true },
  ];
}

function libraryFields() {
  return [
    { key: 'name', label: 'Resource Name', type: 'text', isTitle: true },
    { key: 'category', label: 'Category', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea', rows: 2, fullWidth: true },
    { key: 'url', label: 'URL', type: 'text', fullWidth: true },
  ];
}

function projectFields() {
  return [
    { key: 'title', label: 'Project Title', type: 'text', isTitle: true },
    { key: 'num', label: 'Number', type: 'text' },
    { key: 'year', label: 'Year', type: 'text' },
    { key: 'category', label: 'Category', type: 'text' },
    { key: 'desc', label: 'Description', type: 'textarea', rows: 2, fullWidth: true },
    { key: 'tags', label: 'Tags', type: 'array', fullWidth: true },
    { key: 'image', label: 'Project Image', type: 'image' },
    { key: 'theme', label: 'Theme (editorial/tech/bold/experimental)', type: 'text' },
  ];
}

function galleryFields() {
  return [
    { key: 'label', label: 'Label', type: 'text', isTitle: true },
    { key: 'sublabel', label: 'Sublabel', type: 'text' },
    { key: 'image', label: 'Image', type: 'image' },
    { key: 'alt', label: 'Alt Text', type: 'text' },
    { key: 'layout', label: 'Layout (default/wide/tall)', type: 'text' },
  ];
}

function visualFieldFields() {
  return [
    { key: 'image', label: 'Image', type: 'image', isTitle: true },
    { key: 'alt', label: 'Alt Text', type: 'text' },
    { key: 'offset', label: 'CSS Rotation (e.g. -2deg)', type: 'text' },
    { key: 'y', label: 'CSS Y Offset (e.g. 10px)', type: 'text' },
  ];
}

/* ============================================
   UTILITIES
   ============================================ */

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

function setNestedValue(obj, path, value) {
  const keys = path.split('.');
  const last = keys.pop();
  const target = keys.reduce((current, key) => {
    if (!current[key]) current[key] = {};
    return current[key];
  }, obj);
  target[last] = value;
}
