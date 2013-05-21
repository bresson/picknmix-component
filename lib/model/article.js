var Backbone = require("backbone");

var Article = Backbone.Model.extend({
  defaults: {
    title: "",
    summary: "",
    image: undefined,
    url:""
  }
});

module.exports = Article;
