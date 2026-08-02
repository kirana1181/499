const galleries = {
	rhossili: [
		"rhosbay1.jpg",
		"rhosbay2.jpg",
		"rhosbay3.jpg",
		"rhosbay4.jpg",
		"rhosbay4-2.jpg",
		"rhosbay5.jpg",
		"rhosbay6.jpg",
		"rhosbay7.jpg",
		"rhosbay8.jpg",
		"rhosbay9.jpg",
		"rhosbay10.jpg",
		"rhossbay11comp.png",
		"rhosbay12.jpg",
		"rhosbay13.jpg",
		"rhosbay14.jpg",
		"rhosbay17comp.png",
		"rhosbay19.jpg",
		"rhosbay19-2.jpg",
		"rhosbay20.jpg",
		"rhosbay21.jpg",
		"rhosbay22.jpg",
		"rhosbay23.jpg",
		"rhosbay23-2.jpg",
		"rhosbay24.jpg",
		"rhosbay26comp.png",
		"rhosbay27.jpg",
		"rhosbay28.png",
		"rhosbay29.png",
		"rhosbay30.png",
		"rhosbay31.png"
	].map(file => ({
		src: `../images/rhosbay/${file}`,
		alt: "Rhossili Bay photograph"
	})),
	florida: [
		"okapi.jpg",
		"deer.jpg",
		"elephant1.jpg",
		"rhino.jpg",
		"zebra1.jpg"
	].map(file => ({
		src: `../images/fp/${file}`,
		alt: "Florida Project photograph"
	})),
	birds: [
		"bird1.jpg",
		"bird2.jpg",
		"bird3.jpg",
		"vulturewing.jpg"
	].map(file => ({
		src: `../images/fp/${file}`,
		alt: "Bird photograph"
	}))
};

const state = {
	rhossili: 0,
	florida: 0,
	birds: 0
};

const tabs = document.querySelectorAll(".expo-tab");
const panels = document.querySelectorAll(".expo-panel");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxClose = lightbox.querySelector(".lightbox-close");

function updateFocus(panel) {
	const id = panel.id;
	const images = galleries[id];
	const index = state[id];
	const image = images[index];
	const focusImage = panel.querySelector(".focus-view img");
	const caption = panel.querySelector(".focus-view figcaption");

	focusImage.src = image.src;
	focusImage.alt = image.alt;
	caption.textContent = `${index + 1} / ${images.length}`;

	focusImage.onload = () => {
		focusImage.classList.toggle("is-wide", focusImage.naturalWidth >= focusImage.naturalHeight);
		focusImage.classList.toggle("is-portrait", focusImage.naturalHeight > focusImage.naturalWidth);
	};
}

function renderArchive(panel) {
	const grid = panel.querySelector(".archive-grid");
	const id = panel.id;

	grid.innerHTML = galleries[id].map((image, index) => `
		<button type="button" data-index="${index}" aria-label="Open image ${index + 1}">
			<img src="${image.src}" alt="${image.alt}">
		</button>
	`).join("");

	grid.querySelectorAll("button").forEach(button => {
		button.addEventListener("click", () => {
			const image = galleries[id][Number(button.dataset.index)];
			lightboxImage.src = image.src;
			lightboxImage.alt = image.alt;
			lightbox.classList.add("is-open");
			lightbox.setAttribute("aria-hidden", "false");
		});
	});
}

function setView(panel, view) {
	const archive = panel.querySelector(".archive-grid");
	const focus = panel.querySelector(".focus-view");

	panel.querySelectorAll(".view-btn").forEach(button => {
		button.classList.toggle("active", button.dataset.view === view);
	});

	archive.hidden = view !== "archive";
	focus.hidden = view !== "focus";

	if (view === "focus") {
		updateFocus(panel);
	}
}

panels.forEach(panel => {
	renderArchive(panel);
	updateFocus(panel);

	panel.querySelectorAll(".view-btn").forEach(button => {
		button.addEventListener("click", () => setView(panel, button.dataset.view));
	});

	panel.querySelector(".focus-next").addEventListener("click", () => {
		state[panel.id] = (state[panel.id] + 1) % galleries[panel.id].length;
		updateFocus(panel);
	});

	panel.querySelector(".focus-prev").addEventListener("click", () => {
		state[panel.id] = (state[panel.id] - 1 + galleries[panel.id].length) % galleries[panel.id].length;
		updateFocus(panel);
	});
});

tabs.forEach(tab => {
	tab.addEventListener("click", () => {
		tabs.forEach(item => item.classList.remove("active"));
		panels.forEach(panel => panel.classList.remove("active"));
		tab.classList.add("active");
		document.getElementById(tab.dataset.expo).classList.add("active");
	});
});

function closeLightbox() {
	lightbox.classList.remove("is-open");
	lightbox.setAttribute("aria-hidden", "true");
	lightboxImage.src = "";
}

lightboxClose.addEventListener("click", closeLightbox);
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
