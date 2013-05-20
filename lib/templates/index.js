var fs = require("fs");
var hogan = require("hogan.js");

var files = {
  "articles": fs.readFileSync(__dirname + "/articles.html"),
  "searches": fs.readFileSync(__dirname + "/searches.html"),
  "index":    fs.readFileSync(__dirname + "/index.html")
};

for(var name in files) {
  files[name] = hogan.compile(files[name]);
}

module.exports = files;
