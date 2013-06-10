define(function(require, exports, module) {

    var $ = require('$')
    var data = require('./data')
    var Ball = require('./ball')
    var inter

    exports.initBalls = function(type) {
        var balls = []
        for (var i=0; i<data[type].length; i++) {
            balls.push(new Ball(data[type][i]))
        }

        var randomShow = function() {
            inter = setTimeout(function() {
                if ($('.bubble').length === 0) {
                    var b = balls[random(0, balls.length-1)]
                    b.showPop()
                    setTimeout(function() {
                        b.hidePop()
                    }, 2500)
                }
                randomShow()
            }, random(3000, 10000))
        }

        randomShow()
    }

    exports.clearBalls = function() {
        clearTimeout(inter)
        $('.ball').remove()
    }

    function random(from, to) {
        from = from || 0
        to = to || 1
        return Math.floor(Math.random() * (to - from + 1) + from)
    }

})
