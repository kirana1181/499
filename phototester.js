document.addEventListener("DOMContentLoaded", () => {

	const buttons = document.querySelectorAll(".node");
	const galleries = document.querySelectorAll(".gallery");

	/* =========================
	   SWITCH EXHIBITIONS
	========================= */

	buttons.forEach(button => {

		button.addEventListener("click", () => {

			buttons.forEach(btn => btn.classList.remove("active"));
			galleries.forEach(gallery => gallery.classList.remove("active"));

			button.classList.add("active");

			const target = document.getElementById(button.dataset.gallery);
			if (target) target.classList.add("active");

			// reset deck positions when switching
			resetDecks();
		});

	});

	/* =========================
	   DECK SYSTEM
	========================= */

	function initDeck(deck) {

		const track = deck.querySelector(".deck-track");
		const cards = deck.querySelectorAll(".deck-card");
		const leftBtn = deck.querySelector(".left");
		const rightBtn = deck.querySelector(".right");

		if (!track || !cards.length) return;

		let index = 0;

		function updateDeck() {

			cards.forEach(card => {
				card.classList.remove("active", "prev", "next");
			});

			cards[index].classList.add("active");

			if (index > 0) {
				cards[index - 1].classList.add("prev");
			}

			if (index < cards.length - 1) {
				cards[index + 1].classList.add("next");
			}

			const cardWidth = cards[0].offsetWidth || 0;
			const gap = 16;

			const offset = (cardWidth + gap) * index;
			const center = (deck.offsetWidth / 2) - (cardWidth / 2);

			track.style.transform = `translateX(${center - offset}px)`;
		}

		rightBtn?.addEventListener("click", () => {
			index = Math.min(index + 1, cards.length - 1);
			updateDeck();
		});

		leftBtn?.addEventListener("click", () => {
			index = Math.max(index - 1, 0);
			updateDeck();
		});

		/* ensure images load before measuring widths */
		window.addEventListener("load", updateDeck);
		window.addEventListener("resize", updateDeck);

		updateDeck();
	}

	/* init all decks */
	const deckInstances = document.querySelectorAll(".deck");
	deckInstances.forEach(initDeck);

	/* reset helper */
	function resetDecks() {
		deckInstances.forEach(deck => {
			const track = deck.querySelector(".deck-track");
			if (track) track.style.transform = "";
		});
	}

});
