var Picknmix = require("./lib/picknmix");

window.onload = function() {
  Picknmix.init();
};

// Expose as global object
window.Picknmix = Picknmix;
