$(document).ready(function () {

  svg4everybody({});


  $('.js-categories-prev').slick({
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

  var trackHeight = $(".slick-track").height();

  $(".slick-slide").height(trackHeight * 1.05);


})

//
// $(window).on('resize', function () {
//
// });