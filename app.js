const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
dotenv.config();
mongoose.connect(process.env.DB_CONNECT).then(
  () => {
    console.log("MongoDB is connected")
  },
  err => {
    console.log("Cannot connect to the mongodb" + err);
  }
);


app.use(express());
app.use(bodyParser.urlencoded({
  limit: '100mb',
  extended: true
}));
app.use(bodyParser.json({
  limit: '100mb',
}));
app.use(cors())
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Orgin", "Content-Type", "Accept", "Authorization");

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use(compression({
  level: 6,
  threshold: 10 * 1000,
  filter: shouldCompress
}))

function shouldCompress(req, res) {
  if (req.headers['x-no-compression'])
    return false
  return compression.filter(req, res)
}

const testimonial = require('./routes/testimonial');


app.use('/api/testimonial', testimonial);
var publicDir = path.join(__dirname, '/');

app.use('/', express.static(publicDir));

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
});


const port = process.env.port || 3000;
var server = app.listen(port, () => console.log('Server OK!', port));