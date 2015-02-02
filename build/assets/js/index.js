var displayResult;

Zepto(function($) {
  return $.get('http://localhost:3000/api/weather', function(data) {
    var result, _i, _len, _ref, _results;
    _ref = data.result;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      result = _ref[_i];
      _results.push(displayResult(result));
    }
    return _results;
  });
});

displayResult = function(result) {
  var date, markup;
  date = new Date(result.date);
  markup = '<li>' + result.temp.f.toFixed(1) + '&deg;F / ' + result.humid.toFixed(1) + '%RH @ ' + date.toLocaleString() + '</li>';
  return $('#results').append(markup);
};
