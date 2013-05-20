var Backbone = require("backbone");
var Search = require("../model/search");

var Searches = Backbone.Collection.extend({
  model: Search
});

module.exports = Searches;
