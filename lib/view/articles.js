var Backbone = require("backbone");

var Templates = require("../templates")

var ArticlesView = Backbone.View.extend({
  className: "articles",

  events: {},

  initialize: function() {
    var self = this;
    this.listenTo(this.collection, "sync reset", this.render);
    this.render();

    this.listenTo(this.collection, "sync", function() {
      self.$el.removeClass("loading");
    });

    this.listenTo(this.collection, "reset", function() {
      self.$el.addClass("loading");
    });
  },

  render: function() {
    var html = Templates.articles.render({
      articles: this.collection.toJSON()
    });
    console.log(this.collection.toJSON());
    this.$el.html(html);
  }

});

module.exports = ArticlesView;
