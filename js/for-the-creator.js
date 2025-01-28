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
});