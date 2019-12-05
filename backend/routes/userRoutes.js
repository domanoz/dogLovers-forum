const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = new express.Router();

router.route('/').get(authController.protectRoutes, userController.getAllUsers);

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;