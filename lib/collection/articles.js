var Backbone = require("backbone");
var Article = require("../model/article");

var Articles = Backbone.Collection.extend({
  model: Article
});

module.exports = Articles;
