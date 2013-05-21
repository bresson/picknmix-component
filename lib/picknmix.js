var _        = require("underscore")._;
var Backbone = require("backbone");

require("./utils/backbone-ext");
require("./utils/jquery.cookie");

var Widget = require("./widget");
var WIDGETS = [];
var READYS = [];
var isReady = false;

module.exports = {

  // Initialize for a given dom scope
  init: function(domScope) {
    if(domScope === undefined) {
      domScope = document;
    }

    $(domScope).find(".picknmix-widget").each(function(idx, el) {
      var el     = $(el);
      var widget = new Widget({el: el});

      WIDGETS.push({
        el:     el[0],
        widget: widget
      });
    });

    // Fire all ready callbacks
    isReady = true;
    READYS.forEach(function(cb) {
      cb();
    });
  },

  // Get an initialized DOM element
  get: function(selector, domScope) {
    if(domScope === undefined) domScope = document;
    var el = domScope.querySelector(selector);

    var obj = _.find(WIDGETS, function(obj) {
      return (obj.el == el);
    });

    if(obj && obj.widget) {
      return obj.widget;
    }
  },

  // Destory a widget
  destroy: function(el) {
    /* Not yet... */
  },

  // Is the DOM ready?
  ready: function(done) {
    if(isReady) {
      done();
    }
    READYS.push(done);
  }
};

