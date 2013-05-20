var browserify = require('browserify');
var express = require('express');
var app = express();

app.get('/app.js', function(req, res){
  var browserify = require('browserify');
  var b = browserify();
  b.transform(require("brfs"));
  b.add('./index.js');
  b.bundle().pipe(res);
});

app.get('/', function(req, res) {
  res.end("<head><script src=\"//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js\"></script><script src=\"/app.js\"></script><link rel=\"stylesheet\" type=\"text/css\" href=\"/reset.css\" /><link rel=\"stylesheet\" type=\"text/css\" href=\"/ft-velcro/distribution/ft-velcro.css\" /></head><body><div class=\"picknmix-widget\"></div></body>");
});

app.use(express.static(__dirname+'/public'));


app.listen(3000, function() {
  console.log("Running on http://localhost:3000")
});
