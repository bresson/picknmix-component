var Backbone = require("backbone");

var Templates = require("../templates")

var SearchesView = Backbone.View.extend({
  className: "searches",

  events: {
	  'click .add': 'toggleAdd',
	  'click .search': 'enableSearch'
  },

  'toggleAdd': function(e) {
		var newsearch = $(e.target).closest(".pickNMixSearchChooser").find(".newSearch");

		if ($(e.target).hasClass("active")) {
			newsearch.css("visibility", "hidden");
		} else {
			newsearch.css("visibility", "visible");
		}

		$(e.target).toggleClass("active");
  },

  'enableSearch': function(e) {
		$(e.target).siblings(".option.search.active").removeClass("active");
		if (!$(e.target).hasClass("active")) {
			$(e.target).addClass("active");
		}
  },

  initialize: function() {
    this.listenTo(this.collection, "all", this.render);
    this.render();
  },

  render: function() {
    var html = Templates.searches.render({
      searches: this.collection.toJSON()
    });
    this.$el.html(html);
  }

});

module.exports = SearchesView;
