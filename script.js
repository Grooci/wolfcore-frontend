function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const btn = document.querySelector(".menu-btn");
  const isOpen = menu.classList.toggle("active");
  if (btn) btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

// Close the mobile menu after tapping a link
document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("mobileMenu");
  if (!menu) return;
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => menu.classList.remove("active"));
  });
});
