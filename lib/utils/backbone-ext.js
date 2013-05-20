var Backbone = require("backbone");

Backbone.sync = function(method, model, options) {
  var commsObj = model.constructor.comms
  if(commsObj[method] !== undefined) {
    commsObj[method](model, options);
  }
}
