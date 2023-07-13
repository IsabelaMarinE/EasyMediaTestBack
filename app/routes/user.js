const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user_controller');

router.post('/login', [
  body('email').trim().notEmpty().isEmail(),
  body('password').trim().notEmpty().isLength({min: 8})
]
,userController.login_user);
router.post('/create', [
  body('name').trim().notEmpty(),
  body('email').trim().notEmpty().isEmail(),
  body('password').trim().notEmpty().isLength({min: 8})
]
,userController.create_user);

module.exports = router;