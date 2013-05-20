var BindScroll = require("./plugins/bind-scroll");

function API(widget) {
  this._widget = widget;
}

API.prototype.setTerm = function(term) {
  this._widget.searches.fetch({
    term: term
  });
};

API.prototype.bindScroll = function() {
  BindScroll.bind();
}

module.exports = API;
