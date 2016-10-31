const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
var React = require('react');
var ReactDOM = require('react-dom');
const app = express();
var CalEvent = require('./models/calevent');
const scraper = require('./utils/scrape');


app.use(express.static(__dirname + '/dist'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.get('/api/all', function(req, res){
    CalEvent.find({}, function(err, users){
        res.send(users);
    });
})



var server = app.listen(3000, function(){
  console.log('server listening @ http://localhost ' + server.address().port);
});
