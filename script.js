
/* Carousel Track Script */

let current = 0;

const deck = document.querySelector(".deck");
const track = document.getElementById("deckTrack");
const cards = track.querySelectorAll(".card");

function updateDeck() {

	/* remove active */
	cards.forEach(card => {
		card.classList.remove("active");
	});

	/* active center card */
	cards[current].classList.add("active");

const cardWidth = cards[0].offsetWidth;
const gap = 24;

const offset =
	current * (cardWidth + gap)
	- (deck.offsetWidth / 2)
	+ (cardWidth / 2);

track.style.transform = `translateX(-${offset}px)`;


}

function move(direction) {

	current += direction;

	/* loop */
	if (current < 0) {
		current = cards.length - 1;
	}

	if (current >= cards.length) {
		current = 0;
	}

	updateDeck();
}

/* initial load */
updateDeck();


const revealCards = document.querySelectorAll(".nav-dimension .card");

const observer = new IntersectionObserver(entries => {

	entries.forEach(entry => {

		if(entry.isIntersecting) {
			entry.target.classList.add("show");
		}

	});

}, {
	threshold: 0.2
});

revealCards.forEach(card => {
	observer.observe(card);
});



/* Menu script */


const menuToggle = document.getElementById("menuToggle");
const sideMenu = document.getElementById("sideMenu");

let menuTimeout;

/* OPEN */

function openMenu() {

	clearTimeout(menuTimeout);

	menuToggle.classList.add("active");

	sideMenu.classList.add("show");
}

/* CLOSE */

function closeMenu() {

	menuTimeout = setTimeout(() => {

		menuToggle.classList.remove("active");

		sideMenu.classList.remove("show");

	}, 120);
}

/* HOVER EVENTS */

menuToggle.addEventListener("mouseenter", openMenu);

sideMenu.addEventListener("mouseenter", openMenu);

menuToggle.addEventListener("mouseleave", closeMenu);

sideMenu.addEventListener("mouseleave", closeMenu);


const revealSection = document.querySelector(".cinema-panels");

const sectionObserver = new IntersectionObserver(entries => {

	entries.forEach(entry => {

		if (entry.isIntersecting) {

			revealSection.classList.add("visible");
		}
	});

}, {
	threshold: 0.2
});

sectionObserver.observe(revealSection);

/* panel script */



const revealSection = document.querySelector(".cinema-panels");

const sectionObserver = new IntersectionObserver(entries => {

	entries.forEach(entry => {

		if (entry.isIntersecting) {

			revealSection.classList.add("visible");
		}
	});

}, {
	threshold: 0.2
});

sectionObserver.observe(revealSection);


const reveals=document.querySelectorAll(".reveal");

const revealObserver=new IntersectionObserver(entries=>{

	entries.forEach(entry=>{

		if(entry.isIntersecting){
			entry.target.classList.add("visible");
		}

	});

},{
	threshold:0.15
});

reveals.forEach(item=>{
	revealObserver.observe(item);
});

