var Config   = require("../config");
var Backbone = require("backbone");
var Article  = require("../model/article");

var Articles = Backbone.Collection.extend({
  model: Article,

  setTerm: function(term) {
    this.reset([]);
    if(this._term !== term) {
      this._term = term;
      this.fetch({term: term});
    }
  }
});

Articles.comms = {
  read: function(model, opts) {
    $.ajax({
      type: "get",
      dataType: "json",
      url: "http://api.ft-mix.com/v2/search/"+opts.term,
      data: {
        limit: Config.search.limit
      }
    }).done(function(data) {
      opts.success(data.results);
    }).fail(opts.error);
  }
};


module.exports = Articles;
