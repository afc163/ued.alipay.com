seajs.use(['$', 'buzz', 'keyboard', 'profile/index', 'share'],
    function($, buzz, KeyboardJS, Profile, Share) {

    var isQuiet = false;

    $(document).ready(function() {
        /**
         * 音乐播放
         */
        var bassSound = function() {
            return new buzz.sound( "static/media/数码", {
                formats: [ "ogg", "mp3"]
            });
        },
        hatSound = function() {
            return new buzz.sound( "static/media/鼠标", {
                formats: [ "ogg", "mp3"]
            });
        },
        snareSound = function() {
            return new buzz.sound( "static/media/书写", {
                formats: [ "ogg", "mp3"]
            });
        },
        tomSound = function() {
            return new buzz.sound( "static/media/打字", {
                formats: [ "ogg", "mp3"]
            });
        };
        
        // preload mp3 file
        bassSound();
        hatSound();
        snareSound();
        tomSound();

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

            //切换屏幕
            frameChange(toggleId, toggleClass);

            //初始化泡泡
            if (toggleId === '#frame-index') {
                Profile.clearBalls();
            } else {
                var type = $(this).data('key');
                Profile.initBalls(type);
                Profile.youAreHere();
            }

            //播放声音
            var currentId = $(this).attr("id");
            playSound(currentId);
            setTimeout(function() {stopSound(currentId)}, 1000);
        });

        //切换屏幕函数
        function frameChange(toggleId, toggleClass) {
            $(".frame").removeClass("action");
            $(toggleId).addClass("action");
            $("#frame-index").attr("class", toggleClass);
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
         *  键盘上、下、左、右事件
         */
        KeyboardJS.on("up, down, left, right", function(e) {
            e.preventDefault();
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

        /**
         *  多说
         */
        $('#open-duoshuo').click(function(e) {
            e.preventDefault();
            if ($('#duoshuo .ds-thread').html() === '') {
                window.duoshuoQuery = {short_name:"alipayued"};
                (function() {
                    var ds = document.createElement('script');
                    ds.type = 'text/javascript';ds.async = true;
                    ds.src = 'http://static.duoshuo.com/embed.js';
                    ds.charset = 'UTF-8';
                    (document.getElementsByTagName('head')[0] 
                    || document.getElementsByTagName('body')[0]).appendChild(ds);
                })();
            }
           $('#duoshuo').fadeIn();
        });

        $('#close-duoshuo').click(function() {
            $('#duoshuo').fadeOut();
        });

        /**
         *  分享链接
         */
        new Share({
            container: '.sidebar',
            service: ['sina', 'qq', 'douban'],
            param: {
                title: '支付宝UED首页看着还不错~ @支付宝',
                url: 'https://www.alipay.com/',
                pic: 'https://i.alipayobjects.com/e/201307/jYyoNcdiv.png'
            },
            triggerClass: ['.sidebar-weibo', '.sidebar-qq', '.sidebar-douban']
        })

        /*
         *  静音
         */
        $('.sidebar-quiet').toggle(function() {
            $(this).addClass('quiet');
        }, function() {
            $(this).removeClass('quiet');            
        });

        /*
         *  播放敲打声音
         */
        function playSound(item) {
            $('#logo').addClass('scale');
            $("#"+item).addClass("action");
            $('.keymap [data-type='+item+']').addClass('keypressed');

            if ($('.sidebar-quiet').hasClass('quiet')) {
                return;
            }

            switch(item) {
                case "h":
                    bassSound().play();
                    break;
                case "j":
                    hatSound().play();
                    break;
                case "k":
                    snareSound().play();
                    break;
                case "l":
                    tomSound().play();
                    break;
                default:
                    break;
            }
        }

        function stopSound(item) {
            $('#logo').removeClass('scale');
            $("#"+item).removeClass("action");
            $('.keymap [data-type='+item+']').removeClass('keypressed');
        }

    });

});
