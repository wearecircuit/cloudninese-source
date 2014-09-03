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