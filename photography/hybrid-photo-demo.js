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

const tabs = document.querySelectorAll(".expo-tab[data-expo]");
const panels = document.querySelectorAll(".expo-panel");
const galleryPanels = document.querySelectorAll(".expo-panel");
const modeButtons = document.querySelectorAll(".photo-mode");
const expoShell = document.querySelector(".expo-shell");
const archiveCollapse = document.querySelector(".archive-collapse");
const commissionFilters = document.querySelectorAll("[data-commission-filter]");
const commissionJumps = document.querySelectorAll("[data-commission-jump]");
const commissionShots = document.querySelectorAll(".client-shot");
const lightbox = document.querySelector(".hybrid-lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxClose = lightbox.querySelector(".hybrid-lightbox__close");

function setArchiveCollapsed(isCollapsed) {
	if (!expoShell || !archiveCollapse) return;

	expoShell.classList.toggle("is-collapsed", isCollapsed);
	archiveCollapse.setAttribute("aria-expanded", String(!isCollapsed));
	archiveCollapse.setAttribute("aria-label", isCollapsed ? "Expand photography archive" : "Collapse photography archive");
}

function openLightbox(src, alt) {
	lightboxImage.src = src;
	lightboxImage.alt = alt;
	lightbox.classList.add("is-open");
	lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
	lightbox.classList.remove("is-open");
	lightbox.setAttribute("aria-hidden", "true");
	lightboxImage.src = "";
}

function updateFocus(panel) {
	const id = panel.id;
	const images = galleries[id];
	if (!images) return;
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
	if (!grid || !galleries[id]) return;

	grid.innerHTML = galleries[id].map((image, index) => `
		<button type="button" data-index="${index}" aria-label="Open image ${index + 1}">
			<img src="${image.src}" alt="${image.alt}">
		</button>
	`).join("");

	grid.querySelectorAll("button").forEach(button => {
		button.addEventListener("click", () => {
			const image = galleries[id][Number(button.dataset.index)];
			openLightbox(image.src, image.alt);
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

galleryPanels.forEach(panel => {
	if (galleries[panel.id]) {
		renderArchive(panel);
		updateFocus(panel);
	}

	panel.querySelectorAll(".view-btn").forEach(button => {
		button.addEventListener("click", () => setView(panel, button.dataset.view));
	});

	const next = panel.querySelector(".focus-next");
	const prev = panel.querySelector(".focus-prev");

	if (!next || !prev || !galleries[panel.id]) return;

	next.addEventListener("click", () => {
		state[panel.id] = (state[panel.id] + 1) % galleries[panel.id].length;
		updateFocus(panel);
	});

	prev.addEventListener("click", () => {
		state[panel.id] = (state[panel.id] - 1 + galleries[panel.id].length) % galleries[panel.id].length;
		updateFocus(panel);
	});
});

tabs.forEach(tab => {
	tab.addEventListener("click", () => {
		setMode("exhibitions");
		tabs.forEach(item => item.classList.remove("active"));
		panels.forEach(panel => panel.classList.remove("active"));
		tab.classList.add("active");
		document.getElementById(tab.dataset.expo).classList.add("active");
	});
});

function activatePanel(id) {
	tabs.forEach(item => item.classList.remove("active"));
	panels.forEach(panel => panel.classList.remove("active"));

	const panel = document.getElementById(id);
	if (panel) panel.classList.add("active");
}

function setMode(mode) {
	modeButtons.forEach(button => {
		button.classList.toggle("active", button.dataset.mode === mode);
	});
	if (expoShell) {
		expoShell.classList.toggle("commission-mode", mode === "commissions");
	}
}

function activateExhibition(id = "rhossili") {
	setMode("exhibitions");
	tabs.forEach(item => item.classList.toggle("active", item.dataset.expo === id));
	panels.forEach(panel => panel.classList.remove("active"));

	const panel = document.getElementById(id);
	if (panel) panel.classList.add("active");

}

function applyCommissionFilter(type = "all") {
	const filterType = type || "all";

	setMode("commissions");
	setArchiveCollapsed(false);
	activatePanel("commissions");

	commissionFilters.forEach(filter => {
		filter.classList.toggle("active", filter.dataset.commissionFilter === filterType);
	});

	commissionShots.forEach(shot => {
		shot.classList.toggle("is-hidden", filterType !== "all" && !shot.classList.contains(filterType));
	});
}

modeButtons.forEach(button => {
	button.addEventListener("click", () => {
		if (button.dataset.mode === "commissions") {
			applyCommissionFilter("all");
		} else {
			activateExhibition(document.querySelector(".expo-tab.active")?.dataset.expo || "rhossili");
		}

		document.getElementById("exhibitions").scrollIntoView({ behavior: "smooth", block: "start" });
	});
});

if (archiveCollapse) {
	archiveCollapse.addEventListener("click", () => {
		setArchiveCollapsed(!expoShell.classList.contains("is-collapsed"));
	});
}

commissionFilters.forEach(filter => {
	filter.addEventListener("click", () => applyCommissionFilter(filter.dataset.commissionFilter));
});

commissionJumps.forEach(link => {
	link.addEventListener("click", event => {
		event.preventDefault();
		applyCommissionFilter(link.dataset.commissionJump);
		document.getElementById("exhibitions").scrollIntoView({ behavior: "smooth", block: "start" });
	});
});

commissionShots.forEach(shot => {
	shot.addEventListener("click", () => {
		const image = shot.querySelector("img");
		openLightbox(image.src, image.alt);
	});
});

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
