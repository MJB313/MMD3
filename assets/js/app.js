document.addEventListener("DOMContentLoaded", () => {
  /* ================= BURGER MENU ================= */
  const burgerBtn = document.querySelector(".burger-btn");
  const navLinks = document.querySelector(".navLinks");

  if (burgerBtn && navLinks) {
    burgerBtn.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  /* ================= DROPDOWN NAV ================= */
  const dropdownItems = document.querySelectorAll(".galleri");

  dropdownItems.forEach((item) => {
    const dropdown = item.querySelector(".dropdown");
    if (!dropdown) return;

    // Desktop hover
    item.addEventListener("mouseenter", () => {
      if (window.innerWidth > 1000) dropdown.classList.add("showDropdown");
    });
    item.addEventListener("mouseleave", () => {
      if (window.innerWidth > 1000) dropdown.classList.remove("showDropdown");
    });

    // Mobile click
    item.addEventListener("click", (e) => {
      if (window.innerWidth <= 1000) {
        if (e.target.closest(".dropdown")) return;
        e.preventDefault();

        dropdownItems.forEach((other) => {
          if (other !== item) {
            other.querySelector(".dropdown")?.classList.remove("showDropdown");
          }
        });

        dropdown.classList.toggle("showDropdown");
      }
    });
  });

  // Close mobile dropdowns when resizing to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1000) {
      dropdownItems.forEach((item) => {
        const dropdown = item.querySelector(".dropdown");
        if (dropdown) dropdown.classList.remove("showDropdown");
      });
    }
  });

  /* ================= NAVIGATION SCROLL BEHAVIOR ================= */
  const nav = document.querySelector(".forsideGlobalNavigation");
  let lastScrollY = window.scrollY;
  let scrollTimeout;

  window.addEventListener("scroll", () => {
    const current = window.scrollY;
    nav.classList.toggle("scrolled", current > 600);

    if (current > lastScrollY && current > 250) nav.classList.add("hide");
    else nav.classList.remove("hide");

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => nav.classList.remove("hide"), 250);

    lastScrollY = current;
  });

  /* ================= ANDEN NAVIGATION SCROLL ================= */
  const normalNav = document.querySelector(".globalNavigation");
  let normalNavLastScrollY = window.scrollY;
  let normalNavScrollTimeout;

  window.addEventListener("scroll", () => {
    const current = window.scrollY;
    normalNav.classList.toggle("scrolled", current > 100);

    if (current > normalNavLastScrollY && current > 250) normalNav.classList.add("hide");
    else normalNav.classList.remove("hide");

    clearTimeout(normalNavScrollTimeout);
    normalNavScrollTimeout = setTimeout(() => normalNav.classList.remove("hide"), 250);

    normalNavLastScrollY = current;
  });

  /* ================= SLIDER ================= */
  const reviews = document.querySelectorAll(".review");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  if (reviews.length && prevBtn && nextBtn) {
    let current = 0;
    let animating = false;

    reviews.forEach((review, i) => {
      review.style.transition = "transform 0.5s ease";
      review.style.transform = i === current ? "translateX(0)" : "translateX(100%)";
      review.style.zIndex = i === current ? "2" : "1";
      review.style.position = i === current ? "relative" : "absolute";
    });

    prevBtn.style.display = "none";

    function updateArrows() {
      prevBtn.style.display = current === 0 ? "none" : "block";
      nextBtn.style.display = current === reviews.length - 1 ? "none" : "block";
    }

    function showReview(newIndex, direction) {
      if (animating || newIndex === current) return;
      animating = true;

      const currentReview = reviews[current];
      const nextReview = reviews[newIndex];

      nextReview.style.position = "absolute";
      nextReview.style.zIndex = "3";
      nextReview.style.transform = direction === "right" ? "translateX(100%)" : "translateX(-100%)";

      requestAnimationFrame(() => {
        currentReview.style.transform = direction === "right" ? "translateX(-100%)" : "translateX(100%)";
        nextReview.style.transform = "translateX(0)";
      });

      setTimeout(() => {
        currentReview.style.position = "absolute";
        currentReview.style.zIndex = "1";
        nextReview.style.position = "relative";
        nextReview.style.zIndex = "2";
        current = newIndex;
        animating = false;
        updateArrows();
      }, 500);
    }

    nextBtn.addEventListener("click", () => {
      if (current < reviews.length - 1) showReview(current + 1, "right");
    });

    prevBtn.addEventListener("click", () => {
      if (current > 0) showReview(current - 1, "left");
    });
  }

  /* ================= GALLERY MODALS ================= */
  const pictures = Array.from(document.querySelectorAll('.galleri_billede_active'));
  const modal = document.getElementById('globalModal');
  const modalImage = document.getElementById('modalImage');
  const closeBtn = modal.querySelector('.buttonClose');
  const leftArrow = modal.querySelector('.modal-prev');
  const rightArrow = modal.querySelector('.modal-next');

  let currentIndex = 0;

  // Open modal
  pictures.forEach((pic, index) => {
    pic.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = index;
      const img = pic.querySelector('img');
      modalImage.src = img.src;
      modal.classList.add('active');
    });
  });

  // Close modal
  closeBtn.addEventListener('click', () => modal.classList.remove('active'));

  // Click outside modal box closes it
  modal.addEventListener('click', (e) => {
    if (!e.target.closest('.modal_box')) {
      modal.classList.remove('active');
    }
  });

  // Navigation arrows
  leftArrow.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + pictures.length) % pictures.length;
    modalImage.src = pictures[currentIndex].querySelector('img').src;
  });

  rightArrow.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % pictures.length;
    modalImage.src = pictures[currentIndex].querySelector('img').src;
  });

});
