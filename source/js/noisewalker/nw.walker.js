var Vector = require('./vector');

    function remap(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    }

    var Walker = function (game, generator) {

        "use strict";

        this.game = game;
        this.noff = Math.random()*10;
        this.generator = generator;
        this.location = new Vector(0,0);
        this.velocity = 0;

        this.x = Math.random()*32;
        this.y = Math.random()*16;
        this.z = Math.random()*8;

    };

    Walker.prototype.update = function (time) {

        var settings = this.game.runner.settings;

        this.location.y = remap(this.generator.noise(this.noff, 0.001, this.x), -1, 1, -this.game.runner.height/2, this.game.runner.height*1.5);
        this.location.x = remap(this.generator.noise(this.noff, 2.001, this.y), -1, 1, -this.game.runner.width/2, this.game.runner.width*1.5);
        this.r = remap(this.generator.noise(this.noff, 4, this.z), -1, 1, settings.minRadius, settings.maxRadius);
        this.o = remap(this.generator.noise(this.noff, 3, this.z), -1, 1, 0, 0.08);

        var mouse = new Vector(this.game.mouse);
        var distance = this.location.distance(mouse);
        this.velocity = (distance / 20000);
        this.noff += Math.min(this.velocity, 0.001);

        return this;
    };

    Walker.prototype.draw = function (context) {
        context.fillStyle = 'rgba(255,255,255,' + this.o + ')';
        context.beginPath();
        context.arc(this.location.x, this.location.y, this.r*this.game.runner.pixelRatio, 0, 2 * Math.PI, true);
        context.fill();
        context.closePath();
    };


if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = Walker
} else if (typeof define === "function" && define.amd) {
    define("walker", [], function () {
        return Walker;
    });
}