(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./source/js/script.js":[function(require,module,exports){
var settings = require('./settings');
var Canvasrunner = require('./canvasrunner');
var NoiseWalker = require('./noisewalker/nw');
var smoothScroll = require('./smooth-scroll.min');
var ImageGrid = require('./imagegrid');

//console.log(Canvasrunner);


var elements = {
    'hero' : document.getElementById('module-hero'),
    'letter' : document.getElementById('letter')
};

if(elements.hero){
    var noise = new Canvasrunner(NoiseWalker, settings.noisewalker);
}

function supports_gradients() {
    /**
     * For CSS Gradients syntax, please see:
     * webkit.org/blog/175/introducing-css-gradients/
     * developer.mozilla.org/en/CSS/-moz-linear-gradient
     * developer.mozilla.org/en/CSS/-moz-radial-gradient
     * dev.w3.org/csswg/css3-images/#gradients-
     */

    var str1 = 'background-image:',
    str2 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));',
    str3 = 'linear-gradient(left top,#9f9, white);';

    setCss(
        // legacy webkit syntax (FIXME: remove when syntax not in use anymore)
        (str1 + '-webkit- '.split(' ').join(str2 + str1)
            // standard syntax             // trailing 'background-image:'
            + prefixes.join(str3 + str1)).slice(0, -str1.length)
    );

    return contains(mStyle.backgroundImage, 'gradient');
};

// Detect which browser prefix to use for the specified CSS value
// (e.g., background-image: -moz-linear-gradient(...);
//        background-image:   -o-linear-gradient(...); etc).
//
function getCssValuePrefix(name, value) {
    var prefixes = ['', '-o-', '-ms-', '-moz-', '-webkit-'];

    // Create a temporary DOM object for testing
    var dom = document.createElement('div');

    for (var i = 0; i < prefixes.length; i++) {


        // Attempt to set the style
        dom.style[name] = prefixes[i] + value;

        // Detect if the style was successfully set
        if (dom.style[name]) {
            return prefixes[i];
        }
        dom.style[name] = '';   // Reset the style
    }
}

var arrayToRGB = function(arr){
    return 'rgb(' + arr[0] + ','+ arr[1] +','+arr[2]+')';
};

// Run this when the page first loads
var gradientPrefix = getCssValuePrefix('backgroundImage',
    'linear-gradient(left, #fff, #fff)');

// Setting the gradient later on
var orientation = 'top';
var color = Math.floor(settings.colors.length*Math.random());
var colour = settings.colors[color];
var colorOne = arrayToRGB(settings.colors[color][2]);
var colorTwo = arrayToRGB(settings.colors[color][3]);
var colorThree = arrayToRGB(settings.colors[color][3]);

//elements.hero.style.backgroundImage = gradientPrefix + 'linear-gradient('
//    + orientation + ', ' + colorOne + ', ' + colorTwo + ')';
//
//elements.letter.style.backgroundColor = colorThree;

//if(supports_gradients()){
    if(elements.hero){
        elements.hero.style.backgroundImage = gradientPrefix + 'linear-gradient('
        + orientation + ', ' + colorTwo + ', ' + colorOne + ')';
    }
//}

//elements.letter.style.backgroundColor = colorOne;
////console.log(color);


//    var randomColourIndex = Math.floor(Math.random() * this.colours.length);
//    var colours = this.colours[randomColourIndex];

//    new CircuitLogo( document.getElementById('siteId'),{
//        'step'    : randomColourIndex,
//        'animate' : false
//    });


    var setStyleOnElements = function (style, colour, elements) {
        var elementsLength = elements.length;
        while (elementsLength--) {
            elements[elementsLength].style[style] = "rgb(" + colour[0] + "," + colour[1] + "," + colour[2] + ")";
        }
    };

    setStyleOnElements('backgroundColor', colour[0], document.getElementsByClassName('js-bg-01'));
    setStyleOnElements('backgroundColor', colour[1], document.getElementsByClassName('js-bg-02'));
    setStyleOnElements('backgroundColor', colour[2], document.getElementsByClassName('js-bg-03'));
    setStyleOnElements('backgroundColor', colour[3], document.getElementsByClassName('js-bg-04'));

    setStyleOnElements('color', colour[0], document.getElementsByClassName('js-text-01'));
    setStyleOnElements('color', colour[1], document.getElementsByClassName('js-text-02'));
    setStyleOnElements('color', colour[2], document.getElementsByClassName('js-text-03'));
    setStyleOnElements('color', colour[3], document.getElementsByClassName('js-text-04'));

    setStyleOnElements('fill', colour[0], document.getElementsByClassName('js-bg-svg-01'));
    setStyleOnElements('fill', colour[1], document.getElementsByClassName('js-bg-svg-02'));
    setStyleOnElements('fill', colour[2], document.getElementsByClassName('js-bg-svg-03'));
    setStyleOnElements('fill', colour[3], document.getElementsByClassName('js-bg-svg-04'));


function supportsSVG() {
    return !! document.createElementNS && !! document.createElementNS('http://www.w3.org/2000/svg','svg').createSVGRect;
}


if (!supportsSVG()) {
    var imgs = document.getElementsByTagName('img');
    var dotSVG = /.*\.svg$/;
    for (var i = 0; i != imgs.length; ++i) {
        if(imgs[i].src.match(dotSVG)) {
            imgs[i].src = imgs[i].src.slice(0, -3) + 'png';
        }
    }
}


(function () {
    var elements = document.getElementsByClassName('module-imageGrid');
    for (var i = 0, element; element = elements[i]; i++) {
        new ImageGrid(element);
    }
})();
},{"./canvasrunner":"/Users/mikaelcarlsson/Documents/Project/cloudninese-source/source/js/canvasrunner.js","./imagegrid":"/Users/mikaelcarlsson/Documents/Project/cloudninese-source/source/js/imagegrid.js","./noisewalker/nw":"/Users/mikaelcarlsson/Documents/Project/cloudninese-source/source/js/noisewalker/nw.js","./settings":"/Users/mikaelcarlsson/Documents/Project/cloudninese-source/source/js/settings.js","./smooth-scroll.min":"/Users/mikaelcarlsson/Documents/Project/cloudninese-source/source/js/smooth-scroll.min.js"}],"/Users/mikaelcarlsson/Documents/Project/cloudninese-source/source/js/canvasrunner.js":[function(require,module,exports){
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
},{}],"/Users/mikaelcarlsson/Documents/Project/cloudninese-source/source/js/imagegrid.js":[function(require,module,exports){
var ImageGrid = function (element) {
    this.element = element;
    this.settings = element.dataset;
    this.images = this.settings.images.replace(/(\r\n|\n|\r| )/gm,"").split(',');
    this.limit = this.settings.limit || Number.MAX_VALUE;

    this.data = this.unsort(this.images);
    this.data = this.data.splice(0, this.limit);
    this.fragment = this.buildInnerHTML(this.data);
    this.render(this.fragment);

    return this;
};

ImageGrid.prototype.unsort = function (data) {
    var clone = data.splice(0);
    return clone.sort(function () {
        return 0.5 - Math.random()
    });
};

ImageGrid.prototype.buildInnerHTML = function (data) {
    var length = data.length;
    var fragment = '';
    while (length--) {
        fragment += '<li><img src="' + data[length] + '"/></li>'
    }
    return fragment;
};

ImageGrid.prototype.render = function (fragment) {
    this.element.innerHTML = '<div class="section"><ul>' + fragment + '</ul></div>';
};

module.exports = ImageGrid;
},{}],"/Users/mikaelcarlsson/Documents/Project/cloudninese-source/source/js/noisewalker/noise.js":[function(require,module,exports){

// Ported from Stefan Gustavson's java implementation
// http://staffwww.itn.liu.se/~stegu/simplexnoise/simplexnoise.pdf
// Read Stefan's excellent paper for details on how this code works.
//
// Sean McCullough banksean@gmail.com

/**
 * You can pass in a random number generator object if you like.
 * It is assumed to have a random() method.
 */
var ClassicalNoise = function(r) { // Classic Perlin noise in 3D, for comparison
    if (r == undefined) r = Math;
    this.grad3 = [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],
        [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],
        [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];
    this.p = [];
    for (var i=0; i<256; i++) {
        this.p[i] = Math.floor(r.random()*256);
    }
    // To remove the need for index wrapping, double the permutation table length
    this.perm = [];
    for(var i=0; i<512; i++) {
        this.perm[i]=this.p[i & 255];
    }
};

ClassicalNoise.prototype.dot = function(g, x, y, z) {
    return g[0]*x + g[1]*y + g[2]*z;
};

ClassicalNoise.prototype.mix = function(a, b, t) {
    return (1.0-t)*a + t*b;
};

ClassicalNoise.prototype.fade = function(t) {
    return t*t*t*(t*(t*6.0-15.0)+10.0);
};

// Classic Perlin noise, 3D version
ClassicalNoise.prototype.noise = function(x, y, z) {
    // Find unit grid cell containing point
    var X = Math.floor(x);
    var Y = Math.floor(y);
    var Z = Math.floor(z);

    // Get relative xyz coordinates of point within that cell
    x = x - X;
    y = y - Y;
    z = z - Z;

    // Wrap the integer cells at 255 (smaller integer period can be introduced here)
    X = X & 255;
    Y = Y & 255;
    Z = Z & 255;

    // Calculate a set of eight hashed gradient indices
    var gi000 = this.perm[X+this.perm[Y+this.perm[Z]]] % 12;
    var gi001 = this.perm[X+this.perm[Y+this.perm[Z+1]]] % 12;
    var gi010 = this.perm[X+this.perm[Y+1+this.perm[Z]]] % 12;
    var gi011 = this.perm[X+this.perm[Y+1+this.perm[Z+1]]] % 12;
    var gi100 = this.perm[X+1+this.perm[Y+this.perm[Z]]] % 12;
    var gi101 = this.perm[X+1+this.perm[Y+this.perm[Z+1]]] % 12;
    var gi110 = this.perm[X+1+this.perm[Y+1+this.perm[Z]]] % 12;
    var gi111 = this.perm[X+1+this.perm[Y+1+this.perm[Z+1]]] % 12;

    // The gradients of each corner are now:
    // g000 = grad3[gi000];
    // g001 = grad3[gi001];
    // g010 = grad3[gi010];
    // g011 = grad3[gi011];
    // g100 = grad3[gi100];
    // g101 = grad3[gi101];
    // g110 = grad3[gi110];
    // g111 = grad3[gi111];
    // Calculate noise contributions from each of the eight corners
    var n000= this.dot(this.grad3[gi000], x, y, z);
    var n100= this.dot(this.grad3[gi100], x-1, y, z);
    var n010= this.dot(this.grad3[gi010], x, y-1, z);
    var n110= this.dot(this.grad3[gi110], x-1, y-1, z);
    var n001= this.dot(this.grad3[gi001], x, y, z-1);
    var n101= this.dot(this.grad3[gi101], x-1, y, z-1);
    var n011= this.dot(this.grad3[gi011], x, y-1, z-1);
    var n111= this.dot(this.grad3[gi111], x-1, y-1, z-1);
    // Compute the fade curve value for each of x, y, z
    var u = this.fade(x);
    var v = this.fade(y);
    var w = this.fade(z);
    // Interpolate along x the contributions from each of the corners
    var nx00 = this.mix(n000, n100, u);
    var nx01 = this.mix(n001, n101, u);
    var nx10 = this.mix(n010, n110, u);
    var nx11 = this.mix(n011, n111, u);
    // Interpolate the four results along y
    var nxy0 = this.mix(nx00, nx10, v);
    var nxy1 = this.mix(nx01, nx11, v);
    // Interpolate the two last results along z
    var nxyz = this.mix(nxy0, nxy1, w);

    return nxyz;
};


if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = ClassicalNoise
} else if (typeof define === "function" && define.amd) {
    define("noisewalker", [], function () {
        return ClassicalNoise;
    });
}
},{}],"/Users/mikaelcarlsson/Documents/Project/cloudninese-source/source/js/noisewalker/nw.js":[function(require,module,exports){
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
},{"./noise":"/Users/mikaelcarlsson/Documents/Project/cloudninese-source/source/js/noisewalker/noise.js","./nw.walker":"/Users/mikaelcarlsson/Documents/Project/cloudninese-source/source/js/noisewalker/nw.walker.js"}],"/Users/mikaelcarlsson/Documents/Project/cloudninese-source/source/js/noisewalker/nw.walker.js":[function(require,module,exports){
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
},{"./vector":"/Users/mikaelcarlsson/Documents/Project/cloudninese-source/source/js/noisewalker/vector.js"}],"/Users/mikaelcarlsson/Documents/Project/cloudninese-source/source/js/noisewalker/vector.js":[function(require,module,exports){
function Vector(v, y, z) {
    if (arguments.length === 1) {
        this.x = v.x || 0;
        this.y = v.y || 0;
        this.z = v.z || 0;
    } else {
        this.x = v || 0;
        this.y = y || 0;
        this.z = z || 0;
    }
}

Vector.prototype.add = function (v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
};

Vector.prototype.distance = function (v) {
    var dx = this.x - v.x,
        dy = this.y - v.y,
        dz = this.z - v.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

Vector.prototype.subtract = function (v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    return this;
};

Vector.prototype.normalize = function () {
    var m = this.magnitude();
    if (m > 0) {
        this.divide(m);
    }
    return this;
};

Vector.prototype.multiply = function (v) {
    if (typeof v === 'number') {
        this.x *= v;
        this.y *= v;
        this.z *= v;
    } else {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
    }
    return this;
};

Vector.prototype.magnitude = function () {
    var x = this.x,
        y = this.y,
        z = this.z;
    return Math.sqrt(x * x + y * y + z * z);
};

Vector.prototype.divide = function (v) {
    if (typeof v === 'number') {
        this.x /= v;
        this.y /= v;
        this.z /= v;
    } else {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
    }
    return this;
};

Vector.prototype.limit = function (high) {
    if (this.magnitude() > high) {
        this.normalize();
        this.multiply(high);
    }
};

Vector.prototype.heading2D = function () {
    return (-Math.atan2(-this.y, this.x));
};

Vector.prototype.angle = function (B, C) {
    var AB = Math.sqrt(Math.pow(B.x - this.x, 2) + Math.pow(B.y - this.y, 2));
    var BC = Math.sqrt(Math.pow(B.x - C.x, 2) + Math.pow(B.y - C.y, 2));
    var AC = Math.sqrt(Math.pow(C.x - this.x, 2) + Math.pow(C.y - this.y, 2));
    return Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB));
};


if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = Vector
} else if (typeof define === "function" && define.amd) {
    define("vector", [], function () {
        return Vector;
    });
}
},{}],"/Users/mikaelcarlsson/Documents/Project/cloudninese-source/source/js/settings.js":[function(require,module,exports){
var settings = {
    colors: [
        [
            [15, 70, 79],
            [53, 113, 122],
            [102, 157, 165],
            [164, 207, 214]
        ],
        [
            [15, 69, 79],
            [53, 112, 122],
            [102, 156, 165],
            [164, 206, 214]
        ],
        [
            [15, 26, 79],
            [53, 66, 122],
            [102, 114, 165],
            [164, 173, 214]
        ],
        [
            [15, 16, 79],
            [53, 54, 122],
            [102, 103, 165],
            [164, 165, 214]
        ],
        [
            [49, 15, 79],
            [90, 53, 122],
            [136, 102, 165],
            [191, 164, 214]
        ],
        [
            [63, 15, 79],
            [105, 53, 122],
            [150, 102, 165],
            [201, 164, 214]
        ],
        [
            [79, 15, 67],
            [122, 53, 109],
            [165, 102, 154],
            [214, 164, 205]
        ],
        [
            [79, 15, 66],
            [122, 53, 108],
            [165, 102, 153],
            [214, 164, 204]
        ]
    ],
    noisewalker: {
        element: document.getElementById('noise'),
        minRadius: 1,
        maxRadius: 250,
        walkers: 16,
        dpi: 'normal',
        fps: 24
    }
};

module.exports = settings;
},{}],"/Users/mikaelcarlsson/Documents/Project/cloudninese-source/source/js/smooth-scroll.min.js":[function(require,module,exports){
/** smooth-scroll v5.1.0, by Chris Ferdinandi | http://github.com/cferdinandi/smooth-scroll | Licensed under MIT: http://gomakethings.com/mit/ */
!function(e,t){"function"==typeof define&&define.amd?define("smoothScroll",t(e)):"object"==typeof exports?module.exports=t(e):e.smoothScroll=t(e)}(this,function(e){"use strict";var t,n={},o=!!document.querySelector&&!!e.addEventListener,a={speed:500,easing:"easeInOutCubic",offset:0,updateURL:!0,callbackBefore:function(){},callbackAfter:function(){}},r=function(e,t,n){if("[object Object]"===Object.prototype.toString.call(e))for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(n,e[o],o,e);else for(var a=0,r=e.length;r>a;a++)t.call(n,e[a],a,e)},c=function(e,t){var n={};return r(e,function(t,o){n[o]=e[o]}),r(t,function(e,o){n[o]=t[o]}),n},u=function(e){for(var t,n=String(e),o=n.length,a=-1,r="",c=n.charCodeAt(0);++a<o;){if(t=n.charCodeAt(a),0===t)throw new InvalidCharacterError("Invalid character: the input contains U+0000.");r+=t>=1&&31>=t||127==t||0===a&&t>=48&&57>=t||1===a&&t>=48&&57>=t&&45===c?"\\"+t.toString(16)+" ":t>=128||45===t||95===t||t>=48&&57>=t||t>=65&&90>=t||t>=97&&122>=t?n.charAt(a):"\\"+n.charAt(a)}return r},i=function(e,t){var n;return"easeInQuad"===e&&(n=t*t),"easeOutQuad"===e&&(n=t*(2-t)),"easeInOutQuad"===e&&(n=.5>t?2*t*t:-1+(4-2*t)*t),"easeInCubic"===e&&(n=t*t*t),"easeOutCubic"===e&&(n=--t*t*t+1),"easeInOutCubic"===e&&(n=.5>t?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1),"easeInQuart"===e&&(n=t*t*t*t),"easeOutQuart"===e&&(n=1- --t*t*t*t),"easeInOutQuart"===e&&(n=.5>t?8*t*t*t*t:1-8*--t*t*t*t),"easeInQuint"===e&&(n=t*t*t*t*t),"easeOutQuint"===e&&(n=1+--t*t*t*t*t),"easeInOutQuint"===e&&(n=.5>t?16*t*t*t*t*t:1+16*--t*t*t*t*t),n||t},f=function(e,t,n){var o=0;if(e.offsetParent)do o+=e.offsetTop,e=e.offsetParent;while(e);return o=o-t-n,o>=0?o:0},s=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},l=function(e){return e&&"object"==typeof JSON&&"function"==typeof JSON.parse?JSON.parse(e):{}},d=function(e,t){history.pushState&&(t||"true"===t)&&history.pushState({pos:e.id},"",window.location.pathname+e)};n.animateScroll=function(t,n,o){var r=c(r||a,o||{}),h=l(t?t.getAttribute("data-options"):null);r=c(r,h),n="#"+u(n.substr(1));var p,m,v,g=document.querySelector("[data-scroll-header]"),b=null===g?0:g.offsetHeight+g.offsetTop,O=e.pageYOffset,y=f(document.querySelector(n),b,parseInt(r.offset,10)),I=y-O,S=s(),Q=0;d(n,r.updateURL);var A=function(o,a,c){var u=e.pageYOffset;(o==a||u==a||e.innerHeight+u>=S)&&(clearInterval(c),r.callbackAfter(t,n))},C=function(){Q+=16,m=Q/parseInt(r.speed,10),m=m>1?1:m,v=O+I*i(r.easing,m),e.scrollTo(0,Math.floor(v)),A(v,y,p)},H=function(){r.callbackBefore(t,n),p=setInterval(C,16)};0===e.pageYOffset&&e.scrollTo(0,0),H()};var h=function(){var e=event.target;e.hasAttribute("data-scroll")&&"a"===e.tagName.toLowerCase()&&(event.preventDefault(),n.animateScroll(e,e.hash,t,event))};return n.destroy=function(){t&&(document.removeEventListener("click",h,!1),t=null)},n.init=function(e){o&&(n.destroy(),t=c(a,e||{}),document.addEventListener("click",h,!1))},n});
},{}]},{},["./source/js/script.js"]);
