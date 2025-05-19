var black = (function () {

$(function () {
    $('#nav a').add('a.scroll').click(function () {
        var target = $(this.hash);
        var hash = this.hash;
        // $target = $target.length && $target
        // || $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
            var targetOffset = target.offset().top;
            $('html,body').animate({scrollTop: targetOffset}, 600);
            return false;
		}
	});
	
	
    // THIS IS REALLY FREAKING BIZARRE 
    // I SHOULD NOT HAVE TO DO THIS BUT IE (6 & 7) ARE PRETTY MESSED UP.
    $('#news').css({'position': 'absolute'});
	var nav = $('#nav');
	nav.css({'position': 'absolute'});
	
	/*
	 * MAGICAL SCROLLING NAV
	 * (not that magical)
	 * 
 	 * This is using lots of vars because it gets called all the time 
 	 * on scroll, so it needs to be fast.
	 */
	var topmost_point = nav.offset().top;
    var left_point = $('#container').offset().left;
	var PADDING_TOP = 63; // MAGIC NUMBER
    var REAL_TOP = topmost_point - PADDING_TOP;
	var the_window = $(window);
	var NAV_IS_FIXED = (nav.css('position') == 'fixed');
	the_window.scroll(function () {
        if (the_window.scrollTop() > REAL_TOP) {
            if ($.browser.msie && $.browser.version == "6.0") {
                nav.css('top', the_window.scrollTop() + PADDING_TOP);
            } else if (!NAV_IS_FIXED) {
        	    nav.css({
                    left: left_point,
        	        top: PADDING_TOP,
        	        position: 'fixed'
        	    });
        	    NAV_IS_FIXED = true;
        	}
        } else {
            if (NAV_IS_FIXED) {
                nav.css({
                    position: 'absolute',
                    top: topmost_point,
                    left: ''
                });
                NAV_IS_FIXED = false;
            }
        }
	});
	
	the_window.resize(function () {
	    left_point = $('#container').offset().left;
	    if (NAV_IS_FIXED) {
    	    nav.css('left', left_point);	        
	    }
	});
	if (document.location.hash.match(/^#?order$/)) {
	    show_order_form();
	}	
});

//---
    return {
        format_price: format_price,
        get_price: get_price
    };
})();