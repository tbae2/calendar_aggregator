var mongoose  = require('mongoose');


var eventSchema = new mongoose.Schema({
        calendarId: String,
        eventData: [ { day: Number,
                        events: [time: String,
                                  title: String,
                                  url: String
                                ]
                      }]
});


module.exports = mongoose.model('Event', eventSchema);
