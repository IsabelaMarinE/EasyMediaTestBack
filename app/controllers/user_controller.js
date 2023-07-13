const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = request('../models/userModel');

exports.login_user =  async (req, res, next) => {
  const error = validationResult(req);
  const { email, password } = req.body;
  if(!error.isEmpty()){
    const user = await UserModel.find().findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
      const token = jwt.sign(
        { id: user._id, email },
        "KEYOFTOCKEN",
        {
          expiresIn: "1h",
        }
      );
      return res
          .status(200)
          .json({
            items: [token],
            state: true,
            error: ''
          })
    } else {
      return res
          .status(400)
          .json({
            items: [],
            state: false,
            error: 'Invalid Credentials'
          })
    }
  }
}

exports.create_user = (req, res, next) => {
  const error = validationResult(req);
  let passwordHash;
  const { name, email, password } = req.body;
  if(!error.isEmpty()){
    UserModel.find().findOne({email})
      .then((user) => {
        if(user){
          return res
          .status(302)
          .json({
            items: [],
            state: false,
            error: 'User Already exists'
          })
        }
      })
    bcrypt
      .genSalt(10)
      .then(salt => {
        return bcrypt.hash(password, salt)
      })
      .then(hash => {
        passwordHash = hash;
      });
    const newUser = new UserModel({
      name: name,
      email: email,
      password: passwordHash
    });
    newUser.save()
    .then((data) => {
      if(data){
        return res
        .status(201)
        .json({
          items: [data],
          state: true,
          error: ''
        })
      }
    })
    .catch(err => {
      return res
      .status(422)
      .json({
        items: [],
        state: false,
        error: err
      })
    })
  } else {
    return res
      .status(422)
      .json({
        items: [],
        state: false,
        error: error
      })
  }
}