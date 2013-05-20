function API(widget) {
  this._widget = widget;
}

API.prototype.setTerm = function(term) {
  this._widget.searches.fetch({
    term: term
  });
};

module.exports = API;
