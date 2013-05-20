var Backbone = require("backbone");

var Article = Backbone.Model.extend({
  defaults: {
    title: "",
    summary: "",
    image: "",
    url:""
  }
});

module.exports = Article;
