 const carousel   = document.getElementById("carousel");
  const cards      = Array.from(carousel.children);
  const prevBtn    = document.querySelector(".carousel-btn.prev");
  const nextBtn    = document.querySelector(".carousel-btn.next");

  function centerCard(card) {
    const container = carousel.parentElement; // .carousel-container
    const offset = card.offsetLeft - (container.offsetWidth - card.offsetWidth)/2;
    container.scrollTo({ left: offset, behavior: 'smooth' });
  }

  function updateActiveCard() {
    const container = carousel.parentElement;
    const center   = container.scrollLeft + container.offsetWidth/2;

    let closest     = null;
    let minDistance = Infinity;
    let activeIndex = 0;

    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth/2;
      const d = Math.abs(center - cardCenter);
      if (d < minDistance) {
        minDistance = d;
        closest     = card;
        activeIndex = i;
      }
    });

    cards.forEach((card, i) => {
      card.classList.toggle("active", card === closest);

      if (card !== closest) {
        // push left or right
        const side = (i < activeIndex) ? 20 : -20;
        card.style.transform = `scale(0.8) rotateY(${side}deg)`;
        card.style.filter    = 'blur(4px) brightness(0.7)';
        card.style.opacity   = '0.5';
      } else {
        card.style.transform = 'scale(1) rotateY(0deg)';
        card.style.filter    = 'none';
        card.style.opacity   = '1';
      }
    });
  }

  // initial highlight
  updateActiveCard();

  // scroll handlers
  carousel.parentElement.addEventListener("scroll", () =>
    window.requestAnimationFrame(updateActiveCard)
  );
  window.addEventListener("resize", updateActiveCard);

  // arrow handlers
  prevBtn.addEventListener("click", () => {
    const current = carousel.querySelector(".about-card.active");
    const idx     = cards.indexOf(current);
    const prev    = cards[(idx - 1 + cards.length) % cards.length];
    centerCard(prev);
  });
  nextBtn.addEventListener("click", () => {
    const current = carousel.querySelector(".about-card.active");
    const idx     = cards.indexOf(current);
    const next    = cards[(idx + 1) % cards.length];
    centerCard(next);
  });