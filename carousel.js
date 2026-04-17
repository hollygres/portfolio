document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const slides = carousel.querySelectorAll('.carousel-slide');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  const currentEl = carousel.querySelector('.carousel-current');
  const totalEl = carousel.querySelector('.carousel-total');

  let current = 0;
  const total = slides.length;

  if (totalEl) totalEl.textContent = total;

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    if (currentEl) currentEl.textContent = current + 1;
    prevBtn.disabled = false;
    nextBtn.disabled = false;
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  // Hide controls if only one slide
  if (total <= 1) {
    carousel.querySelector('.carousel-controls').style.display = 'none';
  }
});
