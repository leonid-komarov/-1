// Копируем код из sample-for-the-creator.js 

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация Swiper карусели
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 6,
        spaceBetween: 10,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
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

    // Анимация появления элементов при скролле
    function checkScroll() {
        const elements = document.querySelectorAll('.about-project__content, .carousel-section');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.75) {
                element.classList.add('active');
            }
        });
    }

    // Проверяем положение элементов при загрузке и скролле
    checkScroll();
    window.addEventListener('scroll', checkScroll);

    // Анимация при наведении на карточки в карусели
    const carouselLinks = document.querySelectorAll('.carousel-link');
    
    carouselLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.classList.add('hover');
        });
        
        link.addEventListener('mouseleave', () => {
            link.classList.remove('hover');
        });
    });
}); 