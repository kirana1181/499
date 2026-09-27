
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
   GET ELEMENTS
================================================== */

const filterButtons =
  document.querySelectorAll(".filter-btn");

const galleryImages =
  document.querySelectorAll("#gallery img");

const viewTextElement =
  document.getElementById("viewText");


/* ==================================================
   FILTERING
================================================== */

filterButtons.forEach(button => {

  button.addEventListener("click", function () {

    const category =
      this.dataset.filter;


    /* -------------------------------
       UPDATE ACTIVE BUTTON
    -------------------------------- */

    filterButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    this.classList.add("active");


    /* -------------------------------
       UPDATE TEXT
    -------------------------------- */

    viewTextElement.textContent =
      viewText[category];


    /* -------------------------------
       SHOW / HIDE IMAGES
    -------------------------------- */

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

  image.addEventListener("click", function () {

    modalImage.src =
      this.src;

    modalImage.alt =
      this.alt;

    caption.textContent =
      this.alt;

    modal.showModal();

  });

});


/* ==================================================
   CLOSE MODAL
================================================== */

closeButton.addEventListener("click", function () {

  modal.close();

});


/* ==================================================
   CLICK OUTSIDE TO CLOSE
================================================== */

modal.addEventListener("click", function (event) {

  if (event.target === modal) {

    modal.close();

  }

});


/* ==================================================
   ESC KEY
================================================== */

document.addEventListener("keydown", function (event) {

  if (
    event.key === "Escape" &&
    modal.open
  ) {

    modal.close();

  }

});

