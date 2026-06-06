// Datheon Ltd — shared interactions
(function () {
  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  // Scroll reveal
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  // Insights filter
  var filterBar = document.querySelector(".filterbar");
  if (filterBar) {
    var posts = Array.prototype.slice.call(document.querySelectorAll("#post-grid .post"));
    var emptyNote = document.querySelector("#empty-note");
    filterBar.addEventListener("click", function (e) {
      var btn = e.target.closest("button");
      if (!btn) return;
      filterBar.querySelectorAll("button").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var f = btn.getAttribute("data-filter");
      var shown = 0;
      posts.forEach(function (p) {
        var match = f === "all" || p.getAttribute("data-type") === f;
        p.style.display = match ? "" : "none";
        if (match) shown++;
      });
      if (emptyNote) emptyNote.style.display = shown ? "none" : "block";
    });
  }

  // Newsletter (front-end only demo)
  var nl = document.querySelector("#newsletter-form");
  if (nl) {
    nl.addEventListener("submit", function (e) {
      e.preventDefault();
      nl.innerHTML = '<p style="color:#fff;font-weight:500;margin:0">Thanks — you\'re on the list. Connect this to your email tool to go live.</p>';
    });
  }

  // Contact form (front-end only demo)
  var form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = document.querySelector("#form-note");
      if (note) {
        note.textContent = "Thanks — your message is ready to send. Connect this form to your email or CRM to go live.";
        note.style.display = "block";
      }
      form.reset();
    });
  }
})();
