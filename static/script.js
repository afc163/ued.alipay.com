seajs.use(['$'], function($) {

    var win = $(window);

    var setSize = function() {
        $('.frame').css({
            width: win.width(),
            height: win.height(),
            lineHeight: win.height() + 'px'
        });
    };

    setSize();
    win.resize(setSize);

    $('#frame-top').animate({
        top: '0%'
    }, 1000);
    
});
