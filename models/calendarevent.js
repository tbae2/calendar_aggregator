var mongoose  = require('mongoose');


var eventSchema = new mongoose.Schema({
        calendarId: String,
        day: Number,
        eventData: [ {  eventNumber: Number,
                        time: String,
                        title: String,
                          url: String
                    }]
});


module.exports = mongoose.model('Event', eventSchema);
