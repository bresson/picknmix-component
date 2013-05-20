var Backbone = require("backbone");

var Article = Backbone.Model.extend({
  defaults: {
    headline: "",
    abstract: "",
    image: ""
  }
});

module.exports = Article;
