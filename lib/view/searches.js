var Backbone = require("backbone");

var Templates = require("../templates")

var SearchesView = Backbone.View.extend({
  className: "searches",

  events: {
	  'click .add': 'toggleAdd',
	  'click .search': 'enableSearch',
	  'submit .newSearch': 'catchNewSearchTerm',
	  'click .search .remove': 'removeSearch'
  },

  'toggleAdd': function(e) {
		var targetoption = this.findTargetOption(e.target);
		var newsearch = $(targetoption).closest(".pickNMixSearchChooser").find(".newSearch");

		if ($(targetoption).hasClass("active")) {
			newsearch.css("visibility", "hidden");
		} else {
			newsearch.css("visibility", "visible");
		}

		this.toggleOptionActive(targetoption);
  },

  'enableSearch': function(e) {
		var targetoption = this.findTargetOption(e.target);
		var activesiblings = targetoption.siblings(".option.search.active");
		if (activesiblings.length) {
			this.markOptionInactive(activesiblings);
		}
		if (!$(e.target).hasClass("active")) {
			this.markOptionActive(targetoption);
		}
  },

  'removeSearch': function(e) {
	  // TODO:WV:20130520:Remove the search
	  return false;
  },

  'catchNewSearchTerm': function(e) {
	  var newsearchterm = $(e.target).find('.searchterm').val();
	  return false;
  },

  findTargetOption: function(element) {
	  return $(element).closest(".option");
  },

  toggleOptionActive: function(option) {
	  $(option).toggleClass("active").toggleClass("ft-state-selected")
  },

  markOptionActive: function(option) {
	  $(option).addClass("active").addClass("ft-state-selected")
  },

  markOptionInactive: function(option) {
	  $(option).removeClass("active").removeClass("ft-state-selected")
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
