define(function(require, exports, module) {

    var $ = require('$')
    var data = require('./data')
    var Ball = require('./ball')
    var initShowInters = []
    var randomShowInter
    var youarehereInter
    var BaseColors = {
        wd: '#005A8D',
        ux: '#007938',
        ue: '#795520',
        ui: '#B90000'
    }

    exports.initBalls = function(type) {
        var balls = []
        for (var i=0; i<data[type].length; i++) {
            (function(config) {
                config.color = BaseColors[type];
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
        clearTimeout(youarehereInter)
        $('.ball').remove()
        $('.tooltip').remove()
    }

    exports.youAreHere = function() {
        youarehereInter = setTimeout(function() {
            var you = new Ball({
                name: '你在这里',
                message: '欢迎加入我们!',
                url: 'http://ued.alipay.com/2010job/',
                still: true
            });
            you.element.addClass('youarehere');
        }, 3000);
    }

    // Helper

    function random(from, to) {
        from = from || 0
        to = to || 1
        return Math.floor(Math.random() * (to - from + 1) + from)
    }

})
