/* tknawara.dev palette picker — same mechanism as rootle.dev/gripsack.dev:
   palettes are pure CSS (html[data-palette] blocks in site.css); this sets
   the attribute and persists the choice. No dependencies. */
(function () {
  var KEY = "tknawara-palette";
  var DEFAULT = "catppuccin-mocha";

  function apply(name) {
    if (name && name !== DEFAULT) {
      document.documentElement.setAttribute("data-palette", name);
    } else {
      document.documentElement.removeAttribute("data-palette");
    }
    var buttons = document.querySelectorAll("[data-set-palette]");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.toggle(
        "active",
        buttons[i].getAttribute("data-set-palette") === (name || DEFAULT)
      );
    }
  }

  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) { /* private mode */ }
  apply(stored);

  document.addEventListener("click", function (ev) {
    var target = ev.target;
    var pal = target.closest ? target.closest("[data-set-palette]") : null;
    if (!pal) return;
    var name = pal.getAttribute("data-set-palette");
    apply(name);
    try { localStorage.setItem(KEY, name === DEFAULT ? "" : name); } catch (e) {}
  });
})();
