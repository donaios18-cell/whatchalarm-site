/* Remembers a language picked in the switcher, and sends a first-time visitor
   on the English home page to their browser's language when the site has it. */
(function () {
  var supported = ['en', 'es', 'de', 'fr', 'ru', 'pt'];
  var key = 'whatchalarm.lang';

  var links = document.querySelectorAll('.langs a[lang]');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function () {
      try { localStorage.setItem(key, this.getAttribute('lang')); } catch (e) {}
    });
  }

  // Only the English home page redirects; the legal pages stay where they
  // were linked from (App Store Connect points at the English ones).
  var root = document.documentElement;
  if (root.lang !== 'en' || !root.hasAttribute('data-home')) return;

  var wanted = null;
  try { wanted = localStorage.getItem(key); } catch (e) {}
  if (!wanted) {
    var prefs = navigator.languages || [navigator.language || 'en'];
    for (var j = 0; j < prefs.length; j++) {
      var code = String(prefs[j]).slice(0, 2).toLowerCase();
      if (supported.indexOf(code) !== -1) { wanted = code; break; }
    }
  }
  if (wanted && wanted !== 'en' && supported.indexOf(wanted) !== -1) {
    location.replace(wanted + '/' + location.hash);
  }
})();
