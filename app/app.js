const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

//Router Files
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');

//Configurations
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
//Cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
});

//Routes
app.use('/users', userRouter);
app.use('/post', postRouter);

//Error Handler
app.use((error, req, res, next) => {
  const status = error.status || 500;
  res.status(status).json({items: [], state: false, error: error.message});
});

mongoose.connect('mongodb://mongodb:27017/easymediadb')
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err)
  })