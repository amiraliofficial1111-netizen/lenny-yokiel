(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");

  if (toggle && nav) {
    function closeNav() {
      nav.classList.remove("open");
      document.body.classList.remove("nav-open");
      nav.querySelectorAll(".has-drop.is-open").forEach(function (item) {
        item.classList.remove("is-open");
      });
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    var mobileMenu = window.matchMedia("(max-width: 1120px)");

    nav.querySelectorAll(".has-drop > a").forEach(function (link) {
      link.addEventListener("click", function (event) {
        if (!mobileMenu.matches) return;
        event.preventDefault();
        var item = link.parentElement;
        var open = item.classList.toggle("is-open");
        nav.querySelectorAll(".has-drop.is-open").forEach(function (other) {
          if (other !== item) other.classList.remove("is-open");
        });
        if (!open) item.classList.remove("is-open");
      });
    });

    nav.querySelectorAll(".drop a, .nav > ul > li:not(.has-drop) > a").forEach(function (link) {
      link.addEventListener("click", function () {
        window.setTimeout(closeNav, 0);
      });
    });

    document.addEventListener("click", function (event) {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) closeNav();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 1120) closeNav();
    });
  }

  document.querySelectorAll("form[data-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      form.classList.add("sent");
    });
  });

  var revealNodes = document.querySelectorAll([
    ".hero-copy",
    ".still",
    ".explore > .wrap > .ornament",
    ".explore .subhead",
    ".explore-book",
    ".explore-copy",
    ".format-card",
    ".about",
    ".beyond-head",
    ".link-card",
    ".soon",
    ".news-inner",
    ".footer-grid",
    ".page-hero .wrap",
    ".page-grid",
    ".feature",
    ".shop-card"
  ].join(","));

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  revealNodes.forEach(function (node) {
    node.classList.add("reveal");
    if (node.matches(".format-card, .link-card, .feature, .shop-card")) {
      var index = Array.prototype.indexOf.call(node.parentElement.children, node);
      node.style.transitionDelay = Math.min(index, 6) * 80 + "ms";
    }
  });

  function showNode(node) {
    node.classList.add("is-in");
    node.addEventListener("transitionend", function () {
      node.style.transitionDelay = "";
    }, { once: true });
  }

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealNodes.forEach(showNode);
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        showNode(entry.target);
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -40px 0px" });

    revealNodes.forEach(function (node) {
      revealObserver.observe(node);
    });
  }

  var params = new URLSearchParams(window.location.search);
  var format = params.get("format");
  var message = document.querySelector("#message");
  if (format && message && !message.value) {
    message.value = "I would like to purchase the " + format + " of Carrie and the Whisper of the Rose.";
  }
})();
