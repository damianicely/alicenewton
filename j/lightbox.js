var black = (function () {
//------------

// function max (x, y) {
//     if (x < y) {
//         return y;
//     }
//     return x;
// }
/*
function balance_tops (nodes) {
    var local_max = 0;
    nodes.each(function () {
        local_max = Math.max($(this).offset().top, local_max);
    });
    nodes.each(function () {
        var me = $(this);
        var needs = local_max - me.offset().top;
        me.css('margin-top', needs + 20);
    });
};
*/
/*
function focus_self_label () {
    var me = $(this);
    if (me.hasClass('showing-label')) {
        me.removeClass('showing-label');
        if (me.val() == me.attr('title')) {
            me.val('');
        }
        if (me.attr('title') == 'Password') {
            me.attr('type', 'password');
        }
    }
}

function blur_self_label () {
    var me = $(this);
    if (!me.val() || me.val() == me.attr('title')) {
        me.addClass('showing-label');
        me.val(me.attr('title'));
        if (me.attr('title') == 'Password') {
            me.attr('type', 'text');
        }
    }
}

function label_with_title () {
    var me = $(this);
    if (!me.val()) {
        me.val(me.attr('title'));
        me.addClass('showing-label');
    }
    me.focus(focus_self_label);
    me.blur(blur_self_label);
};

function clear_self_labels () {
    var me = $(this);
    inps = me.find('.self-label');
    inps.each(function () {
        var input = $(this);
        input.unbind('blur');
        input.focus();
        input.blur();
    });
}
*/
/*
function show_panel_with_content (content, callback) {
    containerPos = $('#container').offset();
    $('#panel-mask').css({
        'height': $(document).height(),
        'margin-left': 0,
        'margin-right': 0,
        'width': '100%',
        'filter': 'alpha(opacity=90)'
    }).fadeIn();
    var panel = $('#panel');
    if (!panel.length) {
        var panel = $('<div id="panel" class="container_12"><a href="#close" class="panel-close-link">Close</a><div id="panel-inner" class="clearfix"></div></div>');
        panel.hide();
        $('body').append(panel);
    }
    var inner = panel.find('#panel-inner');
    inner.empty();
    inner.append(content.html());
    panel.css({
        top: $(window).scrollTop() + 20,
        left: ($('body').width() - panel.width()) / 2
    });
    panel.fadeIn(400, callback);
    $('.panel-close-link').click(close_panel);
}
*//*
function close_panel () {
    $('#panel').fadeOut();
    $('#panel-mask').fadeOut();
    return false;
}*/
/*
function get_price (num) {
    return Number(num.replace(/[^-0-9.]/g, ''));
}

function format_price (num) {
    num_str = '' + num;
    if (!num_str.match(/\./)) {
        return '$' + num_str + '.00';
    } else if (num_str.match(/\..$/)) {
        return '$' + num_str + '0';
    } else {
        return '$' + num_str.replace(/\.([0-9]{2}).+/, '.$1');
    }
}

function total_for (row) {
    var quant = 0 + row.find('td input.quantity').eq(0).val();
    var price = 0 + get_price(row.find('td.price').text());
    row.find('td.total').text(format_price(price * quant));
    return price * quant;
} 

function update_totals () {
    var grand_quantity = 0;
    var grand_total = 0;
    $('.order-table tbody tr').each(function () {
        var row = $(this);
        var new_quant = Number(row.find('td input.quantity').val());
        if (isNaN(new_quant)) {
            row.find('td input.quantity').val(0);
            alert('Please enter a valid quantity');
            row.find('td input.quantity').focus();            
        } else {
            grand_quantity += new_quant;         
        }
        grand_total += total_for(row);
    });
    
    
    $('.total-quantity').text(grand_quantity);
    $('.total-price').text(format_price(grand_total));
}
*/
/*
function show_order_form () {
    show_panel_with_content($('#order-panel'), function () {
        $('.order-form').submit(submit_order);
        $('.order-form button').click(function () {
            $(this).parents('form').submit();
            return false;
        });
        $('.order-form input').blur(update_totals);
    });
    return false;
}

function show_stockists () {
    window.setTimeout(function () {
        show_panel_with_content($('#stockists-panel'));        
    }, 600);
    return false;
}*/

/*
function submit_async (form, callback) {
    var form_data = form.serialize();
    $.post(form.attr('action'), form_data, callback, "json");
}
*/
/*
function submit_order () {
    // about to submit...
    var me = $(this);
    
    // calculate exceptions 
    var plus = 0;
    $("#panel-inner tr[data-per-unit]").each(function (idx, elem) {
        var per = +($(this).attr("data-per-unit"));
        var num = +($(this).find("input").val());
        if ((per != 1) && num) {
            plus += (per * num) - num;
        }
    });
    // check total...
    var quantity = Number($('#panel-inner .total-quantity').text()) + plus;
    if (quantity % 6 != 0 || quantity == 0) {
        alert("Please ensure that your total number of bottles can break into 6s. We ship 6 and 12-packs.");
        return false;
    }
    
    me.css({
        // opacity: 0.5,
        // filter: "alpha(50)"
    });
    me.find('button').attr('readonly', 'yes');
    $('.order-status-message').html('<em>SendingÃ¢â‚¬Â¦</em>');
    // then we do it
    submit_async(me, function (data, textStatus) {
        if (data['success']) {
            // success
            $('.order-status-message').html('<p>Order Sent Successfully</p>');
            window.setTimeout(close_panel, 2000);
        } else if (data['errors']) {
            // errors
            $('.order-status-message').html("<p>Please review the following errors:</p>" + 
                data['errors']);
            me.find('input,button').removeAttr('readonly');
        } else {
            // failure
            $('.order-status-message').html('<p>An error was encountered while sending</p>');
        }
    });
    me.find('input').attr('readonly', 'yes');
    return false;
}

function submit_maillist () {
	var me = $(this);
	if (!me.hasClass('expanded')) {
		me.addClass('expanded');
		// $('.self-label').each(label_with_title);
		// return false;
	};
	
    $("#maillist-error").html("<em>SubmittingÃ¢â‚¬Â¦</em>");
    submit_async($(this), function (data, textStatus) {
        if (data['success']) {
            // success
            $("#maillist-error").text("Thanks, we'll be in touch.");
            $("#maillist-form input").val("");
        } else {
            // failure
            $("#maillist-error").text("Problem subscribing: " + data['errors']);            
        }
    });
    return false;
}*/



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
	
	
	/*$('.order-link').click(show_order_form);
	$('#panel-mask').click(close_panel);
	
	$('.stockists-link').click(show_stockists);
	
	$('.self-label').each(label_with_title);
    $('form').submit(clear_self_labels);

    $('.order-form').submit(submit_order);
    $('.maillist-form').submit(submit_maillist);
    
	balance_tops($('#people .balance'));
	balance_tops($('#wine1,#wine2,#wine3').find(".final"));
	balance_tops($('#wine4,#wine5').find(".final"));*/
	
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