var redis = require('redis')
var express = require('express')
var request = require('request')
var app = express()
var client = redis.createClient(6379, '127.0.0.1', {})
var balancer='3000'

var server = app.listen(3006, function () {

	  var host = server.address().address
	  var port = server.address().port
	client.set('lasthit','3000')
   	console.log('Example app listening at http://%s:%s', host, port)
})

app.get('/', function(req, res) {
		  client.get('lasthit',function(err,value){
				if(value == '3000'){
					balancer='3001'
					client.set('lasthit','3001')
				}
				else{
					balancer='3000'
					client.set('lasthit','3000')
				}
				request('http://localhost:'+balancer+'/', function (error, response, body) {
					if (!error && response.statusCode == 200) {
						res.send(body) 
					}
				})
			})
})
