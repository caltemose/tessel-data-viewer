var getWeatherData, displayResults, fixNum, fixDate;

// var ENDPOINT_HOST = 'http://192.168.1.11:3000';
var ENDPOINT_HOST = 'http://localhost:3000';
var ENDPOINT_PATH = '/api/weather';


Zepto(function ($) {
    getWeatherData();
});

getWeatherData = function () {
    $.get(ENDPOINT_HOST + ENDPOINT_PATH, function (data) {
        displayResults(data.result[0]);
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
