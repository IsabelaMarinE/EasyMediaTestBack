const { validationResult } = require('express-validator');
const PostModel = require('../models/postModel');
const error = new Error();

exports.getAllPosts = async (req, res, next) => {
  try {
    const allpost = await PostModel.find();
    return res
          .status(200)
          .json({
            items: allpost,
            state: true,
            error: ''
          })
  } catch (error) {
    return res
          .status(204)
          .json({
            items: [],
            state: false,
            error: 'No Existing post'
          })
  }
}

exports.getPostByUser = async (req, res, next) => {
  const { id } = req.body;
  if(id){
    try {
      const postUser = await PostModel.find({ idUser: id });
      return res
            .status(200)
            .json({
              items: postUser,
              state: true,
              error: ''
            })
    } catch (error) {
      return res
            .status(204)
            .json({
              items: [],
              state: false,
              error: 'User Dont have posts'
            })
    }
  }
}

exports.createPost = (req, res, next) => {
  const error = validationResult(req);
  if(!error.isEmpty()){
    const { idUser, title, description } = req.body;
    const newPost = new PostModel({
      idUser: idUser,
      title: title,
      description: description,
      date: new Date()
    });
    newPost.save()
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
  }
}

exports.filterPostTitle = async (req, res, next) => {
  const text = req.params.text;
  if(text.length > 0){
    const postUser =  await PostModel.find({title: { $regex: '.*' + text + '.*' } });
    if(postUser){
      return res
              .status(200)
              .json({
                items: postUser,
                state: true,
                error: ''
              })
    }else{
      return res
              .status(204)
              .json({
                items: [],
                state: false,
                error: 'Not Found'
              })
    }
  }else {
    const allpost = await PostModel.find();
    return res
          .status(200)
          .json({
            items: allpost,
            state: true,
            error: ''
          })
  }
  
}

exports.filterPostDate = async (req, res, next) => {
  const inputDate = new Date(req.params.date);
  console.log("inputDate",inputDate)
  if(inputDate){
    PostModel.find({
      'dateCreate': { $gte: inputDate, $lte: inputDate }
    }).then((value) => {
      if(value){
        return res
                .status(200)
                .json({
                  items: value,
                  state: true,
                  error: ''
                })
      }else{
        return res
                .status(204)
                .json({
                  items: [],
                  state: false,
                  error: 'Not Found'
                })
      }
    }).catch(err => console.log(err))
  }
  
}

exports.filterPostDateUser = async (req, res, next) => {
  const inputDate = new Date(req.params.date.toISOString());
  const idUser = req.params.id;
  const postUser =  await PostModel.find({
      'date': { $lte: inputDate }
  }).where('idUser').equal(idUser);
  if(postUser){
    return res
            .status(200)
            .json({
              items: postUser,
              state: true,
              error: ''
            })
  }else{
    return res
            .status(204)
            .json({
              items: [],
              state: false,
              error: 'Not Found'
            })
  }
}