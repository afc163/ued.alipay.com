define(function(require, exports, module) {

    var $ = require('$')
    var data = require('./data')
    var Ball = require('./ball')
    var initShowInters = []
    var randomShowInter

    exports.initBalls = function(type) {
        var balls = []
        for (var i=0; i<data[type].length; i++) {
            (function(config) {
                var inter = setTimeout(function() {
                    var ball = new Ball(config)
                    balls.push(ball)
                }, random(500, 3000))
                initShowInters.push(inter)
            })(data[type][i])
        }

        var randomShow = function() {
            randomShowInter = setTimeout(function() {
                if ($('.tooltip').length === 0) {
                    var b = balls[random(0, balls.length-1)]
                    b.showPop()
                    setTimeout(function() {
                        b.hidePop()
                    }, 2500)
                }
                randomShow()
            }, random(4000, 10000))
        }

        randomShow()
    }

    exports.clearBalls = function() {
        for (var i=0; i<initShowInters.length; i++) {
            clearTimeout(initShowInters[i])
        }
        initShowInters = []
        clearTimeout(randomShowInter)
        $('.ball').remove()
        $('.tooltip').remove()
    }

    exports.youAreHere = function() {
        setTimeout(function() {
            var you = new Ball({
                name: '你',
                message: '你在这里，<br>欢迎加入我们！',
                url: 'http://ued.alipay.com/2010job/'
            });
            you.element.css({
                width: '40px',
                height: '40px',
                borderRadius: '60px',
                background: '#f60',
                borderColor: '#f60',
                color: '#f60'
            });
        }, 3000);
    }

    // Helper

    function random(from, to) {
        from = from || 0
        to = to || 1
        return Math.floor(Math.random() * (to - from + 1) + from)
    }

})
