var redis = require('redis')
var express = require('express')
var request = require('request')
var app = express()
var client = redis.createClient(6379, '127.0.0.1', {})
var nexthit='3000'

var server = app.listen(3006, function () {

	  var host = server.address().address
	  var port = server.address().port
	client.set('lasthit','3000')
   	console.log('Example app listening at http://%s:%s', host, port)
})

app.get('/', function(req, res) {
		  client.get('lasthit',function(err,value){
				if(value == '3000'){
					nexthit='3001'
					client.set('lasthit','3001')
				}
				else{
					nexthit='3000'
					client.set('lasthit','3000')
				}
				request('http://localhost:'+nexthit+'/', function (error, response, body) {
					if (!error && response.statusCode == 200) {
						res.send(body) 
					}
				})
			})
})

app.get('/get',function(req,res){
	request('http://localhost:'+nexthit+'/get', function (error, response, body) {
				if (!error && response.statusCode == 200) {
					res.send(body) 
				}
			})
})

app.get('/set',function(req,res){
	request('http://localhost:'+nexthit+'/set', function (error, response, body) {
				if (!error && response.statusCode == 200) {
					res.send(body) 
				}
			})
})

app.get('/upload',function(req,res){
	request('http://localhost:'+nexthit+'/upload', function (error, response, body) {
				if (!error && response.statusCode == 200) {
					res.send(body) 
				}
			})
})

app.get('/meow',function(req,res){
	request('http://localhost:'+nexthit+'/meow', function (error, response, body) {
				if (!error && response.statusCode == 200) {
					res.send(body) 
				}
			})
})

app.get('/recent',function(req,res){
	request('http://localhost:'+nexthit+'/recent', function (error, response, body) {
				if (!error && response.statusCode == 200) {
					res.send(body) 
				}
			})
})
