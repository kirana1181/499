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
const galleryItems = document.querySelectorAll(".gallery-item");
const forestLayers = document.querySelectorAll(".forest-layer");
const about = document.querySelector(".about-section");
const aboutLayers = document.querySelectorAll(".about-layer");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const compactGalleryQuery = window.matchMedia("(max-width: 640px)");

let currentX = 0;
let targetX = 0;

function updateGallery() {

	if (!gallery || !track || compactGalleryQuery.matches) {
		if (track) track.style.transform = "translateX(0)";
		return;
	}

	const rect = gallery.getBoundingClientRect();

	const maxScroll =
		gallery.offsetHeight - window.innerHeight;

	const progress =
		Math.min(
			Math.max((-rect.top) / maxScroll, 0),
			1
		);
	const forestIntroEnd = 0.12;
	const forestDropProgress = Math.min(progress / forestIntroEnd, 1);
	const horizontalProgress = Math.min(Math.max((progress - forestIntroEnd) / (1 - forestIntroEnd), 0), 1);

	const maxMove =
		track.scrollWidth - window.innerWidth;

	if (maxScroll <= 0 || maxMove <= 0) {
		track.style.transform = "translateX(0)";
		requestAnimationFrame(updateGallery);
		return;
	}

	targetX = horizontalProgress * maxMove;

	currentX = reducedMotion ? targetX : currentX + (targetX - currentX) * 0.08;

	track.style.transform =
		`translateX(${-currentX}px)`;
	track.style.setProperty("--gallery-progress", horizontalProgress.toFixed(3));
	gallery.style.setProperty("--gallery-progress", horizontalProgress.toFixed(3));

	forestLayers.forEach((layer, index) => {
		const depth = 52 + (index * 3);
		const rise = forestDropProgress * -12;
		layer.style.transform = `translate3d(${-horizontalProgress * depth}vw, ${rise}vh, 0)`;
	});

	requestAnimationFrame(updateGallery);
}

updateGallery();

function updateAboutParallax() {
	if (!about || !aboutLayers.length || reducedMotion) return;

	const rect = about.getBoundingClientRect();
	const scrollDistance = Math.max(about.offsetHeight - window.innerHeight, 1);
	const progress = Math.min(Math.max(-rect.top / scrollDistance, 0), 1);

	aboutLayers.forEach((layer, index) => {
		if (index === 0) return;
		const depth = (aboutLayers.length - index) * 0.1;
		layer.style.transform = `translateY(${progress * depth * window.innerHeight}px)`;
	});

	requestAnimationFrame(updateAboutParallax);
}

updateAboutParallax();

if (!reducedMotion) {
	window.addEventListener("pointermove", event => {
		document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
		document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
	});

	galleryItems.forEach(item => {
		item.addEventListener("pointermove", event => {
			const rect = item.getBoundingClientRect();
			const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
			const y = ((event.clientY - rect.top) / rect.height - 0.5) * -6;

			item.style.setProperty("--image-tilt-x", `${x.toFixed(2)}deg`);
			item.style.setProperty("--image-tilt-y", `${y.toFixed(2)}deg`);
		});

		item.addEventListener("pointerleave", () => {
			item.style.removeProperty("--image-tilt-x");
			item.style.removeProperty("--image-tilt-y");
		});
	});
}

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


/* =========================
ABOUT
========================= */

const images = document.querySelectorAll(".stack-image");
const nextBtn = document.querySelector(".image-next-btn");

let current = 0;
let timer;

if (images.length && nextBtn) {
	function showImage(index) {
		images[current].classList.remove("active");
		current = index;
		images[current].classList.add("active");
	}

	function nextImage() {
		showImage((current + 1) % images.length);
	}

	function startTimer() {
		if (reducedMotion) return;
		clearInterval(timer);
		timer = setInterval(nextImage, 3000);
	}

	nextBtn.addEventListener("click", () => {
		nextImage();
		startTimer();
	});

	startTimer();
}
