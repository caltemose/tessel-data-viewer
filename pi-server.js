var static = require('node-static');

//
// Create a node-static server instance to serve the './public' folder
//
var dir = './build';
var file = new static.Server(dir);

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        //
        // Serve files!
        //
        file.serve(request, response);
    }).resume();
}).listen(8080);

console.log('node-static', dir);
