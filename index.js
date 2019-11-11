var express = require('express');
var fs = require('fs');

var app = express();

const port = 3000;

const cries = fs.readdirSync('audio/1stgen');

var answer;
var correctAnswers = 0;


app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/audio'))

app.get('/', function(req, res)
{
    console.log("someone is visiting");
    res.sendFile(__dirname + '/html/index.html');
});


app.get('/api/randomCry', function(req, res) {
    let cry = "audio/1stgen/" + cries[Math.floor(Math.floor(Math.random() * cries.length))]
    let split = cry.split('/');
    answer = split[split.length - 1].split('.')[0].split('-')[1].trim().toLowerCase();
    console.log('sending the cry of: ' + answer);

    fs.createReadStream(cry).pipe(res);
});

app.get('/api/submitGuess', function(req, res)
{
    let guess = req.query.guess.toLowerCase();
    console.log("recieved a guess of: " + guess);
    if (guess === answer)
    {
        correctAnswers++;
        res.send("good job you got " + correctAnswers + " right");
    }
    else
    {
        correctAnswers = 0;
        res.send("bad job");
    }
});

var server = app.listen(port, function() 
{
    console.log("Listening on port: " + port);
});