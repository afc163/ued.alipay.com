define(function(require) {
    var $ = require('$');

    var win = $(window);

    var setSize = function() {
        $(".loading, .frame").css({
            width: win.width(),
            height: win.height()
        });

    }

    setSize();
    win.resize(setSize);

    $(".frame-toggle").click(function(e) {
        e.preventDefault();
        var toggleId = $(this).attr("href");
        var toggleClass = "frame " + toggleId.replace("#", "");
        $(".frame").removeClass("action");
        $(toggleId).addClass("action");
        $("#frame-index").attr("class", toggleClass);
    });

    $(document).ready(function() {
        setTimeout(function() {
            $("#loading").addClass("action");
            setTimeout(function() {
                $("#loading").hide();
            }, 500)
        }, 2000);
    });

});
