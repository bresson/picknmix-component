var Backbone = require("backbone");

var Templates = require("../templates")

var SearchesView = Backbone.View.extend({
  className: "searches",

  events: {
	  'click .add': 'toggleAdd',
	  'click .search': 'enableSearch'
  },

  'toggleAdd': function(e) {
		var targetoption = $(e.target).closest(".option");
		var newsearch = $(targetoption).closest(".pickNMixSearchChooser").find(".newSearch");

		if ($(targetoption).hasClass("active")) {
			newsearch.css("visibility", "hidden");
		} else {
			newsearch.css("visibility", "visible");
		}

		this.toggleOptionActive(targetoption);
  },

  'enableSearch': function(e) {
		var targetoption = $(e.target).closest(".option");
		var activesiblings = targetoption.siblings(".option.search.active");
		if (activesiblings.length) {
			this.markOptionInactive(activesiblings);
		}
		if (!$(e.target).hasClass("active")) {
			this.markOptionActive(targetoption);
		}
  },

  toggleOptionActive: function(option) {
	  $(option).closest("li.option").toggleClass("active").toggleClass("ft-state-selected")
  },

  markOptionActive: function(option) {
	  $(option).closest("li.option").addClass("active").addClass("ft-state-selected")
  },

  markOptionInactive: function(option) {
	  $(option).closest("li.option").removeClass("active").removeClass("ft-state-selected")
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
