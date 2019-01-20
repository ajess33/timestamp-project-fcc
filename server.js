const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// first API endpoint
app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' });
});

app.get('/api/timestamp/:dateValue', (req, res) => {
  console.log(req.params.dateValue);
  res.send(`The day is ${req.params.dateValue}`);
  // res.json({ natural: req.params.dateValue });
});

app.listen(3000, () => {
  console.log('server up');
});
