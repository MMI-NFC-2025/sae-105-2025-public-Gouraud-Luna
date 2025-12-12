(() => {
	const carousel = document.querySelector('.carousel');
	if (!carousel) return;

	const inner = carousel.querySelector('.carousel__inner');
	const slides = Array.from(carousel.querySelectorAll('.slide'));
	const prevBtn = carousel.querySelector('#prec');
	const nextBtn = carousel.querySelector('#next');
	const dotsContainer = carousel.querySelector('.carousel__dots');

	if (!inner || !prevBtn || !nextBtn || !dotsContainer || slides.length === 0) return;

	let currentIndex = 0;

	const goTo = (index) => {
		currentIndex = (index + slides.length) % slides.length;
		inner.style.transform = `translateX(-${currentIndex * 100}%)`;
		updateActiveStates();
	};

	const updateActiveStates = () => {
		slides.forEach((slide, idx) => {
			const isActive = idx === currentIndex;
			slide.classList.toggle('is-active', isActive);
			slide.setAttribute('aria-hidden', String(!isActive));
		});

		const dots = dotsContainer.querySelectorAll('.carousel__dot');
		dots.forEach((dot, idx) => {
			dot.classList.toggle('is-active', idx === currentIndex);
			dot.setAttribute('aria-pressed', idx === currentIndex ? 'true' : 'false');
		});
	};

	const createDots = () => {
		dotsContainer.innerHTML = '';
		slides.forEach((_, idx) => {
			const dot = document.createElement('button');
			dot.type = 'button';
			dot.className = 'carousel__dot';
			dot.setAttribute('aria-label', `Aller à la photo ${idx + 1}`);
			dot.addEventListener('click', () => goTo(idx));
			dotsContainer.appendChild(dot);
		});
	};

	const bindControls = () => {
		prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
		nextBtn.addEventListener('click', () => goTo(currentIndex + 1));
	};

	const init = () => {
		createDots();
		updateActiveStates();
		bindControls();
	};

	init();
})();
