// https://www.ibm.com/watson/developercloud/tone-analyzer/api/v3/#authentication
// https://github.com/watson-developer-cloud/tone-analyzer-nodejs/blob/master/app.js
/*
 curl -u "4bebb53b-cad2-496c-9b2b-cb1510285bc7":"2jgXp1Im8RMk" -H "Content-Type: application/json" -d "{\"text\": \"Hi Team, I know the times are difficult! Our sales have been disappointing for the past three quarters for our data analytics product suite. We have a competitive data analytics product suite in the industry. But we need to do our job selling it! \"}" "https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2016-05-19"
*/

var dotenv = require('dotenv-extended').load();
var watson = require('watson-developer-cloud');

var tone_analyzer = watson.tone_analyzer({
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  version: 'v3',
  version_date: '2016-05-19'
});

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