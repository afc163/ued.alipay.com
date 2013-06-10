define(function(require, exports, module) {

    var $ = require('$')
    require('easing')

    function ball(config) {
        config = config || {}
        this.parentNode = $(config.parentNode || 'body')
        this.name = config.name || '花名'
        this.image = config.image
        this.message = config.message
        this.url = config.url

        this.init()
        this.bindHover()
        this.start()
    }

    ball.prototype.init = function() {
        this.element = 
            $('<div class="ball">' + this.name + '</div>').appendTo(this.parentNode)

        // 随机位置
        var winWidth = $(window).width()
        var winHeight = $(window).height()
        this.element.css({
            top: random(winHeight/8, winHeight*7/8),
            left: random(winHeight/8, winWidth*7/8)
        })

        // 随机大小
        var r = random(40, 80)
        this.element.css({
            width: r,
            height: r,
            lineHeight: r + 'px',
            borderRadius: r + 'px'
        })

        // 随机透明度
        this.element.css({
            opacity: random(20, 50)/100
        })

    }

    ball.prototype.move = function(callback) {
        var duration = random(6000, 15000)

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
            that.stop()
            that.showPop()
        }, function() {
            that.start()
        })
    }

    ball.prototype.showPop = function() {
        
    }

    module.exports = ball

    // Helpers

    function random(from, to) {
        from = from || 0
        to = to || 1
        return Math.floor(Math.random() * (to - from + 1) + from)
    }

    function limit(origin, increment, max) {
        origin = parseInt(origin, 10);
        if (origin + increment < 0) {
            return -origin;
        } else if (origin + increment + 80 > max) {
            return max - origin - 80;
        } else {
            return increment;
        }
    }

})
