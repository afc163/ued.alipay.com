define(function(require) {

    var data = require('./data');
    var Ball = require('./ball');

    exports.initBalls = function(type) {
        for (var i=0; i<data[type].length; i++) {
            new Ball(data[type][i]);
        }
    }

    exports.clearBalls = function() {
        $('.ball').remove();
    }

});
