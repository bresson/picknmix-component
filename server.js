var browserify = require('browserify');
var express = require('express');
var app = express();
var fs = require('fs');

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

function enableServeJPEG(url, data) {
	app.get(url, function(req, res) {
		res.writeHead(200, {'Content-Type': 'image/jpeg'});
		res.end(data);
	});
}

fs.readFile('lib/images/flyingotter.jpg', function(err, data) {
	if (err) throw err;
	enableServeJPEG('/flyingotter.jpg', data);
});

fs.readFile('lib/images/mullet.jpg', function(err, data) {
	if (err) throw err;
	enableServeJPEG('/mullet.jpg', data);
});

fs.readFile('lib/images/rock.jpg', function(err, data) {
	if (err) throw err;
	enableServeJPEG('/rock.jpg', data);
});

app.listen(3000, function() {
  console.log("Running on http://localhost:3000")
});
