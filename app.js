// Copy-to-clipboard for elements with a data-copy attribute.
document.querySelectorAll('[data-copy]').forEach((el) => {
  el.addEventListener('click', async () => {
    const text = el.dataset.copy;
    if (!text) return;
    const status = document.getElementById('status');
    let ok = false;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        ok = true;
      } else {
        // Fallback for file:// or plain http
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand('copy');
        ta.remove();
        if (!ok) throw new Error('copy failed');
      }
    } catch {
      ok = false;
    }

    if (ok) {
      el.classList.add('copied');
      if (status) status.textContent = `Kopyalandı: ${text}`;
      clearTimeout(el._copyTimeout);
      el._copyTimeout = setTimeout(() => {
        el.classList.remove('copied');
      }, 2000);
    } else {
      if (status) status.textContent = 'Kopyalanamadı, adresi elle seçin.';
    }
  });
});
