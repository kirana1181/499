const links = document.querySelectorAll(".expo-link");
const expositions = document.querySelectorAll(".expo");

function resetCarousel(expo) {
	const track = expo.querySelector(".track");
	if (track) {
		track.dataset.index = "0";
		track.style.transform = "translateX(0)";
	}
}

/* SWITCH EXHIBITIONS */
links.forEach(link => {
	link.addEventListener("click", () => {

		links.forEach(l => l.classList.remove("active"));
		expositions.forEach(e => e.classList.remove("active"));

		link.classList.add("active");
		const activeExpo = document.getElementById(link.dataset.expo);
		activeExpo.classList.add("active");
		resetCarousel(activeExpo);
	});
});

/* CAROUSELS */
document.querySelectorAll(".carousel").forEach(carousel => {
	const track = carousel.querySelector(".track");
	const images = carousel.querySelectorAll("img");
	const next = carousel.querySelector(".next");
	const prev = carousel.querySelector(".prev");

	if (!track || !next || !prev || images.length === 0) {
		carousel.classList.add("is-empty");
		return;
	}

	track.dataset.index = "0";

	function goTo(index) {
		track.dataset.index = String(index);
		track.style.transform = `translateX(-${index * 100}%)`;
	}

	next.addEventListener("click", () => {
		const index = Number(track.dataset.index || 0);
		goTo((index + 1) % images.length);
	});

	prev.addEventListener("click", () => {
		const index = Number(track.dataset.index || 0);
		goTo((index - 1 + images.length) % images.length);
	});
});
