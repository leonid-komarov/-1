
const swiper = new Swiper(".mySwiper", {
  slidesPerView: 5,
  centeredSlides: true,
  spaceBetween: 5,
  grabCursor: true,

  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
},
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },



  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  
});

var swiper1 = new Swiper('.spl2', {
  pagination: '.swiper-pagination1',
  paginationClickable: true,
});
