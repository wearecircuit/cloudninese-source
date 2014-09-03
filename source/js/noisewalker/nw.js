var Noise = require('./noise');
var Walker = require('./nw.walker');

var exports = function (runner) {

    "use strict";

    this.runner = runner;
    this.width = this.runner.width;
    this.height = this.runner.height;
    this.mouse = {'x': 0, 'y': 0};

    this.walkers = [];
    this.generator = new Noise(Math);

    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    document.addEventListener('click', this.handleMouseMove.bind(this));

    for (var i = this.runner.settings.walkers - 1; i >= 0; i--) {
        this.walkers.push(new Walker(this, this.generator));
    }


};

exports.prototype.update = function (time) {
    for (var i = this.walkers.length - 1; i >= 0; i--) {
        this.walkers[i].update(time);
    }
};

exports.prototype.draw = function (context) {
    for (var i = this.walkers.length - 1; i >= 0; i--) {
        this.walkers[i].draw(context);
    }
};

exports.prototype.handleMouseMove = function (event) {
    var rect = this.runner.canvas.getBoundingClientRect();
    this.mouse.x = (event.clientX - rect.left) * this.runner.pixelRatio;
    this.mouse.y = (event.clientY - rect.top) * this.runner.pixelRatio;
};



if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = exports
} else if (typeof define === "function" && define.amd) {
    define("noisewalker", [], function () {
        return exports;
    });
}