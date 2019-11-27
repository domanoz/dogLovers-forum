const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = new express.Router();

router.post('/signup', authController.signup);

module.exports = router;
