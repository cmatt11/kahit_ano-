const CMS_CONFIG = {
  baseUrl: 'https://kahitanocs.ochina1123.workers.dev/api/public',
  userId: 'PLACEHOLDER_USER_ID'
};

function cmsUrl(resource) {
  return CMS_CONFIG.baseUrl + '/' + CMS_CONFIG.userId + '/' + resource;
}

function applyThemeSettings() {
  fetch(cmsUrl('settings'))
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var s = data.settings;
      if (s) {
        var root = document.documentElement;
        if (s.primary_color) root.style.setProperty('--primary-color', s.primary_color);
        if (s.secondary_color) root.style.setProperty('--secondary-color', s.secondary_color);
        if (s.accent_color) root.style.setProperty('--accent-color', s.accent_color);
        if (s.font) root.style.setProperty('--font-family', s.font);
      }
    })
    .catch(function() {}); // silently fail - use defaults
}

// Apply theme on every page load
applyThemeSettings();
