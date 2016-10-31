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

function pressFooter(){
	$('.content').height('auto');
	//bitrix panel
	var adminHeight = $('#bx-panel').length ? $('#bx-panel').outerHeight(true) : 0;

	var viewportHeight = $(window).outerHeight(true);

	var headerHeight = $('.header').outerHeight(true);
	var contentHeight = $('.content').outerHeight(true);
	var footerHeight = $('.footer').outerHeight(true);

	var contentHeight = headerHeight + contentHeight + footerHeight + adminHeight;


	if ( (viewportHeight - contentHeight) > 0 ) {
		contentHeight = viewportHeight - ( headerHeight + footerHeight + adminHeight);
		$('.content').height(contentHeight+"px");
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
