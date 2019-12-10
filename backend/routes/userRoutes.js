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

router.patch(
  '/updateUserData',
  authController.protectRoutes,
  userController.updateDataForAuthUser
);

router.delete(
  '/deleteAccount',
  authController.protectRoutes,
  userController.deleteAccount
);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch(
  '/changePassword',
  authController.protectRoutes,
  authController.changePassword
);

module.exports = router;
