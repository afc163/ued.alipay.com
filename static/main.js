seajs.use(['$', 'buzz', 'keyboard', 'profile/index', 'share'],
    function($, buzz, KeyboardJS, Profile, Share) {

    if (window.console) {
        console.log("%c         ", "font-size:32px;background:url('https://i.alipayobjects.com/e/201308/p6Qt3j3yH.png') no-repeat;");
        console.log("%c想加入杭州市西湖区万塘路上最好的 UED 团队吗？\n一起奏响互联网金融产品的美妙乐章！ \n前端工程师请投 <mmtea.wuzh@alipay.com>", "color: #08c; font-size: 14px;");
        console.log("%c邮件请注明来自 ued-console", "font-size:12px;color:#888;");
    }

    if (!buzz.isSupported()) {
        console.log("Your browser is too old, time to update!");
    }

    var isQuiet = false;

    $(document).ready(function() {
        /**
         * 音乐播放
         */
        var bassSound = function() {
            return new buzz.sound( "static/media/数码", {
                formats: [ "ogg", "mp3"]
            }).load();
        },
        hatSound = function() {
            return new buzz.sound( "static/media/鼠标", {
                formats: [ "ogg", "mp3"]
            }).load();
        },
        snareSound = function() {
            return new buzz.sound( "static/media/书写", {
                formats: [ "ogg", "mp3"]
            }).load();
        },
        tomSound = function() {
            return new buzz.sound( "static/media/打字", {
                formats: [ "ogg", "mp3"]
            }).load();
        };
 
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
                url: 'http://ued.alipay.com/',
                pic: 'https://i.alipayobjects.com/e/201307/jYyoNcdiv.png'
            },
            triggerClass: ['.sidebar-weibo', '.sidebar-qq', '.sidebar-douban']
        })

        /*
         *  静音
         */
        $('.sidebar-quiet').click(function() {
            if ($(this).hasClass('quiet')) {
                $(this).removeClass('quiet');
            } else {
                $(this).addClass('quiet');
            }
        });

        // preload file
        bassSound();
        hatSound();
        snareSound();
        tomSound();
        Profile.preloadHead();

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
