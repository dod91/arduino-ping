var express = require('express');
var router = express.Router();

var http = require('http');



/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});


router.get('/status', function(req, res) {
	var redLed = res.locals.redLed;
	var greenLed = res.locals.greenLed;
	var arduino = res.locals.arduino;
	var ok = true;

    var r = Math.random();

    var host = 'localhost'
    var path = (r > 0.5) ? '/ok' : '/ko';
    var port = 3000;
    var option = {
      host: host,
      path: path,
      port: port,
      method: 'GET',
    };


    var request = http.request(option, function (response) {
      response.setEncoding('utf-8');
      response.on('end', function () {
      	if(ok){
      		res.send(200);
      	}else{
      		res.send(500);
      	}
      });
      response.on('data', function (chunk) {
        redLed.off();
        greenLed.off();

        if (chunk === 'OK') {
          greenLed.on();

        } else {
        	ok = false;
          redLed.on();

        }
        console.log(chunk);
      }); //jshint ignore:line
      response.on('error', function (err) {});
    });
    request.end();
});

module.exports = router;
