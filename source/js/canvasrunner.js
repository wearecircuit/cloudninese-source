var CanvasRunner = function (Application, options) {

    function isCanvasSupported(){
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    }

    if(!isCanvasSupported()) return false;

    "use strict";

    // Options
    this.settings = options || {};
    this.settings.mode = options.mode || 'auto';
    this.settings.fps = options.fps || 0;
    this.settings.blending = options.blending || 'normal';
    this.settings.dpi = options.dpi || 'normal';

    // Global variables
    this.element = this.settings.element || document.body;
    this.canvas = document.createElement('canvas');
    this.element.appendChild(this.canvas);

    this.buffer = document.createElement('canvas');
    this.canvasContext = this.canvas.getContext('2d');
    this.bufferContext = this.buffer.getContext('2d');

    this.last = new Date().getTime();

    // Cross-browser
    this.initRequestAnimationFramePolyfill();

    // GO!
    this.setCanvasDimensions();
    this.application = new Application(this, this.settings);

    window.addEventListener('resize', this.handleWindowResize.bind(this));

    this.start();

    return this.application;
};


CanvasRunner.prototype.setCanvasDimensions = function () {
    this.width = this.canvas.offsetWidth;
    this.height = this.canvas.offsetHeight;

    // HIDPI
    this.pixelRatio = this.backingScale(this.canvasContext);
    this.width *= this.pixelRatio;
    this.height *= this.pixelRatio;

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.buffer.width = this.width;
    this.buffer.height = this.height;
};

CanvasRunner.prototype.createCanvas = function () {
    return document.createElement('canvas');
};


CanvasRunner.prototype.start = function () {
    var that = this;
    if(this.settings.fps){
        that.interval = window.setInterval(function(){
            window.requestAnimationFrame(that.tick.bind(that));
        },Math.floor(1000/that.settings.fps))
    }
    this.tick();
};

CanvasRunner.prototype.tick = function (time) {
    var now = new Date().getTime();
    this.update(now - this.last);
    this.draw();
    this.last = now;
};

CanvasRunner.prototype.update = function (time) {
    this.application.update(time);
};

CanvasRunner.prototype.draw = function () {

    // Clear
    this.bufferContext.clearRect(0, 0, this.buffer.width, this.buffer.height);
    this.application.draw(this.bufferContext);

    // Blending modes
    if (this.settings.blending === 'normal') {
        this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
    } else if (this.settings.blending == 'lighter') {
        this.canvasContext.globalCompositeOperation = "source-over";
        this.canvasContext.fillStyle = "rgba(0,0,0,0.25)";
        this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvasContext.globalCompositeOperation = "lighter";
    }

    // Draw
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvasContext.drawImage(this.buffer, 0, 0);

};


CanvasRunner.prototype.handleWindowResize = function () {
    this.setCanvasDimensions(this.canvas);
    if(this.application.handleWindowResize){
        this.application.handleWindowResize();
    }
    if (!this.settings.fps){
        this.tick();
    }
};

CanvasRunner.prototype.initRequestAnimationFramePolyfill = function () {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame =
            window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
};


CanvasRunner.prototype.backingScale = function (context) {
    if ('devicePixelRatio' in window) {
        var backingStoreRatio = context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1;
        if (this.settings.dpi === 'high' && window.devicePixelRatio > 1 && backingStoreRatio < 2) {
            return window.devicePixelRatio;
        }
    }
    return 1;
};


if ( typeof module === "object" && typeof module.exports === "object" ) {
    module.exports = CanvasRunner
} else if ( typeof define === "function" && define.amd ) {
    define( "canvasrunner", [], function() {
        return CanvasRunner;
    });
}