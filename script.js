document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  var currentPage = window.location.pathname.split("/").pop() || "index.html";
  var navLinks = document.querySelectorAll(".nav-link");
  var toTop = document.querySelector(".to-top");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    links.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  navLinks.forEach(function (link) {
    var href = link.getAttribute("href") || "";
    if (href === currentPage || (currentPage === "index.html" && href === "./")) {
      link.classList.add("active");
    }

    if (currentPage.indexOf("windows-") === 0 && href.indexOf("#windows") > -1) {
      link.classList.add("active");
    }

    if (currentPage.indexOf("office-") === 0 && href.indexOf("#office") > -1) {
      link.classList.add("active");
    }
  });

  if (toTop) {
    window.addEventListener("scroll", function () {
      toTop.classList.toggle("visible", window.scrollY > 600);
    });

    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
