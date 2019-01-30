$(document).ready(function () {
  svg4everybody({});
  slider();
});


$(window).on('resize', function () {
  slider();
});




var slider = function () {

  var sliderElem = $('.js-categories-prev');

  if ($(window).width() < 730 && !(sliderElem.hasClass('slick-initialized'))) {
    sliderElem.slick({
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 2,
      dots: true,
      arrows: true,
      prevArrow: '.categories-prev__btn.categories-prev__btn--prev',
      nextArrow: '.categories-prev__btn.categories-prev__btn--next',
      responsive: [
        {
          breakpoint: 430,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 650,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          }
        },
        {
          breakpoint: 730,
          settings: "slick",
        },
        {
          breakpoint: 4000,
          settings: "unslick"
        }
      ]
    });
  } else if ($(window).width() > 730 && sliderElem.hasClass('slick-initialized')) {
    sliderElem.slick('unslick')
  }

};

