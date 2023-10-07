// Create web server with Node.js
// Run: node comments.js

var http = require('http');
var fs = require('fs');

//create a server object:
http.createServer(function (req, res) {
    if (req.url === '/api/comments') {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        fs.readFile('comments.json', function (err, data) {
            if (err) throw err;
            res.write(data);
            res.end();
        });
    }
}).listen(8080);