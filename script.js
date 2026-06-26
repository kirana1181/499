/* =========================
HAMBURGER MENU
========================= */

const menuToggle = document.getElementById("menuToggle");
const sideMenu = document.getElementById("sideMenu");

if (menuToggle && sideMenu) {
	let menuTimeout;

	function openMenu() {
		clearTimeout(menuTimeout);
		menuToggle.classList.add("active");
		sideMenu.classList.add("show");
	}

	function closeMenu() {
		menuTimeout = setTimeout(() => {
			menuToggle.classList.remove("active");
			sideMenu.classList.remove("show");
		}, 120);
	}

	menuToggle.addEventListener("mouseenter", openMenu);
	sideMenu.addEventListener("mouseenter", openMenu);

	menuToggle.addEventListener("mouseleave", closeMenu);
	sideMenu.addEventListener("mouseleave", closeMenu);
}

/* =========================
   SMOOTH SCROLL ENGINE
========================= 

const lenis = new Lenis({
	smooth: true,
	lerp: 0.08, // lower = more floaty
});

function raf(time) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}

requestAnimationFrame(raf); */


/* =========================
   REVEAL OBSERVER
========================= */

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add("visible");
		}
	});
}, {
	threshold: 0.15
});

document.querySelectorAll(".reveal").forEach(el => {
	observer.observe(el);
});


/* =========================
   HORIZONTAL GALLERY (EASED)
========================= */

const gallery = document.querySelector(".horizontal-gallery");
const track = document.querySelector(".gallery-track");

let currentX = 0;
let targetX = 0;

function updateGallery() {

	if (!gallery || !track) return;

	const rect = gallery.getBoundingClientRect();

	const maxScroll =
		gallery.offsetHeight - window.innerHeight;

	const progress =
		Math.min(
			Math.max((-rect.top) / maxScroll, 0),
			1
		);

	const maxMove =
		track.scrollWidth - window.innerWidth;

	targetX = progress * maxMove;

	// INERTIA (THIS IS THE MAGIC)
	currentX += (targetX - currentX) * 0.08;

	track.style.transform =
		`translateX(${-currentX}px)`;

	requestAnimationFrame(updateGallery);
}

updateGallery();

/* =========================
   PINNED SCENE ACTIVATION
========================= */

const scenes = document.querySelectorAll(".scene");

const sceneObserver = new IntersectionObserver((entries) => {

	entries.forEach(entry => {

		if(entry.isIntersecting){
			entry.target.classList.add("active");
		}

	});

}, {
	threshold: 0.4
});

scenes.forEach(scene => {
	sceneObserver.observe(scene);
});

/* about section */

const frame = document.getElementById("aboutFrame");
const images = frame.querySelectorAll(".stack-image");
const button = frame.querySelector(".image-next-btn");

let index = 0;

function showImage(i) {
	images.forEach(img => img.classList.remove("active"));
	images[i].classList.add("active");
}

button.addEventListener("click", () => {
	index = (index + 1) % images.length;
	showImage(index);
});

/* =========================
ABOUT
========================= */

const images = document.querySelectorAll(".stack-image");
const nextBtn = document.querySelector(".image-next-btn");

let current = 0;
let timer;

function showImage(index) {
    images[current].classList.remove("active");
    current = index;
    images[current].classList.add("active");
}

function nextImage() {
    showImage((current + 1) % images.length);
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(nextImage, 3000);
}

nextBtn.addEventListener("click", () => {
    nextImage();
    startTimer();
});

startTimer();
