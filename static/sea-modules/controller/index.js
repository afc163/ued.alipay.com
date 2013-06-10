define(function(require) {
    var $ = require('$');

    var win = $(window);

    var setSize = function() {
        $(".frame").css({
            width: win.width(),
            height: win.height()
        });
    }

    setSize();
    win.resize();

});