var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var monk = require('monk');
var db = monk('localhost:27017/mydb');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
global.appRoot = path.resolve(__dirname);

app.use(function (req, res, next) {
    req.db = db;
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
