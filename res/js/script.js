
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

/* Carousel */
(function carouselInit() {
    const slides = $$('.slide');
    const prev = $('.prev');
    const next = $('.next');
    let idx = 0;
    let timer = null;

    function show(i) {
        slides.forEach(s => s.classList.remove('active'));
        slides[i].classList.add('active');
    }
    function nextSlide() { idx = (idx + 1) % slides.length; show(idx); }
    function prevSlide() { idx = (idx - 1 + slides.length) % slides.length; show(idx); }

    if (next && prev) {
        next.addEventListener('click', () => { nextSlide(); resetTimer(); });
        prev.addEventListener('click', () => { prevSlide(); resetTimer(); });
    }

    function resetTimer() { clearInterval(timer); timer = setInterval(nextSlide, 6000); }
    resetTimer();
})();

/* Lazy load images */
(function lazyLoad() {
    const lazyImgs = $$('.lazy');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    const img = e.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    obs.unobserve(img);
                }
            });
        }, { rootMargin: "200px" });
        lazyImgs.forEach(img => io.observe(img));
    } else {
        // fallback
        lazyImgs.forEach(img => img.src = img.dataset.src);
    }
})();

/* Filters */
(function filters() {
    const chips = $$('.chip');
    const cards = $$('.card');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            const f = chip.dataset.filter;
            cards.forEach(card => {
                card.style.display = (f === 'all' || card.dataset.type === f) ? '' : 'none';
            });
        });
    });
})();

/* Dish modal */
(function modal() {
    const modal = $('#dishModal');
    const modalImg = $('#modalImg');
    const modalTitle = $('#modalTitle');
    const modalDesc = $('#modalDesc');
    const openBtns = $$('.open-dish');
    const closeBtns = $$('.modal-close');

    openBtns.forEach(btn => btn.addEventListener('click', () => {
        modalImg.src = btn.dataset.img;
        modalTitle.textContent = btn.dataset.title;
        modalDesc.textContent = btn.dataset.desc;
        modal.setAttribute('aria-hidden', 'false');
    }));
    closeBtns.forEach(b => b.addEventListener('click', () => modal.setAttribute('aria-hidden', 'true')));
    modal.addEventListener('click', e => { if (e.target === modal) modal.setAttribute('aria-hidden', 'true'); });

    // Reserve from modal
    $('#modalReserve').addEventListener('click', () => {
        modal.setAttribute('aria-hidden', 'true');
        document.querySelector('input[name="name"]').focus();
        window.scrollTo({ top: document.querySelector('#contact').offsetTop - 80, behavior: 'smooth' });
    });
})();

/* Smooth scroll for nav */
(function smoothScroll() {
    $$('.nav-links a').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const id = a.getAttribute('href');
            document.querySelector(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
})();

/* Reservation form (demo) */
$('#reserveForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const form = new FormData(this);
    // demo: show toast
    alert(`已收到訂位：${form.get('name')}，我們會以電話 ${form.get('phone')} 聯絡您。`);
    this.reset();
});

/* Mobile nav toggle */
(function mobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    const container = document.querySelector('.container.nav');
    toggle.addEventListener('click', () => {
        links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
        container.style.height = container.style.height === 'auto' ? '60px' : 'auto';
    });
})();