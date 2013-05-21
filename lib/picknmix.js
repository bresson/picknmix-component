require("./utils/jquery");
require("./utils/jquery.cookie");
require("./utils/jquery.ui");
var _ = require("underscore")._;
var Backbone = require("backbone");
Backbone.$ = require("./utils/jquery");

require("./utils/backbone-ext");


var Widget = require("./widget");
var WIDGETS = [];
var READYS = [];
var isReady = false;

function injectScriptTag(src) {
	var scriptEl = document.createElement("script");
	scriptEl.src=src;
	document.body.appendChild(scriptEl);
	return scriptEl;
}

module.exports = {
  init: function(domScope) {
    if(domScope === undefined) domScope = document;

    $(domScope).find(".picknmix-widget").each(function(idx, el) {
      el = $(el);
      var widget = new Widget({el: el});

      WIDGETS.push({
        el:     el[0],
        widget: widget
      });
    });

    isReady = true;
    READYS.forEach(function(cb) {
      cb();
    });
  },
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
  destroy: function(el) {
    /* Not yet... */
  },
  ready: function(done) {
    if(isReady) {
      done();
    }
    READYS.push(done);
  }
};

