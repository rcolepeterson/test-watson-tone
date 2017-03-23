const dotenv = require('dotenv-extended').load();
const watson = require('watson-developer-cloud');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.port || 3000;
const errors = require('throw.js');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var tone_analyzer = watson.tone_analyzer({
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  version: 'v3',
  version_date: '2016-05-19'
});

// Basic error handler
app.use((err, req, res, next) => {
  /* jshint unused:false */
  console.error(err);
  // If our routes specified a specific response, then send that. Otherwise,
  // send a generic message so as not to leak anything.
  res.status(500).send(err.response || 'Something broke!');
});

app.get('/', (req, res) => {
  res.send('You have reached the Tone Analyzer');
});

// curl -H "Content-Type: application/json" -X POST -d '{"text":"Why are here and why are we ding this?"}' http://localhost:3000/analyzeThis
app.post('/analyzeThis',  (req, res, next) => {
  
  var input = req.body.input || req.body;
  
  if (!input.text){
    next(new errors.NotAcceptable('No input. expecting a property named text holding a string'));
  }
  
  tone_analyzer.tone({ 
  text: input.text
 },
  (err, tone) => {
    if (err){
      console.log(err);
      next(new errors.NotAcceptable(err));
    }
    else
      res.send(JSON.stringify(tone, null, 2));
  });
});

app.listen(port, () => {
  console.log('Example app listening on port 3000!');
});