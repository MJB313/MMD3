// Grab burger button and navLinks
const burgerBtn = document.querySelector(".burger-btn");
const navLinks = document.querySelector(".navLinks");

// Toggle mobile menu
burgerBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Mobile dropdowns
const dropdownItems = document.querySelectorAll(".galleri");

dropdownItems.forEach(item => {
  const dropdown = item.querySelector(".dropdown");
  if (dropdown) {
    item.addEventListener("click", e => {
      if (window.innerWidth <= 1400) {
        e.preventDefault(); // prevent link click
        dropdown.classList.toggle("showDropdown");
      }
    });
  }
});
