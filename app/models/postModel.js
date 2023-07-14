const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  idUser: {
    type: String,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  dateCreate: {
    type: Date
  }
}, {timestamps: true});

module.exports = mongoose.model('posts', postSchema);