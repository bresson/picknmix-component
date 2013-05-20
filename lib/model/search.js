var Backbone = require("backbone");
var FTWrapper = require("../utils/ft-wrapper");

var Search = Backbone.Model.extend({
  defaults: {
    term: "",
    label: "",
    icon: ""
  }
});

Search.comms = {
  create: function(model, opts) {
		var userId = FTWrapper.userCookie("EID");
    var data = model.toJSON();
    if(userId === undefined) userId = "7";
    $.ajax({
      method: "post",
      dataType: "json",
      url: "http://api.ft-mix.com/v1/user/"+userId+"/searches/"+data.term
    }).done(opts.success).fail(opts.error);
  }
}

module.exports = Search;
