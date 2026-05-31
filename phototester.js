/* =========================
   EXHIBITION SWITCHER
========================= */

const links = document.querySelectorAll(".expo-link");
const expositions = document.querySelectorAll(".expo");

links.forEach(link => {
	link.addEventListener("click", () => {

		// remove active states
		links.forEach(l => l.classList.remove("active"));
		expositions.forEach(e => e.classList.remove("active"));

		// activate clicked button
		link.classList.add("active");

		// show matching exhibition
		const target = document.getElementById(link.dataset.expo);
		if (target) target.classList.add("active");
	});
});


/* =========================
   CAROUSELS
========================= */

document.querySelectorAll(".carousel").forEach(carousel => {
	const track = carousel.querySelector(".track");
	const images = carousel.querySelectorAll("img");
	const nextBtn = carousel.querySelector(".next");
	const prevBtn = carousel.querySelector(".prev");

	let index = 0;

	// safety check
	if (!track || !images.length || !nextBtn || !prevBtn) return;

	nextBtn.addEventListener("click", () => {
		index = (index + 1) % images.length;
		track.style.transform = `translateX(-${index * 100}%)`;
	});

	prevBtn.addEventListener("click", () => {
		index = (index - 1 + images.length) % images.length;
		track.style.transform = `translateX(-${index * 100}%)`;
	});
});
