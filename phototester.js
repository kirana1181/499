const links = document.querySelectorAll(".expo-link");
const expositions = document.querySelectorAll(".expo");

/* SWITCH EXHIBITIONS */
links.forEach(link => {
	link.addEventListener("click", () => {

		links.forEach(l => l.classList.remove("active"));
		expositions.forEach(e => e.classList.remove("active"));

		link.classList.add("active");
		document.getElementById(link.dataset.expo).classList.add("active");
	});
});

/* CAROUSELS */
document.querySelectorAll(".carousel").forEach(carousel => {
	const track = carousel.querySelector(".track");
	const images = carousel.querySelectorAll("img");
	let index = 0;

	carousel.querySelector(".next").addEventListener("click", () => {
		index = (index + 1) % images.length;
		track.style.transform = `translateX(-${index * 100}%)`;
	});

	carousel.querySelector(".prev").addEventListener("click", () => {
		index = (index - 1 + images.length) % images.length;
		track.style.transform = `translateX(-${index * 100}%)`;
	});
});
