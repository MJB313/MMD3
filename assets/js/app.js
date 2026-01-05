document.addEventListener("DOMContentLoaded", () => {

// Burger menu
  const burgerBtn = document.querySelector(".burger-btn");
  const navLinks = document.querySelector(".navLinks");

  if (burgerBtn && navLinks) {
    burgerBtn.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

// Mobile dropdown nav
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

  // Accodion

// Her henter vi createApp fra Vue
const { createApp } = Vue;

// Her opretter vi Vue-appen
createApp({

  // data() returnerer de data, som Vue kan bruge i vores HTML
  data() {
    return {
      // Liste med spørgsmål og svar, samt en open-state for hver, som skal bruges til at toggle, så den går fra at være falsk til sand.
      faqData: [
        {
          spoergsmaal: "Hvor mange billeder får vi - og hvornår?",
          svar: "Jeg har ikke noget bestemt antal billeder jeg leverer. Jeg tager det antal billeder som jeg har brug for, for at dække den tid jeg er booket. Booker du mig for en hel dag, vil du typisk modtage omkring 500 færdigredigerede billeder. Jeg leverer altid jeres billeder senest 14 dage efter brylluppet.",
          open: false 
        },
        {
          spoergsmaal: "Hvad sker der hvis fotografen bliver syg?",
          svar: "Jeg har indtil videre fotograferet masser af bryllupper og har endnu ikke måttet melde afbud. Hvis uheldet skulle være ude, er jeg med i et fotonetværk med 5 andre fotografer, hvor vi hjælper hinanden ved for eksempel sygdom. Så der vil altid komme en fotograf. Det kan jeg garantere.",
          open: false
        },
        {
          spoergsmaal: "Hvad er inkluderet i prisen?",
          svar: 'Mine priser starter ved 6.500-, og alle pakker inkluderer redigering, online galleri og kørsel. Så den pris I ser, er den pris I skal betale. Se mine pakkeløsninger her: <a href="priser.html">link til pakker</a>',
          open: false
        },
        {
          spoergsmaal: "Hvordan fungerer booking og betaling?",
          svar: "Når I er klar til at booke, sender jeg en kort ordrebekræftelse. Jeg opkræver et depositum på 1.500,- ved booking. Restbeløbet betales efter brylluppet og inden udlevering af de færdige billeder. Så er alt klart og professionelt fra start til slut.",
          open: false
        },
        {
          spoergsmaal: "Kan vi mødes før vi beslutter os?",
          svar: "Meget gerne. Et uforpligtende møde – online eller fysisk – er en god måde at lære hinanden at kende og sikre, at kemien passer.",
          open: false
        },
        {
          spoergsmaal: "Må vi se et helt bryllup som du har fotograferet?",
          svar: "Selvfølgelig. Jeg sender gerne et komplet galleri, så I kan se, hvordan jeg dækker hele dagen – ikke kun højdepunkterne.",
          open: false
        },
        {
          spoergsmaal: "Hvordan foregår par-portrætterne - skal vi posere meget?",
          svar: "Jeg guider jer lidt, men holder det afslappet og naturligt. En af mine vigtigste opgaver er at skabe en god stemning, så at I ikke tænker over at I bliver fotograferet. Det vigtigste er, at I er jer selv – Så klarer jeg resten.",
          open: false
        },
        {
          spoergsmaal: "Hvor lang tid skal vi sætte af til parfotograferingen?",
          svar: "Cirka 30–45 minutter plejer at være nok, gerne i et roligt tidsrum, fx lige efter vielsen. Jeg hjælper jer med at lægge det ind i jeres tidsplan.",
          open: false
        },
        {
          spoergsmaal: "Hvordan modtager vi billederne?",
          svar: "I får et link hvor I kan downloade billederne i høj opløsning og web opløsning. I kan dele linket med dem I har lyst til. Linket er aktivt i 6 måneder. Derefter skal I kontakte mig igen for at få adgang. Jeg gemmer alle billeder i 5 år.",
          open: false
        }
      ]
    };
  },

  // methods er funktioner, som kan bruges i HTML via @click osv.
  methods: {

    // Toggle-funktion åbner/lukker et spørgsmål
    toggle(index) {
      this.faqData[index].open = !this.faqData[index].open;
    }
  }

  // mount('#app') binder Vue til et HTML-element med id="app"
}).mount('#app');



  /* ================= SLIDER AI ================= */
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


});

