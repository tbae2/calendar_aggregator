const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const calendarevent = require('./models/calendarevent');






mongoose.connect('mongodb://localhost:27017/calendardb');

mongoose.connection.on('error', function(){
    console.log('connection error, make sure mongodb is accessible');
})
mongoose.connection.on('open', function(){
  console.log('connected to mongodb');
})


var server = app.listen(3000, function(){
  console.log('server listening @ http://localhost ' + server.address().port);
});
