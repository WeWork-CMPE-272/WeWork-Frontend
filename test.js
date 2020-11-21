const moment = require('moment');

const getNthWeekday = (baseDate, weekth, weekday) => {

    // parse base date
    var date = moment(baseDate);
    var year = date.year();
    var month = date.month();

    // Convert date to moment (month 0-11)
    var myMonth = moment({year: year, month: month});

    // assume we won't have to move forward any number of weeks
    var weeksToAdvance = weekth-1;

    // Get first weekday of the first week of the month
    var firstOccurranceOfDay = myMonth.weekday(weekday);

    // Check if first weekday occurrance is in the given month
    if( firstOccurranceOfDay.month() != month ){
        weeksToAdvance++;
    }

    // Return nth weekday of month formatted (custom format)
    return firstOccurranceOfDay.add(weeksToAdvance, 'weeks');

}

let today = moment()
let payday = null;
week = 1;
while(!today.isBefore(getNthWeekday(today, week, 5))) {
    week +=2;
}
payday = getNthWeekday(today,week,5);
console.log(payday)
