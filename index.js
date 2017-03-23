const dotenv = require('dotenv-extended').load();
const watson = require('watson-developer-cloud');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.port || 3000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var tone_analyzer = watson.tone_analyzer({
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  version: 'v3',
  version_date: '2016-05-19'
});

app.get('/', (req, res) => {
  res.send('You have reached the Tone Analyzer');
});

// curl -H "Content-Type: application/json" -X POST -d '{"text":"Why are here and why are we ding this?"}' http://localhost:3000/analyzeThis
app.post('/analyzeThis',  (req, res) => {
  
  var input = req.body.input || req.body;
  tone_analyzer.tone({ 
  text: input.text
 },
  (err, tone) => {
    if (err)
      console.log(err);
    else
      res.send(JSON.stringify(tone, null, 2));
  });
});

app.listen(port, () => {
  console.log('Example app listening on port 3000!');
});