var displayResults;

Zepto(function($) {
  return $.get('http://localhost:3000/api/weather', function(data) {
    return displayResults(data.result);
  });
});

displayResults = function(data) {
  var cTemps, ctx, fTemps, labelNumbers, num, options, r, result, weatherChart, weatherData;
  ctx = document.getElementById("myChart").getContext("2d");
  labelNumbers = (function() {
    var _i, _ref, _results;
    _results = [];
    for (num = _i = 1, _ref = data.length; 1 <= _ref ? _i <= _ref : _i >= _ref; num = 1 <= _ref ? ++_i : --_i) {
      _results.push(num);
    }
    return _results;
  })();
  fTemps = (function() {
    var _results;
    _results = [];
    for (result in data) {
      r = data[result];
      _results.push(r.temp.f);
    }
    return _results;
  })();
  cTemps = (function() {
    var _results;
    _results = [];
    for (result in data) {
      r = data[result];
      _results.push(r.temp.c);
    }
    return _results;
  })();
  weatherData = {
    labels: labelNumbers,
    datasets: [
      {
        label: "Fahrenheit temps",
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: fTemps
      }, {
        label: "Celsius temps",
        fillColor: "rgba(151,187,205,0.2)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: cTemps
      }
    ]
  };
  options = {
    pointDotRadius: 4
  };
  weatherChart = new Chart(ctx).Line(weatherData, options);
};
