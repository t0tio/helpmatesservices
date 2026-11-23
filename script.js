document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => loader.style.display = 'none', 800);
        }, 600);
    }

    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            navToggle.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.classList.remove('active');
            });
        });
    }

    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        revealEls.forEach(el => observer.observe(el));
    }

    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let valid = true;
            document.querySelectorAll('.form-error').forEach(el => el.classList.remove('show'));

            const name = document.getElementById('formName');
            const email = document.getElementById('formEmail');
            const phone = document.getElementById('formPhone');
            const message = document.getElementById('formMessage');
            const consent = document.getElementById('formConsent');

            if (!name.value.trim()) { document.getElementById('nameError').classList.add('show'); valid = false; }
            if (!email.value.trim() || !email.value.includes('@')) { document.getElementById('emailError').classList.add('show'); valid = false; }
            if (!phone.value.trim()) { document.getElementById('phoneError').classList.add('show'); valid = false; }
            if (!message.value.trim()) { document.getElementById('messageError').classList.add('show'); valid = false; }
            if (!consent.checked) { document.getElementById('consentError').classList.add('show'); valid = false; }

            if (valid) {
                const btn = document.getElementById('formSubmit');
                const txt = btn.innerHTML;
                btn.innerHTML = 'Sending...';
                btn.disabled = true;
                setTimeout(() => {
                    document.getElementById('formSuccess').classList.add('show');
                    form.reset();
                    btn.innerHTML = txt;
                    btn.disabled = false;
                    setTimeout(() => {
                        document.getElementById('formSuccess').classList.remove('show');
                    }, 5000);
                }, 1500);
            }
        });
    }

    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 500);
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});