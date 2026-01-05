document.addEventListener("DOMContentLoaded", () => {

  /* ================= BURGER MENU ================= */
  const burgerBtn = document.querySelector(".burger-btn");
  const navLinks = document.querySelector(".navLinks");

  if (burgerBtn && navLinks) {
    burgerBtn.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  /* ================= MOBILE DROPDOWN NAV ================= */
  const dropdownItems = document.querySelectorAll(".galleri");

  dropdownItems.forEach(item => {
    const dropdown = item.querySelector(".dropdown");
    if (!dropdown) return;

    item.addEventListener("click", e => {
      if (window.innerWidth <= 1400) {

        if (e.target.closest(".dropdown")) return;

        e.preventDefault();

        dropdownItems.forEach(other => {
          if (other !== item) {
            other.querySelector(".dropdown")?.classList.remove("showDropdown");
          }
        });

        dropdown.classList.toggle("showDropdown");
      }
    });
  });

  /* ================= NAVIGATION SCROLL BEHAVIOR ================= */
  const nav = document.querySelector(".globalNavigation");

  let lastScrollY = window.scrollY;
  let scrollTimeout;

  window.addEventListener("scroll", () => {
    const current = window.scrollY;

    nav.classList.toggle("scrolled", current > 600);

    if (current > lastScrollY && current > 150) {
      nav.classList.add("hide");
    } else {
      nav.classList.remove("hide");
    }

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      nav.classList.remove("hide");
    }, 150);

    lastScrollY = current;
  });

  /* ================= SLIDER ================= */
  const reviews = document.querySelectorAll(".review");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  if (reviews.length && prevBtn && nextBtn) {
    let current = 0;

    reviews.forEach((review, i) => {
      review.style.transition = "transform 0.5s ease";

      if (i === current) {
        review.style.transform = "translateX(0)";
        review.style.zIndex = "2";
      } else {
        review.style.transform = "translateX(100%)";
        review.style.zIndex = "1";
      }
    });

    function showReview(newIndex, direction) {
      if (newIndex === current) return;

      const currentReview = reviews[current];
      const nextReview = reviews[newIndex];

      nextReview.style.zIndex = "3";
      nextReview.style.transform =
        direction === "right" ? "translateX(100%)" : "translateX(-100%)";

      requestAnimationFrame(() => {
        currentReview.style.transform =
          direction === "right" ? "translateX(-100%)" : "translateX(100%)";
        nextReview.style.transform = "translateX(0)";
      });

      setTimeout(() => {
        currentReview.style.zIndex = "1";
        nextReview.style.zIndex = "2";
      }, 500);

      current = newIndex;
    }

    nextBtn.addEventListener("click", () => {
      showReview((current + 1) % reviews.length, "right");
    });

    prevBtn.addEventListener("click", () => {
      showReview((current - 1 + reviews.length) % reviews.length, "left");
    });
  }

  /* ================= GALLERY MODALS ================= */
const pictures = Array.from(document.querySelectorAll('.galleri_billede_active'));
const modal = document.getElementById('globalModal');
const modalImage = document.getElementById('modalImage');
const closeBtn = modal.querySelector('.buttonClose');
const leftArrow = modal.querySelector('.arrow-left');
const rightArrow = modal.querySelector('.arrow-right');

let currentIndex = 0;

// Open modal
pictures.forEach((pic, index) => {
  pic.addEventListener('click', () => {
    currentIndex = index;
    const img = pic.querySelector('img');
    modalImage.src = img.src;
    modal.classList.add('active');
  });
});

// Close modal
closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
});

// Click outside modal box closes it
modal.addEventListener('click', e => {
  if (!e.target.closest('.modal_box')) {
    modal.classList.remove('active');
  }
});

// Navigation arrows
leftArrow.addEventListener('click', e => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + pictures.length) % pictures.length;
  modalImage.src = pictures[currentIndex].querySelector('img').src;
});

rightArrow.addEventListener('click', e => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % pictures.length;
  modalImage.src = pictures[currentIndex].querySelector('img').src;
});

});
