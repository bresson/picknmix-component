var Config    = require("../config");
var Backbone  = require("backbone");
var FTWrapper = require("../utils/ft-wrapper");

var Search = Backbone.Model.extend({
  idAttribute: "term",
  defaults: {
    term: "",
    label: "",
    icon: ""
  }
});

Search.comms = {
  create: function(model, opts) {
    var userId = FTWrapper.userCookie("EID", Config.defaultUser);
    var data   = model.toJSON();

    $.ajax({
      method: "post",
      dataType: "json",
      url: "http://api.ft-mix.com/v1/user/"+userId+"/searches/"+model.id
    }).done(opts.success).fail(opts.error);
  },
  'delete': function(model, opts) {
    var userId = FTWrapper.userCookie("EID", Config.defaultUser);

    $.ajax({
      method: "delete",
      dataType: "json",
      url: "http://api.ft-mix.com/v1/user/"+userId+"/searches/"+model.id
    }).done(opts.success).fail(opts.error);
  },
  update: function() {
    return Search.comms.create.apply(this, arguments);
  }
};

module.exports = Search;
