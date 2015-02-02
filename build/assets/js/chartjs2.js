var getWeatherData, getQueryVariable, displayResults, 
    startDate, endDate, 
    startField, endField, 
    startFields, endFields,
    steps, stepsField,
    weatherChart;

var ENDPOINT = 'http://192.168.1.115:3000/api/weather/date/range/';
var STEPS_DEFAULT = 5;


Zepto(function ($) {
    startField = $('[name="start-date"]');
    endField = $('[name="end-date"]');

    startFields = {
        y: $('[name="start-year"'),
        m: $('[name="start-month"'),
        d: $('[name="start-day"'),
        hh: $('[name="start-hours"'),
        mm: $('[name="start-minutes"'),
        ss: $('[name="start-seconds"')
    };
    endFields = {
        y: $('[name="end-year"'),
        m: $('[name="end-month"'),
        d: $('[name="end-day"'),
        hh: $('[name="end-hours"'),
        mm: $('[name="end-minutes"'),
        ss: $('[name="end-seconds"')
    };

    stepsField = $('[name="steps"]');

    endDate = moment();
    startDate = moment().subtract(3, 'hours');
    
    steps = STEPS_DEFAULT;

    startFields.y.val(startDate.format('YYYY'));
    startFields.m.val(startDate.format('MM'));
    startFields.d.val(startDate.format('DD'));
    startFields.hh.val(startDate.format('hh'));
    startFields.mm.val(startDate.format('mm'));
    startFields.ss.val(startDate.format('ss'));

    endFields.y.val(endDate.format('YYYY'));
    endFields.m.val(endDate.format('MM'));
    endFields.d.val(endDate.format('DD'));
    endFields.hh.val(endDate.format('hh'));
    endFields.mm.val(endDate.format('mm'));
    endFields.ss.val(endDate.format('ss'));

    $('#filter').submit(function () {
        var s = startFields.y.val() + '-';
        s += startFields.m.val() + '-';
        s += startFields.d.val() + 'T';
        s += startFields.hh.val() + ':';
        s += startFields.mm.val() + ':';
        s += startFields.ss.val() + '-05:00';

        var e = endFields.y.val() + '-';
        e += endFields.m.val() + '-';
        e += endFields.d.val() + 'T';
        e += endFields.hh.val() + ':';
        e += endFields.mm.val() + ':';
        e += endFields.ss.val() + '-05:00';


        steps = parseInt(stepsField.val()) || STEPS_DEFAULT;
        
        startDate = moment(s);
        endDate = moment(e);

        getWeatherData();
        return false;
    });

    getWeatherData();
});

getWeatherData = function () {
    var url = ENDPOINT + startDate.format() + '/' + endDate.format();
    console.log(url);
    $.get(ENDPOINT + startDate.format() + '/' + endDate.format(), function (data) {
        console.log('result count:', data.results.length);
        displayResults(data.results);
    });
};

getQueryVariable = function (variable) {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
};

displayResults = function (data) {
    if (weatherChart && weatherChart.destroy) {
        weatherChart.destroy();
    }
    
    // canvas 2d context
    var ctx = document.getElementById("myChart").getContext("2d");
      
    // data prep
    var len = data.length;
    var labels = [];
    var fTemps = [];
    var cTemps = [];
    var humidity = [];
    var i, d, label;

    // iterate through a subset of results and populat arrays for labels and temps
    for(i=0; i<len; i+=steps) {
        d = new Date(data[i].date);
        label = d.getMonth()+1 + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes();
        labels.push(label);
        fTemps.push(data[i].temp.f);
        cTemps.push(data[i].temp.c);
        humidity.push(data[i].humid);
    }

    var weatherData = {
        labels: labels,
        datasets: [
            {
                data: fTemps,
                label: "Fahrenheit temps",
                fillColor: "rgba(238,234,116,0.5)",
                strokeColor: "rgba(220,220,220,1)",
                // Line graphs
                pointColor: "rgba(237,224,40,1)",
                pointStrokeColor: "rgb(237,224,40)",
                pointHighlightFill: "rgb(237,224,40)",
                pointHighlightStroke: "rgba(238,234,116,1)"
                // Bar graphs
                // highlightFill: "rgba(220,220,220,0.75)",
                // highlightStroke: "rgba(220,220,220,1)"
            },
            {
                data: cTemps,
                label: "Celsius temps",
                fillColor: "rgba(227,74,64,0.5)",
                strokeColor: "rgba(220,60,50,1)",
                // Line graphs
                pointColor: "rgba(227,74,64,1)",
                pointStrokeColor: "rgb(200,50,30)",
                pointHighlightFill: "rgb(227,74,64,1)",
                pointHighlightStroke: "rgba(200,50,30,1)"
                // Bar graphs
                // highlightFill: "rgba(220,220,220,0.75)",
                // highlightStroke: "rgba(220,220,220,1)"
            },
            {
                data: humidity,
                label: "Humidity",
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,1)",
                // Line graphs
                pointColor: "rgba(129,160,227,1)",
                pointStrokeColor: "rgb(129,160,227)",
                pointHighlightFill: "rgb(120,150,220)",
                pointHighlightStroke: "rgb(129,160,227)"
                // Bar graphs
                // highlightFill: "rgba(220,220,220,0.75)",
                // highlightStroke: "rgba(220,220,220,1)"
            }

        ]
    };
    
    options = {
        pointDotRadius: 3,
        animation: false
        // barValueSpacing: 1,
        // barDatasetSpacing: 1
    };
    
    weatherChart = new Chart(ctx).Line(weatherData, options);
};
