var express = require('express');
var app = express();
var redis = require("redis");
var fs      = require('fs');
client = redis.createClient(6379, '127.0.0.1', {})

var server1 = app.listen(3001, function () {

  var host = server1.address().address
  var port = server1.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})

app.get('/', function(req, res) {
  res.send('chalo world')
})

