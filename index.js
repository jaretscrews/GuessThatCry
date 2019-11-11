var express = require('express');
var fs = require('fs');

var app = express();

const port = 3000;

app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/audio'))

app.get('/', function(req, res)
{
    res.sendFile(__dirname + '/html/index.html');
});


app.get('/test', function(req, res) {
    var cries = fs.readdirSync('audio/1stgen');
    let cry = "audio/1stgen/" + cries[Math.floor(Math.floor(Math.random() * cries.length))]
    
    console.log('sending the cry of: ' + cry);


    fs.createReadStream(cry).pipe(res);
})

var server = app.listen(port, function() 
{
    console.log("Listening on port: " + port);
});