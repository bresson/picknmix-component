var _ = require("underscore")._;
var Backbone = require("backbone");
require("./utils/backbone-ext");

var Widget = require("./widget");
var WIDGETS = [];

module.exports = {
  init: function(domScope) {
    if(domScope === undefined) domScope = document;
    console.log("init", domScope);
    $(domScope).find(".widget").each(function(idx, el) {
      var el = $(el);
      console.log("el", el[0]);
      var widget = new Widget({el: el})
      WIDGETS.push({
        el:     el,
        widget: widget
      });
    });
  },
  get: function(selector, domScope) {
    if(domScope === undefined) domScope = document;
    var el = domScope.querySeelctor(selector);
    return _.find(WIDGETS, function(obj) {
      return (obj.el == el);
    });
  },
  destroy: function(el) {
    /* Not yet... */
  }
};




