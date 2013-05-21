var API          = require("./api");
var Templates    = require("./templates");
var ArticlesView = require("./view/articles");
var Articles     = require("./collection/articles");
var SearchesView = require("./view/searches");
var Searches     = require("./collection/searches");

var UrlArgs = require("./utils/url_args");

function Widget(opts) {
  var self = this;
  var el = $(opts.el);
  var articles = new Articles();
  var searches = new Searches();

  // For debug
  this.articles = articles;
  this.searches = searches;

  // Render the main html structure
  el.html(Templates.index.render());

  new ArticlesView({
    el: el.find(".articles"),
    collection: articles
  });

  new SearchesView({
    el: el.find(".searches"),
    articles: articles,
    collection: searches
  });

  searches.fetch({
    success: function(collection) {
      if(collection.length > 0) {
        articles.setTerm(collection.at(0).get("term"));
      }
    }
  });

  this.api = new API(this);
};

module.exports = Widget;
