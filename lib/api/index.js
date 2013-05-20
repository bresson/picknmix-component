function API(widget) {
  this._widget = widget;
}

API.prototype.setTerm = function(term) {
  this._widget.articles.setTerm(term);
};

API.prototype.bindScroll = function(el, scrollEl) {
  if(typeof(el) == "string") {
    el = $(el);
  }

  var els = el.find("*[data-ft-term]");

  if(scrollEl === undefined) {
    scrollEl = el;
  }

  var self = this;
  $(scrollEl).bind("scroll", function() {
    var scrollTop = $(window).scrollTop();

    var current = null;
    els.each(function() {
      var el  = $(this);
      var top = el.offset().top;

      if(top < scrollTop) {
        current = el;
      }
    });

    if(current === null) {
      current = $(els[els.length-1]);
    }

    var term = current.data("ft-term");
    if(term === "") {
      term = current.html();
    }

    self._widget.api.setTerm(term);
  });
}

module.exports = API;
