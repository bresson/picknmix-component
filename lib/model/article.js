var Backbone = require("backbone");

var Article = Backbone.Model.extend({
  defaults: {
    title: "",
    summary: "",
    imageurl: ""
  }
});

module.exports = Article;
