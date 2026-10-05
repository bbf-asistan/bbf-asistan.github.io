// Copy-to-clipboard for buttons with a data-copy attribute.
document.querySelectorAll('[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const text = btn.dataset.copy;
    const status = document.getElementById('status');
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for file:// or plain http
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        ta.remove();
        if (!ok) throw new Error('copy failed');
      }
      btn.textContent = 'Kopyalandı ✓';
      status.textContent = `Kopyalandı: ${text}`;
    } catch {
      btn.textContent = 'Kopyalanamadı';
      status.textContent = 'Kopyalanamadı, adresi elle seçin.';
    }
    setTimeout(() => { btn.textContent = 'Kopyala'; }, 2000);
  });
});
