;(function() {
	'use strict';

	var rows = [].slice.call(document.querySelectorAll('.track-row'));
	var audio = document.querySelector('.archive-audio');
	var watchSound = document.querySelector('.watch-sound');
	var videoTitle = document.querySelector('.watch-sound__title');
	var videoNote = document.querySelector('.watch-sound__note');
	var explore = document.querySelector('.explore-archive');
	var gridView = document.querySelector('.view--grid');
	var archive = document.querySelector('#track-archive');

	rows.forEach(function(row) {
		row.addEventListener('click', function() {
			rows.forEach(function(other) {
				other.classList.remove('is-current');
			});
			row.classList.add('is-current');

			if (audio && row.getAttribute('data-audio')) {
				audio.src = row.getAttribute('data-audio');
				audio.load();
				if (watchSound) {
					watchSound.classList.remove('is-playing');
				}
			}

			if (videoTitle) {
				videoTitle.textContent = row.getAttribute('data-video-title') || row.querySelector('.track-row__title').textContent;
			}

			if (videoNote) {
				videoNote.textContent = row.getAttribute('data-video-note') || '';
			}
		});
	});

	if (audio && watchSound) {
		audio.addEventListener('play', function() {
			watchSound.classList.add('is-playing');
		});

		audio.addEventListener('pause', function() {
			watchSound.classList.remove('is-playing');
		});

		audio.addEventListener('ended', function() {
			watchSound.classList.remove('is-playing');
		});
	}

	if (explore && gridView && archive) {
		explore.addEventListener('click', function(ev) {
			ev.preventDefault();
			gridView.scrollTo({
				top: archive.offsetTop,
				behavior: 'smooth'
			});
		});
	}
}());
