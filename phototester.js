document.addEventListener("DOMContentLoaded", () => {

	const buttons = document.querySelectorAll(".node");
	const galleries = document.querySelectorAll(".gallery");

	/* =========================
	   SWITCH GALLERIES ONLY
	========================= */

	buttons.forEach(button => {

		button.addEventListener("click", () => {

			buttons.forEach(b => b.classList.remove("active"));
			galleries.forEach(g => g.classList.remove("active"));

			button.classList.add("active");

			const target = document.getElementById(button.dataset.gallery);
			if (target) target.classList.add("active");

		});

	});

});
