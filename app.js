/**
 * BBF Hub — Main Application Logic
 * Interactive Tools Portal, Storage Engine & Command Palette
 */

(function () {
  'use strict';

  // Storage Keys
  const STORAGE_KEY_TOOLS = 'bbf_hub_tools_v1';
  const STORAGE_KEY_VIEW = 'bbf_hub_view_mode';
  const STORAGE_KEY_NOTES = 'bbf_hub_quick_notes';

  // Default Initial Tools Preset
  const DEFAULT_TOOLS = [
    {
      id: 'sinavtex',
      name: 'SınavTeX',
      url: 'https://dgknrsln.github.io/sinavtex/',
      description: 'Otomatik LaTeX/PDF sınav oluşturma aracı.',
      category: 'egitim',
      status: 'online',
      tags: ['LaTeX', 'Sınav', 'PDF'],
      color: 'indigo',
      icon: 'book',
      isFavorite: true,
      lastUsed: Date.now() - 1000 * 60 * 30,
      isBuiltin: true
    },
    {
      id: 'speech-to-grade',
      name: 'Speech to Grade',
      url: 'https://alpaslantavukcu.github.io/speech_to_grade/',
      description: 'Ses tanıma ile not girişi yardımcısı.',
      category: 'ai',
      status: 'online',
      tags: ['Voice', 'Speech', 'Notlandırma', 'AI'],
      color: 'cyan',
      icon: 'sparkles',
      isFavorite: true,
      lastUsed: Date.now() - 1000 * 60 * 60,
      isBuiltin: true
    },
    {
      id: 'seating-plan-generator',
      name: 'Seating Plan Generator',
      url: 'https://github.com/alpaslantavukcu/seating_plan_generator',
      description: 'Otomatik sınav oturma düzeni oluşturucu.',
      category: 'productivity',
      status: 'online',
      tags: ['Kelebek', 'Sınav', 'Oturma Planı'],
      color: 'amber',
      icon: 'layout',
      isFavorite: true,
      lastUsed: Date.now() - 1000 * 60 * 120,
      isBuiltin: true
    }
  ];

  // SVG Icons Library
  const ICONS = {
    book: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,
    sparkles: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>`,
    'file-text': `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
    code: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
    activity: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`,
    layout: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>`,
    palette: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path></svg>`,
    'bar-chart': `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`,
    external: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`,
    star: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
    starOutline: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`
  };

  const CATEGORY_NAMES = {
    all: 'Tümü',
    favorites: 'Favoriler',
    egitim: 'Eğitim & Sınav',
    ai: 'Yapay Zeka',
    developer: 'Geliştirici Araçları',
    productivity: 'Üretkenlik',
    design: 'Tasarım & Medya'
  };

  const STATUS_LABELS = {
    online: 'Çevrimiçi / Canlı',
    local: 'Yerel (Localhost)',
    dev: 'Geliştirme Aşamasında',
    planned: 'Planlanan'
  };

  // State Management
  class AppState {
    constructor() {
      this.tools = this.loadTools();
      this.currentCategory = 'all';
      this.searchQuery = '';
      this.viewMode = localStorage.getItem(STORAGE_KEY_VIEW) || 'grid';
      this.cmdPaletteIndex = 0;
    }

    loadTools() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_TOOLS);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch (e) {
        console.error('Failed to load tools from storage:', e);
      }
      return [...DEFAULT_TOOLS];
    }

    saveTools() {
      try {
        localStorage.setItem(STORAGE_KEY_TOOLS, JSON.stringify(this.tools));
      } catch (e) {
        console.error('Failed to save tools:', e);
      }
    }

    addOrUpdateTool(toolData) {
      const existingIndex = this.tools.findIndex(t => t.id === toolData.id);
      if (existingIndex >= 0) {
        this.tools[existingIndex] = { ...this.tools[existingIndex], ...toolData };
      } else {
        const newTool = {
          ...toolData,
          id: toolData.id || 'tool_' + Date.now(),
          isFavorite: false,
          lastUsed: null,
          isBuiltin: false
        };
        this.tools.unshift(newTool);
      }
      this.saveTools();
    }

    deleteTool(id) {
      this.tools = this.tools.filter(t => t.id !== id);
      this.saveTools();
    }

    toggleFavorite(id) {
      const tool = this.tools.find(t => t.id === id);
      if (tool) {
        tool.isFavorite = !tool.isFavorite;
        this.saveTools();
      }
    }

    recordToolLaunch(id) {
      const tool = this.tools.find(t => t.id === id);
      if (tool) {
        tool.lastUsed = Date.now();
        this.saveTools();
      }
    }

    getFilteredTools() {
      return this.tools.filter(tool => {
        // Category Filter
        if (this.currentCategory === 'favorites') {
          if (!tool.isFavorite) return false;
        } else if (this.currentCategory !== 'all') {
          if (tool.category !== this.currentCategory) return false;
        }

        // Search Query Filter
        if (this.searchQuery.trim() !== '') {
          const q = this.searchQuery.toLowerCase().trim();
          const matchName = tool.name.toLowerCase().includes(q);
          const matchDesc = tool.description.toLowerCase().includes(q);
          const matchUrl = tool.url.toLowerCase().includes(q);
          const matchTags = tool.tags.some(t => t.toLowerCase().includes(q));
          const matchCat = (CATEGORY_NAMES[tool.category] || '').toLowerCase().includes(q);
          return matchName || matchDesc || matchUrl || matchTags || matchCat;
        }

        return true;
      });
    }
  }

  const state = new AppState();

  // Helper Utilities
  function formatTimeAgo(timestamp) {
    if (!timestamp) return 'Hiç açılmadı';
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'Az önce';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} dk önce`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} saat önce`;
    const days = Math.floor(hours / 24);
    return `${days} gün önce`;
  }

  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // DOM Renderers
  function renderStats() {
    const totalEl = document.getElementById('stat-total-tools');
    const activeEl = document.getElementById('stat-active-tools');
    const favsEl = document.getElementById('stat-favorites-count');

    if (totalEl) totalEl.textContent = state.tools.length;
    if (activeEl) {
      const activeCount = state.tools.filter(t => t.status === 'online' || t.status === 'local').length;
      activeEl.textContent = activeCount;
    }
    if (favsEl) {
      const favCount = state.tools.filter(t => t.isFavorite).length;
      favsEl.textContent = favCount;
    }
  }

  function renderToolsGrid() {
    const container = document.getElementById('tools-grid-container');
    const emptyState = document.getElementById('empty-state');
    const badgeEl = document.getElementById('visible-count-badge');

    if (!container) return;

    const filtered = state.getFilteredTools();

    if (badgeEl) {
      badgeEl.textContent = `${filtered.length} Araç`;
    }

    if (filtered.length === 0) {
      container.innerHTML = '';
      if (emptyState) emptyState.style.display = 'flex';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    container.innerHTML = filtered.map(tool => {
      const iconSvg = ICONS[tool.icon] || ICONS.book;
      const statusDotClass = tool.status;
      const statusText = STATUS_LABELS[tool.status] || tool.status;
      const starIcon = tool.isFavorite ? ICONS.star : ICONS.starOutline;
      const starActiveClass = tool.isFavorite ? 'starred' : '';
      const tagsHtml = tool.tags.map(tag => `<span class="tag">#${tag}</span>`).join('');

      return `
        <div class="tool-card" data-id="${tool.id}" onclick="window.app.previewTool('${tool.id}')">
          <div class="tool-card-top">
            <div class="tool-icon-wrap color-${tool.color || 'indigo'}">
              ${iconSvg}
            </div>
            <div class="tool-card-badges">
              <span class="badge badge-status-${tool.status}">
                <span class="status-indicator-dot ${statusDotClass}"></span>
                ${statusText}
              </span>
              <button class="btn-star ${starActiveClass}" 
                onclick="event.stopPropagation(); window.app.toggleFavorite('${tool.id}')" 
                title="${tool.isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}">
                ${starIcon}
              </button>
            </div>
          </div>

          <div class="tool-card-body">
            <h3 class="tool-card-title">
              ${tool.name}
            </h3>
            <p class="tool-card-desc">${tool.description}</p>
            <div class="tool-card-tags">
              ${tagsHtml}
            </div>
          </div>

          <div class="tool-card-footer">
            <span class="tool-card-url" title="${tool.url}">${tool.url.replace(/^https?:\/\//, '')}</span>
            <div class="tool-card-actions">
              <button class="btn btn-sm btn-glass" onclick="event.stopPropagation(); window.app.copyUrl('${tool.url}')" title="Bağlantıyı Kopyala">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              </button>
              <button class="btn btn-sm btn-glass" onclick="event.stopPropagation(); window.app.openEditModal('${tool.id}')" title="Düzenle">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              </button>
              <a href="${tool.url}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary" onclick="event.stopPropagation(); window.app.launchTool('${tool.id}', '${tool.url}')">
                <span>Aç</span>
                ${ICONS.external}
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Modal Handlers
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'flex';
      const firstInput = modal.querySelector('input, textarea, select');
      if (firstInput) setTimeout(() => firstInput.focus(), 50);
    }
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
    }
  }

  // Command Palette Render & Search
  function renderCommandPalette() {
    const resultsContainer = document.getElementById('cmd-palette-results');
    const input = document.getElementById('cmd-palette-input');
    if (!resultsContainer || !input) return;

    const query = input.value.toLowerCase().trim();

    // Default system actions
    const defaultActions = [
      {
        id: 'act-add-tool',
        name: 'Yeni Araç Ekle',
        category: 'İşlem',
        icon: 'sparkles',
        color: 'indigo',
        handler: () => { closeModal('cmd-palette-modal'); window.app.openAddModal(); }
      },
      {
        id: 'act-open-notes',
        name: 'Hızlı Not Defterini Aç / Kapat',
        category: 'Üretkenlik',
        icon: 'layout',
        color: 'emerald',
        handler: () => { closeModal('cmd-palette-modal'); window.app.toggleNotes(); }
      }
    ];

    // Filter tools
    const matchingTools = state.tools.filter(tool => {
      if (!query) return true;
      return (
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.tags.some(t => t.toLowerCase().includes(query)) ||
        (CATEGORY_NAMES[tool.category] || '').toLowerCase().includes(query)
      );
    }).map(tool => ({
      id: `tool-${tool.id}`,
      name: tool.name,
      category: CATEGORY_NAMES[tool.category] || 'Proje',
      desc: tool.description,
      icon: tool.icon,
      color: tool.color,
      handler: () => {
        closeModal('cmd-palette-modal');
        window.app.launchTool(tool.id, tool.url);
        window.open(tool.url, '_blank');
      }
    }));

    const matchingActions = defaultActions.filter(act => {
      if (!query) return true;
      return act.name.toLowerCase().includes(query) || act.category.toLowerCase().includes(query);
    });

    const items = [...matchingTools, ...matchingActions];

    if (items.length === 0) {
      resultsContainer.innerHTML = `
        <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
          Sonuç bulunamadı.
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = items.map((item, index) => {
      const isSelected = index === state.cmdPaletteIndex;
      const iconSvg = ICONS[item.icon] || ICONS.sparkles;
      return `
        <div class="cmd-item ${isSelected ? 'selected' : ''}" data-index="${index}" onclick="window.app.executeCmdIndex(${index})">
          <div class="cmd-item-left">
            <div class="cmd-item-icon color-${item.color || 'indigo'}">
              ${iconSvg}
            </div>
            <div>
              <div class="cmd-item-name">${item.name}</div>
              <div class="cmd-item-cat">${item.category}</div>
            </div>
          </div>
          <kbd class="kbd-shortcut">GİT ↵</kbd>
        </div>
      `;
    }).join('');

    // Attach items to state for keyboard execution
    state.currentCmdItems = items;
  }

  // Public App Controller API
  window.app = {
    openAddModal() {
      const form = document.getElementById('tool-form');
      if (form) form.reset();
      document.getElementById('form-tool-id').value = '';
      document.getElementById('modal-form-title').textContent = 'Yeni Araç / Proje Ekle';
      openModal('tool-form-modal');
    },

    openEditModal(toolId) {
      const tool = state.tools.find(t => t.id === toolId);
      if (!tool) return;

      document.getElementById('form-tool-id').value = tool.id;
      document.getElementById('form-tool-name').value = tool.name;
      document.getElementById('form-tool-url').value = tool.url;
      document.getElementById('form-tool-category').value = tool.category;
      document.getElementById('form-tool-status').value = tool.status;
      document.getElementById('form-tool-desc').value = tool.description;
      document.getElementById('form-tool-tags').value = tool.tags.join(', ');

      const colorInput = document.querySelector(`input[name="tool-color"][value="${tool.color || 'indigo'}"]`);
      if (colorInput) colorInput.checked = true;

      document.getElementById('modal-form-title').textContent = `Düzenle: ${tool.name}`;
      openModal('tool-form-modal');
    },

    previewTool(toolId) {
      const tool = state.tools.find(t => t.id === toolId);
      if (!tool) return;

      const titleEl = document.getElementById('detail-title');
      const urlEl = document.getElementById('detail-url-text');
      const descEl = document.getElementById('detail-desc-text');
      const catEl = document.getElementById('detail-category-text');
      const statEl = document.getElementById('detail-status-text');
      const lastUsedEl = document.getElementById('detail-lastused-text');
      const tagsWrap = document.getElementById('detail-tags-container');
      const iconWrap = document.getElementById('detail-icon-wrap');
      const launchBtn = document.getElementById('detail-launch-btn');
      const editBtn = document.getElementById('detail-edit-btn');

      if (titleEl) titleEl.textContent = tool.name;
      if (urlEl) urlEl.textContent = tool.url;
      if (descEl) descEl.textContent = tool.description;
      if (catEl) catEl.textContent = CATEGORY_NAMES[tool.category] || tool.category;
      if (statEl) statEl.textContent = STATUS_LABELS[tool.status] || tool.status;
      if (lastUsedEl) lastUsedEl.textContent = formatTimeAgo(tool.lastUsed);

      if (iconWrap) {
        iconWrap.className = `detail-icon-circle color-${tool.color || 'indigo'}`;
        iconWrap.innerHTML = ICONS[tool.icon] || ICONS.book;
      }

      if (tagsWrap) {
        tagsWrap.innerHTML = tool.tags.map(t => `<span class="tag">#${t}</span>`).join('');
      }

      if (launchBtn) {
        launchBtn.onclick = () => {
          this.launchTool(tool.id, tool.url);
          window.open(tool.url, '_blank');
        };
      }

      if (editBtn) {
        editBtn.onclick = () => {
          closeModal('tool-detail-modal');
          this.openEditModal(tool.id);
        };
      }

      openModal('tool-detail-modal');
    },

    launchTool(toolId, url) {
      state.recordToolLaunch(toolId);
      renderStats();
    },

    copyUrl(url) {
      const copyFallback = (text) => {
        try {
          const textarea = document.createElement('textarea');
          textarea.value = text;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          showToast(`Kopyalandı: ${text}`, 'success');
        } catch (e) {
          showToast('Kopyalama başarısız oldu.', 'info');
        }
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url).then(() => {
          showToast(`Kopyalandı: ${url}`, 'success');
        }).catch(() => {
          copyFallback(url);
        });
      } else {
        copyFallback(url);
      }
    },

    toggleFavorite(toolId) {
      state.toggleFavorite(toolId);
      renderToolsGrid();
      renderStats();
      showToast('Favori durumu güncellendi.', 'success');
    },

    toggleNotes() {
      const drawer = document.getElementById('notes-drawer');
      if (drawer) {
        drawer.classList.toggle('open');
        if (drawer.classList.contains('open')) {
          const textarea = document.getElementById('quick-notes-textarea');
          if (textarea) textarea.focus();
        }
      }
    },

    closeModal(modalId) {
      closeModal(modalId);
    },

    executeCmdIndex(index) {
      if (state.currentCmdItems && state.currentCmdItems[index]) {
        state.currentCmdItems[index].handler();
      }
    }
  };

  // Event Listeners Initialization
  function initEventListeners() {
    // Notes Toggle Button & Close
    const notesBtn = document.getElementById('btn-notes-toggle');
    const notesCloseBtn = document.getElementById('close-notes-btn');
    const notesTextarea = document.getElementById('quick-notes-textarea');
    const notesClearBtn = document.getElementById('clear-notes-btn');
    const notesStatus = document.getElementById('notes-save-status');

    if (notesBtn) notesBtn.addEventListener('click', () => window.app.toggleNotes());
    if (notesCloseBtn) notesCloseBtn.addEventListener('click', () => window.app.toggleNotes());

    // Load saved notes
    if (notesTextarea) {
      notesTextarea.value = localStorage.getItem(STORAGE_KEY_NOTES) || '';
      notesTextarea.addEventListener('input', () => {
        localStorage.setItem(STORAGE_KEY_NOTES, notesTextarea.value);
        if (notesStatus) {
          notesStatus.textContent = 'Kaydedildi...';
          setTimeout(() => { notesStatus.textContent = 'Otomatik kaydedildi'; }, 1000);
        }
      });
    }

    if (notesClearBtn && notesTextarea) {
      notesClearBtn.addEventListener('click', () => {
        if (confirm('Notları temizlemek istediğinize emin misiniz?')) {
          notesTextarea.value = '';
          localStorage.removeItem(STORAGE_KEY_NOTES);
          showToast('Notlar temizlendi.', 'info');
        }
      });
    }

    // Add Tool Header Button
    const addBtn = document.getElementById('btn-add-tool');
    if (addBtn) {
      addBtn.addEventListener('click', () => window.app.openAddModal());
    }

    // Category Filter Pills
    const catContainer = document.getElementById('categories-container');
    if (catContainer) {
      catContainer.addEventListener('click', (e) => {
        const pill = e.target.closest('.cat-pill');
        if (pill) {
          document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          state.currentCategory = pill.getAttribute('data-category') || 'all';
          renderToolsGrid();
        }
      });
    }

    // Inline Search Input
    const inlineSearch = document.getElementById('inline-search-input');
    const clearSearch = document.getElementById('clear-search-btn');

    if (inlineSearch) {
      inlineSearch.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        if (clearSearch) {
          clearSearch.style.display = state.searchQuery.length > 0 ? 'block' : 'none';
        }
        renderToolsGrid();
      });
    }

    if (clearSearch && inlineSearch) {
      clearSearch.addEventListener('click', () => {
        inlineSearch.value = '';
        state.searchQuery = '';
        clearSearch.style.display = 'none';
        renderToolsGrid();
      });
    }

    // View Toggle Buttons (Grid vs List)
    const gridBtn = document.getElementById('view-grid-btn');
    const listBtn = document.getElementById('view-list-btn');
    const toolsGrid = document.getElementById('tools-grid-container');

    function setView(mode) {
      state.viewMode = mode;
      localStorage.setItem(STORAGE_KEY_VIEW, mode);
      if (mode === 'list') {
        if (gridBtn) gridBtn.classList.remove('active');
        if (listBtn) listBtn.classList.add('active');
        if (toolsGrid) {
          toolsGrid.classList.remove('view-grid');
          toolsGrid.classList.add('view-list');
        }
      } else {
        if (listBtn) listBtn.classList.remove('active');
        if (gridBtn) gridBtn.classList.add('active');
        if (toolsGrid) {
          toolsGrid.classList.remove('view-list');
          toolsGrid.classList.add('view-grid');
        }
      }
    }

    if (gridBtn) gridBtn.addEventListener('click', () => setView('grid'));
    if (listBtn) listBtn.addEventListener('click', () => setView('list'));

    // Modal Form Submission
    const toolForm = document.getElementById('tool-form');
    if (toolForm) {
      toolForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('form-tool-id').value;
        const name = document.getElementById('form-tool-name').value.trim();
        const url = document.getElementById('form-tool-url').value.trim();
        const category = document.getElementById('form-tool-category').value;
        const status = document.getElementById('form-tool-status').value;
        const description = document.getElementById('form-tool-desc').value.trim();
        const rawTags = document.getElementById('form-tool-tags').value;
        const selectedColor = document.querySelector('input[name="tool-color"]:checked')?.value || 'indigo';

        const tags = rawTags
          .split(',')
          .map(t => t.trim())
          .filter(t => t.length > 0);

        // Derive icon
        let icon = 'sparkles';
        if (category === 'egitim') icon = 'book';
        else if (category === 'developer') icon = 'code';
        else if (category === 'productivity') icon = 'file-text';
        else if (category === 'design') icon = 'palette';

        state.addOrUpdateTool({
          id: id || undefined,
          name,
          url,
          category,
          status,
          description: description || 'Özel eklenen web aracı.',
          tags: tags.length > 0 ? tags : ['Web', 'Araç'],
          color: selectedColor,
          icon
        });

        closeModal('tool-form-modal');
        renderToolsGrid();
        renderStats();
        showToast(`'${name}' başarıyla kaydedildi!`, 'success');
      });
    }

    // Command Palette Trigger & Events
    const cmdTrigger = document.getElementById('cmd-k-trigger');
    const cmdModal = document.getElementById('cmd-palette-modal');
    const cmdInput = document.getElementById('cmd-palette-input');

    function openCmdPalette() {
      if (!cmdModal) return;
      cmdModal.style.display = 'flex';
      state.cmdPaletteIndex = 0;
      if (cmdInput) {
        cmdInput.value = '';
        setTimeout(() => cmdInput.focus(), 50);
      }
      renderCommandPalette();
    }

    if (cmdTrigger) {
      cmdTrigger.addEventListener('click', openCmdPalette);
    }

    if (cmdInput) {
      cmdInput.addEventListener('input', () => {
        state.cmdPaletteIndex = 0;
        renderCommandPalette();
      });

      cmdInput.addEventListener('keydown', (e) => {
        const itemsCount = state.currentCmdItems ? state.currentCmdItems.length : 0;
        if (itemsCount === 0) return;

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          state.cmdPaletteIndex = (state.cmdPaletteIndex + 1) % itemsCount;
          renderCommandPalette();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          state.cmdPaletteIndex = (state.cmdPaletteIndex - 1 + itemsCount) % itemsCount;
          renderCommandPalette();
        } else if (e.key === 'Enter') {
          e.preventDefault();
          window.app.executeCmdIndex(state.cmdPaletteIndex);
        }
      });
    }

    // Global Keyboard Shortcuts (Cmd+K, Cmd+N, Cmd+J, Esc)
    window.addEventListener('keydown', (e) => {
      // Cmd/Ctrl + K -> Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openCmdPalette();
      }
      // Cmd/Ctrl + N -> New Tool Modal
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        window.app.openAddModal();
      }
      // Cmd/Ctrl + J -> Quick Notes Toggle
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        window.app.toggleNotes();
      }
      // Escape -> Close all open modals & drawer
      if (e.key === 'Escape') {
        closeModal('cmd-palette-modal');
        closeModal('tool-form-modal');
        closeModal('tool-detail-modal');
        const drawer = document.getElementById('notes-drawer');
        if (drawer && drawer.classList.contains('open')) {
          drawer.classList.remove('open');
        }
      }
    });

    // Close modals on clicking backdrop
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      });
    });
  }

  // App Initialization
  function init() {
    // Render components
    renderStats();
    renderToolsGrid();

    // Set view mode
    const toolsGrid = document.getElementById('tools-grid-container');
    const gridBtn = document.getElementById('view-grid-btn');
    const listBtn = document.getElementById('view-list-btn');

    if (state.viewMode === 'list') {
      if (gridBtn) gridBtn.classList.remove('active');
      if (listBtn) listBtn.classList.add('active');
      if (toolsGrid) {
        toolsGrid.classList.remove('view-grid');
        toolsGrid.classList.add('view-list');
      }
    }

    initEventListeners();
  }

  // Start on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
