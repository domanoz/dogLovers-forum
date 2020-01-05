const express = require('express');
const groupController = require('./../controllers/groupController');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const postRouter = require('./postRoutes');

const router = new express.Router();

router.use('/:groupId/posts', postRouter);

router
  .route('/')
  .get(groupController.getAllGroups)
  .post(
    authController.protectRoutes,
    authController.restrictTo('admin'),
    groupController.createGroup
  );
router
  .route('/me')
  .get(
    authController.protectRoutes,
    userController.getMe,
    groupController.getUserGroups
  );

router.route('/members').get(groupController.getMembers);
router
  .route('/addDog')
  .post(authController.protectRoutes, groupController.addDog);

router
  .route('/removeDog')
  .post(authController.protectRoutes, groupController.removeDog);

router.route('/:id').get(groupController.getGroup);

module.exports = router;
