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

    /* ================= Nav highligt ================= */
    const currentPage = window.location.pathname.split("/").pop(); // fx "priser.html"
    const navLinksAll = document.querySelectorAll(".globalNavigation a");

    navLinksAll.forEach((link) => {
      const linkPage = link.getAttribute("href");
      if (linkPage === currentPage) {
        link.classList.add("active");

        // Hvis link er i dropdown, marker også forælder
        const parentLi = link.closest(".galleri");
        if (parentLi) {
          parentLi.querySelector("a").classList.add("active");
        }
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

  if (nav) {
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;

      // Tilføj scrolled class efter 600px
      if (currentScrollY > 600) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }

      // Skjul når man scroller ned, vis når man scroller op
      if (currentScrollY > lastScrollY && currentScrollY > 250) {
        // Scroller ned
        nav.classList.add("hide");
      } else if (currentScrollY < lastScrollY) {
        // Scroller op
        nav.classList.remove("hide");
      }

      lastScrollY = currentScrollY;
    });
  }

  /* ================= ANDEN NAVIGATION SCROLL ================= */
  const normalNav = document.querySelector(".globalNavigation");

  if (normalNav) {
    let normalNavLastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;

      // Tilføj scrolled class efter 100px
      if (currentScrollY > 100) {
        normalNav.classList.add("scrolled");
      } else {
        normalNav.classList.remove("scrolled");
      }

      // Skjul når man scroller ned, vis når man scroller op
      if (currentScrollY > normalNavLastScrollY && currentScrollY > 250) {
        // Scroller ned
        normalNav.classList.add("hide");
      } else if (currentScrollY < normalNavLastScrollY) {
        // Scroller op
        normalNav.classList.remove("hide");
      }

      normalNavLastScrollY = currentScrollY;
    });
  }

  /* ================= To top ================= */
  const toTop = document.querySelector(".back-to-top");

  if (toTop) {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      if (scrollY > 800) {
        toTop.classList.add("visible");
      } else {
        toTop.classList.remove("visible");
      }
    });
  }

  /* ================= SLIDER ================= */
  const reviews = document.querySelectorAll(".review");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  if (reviews.length && prevBtn && nextBtn) {
    let current = 0;
    let animating = false;

    // Initialiser alle reviews
    reviews.forEach((review, i) => {
      review.style.transition = "transform 0.5s ease-in-out";
      if (i === current) {
        review.style.transform = "translateX(0)";
        review.style.zIndex = "2";
        review.classList.add("active");
      } else {
        review.style.transform = "translateX(100%)";
        review.style.zIndex = "1";
        review.classList.remove("active");
      }
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

      // Forbered næste review
      nextReview.style.zIndex = "3";
      nextReview.style.transform =
        direction === "right" ? "translateX(100%)" : "translateX(-100%)";

      // Start animation
      requestAnimationFrame(() => {
        currentReview.style.transform =
          direction === "right" ? "translateX(-100%)" : "translateX(100%)";
        nextReview.style.transform = "translateX(0)";
      });

      // Efter animation er færdig
      setTimeout(() => {
        currentReview.style.zIndex = "1";
        currentReview.classList.remove("active");
        nextReview.style.zIndex = "2";
        nextReview.classList.add("active");
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
  const pictures = Array.from(
    document.querySelectorAll(".galleri_billede_active")
  );
  const modal = document.getElementById("globalModal");
  const modalImage = document.getElementById("modalImage");
  const closeBtn = modal?.querySelector(".buttonClose");
  const leftArrow = modal?.querySelector(".modal-prev");
  const rightArrow = modal?.querySelector(".modal-next");

  if (
    modal &&
    modalImage &&
    closeBtn &&
    leftArrow &&
    rightArrow &&
    pictures.length
  ) {
    let currentIndex = 0;

    // Open modal
    pictures.forEach((pic, index) => {
      pic.addEventListener("click", (e) => {
        e.stopPropagation();
        currentIndex = index;
        const img = pic.querySelector("img");
        modalImage.src = img.src;
        modal.classList.add("active");
      });
    });

    // Close modal function
    function closeModal() {
      modal.classList.remove("active");
    }

    // Navigate to previous image
    function showPrevImage() {
      currentIndex = (currentIndex - 1 + pictures.length) % pictures.length;
      modalImage.src = pictures[currentIndex].querySelector("img").src;
    }

    // Navigate to next image
    function showNextImage() {
      currentIndex = (currentIndex + 1) % pictures.length;
      modalImage.src = pictures[currentIndex].querySelector("img").src;
    }

    // Close modal
    closeBtn.addEventListener("click", closeModal);

    // Click outside modal box closes it
    modal.addEventListener("click", (e) => {
      if (!e.target.closest(".modal_box")) {
        closeModal();
      }
    });

    // Navigation arrows
    leftArrow.addEventListener("click", (e) => {
      e.stopPropagation();
      showPrevImage();
    });

    rightArrow.addEventListener("click", (e) => {
      e.stopPropagation();
      showNextImage();
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      // Tjek om modal er åben
      if (!modal.classList.contains("active")) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        showPrevImage();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        showNextImage();
      } else if (e.key === "Escape") {
        e.preventDefault();
        closeModal();
      }
    });
  }
});
