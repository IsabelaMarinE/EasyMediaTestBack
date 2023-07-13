const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const postController = require('../controllers/post_controller');

router.get('/all-posts', postController.getAllPosts);
router.post('/my-posts', postController.getPostByUser);
router.post('/create-post', postController.createPost);
router.post('/filter-title/:text', postController.filterPostTitle);
router.post('/filter-date/:date', postController.filterPostDate);
router.post('/filter-date-user/:date', postController.filterPostDateUser);

module.exports = router;