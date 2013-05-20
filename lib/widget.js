var API          = require("./api");
var Templates    = require("./templates");
var ArticlesView = require("./view/articles");
var Articles     = require("./collection/articles");
var SearchesView = require("./view/searches");
var Searches     = require("./collection/searches");

var UrlArgs = require("./utils/url_args");

function Widget(opts) {
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

  if (UrlArgs.get("dummy")) {
	articles.set([{id: 1, title: "Flying otter over Thames", summary:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in nibh ut quam tincidunt semper. Fusce tempor libero at lacus volutpat aliquet. Etiam magna sem, rhoncus et facilisis ut, euismod vitae diam. Etiam lorem ipsum, aliquet tempus facilisis lobortis, porta nec neque. Morbi euismod libero ut dui blandit in posuere sem imperdiet. Curabitur nec ante a urna egestas pellentesque eu condimentum elit", image:'flyingotter.jpg', url:'http://www.example.com'},
    {id: 2, title: "Small man grows mullet", summary:"Suspendisse ullamcorper massa eget arcu ultrices in aliquet leo hendrerit. Etiam non ligula nec justo porttitor semper. Duis tempus rhoncus molestie. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Donec pretium ullamcorper lacus ut fermentum. Donec est nulla, congue ut dictum sed, gravida nec arcu. Ut sed faucibus risus. Cras felis neque, pellentesque sed porta vitae, pellentesque tincidunt justo", image:'mullet.jpg', url:'http://www.example.com'},
    {id: 3, title: "5 charged with offensive makeup wearing", summary:"Praesent mattis venenatis ornare. Nunc sed odio vel metus interdum feugiat. Aliquam gravida varius est, at convallis arcu tincidunt sed. Suspendisse consequat rhoncus massa, sed semper elit ornare a. Aenean quis tellus non odio blandit vulputate sit amet nec diam. Sed id nisi id nibh consectetur venenatis eu fringilla ligula", image:'rock.jpg', url:'http://www.example.com'}]);
  } else {
	  articles.fetch({
      term: "france"
	  });
  }

  if (UrlArgs.get("dummy")) {
	  searches.set([
      {id: 1, term: "bla1", label: "Bla1"},
      {id: 2, term: "bla2", label: "Bla2"},
      {id: 3, term: "bla3", label: "Bla3"},
	  ]);
  } else {
	  searches.fetch();
  }

  this.api = new API(this);
};

module.exports = Widget;
