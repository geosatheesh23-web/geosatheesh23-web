(function () {
  const saved = localStorage.getItem("theme");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved ? saved : (systemDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
})();

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("themeToggle");
  const root = document.documentElement;

  const updateText = () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    toggle.textContent = isDark ? "☀️ Day" : "🌙 Night";
  };

  updateText();

  toggle.addEventListener("click", () => {
    const newTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateText();
  });
});
