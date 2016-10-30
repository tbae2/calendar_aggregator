const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const CalEvent = require('./models/calendarevent');
const scraper = require('./app/utils/scrape');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.get('/', function(req, res){
    CalEvent.find({}, function(err, users){
        res.send(users);
    });
})





var server = app.listen(3000, function(){
  console.log('server listening @ http://localhost ' + server.address().port);
});
