var browserify = require('browserify');
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname+'/public'));

app.get('/app.js', function(req, res){
  var browserify = require('browserify');
  var b = browserify();
  b.transform(require("brfs"));
  b.add('./index.js');
  b.bundle().pipe(res);
});

app.listen(port, function() {
  console.log("Running on http://localhost:" + port)
});
