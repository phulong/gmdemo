var express = require('express');
var app = express();
var fs = require('fs')
  , gm = require('gm').subClass({imageMagick: true});
require('dotenv').config()
const IMAGES = './images/';

app.get('/resize/:width/:height', function (req, res) {
	let width = req.params.width;
	let height = req.params.height;
	let source = './images/origin/1.jpg';
	let target = './images/resize/1';
	let check_resize = resizeImage (source,target,width,height);
	if (check_resize) {		 
 
		 res.send ('Resize Image success!');
	}
})

app.get ('/', function (req,res){
	 res.send ('Welcome to KintoBlock');
})

app.get ('/env', function (req,res){
	res.send ('ENV: AUTO_ORIENT ' + process.env.AUTO_ORIENT + ' | DEFAULT_IMAGE_TYPE: ' + process.env.DEFAULT_IMAGE_TYPE);
})
// resize and remove EXIF profile data

function resizeImage (source,target,width,height) {
	gm(source).resize(width, height,"!").setFormat(process.env.DEFAULT_IMAGE_TYPE).write(target, function (err) {
  if (!err) {
  	console.log('resize image done');  }
});
	return true;
}

var server = app.listen(3000 || process.env.PORT, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("App listening at http://%s:%s", host, port)
})