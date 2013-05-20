var _ = require("underscore")._;
var Backbone = require("backbone");
require("./utils/backbone-ext");

var Templates = require("./templates");

var ArticlesView = require("./view/articles");
var Articles     = require("./collection/articles");

var SearchesView = require("./view/searches");
var Searches     = require("./collection/searches");

function Widget(opts) {
  var el = $(opts.el);
  var articles = new Articles();
  var searches = new Searches();

  // For debug
  window.articles = articles;
  window.searches = searches;

  // Render the main html structure
  el.html(Templates.index.render());

  new ArticlesView({
    el: el.find(".articles"),
    collection: articles
  });

  new SearchesView({
    el: el.find(".searches"),
    collection: searches
  });

  var usedummyarticles = true;
  if (usedummyarticles) {
	articles.set([{id: 1, title: "Flying otter over Thames", summary:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in nibh ut quam tincidunt semper. Fusce tempor libero at lacus volutpat aliquet. Etiam magna sem, rhoncus et facilisis ut, euismod vitae diam. Etiam lorem ipsum, aliquet tempus facilisis lobortis, porta nec neque. Morbi euismod libero ut dui blandit in posuere sem imperdiet. Curabitur nec ante a urna egestas pellentesque eu condimentum elit", imageurl:'flyingotter.jpg'},
    {id: 2, title: "Small man grows mullet", summary:"Suspendisse ullamcorper massa eget arcu ultrices in aliquet leo hendrerit. Etiam non ligula nec justo porttitor semper. Duis tempus rhoncus molestie. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Donec pretium ullamcorper lacus ut fermentum. Donec est nulla, congue ut dictum sed, gravida nec arcu. Ut sed faucibus risus. Cras felis neque, pellentesque sed porta vitae, pellentesque tincidunt justo", imageurl:'mullet.jpg'},
    {id: 3, title: "5 charged with offensive makeup wearing", summary:"Praesent mattis venenatis ornare. Nunc sed odio vel metus interdum feugiat. Aliquam gravida varius est, at convallis arcu tincidunt sed. Suspendisse consequat rhoncus massa, sed semper elit ornare a. Aenean quis tellus non odio blandit vulputate sit amet nec diam. Sed id nisi id nibh consectetur venenatis eu fringilla ligula", imageurl:'rock.jpg'}]);
  } else {
	  articles.fetch({
		succes: function() {
		  console.log("SUCCESS");
		},
		error: function() {
		  console.log("ERR!");
		}
	  });
  }

  var usedummysearches = true;
  if (usedummysearches) {
	  searches.set([
		{id: 1, term: "bla1", label: "Bla1"},
		{id: 2, term: "bla2", label: "Bla2"},
		{id: 3, term: "bla3", label: "Bla3"},
	  ]);
  } else {
	  searches.fetch({
		succes: function() {
		  console.log("SUCCESS");
		},
		error: function() {
		  console.log("ERR!");
		}
	  })
  }


  //TODO
  //this.api = new API(widget);
};

var WIDGETS = [];

module.exports = {
  init: function(domScope) {
    if(domScope === undefined) domScope = document;
    console.log("init", domScope);
    $(domScope).find(".widget").each(function(idx, el) {
      var el = $(el);
      console.log("el", el[0]);
      var widget = new Widget({el: el})
      WIDGETS.push({
        el:     el,
        widget: widget
      });
    });
  },
  get: function(selector, domScope) {
    if(domScope === undefined) domScope = document;
    var el = domScope.querySeelctor(selector);
    return _.find(WIDGETS, function(obj) {
      return (obj.el == el);
    });
  },
  destroy: function(el) {
    /* Not yet... */
  }
};




