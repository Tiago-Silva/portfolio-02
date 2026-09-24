/* ==========================================================================
   TIAGO SILVA PORTFOLIO - JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Navigation Toggle
    const menuBtn = document.querySelector('#menu-btn');
    const navbar = document.querySelector('.navbar');

    if (menuBtn && navbar) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('fa-xmark');
            navbar.classList.toggle('active');
        });

        // Close menu on link click
        document.querySelectorAll('.navbar a').forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('fa-xmark');
                navbar.classList.remove('active');
            });
        });
    }

    // 2. Active Link Scroll Spy
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar a');

    function scrollSpy() {
        const scrollY = window.scrollY;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', scrollSpy);
    scrollSpy();

    // 3. Typed.js Hero Subtitle Typing Animation
    if (document.querySelector('.multiple-text')) {
        new Typed('.multiple-text', {
            strings: [
                'Desenvolvedor Rust & Java',
                'Especialista em Sistemas ERP',
                'Engenheiro Full Stack & Mobile',
                'Criador do RhemaBiblion (Desktop & Mobile)',
                'React • Next.js • Tauri',
                'Arquitetura Limpa & Alta Performance'
            ],
            typeSpeed: 50,
            backSpeed: 40,
            backDelay: 1500,
            loop: true
        });
    }

    // 4. Project Category Filter (FIX: Guarantees visibility even if images are loading)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active filter button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.classList.remove('hide');
                        card.classList.add('aos-animate');
                        card.style.opacity = '1';
                        card.style.transform = 'none';
                        card.style.visibility = 'visible';
                        card.style.animation = 'fadeIn 0.3s ease forwards';
                    } else {
                        card.classList.add('hide');
                    }
                });

                // Refresh AOS positions
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }
            });
        });
    }

    // 5. AOS (Animate On Scroll) Initialization
    function initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                offset: 60,
                duration: 600,
                once: true,
                easing: 'ease-out-cubic'
            });
        }
    }

    initAOS();

    // Re-refresh AOS after window fully loads images to ensure position calculation accuracy
    window.addEventListener('load', () => {
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    });
});
