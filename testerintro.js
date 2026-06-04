/* =========================
   SMOOTH SCROLL ENGINE
========================= */

const lenis = new Lenis({
	smooth: true,
	lerp: 0.08, // lower = more floaty
});

function raf(time) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}

requestAnimationFrame(raf);


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
