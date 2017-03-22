// https://www.ibm.com/watson/developercloud/tone-analyzer/api/v3/#authentication
// https://github.com/watson-developer-cloud/tone-analyzer-nodejs/blob/master/app.js

/*
 
 curl -u "4bebb53b-cad2-496c-9b2b-cb1510285bc7":"2jgXp1Im8RMk" -H "Content-Type: application/json" -d "{\"text\": \"Hi Team, I know the times are difficult! Our sales have been disappointing for the past three quarters for our data analytics product suite. We have a competitive data analytics product suite in the industry. But we need to do our job selling it! \"}" "https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2016-05-19"

*/

const dotenv = require('dotenv-extended').load();
const watson = require('watson-developer-cloud');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var tone_analyzer = watson.tone_analyzer({
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  version: 'v3',
  version_date: '2016-05-19'
});

var Client = require('node-rest-client').Client;
var client = new Client();

app.get('/', (req, res) => {
  res.send('tone analyzer');
});

// curl -H "Content-Type: application/json" -X POST -d '{"text":"Why are here and why are we ding this?"}' http://localhost:3000/analyzeThis
app.post('/analyzeThis',  (req, res) => {
  
  var input = req.body.input || req.body;
  tone_analyzer.tone({ 
  text: input.text,
  tone: 'emotion',
  sentences:false
 },
  (err, tone) => {
    if (err)
      console.log(err);
    else
      var resObject = JSON.stringify(tone, null, 2);
      res.send(resObject);
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});


const updateFireBase = () => {

jsonClient.get('/messages')
  .then(res => {
    console.log('got')
  });

}


/*
tone_analyzer.tone({ 
  text: 'A word is dead when it is said, some say. Emily Dickinson',
  tone: 'emotion',
  sentences:false
 },
  function(err, tone) {
    if (err)
      console.log(err);
    else
      console.log(JSON.stringify(tone, null, 2));
});
*/