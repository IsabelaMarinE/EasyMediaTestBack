const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const postController = require('../controllers/post_controller');

router.get('/all-posts', postController.getAllPosts);
router.post('/my-posts', [
  body('id').trim().notEmpty().isEmail()
]
,postController.getPostByUser);
router.post('/create-post', [
  body('idUser').trim().notEmpty().isEmail(),
  body('title').trim().notEmpty().isEmail(),
  body('description').trim().notEmpty().isEmail()
]
,postController.createPost);
router.get('/filter-title/:text', postController.filterPostTitle);
router.get('/filter-date/:date', postController.filterPostDate);
router.get('/filter-date/:date/:id', postController.filterPostDateUser);

module.exports = router;