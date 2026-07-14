/* ============================================================
   Judiciary Gold — interactions
   ============================================================ */
(function () {
  "use strict";

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -------- Courses data -> cards -------- */
  const EXAMS = [
    { tag: "Bihar", name: "BPSC-J", full: "Bihar Judicial Services", desc: "Full Prelims-to-Interview program with Bihar-specific laws, PYQs and weekly mains answer writing." },
    { tag: "Rajasthan", name: "RJS", full: "Rajasthan Judicial Services", desc: "Our flagship batch — Hindi + English medium, language paper focus and interview mentorship." },
    { tag: "Haryana", name: "HJS", full: "Haryana Judicial Services", desc: "Targeted coverage of local acts, high-yield topics and full-length graded test series." },
    { tag: "Madhya Pradesh", name: "MPCJ", full: "MP Civil Judge", desc: "Indore-tested classroom + online program with 200+ mocks and structured revision." },
    { tag: "Delhi", name: "DJS", full: "Delhi Judicial Services", desc: "High-standard English medium prep, advanced answer writing and current-affairs drills." },
    { tag: "Uttar Pradesh", name: "UPPSCJ", full: "UP Judicial Services", desc: "Complete syllabus in BSA, CPC, BNSS & BNS with dedicated doubt-solving support." },
  ];

  const grid = document.getElementById("coursesGrid");
  if (grid) {
    grid.innerHTML = EXAMS.map((e) => `
      <article class="course reveal" data-reveal>
        <span class="course__tag">${e.tag}</span>
        <h3 class="course__name">${e.name}</h3>
        <span class="course__full">${e.full}</span>
        <p class="course__desc">${e.desc}</p>
        <a href="#enquire" class="course__link">Enquire about this batch →</a>
      </article>`).join("");
  }

  /* -------- Footer year -------- */
  const yEl = document.getElementById("year");
  if (yEl) yEl.textContent = String(new Date().getFullYear());

  /* -------- Sticky nav + scroll progress -------- */
  const nav = document.getElementById("nav");
  const progress = document.getElementById("scrollProgress");
  const fab = document.getElementById("fab");
  const heroContent = document.querySelector(".hero__content");

  function onScroll() {
    const y = window.scrollY;
    if (nav) nav.classList.toggle("scrolled", y > 30);
    if (fab) fab.classList.toggle("show", y > 700);
    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
    // hero content parallax-fade on scroll
    if (heroContent && !reduced) {
      const vh = window.innerHeight;
      if (y < vh) {
        heroContent.style.transform = "translateY(" + y * 0.16 + "px)";
        heroContent.style.opacity = String(Math.max(1 - y / (vh * 0.85), 0));
      }
    }
    applyParallax(y);
  }

  /* -------- Mobile menu -------- */
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  function closeMenu() {
    if (!links) return;
    links.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  }

  /* -------- Reveal on scroll (+ stagger) -------- */
  const revealEls = () => Array.from(document.querySelectorAll("[data-reveal]"));
  if (!reduced && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    // stagger children inside [data-stagger]
    document.querySelectorAll("[data-stagger]").forEach((group) => {
      group.querySelectorAll("[data-reveal]").forEach((el, i) => {
        el.style.setProperty("--d", i * 90 + "ms");
      });
    });
    revealEls().forEach((el) => io.observe(el));
  } else {
    revealEls().forEach((el) => el.classList.add("in"));
  }

  /* -------- Animated counters -------- */
  function animateCount(el) {
    const target = parseFloat(el.dataset.target || "0");
    const suffix = el.dataset.suffix || "";
    const dur = 1600;
    let start = null;
    function step(ts) {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }
  const counters = document.querySelectorAll(".count");
  if (!reduced && "IntersectionObserver" in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { animateCount(en.target); cio.unobserve(en.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach((c) => cio.observe(c));
  } else {
    counters.forEach((c) => (c.textContent = (c.dataset.target || "") + (c.dataset.suffix || "")));
  }

  /* -------- Parallax (scroll + mouse) -------- */
  const parallaxEls = Array.from(document.querySelectorAll("[data-parallax]"));
  function applyParallax(y) {
    if (reduced) return;
    parallaxEls.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax || "0");
      const rect = el.getBoundingClientRect();
      const offset = (rect.top + window.scrollY - y) * -speed;
      const mx = el._mx || 0, my = el._my || 0;
      el.style.transform = `translate3d(${mx}px, ${offset + my}px, 0)`;
    });
  }
  // mouse parallax for hero layers — only update offsets, applyParallax does the single write
  const tiltEls = Array.from(document.querySelectorAll(".hero__scales, .hero__blob"));
  if (!reduced) {
    window.addEventListener("mousemove", (e) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      tiltEls.forEach((el, i) => {
        const depth = (i + 1) * 8;
        el._mx = cx * depth;
        el._my = cy * depth;
      });
      applyParallax(window.scrollY);
    }, { passive: true });
  }

  /* -------- Marquee duplicate for seamless loop -------- */
  const track = document.getElementById("marqueeTrack");
  if (track && !reduced) {
    track.innerHTML += track.innerHTML;
    let pos = 0;
    const half = () => track.scrollWidth / 2;
    function loop() {
      pos -= 0.5;
      if (Math.abs(pos) >= half()) pos = 0;
      track.style.transform = `translateX(${pos}px)`;
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  /* -------- Video modal -------- */
  const modal = document.getElementById("videoModal");
  const frame = document.getElementById("modalFrame");
  function openVideo(id) {
    if (!modal || !frame) return;
    frame.innerHTML =
      `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" ` +
      `title="Judiciary Gold video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeVideo() {
    if (!modal || !frame) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    frame.innerHTML = "";
    document.body.style.overflow = "";
  }
  document.querySelectorAll("[data-video]").forEach((btn) => {
    btn.addEventListener("click", () => openVideo(btn.dataset.video));
  });
  if (modal) {
    modal.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", closeVideo));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeVideo(); });
  }

  /* -------- Form validation + mock submit -------- */
  const form = document.getElementById("enquiryForm");
  const success = document.getElementById("formSuccess");
  function setError(field, msg) {
    const wrap = field.closest(".field");
    const err = wrap.querySelector("[data-err]");
    wrap.classList.toggle("invalid", !!msg);
    if (err) err.textContent = msg || "";
  }
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      const name = form.name, phone = form.phone, email = form.email, exam = form.exam;

      if (!name.value.trim()) { setError(name, "Please enter your name"); ok = false; } else setError(name, "");
      if (!/^\d{10}$/.test(phone.value.trim())) { setError(phone, "Enter a valid 10-digit number"); ok = false; } else setError(phone, "");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { setError(email, "Enter a valid email"); ok = false; } else setError(email, "");
      if (!exam.value) { setError(exam, "Please choose your target exam"); ok = false; } else setError(exam, "");

      if (!ok) return;
      form.querySelectorAll(".field, .btn").forEach((el) => { if (el.classList.contains("field")) el.style.display = "none"; });
      const btn = form.querySelector(".btn--block");
      if (btn) btn.style.display = "none";
      if (success) success.hidden = false;
    });
    // allow only digits in phone
    form.phone.addEventListener("input", (e) => { e.target.value = e.target.value.replace(/\D/g, ""); });
  }

  /* -------- Init -------- */
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
