var resultsContainer;

Zepto(function ($) {
    resultsContainer = $('#myChart');
    $.get('http://localhost:3000/api/weather/testing', function (data) {
        displayResults(data.result);
    });
});

var displayResults = function (results) {
    var html = '<ul class="custom-chart-items">';
    var len = results.length;
    var i, res;
    for(i=0; i<len; i++) {
        res = results[i];
        html += '<li><div class="temperature"';
        html += 'style="width:' + (res.temp.f.toFixed(0) * 10) + 'px"';
        html += '></div><div class="humidity"';
        html += 'style="width:' + (res.humid.toFixed(0) * 10) + 'px"';
        html += '></div></li>';
    }
    html += '</ul>';
    resultsContainer.html(html);
};
