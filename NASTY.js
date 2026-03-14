document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".navbar nav a");
  const sections = document.querySelectorAll("section[id]");
  const cards = document.querySelectorAll(".card, .gallery-box");
  const heroTitle = document.querySelector(".hero h2");
  const heroButtons = document.querySelectorAll(".btn");
  const overlay = document.querySelector(".overlay");

  const originalTitle = heroTitle ? heroTitle.textContent : "";
  if (heroTitle) {
    heroTitle.textContent = "";
    let index = 0;

    function typeTitle() {
      if (index < originalTitle.length) {
        heroTitle.textContent += originalTitle.charAt(index);
        index++;
        setTimeout(typeTitle, 90);
      }
    }

    typeTitle();
  }

  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId.startsWith("#")) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          const navHeight = navbar ? navbar.offsetHeight : 0;
          const targetPosition =
            targetSection.getBoundingClientRect().top + window.scrollY - navHeight + 1;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });
        }
      }
    });
  });

  function updateActiveNav() {
    const navHeight = navbar ? navbar.offsetHeight : 0;
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - navHeight - 50;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  function handleNavbarScroll() {
    if (!navbar) return;

    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  const revealElements = document.querySelectorAll("section, .card, .gallery-box");
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach(el => {
    el.classList.add("hidden-js");
    revealObserver.observe(el);
  });

  cards.forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(800px) rotateX(0) rotateY(0) translateY(0)";
    });
  });

  heroButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.add("pressed");
      setTimeout(() => {
        btn.classList.remove("pressed");
      }, 180);
    });
  });

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    handleNavbarScroll();
    updateActiveNav();

    if (overlay && scrollY < window.innerHeight) {
      overlay.style.transform = `translateY(${scrollY * 0.2}px)`;
    }
  });

  handleNavbarScroll();
  updateActiveNav();
});