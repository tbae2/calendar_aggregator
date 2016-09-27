const mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;


var mongoUrl = 'mongodb://localhost:27017/calendardb';
var dbConn;


MongoClient.connect(mongoUrl, function(err, db) {
        if (err) {
            console.log(err);
        }
        console.log('connected to' + mongoUrl);
        console.log(db);
        dbConn = db;
    })



var calInsert = function(calendar, caldata) {

  console.log(calendar);
    var calendarUpdate = dbConn.collection(calendar);

    calendarUpdate.insert(caldata), function(err, result){
      if(err){
        console.log(error);
      }
    };

    console.log('inserted docs into the ' + calendar + ' collection');

    dbConn.close();

};

module.exports = calInsert;
