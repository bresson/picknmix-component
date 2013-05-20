var Backbone = require("backbone");
var Article = require("../model/article");

var Articles = Backbone.Collection.extend({
  model: Article,
});

Articles.comms = {
  read: function(model, opts) {
    $.ajax({
      dataType: "json",
      url: "http://api.ft-mix.com/v1/search/city:london"
    }).done(opts.success).fail(opts.error);
  }
};


module.exports = Articles;
