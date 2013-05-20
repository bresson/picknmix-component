var Backbone = require("backbone");

var Templates = require("./templates");

var ArticlesView = require("./view/articles");
var Articles     = require("./collection/articles");

var SearchesView = require("./view/searches");
var Searches     = require("./collection/searches");

module.exports = function() {
  var articles = new Articles();
  var searches = new Searches();

  var mainEl = $(".widget");

  // Render the main html structure
  mainEl.html(Templates.index.render());
  
  new ArticlesView({
    el: mainEl.find(".articles"),
    collection: articles
  });

  new SearchesView({
    el: mainEl.find(".searches"),
    collection: searches
  });

  articles.set([
    {id: 1, headline: "Bla 1"},
    {id: 2, headline: "Bla 2"},
    {id: 3, headline: "Bla 3"},
    {id: 4, headline: "Bla 4"},
    {id: 5, headline: "Bla 5"}
  ]);

  searches.set([
    {id: 1, term: "bla1", label: "Bla1"},
    {id: 2, term: "bla2", label: "Bla2"},
    {id: 3, term: "bla3", label: "Bla3"},
  ]);
};

