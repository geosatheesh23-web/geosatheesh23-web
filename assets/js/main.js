// ===============================
// ⚡ THEME ENGINE (NO FLICKER)
// ===============================
(function () {
  const saved = localStorage.getItem("theme");

  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const theme = saved ? saved : (systemDark ? "dark" : "light");

  document.documentElement.setAttribute("data-theme", theme);
})();
  

// ===============================
// 🎛️ MAIN LOGIC
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("themeToggle");
  const reset = document.getElementById("themeReset");

  const root = document.documentElement;

  const getTheme = () => root.getAttribute("data-theme");

  const setTheme = (theme, save = true) => {
    root.setAttribute("data-theme", theme);
    if (save) localStorage.setItem("theme", theme);
    updateUI(theme);
  };

  const updateUI = (theme) => {
    if (!toggle) return;

    // Clean UI (no cringe emoji spam)
    toggle.innerHTML = theme === "dark"
      ? `<span class="icon sun"></span>`
      : `<span class="icon moon"></span>`;
  };

  // INIT UI
  updateUI(getTheme());

  // TOGGLE
  if (toggle) {
    toggle.addEventListener("click", () => {
      const newTheme = getTheme() === "dark" ? "light" : "dark";
      setTheme(newTheme, true);
    });
  }

  // RESET (back to system)
  if (reset) {
    reset.addEventListener("click", () => {
      localStorage.removeItem("theme");

      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(systemDark ? "dark" : "light", false);
    });
  }

  // SYSTEM CHANGE (only if no override)
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
    if (!localStorage.getItem("theme")) {
      setTheme(e.matches ? "dark" : "light", false);
    }
  });
});
