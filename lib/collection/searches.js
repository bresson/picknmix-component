var Backbone = require("backbone");
var Search = require("../model/search");

var Searches = Backbone.Collection.extend({
  model: Search
});

Searches.comms = {
  read: function(model, opts) {
    $.ajax({
      dataType: "json",
      url: "http://api.ft-mix.com/v1/user/7/searches"
    }).done(opts.success).fail(opts.error);
  }
}

module.exports = Searches;
