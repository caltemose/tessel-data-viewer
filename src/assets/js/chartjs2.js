var displayResults;

Zepto(function ($) {
  $.get('http://localhost:3000/api/weather/testing', function (data) {
    displayResults(data.result);
  });
});

displayResults = function (data) {
  // canvas 2d context
    var ctx = document.getElementById("myChart").getContext("2d");
      
    // data prep
    var len = data.length;
    var labels = [];
    var fTemps = [];
    var cTemps = [];
    var humidity = [];
    var i;
    var inc = 20;

    // iterate through a subset of results and populat arrays for labels and temps
    for(i=0; i<len; i+=inc) {
        labels.push(i);
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
                pointHighlightStroke: "rgba(238,234,116,1)",
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
                pointHighlightStroke: "rgb(129,160,227)",
                // Bar graphs
                // highlightFill: "rgba(220,220,220,0.75)",
                // highlightStroke: "rgba(220,220,220,1)"
            }

        ]
    };
    
    options = {
        pointDotRadius: 3
        // barValueSpacing: 1,
        // barDatasetSpacing: 1
    };
    
    var weatherChart = new Chart(ctx).Line(weatherData, options);

};
