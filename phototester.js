<!-- =========================
     JAVASCRIPT
========================= -->

<script>

const buttons = document.querySelectorAll(".node");
const galleries = document.querySelectorAll(".gallery");

/* =========================================
   SWITCH EXHIBITIONS
========================================= */

buttons.forEach(button => {

	button.addEventListener("click", () => {

		buttons.forEach(btn => btn.classList.remove("active"));
		galleries.forEach(gallery => gallery.classList.remove("active"));

		button.classList.add("active");

		const target =
			document.getElementById(button.dataset.gallery);

		target.classList.add("active");

	});

});

/* =========================================
   DECK CAROUSELS
========================================= */

document.querySelectorAll(".deck").forEach(deck => {

	const track = deck.querySelector(".deck-track");

	const cards =
		deck.querySelectorAll(".deck-card");

	const leftBtn =
		deck.querySelector(".left");

	const rightBtn =
		deck.querySelector(".right");

	let index = 0;

	function updateDeck() {

		cards.forEach(card => {
			card.classList.remove(
				"active",
				"prev",
				"next"
			);
		});

		cards[index].classList.add("active");

		if(index > 0) {
			cards[index - 1].classList.add("prev");
		}

		if(index < cards.length - 1) {
			cards[index + 1].classList.add("next");
		}

		const offset =
			(cards[0].offsetWidth + 16) * index;

		const center =
			(deck.offsetWidth / 2) -
			(cards[0].offsetWidth / 2);

		track.style.transform =
			`translateX(${center - offset}px)`;
	}

	rightBtn.addEventListener("click", () => {

		index++;

		if(index >= cards.length) {
			index = cards.length - 1;
		}

		updateDeck();

	});

	leftBtn.addEventListener("click", () => {

		index--;

		if(index < 0) {
			index = 0;
		}

		updateDeck();

	});

	updateDeck();

});

</script>
