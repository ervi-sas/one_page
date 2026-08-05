/* ============================================================
   ERVI · One page — interacciones
   ============================================================ */
(function () {
  "use strict";

  var SECTIONS = ["objetivo", "resolvemos", "servicios", "contacto"];

  /* ---- Año del footer ---- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---- Menú móvil ---- */
  var burger = document.getElementById("burger");
  var menu = document.getElementById("mobileMenu");
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        menu.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- Scroll spy: resalta la sección activa en la navegación ---- */
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  function setActive(id) {
    links.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + id);
    });
  }
  setActive("objetivo");

  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTIONS.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) spy.observe(el);
    });

    /* ---- Animación de aparición al hacer scroll ---- */
    var reveal = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            reveal.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach(function (el) {
      reveal.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---- Formulario de contacto ---- */
  var form = document.getElementById("contactForm");
  var errorBox = document.getElementById("formError");
  var okBox = document.getElementById("formOk");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var nombre = String(data.get("nombre") || "").trim();
      var email = String(data.get("email") || "").trim();
      var mensaje = String(data.get("mensaje") || "").trim();

      function fail(msg) {
        errorBox.textContent = msg;
        errorBox.hidden = false;
        okBox.hidden = true;
      }

      if (!nombre || !email || !mensaje) return fail("Por favor complete los campos obligatorios.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail("Ingrese un correo electrónico válido.");

      errorBox.hidden = true;
      okBox.hidden = false;
      form.reset();
    });
  }
})();
