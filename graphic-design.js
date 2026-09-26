```javascript
/* ==================================================
   GRAPHIC DESIGN PAGE
   KIRAN ARAIN
================================================== */


/* ==================================================
   FILTER TEXT
================================================== */

const viewText = {

  all:
    "ALL OF IT, APPARENTLY",

  movie:
    "FAKE MOVIES I'D ABSOLUTELY WATCH",

  advertising:
    "PLEASE BUY THIS THING",

  illustration:
    "I DREW THIS",

  brand:
    "MAKING A LOGO FEEL IMPORTANT",

  shows:
    "THINGS YOU SEE BEFORE THE CURTAIN GOES UP"

};


/* ==================================================
   FILTER GALLERY
================================================== */

const filterButtons =
  document.querySelectorAll(".filter-btn");

const galleryImages =
  document.querySelectorAll("#gallery img");

const viewTextElement =
  document.getElementById("viewText");


filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    const category =
      button.dataset.filter;


    /* Remove active state */

    filterButtons.forEach(btn => {

      btn.classList.remove("active");

    });


    /* Activate clicked button */

    button.classList.add("active");


    /* Change little description */

    viewTextElement.textContent =
      viewText[category];


    /* Filter images */

    galleryImages.forEach(image => {

      const imageCategory =
        image.dataset.category;


      if (
        category === "all" ||
        imageCategory === category
      ) {

        image.style.display = "block";

      } else {

        image.style.display = "none";

      }

    });

  });

});


/* ==================================================
   IMAGE MODAL
================================================== */

const modal =
  document.getElementById("modal01");

const modalImage =
  document.getElementById("img01");

const caption =
  document.getElementById("caption");

const closeButton =
  document.getElementById("modalClose");


galleryImages.forEach(image => {

  image.addEventListener("click", () => {

    modalImage.src =
      image.src;

    modalImage.alt =
      image.alt;

    caption.textContent =
      image.alt;

    modal.showModal();

  });

});


/* ==================================================
   CLOSE MODAL
================================================== */

closeButton.addEventListener("click", () => {

  modal.close();

});


/* Close when clicking outside image */

modal.addEventListener("click", event => {

  if (event.target === modal) {

    modal.close();

  }

});


/* ESC KEY */

document.addEventListener("keydown", event => {

  if (
    event.key === "Escape" &&
    modal.open
  ) {

    modal.close();

  }

});
```
