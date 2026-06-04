const observer = new IntersectionObserver(

	(entries) => {

		entries.forEach(entry => {

			if(entry.isIntersecting){

				entry.target.classList.add("visible");

			}

		});

	},

	{
		threshold: .15
	}

);

document
	.querySelectorAll(".reveal")
	.forEach(el => observer.observe(el));



const gallery =
	document.querySelector(".horizontal-gallery");

const track =
	document.querySelector(".gallery-track");

function animateGallery(){

	if(!gallery || !track) return;

	const rect =
		gallery.getBoundingClientRect();

	const maxScroll =
		gallery.offsetHeight -
		window.innerHeight;

	const progress =
		Math.min(
			Math.max(
				(-rect.top) / maxScroll,
				0
			),
			1
		);

	const maxMove =
		track.scrollWidth -
		window.innerWidth;

	track.style.transform =
		`translateX(${-progress * maxMove}px)`;

	requestAnimationFrame(
		animateGallery
	);

}

animateGallery();
