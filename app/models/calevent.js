var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/calendardb');

mongoose.connection.on('error', function() {
    console.log('connection error, make sure mongodb is accessible');
})

var eventSchema = new mongoose.Schema({
    calendarId: String,
    day: Number,
    eventData: [{
        eventNumber: Number,
        time: String,
        title: String,
        url: String
    }]
});


module.exports = mongoose.model('CalEvent', eventSchema);
