const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = new express.Router();

router.get(
  '/me',
  authController.protectRoutes,
  userController.getMe,
  userController.getUser
);

router
  .route('/')
  .get(
    authController.protectRoutes,
    authController.restrictTo('admin', 'moderator'),
    userController.getAllUsers
  );

router.post(
  '/signup',
  userController.fileUpload.single('image'),
  authController.signup
);
router.post('/login', authController.login);

router.patch(
  '/updateUserData',
  authController.protectRoutes,
  userController.fileUpload.single('image'),
  userController.updateDataForAuthUser
);

router.delete(
  '/deleteAccount',
  authController.protectRoutes,
  userController.deleteAccount
);

router.delete(
  '/deleteAccount/:id',
  authController.protectRoutes,
  authController.restrictTo('admin', 'moderator'),
  userController.deleteAccountAdmin
);
router.patch(
  '/unbanAccount/:id',
  authController.protectRoutes,
  authController.restrictTo('admin', 'moderator'),
  userController.unbanAccountAdmin
);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch(
  '/changePassword',
  authController.protectRoutes,
  authController.changePassword
);

module.exports = router;
