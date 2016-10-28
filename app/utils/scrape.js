const request = require('request');
const cheerio = require('cheerio');
// const fs = require('fs');
// const mongodb = require('mongodb');
// const mongoconnect = require('./mongoconnect');
const CalEvent = require('./models/calendarevent');



const header = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
};

const urls = [
  {
    url: 'http://www.roswellgov.com/discover-us/calendar',
    headers: header,
    id: 'roswell'
},
{
    url: 'http://www.mariettacalendar.com/?ai1ec=action~month|request_format~html',
    headers: header,
    id: 'marietta'
}
]

urls.forEach(function(cal) {
    request(cal, function(err, response, html) {
        if (err) {
            return err;
        };

        var holdEvents = [];
        var calData = {};
        var holdDayEvents = [];
        var $ = cheerio.load(html);


        if (cal.id === 'roswell') {

            $('.calendar_day_with_items').each(function(i, element) {
                    calData.calendarId = 'roswell';
                //bind this to var for easier reuse
                var element = $(this);
                //pick out the day which is a text in the div without all the other elements, trim the whitespace
                var calDay = Number(element[0].childNodes[0].nodeValue.trim());
                calData.day = calDay;

                element.find('.calendar_item').each(function(i, item) {
                    //build each event into an object and then push to holdDayEvents Array to aggregate
                    var buildEvent = {};
                    buildEvent.eventNumber = i;
                    buildEvent.time = $(this).find('.calendar_eventtime').text().trim();
                    buildEvent.title = $(this).find('.calendar_eventlink').text().trim();
                    buildEvent.url = 'http://www.roswellgov.com' + $(this).find('.calendar_eventlink').attr('href');
                    holdDayEvents.push(buildEvent);

                });
                //build the overall calendar day object of events
                calData.eventData = holdDayEvents;
                //push the build object to the holdEvents array
                holdDayEvents = [];

                //utilize mongoose module, match schema and import to mongodb
                var calevent = new CalEvent({
                  calendarId: calData.calendarId,
                  day: calData.day,
                  eventData: calData.eventData
                });

                calevent.save(function(err){
                  if(err){
                    console.log(errr);
                  }
                });
              //  console.log(calData);
            });
        };
        if (cal.id === 'marietta') {

          calData.calendarId = 'marietta';

            $('.ai1ec-day').each(function(i, element) {

                var item = $(this);
                var calDay = item.find('.ai1ec-date').text().trim();
                calData.day = calDay;
                item.find('.ai1ec-event').each(function(i, dayevent) {
                      var buildEvent = {};
                    buildEvent.eventNumber = i;
                    buildEvent.time = $(this).find('.ai1ec-event-time').text().trim();
                    buildEvent.title = $(this).find('.ai1ec-event-title').text().trim();
                    buildEvent.url = $(this).closest('.ai1ec-event-container').attr('href');
                    holdDayEvents.push(buildEvent);
                });

            calData.eventData = holdDayEvents;
            //blank holddayevents after object build
            holdDayEvents = [];
              //  holdEvents.push(calDayData);

          //utilize mongoose module, match schema and import to mongodb
              var calevent = new CalEvent({
                calendarId: calData.calendarId,
                day: calData.day,
                eventData: calData.eventData
              });

              calevent.save(function(err){
                if(err){
                  console.log(errr);
                }
              });

              //console.log(calData);

            });

        };

    });
});
