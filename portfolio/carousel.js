document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const slides = carousel.querySelectorAll('.carousel-slide');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  const currentEl = carousel.querySelector('.carousel-current');
  const totalEl = carousel.querySelector('.carousel-total');
  const dots = carousel.querySelectorAll('.carousel-dot');

  let current = 0;
  const total = slides.length;

  if (totalEl) totalEl.textContent = total;

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    if (currentEl) currentEl.textContent = current + 1;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  // Keyboard navigation when carousel is focused
  carousel.setAttribute('tabindex', '0');
  carousel.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  // Touch / mouse drag
  let startX = 0;
  let isDragging = false;

  function dragStart(x) {
    startX = x;
    isDragging = true;
    track.style.transition = 'none';
  }

  function dragEnd(x) {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = '';
    const diff = startX - x;
    if (Math.abs(diff) > 40) {
      goTo(diff > 0 ? current + 1 : current - 1);
    } else {
      goTo(current); // snap back
    }
  }

  // Touch
  track.addEventListener('touchstart', e => dragStart(e.touches[0].clientX), { passive: true });
  track.addEventListener('touchend',   e => dragEnd(e.changedTouches[0].clientX), { passive: true });

  // Mouse drag
  track.addEventListener('mousedown',  e => { dragStart(e.clientX); e.preventDefault(); });
  track.addEventListener('mouseup',    e => dragEnd(e.clientX));
  track.addEventListener('mouseleave', e => { if (isDragging) dragEnd(e.clientX); });

  // Hide controls & dots if only one slide
  if (total <= 1) {
    const controls = carousel.querySelector('.carousel-controls');
    if (controls) controls.style.display = 'none';
  }

  // Init
  goTo(0);
});
