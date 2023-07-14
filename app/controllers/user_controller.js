const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

exports.login_user =  async (req, res, next) => {
  const { email, password } = req.body;
  if(email){
    const user = await UserModel.findOne({email: email});
    if(user && (await bcrypt.compare(password, user.password))){
      const token = jwt.sign({ email: user.email }, "KEYOFTOCKEN");
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
  const { name, email, password } = req.body;
  if(name && email && password){
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
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    console.log("pass", hash)
    const newUser = new UserModel({
      name: name,
      email: email,
      password: hash
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