$(document).ready(function () {

    svg4everybody({});

	// Настройки плагина mmenu =======================================================
	$("#my-menu").mmenu({
		extensions: [
			"fx-listitems-slide",
			"position-right"],
		onClick : {
			close          : true,
			preventDefault : true
		},
		pageScroll: {
			scroll: true,
			update: true
		},
		navbar: {
			title: "<a class='header-logo--m-menu' href='#'><div class='logo-img--m-menu'><img src='/static/images/general/logo.png'></div><span class='logo-title--m-menu'>OENRIQUE</span><span class='logo-subtitle--m-menu'>UX/UI EXPERT</span></a>"
		}
	});

	// Иннициализация и настройка кнопки (гамбургера) mmenu ============================
	let api = $("#my-menu").data("mmenu");
	api.bind("open:finish", function() {
		$('.hamburger').addClass('is-active');
	});
	api.bind("close:finish", function() {
		$('.hamburger').removeClass('is-active');
	});

	// Скрипт плавной прокрутки до якоря на десктопной версии ===========================
	function myScroll() {
		console.log($(window).width());
		if ($(window).width() > 670) {
			console.log("script");
			$('a[href*="#"]').on('click.smoothscroll', function( e ){
				var hash    = this.hash, _hash   = hash.replace(/#/,''), theHref = $(this).attr('href').replace(/#.*/, '');
				if( theHref && location.href.replace(/#.*/,'') != theHref ) return;
				var $target = _hash === '' ? $('body') : $( hash + ', a[name="'+ _hash +'"]').first();
				if( ! $target.length ) return;
				e.preventDefault();
				$('html, body').stop().animate({ scrollTop: $target.offset().top - 0 }, 200, 'swing', function(){
					window.location.hash = hash;
				});
			});
		}
	}

	myScroll();

	$(window).resize(function() {
		console.log("resize");
		myScroll();
	});


	// Скрипт кнопки button-up =======================================================
	$(window).scroll(function(){
	//Определяет положение полосы прокрутки и если ниже 100px, то появляется кнопка.
		if ($(this).scrollTop() > 400) {
			$('.scrollup').fadeIn();
		} else {
			$('.scrollup').fadeOut();
		}
	});

	$('.scrollup').click(function(){
	//Есть еще два значения:
	//0 - страница будет прокручена до самого налача
	//600 - скорость анимации прокрутки
		$("html, body").animate({ scrollTop: 0 }, 600);
		return false;
	});


	// Иннициализация плагина slick-slider и его настройка
	$('.slider-testimonials').slick({
		dots: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		infinite: false
	});

	// $('.slides').on('setPosition', function () {
	// 	$(this).find('.slick-slide').height('auto');
	// 	var slickTrack = $(this).find('.slick-track');
	// 	var slickTrackHeight = $(slickTrack).height();
	// 	$(this).find('.slick-slide').css('height', slickTrackHeight + 'px');
	// });



});