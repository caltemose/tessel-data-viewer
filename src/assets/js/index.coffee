Zepto ($) ->
    $.get 'http://localhost:3000/api/weather', (data) ->
        console.log data.result.length
        displayResult result for result in data.result

displayResult = (result) ->
    date = new Date result.date
    markup = '<li>' + result.temp.f.toFixed(1) + '&deg;F / ' + result.humid.toFixed(1) + '%RH @ ' + date.toLocaleString() + '</li>'
    $('#results').append markup

