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

  if (document.body.classList.contains("windows-guide")) {
    var guideImages = document.querySelectorAll(".windows-guide .step-media img");

    if (guideImages.length) {
      var lightbox = document.createElement("div");
      var lightboxContent = document.createElement("div");
      var lightboxImage = document.createElement("img");
      var closeButton = document.createElement("button");

      lightbox.className = "image-lightbox";
      lightbox.setAttribute("role", "dialog");
      lightbox.setAttribute("aria-modal", "true");
      lightbox.setAttribute("aria-label", "Просмотр изображения");

      lightboxContent.className = "image-lightbox-content";
      closeButton.className = "image-lightbox-close";
      closeButton.type = "button";
      closeButton.setAttribute("aria-label", "Закрыть изображение");
      closeButton.textContent = "×";

      lightboxContent.appendChild(lightboxImage);
      lightboxContent.appendChild(closeButton);
      lightbox.appendChild(lightboxContent);
      document.body.appendChild(lightbox);

      var closeLightbox = function () {
        lightbox.classList.remove("open");
        document.body.classList.remove("lightbox-open");
        lightboxImage.removeAttribute("src");
        lightboxImage.removeAttribute("alt");
      };

      guideImages.forEach(function (image) {
        image.setAttribute("tabindex", "0");
        image.setAttribute("role", "button");

        var openLightbox = function () {
          lightboxImage.src = image.currentSrc || image.src;
          lightboxImage.alt = image.alt || "";
          lightbox.classList.add("open");
          document.body.classList.add("lightbox-open");
          closeButton.focus();
        };

        image.addEventListener("click", openLightbox);
        image.addEventListener("keydown", function (event) {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openLightbox();
          }
        });
      });

      closeButton.addEventListener("click", closeLightbox);
      lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
          closeLightbox();
        }
      });

      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && lightbox.classList.contains("open")) {
          closeLightbox();
        }
      });
    }
  }
});
