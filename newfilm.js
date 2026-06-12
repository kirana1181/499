const posters = Array.from(document.querySelectorAll(".poster"));
const titleEl = document.getElementById("filmTitle");
const metaEl = document.getElementById("filmMeta");
const loglineEl = document.getElementById("filmLogline");

const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");

let activeIndex = 0;

/* =========================
   UPDATE CAROUSEL VIEW
========================= */

function updateCarousel() {
    posters.forEach((poster, i) => {
        poster.classList.remove("active", "poster-1", "poster-2", "poster-3");

        const diff = i - activeIndex;

        if (diff === 0) {
            poster.classList.add("active");
        } 
        else if (diff === -1 || diff === 1) {
            poster.classList.add("poster-1");
        } 
        else if (diff === -2 || diff === 2) {
            poster.classList.add("poster-2");
        } 
        else if (diff === -3 || diff === 3) {
            poster.classList.add("poster-3");
        }
    });

    updateInfo();
}

/* =========================
   UPDATE TEXT BELOW
========================= */

function updateInfo() {
    const activePoster = posters[activeIndex];

    titleEl.textContent = activePoster.dataset.title || "";
    metaEl.textContent = activePoster.dataset.meta || "";
    loglineEl.textContent = activePoster.dataset.logline || "";
}

/* =========================
   NEXT / PREV CONTROLS
========================= */

function next() {
    activeIndex = (activeIndex + 1) % posters.length;
    updateCarousel();
}

function prev() {
    activeIndex = (activeIndex - 1 + posters.length) % posters.length;
    updateCarousel();
}

/* =========================
   CLICK ON POSTER
========================= */

posters.forEach((poster, i) => {
    poster.addEventListener("click", () => {
        activeIndex = i;
        updateCarousel();
    });
});

/* =========================
   BUTTON EVENTS
========================= */

nextBtn.addEventListener("click", next);
prevBtn.addEventListener("click", prev);

/* =========================
   KEYBOARD SUPPORT
========================= */

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
});

/* =========================
   INIT
========================= */

updateCarousel();
