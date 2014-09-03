var settings = require('./settings');
var Canvasrunner = require('./canvasrunner');
var NoiseWalker = require('./noisewalker/nw');
var smoothScroll = require('./smooth-scroll.min');
var ImageGrid = require('./imagegrid');

var noise = new Canvasrunner(NoiseWalker, settings.noisewalker);

//console.log(Canvasrunner);


var elements = {
    'hero' : document.getElementById('module-hero'),
    'letter' : document.getElementById('letter')
};

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
    elements.hero.style.backgroundImage = gradientPrefix + 'linear-gradient('
    + orientation + ', ' + colorTwo + ', ' + colorOne + ')';
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