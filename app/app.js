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
app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type , Authorization');
});

//Routes
app.get('/', (req, res) => {
  res.json({message: "hola guapa funciona"})
});
app.use('/users', userRouter);
app.use('/post', postRouter);

mongoose.connect('mongodb+srv://ikdpublicidad:nu6Ue3td6zKJuj0E@cluster0.n0xqoyk.mongodb.net/easymediadb?retryWrites=true&w=majority')
  .then(() => {
    console.log("me conecte")
    app.listen(3000, function (err) {
      if (err) console.log(err);
      console.log("Server listening on PORT", 3000);
    });
  })
  .catch(err => {
    console.log(err)
  })