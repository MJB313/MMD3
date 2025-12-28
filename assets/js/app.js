const reviews = document.querySelectorAll('.review');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let current = 0;

// Initialize reviews: only the first one is active, others off-screen
reviews.forEach((review, i) => {
  if (i === current) {
    review.style.transform = 'translateX(0)';
    review.style.zIndex = '2';
  } else {
    review.style.transform = 'translateX(100%)';
    review.style.zIndex = '1';
  }
});

function showReview(newIndex, direction) {
  if (newIndex === current) return;

  const currentReview = reviews[current];
  const nextReview = reviews[newIndex];

  if (direction === 'right') {
    nextReview.style.transform = 'translateX(100%)';
    nextReview.style.zIndex = '3';
    requestAnimationFrame(() => {
      currentReview.style.transform = 'translateX(-100%)';
      nextReview.style.transform = 'translateX(0)';
    });
  } else if (direction === 'left') {
    nextReview.style.transform = 'translateX(-100%)';
    nextReview.style.zIndex = '3';
    requestAnimationFrame(() => {
      currentReview.style.transform = 'translateX(100%)';
      nextReview.style.transform = 'translateX(0)';
    });
  }

  // After animation, reset z-index
  setTimeout(() => {
    currentReview.style.zIndex = '1';
    nextReview.style.zIndex = '2';
  }, 500); // match your CSS transition duration

  current = newIndex;
}

// Button handlers
prevBtn.addEventListener('click', () => {
  let newIndex = (current - 1 + reviews.length) % reviews.length;
  showReview(newIndex, 'left');
});

nextBtn.addEventListener('click', () => {
  let newIndex = (current + 1) % reviews.length;
  showReview(newIndex, 'right');
});
