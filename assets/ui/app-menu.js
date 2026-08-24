(() => {
  const closePanels = (menu) => {
    menu.querySelectorAll(".app-menu-item[data-app-menu-panel]").forEach((button) => {
      button.classList.remove("is-active");
      button.setAttribute("aria-expanded", "false");
    });
    menu.querySelectorAll(".app-menu-panel[data-app-menu-popup]").forEach((panel) => { panel.hidden = true; });
  };

  document.querySelectorAll("[data-app-menu]").forEach((menu) => {
    menu.querySelectorAll(".app-menu-item[data-app-menu-panel]").forEach((button) => {
      button.addEventListener("click", () => {
        const panelId = button.dataset.appMenuPanel;
        const willOpen = button.getAttribute("aria-expanded") !== "true";
        closePanels(menu);
        if (!willOpen) return;
        const panel = menu.querySelector(`.app-menu-panel[data-app-menu-popup="${CSS.escape(panelId)}"]`);
        button.classList.add("is-active");
        button.setAttribute("aria-expanded", "true");
        if (panel) panel.hidden = false;
      });
    });
    new MutationObserver(() => {
      if (menu.getAttribute("aria-hidden") === "true") closePanels(menu);
    }).observe(menu, { attributes: true, attributeFilter: ["aria-hidden"] });

    menu.querySelector("#menuCloseButton")?.addEventListener("click", () => closePanels(menu));
    document.getElementById("menuOverlay")?.addEventListener("click", () => closePanels(menu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closePanels(menu);
    });
  });
})();
