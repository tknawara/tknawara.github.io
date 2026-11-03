/* Keep this script in <head> without defer so saved palettes apply before paint.
   Palette IDs live in index.html's select and site.css's data-palette rules.
   Paper is the default and clears the existing tknawara-palette storage key.
   All content and navigation work without JavaScript; only the picker needs it. */
(function () {
  var KEY = "tknawara-palette";
  var DEFAULT = "paper";
  var root = document.documentElement;
  var stored = null;

  try { stored = localStorage.getItem(KEY); } catch (e) { /* Storage is optional. */ }
  if (stored) root.setAttribute("data-palette", stored);

  document.addEventListener("DOMContentLoaded", function () {
    var picker = document.getElementById("palette");
    var themeColor = document.querySelector('meta[name="theme-color"]');
    picker.value = stored || DEFAULT;
    if (!picker.value) picker.value = DEFAULT;

    function apply() {
      if (picker.value === DEFAULT) {
        root.removeAttribute("data-palette");
      } else {
        root.setAttribute("data-palette", picker.value);
      }
      themeColor.setAttribute("content", getComputedStyle(root).getPropertyValue("--bg").trim());
    }

    apply();
    picker.parentElement.hidden = false;
    picker.addEventListener("change", function () {
      apply();
      try {
        if (picker.value === DEFAULT) {
          localStorage.removeItem(KEY);
        } else {
          localStorage.setItem(KEY, picker.value);
        }
      } catch (e) { /* The picker still works when storage is unavailable. */ }
    });
  });
})();
