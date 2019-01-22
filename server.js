const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const moment = require('moment');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

const dateOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// if there isnt a date, return the current time
app.get('/api/timestamp', (req, res) => {
  const dateValue = moment().format('ddd Do MMM YYYY');
  const unixDate = moment().unix();

  res.json({ unix: unixDate, utc: dateValue });
});

app.get('/api/timestamp/:dateValue', (req, res) => {
  let { dateValue } = req.params;

  if (moment(dateValue, 'YYYY-MM-DD').isValid()) {
    const unixDate = moment(dateValue, 'YYYY-MM-DD').unix();
    dateValue = moment(dateValue, 'YYYY-MM-DD').format('ddd Do MMM YYYY');
    res.json({ unix: unixDate, utc: dateValue });
  }
  res.json({ error: 'Invalid Date' });
});

app.listen(3000, () => {
  console.log('server up');
});
