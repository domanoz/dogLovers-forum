const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = new express.Router();

router
  .route('/')
  .get(
    authController.protectRoutes,
    authController.restrictTo('admin'),
    userController.getAllUsers
  );

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

module.exports = router;
