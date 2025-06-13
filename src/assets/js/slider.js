const swiper = new Swiper('#swiper1', {
  // Optional parameters
  autoplay: true,
  loop: true,
  centeredSlides: false,
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    // when window width is >= 320px
    768: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    // when window width is >= 480px
    1024: {
      slidesPerView: 3,
      spaceBetween: 10
    },
    // when window width is >= 640px
    1280: {
      slidesPerView: 3,
      spaceBetween: 10
    }
  }
});

//Sale Slider js

const swiper2 = new Swiper('#salecarousel', {
  // Optional parameters
  autoplay: true,
  loop: true,
  centeredSlides: false,
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    // when window width is >= 320px
    768: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    // when window width is >= 480px
    1024: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    // when window width is >= 640px
    1280: {
      slidesPerView: 2.1,
      spaceBetween: 10
    }
  }
});

//Rent Slider js

const swiper3 = new Swiper('#rentcarousel', {
  // Optional parameters
  autoplay: true,
  loop: true,
  centeredSlides: false,
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    // when window width is >= 320px
    768: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    // when window width is >= 480px
    1024: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    // when window width is >= 640px
    1280: {
      slidesPerView: 2.1,
      spaceBetween: 10
    }
  }
});

//To Share Slider js

const swiper4 = new Swiper('#tosharecarousel', {
  // Optional parameters
  autoplay: true,
  loop: true,
  centeredSlides: false,
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    // when window width is >= 320px
    768: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    // when window width is >= 480px
    1024: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    // when window width is >= 640px
    1280: {
      slidesPerView: 2.1,
      spaceBetween: 10
    }
  }
});