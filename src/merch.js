const menuBox = document.getElementById("menu-box");
const burgerButton = document.getElementById("burger-button");
const menuButtons = document.querySelectorAll(".menu-button");
const subMenus = document.querySelectorAll(".sub-menu");

function changeMenu() {
  if (!menuBox) {
    return;
  }

  if (window.scrollY > window.innerHeight * 0.35) {
    menuBox.classList.add("menu-soft");
    return;
  }

  menuBox.classList.remove("menu-soft");
}

function closeMenus() {
  subMenus.forEach(function (menu) {
    menu.dataset.show = "false";
  });
}

function closeBurger() {
  if (!burgerButton || !menuBox) {
    return;
  }

  menuBox.dataset.open = "false";
  burgerButton.setAttribute("aria-expanded", "false");
}

function toggleBurger() {
  const isOpen = menuBox.dataset.open === "true";

  menuBox.dataset.open = isOpen ? "false" : "true";
  burgerButton.setAttribute("aria-expanded", String(!isOpen));
}

function openMenu(menuId) {
  const menu = document.getElementById(menuId);

  if (!menu) {
    return;
  }

  const isOpen = menu.dataset.show === "true";

  closeMenus();

  if (!isOpen) {
    menu.dataset.show = "true";
  }
}

if (burgerButton) {
  burgerButton.setAttribute("aria-label", "Открыть меню");
  burgerButton.setAttribute("aria-expanded", "false");

  burgerButton.addEventListener("click", function (event) {
    event.stopPropagation();
    toggleBurger();
  });
}

menuButtons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    event.stopPropagation();
    openMenu(button.dataset.menu);
  });
});

subMenus.forEach(function (menu) {
  menu.addEventListener("click", function (event) {
    if (!event.target.closest || !event.target.closest("a")) {
      event.stopPropagation();
    }
  });
});

menuBox.addEventListener("click", function (event) {
  if (event.target.closest && event.target.closest("a")) {
    closeBurger();
  }
});

document.addEventListener("click", function () {
  closeMenus();
  closeBurger();
});

window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeMenus();
    closeBurger();
  }
});

window.addEventListener("scroll", changeMenu);
window.addEventListener("resize", changeMenu);
window.addEventListener("load", changeMenu);
