var express = require('express');
var app = express();
var path = require('path')
var compression = require('compression')


app.use(compression())

app.use(express.static(path.join(__dirname,'client', 'build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client','build', 'index.html'));
});




var server = app.listen(2000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
