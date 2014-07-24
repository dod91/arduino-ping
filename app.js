var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var johnny = require("johnny-five");
var board = new johnny.Board();

var greenLed, redLed;

board.on('ready', function () {
  greenLed = new johnny.Led(8);
  redLed = new johnny.Led(9);
   this.loop(5000, function () {});

});


var routes = require('./routes/index');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);


app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req,res,next) {
  res.locals.arduino = board;
  res.locals.greenLed = greenLed;
  res.locals.redLed = redLed;
  next();
});
app.use('/', routes);

module.exports = app;

