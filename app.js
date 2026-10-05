/**
 * bbf-asistan — Main Application Logic
 *
 * Theme Toggle Shortcut:
 * - Windows/Linux: Ctrl + Shift + O + P
 * - macOS: Cmd + Shift + O + P
 */

(function () {
  'use strict';

  const STORAGE_KEY_THEME = 'bbf_theme';

  // Toast notification helper for Tema
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

  // Copy to clipboard with graceful fallback
  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (e) {}
    }
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const successful = document.execCommand('copy');
      textarea.remove();
      return successful;
    } catch (e) {
      return false;
    }
  }

  // Theme management
  function isTemaActive() {
    return document.documentElement.getAttribute('data-theme') === 'tema';
  }

  function setTheme(theme) {
    if (theme === 'tema') {
      document.documentElement.setAttribute('data-theme', 'tema');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    try {
      localStorage.setItem(STORAGE_KEY_THEME, theme);
    } catch (e) {}
  }

  function toggleTheme() {
    const nextTheme = isTemaActive() ? 'default' : 'tema';
    setTheme(nextTheme);
    if (nextTheme === 'tema') {
      showToast('Zengin tema aktif edildi.', 'info');
    }
  }

  // Handle Copy actions
  function initCopyHandlers() {
    // Copy buttons
    document.querySelectorAll('.copy-btn').forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const text = btn.dataset.copy;
        const status = document.getElementById('status');
        const ok = await copyText(text);

        if (ok) {
          btn.textContent = 'Kopyalandı ✓';
          if (status) status.textContent = `Kopyalandı: ${text}`;
          if (isTemaActive()) showToast(`Kopyalandı: ${text}`, 'success');
        } else {
          btn.textContent = 'Kopyalanamadı';
          if (status) status.textContent = 'Kopyalanamadı, adresi elle seçin.';
          if (isTemaActive()) showToast('Kopyalama başarısız oldu.', 'info');
        }
        setTimeout(() => { btn.textContent = 'Kopyala'; }, 2000);
      });
    });

    // Copy card (Yazıcı card in rich tema mode)
    const yaziciCard = document.getElementById('yazici-card');
    if (yaziciCard) {
      const handleCardCopy = async (e) => {
        // Only if not clicking directly on child button which has own listener
        if (e.target && e.target.classList.contains('copy-btn')) return;

        const text = yaziciCard.dataset.copy || 'https://160.75.52.13';
        const ok = await copyText(text);
        if (isTemaActive()) {
          showToast(ok ? `Kopyalandı: ${text}` : 'Kopyalama başarısız oldu.', ok ? 'success' : 'info');
        } else {
          const btn = yaziciCard.querySelector('.copy-btn');
          const status = document.getElementById('status');
          if (btn) {
            btn.textContent = ok ? 'Kopyalandı ✓' : 'Kopyalanamadı';
            setTimeout(() => { btn.textContent = 'Kopyala'; }, 2000);
          }
          if (status) {
            status.textContent = ok ? `Kopyalandı: ${text}` : 'Kopyalanamadı, adresi elle seçin.';
          }
        }
      };

      yaziciCard.addEventListener('click', handleCardCopy);
      yaziciCard.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardCopy(e);
        }
      });
    }
  }

  // Keyboard shortcut listener:
  // Windows/Linux: Ctrl + Shift + O + P
  // macOS: Cmd + Shift + O + P
  const pressedKeys = new Set();
  let lastOpressTime = 0;
  let lastPpressTime = 0;

  window.addEventListener('keydown', (e) => {
    const isModifier = e.ctrlKey || e.metaKey;
    const isShift = e.shiftKey;

    pressedKeys.add(e.code);

    if (isModifier && isShift) {
      const isKeyO = e.code === 'KeyO' || e.key === 'o' || e.key === 'O' || e.key === 'ö' || e.key === 'Ö';
      const isKeyP = e.code === 'KeyP' || e.key === 'p' || e.key === 'P';

      const now = Date.now();
      if (isKeyO) {
        lastOpressTime = now;
        e.preventDefault();
      }
      if (isKeyP) {
        lastPpressTime = now;
        e.preventDefault();
      }

      const bothHeld = (pressedKeys.has('KeyO') || isKeyO) && (pressedKeys.has('KeyP') || isKeyP);
      const inSequence = Math.abs(lastOpressTime - lastPpressTime) < 2000 && (lastOpressTime > 0 && lastPpressTime > 0);

      if (bothHeld || (inSequence && (isKeyO || isKeyP))) {
        e.preventDefault();
        lastOpressTime = 0;
        lastPpressTime = 0;
        toggleTheme();
      }
    }
  });

  window.addEventListener('keyup', (e) => {
    pressedKeys.delete(e.code);
  });

  window.addEventListener('blur', () => {
    pressedKeys.clear();
  });

  // Public API
  window.app = {
    setTheme,
    toggleTheme,
    copyUrl(url) {
      copyText(url).then((ok) => {
        if (isTemaActive()) {
          showToast(ok ? `Kopyalandı: ${url}` : 'Kopyalama başarısız oldu.', ok ? 'success' : 'info');
        }
      });
    }
  };

  // Initialization
  function init() {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY_THEME);
      if (savedTheme === 'tema') {
        setTheme('tema');
      }
    } catch (e) {}

    initCopyHandlers();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
