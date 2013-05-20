var Backbone = require("backbone");

var Search = Backbone.Model.extend({
  defaults: {
    term: "",
    label: "",
    icon: ""
  }
});

module.exports = Search;
