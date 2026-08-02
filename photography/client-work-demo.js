const filters = document.querySelectorAll(".filter");
const filterLinks = document.querySelectorAll("[data-filter-link]");
const shots = document.querySelectorAll(".client-shot");
const lightbox = document.querySelector(".client-lightbox");
const lightboxImage = lightbox.querySelector("img");
const closeButton = lightbox.querySelector(".client-lightbox__close");

function applyFilter(type) {
	const activeFilter = document.querySelector(`.filter[data-filter="${type}"]`) || document.querySelector('.filter[data-filter="all"]');

	filters.forEach(item => item.classList.remove("active"));
	activeFilter.classList.add("active");

	shots.forEach(shot => {
		shot.classList.toggle("is-hidden", type !== "all" && !shot.classList.contains(type));
	});
}

filters.forEach(filter => {
	filter.addEventListener("click", () => applyFilter(filter.dataset.filter));
});

filterLinks.forEach(link => {
	link.addEventListener("click", () => applyFilter(link.dataset.filterLink));
});

const requestedFilter = new URLSearchParams(window.location.search).get("filter");
if (requestedFilter) {
	applyFilter(requestedFilter);
}

shots.forEach(shot => {
	shot.addEventListener("click", () => {
		const image = shot.querySelector("img");
		lightboxImage.src = image.src;
		lightboxImage.alt = image.alt;
		lightbox.classList.add("is-open");
		lightbox.setAttribute("aria-hidden", "false");
	});
});

function closeLightbox() {
	lightbox.classList.remove("is-open");
	lightbox.setAttribute("aria-hidden", "true");
	lightboxImage.src = "";
}

closeButton.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", event => {
	if (event.target === lightbox) {
		closeLightbox();
	}
});

document.addEventListener("keydown", event => {
	if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
		closeLightbox();
	}
});
