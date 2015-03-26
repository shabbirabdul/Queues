var express = require('express');
var app = express();
var redis = require("redis");
var fs      = require('fs');
client = redis.createClient(6379, '127.0.0.1', {})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})




app.use(function(req, res, next)
{
	console.log(req.method, req.url);
	client.lpush("visits",req.url);
	next(); 
});

app.get('/', function(req, res) {
  res.send('hello world')
})

	
app.get('/get',function(req,res){
client.get("key",function(err,value){
res.send(value)
})
})


app.get('/set',function(req,res){
client.set("key", "this message will destruct in 10 sec");
client.expire("key",10);
res.send('Key was added succsessfully');
})

app.get('/recent',function(req,res){
client.lrange("visits",0,5,function(err,value){
res.send(value);
})
});

var multer = require('multer')
 app.post('/upload',[ multer({ dest: './uploads/'}), function(req, res){
 console.log(req.body) // form fields
 console.log(req.files) // form files
 if( req.files.image )
 {
 fs.readFile( req.files.image.path, function (err, data) {
 if (err) throw err;
 var img = new Buffer(data).toString('base64');
 console.log(img);
client.lpush('images',img)
 });
 }
 }]);

 app.get('/meow', function(req, res) {
 client.lpop('images',function(err, imagedata){
 if (err) throw err
 res.writeHead(200, {'content-type':'text/html'});
 //items.forEach(function (imagedata)
 //{
 res.write("<h1>\n<img src='data:my_pic.jpg;base64,"+imagedata+"'/>");
 //});
 res.end();
 })
 })


