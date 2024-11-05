let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .navbar');

menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
};
window.onscroll = () =>{
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
};

const typed = new Typed('.multiple-text',  {
    strings: [
        'Desenvolvimento em Java',
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


