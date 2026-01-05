document.addEventListener("DOMContentLoaded", () => {
  /* ================= BURGER MENU ================= */
  const burgerBtn = document.querySelector(".burger-btn");
  const navLinks = document.querySelector(".navLinks");

  // Hvis burgerknappen og navigationen findes
  if (burgerBtn && navLinks) {
    // Toggle visning af menu når burgerknappen klikkes
    burgerBtn.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  /* ================= MOBILE DROPDOWN NAV ================= */
  const dropdownItems = document.querySelectorAll(".galleri");

  dropdownItems.forEach((item) => {
    const dropdown = item.querySelector(".dropdown");
    if (!dropdown) return;

    // Klik på menu-element på mobil
    item.addEventListener("click", (e) => {
      if (window.innerWidth <= 1400) {
        // Kun for mindre skærme

        // Ignorer klik hvis det er på dropdown-indholdet
        if (e.target.closest(".dropdown")) return;

        e.preventDefault();

        // Luk alle andre dropdowns
        dropdownItems.forEach((other) => {
          if (other !== item) {
            other.querySelector(".dropdown")?.classList.remove("showDropdown");
          }
        });

        // Toggle visning af den valgte dropdown
        dropdown.classList.toggle("showDropdown");
      }
    });
  });

  /* ================= NAVIGATION SCROLL BEHAVIOR ================= */
  const nav = document.querySelector(".forsideGlobalNavigation");
  let lastScrollY = window.scrollY;
  let scrollTimeout;

  // Scroll-event for forside-navigation
  window.addEventListener("scroll", () => {
    const current = window.scrollY;

    // Tilføj "scrolled" klasse når man scroller mere end 600px
    nav.classList.toggle("scrolled", current > 600);

    // Skjul navigation når man scroller ned
    if (current > lastScrollY && current > 250) {
      nav.classList.add("hide");
    } else {
      nav.classList.remove("hide");
    }

    // Sørg for at menuen vises igen efter kort timeout
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      nav.classList.remove("hide");
    }, 250);

    lastScrollY = current;
  });

  // ================= ANDEN NAVIGATION SCROLL =================
  const normalNav = document.querySelector(".globalNavigation");
  let normalNavLastScrollY = window.scrollY;
  let normalNavScrollTimeout;

  window.addEventListener("scroll", () => {
    const current = window.scrollY;

    // Tilføj "scrolled" tidligere på denne menu
    normalNav.classList.toggle("scrolled", current > 100);

    // Skjul menu når man scroller ned
    if (current > normalNavLastScrollY && current > 250) {
      normalNav.classList.add("hide");
    } else {
      normalNav.classList.remove("hide");
    }

    clearTimeout(normalNavScrollTimeout);
    normalNavScrollTimeout = setTimeout(() => {
      normalNav.classList.remove("hide");
    }, 250);

    normalNavLastScrollY = current;
  });



  /* ================= SLIDER ================= */
const reviews = document.querySelectorAll(".review");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

if (reviews.length && prevBtn && nextBtn) {
  let current = 0;
  let animating = false; // prevent double-clicks during animation

  // Initialize: first review visible, others off-screen
  reviews.forEach((review, i) => {
    review.style.transition = "transform 0.5s ease";
    review.style.transform = i === current ? "translateX(0)" : "translateX(100%)";
    review.style.zIndex = i === current ? "2" : "1";
    review.style.position = i === current ? "relative" : "absolute";
  });

  // Hide left arrow initially (can't go left from first)
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

    // Position next review off-screen
    nextReview.style.position = "absolute";
    nextReview.style.zIndex = "3";
    nextReview.style.transform =
      direction === "right" ? "translateX(100%)" : "translateX(-100%)";

    // Trigger animation
    requestAnimationFrame(() => {
      currentReview.style.transform =
        direction === "right" ? "translateX(-100%)" : "translateX(100%)";
      nextReview.style.transform = "translateX(0)";
    });

    // After animation, reset positions
    setTimeout(() => {
      currentReview.style.position = "absolute";
      currentReview.style.zIndex = "1";

      nextReview.style.position = "relative"; // active review
      nextReview.style.zIndex = "2";

      current = newIndex;
      animating = false;

      updateArrows();
    }, 500); // match CSS transition duration
  }

  // Navigation buttons
  nextBtn.addEventListener("click", () => {
    if (current < reviews.length - 1) {
      showReview(current + 1, "right");
    }
  });

  prevBtn.addEventListener("click", () => {
    if (current > 0) {
      showReview(current - 1, "left");
    }
  });
}


  /* ================= ACCORDION / FAQ ================= */
  const { createApp } = Vue;

  createApp({
    data() {
      return {
        faqData: [
          {
            spoergsmaal: "Hvor mange billeder får vi - og hvornår?",
            svar: "Jeg har ikke noget bestemt antal billeder jeg leverer. Jeg tager det antal billeder som jeg har brug for, for at dække den tid jeg er booket. Booker du mig for en hel dag, vil du typisk modtage omkring 500 færdigredigerede billeder. Jeg leverer altid jeres billeder senest 14 dage efter brylluppet.",
            open: false,
          },
          {
            spoergsmaal: "Hvad sker der hvis fotografen bliver syg?",
            svar: "Jeg har indtil videre fotograferet masser af bryllupper og har endnu ikke måttet melde afbud. Hvis uheldet skulle være ude, er jeg med i et fotonetværk med 5 andre fotografer, hvor vi hjælper hinanden ved for eksempel sygdom. Så der vil altid komme en fotograf. Det kan jeg garantere.",
            open: false,
          },
          {
            spoergsmaal: "Hvad er inkluderet i prisen?",
            svar: 'Mine priser starter ved 6.500-, og alle pakker inkluderer redigering, online galleri og kørsel. Så den pris I ser, er den pris I skal betale. Se mine pakkeløsninger her: <a href="priser.html">link til pakker</a>',
            open: false,
          },
          {
            spoergsmaal: "Hvordan fungerer booking og betaling?",
            svar: "Når I er klar til at booke, sender jeg en kort ordrebekræftelse. Jeg opkræver et depositum på 1.500,- ved booking. Restbeløbet betales efter brylluppet og inden udlevering af de færdige billeder. Så er alt klart og professionelt fra start til slut.",
            open: false,
          },
          {
            spoergsmaal: "Kan vi mødes før vi beslutter os?",
            svar: "Meget gerne. Et uforpligtende møde – online eller fysisk – er en god måde at lære hinanden at kende og sikre, at kemien passer.",
            open: false,
          },
          {
            spoergsmaal: "Må vi se et helt bryllup som du har fotograferet?",
            svar: "Selvfølgelig. Jeg sender gerne et komplet galleri, så I kan se, hvordan jeg dækker hele dagen – ikke kun højdepunkterne.",
            open: false,
          },
          {
            spoergsmaal:
              "Hvordan foregår par-portrætterne - skal vi posere meget?",
            svar: "Jeg guider jer lidt, men holder det afslappet og naturligt. En af mine vigtigste opgaver er at skabe en god stemning, så I ikke tænker over at I bliver fotograferet. Det vigtigste er, at I er jer selv – Så klarer jeg resten.",
            open: false,
          },
          {
            spoergsmaal:
              "Hvor lang tid skal vi sætte af til parfotograferingen?",
            svar: "Cirka 30–45 minutter plejer at være nok, gerne i et roligt tidsrum, fx lige efter vielsen. Jeg hjælper jer med at lægge det ind i jeres tidsplan.",
            open: false,
          },
          {
            spoergsmaal: "Hvordan modtager vi billederne?",
            svar: "I får et link hvor I kan downloade billederne i høj opløsning og web opløsning. I kan dele linket med dem I har lyst til. Linket er aktivt i 6 måneder. Derefter skal I kontakte mig igen for at få adgang. Jeg gemmer alle billeder i 5 år.",
            open: false,
          },
        ],
      };
    },
    methods: {
      // Toggle åbner/lukker FAQ spørgsmål
      toggle(index) {
        this.faqData[index].open = !this.faqData[index].open;
      },
    },
  }).mount("#app");


  /* ================= GALLERY MODALS ================= */
  const pictures = Array.from(
    document.querySelectorAll(".galleri_billede_active")
  );
  const modal = document.getElementById("globalModal");
  const modalImage = document.getElementById("modalImage");
  const closeBtn = modal.querySelector(".buttonClose");
  const leftArrow = modal.querySelector(".modal-prev");
  const rightArrow = modal.querySelector(".modal-next");

  let currentIndex = 0;

  // Åbn modal
  pictures.forEach((pic, index) => {
    pic.addEventListener("click", () => {
      currentIndex = index;
      const img = pic.querySelector("img");
      modalImage.src = img.src;
      modal.classList.add("active");
    });
  });

  // Luk modal
  closeBtn.addEventListener("click", () => modal.classList.remove("active"));

  // Klik udenfor modal lukker den
  modal.addEventListener("click", (e) => {
    if (!e.target.closest(".modal_box")) modal.classList.remove("active");
  });

  // Navigationspile i modal
  leftArrow.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + pictures.length) % pictures.length;
    modalImage.src = pictures[currentIndex].querySelector("img").src;
  });

  rightArrow.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % pictures.length;
    modalImage.src = pictures[currentIndex].querySelector("img").src;
  });
});
