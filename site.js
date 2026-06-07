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

  // Contact form -> Web3Forms (works on static hosting like GitHub Pages)
  var form = document.querySelector("#contact-form");
  if (form) {
    var note = document.querySelector("#form-note");
    var btn = form.querySelector('button[type="submit"]');
    function showNote(msg, ok) {
      if (!note) return;
      note.textContent = msg;
      note.style.color = ok ? "var(--blue)" : "#C95E36";
      note.style.display = "block";
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var keyField = form.querySelector('[name="access_key"]');
      var key = keyField ? keyField.value : "";
      if (!key || key.indexOf("YOUR_") === 0) {
        showNote("Form not connected yet — add your Web3Forms access key in contact.html to go live.", false);
        return;
      }
      var original = btn ? btn.innerHTML : "";
      if (btn) { btn.disabled = true; btn.innerHTML = "Sending…"; }
      fetch("https://api.web3forms.com/submit", { method: "POST", body: new FormData(form) })
        .then(function (r) { return r.json(); })
        .then(function (j) {
          if (j.success) {
            showNote("Thanks — your message has been sent. We'll reply within one working day.", true);
            form.reset();
          } else {
            showNote("Sorry, something went wrong. Please email hello@datheon.co.uk instead.", false);
          }
        })
        .catch(function () {
          showNote("Sorry, something went wrong. Please email hello@datheon.co.uk instead.", false);
        })
        .then(function () { if (btn) { btn.disabled = false; btn.innerHTML = original; } });
    });
  }
})();
