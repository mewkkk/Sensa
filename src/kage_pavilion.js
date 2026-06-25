const menuBox = document.getElementById("menu-box");
const burgerButton = document.getElementById("burger-button");
const photoScroll = document.getElementById("photo-scroll");
const photoMove = document.getElementById("photo-move");
const menuButtons = document.querySelectorAll(".menu-button");
const subMenus = document.querySelectorAll(".sub-menu");

function changeMenu() {
  if (!menuBox) {
    return;
  }

  if (window.scrollY > window.innerHeight * 0.45) {
    menuBox.classList.add("menu-soft");
    return;
  }

  menuBox.classList.remove("menu-soft");
}

function movePhotos() {
  if (!photoScroll || !photoMove || window.innerWidth <= 900) {
    return;
  }

  const place = photoScroll.getBoundingClientRect();
  const start = window.innerHeight * 0.25;
  const end = photoScroll.offsetHeight - window.innerHeight * 0.45;
  const raw = (start - place.top) / end;
  const progress = Math.min(Math.max(raw, 0), 1);
  const distance = photoMove.scrollWidth - window.innerWidth;

  photoMove.style.transform = `translateX(${-distance * progress}px)`;
}

function closeMenus() {
  subMenus.forEach(function (menu) {
    menu.dataset.show = "false";
  });
}

function closeBurger() {
  if (!burgerButton) {
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
  const isOpen = menu.dataset.show === "true";

  closeMenus();

  if (!isOpen) {
    menu.dataset.show = "true";
  }
}

function pageMove() {
  changeMenu();
  movePhotos();
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

window.addEventListener("scroll", pageMove);
window.addEventListener("resize", pageMove);
window.addEventListener("load", pageMove);
