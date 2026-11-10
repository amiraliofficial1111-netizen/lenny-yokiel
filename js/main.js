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

  var params = new URLSearchParams(window.location.search);
  var format = params.get("format");
  var message = document.querySelector("#message");
  if (format && message && !message.value) {
    message.value = "I would like to purchase the " + format + " of Carrie and the Whisper of the Rose.";
  }
})();
