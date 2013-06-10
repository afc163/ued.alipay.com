define(function(require, exports, module) {

    var $ = require('$')
    var Handlebars = require('handlebars')
    var Position = require('position')
    require('easing')
    var popTpl = $('#pop-template').html()

    function ball(config) {
        config = config || {}
        this.config = config;
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
            $('<a target="_blank" href="'+this.url+'" class="ball">' + this.name + '</a>').appendTo(this.parentNode)

        // 随机位置
        var winWidth = $(window).width()
        var winHeight = $(window).height()
        this.element.css({
            top: random(winHeight/8, winHeight*7/8),
            left: random(winHeight/8, winWidth*7/8)
        })

        // 随机大小
        var r = random(50, 100)
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
            that.showPop()
        }, function() {
            that.hidePop()
        })
    }

    ball.prototype.showPop = function() {
        this.element.addClass('ball-hover')
        this.stop()
        
        var html = Handlebars.compile(popTpl)(this.config)
        this.pop = $(html).appendTo('body')
        this.pop.addClass('bubble-show');

        // 计算球出现的位置
        if (this.element.offset().top < this.pop.innerHeight() + 20) {
            Position.pin({
                element: this.pop,
                x: '50%',
                y: 0
            }, {
                element: this.element,
                x: '50%',
                y: '100% + 10'
            })
        } else {
            Position.pin({
                element: this.pop,
                x: '50%',
                y: '100%+30'
            }, {
                element: this.element,
                x: '50%',
                y: 0
            })
        }
    }

    ball.prototype.hidePop= function() {
        var that = this
        this.element.removeClass('ball-hover')
        var pop = this.pop;
        this.pop.fadeOut(500, function() {
            pop.remove()
        });
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
