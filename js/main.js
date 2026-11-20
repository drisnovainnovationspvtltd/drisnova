/**
 * DRISNOVA - Official Website Scripts
 * Drisnova Innovation Pvt Ltd
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle & Navigation Enhancements
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    // Add mobile CTA inside drawer if not already present
    if (!navLinks.querySelector('.mobile-drawer-cta')) {
      const drawerCta = document.createElement('div');
      drawerCta.className = 'mobile-drawer-cta';
      drawerCta.innerHTML = `
        <a href="contact.html" class="btn btn-primary" style="width: 100%;">Discuss Project</a>
        <a href="tel:+919545475203" class="btn btn-outline" style="width: 100%;">Direct Call: +91 9545475203</a>
      `;
      navLinks.appendChild(drawerCta);
    }

    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.classList.toggle('is-active', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen);
      
      // Update hamburger icon to 'X' when open
      menuToggle.innerHTML = isOpen ? `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      ` : `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      `;
    });

    // Close menu when clicking outside or clicking a nav-link
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('open');
        menuToggle.classList.remove('is-active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        `;
      }
    });

    // Close when clicking any nav link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.classList.remove('is-active');
      });
    });
  }

  // 1b. Inject Floating Mobile Quick Action Bar (Bottom of screen on mobile)
  if (!document.querySelector('.mobile-bottom-bar')) {
    const bottomBar = document.createElement('div');
    bottomBar.className = 'mobile-bottom-bar';
    bottomBar.innerHTML = `
      <a href="tel:+919545475203" class="mobile-bar-btn call">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        Call
      </a>
      <a href="https://wa.me/919545475203?text=Hello%20DRISNOVA%20Team%2C%20I%20would%20like%20to%20discuss%20a%20machine%20vision%20/%20robotics%20project." target="_blank" rel="noopener" class="mobile-bar-btn whatsapp" style="background: rgba(37, 211, 102, 0.15); color: #25D366; border-color: rgba(37, 211, 102, 0.4);">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
        WhatsApp
      </a>
      <a href="contact.html" class="mobile-bar-btn quote">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        Enquiry
      </a>
    `;
    document.body.appendChild(bottomBar);
  }

  // 2. Sticky Header Scroll Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 3. Interactive Machine Vision HUD Simulator (Home Page)
  const hudButtons = document.querySelectorAll('.hud-btn');
  const targetLabel = document.getElementById('hudTargetLabel');
  const targetReadout = document.getElementById('hudTargetReadout');
  const metricVal1 = document.getElementById('hudMetricVal1');
  const metricVal2 = document.getElementById('hudMetricVal2');
  const metricVal3 = document.getElementById('hudMetricVal3');
  const targetBox = document.getElementById('hudTargetBox');

  const hudModes = {
    defect: {
      label: 'AI DEFECT DETECTION',
      readout: 'Surface Integrity: <span class="status-pass">PASS (99.8%)</span><br>Defect Map: Clean Specimen',
      metric1: '18 ms',
      metric2: '55.5 FPS',
      metric3: '99.8%',
      borderColor: '#00d2ff',
      boxStyle: 'width: 200px; height: 160px;'
    },
    dimension: {
      label: 'PRECISION METROLOGY',
      readout: 'Width: 45.02mm (±0.05) <span class="status-pass">OK</span><br>Height: 88.00mm (±0.05) <span class="status-pass">OK</span>',
      metric1: '14 ms',
      metric2: '71.4 FPS',
      metric3: '0.005 mm',
      borderColor: '#38bdf8',
      boxStyle: 'width: 220px; height: 140px;'
    },
    robot: {
      label: 'FANUC 6-AXIS GUIDANCE',
      readout: 'Coordinates: [X: +182.4, Y: -94.2, Rz: 44.5°]<br>Status: <span class="status-pass">GRIPPER ALIGNED</span>',
      metric1: '22 ms',
      metric2: '45.4 FPS',
      metric3: 'X/Y/θ Locked',
      borderColor: '#10b981',
      boxStyle: 'width: 170px; height: 170px;'
    },
    ocr: {
      label: 'OCR & 2D DATAMATRIX',
      readout: 'Code: "DRIS-2026-V889"<br>ISO Verification: <span class="status-pass">GRADE A</span>',
      metric1: '12 ms',
      metric2: '83.3 FPS',
      metric3: '100% Match',
      borderColor: '#f59e0b',
      boxStyle: 'width: 230px; height: 130px;'
    }
  };

  if (hudButtons.length > 0) {
    hudButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        hudButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const modeKey = btn.dataset.mode;
        const config = hudModes[modeKey];
        if (config) {
          if (targetLabel) targetLabel.textContent = config.label;
          if (targetReadout) targetReadout.innerHTML = config.readout;
          if (metricVal1) metricVal1.textContent = config.metric1;
          if (metricVal2) metricVal2.textContent = config.metric2;
          if (metricVal3) metricVal3.textContent = config.metric3;
          if (targetBox) {
            targetBox.style.borderColor = config.borderColor;
          }
        }
      });
    });
  }

  // 4. Contact Form Submission & Validation
  const contactForm = document.getElementById('drisnovaContactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('fullName')?.value.trim();
      const company = document.getElementById('companyName')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const phone = document.getElementById('phone')?.value.trim();
      const projectDesc = document.getElementById('projectDesc')?.value.trim();

      if (!fullName || !email || !phone || !projectDesc) {
        alert('Please fill in all required fields.');
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'SUBMIT YOUR ENQUIRY';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'ENGINEERING YOUR ENQUIRY...';
      }

      setTimeout(() => {
        if (formFeedback) {
          const waMessage = encodeURIComponent(
            `*New Industrial Vision Enquiry - DRISNOVA*\n` +
            `• *Name:* ${fullName}\n` +
            `• *Company:* ${company || 'N/A'}\n` +
            `• *Email:* ${email}\n` +
            `• *Phone:* ${phone}\n` +
            `• *Requirement:* ${projectDesc}`
          );
          const waLink = `https://wa.me/919545475203?text=${waMessage}`;
          const mailSubject = encodeURIComponent(`Industrial Vision Project Enquiry - ${company || fullName}`);
          const mailBody = encodeURIComponent(
            `Name: ${fullName}\nCompany: ${company || 'N/A'}\nEmail: ${email}\nPhone: ${phone}\n\nProject Requirement:\n${projectDesc}`
          );
          const mailtoLink = `mailto:priyesh@drisnovainnovation.com?subject=${mailSubject}&body=${mailBody}`;

          formFeedback.className = 'form-feedback success';
          formFeedback.innerHTML = `
            <div style="font-size: 1.15rem; font-weight: 700; color: #38bdf8; margin-bottom: 8px;">
              ✓ Enquiry Successfully Logged!
            </div>
            <p style="font-size: 0.95rem; color: #cbd5e1; line-height: 1.6; margin-bottom: 16px;">
              Thank you, <strong>${fullName}</strong>. Technical Director <strong>Priyesh Thakare</strong> and the DRISNOVA engineering team have received your details and will review your application specifications within 24 business hours.
            </p>
            <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-top: 14px;">
              <a href="${waLink}" target="_blank" rel="noopener" class="btn btn-whatsapp" style="padding: 10px 18px; font-size: 0.88rem;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                Instant Connect via WhatsApp
              </a>
              <a href="${mailtoLink}" class="btn btn-outline" style="padding: 10px 18px; font-size: 0.88rem;">
                Open in Email Client
              </a>
            </div>
          `;
          formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }, 700);
    });
  }

  // 5. Interactive Ambient Neural Grid Particles (Hero Section)
  const canvas = document.getElementById('ambientCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.parentElement.offsetWidth;
    let height = canvas.height = canvas.parentElement.offsetHeight;

    window.addEventListener('resize', () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    });

    const particles = [];
    const count = Math.min(Math.floor((width * height) / 18000), 45);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 1,
        color: Math.random() > 0.4 ? 'rgba(0, 210, 255, ' : 'rgba(56, 189, 248, '
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      // Draw particle connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 210, 255, ${0.18 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + '0.7)';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00d2ff';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // 6. Animated Stat Number Counters
  const counterElements = document.querySelectorAll('.stat-number[data-target]');
  if (counterElements.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          const suffix = el.getAttribute('data-suffix') || '+';
          const duration = 1600;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeOut * target);

            el.innerHTML = `${currentVal}<span>${suffix}</span>`;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.innerHTML = `${target}<span>${suffix}</span>`;
            }
          }
          requestAnimationFrame(updateCounter);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    counterElements.forEach(el => counterObserver.observe(el));
  }

  // 7. Interactive 3D Perspective Tilt on Brand Hero Card
  const brandHeroCard = document.querySelector('.brand-hero-card');
  if (brandHeroCard && window.matchMedia('(hover: hover)').matches) {
    brandHeroCard.addEventListener('mousemove', (e) => {
      const rect = brandHeroCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      brandHeroCard.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    brandHeroCard.addEventListener('mouseleave', () => {
      brandHeroCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  }
});
