var Picknmix  = require("./lib/picknmix");
var FTWrapper = require("./lib/utils/ft-wrapper");

window.onload = function() {
  Picknmix.init();
  FTWrapper.hack();
};

// Expose as global object
window.Picknmix = Picknmix;
