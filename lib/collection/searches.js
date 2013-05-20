var Backbone = require("backbone");
var Search = require("../model/search");
var FTWrapper = require("../utils/ft-wrapper");

var Searches = Backbone.Collection.extend({
  model: Search
});

Searches.comms = {
  read: function(model, opts) {
		var userId = FTWrapper.userCookie("EID");
    if(userId === undefined) userId = "7";
    $.ajax({
      dataType: "json",
      url: "http://api.ft-mix.com/v1/user/"+userId+"/searches"
    }).done(opts.success).fail(opts.error);
  }
}

module.exports = Searches;
