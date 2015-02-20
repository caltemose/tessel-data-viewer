var getWeatherData, displayResults, fixNum, fixDate, timer;

// var ENDPOINT_HOST = 'http://192.168.1.11:3000';
var ENDPOINT_HOST = 'http://localhost:3000';
var ENDPOINT_PATH = '/api/weather';


Zepto(function ($) {
    getWeatherData();
});

getWeatherData = function () {
    clearTimeout(id);
    timer = null;
    $.get(ENDPOINT_HOST + ENDPOINT_PATH, function (data) {
        displayResults(data.result[0]);
        timer = setTimeout(getWeatherData, 5 * 60 * 1000);
    });
};

displayResults = function (result) {
    console.log(result);
    $('#tempF').html(fixNum(result.temp.f));
    $('#tempC').html(fixNum(result.temp.c));
    $('#humid').html(fixNum(result.humid));
    $('#date').html(fixDate(result.date));
};

fixNum = function (num) {
    return Math.round(num*100)/100;
};

fixDate = function (datestring) {
    var date = new Date(datestring);
    return date.toLocaleString();
};
