var url = require('url'),
    http = require('http'),
    path = require('path'),
    fs = require('fs'),
    xManager = require('./xEventManager.js');
var log = require('util').puts;
    
server = http.createServer(function(request, response) {
    log(request.url);
    var parsedUrl = url.parse(request.url, true);
    var target = parsedUrl.pathname.substr(1);

    if (target == 'keyPress' || target == 'keyRelease') {
        this.emit(target, parsedUrl.query['keyCode']);
        response.writeHead(200);
        response.end();
        return;
    } else if (target == '' || target == 'remote-client.js' || target == 'remote_portrait.png') {
        if (target == '') target = 'remote.html';
        var filename = path.join(process.cwd(), target);
        log(filename);

        fs.readFile(filename, "binary", function(err, file){
            response.writeHead(200);
            response.write(file, "binary");
            response.end();
            return;
        });
    } else {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not Found\n");
        response.end();
        return;
    }
}).listen(8000);

xManager.createXManager(function(manager) {
    server.on('keyPress', function(keyCode) {
        try { manager.keyPress(keyCode); }
        catch (err) { }
    });
    server.on('keyRelease', function(keyCode) {
        try { manager.keyRelease(keyCode); }
        catch (err) { }
    });
});
