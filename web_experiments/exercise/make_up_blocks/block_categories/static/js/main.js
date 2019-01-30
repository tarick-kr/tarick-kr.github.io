$(document).ready(function () {

  svg4everybody({});
  slider();

  // console.log(trackHeight);
  //
  // var trackHeight = $(".slick-track").height();
  //
  // console.log(trackHeight);
  //
  // $(".slick-slide").height(trackHeight * 1.05);
  //
  // trackHeight = null;
  //
  // console.log(trackHeight);

  // heightBlock('.slick-track');

});

$(window).on('resize', function () {

  slider();



  // console.log(trackHeight);
  //
  // var trackHeight = $(".slick-track").height();
  //
  // console.log(trackHeight);
  //
  // $(".slick-slide").height(trackHeight * 1.05);
  //
  // trackHeight = null;
  //
  // console.log(trackHeight);

  // heightBlock('.slick-track');

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



// var maxH = 0;
//
// var heightBlock = function (parentBlock) {
//
//
//
//   var blocks = $(parentBlock);
//   console.log(blocks);
//
//     maxH = blocks.eq(0).height();
//
//     blocks.each(function () {
//       if ( $(this).height() > maxH ) {
//           maxH = $(this).height();
//       }
//     });
//
//   blocks.height(maxH);
// }















// var hBlock = function () {
//   var trackHeight = document.getElementById('categoriesPrev').scrollHeight;
//   console.log(trackHeight);
//   // var slide =
//   document.getElementById('slick-slide00').style.height = "height: " + trackHeight +"px";
//   var hebl = document.getElementById('slick-slide00');
//   console.log(hebl);
//   // document.getElementsByClassName('.slick-slide').style.height = trackHeight;
//
// };

// var hBlock = function () {
//   var h = 0;
//   trackHeight = document.getElementById('categoriesPrev').scrollHeight;
//   console.log(h);
//   console.log(trackHeight);
//   console.log("---------------");
//   if(trackHeight !== h){
//     $(".slick-slide").height(trackHeight);
//     h = trackHeight;
//     console.log(h);
//     console.log("=================");
//   }
// };


// trackHeight = $(".slick-track").height();
//
// $(".slick-slide").height(trackHeight * 1.05);

// var hClHeight = document.getElementById('categoriesPrev').clientHeight;
// var hOffHeight = document.getElementById('categoriesPrev').offsetHeight;
// var hScrHeight = document.getElementById('categoriesPrev').scrollHeight;
//
// console.log("=================");
// console.log("clientHeight " + hClHeight);
// console.log("offsetHeight " + hOffHeight);
// console.log("scrollHeight " + hScrHeight);