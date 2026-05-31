/* =========================
CAROUSEL
========================= */

let current = 0;

const deck = document.querySelector(".deck");
const track = document.getElementById("deckTrack");

if (deck && track) {

const cards = track.querySelectorAll(".card");

function updateDeck() {

	cards.forEach(card => {
		card.classList.remove("active");
	});

	if (!cards[current]) return;

	cards[current].classList.add("active");

	const cardWidth = cards[0].offsetWidth;
	const gap = 24;

	const offset =
		current * (cardWidth + gap)
		- (deck.offsetWidth / 2)
		+ (cardWidth / 2);

	track.style.transform = `'''X(-${offset}px)`;
}

window.move = function(direction) {

	current += direction;

	if (current < 0) {
		current = cards.length - 1;
	}

	if (current >= cards.length) {
		current = 0;
	}

	updateDeck();
};

updateDeck();

}

/* =========================
CARD REVEAL
========================= */

const revealCards = document.querySelectorAll(".nav-dimension .card");

if (revealCards.length) {

const observer = new IntersectionObserver(entries => {

	entries.forEach(entry => {

		if (entry.isIntersecting) {
			entry.target.classList.add("show");
		}

	});

}, {
	threshold: 0.2
});

revealCards.forEach(card => {
	observer.observe(card);
});

}

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
CINEMA PANELS REVEAL
========================= */

const revealSection = document.querySelector(".cinema-panels");

if (revealSection) {

const sectionObserver = new IntersectionObserver(entries => {

	entries.forEach(entry => {

		if (entry.isIntersecting) {
			entry.target.classList.add("visible");
		}

	});

}, {
	threshold: 0.15
});

sectionObserver.observe(revealSection);
}

/* =========================
FEATURED WORK REVEAL
========================= */

const reveals = document.querySelectorAll(".reveal");

if (reveals.length) {

const revealObserver = new IntersectionObserver(entries => {

	entries.forEach(entry => {

		if (entry.isIntersecting) {
			entry.target.classList.add("visible");
		}

	});

}, {
	threshold: 0.15
});

reveals.forEach(item => {
	revealObserver.observe(item);
});
```

}
