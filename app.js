const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');


const rosUrl = {
    url: 'http://www.roswellgov.com/discover-us/calendar',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
    }
};



request(rosUrl, function(err, response, html) {
    if (err) {
        return err;
    };

var holdEvents = [];


    var $ = cheerio.load(html);
    $('.calendar_day_with_items').each(function(i, element) {
        var calDayData = {};
        var holdDayEvents = [];
        //bind this to var for easier reuse
        var element = $(this);
        //pick out the day which is a text in the div without all the other elements, trim the whitespace
        var calDay = Number(element[0].childNodes[0].nodeValue.trim());
        calDayData.day = calDay;

        element.find('.calendar_item').each(function(i, item) {
          //build each event into an object and then push to holdDayEvents Array to aggregate
            var buildEvent = {};
            buildEvent.time = $(this).find('.calendar_eventtime').text();
            buildEvent.title = $(this).find('.calendar_eventlink').text();
            buildEvent.url = 'http://www.roswellgov.com' + $(this).find('.calendar_eventlink').attr('href');
            holdDayEvents.push(buildEvent);

        });
        //build the overall calendar day object of events
        calDayData.events = holdDayEvents;
        //push the build object to the holdEvents array
       holdEvents.push(calDayData);

    });
    //test write to json file 
    fs.writeFile('calendar.json',JSON.stringify(holdEvents,null,4),function(err){
      console.log('saved to jsonfile');
    });
});
