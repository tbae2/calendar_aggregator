const request = require('request');
const cheerio = require('cheerio');
// const fs = require('fs');
// const mongodb = require('mongodb');
// const mongoconnect = require('./mongoconnect');

const header = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
};

const urls = [
//   {
//     url: 'http://www.roswellgov.com/discover-us/calendar',
//     headers: header,
//     id: 'roswell'
// },
{
    url: 'http://www.mariettacalendar.com/?ai1ec=action~month|request_format~html',
    headers: header,
    id: 'marietta'
}]

urls.forEach(function(cal) {
    request(cal.url, function(err, response, html) {
        if (err) {
            return err;
        };
        //console.log(html);

        var holdEvents = [];
        var calDayData = {};
        var holdDayEvents = [];
        var $ = cheerio.load(html);
        //var testData = $('.ai1ec-day').find('.ai1ec-event-title').text;
        //  console.log(testData);
        if (cal.id === 'roswell') {

            $('.calendar_day_with_items').each(function(i, element) {

                //bind this to var for easier reuse
                var element = $(this);
                //pick out the day which is a text in the div without all the other elements, trim the whitespace
                var calDay = Number(element[0].childNodes[0].nodeValue.trim());
                calDayData.day = calDay;

                element.find('.calendar_item').each(function(i, item) {
                    //build each event into an object and then push to holdDayEvents Array to aggregate
                    var buildEvent = {};
                    buildEvent.time = $(this).find('.calendar_eventtime').text().trim();
                    buildEvent.title = $(this).find('.calendar_eventlink').text().trim();
                    buildEvent.url = 'http://www.roswellgov.com' + $(this).find('.calendar_eventlink').attr('href');
                    holdDayEvents.push(buildEvent);

                });
                //build the overall calendar day object of events
                calDayData.events = holdDayEvents;
                //push the build object to the holdEvents array
                holdEvents.push(calDayData);

            });
        };
        if (cal.id === 'marietta') {

            $('.ai1ec-day').each(function(i, element) {


                var item = $(this);
                var calDay = item.find('.ai1ec-date').text().trim();
                calDayData.day = calDay;
                item.find('.ai1ec-event').each(function(i, dayevent) {
                    var buildEvent = {};

                    buildEvent.time = $(this).find('.ai1ec-event-time').text().trim();
                    buildEvent.title = $(this).find('.ai1ec-event-title').text().trim();
                    buildEvent.url = $(this).closest('.ai1ec-event-container').attr('href');
                    holdDayEvents.push(buildEvent);
                });

                calDayData.event = holdDayEvents;
                holdEvents.push(calDayData);

            });

        }
        //console.log(holdEvents);
        // mongoconnect(cal.id, holdEvents);
        holdEvents = [];
    });
});
