define(function(require) {

    require('transit');
    var data = require('./data');
    var canvas = require('./canvas');

    canvas.init(data);

});
