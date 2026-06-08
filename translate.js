// ===== Translate Toggle =====
(function() {
  let isEnglish = false;

  function createToggleButton() {
    const btn = document.createElement('button');
    btn.id = 'translate-toggle';
    btn.className = 'translate-btn';
    btn.setAttribute('aria-label', 'Toggle English translation');
    btn.innerHTML = '<span class="translate-icon">EN</span>';
    btn.title = 'Translate to English';
    document.body.appendChild(btn);

    btn.addEventListener('click', function() {
      isEnglish = !isEnglish;
      toggleTranslation(isEnglish);
      btn.innerHTML = isEnglish
        ? '<span class="translate-icon">OG</span>'
        : '<span class="translate-icon">EN</span>';
      btn.title = isEnglish ? 'Back to original' : 'Translate to English';
      btn.classList.toggle('active', isEnglish);
    });
  }

  function toggleTranslation(toEnglish) {
    const elements = document.querySelectorAll('[data-en]');
    elements.forEach(function(el) {
      if (toEnglish) {
        if (!el.getAttribute('data-og')) {
          el.setAttribute('data-og', el.innerHTML);
        }
        el.innerHTML = el.getAttribute('data-en');
      } else {
        var original = el.getAttribute('data-og');
        if (original !== null) {
          el.innerHTML = original;
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createToggleButton);
  } else {
    createToggleButton();
  }
})();
