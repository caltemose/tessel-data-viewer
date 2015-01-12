Zepto ($) ->
    $.get 'http://localhost:3000/api/weather', (data) ->
        displayResults data.result

displayResults = (data) ->
    ctx = document.getElementById("myChart").getContext("2d");

    labelNumbers = (num for num in [1..data.length])

    fTemps = for result, r of data 
        r.temp.f

    cTemps = for result, r of data
        r.temp.c



    weatherData = 
        labels: labelNumbers
        datasets: [
            {
                label: "Fahrenheit temps"
                fillColor: "rgba(220,220,220,0.2)"
                strokeColor: "rgba(220,220,220,1)"
                pointColor: "rgba(220,220,220,1)"
                pointStrokeColor: "#fff"
                pointHighlightFill: "#fff"
                pointHighlightStroke: "rgba(220,220,220,1)"
                data: fTemps
            },
            {
                label: "Celsius temps"
                fillColor: "rgba(151,187,205,0.2)"
                strokeColor: "rgba(151,187,205,1)"
                pointColor: "rgba(151,187,205,1)"
                pointStrokeColor: "#fff"
                pointHighlightFill: "#fff"
                pointHighlightStroke: "rgba(151,187,205,1)"
                data: cTemps
            }
        ]

    options = 
        pointDotRadius: 4

    weatherChart = new Chart(ctx).Line weatherData, options

    return

