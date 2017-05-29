$.fn.ravno = function () {
	var maxH = -1;
	var $cols = $(this).height("auto").each(function () {
		var h = $(this).height();
		maxH = (h > maxH) ? h : maxH;
	});
	$cols.height(maxH);
};

function randomInteger(min, max) {
	var rand = min - 0.5 + Math.random() * (max - min + 1)
	rand = Math.round(rand);
	return rand;
}

function pressFooter(cms, container){

	var $content = $(container),
			adminHeight,
			viewportHeight,
			headerHeight,
			siteHeight,
			footerHeight,
			newHeight;

	switch (cms) {
		case 'bitrix':
			adminHeight = $('#bx-panel').length ? $('#bx-panel').outerHeight(true) : 0;
			break;
		case 'emerald':
			adminHeight = $('.adminTopPanel').length ? $('.adminTopPanel').outerHeight(true) : 0;
			break;
		default:
			adminHeight = 0;
	}

	$content.height('auto');
	viewportHeight = $(window).outerHeight(true);

	headerHeight = $('header').outerHeight(true);
	contentHeight = $content.outerHeight(true);
	footerHeight = $('footer').outerHeight(true);

	siteHeight = headerHeight + contentHeight + footerHeight + adminHeight;

	if ( (viewportHeight > siteHeight) ) {
		newHeight = viewportHeight - ( headerHeight + footerHeight + adminHeight);
		$content.outerHeight(newHeight+"px");
	}

};

	/* -= SCROLL UP =- */
	$("#scroll-top").click(function(e) {
		e.preventDefault();
		$('html, body').animate({
				scrollTop: $("#header-top").offset().top
		}, 1000);
	});

	/* SLIM MENU */
	var $topMenu = $('.head');

	function switchTop(){

		var $scrollTop = $('body').scrollTop();
		if( $scrollTop ){
			$topMenu.addClass('head--slim');

			if ( $topMenu.hasClass('head--slim') && $scrollTop > 760 ){
				$topMenu.addClass('head--no-bkg');
			} else { $topMenu.removeClass('head--no-bkg'); }


		} else {
			$topMenu.removeClass('head--slim');
		}
	};

	$(document).scroll(switchTop);

/* fancybox */
$(".examples a").click(function(event){
	event.preventDefault();

	var $self = $(this),
			url = $self.attr("href");
	$.get(url).done(function(data){
		var $data = $(data),
				$h1 = $data.find("h1"),
				$docItem = $data.find("div.docItem");
		$docItem.find(".docBack").detach();

		var $targetDiv = $("<div />").hide();
		$targetDiv.append($h1).append($docItem);
		$.fancybox.open($targetDiv);
	});
});
/* fancybox */


//smooth load sliders ( before slider loaded ! )
	$('.slider').on('init', function(event, slick) {
		$('.slider-wrapp').removeClass('slider-wrapp--hidden');
		$('.spiner-wrapp').addClass('spiner-wrapp--hidden');
	});


var mobile = window.matchMedia( "(max-width: 767px)" );

//accordion func
function toggleMenu(e){
	e.preventDefault();
	$('.site-nav__item').removeClass('site-nav__item--act');
	$(this).parent().addClass('site-nav__item--act');
	$(this).parent().siblings().find('ul').stop().hide('slow');
	$(this).next().stop().toggle('slow');
};
if (window.devicePixelRatio > 1) {
	$(".retina").imagesLoaded(function () {
		$(".retina").each(function () {
			var src = $(this).attr("src").replace(".", "@2x.");
			var h = $(this).height();
			$(this).attr("src", src).css({
				height: h
				, width: "auto"
			});
		});
	});
}


document.addEventListener('DOMContentLoaded', function () {

	var mobileView = window.matchMedia("(max-width: 768px)").matches;
	if (mobileView) {
		var meta = document.createElement('meta');
		meta.setAttribute('name', 'viewport');
		meta.setAttribute('content', 'initial-scale=1.0, width=device-width');
		document.getElementsByTagName("head")[0].appendChild(meta);
	}

});

var isMobile = { 
	Android: function() { 
		return navigator.userAgent.match(/Android/i); 
	}, 
	BlackBerry: function() { 
		return navigator.userAgent.match(/BlackBerry/i); 
	}, 
	iOS: function() { 
		return navigator.userAgent.match(/iPhone|iPad|iPod/i); 
	},
	Opera: function() { 
		return navigator.userAgent.match(/Opera Mini/i); 
	}, 
	Windows: function() { 
		return navigator.userAgent.match(/IEMobile/i); 
	}, 
	any: function() { 
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); 
	} 
};

var $topMenu = $('.head');

		function switchTop(){

			var $scrollTop = $(document).scrollTop();
			if( $scrollTop ){
				$topMenu.addClass('head--slim');

				if ( $topMenu.hasClass('head--slim') && $scrollTop > 750 ){
					$topMenu.addClass('head--no-bkg');
				} else { $topMenu.removeClass('head--no-bkg'); }


			} else {
				$topMenu.removeClass('head--slim');
			}
		};
		switchTop();
		$(document).scroll(switchTop);

$('.submenu a[href^="#"]').click(function (e) {

	e.preventDefault();

	var target = $(this).attr('href'),
		scrollTo = $('' + target).offset().top;

	$('html, body').animate({
		scrollTop: scrollTo
	}, 800);

});
