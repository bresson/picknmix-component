var Backbone = require("backbone");
var Search = require("../model/search");

var Searches = Backbone.Collection.extend({
  model: Search
});

Searches.comms = {
  read: function(model, opts) {
    $.ajax({
      url: "http://api.ft-mix.com/v1/search/city:london"
    }).done(opts.success).fail(opts.error);
  }
}

module.exports = Searches;
