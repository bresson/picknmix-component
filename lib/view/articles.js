var Backbone = require("backbone");

var Templates = require("../templates")

var ArticlesView = Backbone.View.extend({
  className: "articles",

  events: {},

  initialize: function() {
    this.listenTo(this.collection, "all", this.render);
    this.render();
  },

  render: function() {
    var html = Templates.articles.render({
      articles: this.collection.toJSON()
    });
    this.$el.html(html);
  }

});

module.exports = ArticlesView;
