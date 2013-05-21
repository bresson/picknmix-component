var Backbone = require("backbone");
var Article = require("../model/article");

var Articles = Backbone.Collection.extend({
  model: Article,

  setTerm: function(term) {
    this.reset();
    if(this._term !== term) {
      this._term = term;
      this.fetch({term: term});
    }
  }
});

Articles.comms = {
  read: function(model, opts) {
    $.ajax({
      dataType: "json",
      url: "http://api.ft-mix.com/v1/search/"+opts.term
    }).done(function(data) {
      // NOTE: Limit to 10 entries
      opts.success( data.slice(0,10) );
    }).fail(opts.error);
  }
};


module.exports = Articles;
