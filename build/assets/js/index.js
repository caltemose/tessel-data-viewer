var getWeatherData, displayResults, fixNum, fixDate, timer, currentTimer, updateCurrentTime, updateButtons;

var ENDPOINT_HOST = 'http://192.168.1.11:3000';
// var ENDPOINT_HOST = 'http://localhost:3000';
var ENDPOINT_PATH = '/api/weather';

var DATE_FORMAT = 'LLL'


Zepto(function ($) {
    getWeatherData();
    updateCurrentTime();
    currentTimer = setInterval(updateCurrentTime, 15*1000);
    updateButtons();
});

updateCurrentTime = function () {
    $('#currentTime').html(moment().format(DATE_FORMAT));
};

updateButtons = function () {
    var url = "chartjs.html";
    var end = moment();
    var start = moment().subtract(1, 'days');
    url += '?start=' + start.format() + '&end=' + end.format() + '&steps=10';
    $('#past24').attr('href', url);

    // this button should really use a different page which uses a different
    // endpoint to make the db query more efficient since chartjs uses the
    // front-end to filter/reduce data
    url = "chartjs.html";
    end = moment();
    start = moment().subtract(7, 'days');
    url += '?start=' + start.format() + '&end=' + end.format() + '&steps=50';
    $('#pastWeek').attr('href', url);
};

getWeatherData = function () {
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }
    $.get(ENDPOINT_HOST + ENDPOINT_PATH, function (data) {
        displayResults(data.result[0]);
        timer = setTimeout(getWeatherData, 5 * 60 * 1000);
    });
};

displayResults = function (result) {
    // console.log(result);
    $('#tempF').html(fixNum(result.temp.f));
    $('#tempC').html(fixNum(result.temp.c));
    $('#humid').html(fixNum(result.humid));
    $('#date').html(fixDate(result.date));
};

fixNum = function (num) {
    return Math.round(num*100)/100;
};

fixDate = function (datestring) {
    return moment(datestring).format(DATE_FORMAT);
};
