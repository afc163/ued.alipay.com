define(function(require, exports, module) {

    var $ = require('$')
    var data = require('./data')
    var Ball = require('./ball')

    exports.initBalls = function(type) {
        var balls = [];
        for (var i=0; i<data[type].length; i++) {
            balls.push(new Ball(data[type][i]))
        }

        var randomShow = function() {
            setTimeout(function() {
                if ($('.bubble').length === 0) {
                    var b = balls[random(0, balls.length-1)];
                    b.showPop()
                    setTimeout(function() {
                        b.hidePop()
                    }, 2000);
                }
                randomShow()
            }, random(8000, 20000))
        }

        randomShow()
    }

    exports.clearBalls = function() {
        $('.ball').remove()
    }

    function random(from, to) {
        from = from || 0
        to = to || 1
        return Math.floor(Math.random() * (to - from + 1) + from)
    }

})
