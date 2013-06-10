define(function(require) {
    var $ = require('$');
    var buzz = require('buzz');
    var KeyboardJS = require('keyboard');

    /**
     * 音乐播放
     */
    var bassSound = new buzz.sound( "static/media/bass1", {
        formats: [ "ogg", "mp3"]
    }),
    hatSound = new buzz.sound( "static/media/hat1", {
        formats: [ "ogg", "mp3"]
    }),
    snareSound = new buzz.sound( "static/media/snare1", {
        formats: [ "ogg", "mp3"]
    }),
    tomSound = new buzz.sound( "static/media/tom1", {
        formats: [ "ogg", "mp3"]
    }), introSound = new buzz.sound( "static/media/intro", {
        formats: [ "ogg", "mp3"]
    });

    /**
     * 操作事件
     */
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
        //播放声音
        var currentId = $(this).attr("id");
        switch(currentId) {
            case "a":
                bassSound.play();
                break;
            case "s":
                hatSound.play();
                break;
            case "d":
                snareSound.play();
                break;
            case "f":
                tomSound.play();
                break;
            default:
                break;
        }
    });

    $(document).ready(function() {
        setTimeout(function() {
            $("#loading").addClass("action");
            introSound.play();
            setTimeout(function() {
                $("#loading").hide();
            }, 500)
        }, 1000);
    });



    /**
     * 键盘 a, s, d, f
     */
    KeyboardJS.on("f", function() {
        bassSound.play();
        $("#a").addClass("action");
    }, function() {
        bassSound.stop();
        $("#a").removeClass("action");
    });

    KeyboardJS.on("g", function() {
        hatSound.play();
        $("#s").addClass("action");
    }, function() {
        hatSound.stop();
        $("#s").removeClass("action");
    });

    KeyboardJS.on("h", function() {
        snareSound.play();
        $("#d").addClass("action");
    }, function() {
        snareSound.stop();
        $("#d").removeClass("action");
    });

    KeyboardJS.on("j", function() {
        tomSound.play();
        $("#f").addClass("action");
    }, function() {
        tomSound.stop();
        $("#f").removeClass("action");
    });

});
