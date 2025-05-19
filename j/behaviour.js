$(function () {
    // Smooth scroll links
    $('#nav a, a.scroll').click(function () {
        var target = $(this.hash);
        if (target.length) {
            $('html, body').animate({ scrollTop: target.offset().top }, 600);
            return false;
        }
    });

    var $nav = $('#nav');
    var $window = $(window);
    var $container = $('#container');

    var topmostPoint = $nav.offset().top;
    var leftPoint = $container.offset().left;
    var PADDING_TOP = 63;

    function updateNavPosition() {
        var scrollTop = $window.scrollTop();
        if (scrollTop > (topmostPoint - PADDING_TOP)) {
            $nav.css({
                position: 'fixed',
                top: PADDING_TOP,
                left: $container.offset().left
            });
        } else {
            $nav.css({
                position: 'absolute',
                top: topmostPoint,
                left: ''
            });
        }
    }

    $window.on('scroll', updateNavPosition);
    $window.on('resize', function () {
        leftPoint = $container.offset().left;
        if ($nav.css('position') === 'fixed') {
            $nav.css('left', leftPoint);
        }
    });

    updateNavPosition(); // Initial call in case the page loads scrolled

    // Optional hash navigation behavior
    if (document.location.hash === '#order') {
        show_order_form();
    }
});