var Backbone = require("backbone");

var Templates = require("../templates")

var SearchesView = Backbone.View.extend({
  className: "searches",

  events: {
	  'click .add':             'toggleAdd',
	  'click .search':          'enableSearch',
	  'submit .newSearch':      'catchNewSearchTerm',
	  'click .search .remove':  'removeSearch',
    'click a[data-term]':     'setTerm',
    'keydown .search':        'enterSearch',
    'click .pnm-bar_current': 'toggleOpen'
  },

  toggleOpen: function(e) {
    this.$el.find(".pnm-bar").toggleClass("is-open");
    return false;
  },

  // Add the serach in the UI
  addSearch: function() {
    var self = this;
    var term = this.$el.find(".search").val();

    var search = new this.collection.model({
      term: term
    });

    search.save(undefined, {
      success: function() {
        self._articles.setTerm(term);
      }
    });

    this.collection.add(search);
    return false;
  },

  // Capture enter
  enterSearch: function(e) {
    if(e.keyCode === 13) {
      this.addSearch(e);
    }
  },

  setTerm: function(e) {
    var term = $(e.target).data("term");
    this._articles.setTerm(term);
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
    var term = $(e.target).closest("a").data("term");
    var search = this.collection.find(function(item) {
      return (term === item.get("term"));
    })

    if(search !== undefined) {
      search.destroy();
    }

    console.log("search", search);

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

  initialize: function(opts) {
    this._articles = opts.articles;

    this.listenTo(this.collection, "all", this.render);
    this.render();
  },

  render: function() {
    var html = Templates.searches.render({
      searches: this.collection.toJSON()
    });
    this.$el.html(html);

    this.addAutocomplete();
  },

  addAutocomplete: function() {
	var $input = this.$el.find('input').first();

	$input.autocomplete({
		source: function(request, responsecb) {
			var term = request.term;
			var url = 'http://api.ft-mix.com/v1/suggest/' + term;

			var deferredRequest = $.ajax(url);

			deferredRequest
				.done(function(response){
					var results = [];

					response.forEach(function(item){
						var result = {};
						result.label = item.title;
						result.value = item.term;
						results.push(result);
					});

					responsecb(results);
				})
				.fail(function(jqHXR){
					console.log("suggested search request failed");
					console.log(jqHXR);
					responsecb([ { label: "FAIL", value: "Error" }]);
				});
		}
	});
  }
});

module.exports = SearchesView;
