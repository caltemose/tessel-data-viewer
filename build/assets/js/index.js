var getWeatherData,displayResults,fixNum,fixDate,ENDPOINT_HOST="http://localhost:3000",ENDPOINT_PATH="/api/weather";Zepto(function(){getWeatherData()}),getWeatherData=function(){$.get(ENDPOINT_HOST+ENDPOINT_PATH,function(t){displayResults(t.result[0])})},displayResults=function(t){console.log(t),$("#tempF").html(fixNum(t.temp.f)),$("#tempC").html(fixNum(t.temp.c)),$("#humid").html(fixNum(t.humid)),$("#date").html(fixDate(t.date))},fixNum=function(t){return Math.round(100*t)/100},fixDate=function(t){var e=new Date(t);return e.toLocaleString()};