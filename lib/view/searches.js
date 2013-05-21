var $ = require("../utils/jquery");
var _        = require("underscore")._;
var Backbone = require("backbone");
var Templates = require("../templates");

var SearchesView = Backbone.View.extend({
  className: "searches",

  events: {
	  'click .add':             'toggleAdd',
	  'click .search':          'enableSearch',
	  'submit .newSearch':      'catchNewSearchTerm',
	  'click .remove':          'removeSearch',
    'click a[data-term]':     'setTerm',
    'keydown .search':        'enterSearch',
    'click .pnm-bar_current': 'toggleOpen'
  },

  toggleOpen: function(e) {
    if (this.isOpen) this.closeList();
    else this.openList();

    return false;
  },

  openList: function() {
    this.setHeight();
    this.$el.addClass('is-open');
    this.isOpen = true;
  },

  closeList: function() {
    this.setHeight(0);
    this.$el.removeClass('is-open');
    this.isOpen = false;
  },

  setHeight: function(height) {
    var $list = this.$el.find(".js-list");
    var $innerList = $list.find('.js-inner-list');
    height = (arguments.length) ? height : $innerList.height();
    $list.css('height', height + 'px');
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
      $(e.target).val("");
      return false;
    }
  },

  setTerm: function(e) {
    var term = $(e.target).data("term");
    this._articles.setTerm(term);
    this.closeList();
  },

  enableSearch: function(e) {
		var targetoption = this.findTargetOption(e.target);
		var activesiblings = targetoption.siblings(".option.search.active");
		if (activesiblings.length) {
			this.markOptionInactive(activesiblings);
		}
		if (!$(e.target).hasClass("active")) {
			this.markOptionActive(targetoption);
		}
  },

  removeSearch: function(e) {
	  // TODO:WV:20130520:Remove the search
    var term = $(e.target).closest("a").data("term");
    var search = this.collection.find(function(item) {
      return (term === item.get("term"));
    });

    if(search !== undefined) {
      search.destroy();
      this.setHeight();
    }

	  return false;
  },

  catchNewSearchTerm: function(e) {
	  var newsearchterm = $(e.target).find('.searchterm').val();
	  return false;
  },

  findTargetOption: function(element) {
	  return $(element).closest(".option");
  },

  toggleOptionActive: function(option) {
	  $(option).toggleClass("active").toggleClass("ft-state-selected");
  },

  markOptionActive: function(option) {
	  $(option).addClass("active").addClass("ft-state-selected");
  },

  markOptionInactive: function(option) {
	  $(option).removeClass("active").removeClass("ft-state-selected");
  },

  initialize: function(opts) {
    this._articles = opts.articles;

    this.listenTo(this.collection, "all", _.bind(this.update, this));
    this.render();
  },

  update: function() {
    var searches = this.collection.toJSON().map(function(item) {
      item.term = item.label === '?label?' ? item.term : item.label;
      return item;
    });

    var html = Templates.searchItems.render({ searches: searches });
    this.$el.find(".search-items").html(html);
    this.$el.find(".js-current-search").html(this._articles._term);
    if (this.isOpen) this.setHeight();
  },

  render: function() {
    var html = Templates.searches.render();
    this.$el.html(html);
    this.update();
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
