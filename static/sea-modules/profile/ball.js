define(function(require, exports, module) {

    var $ = require('$')
    var Handlebars = require('handlebars')
    var Position = require('position')
    require('easing')
    var popTpl = $('#pop-template').html()
    var pop

    function ball(config) {
        config = config || {}
        this.config = config;
        this.parentNode = $(config.parentNode || 'body')
        this.name = config.name || '花名'
        this.image = config.image
        this.message = config.message
        this.url = config.url || ''
        this.color = config.color;

        this.init()
        this.bindHover()
        this.start()
    }

    ball.prototype.init = function() {
        var title;
        if (this.url.indexOf('weibo.com') > 0 ||
            this.url.indexOf('t.qq.com') > 0) {
            title = '点击去'+this.name+'的微博';
        } else if (this.url.indexOf('alipay.com') > 0) {
            title = '欢迎加入我们，点此去招聘页面';
        } else {
            title = '点击去'+this.name+'的网站';
        }
        
        var html = this.url ? '<a target="_blank" title="'+title+'" href="'+this.url+'" class="ball"></a>'
                            : '<a href="#" class="ball"></a>';
        this.element = $(html).appendTo(this.parentNode)

        this.element.css('background', this.color);
        this.element.css('border-color', this.color);

        // 随机位置
        var winWidth = $(window).width()
        var winHeight = $(window).height()
        this.element.css({
            top: random(winHeight/5, winHeight*4/5),
            left: random(winWidth/5, winWidth*4/5)
        })

        // 随机大小
        var r = random(25, 120)
        this.element.css({
            width: r,
            height: r,
            borderRadius: r + 'px'
        })

        // 随机透明度
        this.element.css({
            opacity: random(15, 35)/100
        })

    }

    ball.prototype.move = function(callback) {
        var duration = random(12000, 60000)

        this.element.animate({
            top: '+=' + limit(this.element.css('top'), random(-200, 200), $(window).height()),
            left: '+=' + limit(this.element.css('left'), random(-200, 200), $(window).width())
        }, {
            duration: duration,
            easing: 'easeOut',
            complete: callback
        })
    }

    ball.prototype.start = function() {
        if (this.config.still) {
            return;
        }
        var that = this
        this.move(function() {
            that.start()
        }) 
    }

    ball.prototype.stop = function() {
        this.element.stop()
    }

    ball.prototype.bindHover = function() {
        var that = this
        this.element.hover(function() {
            that.showPop()
        }, function() {
            that.hidePop()
        })
    }

    ball.prototype.showPop = function() {
        this.element.addClass('ball-hover')
        this.stop()
        
        if (this.pop) {
            this.pop.show()
        } else {
            var html = Handlebars.compile(popTpl)(this.config)
            this.pop = $(html).appendTo(this.element)
        }

        Position.pin(this.pop, {
            element: this.element,
            x: '50%',
            y: '50%'
        })
            
    }

    ball.prototype.hidePop= function() {
        var that = this
        this.element.removeClass('ball-hover')
        this.pop.hide()
        this.start()
    }

    module.exports = ball

    // Helpers

    function random(from, to) {
        from = from || 0
        to = to || 1
        return Math.floor(Math.random() * (to - from + 1) + from)
    }

    function limit(origin, increment, max) {
        origin = parseInt(origin, 10)
        if (origin + increment < 30) {
            return 30-origin
        } else if (origin + increment + 100 > max) {
            return max - origin - 100
        } else {
            return increment
        }
    }

})
