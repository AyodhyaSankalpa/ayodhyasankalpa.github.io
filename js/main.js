const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  document.getElementById('sendBtn').addEventListener('click', function() {
    this.textContent = 'Message Sent ✓';
    this.style.background = '#16a34a';
    setTimeout(() => { this.textContent = 'Send Message →'; this.style.background = ''; }, 3000);
  });

  const tabs = document.querySelectorAll('[data-target]'),
        tabContents = document.querySelectorAll('.qualification-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = document.querySelector(tab.dataset.target);

      tabContents.forEach(tc => tc.classList.remove('active'));
      target.classList.add('active');

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // Mobile Navigation Logic
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const indicator = document.querySelector('.mobile-nav-indicator');
  const navList = document.querySelector('.mobile-nav-list');

  function updateIndicator(activeLink) {
    if (!activeLink || !indicator || !navList) return;
    const linkRect = activeLink.getBoundingClientRect();
    const navRect = navList.getBoundingClientRect();
    const offset = linkRect.left - navRect.left + (linkRect.width / 2) - 25;
    indicator.style.transform = `translateX(${offset}px)`;
  }

  setTimeout(() => {
    const defaultActive = document.querySelector('.mobile-nav-link.active');
    if (defaultActive) updateIndicator(defaultActive);
  }, 100);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileNavLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      updateIndicator(this);
    });
  });

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;
    const targets = ['about', 'skills', 'projects', 'qualification', 'contact'];
    
    targets.forEach(id => {
      const section = document.getElementById(id);
      if (section) {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          current = id;
        }
      }
    });

    if (current) {
      const activeLink = document.querySelector(`.mobile-nav-link[data-target="${current}"]`);
      if (activeLink && !activeLink.classList.contains('active')) {
        mobileNavLinks.forEach(l => l.classList.remove('active'));
        activeLink.classList.add('active');
        updateIndicator(activeLink);
      }

      const topNavLinks = document.querySelectorAll('.nav-links a');
      const topActiveLink = document.querySelector(`.nav-links a[href="#${current}"]`);
      if (topActiveLink && !topActiveLink.classList.contains('active')) {
        topNavLinks.forEach(l => l.classList.remove('active'));
        topActiveLink.classList.add('active');
      }
    }
  });

  window.addEventListener('resize', () => {
    const activeLink = document.querySelector('.mobile-nav-link.active');
    if (activeLink) updateIndicator(activeLink);
  });