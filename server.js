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
  res.end("<head><script src=\"//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js\"></script><script src=\"/app.js\"></script></head><body><div class=\"widget\"></div></body>");
});

app.use(express.static(__dirname+'/lib/images'));
app.use(express.static(__dirname+'/lib/ft-velcro/distribution'));
app.use(express.static(__dirname+'/lib/ft-velcro/font/ft-velcro'));
app.use(express.static(__dirname+'/lib/ft-velcro/img/ft-velcro'));


app.listen(3000, function() {
  console.log("Running on http://localhost:3000")
});
