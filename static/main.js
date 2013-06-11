seajs.use(['$', 'buzz', 'keyboard', 'profile/index', 'store'],
    function($, buzz, KeyboardJS, Profile, store) {
    $(document).ready(function() {
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

            //初始化泡泡
            if (toggleId === '#frame-index') {
                Profile.clearBalls();
            } else {
                var type = $(this).data('key');
                Profile.initBalls(type);
            }

            //播放声音
            var currentId = $(this).attr("id");
            playSound(currentId);
            setTimeout(function() {stopSound(currentId)}, 1000);
        });

        var isLoaded = store.get("uedloaded");
        if(isLoaded === true) {
            $("#loading").addClass("action").hide();
        } else {
            setTimeout(function() {
                $("#loading").addClass("action");
                introSound.play();
                setTimeout(function() {
                    $("#loading").hide();
                }, 500);
            }, 1000);
            store.set("uedloaded", true)
        }


        /**
         * 键盘 H, J, K, L
         */
        KeyboardJS.on("h", function() {
            playSound("h");
        }, function() {
            stopSound("h");
        });

        KeyboardJS.on("j", function() {
            playSound("j");
        }, function() {
            stopSound("j");
        });

        KeyboardJS.on("k", function() {
            playSound("k");
        }, function() {
            stopSound("k");
        });

        KeyboardJS.on("l", function() {
            playSound("l")
        }, function() {
            stopSound("l");
        });

        /**
         *  键盘点击事件
         */
        $(".keymap span").mousedown(function() {
            var currentItem = $(this).data("type");
            playSound(currentItem);
        }).mouseup(function() {
            var currentItem = $(this).data("type");
            stopSound(currentItem);
        });


        /*
         *  播放敲打声音
         */
        function playSound(item) {
            switch(item) {
                case "h":
                    bassSound.play();
                    $("#h").addClass("action");
                    break;
                case "j":
                    hatSound.play();
                    $("#j").addClass("action");
                    break;
                case "k":
                    snareSound.play();
                    $("#k").addClass("action");
                    break;
                case "l":
                    tomSound.play();
                    $("#l").addClass("action");
                    break;
                default:
                    break;
            }
        }

        function stopSound(item) {
            switch(item) {
                case "h":
                    bassSound.stop();
                    $("#h").removeClass("action");
                    break;
                case "j":
                    hatSound.stop();
                    $("#j").removeClass("action");
                    break;
                case "k":
                    snareSound.stop();
                    $("#k").removeClass("action");
                    break;
                case "l":
                    tomSound.stop();
                    $("#l").removeClass("action");
                    break;
                default:
                    break;
            }
        }

    });

});
