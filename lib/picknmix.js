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
    {id: 1, headline: "Bla 1", abstract:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in nibh ut quam tincidunt semper. Fusce tempor libero at lacus volutpat aliquet. Etiam magna sem, rhoncus et facilisis ut, euismod vitae diam. Etiam lorem ipsum, aliquet tempus facilisis lobortis, porta nec neque. Morbi euismod libero ut dui blandit in posuere sem imperdiet. Curabitur nec ante a urna egestas pellentesque eu condimentum elit"},
    {id: 2, headline: "Bla 2", abstract:"Suspendisse ullamcorper massa eget arcu ultrices in aliquet leo hendrerit. Etiam non ligula nec justo porttitor semper. Duis tempus rhoncus molestie. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. Donec pretium ullamcorper lacus ut fermentum. Donec est nulla, congue ut dictum sed, gravida nec arcu. Ut sed faucibus risus. Cras felis neque, pellentesque sed porta vitae, pellentesque tincidunt justo"},
    {id: 3, headline: "Bla 3", abstract:"Nulla metus purus, scelerisque tincidunt tempus a, semper a felis. Phasellus elementum lacinia euismod. Quisque ullamcorper ligula eget sem sollicitudin porttitor. Proin quis enim augue, vel volutpat justo. Nunc ac viverra arcu. Fusce mattis egestas felis, vel porttitor augue molestie ut. Sed ac sapien eu ante sollicitudin convallis nec ut odio"},
    {id: 4, headline: "Bla 4", abstract:"Praesent mattis venenatis ornare. Nunc sed odio vel metus interdum feugiat. Aliquam gravida varius est, at convallis arcu tincidunt sed. Suspendisse consequat rhoncus massa, sed semper elit ornare a. Aenean quis tellus non odio blandit vulputate sit amet nec diam. Sed id nisi id nibh consectetur venenatis eu fringilla ligula"},
    {id: 5, headline: "Bla 5", abstract:"In ut quam nibh. Ut egestas ligula id ipsum sagittis eget tincidunt augue suscipit. Phasellus odio ante, hendrerit non elementum eget, tristique et sem. Donec volutpat ullamcorper eros ut pellentesque. Donec dapibus luctus erat, eu dignissim purus lacinia in. Mauris eget urna in eros condimentum scelerisque quis sit amet orci. Duis eu quam non lorem pretium hendrerit sit amet eget erat. Quisque quis augue neque, in blandit neque. In quis libero id arcu consequat aliquet"}
  ]);

  searches.set([
    {id: 1, term: "bla1", label: "Bla1"},
    {id: 2, term: "bla2", label: "Bla2"},
    {id: 3, term: "bla3", label: "Bla3"},
  ]);
};

