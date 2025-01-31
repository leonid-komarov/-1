// ... существующий код ...

// Обработчик для gateway на всех страницах
document.addEventListener('DOMContentLoaded', function() {
    const gateway = document.querySelector('.gateway');
    if (gateway) {
        gateway.addEventListener('click', function() {
            gateway.classList.add('_hidden');
        });
    }
});

// ... остальной существующий код ...

// Ждем полной загрузки документа
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация Swiper карусели
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 6,
        spaceBetween: 10,
        loop: true,
        autoplay: {
            delay: 3000, // Задержка между слайдами (в мс)
            disableOnInteraction: false, // Продолжать автопрокрутку после взаимодействия пользователя
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            320: {
                slidesPerView: 2,
                spaceBetween: 10
            },
            576: {
                slidesPerView: 3,
                spaceBetween: 10
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 10
            },
            1024: {
                slidesPerView: 6,
                spaceBetween: 10
            }
        }
    });

    // Плавная прокрутка к секциям при клике на ссылки меню
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Анимация появления элементов при скролле
    const animItems = document.querySelectorAll('.about-project__content, .carousel-section');
    
    function onScroll() {
        animItems.forEach(item => {
            const itemHeight = item.offsetHeight;
            const itemOffset = offset(item).top;
            const animStart = 4;
            
            let animItemPoint = window.innerHeight - itemHeight / animStart;
            if (itemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }
            
            if ((window.pageYOffset > itemOffset - animItemPoint) && window.pageYOffset < (itemOffset + itemHeight)) {
                item.classList.add('active');
            }
        });
    }

    function offset(el) {
        const rect = el.getBoundingClientRect();
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    }

    // Добавляем обработчик скролла
    window.addEventListener('scroll', onScroll);
    // Вызываем функцию при загрузке страницы
    onScroll();

    // Добавляем класс для анимации при наведении на карточки
    const carouselLinks = document.querySelectorAll('.carousel-link');
    carouselLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        link.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });

    // Инициализация мобильного меню
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    const body = document.body;

    // Создаем оверлей
    let menuOverlay = document.querySelector('.menu-overlay');
    if (!menuOverlay) {
        menuOverlay = document.createElement('div');
        menuOverlay.className = 'menu-overlay';
        document.body.appendChild(menuOverlay);
    }

    function toggleMenu() {
        menuToggle.classList.toggle('active');
        menu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        body.classList.toggle('menu-open');

        // Закрываем все открытые подменю при закрытии основного меню
        if (!menu.classList.contains('active')) {
            const activeSubmenus = menu.querySelectorAll('.menu__ul__list1.active');
            const activeItems = menu.querySelectorAll('.menu__list-item.active');
            activeSubmenus.forEach(submenu => submenu.classList.remove('active'));
            activeItems.forEach(item => item.classList.remove('active'));
        }
    }

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });

        menuOverlay.addEventListener('click', toggleMenu);

        // Обработка подменю
        const menuItems = document.querySelectorAll('.menu__list-item');
        menuItems.forEach(item => {
            const link = item.querySelector('.menu__list-link');
            const submenu = item.querySelector('.menu__ul__list1');
            
            if (link && submenu) {
                link.addEventListener('click', function(e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // Закрываем другие подменю того же уровня
                        const parent = item.parentElement;
                        const siblings = parent.children;
                        Array.from(siblings).forEach(sibling => {
                            if (sibling !== item) {
                                sibling.classList.remove('active');
                                const siblingSubmenu = sibling.querySelector('.menu__ul__list1');
                                if (siblingSubmenu) {
                                    siblingSubmenu.classList.remove('active');
                                }
                            }
                        });

                        // Переключаем текущее подменю
                        item.classList.toggle('active');
                        submenu.classList.toggle('active');
                    }
                });
            }
        });

        // Закрытие меню при клике вне его
        document.addEventListener('click', function(e) {
            if (menu.classList.contains('active') && 
                !menu.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                toggleMenu();
            }
        });

        // Закрытие меню при изменении размера окна
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && menu.classList.contains('active')) {
                toggleMenu();
            }
        });
    }
});