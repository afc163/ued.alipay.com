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
    }

    ball.prototype.init = function() {
        this.element = 
            $('<div class="ball">' + this.name + '</div>').appendTo(this.parentNode)

        // 随机位置
        var winWidth = $(window).width()
        var winHeight = $(window).height()
        this.element.css({
            top: random(winHeight/5, winHeight*4/5),
            left: random(winHeight/5, winWidth*4/5)
        })

        // 随机大小
        var r = random(50, 70)
        this.element.css({
            width: r,
            height: r,
            lineHeight: r + 'px',
            borderRadius: r + 'px'
        })

        // 随机透明度
        this.element.css({
            opacity: random(50, 70)/100
        })

    }

    ball.prototype.move = function(callback) {
        var duration = random(8000, 15000)

        this.element.animate({
            top: '+=' + random(-200, 200),
            left: '+=' + random(-200, 200)
        }, {
            duration: duration,
            easing: 'easeOut',
            complete: callback
        })
    }

    ball.prototype.autoMove = function() {
        var that = this
        this.move(function() {
            that.autoMove()
        }) 
    }

    ball.prototype.start = function() {
        this.autoMove()
    }

    ball.prototype.stop = function() {
        this.element.stop()
    }

    ball.prototype.bindHover = function() {
        var that = this
        this.element.hover(function() {
            that.stop()
        }, function() {
            that.start()
        })
    }

    module.exports = ball

    // Helpers

    function random(from, to) {
        from = from || 0
        to = to || 1
        return Math.floor(Math.random() * (to - from + 1) + from)
    }

})
