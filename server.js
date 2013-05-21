var browserify = require('browserify');
var express = require('express');
var app = express();

app.use(express.static(__dirname+'/public'));

app.get('/app.js', function(req, res){
  var browserify = require('browserify');
  var b = browserify();
  b.transform(require("brfs"));
  b.add('./index.js');
  b.bundle().pipe(res);
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Running on http://localhost:3000")
});
