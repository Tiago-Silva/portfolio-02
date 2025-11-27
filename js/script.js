let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .navbar');

// Toggle menu on button click (X button)
menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
    document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : 'auto';
};


// Close menu when clicking on a menu item
document.querySelectorAll('.navbar a').forEach(link => {
    link.onclick = () => {
        menu.classList.remove('fa-times');
        navbar.classList.remove('active');
        document.body.style.overflow = 'auto';
    };
});

// Close menu when clicking on backdrop
navbar.addEventListener('click', (e) => {
    if (e.target === navbar) {
        menu.classList.remove('fa-times');
        navbar.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Scroll Spy - Highlight active menu item based on visible section
let sections = document.querySelectorAll('section[id]');
let navLinks = document.querySelectorAll('.navbar a');

function scrollActive() {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
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

window.addEventListener('scroll', scrollActive);

// Set initial active state on page load
window.addEventListener('load', scrollActive);

const typed = new Typed('.multiple-text',  {
    strings: [
        'API em Java',
        'Front-end com React',
        'Front-end com Next.js',
        'Aplicativos em React Native',
        'HTML e CSS Profissionais',
        'JavaScript Dinâmico',
        'Backend com Node.js',
        'Interfaces com Design Responsivo',
        'Clean Code',
        'Clean Architecture',
    ],
    typeSpeed: 60,
    backSpeed: 60,
    backDelay: 1000,
    loop: true,
});

var swiper = new Swiper(".project-slider", {
    spaceBetween: 20,
    grabCursor: true,
    loop:true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints:{
        0:{
            slidesPerView:1,
        },
        768:{
            slidesPerView:2,
        },
        991:{
            slidesPerView:3,
        },
    },
});

var swiper = new Swiper(".skill-slider", {
    spaceBetween: 20,
    grabCursor: true,
    loop:true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints:{
        0:{
            slidesPerView:1,
        },
        235:{
            slidesPerView:2,
        },
        340:{
            slidesPerView:3,
        },
        768:{
            slidesPerView:4,
        },
        850:{
            slidesPerView:5,
        },
        1130:{
            slidesPerView:6,
        },
    },
});
