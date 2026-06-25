const menuBox = document.getElementById("menu-box");
const burgerButton = document.getElementById("burger-button");
const form = document.getElementById("contact-form");
const popup = document.getElementById("popup");
const popupClose = document.getElementById("popup-close");
const menuButtons = document.querySelectorAll(".menu-button");
const subMenus = document.querySelectorAll(".sub-menu");
const milaPlace = document.querySelector(".mila-long");
const milaWords = document.querySelectorAll(".mila-fade");
const aboutPlants = document.querySelectorAll(".about-plant");

function setMenuLook() {
  if (window.scrollY > window.innerHeight * 0.7) {
    menuBox.classList.add("menu-soft");
    return;
  }

  menuBox.classList.remove("menu-soft");
}

function openPopup() {
  popup.dataset.show = "true";
  popup.setAttribute("aria-hidden", "false");
}

function closePopup() {
  popup.dataset.show = "false";
  popup.setAttribute("aria-hidden", "true");
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

function showMilaText() {
  if (!milaPlace || milaWords.length === 0) {
    return;
  }

  const place = milaPlace.getBoundingClientRect();
  const way = Math.max(window.innerHeight * 0.35, 1);
  const raw = (window.innerHeight * 0.92 - place.top) / way;
  const show = Math.min(Math.max(raw, 0), 1);

  milaWords.forEach(function (word, index) {
    const part = Math.min(Math.max(show * 1.35 - index * 0.12, 0), 1);

    word.style.opacity = part;
    word.style.transform = `translateY(${(1 - part) * 3}vh)`;
  });
}

function pageMove() {
  setMenuLook();
  showMilaText();
}

function movePlantLight(plant, event) {
  const place = plant.getBoundingClientRect();
  const x = event.clientX - place.left;
  const y = event.clientY - place.top;

  plant.style.setProperty("--plant-x", `${x}px`);
  plant.style.setProperty("--plant-y", `${y}px`);
  plant.dataset.show = "true";
}

window.addEventListener("scroll", pageMove);
window.addEventListener("load", pageMove);

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

aboutPlants.forEach(function (plant) {
  plant.addEventListener("mousemove", function (event) {
    movePlantLight(plant, event);
  });

  plant.addEventListener("mouseleave", function () {
    plant.dataset.show = "false";
  });
});

document.addEventListener("click", function () {
  closeMenus();
  closeBurger();
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!form.reportValidity()) {
    return;
  }

  window.localStorage.setItem(
    "sensa-form",
    JSON.stringify({
      name: form.elements.namedItem("name").value,
      lastName: form.elements.namedItem("last-name").value,
      email: form.elements.namedItem("email").value,
      comment: form.elements.namedItem("comment").value,
      time: new Date().toISOString(),
    }),
  );

  form.reset();
  openPopup();
});

popupClose.addEventListener("click", closePopup);

popup.addEventListener("click", function (event) {
  if (event.target === popup) {
    closePopup();
  }
});

window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeMenus();
    closeBurger();
  }

  if (event.key === "Escape" && popup.dataset.show === "true") {
    closePopup();
  }
});
