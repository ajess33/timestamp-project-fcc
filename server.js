const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// if there isnt a date, return the current time
app.get('/api/timestamp', (req, res) => {
  const dateValue = new Date();
  res.json({ unix: dateValue, natural: dateValue });
});

app.get('/api/timestamp/:dateValue', (req, res) => {
  // check if dateValue is valid... if new Date(dateValue) is successful

  // unix date must be an integer in milliseconds (not string)

  let { dateValue } = req.params;
  dateValue = new Date(dateValue);
  const dateInt = parseInt(dateValue);

  // dateNatural = new Date(dateValue);
  res.json({ unix: dateInt.getTime(), utc: dateValue.toUTCString() });
});

app.listen(3000, () => {
  console.log('server up');
});
