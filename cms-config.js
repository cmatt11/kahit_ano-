const CMS_CONFIG = {
  baseUrl: 'https://kahitanocs.ochina1123.workers.dev/api/public',
  userId: 'PLACEHOLDER_USER_ID'
};

function cmsUrl(resource) {
  return CMS_CONFIG.baseUrl + '/' + CMS_CONFIG.userId + '/' + resource;
}

function applyThemeFromData(s) {
  if (s) {
    var root = document.documentElement;
    if (s.primary_color) root.style.setProperty('--primary-color', s.primary_color);
    if (s.secondary_color) root.style.setProperty('--secondary-color', s.secondary_color);
    if (s.accent_color) root.style.setProperty('--accent-color', s.accent_color);
    if (s.font) root.style.setProperty('--font-family', s.font);
  }
}

function applyThemeSettings() {
  var CACHE_KEY = 'cms_theme_cache';
  var TTL = 5 * 60 * 1000; // 5 minutes

  // Try localStorage cache first
  try {
    var cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      var parsed = JSON.parse(cached);
      if (parsed.ts && (Date.now() - parsed.ts < TTL)) {
        applyThemeFromData(parsed.settings);
        return;
      }
    }
  } catch (e) {}

  // Cache miss or expired - fetch from API
  fetch(cmsUrl('settings'))
    .then(function(r) {
      if (!r.ok) throw new Error('not ok');
      return r.json();
    })
    .then(function(data) {
      var s = data.settings;
      applyThemeFromData(s);
      // Cache the result
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ settings: s, ts: Date.now() }));
      } catch (e) {}
    })
    .catch(function() {}); // silently fail - use defaults
}

// Apply theme on every page load
applyThemeSettings();
