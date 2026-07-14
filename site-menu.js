(function () {
	"use strict";

	const menuToggle = document.getElementById("menuToggle");
	const sideMenu = document.getElementById("sideMenu");

	if (!menuToggle || !sideMenu) return;

	const root = sideMenu.dataset.menuRoot || ".";
	const pages = [
		{
			title: "Home",
			href: "index.html",
			accent: "#f5d06f"
		},
		{
			title: "Film",
			href: "newfilm.html",
			accent: "#a64b3d"
		},
		{
			title: "Photography",
			href: "photography/photo.html",
			accent: "#3f6f7a"
		},
		{
			title: "Art",
			href: "art.html",
			accent: "#7c4f91"
		},
		{
			title: "Electronics",
			href: "elec/electronics.html",
			accent: "#55765a"
		},
		{
			title: "Music",
			href: "music.html",
			accent: "#8c5c39"
		},
		{
			title: "Puppets",
			href: "pups/puppets.html",
			accent: "#c08a3f"
		}
	];

	const calls = [
		{
			title: "What I'm Up To Now!",
			desc: "current projects, notes, and works in motion",
			href: "index.html#featured"
		},
		{
			title: "Contact Here!",
			desc: "reach out for collaborations, screenings, and commissions",
			href: "index.html#contact"
		}
	];

	function fromRoot(path) {
		const cleanRoot = root.replace(/\/$/, "");
		return cleanRoot === "." ? path : `${cleanRoot}/${path}`;
	}

	if (!sideMenu.querySelector(".menu-chapter-list")) {
		sideMenu.innerHTML = `
			<div class="menu-map" aria-hidden="true">
				<p class="menu-map__label">navigation</p>
			</div>
			<div class="menu-chapter-list"></div>
			<div class="menu-callouts"></div>
		`;
	}

	const list = sideMenu.querySelector(".menu-chapter-list");
	const calloutList = sideMenu.querySelector(".menu-callouts");

	if (list && !list.children.length) {
		list.innerHTML = pages.map(page => `
			<a class="menu-link" href="${fromRoot(page.href)}" style="--accent: ${page.accent};" data-accent="${page.accent}">
				<span class="menu-link__title">${page.title}</span>
			</a>
		`).join("");
	}

	if (calloutList && !calloutList.children.length) {
		calloutList.innerHTML = calls.map(call => `
			<a class="menu-callout" href="${fromRoot(call.href)}">
				<span>${call.title}</span>
				<small>${call.desc}</small>
			</a>
		`).join("");
	}

	let menuTimeout;

	function openMenu() {
		clearTimeout(menuTimeout);
		menuToggle.classList.add("active");
		sideMenu.classList.add("show");
		document.body.classList.add("menu-open");
		menuToggle.setAttribute("aria-expanded", "true");
		menuToggle.setAttribute("aria-label", "Close menu");
	}

	function closeMenu(delay = 0) {
		clearTimeout(menuTimeout);
		menuTimeout = setTimeout(() => {
			menuToggle.classList.remove("active");
			sideMenu.classList.remove("show");
			document.body.classList.remove("menu-open");
			menuToggle.setAttribute("aria-expanded", "false");
			menuToggle.setAttribute("aria-label", "Open menu");
		}, delay);
	}

	function toggleMenu() {
		if (sideMenu.classList.contains("show")) {
			closeMenu();
		} else {
			openMenu();
		}
	}

	menuToggle.addEventListener("click", toggleMenu);

	sideMenu.addEventListener("mousemove", (event) => {
		const bounds = sideMenu.getBoundingClientRect();
		sideMenu.style.setProperty("--mx", `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
		sideMenu.style.setProperty("--my", `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
	});

	sideMenu.querySelectorAll(".menu-link").forEach(link => {
		link.addEventListener("mouseenter", () => {
			sideMenu.style.setProperty("--active-accent", link.dataset.accent || "#9d4d37");
		});
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") closeMenu();
	});

	sideMenu.addEventListener("click", (event) => {
		if (event.target.closest("a")) closeMenu();
	});
}());
