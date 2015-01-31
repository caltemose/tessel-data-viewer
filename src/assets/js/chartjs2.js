var getWeatherData, getQueryVariable, displayResults, startDate, endDate, startField, endField, weatherChart, inc, incField;
var baseUrl = 'http://192.168.1.115:3000/api/weather/date/range/';


Zepto(function ($) {
    startField = $('[name="start-date"]');
    endField = $('[name="end-date"]');
    incField = $('[name="inc"]');
    startDate = getQueryVariable('start') || '2015-01-12T00:00';
    endDate = getQueryVariable('end') || '2015-01-13T00:00';
    inc = getQueryVariable('inc') || 1;

    startField.val(startDate);
    endField.val(endDate);

    $('#filter').submit(function () {
        startDate = startField.val();
        endDate = endField.val();
        inc = parseInt(incField.val()) || 1;
        if (startDate.length && endDate.length) {
            getWeatherData();
        }
        return false;
    });

    getWeatherData();
});

getWeatherData = function () {
    $.get(baseUrl + startDate + '/' + endDate, function (data) {
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
    var i;

    // iterate through a subset of results and populat arrays for labels and temps
    for(i=0; i<len; i+=inc) {
        labels.push( new Date(data[i].date).toLocaleString() );
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
