const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//Router Files
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');

//Configurations
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
//Cors
app.use(cors({
  origin: '*',
  methods: ['GET','POST', 'OPTIONS']
}));

//Routes
app.use('/users', userRouter);
app.use('/post', postRouter);

mongoose.connect('mongodb+srv://ikdpublicidad:nu6Ue3td6zKJuj0E@cluster0.n0xqoyk.mongodb.net/easymediadb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
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