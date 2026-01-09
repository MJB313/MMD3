document.addEventListener("DOMContentLoaded", () => {
  /* ================= BURGER MENU ================= */
  // fanger elementerne
  const burgerBtn = document.querySelector(".burger-btn");
  const navLinks = document.querySelector(".navLinks");

  // siger, hvis man trykker på navlinks og burger button, at der laves en eventlistener, som toggler classen show.
  if (burgerBtn && navLinks) {
    burgerBtn.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  /* ================= DROPDOWN NAV ================= */
  const dropdownItems = document.querySelectorAll(".galleri");

  // Laver for each loop for dropdown
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
    // Finder den side vi er på ved brug af window location og pop. 
    const currentPage = window.location.pathname.split("/").pop(); // eksempel på side den fanger "priser.html"
    const navLinksAll = document.querySelectorAll(".globalNavigation a");

    // For each loop, der sørger for at det virker på alle links
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

  // Lukker den mobile dropdown, når man er i desktop 
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1000) {
      dropdownItems.forEach((item) => {
        const dropdown = item.querySelector(".dropdown");
        if (dropdown) dropdown.classList.remove("showDropdown");
      });
    }
  });

  /* ================= NAVIGATION SCROLL BEHAVIOR ================= */
  // Samme som næste navigation scroll, fokuseret på forsiden.
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
  // Fanger navigationen
  const normalNav = document.querySelector(".globalNavigation");

  // Laver en if / else statement, som lytter på scroll. Efter 100 forsvinder den og får classen "scrolled"
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

  // Fanger div'en, som har font awesome ikon og tekst i sig. 
  const toTop = document.querySelector(".back-to-top");

  // If / else statement, der laver en eventlistener som lytter på at vi scroller. Efter 800 px på Y aksen, tilføjer vi classen "Visible", som gør knappen synlig. 
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

// Hent alle elementer med klassen "review", samt knapperne til forrige og næste
const reviews = document.querySelectorAll(".review");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

// Tjek at vi har reviews og begge knapper før vi fortsætter
if (reviews.length && prevBtn && nextBtn) {
  let current = 0;          // Index for den aktuelle review
  let animating = false;    // Flag for at forhindre klik under animation

  // Initialiser alle reviews
  reviews.forEach((review, i) => {
    review.style.transition = "transform 0.5s ease-in-out"; // Animation for slide-effekt
    if (i === current) {
      review.style.transform = "translateX(0)"; // Den aktive review vises
      review.style.zIndex = "2";                // Aktiv review over andre
      review.classList.add("active");           // Marker som aktiv
    } else {
      review.style.transform = "translateX(100%)"; // Skub resten ud af skærmen til højre
      review.style.zIndex = "1";                   // Baggrundsplacering
      review.classList.remove("active");           // Fjern aktiv status
    }
  });

  // Skjul "forrige" knappen initialt, da vi er på første review
  prevBtn.style.display = "none";

  // Funktion til at opdatere visningen af pilene
  function updateArrows() {
    prevBtn.style.display = current === 0 ? "none" : "block";               // Skjul hvis første
    nextBtn.style.display = current === reviews.length - 1 ? "none" : "block"; // Skjul hvis sidste
  }

  // Funktion til at vise en ny review med animation
  function showReview(newIndex, direction) {
    if (animating || newIndex === current) return; // Afvis klik under animation eller klik på samme
    animating = true;

    const currentReview = reviews[current]; // Gem den nuværende review
    const nextReview = reviews[newIndex];   // Gem den næste review

    // Forbered næste review før animation
    nextReview.style.zIndex = "3"; // Sørg for den vises ovenpå den nuværende
    nextReview.style.transform =
      direction === "right" ? "translateX(100%)" : "translateX(-100%)"; // Start udenfor skærmen

    // Start animation på næste frame
    requestAnimationFrame(() => {
      currentReview.style.transform =
        direction === "right" ? "translateX(-100%)" : "translateX(100%)"; // Flyt nuværende ud af skærmen
      nextReview.style.transform = "translateX(0)"; // Flyt næste ind i skærmen
    });

    // Når animationen er færdig (500ms)
    setTimeout(() => {
      currentReview.style.zIndex = "1";            // Send den gamle review bagud
      currentReview.classList.remove("active");    // Fjern aktiv status
      nextReview.style.zIndex = "2";               // Aktiv review foran
      nextReview.classList.add("active");          // Marker som aktiv
      current = newIndex;                          // Opdater current index
      animating = false;                            // Animation færdig, klik kan nu registreres
      updateArrows();                              // Opdater pilenes synlighed
    }, 500);
  }

  // Event listener for "næste" knap
  nextBtn.addEventListener("click", () => {
    if (current < reviews.length - 1) showReview(current + 1, "right");
  });

  // Event listener for "forrige" knap
  prevBtn.addEventListener("click", () => {
    if (current > 0) showReview(current - 1, "left");
  });
}


  /* ================= MODALER TIL GALLERIER ================= */

  // Finder alle galleri-billeder, der kan klikkes på
  const pictures = Array.from(
    document.querySelectorAll(".galleri_billede_active")
  );
  // Finder modal-containeren
  const modal = document.getElementById("globalModal");
  // Finder <img>-elementet inde i modalen
  const modalImage = document.getElementById("modalImage");
  // Finder luk-knappen
  const closeBtn = modal?.querySelector(".buttonClose");
  // Finder navigations-pile
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

    // Står for at åbne modalet. I starten lytter man efter et "click" på et billede i modalet, og tilbage class "active" som skal vise modalen på siden.
    pictures.forEach((pic, index) => {
      pic.addEventListener("click", (e) => {
        e.stopPropagation();
        currentIndex = index;
        const img = pic.querySelector("img");
        modalImage.src = img.src;
        modal.classList.add("active");
      });
    });

    // Lukker modalet ved at fjerne 'active'-klassen
    function closeModal() {
      modal.classList.remove("active");
    }

    // Funktionen skal henvise til forrige billede (-1) end billedet man er på (currentIndex), ved klik på pilen til venstre for billedet 
    function showPrevImage() {
      currentIndex = (currentIndex - 1 + pictures.length) % pictures.length;
      modalImage.src = pictures[currentIndex].querySelector("img").src;
    }

    // På samme måde venstre pil fungere, bare og den skal vise det næste billede og ikke det forrige hvilket er derfor "currentIndex = (currentIndex + 1) % pictures.length" har et "+" istedet for et "-".
    function showNextImage() {
      currentIndex = (currentIndex + 1) % pictures.length;
      modalImage.src = pictures[currentIndex].querySelector("img").src;
    }

    // Lytter efter 1 klik på krydset i modalet og lukker det ned.
    closeBtn.addEventListener("click", closeModal);

    // Når man klikker ude fra modalet vil "class= active" forsvinde og dermed vil modalen på siden lukkes ned.
    modal.addEventListener("click", (e) => {
      if (!e.target.closest(".modal_box")) {
        closeModal();
      }
    });

    // Navigation pile
    leftArrow.addEventListener("click", (e) => {
      // Forhindrer at klik lukker modalen
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
